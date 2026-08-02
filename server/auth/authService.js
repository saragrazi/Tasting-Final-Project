const { handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./Providers/jwt");
const User = require("../users/models/mongodb/User");
const config = require("config");

const tokenGenerator = config.get("TOKEN_GENERATOR");

const auth = async (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient)
        throw new Error("Authentication Error: Please Login");

      const userInfo = verifyToken(tokenFromClient);
      if (!userInfo) throw new Error("Authentication Error: Unauthorize user");

      const user = await User.findById(userInfo._id);
      if (!user) throw new Error("Authentication Error: Unauthorize user");
      if (user.isBlocked) throw new Error("חשבון זה נחסם על ידי מנהל המערכת");

      req.user = userInfo;
      return next();
    } catch (error) {
      return handleError(res, 401, error.message);
    }
  }
  return handleError(res, 500, "Noo Noo Noo... you did not use jwt!");
};

module.exports = auth;