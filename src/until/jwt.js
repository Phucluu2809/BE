import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_PASSWORD_RESET_SECRET = process.env.JWT_PASSWORD_RESET_SECRET;

class JwtUtil {
    generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: 
        "1h",
        // "10s",
        });
    }

    generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
        expiresIn: "7d",
        });
    }

    generatePasswordResetToken = (userId) => {
        return jwt.sign({id: userId}, JWT_PASSWORD_RESET_SECRET, {
            expiresIn: "10m"
        });
    }

    verifyToken = (token) => {
        return jwt.verify(token, JWT_SECRET);
    }
    verifyPasswordResetToken = (token) => {
        return jwt.verify(token, JWT_PASSWORD_RESET_SECRET)
    }
}

export default new JwtUtil();