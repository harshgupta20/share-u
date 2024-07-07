const Link = require("../../../models/link");
const User = require("../../../models/user");
const { filterObject } = require("../../utils/filterObject");

async function getUser(userData){
    try{
        const responseData = await User.findOne({where: {id: userData.id}, raw: true});
        return responseData;
    }
    catch(error){
        throw error;
    }
}

async function updateUser(userData, requestData){
    try{
        if(requestData.username){
            await isUsernameUnique(requestData.username);
        }
        const updateFields = filterObject(['name', 'password', 'username' ], requestData);
        const responseData = await User.update(updateFields, {where: {id: userData.id},raw: true});
        return responseData;
    }
    catch(error){
        throw error;
    }
}

async function addLink(loggedUserData, requestData){
    try{
        const {link, title} = requestData;
        console.log("----------------",link, title)
        const isLinkAlreadyExist = await Link.findOne({where: {link, user_id: loggedUserData.id}});
        if(isLinkAlreadyExist){
            throw new Error("Similar link already exist.");
        }
        const responseData = await Link.create({link, title, user_id: loggedUserData.id});
        return responseData;
    }
    catch(error){
        throw error;
    }
}

async function getLinks(loggedUserData){
    try{
        const isLinkAlreadyExist = await Link.findAll({where: {user_id: loggedUserData.id}, raw: true});
        return isLinkAlreadyExist;
    }
    catch(error){
        throw error;
    }
}
async function deleteLink(loggedUserData, linkId){
    try{
        const response = await Link.destroy({
            where: {
              user_id: loggedUserData.id,
              id: linkId,
            },
          });

          console.log("-------------------",response)
        return response;
    }
    catch(error){
        throw error;
    }
}


//-----------------------------------------------------------------
async function isUsernameUnique(username){
    const userData = await User.findOne({where:{username}, raw: true});
    if(userData){
        throw new Error("Similar user exist with same username.");
    }
}

module.exports = {updateUser, getUser, addLink, getLinks, deleteLink};