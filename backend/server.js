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
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use("/api/v1", bookingRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", adminRoutes);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});