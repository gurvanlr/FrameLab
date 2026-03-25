import db from "../database.js"

export async function postcomment(content, user_id, participation_id) {
    const rows = await db.insert("INSERT INTO comments (content,created,is_visible,user_id,participation_id) VALUES (?,NOW(),1,?,?)",[content,user_id,participation_id])
    return rows;
}

export async function getcomments() {
    const rows = await db.getall("SELECT * FROM comments");
    return rows;
}

export async function getCommentByID(id) {
    const rows = await db.getall("SELECT * FROM comments WHERE id = ?", [id])
    return rows;
    
}
export async function getCommentByParticipation_id(participation_id) {
    const rows = await db.getall("SELECT * FROM comments WHERE participation_id = ?", [participation_id])
    return rows;
}