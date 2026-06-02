import { getUsers, postUser, getUser, getMail, auth, getUserByMail, is_active } from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function allUsers(request, response) {
    const users = await getUsers();
    response.json(users);
}

export async function creationUser(request, response) {
    const mail = await getMail();
    for (let user of mail) {
        if (user.mail == request.body.mail) {
            return response.json("mail déjà utilisé comme identifiant de compte");
        }
    }
    const password = await bcrypt.hash(request.body.password, 10);
    const name = await bcrypt.hash(request.body.name, 10);

    const insertedId = await postUser(request.body.mail, password, request.body.name, request.body.firstname);

    const payload = { id: insertedId };
    const validationToken = jwt.sign(payload, "lotrmieuxquestarwars", { expiresIn: "1 hours" });
    response.json({
        success: true,
        token: validationToken
    });
}

export async function rechercheUser(request, response) {
    const user = await getUser(request.params.id);
    console.log(user);
    response.json(user);
}

export async function getMe(request, response) {
    response.json(request.user);
}

export async function connexion_user(request, response) {
    const users = await getUsers();

    for (let user of users) {
        if (user.mail == request.body.mail) {
            const valid = await bcrypt.compare(request.body.password, user.password)
            if (valid) {
                return response.json("compte connecté");
            }
            else {
                return response.json("l'adresse mail ou le mot de passe est incorect");
            }
        }

    }
    return response.json("l'adresse mail ou le mot de passe est incorect");
}

export async function validation(request, response) {

    if (request.token != null) {
        const tokenData = jwt.verify(token, "lotrmieuxquestarwars");
        const user = await getUser(tokenData.id);
        if (user) {
            await is_active(user.id);
            response.json({
                success: true
            });
        }
    } else {
        response.json({
            success: false
        })
    }
}
