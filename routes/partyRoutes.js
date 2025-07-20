import express from "express";
import { addNewPartyController, allPartyName, partyDetails } from "../controllers/partyController.js";

const router = express.Router();

router.get("/fetch-party-data",allPartyName);
router.get("/party-details",partyDetails);
router.post("/add-new-party",addNewPartyController);

export default router;