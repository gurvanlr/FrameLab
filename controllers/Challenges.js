import { response } from "express";
import { postChallenge, getChallenges, getChallengeByTitle, getChallengeActive } from "../models/Challenge.js"

export async function creationChallenge(request, response) {
    const url = "/upload/" + request.file.filename;
    const challenge = await postChallenge(request.body.title, request.body.description, url, request.body.date_start, request.body.date_end);
    response.redirect("/challenges.html");
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