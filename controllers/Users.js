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

    const insertedId = await postUser(request.body.mail, password, request.body.name, request.body.firstname);

    const payload = { id: insertedId };
    const validationToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1 hours" });
    response.json({
        success: true,
        id: insertedId,
        validation_token: validationToken
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
    const user = await getUserByMail(request.body.mail);

        if (user) {
            const valid = await bcrypt.compare(request.body.password, user.password)
            if (valid) {
                if (!user.validated) {
                    return response.json({ success: false, message: "Compte non validé" });
                }
                const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "7d" });
                response.cookie("token", token, { httpOnly: true });
                return response.json({ success: true });
            }
            else {
                return response.json({success: false , message: "l'adresse mail ou le mot de passe est incorect"});
            }
        }

    return response.json({success: false , message: "Le compte n'existe pas"});
}

export async function validation(request, response) {
    const { id } = request.params;
    const user = await getUser(id);
    if (user) {
        await is_active(id);
        return response.json({ success: true });
    } else {
        return response.json({ success: false, message: "Utilisateur introuvable" });
    }
}
