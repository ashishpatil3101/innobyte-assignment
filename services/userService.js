import dotenv from 'dotenv';
dotenv.config();
import validator from 'validator';
import User from '../models/User.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import emailService from './emailService.js';


class userService {

    async signup(req){
        const {email, userName, password}=req.body;
        let errMessage=[];
        // handle edge cases
        if(email === undefined || email === '') errMessage.push('Email is required.');
        if(password === undefined || password === '') errMessage.push('Password is required.');
        if(userName === undefined || userName === '') errMessage.push('UserName is required.');
        if(errMessage.length > 0 ) return {data: null, message: errMessage, status: 400};
        if(!validator.isEmail(email))return {data: null, message: 'Please enter valid email-id', status: 400};
        const strongPassRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[0-9a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,40}$/;
        if(!strongPassRegex.test(password))return {data: null, message:'Password must be a minimum of 8 characters and include at least one uppercase letter, one lowercase letter, one numerical digit, and one special character for enhanced security', status:400};
        // check if email is associted with another user
        const emailExist=await User.findOne({email});
        if(emailExist) return {data: null, message: 'Email already exist. Please use another email-id.', status:400};
       // check if userName is associted with another user
        const userNameExist=await User.findOne({userName});
        if(userNameExist) return {data: null, message: 'userName already exist. Please use another userName.', status:400};
        const newUser=new User({
            email,
            password,
            userName
        });
        await newUser.save();
        //SEND EMAIL
        await emailService(email);
        return {data: {email}, message: 'User registered successfully. Confirmation email is sent to registered email-id.', status: 201};
    }

    async login(req, res){
        const {email, password}=req.body;
        let errMessage=[];
        if(email === undefined || email === '') errMessage.push('Email is required.');
        if(password === undefined || password === '') errMessage.push('Password is required.');
        if(errMessage.length > 0 ) return {data: null, message: errMessage, status: 400};
        if(!validator.isEmail(email))return {data: null, message: 'Please enter valid email-id', status: 400};
        const userExist=await User.findOne({email});
        if(!userExist) return {data:null, message: 'Invalid credentials.'};
        const checkPassword = await bcrypt.compare(
            password,
            userExist.password
        );
        // check if pass is correct or not
        if(!checkPassword)return {data: null, message:'Invalid credentials.', status: 400};
        // jwt token preparation
        const payload = {
            id: userExist._id,
            email: userExist.email
        };
        const token=jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400,
        });
        // send token
        res.cookie("token", token, {
            httpOnly: true,
            expiresIn: 86400, // 1 day
            secure: true,
            sameSite: "none",
        });
        return {data:{email: userExist.email, token: token}, message: 'User logged in successfully', status: 200};
    }

    async getProfile(req){
        const userId=req.userId;
        const userExist=await User.findById(userId);
        if(!userExist) return {data:null, message: "User does not exist.", status: 400};
        const resObj={
            email: userExist.email,
            userName: userExist.userName
        };
        return {data: resObj, message: "User data retrieved successfully.", status: 200}
    }

    async confirmEmail(req){
        try {
            const {token}=req.params;
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const email=decoded.email;
            const userExist=await User.findOne({email});
            if(!userExist)return{data: null, message: 'EMail confirmation failed. Please try registering again', status:400};
           //update user
           await User.findOneAndUpdate({email}, {"emailVerified": true});
           return {data: userExist.email, message: 'Email confirmed successfully.', status:400};
        } catch (error) {
            return {data: null, message: "Email confirmation failed.", status: 400}
        }
    }
}

export default new userService();