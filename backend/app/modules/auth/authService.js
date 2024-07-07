const TempUserTable = require("../../../models/tempUserTable");
const User = require("../../../models/user");
const { convertIntoJwtToken } = require("../../services/jwt");
const { userRole } = require("../../utils/constant");
const sendEmail = require("../../utils/nodemailer");

async function loginUser(requestData){
    try{
        const {email, password} = requestData;
        if(!email || !password){
            throw new Error("Email or Password missing in the request body");
        }

        const response = await User.findOne({where: {email,password}, raw: true});

        if(!response){
            throw new Error("User not found");
        }else{
          const token = convertIntoJwtToken({id:response.id, email: response.email, role_id: response.role_id}, '72h');
            return {email: response.email, role_id: response.role_id, token}
        }
    }
    catch(error){
        throw error;
    }
}

async function registerUser(requestData){
    try {
      const { name, email, password } = requestData;
      if (!email || !password || !name) {
        throw new Error("Some fields are missing in the request body");
      }
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { name, email, password, role_id: userRole.USER },
        raw: true
      });

      if (!created) {
        throw new Error("User already exist with same email.");
      }
      else{
        return user.dataValues;
      }
    } catch (error) {
      throw error;
    }
}

async function loginWithOTP(email){
  try {
    if (!email) {
      throw new Error("Email is required !");
    }
    
    const OTP = generateRandomFourDigitNumber();
    let tempUserData = await TempUserTable.findOne({where: { email },raw: true});
    if (!tempUserData) {
      tempUserData = await TempUserTable.create({ email, otp: OTP, count: 1 });
    }
    else{
      tempUserData = await TempUserTable.update({ otp: OTP, count: tempUserData.count+1 }, { where: { email }, raw: true });
    }

    await sendEmail(email, "OTP for login", `<h1>${OTP}</h1>`);

    return true;

  } catch (error) {
    throw error;
  }
}

async function verifyOTP(email, otp){
  try {
    if (!email || !otp) {
      throw new Error("Email/OTP is required !");
    }
    
    const emailAndOtpFound = await TempUserTable.findOne({ where: {email, otp}, raw: true });
    
    if (!emailAndOtpFound) {
      throw new Error("OTP is not correct🤨.");
    }

    let userData = await User.findOne({ where: { email } });
    
    if(!userData){
      userData = await User.create({ email, role_id: userRole.USER, is_profile_completed: false });
    }

    const token = convertIntoJwtToken({id:userData.dataValues.id, email: email, role_id: userRole.USER}, '72h');

    return {email: email, role_id: userRole.USER, token};

  } catch (error) {
    throw error;
  }
}

function generateRandomFourDigitNumber() {
  // Generate a random number between 0 and 9999
  let randomNumber = Math.floor(Math.random() * 10000);
  
  // Convert the number to a string and pad with leading zeros if necessary
  let fourDigitNumber = randomNumber.toString().padStart(4, '0');
  
  return fourDigitNumber;
}

module.exports={loginUser, registerUser, loginWithOTP, verifyOTP}