import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    pages: { type: Number, required: false },
    author: autorSchema,
  },
  { versionKey: false },
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
