const jwt = require("jsonwebtoken");
require("dotenv").config();

const convertIntoJwtToken = (objectData, timeInHours) => {
  try {
    const token = jwt.sign(objectData, process.env.JWT_SECRET, {expiresIn: timeInHours,});
    return token;
  } catch (error) {
    throw error;
  }
};

const jwtTokenIntoData = (token) => {
  try {
    let data;
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        throw error;
      }
      data = user;
    });

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = { convertIntoJwtToken, jwtTokenIntoData };
