import express from "express";
import { addNewPartyController, allPartyName, singlePartyDetails } from "../controllers/partyController.js";

const router = express.Router();

router.get("/allPartyName",allPartyName);
router.get("/singlePartyDetails",singlePartyDetails);
router.post("/addNewParty",addNewPartyController);


export default router;