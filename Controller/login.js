const User = require("../Models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MongoDb_Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", true);

async function CheckUser(email) {
  try {
    const user = await User.findOne({ email: email});
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    return "Server Busy";
  }
}

async function AuthenticateUser(email, password) {
  try {
    const userCheck = await User.findOne({ email: email });
    console.log(userCheck)
    const validPassword = await bcrypt.compare(
      password,
      userCheck.password
    );
    if (validPassword) {
      const token = jwt.sign(
        { email: email },
        process.env.login_Secret_Token
      );
      const response ={
        id:userCheck._id,
        name:userCheck.name,
        email:userCheck.email,
        joinedOn:userCheck.joinedOn,
        token:token,
        status:true
      }
      return response;
    }
    return "Invalid User name or Password";
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

async function AuthorizeUser(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.login_Secret_Token);
    if (decodedToken) {
      const email = decodedToken.email;
      const userCheck = await User.findOne({ email: email });
      return userCheck;
    }
    return false;
  } catch (error) {
    console.log(error);
    return "Server Busy";
  }
}

module.exports = { CheckUser, AuthenticateUser, AuthorizeUser };