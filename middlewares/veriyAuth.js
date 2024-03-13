import dotenv from'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import createError from '../utils/error.js';

/**
 * verifyAuth: verifies the jwt token. if succesfully verifies  send it next middleware.if false control goes to global err middle.
 * @param {token} req 
 */
const verifyAuth = async (req, res, next) => {
    try {
        //check if token is present is not
        if (req.headers.authorization) {
            let token;
            if (req.headers.authorization) token = req.headers.authorization.split(' ')[1];
            if (token) {
                //if present check if it is valid or not
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                req.userId = decoded.id;
                req.email = decoded.email;
                next();
            }
            else {
                next(createError(401, 'You are not authorized to access this resource.'));
            }
        }
        else {
            next(createError(401, 'You are not authorized to access this resource.'));
        }
    } catch(error) {
        next(createError(401, 'You are not authorized to access this resource.'));
    }
}

export default verifyAuth;