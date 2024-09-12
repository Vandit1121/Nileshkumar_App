// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import docClient from "../dbConnect.js";
import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB();

export const allPartyName = async (req, res) => {
    const partyName = [];
    const result = await dynamoDB.executeStatement({ Statement: `SELECT PartyName FROM Vandit_Agency_PartyName` }).promise();
    result.Items.map((item) => partyName.push(item.PartyName.S));
    res.send(partyName);
}

export const singlePartyDetails = async (req, res) => {
    const partyName = req.query.param1;
    const partyDetails = [];
    const result = await dynamoDB.executeStatement({ Statement: `SELECT * FROM Vandit_Agency_PartyName WHERE "PartyName" = '${partyName}'` }).promise();
    result.Items.map((item)=> {partyDetails.push({"Taluka":item.Taluka.S});
                                partyDetails.push({"DealerName":item.DealerName.S});
                                partyDetails.push({"PartyNameID":item.PartyNameID.S});
                                partyDetails.push({"PhoneNumber":item.PhoneNumber.S});
                                });
    res.send(partyDetails);
}

export const addNewPartyController = async(req,res) =>{
    console.log(req.query);
    try{
        const allPartyDetails = [];
        const PartyNameID = uuidv4();
        const params_put = {
            TableName: "Vandit_Agency_PartyName",
            Item: {
                PartyNameID, PartyName: req.query.partyName, DealerName: req.query.dealerName, Taluka: req.query.taluka,PhoneNumber: req.query.phoneNumber, PartyAddress: req.query.partyAddress
            }
        }
        await docClient.put(params_put).promise();
        res.status(200).send("Successfully added new party.");

    }
    catch(err){
        res.status(302).send(err);
    }
    
}