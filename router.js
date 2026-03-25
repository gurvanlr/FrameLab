import { Router } from "express";
import { creationUser, getMe, rechercheUser } from "./controllers/Users.js"
import { allChallenges, creationChallenge, rechercheChallengeActive, rechercheChallengeByTitle } from "./controllers/Challenges.js";
import { creationParticipation, allParticipations, rechercheParticipationByID, rechercheParticipationByUser_ID, getParticipationAndUserByChallenge } from "./controllers/participations.js"
import { authByCredentials, authbyTokens, logout } from "./controllers/Authentification.js";
import { upload} from "./controllers/upload.js";
import { allVotes, createVote, rechercheVote, } from "./controllers/Votes.js";
import { getCommentByParticipationId,postComment,rechercheComment} from "./controllers/Comments.js";



const router = Router();

router.post("/users", creationUser);
router.get("/users/me", authbyTokens, getMe);
router.get("/users/:id", rechercheUser);
router.post("/auth/login", authByCredentials);
//router.put("/users/:id/?",[validationToken],  );
router.post("/auth/logout", logout);

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

router.post("/comments", postComment);
router.get("/comments/:id", rechercheComment);
router.get("/comments/participations/:id", getCommentByParticipationId);

export default router;