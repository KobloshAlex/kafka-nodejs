const express = require("express");
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config({path: "./config/config.env"});

const app = express();
app.use(express.json());
app.use("/v1/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on ${PORT}`));
