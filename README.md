# GitHub User Explorer

Uma aplicação web moderna desenvolvida em React.js para explorar usuários e repositórios do GitHub de forma intuitiva e responsiva.

## 🚀 Funcionalidades

- ✅ **Busca de usuários**: Encontre qualquer usuário do GitHub através de um campo de pesquisa
- ✅ **Perfil detalhado**: Visualize informações completas do usuário incluindo:
  - Avatar, nome e username
  - Biografia
  - Número de seguidores e seguindo
  - Email (se disponível)
  - Localização e website
  - Data de entrada no GitHub
- ✅ **Lista de repositórios**: Veja todos os repositórios públicos do usuário
- ✅ **Ordenação avançada**: Ordene repositórios por:
  - Número de estrelas (crescente/decrescente)
  - Nome (A-Z/Z-A)
  - Data de atualização
  - Data de criação
- ✅ **Detalhes do repositório**: Acesse informações detalhadas incluindo:
  - Descrição completa
  - Estatísticas (estrelas, forks, watchers, issues)
  - Linguagem principal
  - Informações de criação e atualização
  - Link direto para o GitHub
- ✅ **Design responsivo**: Interface otimizada para desktop, tablet e mobile (suporte a partir de 320px)
- ✅ **Estados de loading e erro**: Feedback visual para todas as operações

## 🛠️ Tecnologias Utilizadas

### Core

- **React.js 19** - Biblioteca principal com hooks
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento SPA

### Estilização

- **Styled Components** - CSS-in-JS para componentes estilizados
- **Design System** - Tema customizado com cores, espaçamentos e breakpoints

### Estado e API

- **Context API** - Gerenciamento de estado global
- **Axios** - Cliente HTTP para consumo da API do GitHub

### Testes

- **Jest** - Framework de testes
- **Testing Library** - Testes de componentes React

### Outras

- **GitHub API v3** - API pública do GitHub
- **Git** - Controle de versão

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Git

## 🔧 Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/github-user-explorer.git
   cd github-user-explorer
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📖 Como Usar

### 1. Buscar Usuário

- Na página inicial, digite o nome de usuário do GitHub no campo de pesquisa
- Clique em "Buscar" ou pressione Enter
- Aguarde o carregamento dos dados

### 2. Visualizar Perfil

- Após a busca, você será redirecionado para o perfil do usuário
- Visualize todas as informações pessoais e estatísticas
- Role para baixo para ver a lista de repositórios

### 3. Ordenar Repositórios

- Use os controles de ordenação no topo da lista de repositórios
- Escolha o critério (estrelas, nome, data) e a ordem (crescente/decrescente)
- A lista será atualizada automaticamente

### 4. Visualizar Repositório

- Clique em qualquer card de repositório para ver os detalhes
- Acesse informações completas e estatísticas
- Use o link "Ver no GitHub" para abrir o repositório original

### 5. Navegação

- Use o botão "Voltar" para retornar ao perfil
- Use o logo ou menu para voltar à página inicial
- A aplicação mantém o histórico de navegação

## 🧪 Testes

Execute os testes automatizados:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

## 🏗️ Build para Produção

```bash
# Gerar build otimizado
npm run build

# Visualizar build localmente
npm run preview
```

## 📱 Responsividade

A aplicação foi desenvolvida seguindo a abordagem mobile-first e suporta:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+
- **Wide Screen**: 1200px+

## 🎨 Design System

### Cores Principais

- **Primary**: #0366d6 (GitHub Blue)
- **Background**: #ffffff
- **Text**: #24292e
- **Secondary**: #f8f9fa

### Breakpoints

- Mobile: 320px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1200px

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── Header/         # Cabeçalho da aplicação
│   ├── SearchForm/     # Formulário de busca
│   ├── UserInfo/       # Informações do usuário
│   ├── RepositoryList/ # Lista de repositórios
│   ├── Loading/        # Componente de loading
│   └── ErrorMessage/   # Mensagens de erro
├── pages/              # Páginas da aplicação
│   ├── Home/          # Página inicial
│   ├── UserProfile/   # Perfil do usuário
│   ├── Repository/    # Detalhes do repositório
│   └── NotFound/      # Página 404
├── contexts/          # Context API
│   └── AppContext.tsx # Estado global
├── services/          # Serviços externos
│   └── githubApi.ts   # Client da API do GitHub
├── styles/            # Estilos globais
│   ├── GlobalStyle.ts # Reset CSS e estilos base
│   └── theme.ts       # Tema do design system
└── __tests__/         # Testes automatizados
```

## 🔍 API do GitHub

Esta aplicação consome a API pública do GitHub:

- **Base URL**: https://api.github.com
- **Endpoints utilizados**:
  - `GET /users/{username}` - Dados do usuário
  - `GET /users/{username}/repos` - Repositórios do usuário
  - `GET /repos/{owner}/{repo}` - Detalhes do repositório

## Limitações

- **Rate Limit**: A API do GitHub permite 60 requisições por hora sem autenticação
- **Repositórios Privados**: Apenas repositórios públicos são exibidos
- **Dados em Cache**: Os dados não são armazenados em cache (sempre busca da API)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

**Aproveite explorando o GitHub! 🎉**
