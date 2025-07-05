import dotenv from "dotenv";
dotenv.config();
// import AWS from "aws-sdk";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // Required for many RDS setups
  },
});

pool.on('connect', () => {
  console.log("Connected to PostgreSQL RDS successfully");
});

export default pool;

// AWS.config.update({
//     region:"ap-south-1",
//     endpoint:"http://dynamodb.ap-south-1.amazonaws.com",
//     accessKeyId:process.env.ACCESS_ID,
//     secretAccessKey:process.env.ACCESS_KEY
// });

// AWS.config.getCredentials((err) => {
//     if (err) {
//       console.log(err.stack);
//     } else {
//       console.log(("ACCESS KEY:", AWS.config.credentials.accessKeyId));
//     }
//   });
  
//   const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
//   export default docClient