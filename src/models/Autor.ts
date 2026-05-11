import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    nationality: { type: String, required: false },
  },
  { versionKey: false },
);

const autor = mongoose.model("autores", autorSchema);

export { autor, autorSchema };
