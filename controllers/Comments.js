import {postcomment,getcomments,getCommentByID, getCommentByParticipation_id} from "../models/Comments.js"

export async function postComment(request,response) {
    const comment = await postcomment(request.body.content,request.body.user_id,request.body.participation_id);
    
    response.json({succes : true});
}

export async function rechercheComment(request,response) {
    if(request.query.id) {
        const comment = await getCommentByID(request.params.id);
        response.json(comment);
    }
}

export async function getCommentByParticipationId(request,response) {
    const comments = await getCommentByParticipation_id(request.params.id);
    response.json(comments);
}