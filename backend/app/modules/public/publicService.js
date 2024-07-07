const Link = require("../../../models/link");
const User = require("../../../models/user");

async function getUsernameData(username){
    try{
        const responseData = await User.findOne({
            where: {username}, 
            include: [
                {
                    model: Link,
                }
            ],
            nest: true
        });
    
        return responseData;
    }
    catch(error){
        throw error;
    }
}

module.exports = {getUsernameData};