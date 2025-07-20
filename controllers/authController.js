import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import db from "../dbConnect.js";

export const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const data = await db.query("SELECT * FROM Vandit_Agency_Users WHERE useremail = $1;", [email]);

        if(data.rowCount >0){
            return res.status(302).send("Email already in use. Please Login.");
        }
        else{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const UsersId = uuidv4();

            await db.query("INSERT INTO Vandit_Agency_Users (username, useremail, userpassword) VALUES ($1, $2, $3);", [ name, email, hashedPassword]);

            res.status(200).send("New user created successfully.");
        }
    }
    catch (err) {
        res.status(404).send(err);
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email, password);

        const data = await db.query("SELECT * FROM Vandit_Agency_Users WHERE useremail = $1;", [email]);

        console.log(data);

        if (data.rowCount === 0) {
            return res.status(404).send("No User Found.");
        }

        const match = await bcrypt.compare(password, data.rows[0]?.userpassword);

        if (match) {
            return res.status(200).send("Successfully Logged in.");
        } else {
            return res.status(401).send("Incorrect Password.");
        }
    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).send("Internal Server Error");
    }
};
