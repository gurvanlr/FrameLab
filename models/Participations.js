import db from "../database.js"

export async function postParticipation(participationURL,user_id,challenge_id) {
    const rows = await db.insert("INSERT INTO participations (url,user_id,challenge_id,created,is_visible) VALUES (?,?,?,NOW(),1)",
        [participationURL,user_id,challenge_id]
    );
    return rows;
}

export async function getparticipations() {
    const rows = await db.getall("SELECT * FROM participations") 
    return rows;
}

export async function getparticipation(ID) {
    const rows = await db.getall("SELECT * FROM participations WHERE id=?", [ID]) 
    return rows;
}

export async function getparticipationbyuserid(user_id) {
    const rows = await db.getall ("Select * FROM participations WHERE user_id=?",[user_id])
}

export async function getParticipationAndUserActive(id){
    const rows = await db.getall ("SELECT participations.id AS participation_id,participations.url,participations.created,users.id AS user_id,users.name,users.firstname FROM participations JOIN users on users.id = participations.user_id WHERE participations.challenge_id = ?",[id]);
    return rows;
}