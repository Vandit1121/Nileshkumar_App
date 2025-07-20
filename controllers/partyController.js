
import { v4 as uuidv4 } from "uuid";
import db from "../dbConnect.js";


export const allPartyName = async (req, res) => {
    try{
      const partyName = [];
      const data = await db.query("SELECT PartyName FROM Vandit_Agency_PartyName;");
      data.rows.map((item) => partyName.push(item.partyname))
     res.status(200).send({partyName});

    }
    catch(err){
        res.status(500).send("Internal Server Error");
        console.log(err);
    }

};

export const partyDetails = async (req, res) => {
  try{
    const partyName = req.query.partyName;
    const partyDetailsArray= [];
    const partyDetails = await db.query(`SELECT * FROM Vandit_Agency_PartyName WHERE "partyname" = '${partyName}'`);

    partyDetails.rows.forEach((item) => {
      partyDetailsArray.push({
        taluka: item.taluka,
        ownername: item.ownername,
        partynameid: item.partynameid,
        phonenumber: item.phonenumber
      });
    });

    res.status(200).send({partyDetailsArray});
  }
  catch(error) {
    console.log(error);
  }
}

export const addNewPartyController = async (req, res) => {
  try {
    const { partyName, ownerName, taluka, phoneNumber, partyAddress } =
      req.body;
    const PartyNameID = uuidv4();
    const party_data = await db.query(
      "INSERT INTO Vandit_Agency_PartyName  VALUES ($1, $2, $3, $4, $5, $6); ",
      [PartyNameID, partyName, ownerName, taluka, phoneNumber, partyAddress]
    );
    res.status(200).send({party_data});
  } catch (err) {
    console.log(err);
    if (err.code == "23505") {
      res.status(400).send("Party Name already exists");
    }
    res.status(500).send("Internal Server Error");
  }
};
