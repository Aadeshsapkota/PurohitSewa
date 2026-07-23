import express from "express";
import dotenv from "dotenv";
import cors from "cors";
<<<<<<< HEAD
import bookingRoutes from "./routes/booking.routes.js";
import emailRoutes from './routes/email.route.js'
=======


>>>>>>> af098d3 (Updated project)

dotenv.config();
const app = express();


// cross origin for client-server handshake
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//parse payload as json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Purohit Sewa Backend is running!");
});

import bookingRoutes from "./routes/booking.routes.js"
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

app.use("/api/v1", bookingRoutes);
<<<<<<< HEAD
app.use("/api/v1",emailRoutes);
=======
app.use("/api/v1", authRoutes );
app.use("/api/v1", adminRoutes);
>>>>>>> af098d3 (Updated project)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});