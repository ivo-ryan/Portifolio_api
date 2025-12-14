# 🌐 API do Portfólio

API REST desenvolvida para servir como backend do portfólio pessoal, responsável por fornecer dados de projetos, informações técnicas e conteúdos exibidos no frontend.

O objetivo desta API é demonstrar organização de código, boas práticas de desenvolvimento backend e integração real entre frontend e backend.

---

## 🎯 Objetivo do Projeto

Esta API foi criada para:

* Centralizar os dados utilizados no portfólio
* Simular um cenário real de consumo de API
* Demonstrar domínio em backend mesmo em projetos pessoais
* Aplicar boas práticas de arquitetura e organização

---

## 🚀 Funcionalidades

* Listagem de projetos do portfólio
* Detalhamento de projetos individuais
* Estrutura preparada para expansão (CRUD completo)
* Integração com banco de dados relacional
* Separação clara de responsabilidades

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* TypeScript
* API REST
* Prisma ORM
* PostgreSQL
* Express (ou framework equivalente)

---

## 🧠 Arquitetura e Boas Práticas

* Estrutura organizada por camadas
* Separação entre rotas, serviços e regras de negócio
* Tipagem forte com TypeScript
* Código focado em legibilidade e manutenção
* Integração limpa entre backend e frontend

---

## 📂 Estrutura do Projeto (exemplo)

```txt
src/
 ├─ routes/
 ├─ controllers/
 ├─ services/
 ├─ prisma/
 └─ server.ts
```

---

## ▶️ Como executar o projeto

```bash
# instalar dependências
npm install

# rodar as migrations
npx prisma migrate dev

# iniciar o servidor
npm run dev
```

---

## 🔗 Integração com o Frontend

Esta API é consumida diretamente pelo frontend do portfólio, permitindo:

* Atualização dinâmica dos projetos
* Separação total entre interface e dados
* Facilidade de manutenção e escalabilidade

---

## 👨‍💻 Autor

**Ivo Ryan**
Desenvolvedor Full Stack JavaScript

* GitHub: [https://github.com/ivo-ryan](https://github.com/ivo-ryan)
* LinkedIn: [https://linkedin.com/in/ivo-bastos](https://linkedin.com/in/ivo-bastos)

---

## 📌 Observações

Este projeto faz parte do meu portfólio profissional e foi desenvolvido com foco em aprendizado prático, qualidade de código e simulação de cenários reais do mercado.
