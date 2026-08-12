# Agenda Eletronica

Aplicacao web para organizar atividades com data de inicio e termino, status (pendente, concluida, cancelada) e visualizacao em calendario ou em lista. Cada usuario tem seu proprio login e so enxerga as proprias atividades.

O projeto e dividido em duas partes que rodam separadas: uma API em Node/Express (`backend`) e uma SPA em React (`frontend`).

## Stack

**Backend**
- Node.js + Express
- Sequelize + MySQL
- JWT para autenticacao e bcrypt para hash de senha

**Frontend**
- React + Vite
- Material UI
- react-big-calendar para a visao de calendario
- notistack e material-ui-confirm para notificacoes e confirmacoes (sem `alert`/`confirm` do navegador)

## Estrutura

```
agenda-eletronica/
├── backend/
│   ├── database.sql          # schema do MySQL
│   └── src/
│       ├── config/           # conexao com o banco
│       ├── models/           # Usuario e Atividade (Sequelize)
│       ├── controllers/      # regras de negocio das rotas
│       ├── middlewares/      # validacao do token JWT
│       └── routes/
└── frontend/
    └── src/
        ├── pages/            # Login, Cadastro, Agenda
        ├── components/       # formulario, lista, calendario, etc.
        ├── contexts/         # sessao do usuario
        └── services/         # cliente axios
```

## Rodando o projeto

Pre-requisitos: Node.js 20+, MySQL 8 (ou compativel) rodando localmente.

### 1. Banco de dados

Crie o banco antes de subir o backend. Pode usar o `database.sql` direto:

```bash
mysql -u root -p < backend/database.sql
```

O Sequelize cuida de criar/atualizar as tabelas a partir dos models quando o servidor sobe (`sequelize.sync()`), entao o `database.sql` serve principalmente como referencia do schema e para deixar o banco `agenda` ja criado.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # ajuste os valores, principalmente JWT_SECRET
npm run dev
```

Variaveis do `.env`:

| Variavel     | Descricao                              |
|--------------|-----------------------------------------|
| `DB_HOST`    | host do MySQL                           |
| `DB_PORT`    | porta do MySQL (padrao 3306)            |
| `DB_NAME`    | nome do banco (`agenda`)                |
| `DB_USER`    | usuario do MySQL                        |
| `DB_PASS`    | senha do MySQL                          |
| `JWT_SECRET` | chave usada para assinar o token        |
| `PORT`       | porta da API (padrao 3333)              |

A API sobe em `http://localhost:3333`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre em `http://localhost:5173`. O `baseURL` da API esta fixo em `frontend/src/services/api.js`, entao se o backend rodar em outra porta/host e preciso ajustar la.

Rotas da SPA: `/login`, `/cadastro` e `/agenda` (privada, exige login; qualquer outro caminho redireciona pra ela).

## API

Rotas publicas:

| Metodo | Rota         | Descricao          |
|--------|--------------|---------------------|
| POST   | `/usuarios`  | cria um usuario      |
| POST   | `/login`     | autentica e retorna o token |

Rotas de atividades (exigem header `Authorization: Bearer <token>`):

| Metodo | Rota                      | Descricao                  |
|--------|---------------------------|------------------------------|
| GET    | `/atividades`             | lista as atividades do usuario logado |
| GET    | `/atividades/:id`         | busca uma atividade         |
| POST   | `/atividades`             | cria uma atividade          |
| PUT    | `/atividades/:id`         | atualiza uma atividade      |
| PATCH  | `/atividades/:id/status`  | atualiza so o status         |
| DELETE | `/atividades/:id`         | remove uma atividade        |

Status possiveis: `pendente`, `concluida`, `cancelada`.

O modelo `Activity` usa soft delete (`paranoid: true`): o `DELETE` marca a coluna `deleted_at` em vez de apagar a linha de fato.

## Scripts

**backend**: `npm run dev` (nodemon) / `npm start`

**frontend**: `npm run dev` / `npm run build` / `npm run preview` / `npm run lint`
