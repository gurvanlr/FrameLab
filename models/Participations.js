import db from "../database.js"

export async function postParticipation(participationURL) {
    const rows = await db.insert("INSERT INTO participations (retouche_url,date,is_visible) VALUES (?,NOW(),1)",
        [participationURL]
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
