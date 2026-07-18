import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Purohit Sewa Backend is running!");
});

const PORT = process.env.PORT;


import bookingRoutes from "./routes/booking.routes.js";

app.use("/api/v1", bookingRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});