import { error } from "console";
import {postParticipation,getparticipations,getparticipation, getparticipationbyuserid,getParticipationAndUserActive} from "../models/Participations.js"
import { get } from "http";

export async function creationParticipation(request,response) {
    try {
        const participation = await postParticipation(request.body.participation_url,request.body.user_id,request.body.challenge_id);
        response.json(participation);
    } catch (e) {
        console.log(e);
    }
}

export async function allParticipations(request,response) {
    if (request.query.user_id) {

    } else {

    }
    const participation = await getparticipations();
    response.json(participation);
}

export async function rechercheParticipationByID(request,response) {
    const participation = await getparticipation (request.params.id);
    response.json(participation);
}

export async function rechercheParticipationByUser_ID(request,response) {
    const participation = await getparticipationbyuserid(request.params.user_id);
    response.json(participation);
}

export async function getParticipationAndUserByChallenge(request,response) {
    const data = await getParticipationAndUserActive(request.params.id);
    response.json(data);
}