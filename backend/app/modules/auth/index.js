const { loginUser, registerUser, loginWithOTP, verifyOTP } = require("./authService");
module.exports = class Auth{
    async loginUser(request, response){
        try{
            const responseData = await loginUser(request.body);
            if(Object.keys(responseData).length == 0){
                throw new Error("Something went wrong !");
            }
            else{
                response.status(200).json({success: true, data: responseData, message: "User login successfully."});
            }
        }
        catch(error){
            response.status(500).json({success: false, message: error.message})
        }
    }

    async registerUser(request, response){
        try{
            const responseData = await registerUser(request.body);
            if(Object.keys(responseData).length == 0){
                throw new Error("Something went wrong !");
            }
            else{
                response.status(200).json({success: true, data: responseData});
            }
        }
        catch(error){
            response.status(500).json({success: false, message: error.message});
        }
    }

    async loginWithOTP(request, response){
        try{
            const res = await loginWithOTP(request.body.email);
            if(!res){
                throw new Error("Something went wrong !");
            }
            else{
                response.status(200).json({success: true, message: "OTP sent on your email."});
            }
        }
        catch(error){
            response.status(500).json({success: false, message: error.message});
        }
    }

    async verifyOTP(request, response){
        try{
            const res = await verifyOTP(request.body.email, request.body.otp);
            if(!res){
                throw new Error("Something went wrong !");
            }
            else{
                response.status(200).json({success: true, message: "Email verified successfully.", data: res});
            }
        }
        catch(error){
            response.status(500).json({success: false, message: error.message});
        }
    }
}