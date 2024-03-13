import userService from '../services/userService.js';
import sendResponse from './baseController.js';
import createError from '../utils/error.js';

/**
 * signup : It registered the user and sent an email with otp for two step verification
 * @param {body(userName, email, password)} req
 * @param {data{email}} res
 */
const signup=async(req, res, next)=>{
    try {
        const data=await userService.signup(req);
        if(data.data !== null) res.status(201).send(sendResponse(data.message, data.data));
        else next(createError(data.status, data.message));
    } catch (error) {
        next(createError(500, error.message));
    }
}

/**
 * login : log in the user and returns jwt token
 * @param {email, password} req 
 * @param {data{email, token}} res 
 */
const login=async(req, res, next)=>{
    try {
        const data=await userService.login(req, res);
        if(data.data !== null) res.status(200).send(sendResponse(data.message, data.data));
        else next(createError(data.status, data.message));
    } catch (error) {
        next(createError(500, error.message));
    }
}

/**
 * getProfile : returns user information based on token
 * @param {jwt token} req 
 * @param {data{email, userName}} res 
 */
const getProfile=async(req, res, next)=>{
    try {
        const data=await userService.getProfile(req);
        if(data.data !== null) res.status(200).send(sendResponse(data.message, data.data));
        else next(createError(data.status, data.message));
    } catch (error) {
        next(createError(500, error.message));
    }
}


/**
 * getProfile : returns user information based on token
 * @param {jwt token} req 
 * @param {data{email}} res 
 */
const confirmEmail=async(req, res, next)=>{
    try {
        const data=await userService.confirmEmail(req);
        if(data.data !== null) res.status(200).send(sendResponse(data.message, data.data));
        else next(createError(data.status, data.message));
    } catch (error) {
        next(createError(500, error.message));
    }
}

export {signup,login, getProfile, confirmEmail}