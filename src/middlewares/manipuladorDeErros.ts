import mongoose from "mongoose";
import NotFoundError from "../errors/NotFoundError.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
  } else if (erro instanceof mongoose.Error.ValidationError) {
    const mensagensErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
    res.status(400).send({ message: `Os seguintes erros foram encontrados: ${mensagensErro}` });
  } else if (erro instanceof NotFoundError) {
    res.status(erro.status).send({ message: erro.message });
  } else {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export default manipuladorDeErros;
