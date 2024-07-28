import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import docClient from "../dbConnect.js";

export const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const params_scan = {
            TableName: 'Vandit_Agency_Users',
            FilterExpression: 'Email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        }
        docClient.scan(params_scan, async function (err, data) {
            if (err) {
                return res.send(err);
            }
            else {
                if (data.Items.length > 0) {
                    return res.status(302).send("Email already in use. Please Login.");
                }
                else {
                    const saltRounds = 10;
                    const hashedPassword = await bcrypt.hash(password, saltRounds);
                    const UsersId = uuidv4();
                    const params_put = {
                        TableName: "Vandit_Agency_Users",
                        Item: {
                            UsersId, Name: name, Email: email, Password: hashedPassword
                        }
                    }
                    await docClient.put(params_put).promise();
                    res.status(200).send("New user created successfully.");
                }
            }
        });
    }
    catch (err) {
        res.status(404).send(err);
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    const params = {
        TableName: 'Vandit_Agency_Users',
        FilterExpression: 'Email = :email',
        ExpressionAttributeValues: {
            ':email': email
        }
    }

    docClient.scan(params, async function (err, data) {
        if (err) { res.send(err); }
        else {
            if (data.Items.length == 0) {
                return res.status(301).send("No User Found.");
            }
            const match = await bcrypt.compare(password, data.Items[0].Password);
            if (match) {
                return res.status(200).send("Successfully Logged in.");
            }
        }
    })
}

// module.exports = {signupController,loginController};