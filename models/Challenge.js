import db from "../database.js";

export async function postChallenge(title,description,URL,date_start,date_end) {
    const rows = await db.insert('INSERT INTO challenges (title,description,url,date_start,date_end,is_active) VALUES (?,?,?,?,?,1)',
        [title,description,URL,date_start,date_end]
    )
    return rows
}

export async function getChallenges() {
    const rows = await db.getall('SELECT * FROM challenges');
    return rows;
}

export async function getChallengeByTitle(challengeTitle) {
    const rows = await db.getall('SELECT * FROM challenges WHERE title LIKE ?', [challengeTitle])
    return rows;
}

export async function getChallengeActive() {
    const rows = await db.getall('SELECT * FROM chellenges WHERE date_start <= NOW() && date_end >= NOW()')
    return rows;
}
