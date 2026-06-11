import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getUser, getUserByMail } from "../models/Users.js"

export async function authByCredentials(request, response) {
    const user = await getUserByMail(request.body.mail);
    if (await bcrypt.compare(request.body.password, user.password)) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7 days" }); //process.env.SECRET_KEY
        response.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        response.json({
            success: true,
            token: token
        })
    } else {
        response.status(401).json({
            succes: false,
            message: "login fail"
        })
    }
}

export async function authbyTokens(request, response, next) {
    let token
    if (request.cookies.token) {
        token = request.cookies.token;
    } else if (request.header("Authorization")) {
        const tab = request.header("Authorization").split(" ");
        token = tab[1];
    }
    
    if (token) {
        try {
            const tokenData = jwt.verify(token, "lotrmieuxquestarwars");
            const user = await getUser(tokenData.id);
            if (user) {
                request.user = user;
                next();
                return;
            }
        } catch (e) { 
            console.error(e);
        }
    }

    response.status(401).json({
        succes: false,
        message: "Token manquant, invalide ou expiré"
    });
}

export async function logout(request,response) {
    response.clearCookie("token");
    response.json({
        succes: true,
        message: "Déconnecté"
    });
}