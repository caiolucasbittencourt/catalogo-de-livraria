# Catálogo de Livraria

![NodeJS](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

API REST com operações de CRUD para livros e autores e relacionamento entre essas entidades. Desenvolvido com foco em organização por camadas, validação de dados e tratamento centralizado de erros.

## Tecnologias

- Node.js
- TypeScript
- Express
- Mongoose
- MongoDB
- Jest
- SWC
- ESLint
- Prettier
- Docker

## Funcionalidades

- CRUD de Livros
- CRUD de Autores
- Busca por ID
- Relacionamento entre livros e autores

## Pré-requisitos

- Node.js 22+ (ou use `.nvmrc`)
- MongoDB (local ou Atlas)
- Docker (opcional)

## Instalação

```bash
git clone https://github.com/caiolucasbittencourt/catalogo-de-livraria.git
cd catalogo-de-livraria
npm install
```

## Configuração

Crie um arquivo `.env` na raiz baseado no `.env.example`:

```bash
cp .env.example .env
```

Defina a variável `DB_CONNECTION_STRING` com sua conexão do MongoDB.

## Executando

### Desenvolvimento

```bash
npm run dev
```

Executa `src/server.ts` com watch nativo do Node (`--watch`) e type stripping (`--experimental-strip-types`).

### Produção (local)

```bash
npm run build
npm start
```

`npm start` executa `dist/server.js`.

### Docker

```bash
npm run docker:up
npm run docker:up:local
npm run docker:down
npm run docker:logs
npm run docker:build
```

Para Mongo local com Docker, use:

```env
DB_CONNECTION_STRING=mongodb://mongo:27017/catalogo-de-livraria
```

## Scripts

| Script                    | Descrição                                             |
| ------------------------- | ----------------------------------------------------- |
| `npm run dev`             | Executa `src/server.ts` em watch                      |
| `npm run build`           | Compila TypeScript para `dist/`                       |
| `npm start`               | Inicia API a partir de `dist/server.js`               |
| `npm run typecheck`       | Verifica tipos com TypeScript sem gerar build         |
| `npm test`                | Executa Jest via Node com `--experimental-vm-modules` |
| `npm run test:watch`      | Executa testes em modo watch                          |
| `npm run test:coverage`   | Executa testes com cobertura                          |
| `npm run lint`            | Lint em `src/` e `tests/`                             |
| `npm run lint:fix`        | Corrige problemas de lint automaticamente             |
| `npm run format`          | Formata arquivos `.ts` de `src/` e `tests/`           |
| `npm run format:check`    | Verifica formatação sem alterar arquivos              |
| `npm run docker:up`       | Sobe API com Docker Compose                           |
| `npm run docker:up:local` | Sobe API + Mongo local (profile `local-db`)           |
| `npm run docker:down`     | Derruba containers                                    |
| `npm run docker:logs`     | Exibe logs da API                                     |
| `npm run docker:build`    | Rebuild da imagem da API                              |

## Estrutura

```text
src/
  config/
  controllers/
  errors/
  middlewares/
  models/
  routes/
  app.ts
  server.ts
tests/
  integration/
  app.ts
  setup.ts
```

## Rotas

### Base

| Método | Rota | Descrição          |
| ------ | ---- | ------------------ |
| GET    | `/`  | Informações da API |

### Livros

| Método | Rota          | Descrição                   |
| ------ | ------------- | --------------------------- |
| GET    | `/livros`     | Lista todos os livros       |
| GET    | `/livros/:id` | Busca um livro por ID       |
| POST   | `/livros`     | Cadastra um novo livro      |
| PUT    | `/livros/:id` | Atualiza um livro existente |
| DELETE | `/livros/:id` | Remove um livro             |

### Autores

| Método | Rota           | Descrição                   |
| ------ | -------------- | --------------------------- |
| GET    | `/autores`     | Lista todos os autores      |
| GET    | `/autores/:id` | Busca um autor por ID       |
| POST   | `/autores`     | Cadastra um novo autor      |
| PUT    | `/autores/:id` | Atualiza um autor existente |
| DELETE | `/autores/:id` | Remove um autor             |

## Licença

Distribuído sob a licença MIT. Consulte o arquivo `LICENSE`.
