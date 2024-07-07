const { getUsernameData } = require("./publicService");

module.exports = class Public {
  async getUsernameData(request, response) {
    try {
      console.log("--------------------",request.query)
      const responseData = await getUsernameData(request.query.username);
      if(!responseData){
        throw new Error("User not found");
      }
      response.status(200).json({success: true,message: "User data fetched successfully.", data: responseData});
    } catch (error) {
      response.status(500).json({ success: false, message: error.message });
    }
  }
};
