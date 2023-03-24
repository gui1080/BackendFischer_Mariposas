# O banco de dados

![Banco de Dados V1](https://github.com/gui1080/mariposas_fischer/blob/master/bd.png?raw=true)

Baseado na estrutura de pastas dos estudos do Fischer. 

A tabela principal é a _main_, que contém um nome e um identificador. Em relação a essa tabela, se tem uma tabela de _imagens_ e uma de _coletas_. Cada entrada nessas tabelas extras tem seu identificador, e uma entrada com uma referência ao que se refere na tabela principal, a _main_.

A tabela _imagens_ retorna um endereço relativo de uma imagem guardada no sistema previamente na pasta *fonte_dados_coleta_imagens*, além de ser possível botar imagens novas no sistema, que vão direto para uma subpasta de *uploads*.

Não está descrito na imagem, mas existe uma tabela única e sem relacionamentos com mariposas chamada _users_, que mantém os usuários. Essa tabela é composta de "nome", "email" (único), "id" (autoincremental), "senha" (encriptada) e "token" (gerada no login com validade de apenas 2h, todas as requisições no sistema após o login *devem ser autenticadas com a token*).

O banco de dados está em SQlite, e pode ser navegado com o [DB Browser](https://sqlitebrowser.org/). O banco de dados em si contém dados sensíveis e não está disponibilidado de forma pública. Se necessário, entre em contato com Guilherme Fischer.

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