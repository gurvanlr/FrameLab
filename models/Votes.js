import db from "../database.js"

export async function postVote(creative_note,technical_note,theme_note) {
    const rows = db.insert ("INSERT INTO votes (creative_note,technical_note,theme_note,created) VALUES ('?','?','?',NOW())", 
       [creative_note,technical_note,theme_note]
     );
     return rows;
}

export async function getvotes() {
    const rows = await db.getall("SELECT * FROM votes");
    return rows
}

export async function getVoteByID(id) {
    const rows = await db.getall("SELECT * FROM votes WHERE id=?", [id]);
    return rows
}

export async function getVoteByParticipationID(participation_id) {
    const rows = await db.getall("SELECT * FROM votes Where participation_id = ?", [participation_id]);
    return rows
}
