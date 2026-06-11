import db from "../database.js";

export async function postChallenge(title,description,URL,date_start,date_end) {
    const rows = await db.insert('INSERT INTO challenges (title,description,url,date_start,date_end,is_active) VALUES (?,?,?,?,?,0)',
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

export async function getChallengeById(id) {
    const row = await db.getrow ("SELECT * FROM challenges WHERE id = ?", [id]);
    return row;
    
}

export async function getChallengeActive() {
    const rows = await db.getall("SELECT * FROM challenges WHERE is_active = 1")
    return rows;
}

export async function activeChallenge(id) {
    const row =  await db.update ("UPDATE challenges SET is_active = 1 WHERE id = ?", [id]);
    return row ; 
}

export async function inactiveChallenge(id) {
    const row =  await db.update ("UPDATE challenges SET is_active = 0 WHERE id = ?", [id]);
    return row ; 
}
