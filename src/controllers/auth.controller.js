import { returnToken, generateRefresh } from "../helpers/tokenManager.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        // let user = await User.findOne({ email })
        // if (user) throw new Error('Ese usuario ya existe')
        const user = new User({ email, password });
        await user.save();

        generateRefresh(user.id, res);
        return returnToken(res, user.id);
    } catch (e) {
        console.log(e);
        return res.status(404).json({ ok: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error('No existe el usuario');

        const correctPassword = await user.comparePassword(password);
        if (!correctPassword) throw new Error('Contraseña erronea');

        generateRefresh(user.id, res);
        return returnToken(res, user.id);
    } catch (e) {
        console.log(e);
        res.status(404).json({ ok: false });
    }
};

export const refreshToken = (req, res) => {
    try {
        return returnToken(res, req.uid);
    } catch (e) {
        console.log(e);
        res.status(404).json({ ok: false });
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        res.json({ email: user.email });
    } catch (e) {
        console.log(e);
        res.status(500).send({ ok: false });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('refreshToken');
        res.json({ ok: true });
    } catch (e) {
        console.log(e);
        res.status(404).json({ ok: false });
    }
};