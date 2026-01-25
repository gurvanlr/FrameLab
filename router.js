import { Router } from "express";
import { allUsers, creationUser, getMe, rechercheUser } from "./controllers/Users.js"
import { allChallenges, creationChallenge, rechercheChallengeActive, rechercheChallengeByTitle } from "./controllers/Challenges.js";
import { creationParticipation, allParticipations, rechercheParticipationByID, rechercheParticipationByUser_ID, getParticipationAndUserByChallenge } from "./controllers/participations.js"
import { authByCredentials, authbyTokens } from "./controllers/Authentification.js";
import { upload} from "./controllers/upload.js";
import { allVotes, createVote, rechercheVote, } from "./controllers/Votes.js";



const router = Router();

router.get("/users", allUsers);
router.post("/users", creationUser);
router.get("/users/me", authbyTokens, getMe);
router.get("/users/:id", rechercheUser);
router.post("/auth/login", authByCredentials);

router.post("/challenges", upload.single("uploaded_file"), creationChallenge);
router.get("/challenges", allChallenges);
router.get("/challenges/active", rechercheChallengeActive);
router.get("/challenges/:id/participations",getParticipationAndUserByChallenge);
router.get("/challenges/:title", rechercheChallengeByTitle);

router.post("/participations", creationParticipation);
router.get("/participations", allParticipations);
router.get("/participations/:id", rechercheParticipationByID);

router.post("/votes", createVote);
router.get("/votes", allVotes);
router.get("/votes/:id", rechercheVote);
router.get("/votes/:participation_id", rechercheVote);

//router.post("/comment", postComment);
//router.get("/comments", getcomments);
//router.get("/comments/:id", getCommentByID);
//router.get("/comments/particiapations/:id", getCommentByParticipation_id);

export default router;