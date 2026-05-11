import request from 'supertest';
import app from '../app.js';
import { autor } from '../../src/models/Autor.js';
import livro from '../../src/models/Livro.js';

describe('Livros API', () => {
  let autorCriado;

  beforeEach(async () => {
    autorCriado = await autor.create({
      name: 'J.R.R. Tolkien',
      nationality: 'Britânico',
    });
  });

  describe('GET /livros', () => {
    it('deve retornar uma lista vazia quando não há livros', async () => {
      const response = await request(app).get('/livros');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('deve retornar todos os livros cadastrados', async () => {
      await livro.create({
        title: 'O Hobbit',
        price: 50,
        pages: 320,
      });

      const response = await request(app).get('/livros');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('O Hobbit');
    });
  });

  describe('GET /livros/:id', () => {
    it('deve retornar um livro pelo ID', async () => {
      const novoLivro = await livro.create({
        title: 'O Senhor dos Anéis',
        price: 120,
        pages: 950,
      });

      const response = await request(app).get(`/livros/${novoLivro._id}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('O Senhor dos Anéis');
    });

    it('deve retornar 404 quando o livro não existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';
      const response = await request(app).get(`/livros/${idInexistente}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Livro não encontrado.');
    });
  });

  describe('POST /livros', () => {
    it('deve cadastrar um novo livro com autor válido', async () => {
      const novoLivro = {
        title: 'Silmarillion',
        price: 80,
        pages: 480,
        autor: autorCriado._id.toString(),
      };

      const response = await request(app).post('/livros').send(novoLivro);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Livro cadastrado com sucesso');
      expect(response.body.livro.title).toBe('Silmarillion');
    });

    it('deve retornar 404 quando o autor não existe', async () => {
      const novoLivro = {
        title: 'Livro Sem Autor',
        price: 50,
        autor: '507f1f77bcf86cd799439011',
      };

      const response = await request(app).post('/livros').send(novoLivro);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Autor não encontrado.');
    });
  });

  describe('PUT /livros/:id', () => {
    it('deve atualizar um livro existente', async () => {
      const novoLivro = await livro.create({
        title: 'Livro Antigo',
        price: 30,
      });

      const response = await request(app)
        .put(`/livros/${novoLivro._id}`)
        .send({ title: 'Livro Atualizado', price: 40 });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Livro atualizado com sucesso');

      const livroAtualizado = await livro.findById(novoLivro._id);
      expect(livroAtualizado.title).toBe('Livro Atualizado');
    });

    it('deve retornar 404 quando o livro não existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';
      const response = await request(app).put(`/livros/${idInexistente}`).send({ title: 'Teste' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /livros/:id', () => {
    it('deve deletar um livro existente', async () => {
      const novoLivro = await livro.create({
        title: 'Livro para Deletar',
        price: 25,
      });

      const response = await request(app).delete(`/livros/${novoLivro._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Livro deletado com sucesso');

      const livroDeletado = await livro.findById(novoLivro._id);
      expect(livroDeletado).toBeNull();
    });

    it('deve retornar 404 quando o livro não existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';
      const response = await request(app).delete(`/livros/${idInexistente}`);

      expect(response.status).toBe(404);
    });
  });
});
