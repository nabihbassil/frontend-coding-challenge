import express from "express";
import {getAbsences, getAbsence} from "../controllers/absences.js";

const router = express.Router();

router.get("/", getAbsences);
router.get("/:id",  getAbsence);

export default router;
