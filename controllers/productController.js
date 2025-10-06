import db from "../dbConnect.js";
import { v4 as uuidv4 } from "uuid";

export const addNewProduct = async (req, res) => {
    try {
        const {productName, productPrice, productQuantity} = req.body;
        const productId = uuidv4();

        const prod_data = await db.query("INSERT INTO Vandit_Agency_Products VALUES ($1, $2, $3, $4); ", [productId,productName, productPrice, productQuantity ]);
        
        res.status(200).send({prod_data});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export const productDetails = async (req, res) => {
    try {
        const prodDetails = [];
        const productData = await db.query("SELECT ProductName FROM Vandit_Agency_Products");
        productData.rows.map((item) => prodDetails.push(item.productname));
        res.status(200).send({prodDetails});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}