import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username.trim() === '' || email.trim() === '' || password === ""){
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const existedUser = await User.findOne({
            $or: [{email}, {username}]
        });

        if(existedUser){
            return next(errorHandler(400, "User already exists"));
        }

        if(!validator.isEmail(email)){
            return next(errorHandler(400, "Please enter a valid email"));
        }

        if(password.length < 6){
            return next(errorHandler(400, "Please enter a strong password"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username: username.replace(/\s+/g, '').toLowerCase(),
            email,
            password: hashPassword
        });

        if(!user){
            return next(errorHandler(500, "Something went wrong while registering the user"));
        }

        return res
        .status(201)
        .json({
            success: true,
            message: "User Registered Successfully"
        })

    } catch (error) {
        return next(errorHandler(500, error.message));
    }
}

const loginUser = async(req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ""){
        return next(errorHandler(400, "All fields are required"));
    }

    try {
        const validUser = await User.findOne({email});

        if(!validUser){
            return next(errorHandler(404, "User not found"));
        }

        const isMatch = await bcrypt.compare(password, validUser.password);

        if(!isMatch){
            return next(errorHandler(401, "Invalid user credentials"))
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie('access_token', token, options)
        .json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: validUser._id,
                name: validUser.username,
                email: validUser.email
              },
            token
        });
    } catch (error) {
        return next(errorHandler(500, error.message));
    }
}

const logoutUser = (req, res, next) => {
    try {
        return res
        .status(200)
        .clearCookie('access_token')
        .json({
            success: true,
            message: "User has been logout"
        })
    } catch (error) {
        return next(errorHandler(500,error.message));
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};