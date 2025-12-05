import express from "express";

// Import de la table de routage
import router from "./router.js";

import cors from "cors";

// Creation du serveur
const app = express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173"
}
app.use(cors(corsOptions));

//app.use("/",express.static("public"));

app.use("/api", router);

app.listen(5500);
