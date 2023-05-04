import express from 'express';
import {
    login,
    register,
    infoUser,
    refreshToken,
    logout,
} from '../controllers/auth.controller.js';
import { registerValidator, validateRefresh, validateToken } from '../middlewares/validators.js';

const router = express.Router();

router.post('/register', registerValidator, register);

router.post('/login', login);

router.get('/protected', validateToken, infoUser);

router.get('/refresh', validateRefresh, refreshToken);

router.post('/logout', logout);

export default router;