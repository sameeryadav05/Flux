import express from 'express'
import { login, logout } from '../controllers/auth.controller.js';

const AuthRouter  = express.Router();

AuthRouter.post('/login',login);
AuthRouter.get('/logout',logout);


export default AuthRouter;