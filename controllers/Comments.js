import {postcomment,getcomments,getCommentByID, getCommentByParticipation_id} from "../models/Comments.js"

export async function createComments(request,response) {
    const comment = await postcomment(request.params.contentcomment);
    response.json(comment);
}

export async function allComments(request,response) {
    const comments = await getcomments();
    response.json(comments);
}

export async function rechercheComment(request,response) {
    if(request.query.id) {
        const comment = await getCommentByID(request.params.id);
        response.json(comment);
    }
    else if (request.query.participation_id) {
        const comment = await getCommentByParticipation_id();
        response.json(comment);
    } 
}