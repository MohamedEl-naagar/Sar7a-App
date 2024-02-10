import userModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../email/sendEmail.js";
import { handleError } from "../../middleware/handleAsyncError.js";
import { AppError } from "../../utils/appError.js";
import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'eg'] } })
        .required(),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,6}$/).required(),
    rePassword: Joi.ref("password")
});


export const signUp = handleError(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const { error } = signUpSchema.validate(req.body);
        if (error) {
            return next(new AppError(error.details[0].message, 400));
        }

        let existUser = await userModel.findOne({ email });
        if (existUser) return next(new AppError(`Email already exists`, 409));

        const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUNDS));

        const addedUser = await userModel.create({ name, email, password: hashedPassword });
        const verfiyToken = jwt.sign({ id: addedUser._id }, process.env.VERIFY_SECRET);
        sendEmail({ email, api: `http://localhost:3000/api/v1/user/verify/${verfiyToken}` });

        res.json({ message: "User registered successfully", addedUser });
    } catch (error) {
        next(new AppError("Error occurred during signup", 500));
    }
});

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existUser = await userModel.findOne({ email });
        if (!existUser) {
            return next(new AppError("Email not found", 404));
        }

        const isMatch = bcrypt.compareSync(password, existUser.password);
        if (!isMatch) {
            return next(new AppError("Invalid password", 401));
        }

        const token = jwt.sign({ id: existUser._id }, process.env.SECRET_KEY);
        res.json({ message: "Login successful", token });
    } catch (error) {
        next(new AppError("Error occurred during login", 500));
    }
};

export const deletUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        const existUser = await userModel.findOne({ email });
        if (!existUser) {
            return next(new AppError("User not found", 404));
        }

        const del = await userModel.deleteOne({ email: existUser.email });
        res.json({ message: "User deleted successfully", del });
    } catch (error) {
        next(new AppError("Error occurred during user deletion", 500));
    }
};

export const verifyEmail = (req, res, next) => {
    const { token } = req.params;

    jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
        if (err) {
            return res.json({ message: "Error verifying token", err });
        }

        try {
            const updatedUser = await userModel.findByIdAndUpdate(decoded.id, { verified: true }, { new: true });
            res.json({ message: "Email verified successfully", updatedUser });
        } catch (error) {
            next(new AppError("Error occurred during email verification", 500));
        }
    });
};
