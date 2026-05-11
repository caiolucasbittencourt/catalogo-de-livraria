import { autor } from "../models/Autor.js";
import NotFoundError from "../errors/NotFoundError.js";

class AutorController {
  // eslint-disable-next-line no-unused-vars
  static async listarAutores(req, res, next) {
    const listaAutores = await autor.find({});
    res.status(200).json(listaAutores);
  }

  static async listarAutorPorId(req, res, next) {
    const id = req.params.id;
    const autorEncontrado = await autor.findById(id);
    if (autorEncontrado) {
      res.status(200).json(autorEncontrado);
    } else {
      next(new NotFoundError("Autor não encontrado."));
    }
  }

  // eslint-disable-next-line no-unused-vars
  static async cadastrarAutor(req, res, next) {
    const novoAutor = await autor.create(req.body);
    res
      .status(201)
      .json({ message: "Autor cadastrado com sucesso", autor: novoAutor });
  }

  static async atualizarAutor(req, res, next) {
    const id = req.params.id;
    const autorAtualizado = await autor.findByIdAndUpdate(id, req.body);
    if (autorAtualizado) {
      res.status(200).json({ message: "Autor atualizado com sucesso" });
    } else {
      next(new NotFoundError("Autor não encontrado."));
    }
  }

  static async deletarAutor(req, res, next) {
    const id = req.params.id;
    const autorDeletado = await autor.findByIdAndDelete(id);
    if (autorDeletado) {
      res.status(200).json({ message: "Autor deletado com sucesso" });
    } else {
      next(new NotFoundError("Autor não encontrado."));
    }
  }
}

export default AutorController;
