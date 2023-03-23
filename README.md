# Backend em NodeJs para gestão de Mariposas

## Catalogação, gestão de imagens e de coletas

----------------

O banco de dados onde as coletas (arquivo de BD SQlite e pasta de imagens das coletas) estão não está público, e é de autoria do Guilherme Fischer. 

Contato do Fischer: https://www.inaturalist.org/people/gafischer

Primeiro passo foi fazer a extração dos dados, para isso usei Python. 

Não criei modelos para essa API, é tudo de um banco de dados de um script prévio, então só escrevi as insterações com o BD como queries de SQLite.

Repositório: https://github.com/gui1080/mariposas_fischer

Estou usando DB Browser for SQlite para ver o Banco de Dados na medida que faço o Backend, e Imsomnia para fazer testes da API.

Para baixar as dependências, rode de dentro do diretório do trabalho em cópia local: 

```

sudo npm install

```

Isso deve baixar todas as dependências necessárias numa pasta chamada "node_modules". 

Roda com: 

```

npm run start
npm run dev

```

Que se equivale respectivamente a:

```

node server.js
nodemon server.js

```

Na porta: 

```

http://localhost:8000/test/

```

A requisição para esta porta deve retornar um "OK", indicando que o backend está funcionando.

----------------

### Endereços da API (Extreme Quickguide)

```

// Tests route
POST - "/test/"
GET - "/test/welcome_test"

// Users route
POST - "/users/register"
POST - "/users/login"
GET - "/users/:id"
POST - "/users/email"
PATCH - "/users/update/:email"
DELETE - "/delete/users/:email"
POST - "/users/users_get"
POST - "/users/logout"

// Main Moths route
GET - "/MainMoths/mainMoths_getAll"
GET - "/MainMoths/mainMoths_get/:nome"
GET - "/MainMoths/mainMoths_get/:id"
POST - "/MainMoths/registerMainMoth"
DELETE - "/MainMoths/delete/:nome"
POST - "/MainMoths/mainMoths_filter"
PATCH - "/MainMoths/mainMoths_PatchId/:id"
PATCH - "/MainMoths/mainMoths_PatchNome/:nome"

// Moth Imgs route
GET - "/MothImgs/imageMoths_getAll"
GET - "/MothImgs/imageMoths_getSomeFamilia/:id"
GET - "/MothImgs/imageMoths_getSomeFamilia/:nome"
GET - "/MothImgs/imageMoths_getSomeFamilia/:familia"
GET - "/MothImgs//imageMoths_getSomeSubfamilia/:familia/:sub_familia"
POST - "/MothImgs/imageMoths_newImage/"
DELETE - "/MothImgs/delete_img_id/:id"
DELETE - "/MothImgs/delete_img_arquivo/:arquivo"

// Moth colletion route
GET - "/MothCollection/collectionMoths_getAll"
POST - "/MothCollection/collectionMoths_filter_genus/:genus"
GET - "/MothCollection/collectionMoths_filter_species/:species"
GET - "/MothCollection/collectionMoths_filter_locality/:locality"
GET - "/MothCollection/collectionMoths_get/:id"
GET - "/MothCollection/collectionMoths_get/:id"
GET - "/MothCollection/collectionMoths_filter_main/:id_main"
PATCH - "/MothCollection/collectionMoths_update/:id_coleta"
DELETE - "/MothCollection/collectionMoths_/:id"
POST - "/MothCollection/collectionMoths_add/:referencia_main"

```

----------------

### Banco de dados

![The database](https://github.com/gui1080/mariposas_fischer/blob/master/bd.png?raw=true)

Obs: A coluna de caminho absoluto das imagens foi deletada na versão final.

Obs 1: A tabela de usuários foi criada depois ao desenvolver o backend, que inclui um sistema de autenticação.

```

CREATE TABLE "coleta" (
    "inst_bar_code" TEXT,
    "genus" TEXT,
    "species" TEXT,
    "author" TEXT,
    "sex" TEXT,
    "number_of_spec" REAL,
    "museum_coll" TEXT,
    "country" TEXT,
    "province" TEXT,
    "locality" TEXT,
    "date" TEXT,
    "collector" TEXT,
    "type" TEXT,
    "accession" TEXT,
    "lat" TEXT,
    "lat1" TEXT,
    "lat2" TEXT,
    "lat_hem" TEXT,
    "long" REAL,
    "long1" TEXT,
    "long2" REAL,
    "long_hem" TEXT,
    "id_coleta" TEXT,
    "referencia_main" TEXT
)

CREATE TABLE "imagens" (
	"identificador"	TEXT,
	"nome"	TEXT,
	"string_arquivo"	TEXT,
	"caminho_relativo"	TEXT,
	"familia_nome"	TEXT,
	"sub_familia_nome"	TEXT,
	"identificador_referencia"	TEXT
)

CREATE TABLE "main" (
    "nome" TEXT,
    "identificador" TEXT
)

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name text, 
    email text UNIQUE, 
    password text, 
    token text, 
    CONSTRAINT email_unique UNIQUE (email)
)

```

----------------

### License

```

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * Guilherme Braga Pinto wrote this file, 
 * and also other Python scripts in this repository.  
 * As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some * day, and you think
 * this stuff is worth it, you can buy me a beer in return.   
 * ----------------------------------------------------------------------------
 */
