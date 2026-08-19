import mongoose, { InferSchemaType, Schema } from "mongoose";

const VisitorCountSchema = new Schema({
  id: { type: String, required: true, default: "visitor_count" },
  count: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

type VisitorCount = InferSchemaType<typeof VisitorCountSchema>;

// Reuse existing model if compiled, otherwise compile a new one
export default mongoose.models.VisitorCount ||
  mongoose.model<VisitorCount>("VisitorCount", VisitorCountSchema);
