import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";

AWS.config.update({
    region:"ap-south-1",
    endpoint:"http://dynamodb.ap-south-1.amazonaws.com",
    accessKeyId:process.env.ACCESS_ID,
    secretAccessKey:process.env.ACCESS_KEY
});

AWS.config.getCredentials((err) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(("ACCESS KEY:", AWS.config.credentials.accessKeyId));
    }
  });
  
  const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
  export default docClient