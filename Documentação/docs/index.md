# Documentação - Backend em NodeJs para gestão de Mariposas

## Catalogação, gestão de imagens e de coletas

(Link do Github)[https://github.com/gui1080/BackendFischer_Mariposas]

### Passo prévio: extração de dados

Primeiro passo foi fazer a extração dos dados, usando Python. 

Não foram criados modelos para essa API, é tudo de um banco de dados de um script prévio, então só escrevi as insterações com o BD como queries de SQLite.

(Repositório da extração dos dados, que originam o banco de dados de Marioposas)[https://github.com/gui1080/mariposas_fischer]

### Rodar documentação

Rodar na pasta "documentação" para ler a documentação:

```

mkdocs serve 

```

Rodar na pasta "documentação" para exportar a documentação:

```

mkdocs build 

```

A documentação em si fica hosteada na branch "gh-pages" do repositório que guarda o backend.

### Rodar o trabalho

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

A requisição para esta porta deve retornar um "OK", indicando que o backend está funcionando!