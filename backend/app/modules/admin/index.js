const { updateUser, addUser, deleteUser, getAllUsers, getUserById } = require("./adminService");
module.exports = class Admin{
    async updateUser(request, response){
        try{
            const responseData = await updateUser(request.params.email, request.body);
                response.status(200).json({success: true, data: responseData, message: "User data updated successfully."});
        }
        catch(error){
            response.status(500).json({success: false, message: error.message})
        }
    }

    async addUser(request, response){
        try{
            const responseData = await addUser(request.body);
                response.status(200).json({success: true, data: responseData, message: "User added successfully."});
        }
        catch(error){
            response.status(500).json({success: false, message: error.message})
        }
    }

    async deleteUser(request, response){
        try{
            const responseData = await deleteUser(request.params.email);
                response.status(200).json({success: true, data: responseData, message: "User added successfully."});
        }
        catch(error){
            response.status(500).json({success: false, message: error.message})
        }
    }

    
    async getAllUsers(request, response){
        try{
            const responseData = await getAllUsers();
            response.status(200).json({success: true, data: responseData});
        }
        catch(error){
            response.status(500).json({success: false, message: error.message})
        }
    }

    async getUserById(request, response){
        try{
            const responseData = await getUserById(request.params.id);
            if(Object.keys(responseData).length == 0){
                throw new Error("Something went wrong !");
            }
            else{
                response.status(200).json({success: true, data: responseData});
            }
        }
        catch(error){
            response.status(500).json({success: false, message: error.message})
        }
    }
}