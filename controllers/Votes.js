import { get } from "http";
import { postVote, getvotes, getVoteByID, getVoteByParticipationID } from "../models/Votes.js"

export async function createVote(request, response) {
    if (request.body.user_id == request.body.participation_id) {
        response.json({
            succes: false,
        });
    } else {
        const vote = await postVote(request.body.creative_note, request.body.technical_note, request.body.theme_note, request.body.user_id, request.body.participation_id);

        response.json({
            succes: true ,
            vote: vote
        });
    }
}

export async function allVotes(request, response) {
    const votes = await getvotes();
    response.json(votes);
}

export async function rechercheVote(request, response) {
    if (request.query.id) {
        const vote = await getVoteByID(request.query.id);
        response.json(vote);
    } else if (request.query.participation_id) {
        const vote = await getVoteByParticipationID(request.query.participation_id);
        response.json(vote);
    }

}