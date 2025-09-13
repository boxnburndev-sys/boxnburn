import express from "express";
import Member from "../models/Member.js";

const router = express.Router();

// GET all members
router.get("/", async (req, res) => {
  const leden = await Member.find();
  res.json(leden);
});

// POST new member
router.post("/", async (req, res) => {
  const newMember = new Member(req.body);
  await newMember.save();
  res.json(newMember);
});

// DELETE member by ID
router.delete("/:id", async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ message: "Member deleted" });
});

export default router;
