import express from "express";

// Import de la table de routage
import router from "./router.js";
import cookieParser from "cookie-parser";

// Creation du serveur
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use("/",express.static("public"));

app.use("/upload", express.static("public/upload"));
app.use("/api", router);

app.listen(process.env.PORT || 5500);
