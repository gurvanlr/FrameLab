import { get } from "http";
import {postVote,getvotes,getVoteByID,getVoteByParticipationID} from "../models/Votes.js"

export async function createVote(request,response) {
    //try {
        const vote = await postVote(request.params.creative_note,request.params.technical_note,request.params.theme_note);
    //}catch(e) {
        console.log(e);
        response.json(e)
    //}
}

export async function allVotes(request,response) {
    const votes = await getvotes ();
    response.json(votes);
}

export async function rechercheVote(request,response) {
    if (request.query.id) {
        const vote = await getVoteByID (request.params.id);
        response.json(vote);
    }else if(request.query.participation_id) {
        const vote = await getVoteByParticipationID(request.params.participation_id);
        response.json(vote);
    }
    
}