import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the decoded ID and attach it to the request object
      req.user = await User.findById(decoded.id).select("-password");

      // Continue to the next middleware
      next();
    } catch (error) {
      console.error(error);
      
      // Check for the specific TokenExpiredError
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired. Please log in again." });
      }

      // Handle other JWT verification errors
      return res.status(401).json({ message: "Not authorized, token failed." });
    }
  }

  // If there is no token in the request headers
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token." });
  }
};
