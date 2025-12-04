import { Router } from "express";
import { allUsers, creationUser, rechercheUser } from "./controllers/Users.js"
import { allChallenges, creationChallenge, rechercheChallengeActive, rechercheChallengeByTitle } from "./controllers/Challenges.js";
import { creationParticipation, allParticipations, rechercheParticipationByID, rechercheParticipationByUser_ID } from "./controllers/participations.js"


const router = Router();

router.get("/users", allUsers);
router.post("/users", creationUser);
router.get("/users/:id", rechercheUser);

router.post("/challenges", creationChallenge);
router.get("/challenges", allChallenges);
router.get("/challenges/:title", rechercheChallengeByTitle);
router.get("/challenges/active", rechercheChallengeActive);

router.post("/participations", creationParticipation);
router.get("/participations", allParticipations);
router.get("/participations/:id", rechercheParticipationByID);

//router.post("/votes", postVote);
//router.get("/votes", getvotes);
//router.get("/votes/:id", getVoteByID);
//router.get("/votes", getVoteByParticipationID);

//router.post("/comment", postComment);
//router.get("/comments", getcomments);
//router.get("/comments/:id", getCommentByID);
//router.get("/comments/particiapations/:id", getCommentByParticipation_id);

export default router;