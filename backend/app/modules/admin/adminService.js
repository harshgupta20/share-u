const User = require("../../../models/user");
const { DEFAULT_PASSWORD } = require("../../utils/constant");
const { filterObject } = require("../../utils/filterObject");

async function updateUser(userEmail, requestData){
    try{
        const {name, email, role_id} = requestData;
        if(!name && !email && !role_id){
            throw new Error("No fields found to update user.");
        }

        const toBeUpdatedData = filterObject(['name', 'email', 'role_id'], {name, email, role_id});
        const response = await User.update(toBeUpdatedData,{where: {email: userEmail}, raw: true});

        return response
    }
    catch(error){
        throw error;
    }
}

async function addUser(requestData){
    try{
        const {name, email, role_id} = requestData;
        if(!name || !email || !role_id){
            throw new Error("All fields are required to fill.");
        }

        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {name, email, role_id, password: DEFAULT_PASSWORD},
          });

          if(!created){
            throw new Error("User already exists.");
          }

        return user;
    }
    catch(error){
        throw error;
    }
}

async function deleteUser(userEmail){
    try{
        if(!userEmail){
            throw new Error("Invalid email.");
        }

        const response = await User.destroy({where: {email: userEmail}});
        
        if(!(response == 1)){
            throw new Error("Failed to delete User.");
        }
        return response;
    }
    catch(error){
        throw error;
    }
}

async function getAllUsers(){
    try{
        const responseData = await User.findAll({order: [['createdAt', 'DESC']], raw: true});
        return responseData;
    }
    catch(error){
        throw error;
    }
  }
  
  async function getUserById(userId){
    try{
        const responseData = await User.findOne({where: {id: userId},raw: true});
        return responseData;
    }
    catch(error){
        throw error;
    }
  }


module.exports={updateUser, addUser, deleteUser, getAllUsers, getUserById}