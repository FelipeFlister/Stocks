# Stocks

> Sistema web prático e intuitivo para controle de produtos, categorias e fornecedores focado em microempresas.

---

## 📌 Informações Gerais

- **Nome do Projeto:** Stocks - A sua nova gestão de estoque
- **Equipe:** Tech4Future
- **Curso:** Técnico em Informática
- **Instituição:** FUNEC Riacho
- **Ano/Semestre:** 2026 / 2º Semestre
- **Professor Orientador:** Wilian Douglas Teixeira
- **Cliente/Setor Solicitante:** Microempresários e Pequenos Comércios Locais

---

## 🎯 Objetivo do Projeto

Descrever o objetivo principal do software.

Exemplo:

Desenvolver um sistema web para simplificar o controle de entrada e saída de mercadorias, cadastro de fornecedores e alertas de validade de produtos, permitindo que microempresas otimizem sua gestão de estoque sem a necessidade de planilhas complexas ou processos manuais.

---

## 👥 Público-Alvo

Quem utilizará o sistema?

Exemplo:

- Microempreendedores Individuais (MEI)
- Gerentes e funcionários de pequenos comércios
- Operadores e responsáveis pelo controle de estoque

---

## 🧩 Problema a Ser Resolvido

Atualmente, muitas microempresas realizam o controle de estoque manualmente ou através de planilhas de difícil manutenção. Isso gera falhas operacionais como perda de produtos por vencimento, falta de reposição em tempo hábil e divergências na contagem dos itens armazenados.

---

## 💡 Solução Proposta

Descrever a solução que será desenvolvida.

Exemplo:

O **Stocks** é um sistema web responsivo desenvolvido na plataforma Base44 que centraliza a gestão de produtos, categorização, dados de fornecedores e controle de prazos de validade em uma única interface acessível e intuitiva.

---

## ⚙️ Funcionalidades do Sistema

### Funcionalidades Principais

- [x] Autenticação e Login de Usuários
- [x] Cadastro, Edição e Exclusão de Produtos
- [x] Organização por Categorias de Produtos
- [x] Alertas e Controle de Data de Validade
- [x] Gestão e Cadastro de Fornecedores
- [x] Pesquisa e Filtragem Dinâmica de Produtos
- [x] Visão Geral / Dashboard de Estoque

---

## 🛠️ Tecnologias Utilizadas

- **Plataforma:** Base44 (Low-Code / PaaS)
- **Front-end:** React, Tailwind CSS, JavaScript, HTML e CSS
- **Back-end:** Arquitetura Serverless / API em nuvem integrada (gerenciada pela plataforma Base44)
- **Comunicação:** Requisições assíncronas via JavaScript (`src/api`)
- **Banco de Dados:** Banco de dados integrado da plataforma Base44
- **Versionamento:** Git e GitHub

---

## 🗂️ Estrutura do Projeto

```text
Stocks/
├── base44/              # Configurações e entidades do banco de dados (Base44)
│   ├── entities/
│   └── config.jsonc
├── src/                 # Código-fonte principal da aplicação
│   ├── api/             # Integração e chamadas com a API em nuvem
│   ├── components/      # Componentes visuais reutilizáveis e de interface
│   │   ├── dashboard/   # Componentes de gráficos, métricas e visão geral
│   │   ├── landing/     # Seções da página inicial
│   │   ├── layout/      # Estrutura de menus, barra lateral e cabeçalho
│   │   ├── products/    # Modais, tabelas e formulários de produtos
│   │   ├── settings/    # Componentes de configurações do sistema
│   │   ├── shared/      # Componentes compartilhados entre várias telas
│   │   ├── suppliers/   # Gestão e cadastro de fornecedores
│   │   └── ui/          # Elementos base de interface (botões, inputs, cards)
│   ├── hooks/           # Hooks customizados do React
│   ├── lib/             # Configurações de bibliotecas auxiliares
│   ├── pages/           # Páginas e telas principais do sistema
│   ├── utils/           # Funções utilitárias
│   ├── App.jsx          # Componente raiz e gerenciamento de rotas
│   ├── index.css        # Estilos globais e configuração do Tailwind CSS
│   └── main.jsx         # Ponto de entrada da aplicação React
├── .env.local           # Variáveis de ambiente locais (não versionado)
├── index.html           # Template HTML principal
├── package.json         # Dependências e scripts do projeto
└── vite.config.js       # Configuração do bundler ViteD
```

