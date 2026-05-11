import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";
import NotFoundError from "../errors/NotFoundError.js";

class LivroController {
  // eslint-disable-next-line no-unused-vars
  static async listarLivros(req, res, next) {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
  }

  static async listarLivroPorId(req, res, next) {
    const id = req.params.id;
    const livroEncontrado = await livro.findById(id);
    if (livroEncontrado) {
      res.status(200).json(livroEncontrado);
    } else {
      next(new NotFoundError("Livro não encontrado."));
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    const autorEncontrado = await autor.findById(novoLivro.autor);
    if (autorEncontrado) {
      const livroCriado = {
        ...novoLivro,
        author: autorEncontrado.toObject(),
      };
      delete livroCriado.autor;
      const livroSalvo = await livro.create(livroCriado);
      res
        .status(201)
        .json({ message: "Livro cadastrado com sucesso", livro: livroSalvo });
    } else {
      next(new NotFoundError("Autor não encontrado."));
    }
  }

  static async atualizarLivro(req, res, next) {
    const id = req.params.id;
    const livroAtualizado = await livro.findByIdAndUpdate(id, req.body);
    if (livroAtualizado) {
      res.status(200).json({ message: "Livro atualizado com sucesso" });
    } else {
      next(new NotFoundError("Livro não encontrado."));
    }
  }

  static async deletarLivro(req, res, next) {
    const id = req.params.id;
    const livroDeletado = await livro.findByIdAndDelete(id);
    if (livroDeletado) {
      res.status(200).json({ message: "Livro deletado com sucesso" });
    } else {
      next(new NotFoundError("Livro não encontrado."));
    }
  }
}

export default LivroController;
