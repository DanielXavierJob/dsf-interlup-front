# dsf-interlup-front

Bem-vindo ao repositório dsf-interlup-front! Este repositório contém o código-fonte para o projeto DSF Interlup FRONT.

## Descrição

DSF Interlup FRONT é uma interface destinada a gerenciar tarefas no estilo Kanban. Com ela, você pode criar tarefas e organizá-las por colunas.

## Instalação Local

Para executar este projeto localmente, siga estas etapas:

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/danielxavierjob/dsf-interlup-front.git
   ```

2. Instale as dependências do projeto:

   ```bash
   cd dsf-interlup-front
   npm install
   ```

3. Configure o ambiente:

   - Crie um arquivo `.env` no diretório raiz.
   - Defina as variáveis de ambiente necessárias no arquivo `.env`. Exemplo:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

4. Execute a aplicação React:

   ```bash
   npm start
   ```

6. Acesse o projeto em `http://localhost:3000`.

## Instalação Docker

Para executar este projeto com Docker, siga estas etapas:

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/danielxavierjob/dsf-interlup-front.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd dsf-interlup-front
   ```

3. Configure o ambiente:

   - Crie um arquivo `.env` no diretório raiz.
   - Defina as variáveis de ambiente necessárias no arquivo `.env`. Exemplo:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

4. Execute a aplicação com Docker:

   ```bash
   docker compose build
   docker compose up
   ```

5. Acesse o projeto em `http://localhost:3000`.

## Uso

Quando a aplicação estiver online, crie uma conta e faça login. Por padrão, você já terá 3 colunas com 1 exemplo de tarefa em cada uma. Lá você verá as opções para criar novas colunas, criar novas tarefas, organizá-las e excluí-las facilmente.

## Contribuição

Contribuições são bem-vindas! Se você tiver ideias para melhorias, correções de bugs ou novos recursos, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).