import db from "../database.js";

export async function getUsers() {
    const rows = await db.getall("SELECT * FROM users");
    return rows;
}

export async function postUser(mail,password,name,firstname) {
    const rows = await db.insert("INSERT INTO users (mail,password,name,firstname,is_admin,registrated,validated) VALUES (?,?,?,?,0,NOW(),0)",
        [mail,password,name,firstname]);
    return rows;    
}

export async function getUser(id) {
    const row = await db.getrow("SELECT * FROM users WHERE id = ? ", [id] )
    return row;
}

export async function getMail() {
    const rows = await db.getall("SELECT mail FROM users")
    return rows;
}

export async function getUserByMail (mail) {
    const row = await db.getrow ("SELECT * FROM users WHERE mail LIKE ?", [mail]);
    return row;
}

export async function auth(email) {
    const row = await db.getrow ("SELECT * FROM users WHERE email LIKE ?", [email]);
    return row;
}
