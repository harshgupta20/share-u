const { jwtTokenIntoData } = require("../app/services/jwt");

const isAuthenticated = (request) => {
    try{
        const token = request.header('Authorization')?.split(' ')[1];

        const tokenData = jwtTokenIntoData(token);
        if(Object.keys(tokenData).length == 0){
            throw new Error("could not resolve the token");
        }

        request.user=tokenData;
        return true;
    }
    catch(error){
        throw new Error(error.message);
    }
}

module.exports = {isAuthenticated};