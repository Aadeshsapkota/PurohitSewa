import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookingRoutes from "./routes/booking.routes.js";


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



app.use("/api/v1", bookingRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});