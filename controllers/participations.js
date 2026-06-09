import { error } from "console";
import { postParticipation, getparticipations, getparticipation, getparticipationbyuserid, getParticipationAndUserActive } from "../models/Participations.js"
import { get } from "http";
import { getUserByMail } from "../models/Users.js";

export async function creationParticipation(request, response) {
    console.log("body :", request.body);
    console.log("file :", request.file);
    const email = request.body.email;
    const challengeId = request.body.challenge_id;
    const url = request.file.filename;
    try {
        const user = await getUserByMail(email)
        const participation = await postParticipation(url, user.id, challengeId);
        response.json(participation);
    } catch (e) {
        console.log(e);
    }
}

export async function allParticipations(request, response) {
    if (request.query.user_id) {

    } else {

    }
    const participation = await getparticipations();
    response.json(participation);
}

export async function rechercheParticipationByID(request, response) {
    const participation = await getparticipation(request.params.id);
    response.json(participation);
}

export async function rechercheParticipationByUser_ID(request, response) {
    const participation = await getparticipationbyuserid(request.params.user_id);
    response.json(participation);
}

export async function getParticipationAndUserByChallenge(request, response) {
    const data = await getParticipationAndUserActive(request.params.id);
    response.json(data);
}