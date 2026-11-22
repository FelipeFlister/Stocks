# Stocks

> Sistema web prático e intuitivo para controle de produtos, categorias e fornecedores focado em microempresas.

---

## 📌 Informações Gerais

- **Nome do Projeto:** Stocks - Sistema de Gestão de Estoque
- **Equipe:** Tech4Future
- **Curso:** Técnico em Informática
- **Instituição:** FUNEC Riacho
- **Ano/Semestre:** 2026 / 2º Semestre
- **Professor Orientador:** Wilian Douglas Teixeira
- **Cliente/Setor Solicitante:** Microempreendedores Individuais (MEIs) e Pequenos Comércios

---

## 🎯 Objetivo do Projeto

Descrever o objetivo principal do software.

Exemplo:

Desenvolver um sistema web para simplificar e centralizar a gestão de estoque de micro e pequenas empresas, oferecendo recursos para cadastro e gerenciamento de produtos, controle de entradas e saídas, gerenciamento de fornecedores, acompanhamento de validade e monitoramento dos níveis de estoque. O objetivo é reduzir erros operacionais, evitar perdas de mercadorias e facilitar a tomada de decisões por meio de informações organizadas e acessíveis.

---

## 👥 Público-Alvo

Quem utilizará o sistema?

Exemplo:

- Microempreendedores Individuais (MEIs).
- Proprietários e gerentes de micro e pequenas empresas.
- Funcionários responsáveis pela administração de mercadorias.
- Operadores e responsáveis pelo controle de estoque.
- Pequenos estabelecimentos comerciais que necessitam de uma gestão de estoque eficiente.

---

## 🧩 Problema a Ser Resolvido

Muitas micro e pequenas empresas ainda realizam o controle de estoque manualmente ou por meio de planilhas, dificultando o acompanhamento das mercadorias e a organização das informações. Essa prática pode ocasionar divergências nas quantidades registradas, falta de produtos, compras desnecessárias, perdas por vencimento e dificuldades para identificar mercadorias com pouca ou nenhuma movimentação.

Além disso, a ausência de informações centralizadas dificulta o acompanhamento financeiro e a tomada de decisões, comprometendo a eficiência da gestão e o crescimento do negócio.

---

## 💡 Solução Proposta

Descrever a solução que será desenvolvida.

Exemplo:

O **Stocks** é um sistema web responsivo de gestão de estoque, desenvolvido por meio da plataforma Base44, que centraliza as principais operações de controle de mercadorias em uma única interface.

A solução oferece recursos para gerenciamento de produtos, categorias e fornecedores, registro de entradas e saídas, monitoramento dos níveis de estoque, alertas de vencimento e identificação de produtos com baixa ou nenhuma movimentação. Também disponibiliza dashboard com indicadores, relatórios financeiros e ferramentas de configuração e gerenciamento de dados.

O sistema busca proporcionar uma experiência simples e intuitiva, permitindo que microempreendedores e pequenos comerciantes tenham maior controle sobre suas operações, reduzam perdas e tomem decisões com base em informações organizadas.

---

## ⚙️ Funcionalidades do Sistema

### Funcionalidades Principais

### Funcionalidades Principais

- [x] Autenticação e login de usuários.
- [x] Dashboard com indicadores e visão geral do estoque.
- [x] Cadastro, edição e exclusão de produtos.
- [x] Cadastro e gerenciamento de categorias.
- [x] Cadastro e gerenciamento de fornecedores.
- [x] Registro e controle de entradas e saídas de estoque.
- [x] Pesquisa e filtragem de produtos.
- [x] Central de alertas de estoque.
- [x] Identificação de produtos com estoque baixo ou esgotado.
- [x] Alertas de produtos próximos do vencimento.
- [x] Identificação de produtos sem movimentação.
- [x] Relatórios financeiros.
- [x] Manual de utilização do sistema.
- [x] Configurações e gerenciamento de dados.
- [x] Backup e importação de dados.
- [x] Canal de suporte.
- [x] Histórico de versões e atualizações.

---

## 🛠️ Tecnologias Utilizadas

