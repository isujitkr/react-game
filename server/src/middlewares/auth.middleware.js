import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import User from "../models/user.model.js";

export const verifyToken = async(req, res, next) =>{
    const token = req.cookies?.access_token;

    if(!token){
        return next(errorHandler(401, "Unauthorized request"));
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        const user = await User.findById(decodedToken?.id);
    
        if(!user){
            return next(errorHandler(400, "Invalid access token"));
        }
    
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(errorHandler(401, "Unauthorized request: Token has expired"));
        } else {
            return next(errorHandler(403, "Forbidden: Invalid token"));
        }
    }
}