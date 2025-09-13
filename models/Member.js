import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  naam: { type: String, required: true },
  les: { type: String, required: true },
  contact: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
