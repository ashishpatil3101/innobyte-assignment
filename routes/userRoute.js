import express from 'express';
import {login, signup, getProfile, confirmEmail} from '../controllers/userController.js';
import verifyAuth from '../middlewares/veriyAuth.js';

const router=express.Router();


router.post('/login', login);
router.post('/signup', signup);
router.get('/profile', verifyAuth, getProfile);
router.get('/verify/:token', confirmEmail);

export default router;