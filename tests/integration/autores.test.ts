import request from 'supertest';
import app from '../app.js';
import { autor } from '../../src/models/Autor.js';

describe('Autores API', () => {
  describe('GET /autores', () => {
    it('deve retornar uma lista vazia quando não há autores', async () => {
      const response = await request(app).get('/autores');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('deve retornar todos os autores cadastrados', async () => {
      await autor.create({
        name: 'Machado de Assis',
        nationality: 'Brasileiro',
      });

      const response = await request(app).get('/autores');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe('Machado de Assis');
    });
  });

  describe('GET /autores/:id', () => {
    it('deve retornar um autor pelo ID', async () => {
      const novoAutor = await autor.create({
        name: 'Clarice Lispector',
        nationality: 'Brasileira',
      });

      const response = await request(app).get(`/autores/${novoAutor._id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Clarice Lispector');
    });

    it('deve retornar 404 quando o autor não existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';
      const response = await request(app).get(`/autores/${idInexistente}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Autor não encontrado.');
    });
  });

  describe('POST /autores', () => {
    it('deve cadastrar um novo autor', async () => {
      const novoAutor = {
        name: 'Jorge Amado',
        nationality: 'Brasileiro',
      };

      const response = await request(app).post('/autores').send(novoAutor);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Autor cadastrado com sucesso');
      expect(response.body.autor.name).toBe('Jorge Amado');
    });

    it('deve cadastrar um autor sem nacionalidade', async () => {
      const novoAutor = {
        name: 'Autor Sem País',
      };

      const response = await request(app).post('/autores').send(novoAutor);

      expect(response.status).toBe(201);
      expect(response.body.autor.name).toBe('Autor Sem País');
    });
  });

  describe('PUT /autores/:id', () => {
    it('deve atualizar um autor existente', async () => {
      const novoAutor = await autor.create({
        name: 'Nome Antigo',
        nationality: 'País Antigo',
      });

      const response = await request(app)
        .put(`/autores/${novoAutor._id}`)
        .send({ name: 'Nome Atualizado', nationality: 'País Atualizado' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Autor atualizado com sucesso');

      const autorAtualizado = await autor.findById(novoAutor._id);
      expect(autorAtualizado.name).toBe('Nome Atualizado');
    });

    it('deve retornar 404 quando o autor não existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';
      const response = await request(app).put(`/autores/${idInexistente}`).send({ name: 'Teste' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /autores/:id', () => {
    it('deve deletar um autor existente', async () => {
      const novoAutor = await autor.create({
        name: 'Autor para Deletar',
        nationality: 'Brasil',
      });

      const response = await request(app).delete(`/autores/${novoAutor._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Autor deletado com sucesso');

      const autorDeletado = await autor.findById(novoAutor._id);
      expect(autorDeletado).toBeNull();
    });

    it('deve retornar 404 quando o autor não existe', async () => {
      const idInexistente = '507f1f77bcf86cd799439011';
      const response = await request(app).delete(`/autores/${idInexistente}`);

      expect(response.status).toBe(404);
    });
  });
});
