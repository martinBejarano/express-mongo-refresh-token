import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";
import { body } from 'express-validator';

export const validateToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization;
        if (!token) throw new Error('Token invalido')
        const { uid } = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET)
        req.uid = uid;
        next()
    } catch (e) {
        console.log(e)
        const tokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es valida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no valido",
            "No Bearer": "Utiliza formato Bearer"
        }
        res.status(401).json({ error: tokenVerificationErrors[e.message] })
    }
}

export const validateRefresh = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error('No existe el token');
        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH_SECRET);
        req.uid = uid;
        next()
    } catch (e) {
        console.log(e);
        res.status(404).json({ ok: false });
    }
}



const validateBody = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(404).json({ errors: errors.array() })

    next()
}
export const registerValidator = [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', 'Formato contraseña incorrecto').trim().isLength(6).custom((value, { req }) => {
        if (value !== req.body.repassword) throw new Error('no coinciden')
        return value // It needs to be here in order to work
    }), validateBody
]