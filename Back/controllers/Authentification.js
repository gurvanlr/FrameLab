import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {getUserByMail} from "../models/Users.js"

export async function authentification (request,response,next) {
    const user = await getUserByMail(request.body.mail);
        if (bcrypt.compare(request.body.password,user.password)) {
                const payload = {id: user.id};
                const secret = "MonCodeSecret";
                const options = {expiresIn: "7 days"};
                    jwt.sign(payload,secret,options);
                    
                }

            }