import jwt from "jsonwebtoken"

export const returnToken = (res, uid) => {
    try {
        const expiresIn = 60 * 15;
        const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
        return res.json({ token, expiresIn });
    }
    catch (e) {
        console.log(e)
    }
}

export const generateRefresh = (uid, res) => {
    try {
        const expiresIn = 60 * 30;
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH_SECRET, { expiresIn })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODE === 'developer'),
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (e) {
        console.log(e)
    }
}