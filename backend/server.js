import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import hpp from "hpp";


const PORT = process.env.PORT;
const app = express();


dotenv.config();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json({
limit:"20kb"
}));
app.use(express.urlencoded({ extended: true }));
app.use(hpp());



// cross origin for client-server handshake
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);



app.get("/", (req, res) => {
  res.send("Purohit Sewa Backend is running!");
});



import bookingRoutes from "./routes/booking.routes.js"
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";


app.use("/api/v1", bookingRoutes);
app.use("/api/v1", authRoutes );
app.use("/api/v1", adminRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});