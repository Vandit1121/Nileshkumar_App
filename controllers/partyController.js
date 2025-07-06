// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import db from "../dbConnect.js";


export const allPartyName = async (req, res) => {
    try{
      const partyName = [];
      const data = await db.query("SELECT PartyName FROM Vandit_Agency_PartyName;");

      console.log(data);

      data.rows.map((item) => partyName.push(item.partyname))

      console.log(partyName);

      res.send(partyName);

    }
    catch(err){
        console.log(err);
    }

};

// export const singlePartyDetails = async (req, res) => {
//     const partyName = req.query.param1;
//     const partyDetails = [];
//     const result = await dynamoDB.executeStatement({ Statement: `SELECT * FROM Vandit_Agency_PartyName WHERE "PartyName" = '${partyName}'` }).promise();
//     result.Items.map((item)=> {partyDetails.push({"Taluka":item.Taluka.S});
//                                 partyDetails.push({"OwnerName":item.OwnerName.S});
//                                 partyDetails.push({"PartyNameID":item.PartyNameID.S});
//                                 partyDetails.push({"PhoneNumber":item.PhoneNumber.S});
//                                 });
//     res.send(partyDetails);
// }

export const addNewPartyController = async (req, res) => {
  try {
    const { partyName, ownerName, taluka, phoneNumber, partyAddress } =
      req.body;
    const PartyNameID = uuidv4();
    const party_data = await db.query(
      "INSERT INTO Vandit_Agency_PartyName  VALUES ($1, $2, $3, $4, $5, $6); ",
      [PartyNameID, partyName, ownerName, taluka, phoneNumber, partyAddress]
    );
    res.status(200).send("Successfully added new party.");
  } catch (err) {
    console.log(err);
    if (err.code == "23505") {
      res.status(400).send("Party Name already exists");
    }
    res.status(500).send("Internal Server Error");
  }
};
