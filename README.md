# idrink - App de delivery

## Sobre o projeto

O idrink é um projeto Full-Stack que foi feito em grupo, nele foi implementado tando o Front-End quanto o Back-End. O idrink é um app de delivery de uma distribuidora de bebidas que apresenta as seguintes funcionalidades:
* Cadastro de usuários com diferentes tipos de acesso. Os tipos de usuários cadastrados são: administrador, vendedor e cliente.
* Acesso a diferentes funções de acordo com o tipo do usuário que faz o login.

O usuário administrador quando faz login tem acesso a uma tela em que é possível cadastrar ou excluir usuários de qualquer tipo.

O usuário cliente, ao fazer login, acessa uma tela de produtos que podem ser adicionados a um carrinho, sendo que qualquer quantidade de qualquer produto pode ser adicionada. Após finalizar a compra e enviar os produtos para o carrinho, o usuário é direcionado para uma página em que ele pode concluir o pedido depois de selecionar o vendedor e digitar o endereço para envio. O cliente também tem acesso à página de pedidos, onde é possível ver todos os seus pedidos e clicar em um para visualização, sendo assim possível marcar aqueles que estiverem com estatus "em trânsito" como entregue.

O usuário vendedor tem acesso à tela de pedidos depois de fazer login, nela ele pode ver todos os pedidos que ele vendeu e clicar em um para ir para uma tela do respectivo pedido, de modo que nessa segunda tela ele pode mudar o estatus do pedido, 
preparando-o e enviando-o, sempre nessa ordem.

## Tecnologias utilizadas

### Front-End
* JavaScript;
* React;
* React Router;

### Back-End
* JavaScript;
* Node.Js;
* Express;
* Sequelize;
* MySQL;
* Json Web Token (JWT);
* md5;
* cors;
* express-async-errors;
* Joi.

## Orientações para a execução do projeto

Para executar o projeto é preciso que o mysql esteja executando no sistema e o node versão 16 ou superior esteja instalado.

Faça o clone do projeto:

    git clone https://github.com/marceloalexandredacunhasimao/idrink.git

Instale as dependências

    cd idrink
    npm install


Antes de continuar e inicializar o banco de dados, é necessário criar e configurar um arquivo de variáveis de ambiente .env dentro da pasta ./back-end. Siga o exemplo apresentado no arquivo .env.example, na mesma pasta.

Inicialize o banco de dados

    npm run dev:prestart

Inicialize a execução do projeto:

    npm start

Para verificar o funcionamento da aplicação faça login com os usuários iniciais, o banco de dados é pré-populado com um administrador, um vendedor e um cliente que podem ser utilizados para testar o funcionamento da aplicação. Os logins e senhas iniciais podem ser vistos no arquivo "back-end/db.example.sql". Os três usuários iniciais são "adm@deliveryapp.com" com senha "--adm2@21!!--", "fulana@deliveryapp.com" com senha "fulana@123" e "zebirita@email.com" com senha "\$#zebirita#$". As aspas não fazem parte do login nem da senha.
Novos usuários clientes podem ser adicionados por qualquer pessoa antes do login, na tela inicial, mas só depois de fazer login como administrador é possível adicionar novos vendedores e administradores.
Para parar a execução digite "npm stop" na raiz do projeto. Caso ocorra algum problema no banco de dados, como a exclusão de todos os administradores, execute "npm stop" e "npm run db:reset" em seguida para restaurar o banco de dados.