- **Plataforma de Desenvolvimento:** Base44 (Low-Code / PaaS).
- **Front-end:** React, JavaScript, HTML5 e CSS3.
- **Estilização:** Tailwind CSS.
- **Build Tool:** Vite.
- **Back-end:** Serviços e APIs gerenciados pela plataforma Base44.
- **Comunicação:** Requisições assíncronas por meio da integração com a API do Base44.
- **Banco de Dados:** Banco de dados integrado à plataforma Base44.
- **Prototipação:** Figma.
- **Versionamento:** Git e GitHub.

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
└── vite.config.js       # Configuração do Vite
```

---

## 🧪 Requisitos Funcionais

- RF01 – O sistema deve permitir o cadastro, edição, consulta e exclusão de produtos.
- RF02 – O sistema deve permitir o cadastro, edição, consulta e exclusão de categorias.
- RF03 – O sistema deve permitir associar produtos às suas respectivas categorias.
- RF04 – O sistema deve permitir o cadastro, edição, consulta e exclusão de fornecedores.
- RF05 – O sistema deve permitir associar fornecedores aos produtos.
- RF06 – O sistema deve permitir registrar entradas de mercadorias no estoque.
- RF07 – O sistema deve permitir registrar saídas de mercadorias do estoque.
- RF08 – O sistema deve atualizar automaticamente as quantidades dos produtos após cada movimentação.
- RF09 – O sistema deve permitir pesquisar e filtrar produtos por nome e categoria.
- RF10 – O sistema deve apresentar um dashboard com indicadores e informações gerais do estoque.
- RF11 – O sistema deve identificar produtos com estoque abaixo do limite mínimo estabelecido.
- RF12 – O sistema deve identificar produtos com estoque esgotado.
- RF13 – O sistema deve emitir alertas para produtos próximos da data de vencimento.
- RF14 – O sistema deve identificar produtos que não apresentam movimentações durante determinado período.
- RF15 – O sistema deve disponibilizar relatórios financeiros relacionados ao estoque.
- RF16 – O sistema deve disponibilizar um manual de utilização para orientar os usuários.
- RF17 – O sistema deve permitir o gerenciamento das configurações da aplicação.
- RF18 – O sistema deve disponibilizar recursos para backup e importação de dados.
- RF19 – O sistema deve disponibilizar um canal de suporte aos usuários.
- RF20 – O sistema deve apresentar o histórico de versões e atualizações do sistema.
- RF21 – O sistema deve permitir a autenticação de usuários por meio de credenciais de acesso.

---

## 🚫 Requisitos Não Funcionais

- RNF01 – O sistema deve ser acessível por meio de navegadores web, tanto em computadores quanto em dispositivos móveis.
- RNF02 – A interface deve apresentar navegação simples, intuitiva e consistente, facilitando a utilização por usuários com pouca experiência tecnológica.
- RNF03 – O sistema deve apresentar layout responsivo, adaptando seus componentes a diferentes resoluções de tela.
- RNF04 – O acesso às funcionalidades protegidas deve ser realizado mediante autenticação de usuários.
- RNF05 – O sistema deve preservar a integridade das informações de estoque durante as operações de entrada e saída de mercadorias.
- RNF06 – As operações de consulta, cadastro e gerenciamento devem apresentar desempenho adequado, evitando atrasos que prejudiquem a utilização do sistema.
- RNF07 – O sistema deve manter uma organização visual consistente entre suas páginas, componentes e funcionalidades.
- RNF08 – O sistema deve utilizar mecanismos de armazenamento e comunicação disponibilizados pela plataforma Base44 para gerenciamento dos dados.

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

- **Protótipo no Figma:** [Visualizar protótipo](https://www.figma.com/design/JsUyvapkZCJcsi412fUfTX/Mvp-Stocks?node-id=0-1&t=HnmNqLl9tTEYONYZ-1)
- **Sistema Online:** [Acessar Stocks](https://stocks-1.base44.app)

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

4. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env.local` na raiz do projeto:
    ```.env.local
    VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
    VITE_BASE44_APP_BASE_URL=https://stocks-1.base44.app/
    ```

6. **Iniciar o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```
   O Vite disponibilizará um endereço local no terminal para acessar a aplicação.

   Para encerrar o servidor, pressione `Ctrl + C`.
