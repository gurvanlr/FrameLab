import { response } from "express";
import { postChallenge, getChallenges, getChallengeByTitle, getChallengeActive, getChallengeById, activeChallenge, inactiveChallenge } from "../models/Challenge.js"

export async function creationChallenge(request, response) {
    const url = "/upload/" + request.file.filename;
    const challenge = await postChallenge(request.body.title, request.body.description, url, request.body.date_start, request.body.date_end);
    response.json({ succes: true });
}

export async function allChallenges(request, response) {
    const challenges = await getChallenges();
    response.json(challenges);
}

export async function rechercheChallengeByTitle(request, response) {
    const challenge = await getChallengeByTitle(request.params.title);
    response.json(challenge);
}

export async function rechercheChallengeActive(request, response) {
    const challenges = await getChallengeActive();
    response.json(challenges);
}

export async function setChallenge(request, response) {
    const id = request.params.id;
    const challenge = await getChallengeById (id);
    console.log("challenge:", challenge);

    if (challenge.is_active == 0) {
        await activeChallenge (id);
        response.json ({success: true , message: "Le challenge est maintenant active"});
    } else if (challenge.is_active == 1) {
        await inactiveChallenge (id);
        response.json ({success: true , message: "Le challenge est maintenant inactive"});
    }
}
