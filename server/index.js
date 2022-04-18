import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";


import absencesRouter from "./routes/absences.js";

// assign an express process to the app variable
const app = express();
const PORT = 5555;

// configure the app to use bodyParser and set a default parameter
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// configure the app to enable cross origin resource sharing (cors)
app.use(cors());

// configure the app to use our routs
app.use("/absences", absencesRouter);

// set up the connection to the database and start the app, once the connection is established

const CONNECTION_URL = "mongodb+srv://nabih:test1234@cluster0.gvddb.mongodb.net/absencemanager?retryWrites=true&w=majority";  
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running");
        })
    })
    .catch((error) => console.log(error.message));
// set another default value for mongoose
mongoose.set("returnOriginal", false);
