import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });
        // console.log(token);
    
      res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevent XSS Attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
      });
    } catch (error) {
        console.log(error);
    }
};

export default generateTokenAndSetCookie;