---

## 🧪 Requisitos Funcionais

- RF01 – O sistema deve permitir o cadastro, edição e exclusão de produtos.
- RF02 – O sistema deve permitir associar produtos a categorias específicas sem duplicação.
- RF03 – O sistema deve emitir alertas para produtos próximos da data de vencimento.
- RF04 – O sistema deve permitir o cadastro de fornecedores para vinculação com os produtos.
- RF05 – O sistema deve permitir a busca e filtragem rápida de produtos por nome ou categoria.

---

## 🚫 Requisitos Não Funcionais

- RNF01 – O sistema deve ser acessível via navegador web em computadores e dispositivos móveis.
- RNF02 – A interface deve ser simples, limpa e de fácil navegação para usuários leigos.
- RNF03 – O sistema deve garantir a segurança no acesso por meio de autenticação de usuários.

---

## 📅 Cronograma do Projeto

| Etapa | Descrição | Responsável | Data |
|------|-----------|-------------|------|
| 1 | Levantamento de requisitos | Equipe | |
| 2 | Modelagem do sistema | Equipe | |
| 3 | Desenvolvimento | Equipe | |
| 4 | Testes | Equipe | |
| 5 | Entrega | Equipe | |

---

## 🧑‍💻 Integrantes da Equipe

| Nome | Função | Responsabilidade |
|------|-------|-----------------|
| | Desenvolvedor | |
| | Designer | |
| | Testador | |
| | Documentação | |

---

## 🔐 Controle de Acesso (se aplicável)

Administrador / Operador: Acesso completo para gerenciar o estoque, incluir e editar produtos, categorias e fornecedores.

---

## 📷 Protótipos / Telas

- **Link do Protótipo (Figma):** [`[https://www.figma.com/design/JsUyvapkZCJcsi412fUfTX/Mvp-Stocks?node-id=0-1&t=HnmNqLl9tTEYONYZ-1]`](https://www.figma.com/design/JsUyvapkZCJcsi412fUfTX/Mvp-Stocks?node-id=0-1&t=HnmNqLl9tTEYONYZ-1)
- **Link do Sistema Online (Base44):** [`https://stocks-1.base44.app`](https://stocks-1.base44.app)

---

## 📦 Como Executar o Projeto

O sistema **Stocks** pode ser acessado diretamente online pela nuvem ou executado localmente seguindo os passos abaixo:

### Opção 1: Acesso Online (Recomendado para testes rápidos)
1. Acesse o link oficial da aplicação hospedada: [`https://stocks-1.base44.app`](https://stocks-1.base44.app)
2. Faça login com suas credenciais de usuário.

### Opção 2: Execução Local (Desenvolvimento)
Se preferir rodar o código-fonte na sua máquina localmente, siga os passos abaixo:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/FelipeFlister/Stocks.git
   ```

2. **Navegar até a pasta do projeto:**
    ```bash
    cd Stocks
    ```

3. **Instalar as dependências:**
    ```bash
    npm install
    ```

4. **Crie um arquivo ```.env.local``` na raiz do projeto e configure as credenciais da API do Base44:**
    ```.env.local
    VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
    VITE_BASE44_APP_BASE_URL=https://stocks-1.base44.app/
    ```

5. **Iniciar o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```
    (Para encerrar a execução no terminal, pressione Ctrl + C).