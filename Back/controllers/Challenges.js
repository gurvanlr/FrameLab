import { response } from "express";
import {postChallenge,getChallenges,getChallengeByTitle,getChallengeActive } from "../models/Challenge.js"

export async function creationChallenge(request,response) {
     try {
            const challenge = await postChallenge(request.params.title,request.params.descrition,request.params.url,request.params.date_start,request.params.date_end);
            response.json(challenge)
    
        } catch (error) {
            console.log(error);
        }
}

export async function allChallenges(request,response) {
        const challenges = await getChallenges();
        response.json(challenges);
}

export async function rechercheChallengeByTitle(request,response) {
    const challenge = await getChallengeByTitle(request.params.title);
    response.json (challenge);
}

export async function rechercheChallengeActive(request,response) {
    const challenges = await getChallengeActive();
    response.json(challenges);
}