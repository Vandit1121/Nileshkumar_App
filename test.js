// test.js
import db from "./dbConnect.js";

async function testConnection() {
  try {
    const res = await db.query("SELECT * FROM Vandit_Agency_Users");
    console.log("Current Time from RDS:", res);
  } catch (err) {
    console.error("Connection error:", err);
  }
}

testConnection();
