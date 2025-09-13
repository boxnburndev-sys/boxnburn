import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import ledenRoutes from "./routes/leden.js";
import reservationRoutes from "./routes/reservations.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/leden", ledenRoutes);
app.use("/api/reservations", reservationRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("✅ Server running on port " + (process.env.PORT || 5000))
    );
  })
  .catch(err => console.error("❌ DB connection error:", err));
