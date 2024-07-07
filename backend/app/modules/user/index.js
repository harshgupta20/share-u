const sendEmail = require("../../utils/nodemailer");
const { updateUser, getUser, addLink, getLinks, deleteLink } = require("./userService");

module.exports = class User {
  async getUser(request, response) {
    try {
      const responseData = await getUser(request.user);
      if(!responseData){
        throw new Error("User not found");
      }
      response.status(200).json({success: true,message: "User data fetched successfully.",data: responseData,});
    } catch (error) {
      response.status(500).json({ success: false, message: error.message });
    }
  }

  async updateUser(request, response) {
    try {
      const responseData = await updateUser(request.user, request.body);
      if (!responseData) {
        throw new Error("Something went wrong !");
      } else {
        response.status(200).json({
            success: true,
            message: "User info updated successfully.",
            data: responseData,
          });
      }
    } catch (error) {
      response.status(500).json({ success: false, message: error.message });
    }
  }

  async addLink(request, response) {
    try {
      const responseData = await addLink(request.user, request.body);
      if (!responseData) {
        throw new Error("Something went wrong !");
      } else {
        response
          .status(200)
          .json({
            success: true,
            message: "Links successfully added.",
            data: responseData,
          });
      }
    } catch (error) {
      response.status(500).json({ success: false, message: error.message });
    }
  }

  async getLinks(request, response) {
    try {
      const responseData = await getLinks(request.user);
      response
        .status(200)
        .json({
          success: true,
          message: "Links fetched successfully.",
          data: responseData,
        });
    } catch (error) {
      response.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteLink(request, response) {
    try {
      const responseData = await deleteLink(request.user, request.params.id);
      response
        .status(200)
        .json({
          success: true,
          message: "Links deleted successfully.",
          data: responseData,
        });
    } catch (error) {
      response.status(500).json({ success: false, message: error.message });
    }
  }
};
