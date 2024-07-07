const { userRole } = require("../app/utils/constant");
const {isAuthenticated} = require("../middleware/authenticate");

module.exports = {
    isAdmin: (request, response, next) => {
        try{
            if(isAuthenticated(request) && request.user.role_id == userRole.ADMIN){
                return next();
            }
            else{
                response.status(401).json({success: false, message: "Unauthorized access."});
            }
        }
        catch(error){
            response.status(500).json({success: false, message: "Failed to authorize.", error});
        }
    },
    isUser: (request, response, next) => {
        try{
            if(isAuthenticated(request) && request.user.role_id == userRole.USER){
                return next();
            }
            else{
                response.status(401).json({success: false, message: "Unauthorized access."});
            }
        }
        catch(error){
            response.status(500).json({success: false, message: "Failed to authorize.", error});
        }
    },
    isUserOrAdmin: (request, response, next) => {
        try{
            if(isAuthenticated(request) && (request.user.role_id == userRole.USER || request.user.role_id == userRole.ADMIN)){
                return next();
            }
            else{
                response.status(401).json({success: false, message: "Unauthorized access."});
            }
        }
        catch(error){
            response.status(500).json({success: false, message: "Failed to authorize.", error: error.message});
        }
    },
}