import { error } from "console";
import {getUsers,postUser,getUser,getMail, auth } from "../models/Users.js";
import bcrypt from "bcrypt";

export async function allUsers(request, response) {
    const users = await getUsers();
    response.json(users);
}

export async function creationUser(request, response) {
    const mail = await getMail();
    for (let user of mail) {
        if(user.mail == request.body.mail) {
            return response.json("mail déjà utilisé comme identifiant de compte");
        }
    }
    const password = await bcrypt.hash(request.body.password, 10);
    const user = await postUser(request.body.mail,password,request.body.name,request.body.firstname);
    response.json ("utilisateur créer");
}

export async function  rechercheUser(request,response) {
    const user = await getUser(request.params.id);
    console.log (user);
    response.json(user);
}
