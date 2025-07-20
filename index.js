import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import partyRoutes from "./routes/partyRoutes.js";
import productRoutes from "./routes/productRoutes.js";
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/auth",authRoutes);
app.use("/party",partyRoutes);
app.use("/product", productRoutes);

const PORT  = process.env.PORT || 4001;

app.listen(PORT,() => {
    console.log("server is running...");
})
