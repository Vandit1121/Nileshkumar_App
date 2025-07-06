import express from "express";
import { addNewPartyController, allPartyName } from "../controllers/partyController.js";

const router = express.Router();

router.get("/fetch-party-data",allPartyName);
// router.get("/singlePartyDetails",singlePartyDetails);
router.post("/add-new-party",addNewPartyController);


export default router;