import mongoose from "mongoose";

function generateId() {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
}

const reservationSchema = new mongoose.Schema({
  id: { type: String, default: generateId, unique: true },
  naam: { type: String, required: true },
  les: { type: String, required: true },
  datum: { type: String, required: true },
  tijd: { type: String, required: true },
  contact: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Reservation", reservationSchema);
