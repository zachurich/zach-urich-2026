import mongoose, { Schema } from "mongoose";

const GuestBookEntrySchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

// Reuse existing model if compiled, otherwise compile a new one
export default mongoose.models.GuestBookEntry ||
  mongoose.model("GuestBookEntry", GuestBookEntrySchema);
