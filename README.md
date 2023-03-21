# Backend das Mariposas para meu amigo Fischer

----------------

O banco de dados onde as coletas (arquivo de BD SQlite e pasta de imagens das coletas) estão não está público, e é de autoria do Guilherme Fischer. 

Contato do Fischer: https://www.inaturalist.org/people/gafischer

Primeiro passo foi fazer a extração dos dados, para isso usei Python. 

Repositório: https://github.com/gui1080/mariposas_fischer

Estou usando DB Browser for SQlite para ver o Banco de Dados na medida que faço o Backend, e Imsomnia para fazer testes da API.

Roda com: 

```

npm run start

```

Na porta: 

```

http://localhost:8000/

```

A requisição para esta porta deve retornar um "OK", indicando que o backend está funcionando.

----------------

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
