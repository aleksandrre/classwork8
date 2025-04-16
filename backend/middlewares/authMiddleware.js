import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddlware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "ტოკენი არ არის მოწოდებული" });
    }
    
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
