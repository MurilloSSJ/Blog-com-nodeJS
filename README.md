# Blog Com sistema de autenticacao
 Projeto de um blog, com sistema de autenticação, e rotas privativas, o projeto se consiste basicamente
 em gerar um sistema de gerenciamento de posts e cartegorias, onde temos os usuarios admins, e os
 usuários normais, sendo que para fazer um *CRUD* em cartegorias ou em posts, precisamos ser
 admins.

 ## Front End
 O front do site foi desenvolvido com um framework chamado handlebars, e com bootstrap, para que
 eu conseguisse focar mais no back end.

 ## Back End
 O back foi desenvolvido com Node, composto das seguintes bibliotecas/frameworks:
  * Express
  * bodyParser
  * mongoose
  * connect-flash
  * passport
  * nodemon
  * Express-session
  * bcryptjs
  <br/>
Além disso, o banco de dados utilizado, foi o mongo.

## Como Funciona?
Têm-se a parte de usuários, e uma parte exclusiva para administradores, onde os mesmos podem
fazer o *CRUD* dos posts e cartegorias, enquanto os usuários só tem acesso a leitura, so têm
uma única conta de administrador, e para efeitos de teste, vou disponibilizar aqui:
<br/>
*login* : admin
<br/>
*password* : SmkxUZc1p7ziA
<br/>
Pode-se criar uma conta normal, porêm *ela não sera de administador*
