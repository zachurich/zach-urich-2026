import mongoose, { InferSchemaType, Schema } from "mongoose";
import { v4 } from "uuid";

const GuestBookEntrySchema = new Schema({
  id: { type: String, required: true, default: v4() },
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

type GuestBookEntry = InferSchemaType<typeof GuestBookEntrySchema>;

// Reuse existing model if compiled, otherwise compile a new one
export default mongoose.models.GuestBookEntry ||
  mongoose.model<GuestBookEntry>("GuestBookEntry", GuestBookEntrySchema);
