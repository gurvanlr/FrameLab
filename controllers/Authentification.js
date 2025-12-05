import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getUserByMail } from "../models/Users.js"

export async function authentification(request, response, next) {
    const user = await getUserByMail(request.body.mail);
    if (await bcrypt.compare(request.body.password, user.password)) {
        const payload = { id: user.id };
        const secret = "MonCodeSecret";
        const token = jwt.sign(payload, secret, { expiresIn: "7 days" });
        response.setCookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        response.json({
            succes: true,
            token: token
        })
    } else {
        response.status(401).json({
            succes: false,
            message: "login fail"
        })
    }
}