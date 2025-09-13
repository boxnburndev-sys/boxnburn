import express from "express";
import Reservation from "../models/Reservation.js";

const router = express.Router();

// GET all reservations
router.get("/", async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
});

// POST new reservation
router.post("/", async (req, res) => {
  const newRes = new Reservation(req.body);
  await newRes.save();
  res.json(newRes);
});

// DELETE reservation by ID (friendly ID or Mongo _id)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Reservation.findOneAndDelete({ $or: [{ id }, { _id: id }] });
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Reservation deleted" });
});

export default router;
