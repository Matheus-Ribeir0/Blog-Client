# Documentação do Projeto Fullstack

Este repositório contém uma aplicação fullstack desenvolvida para consolidar conhecimentos em tecnologias modernas e boas práticas no desenvolvimento de software. O projeto explora funcionalidades essenciais, como autenticação de usuários, integração com APIs, validação de dados e roteamento avançado no front-end.

---

## Tecnologias Utilizadas

### Front-End
- **React**: Biblioteca para a construção de interfaces de usuário dinâmicas.
- **React Hooks**: `useState` e `useEffect` para gerenciar estados e efeitos colaterais.
- **React Router**: Sistema de navegação e gerenciamento de rotas.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **Auth Context**: Gerenciamento centralizado de autenticação e tokens.
- **Formik**: Manipulação de formulários complexos com facilidade.
- **Yup**: Framework para validação de esquemas de dados.
- **Material-UI**: Conjunto de componentes estilizados e ícones.

---
## Funcionalidades Principais

### 1. Gerenciamento de Rotas
- Navegação dinâmica com proteção condicional para rotas restritas a usuários autenticados.

### 2. Autenticação Centralizada
- Implementação de um Context API para gerenciar o estado de autenticação e tokens de acesso.

### 3. Validação e Formulários
- Validação rigorosa com Yup para entradas do usuário.
- Gerenciamento simplificado de formulários com Formik.

### 4. Integração com APIs
- Requisições eficientes usando Axios para consumir APIs e realizar operações CRUD.
- Implementação de autenticação segura nas requisições.

---
## Guia para Configuração e Execução

### Pré-requisitos
- **Node.js** (versão 14 ou superior).
- Gerenciador de pacotes **npm** ou **yarn**.

### Configuração do Front-End

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Acesse o diretório do front-end:
   ```bash
   cd nome-do-repositorio/frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

4. Inicie o ambiente de desenvolvimento:
   ```bash
   npm start
   # ou
   yarn start
   ```

5. Acesse a aplicação no navegador em: [http://localhost:3000](http://localhost:3000)

---

## Estrutura do Projeto

A organização foi projetada para garantir clareza, escalabilidade e facilidade de manutenção.

```
frontend/
├── src/
│   ├── contexts/          # Contextos globais, como autenticação
│   ├── pages/             # Páginas principais vinculadas às rotas
│   ├── App.js             # Componente principal da aplicação
│   └── index.js           # Ponto de entrada para renderização
├── public/                # Arquivos estáticos
├── package.json           # Dependências e scripts
```

---



Confira o Back-End em [https://github.com/Matheus-Ribeir0/Blog-Sever](https://github.com/Matheus-Ribeir0/Blog-Sever)
