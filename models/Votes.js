import db from "../database.js"

export async function postVote(creative_note,technical_note,theme_note,user_id,participation_id) {
    const rows = db.insert ("INSERT INTO votes (creative_note,technical_note,theme_note,created,user_id,participation_id) VALUES (?,?,?,NOW(),?,?)", 
       [creative_note,technical_note,theme_note,user_id,participation_id]
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

export async function getAverageNotes () {
    const rows = await db.getall ("SELECT p.*, AVG(v.creative_note) AS creat_note, AVG(v.technical_note) AS tech_note, AVG(v.theme_note) AS theme_note FROM votes AS v JOIN participations AS p on p.id = v.participation_id GROUP BY p.id");
    return rows;
}
