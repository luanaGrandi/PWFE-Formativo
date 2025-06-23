## Projeto - Formativo

# Sistema de Gerenciamento Escolar

## ✨ Descrição do Projeto

Este projeto integrador tem como objetivo oferecer uma **plataforma web para o gerenciamento de uma escola**, permitindo que o gestor organize de forma eficiente professores, disciplinas, salas e reservas de ambientes.

O sistema possui dois tipos de usuários:
- **Gestor:** pode realizar operações completas de **CRUD** (Criar, Listar, Atualizar e Deletar) para gerenciar professores, disciplinas, salas e reservas.
- **Professor:** pode **visualizar** suas disciplinas e reservas, mantendo-se informado sobre suas aulas e ambientes.

---

## ⚙️ Tecnologias Utilizadas

- **Frontend:** [React](https://react.dev/) criação do frontend.
- **Backend:** [Django REST Framework](https://www.django-rest-framework.org/) — criação da API.

---

## ✅ Funcionalidades

- **CRUD completo** para:
  - Professores
  - Disciplinas
  - Salas
  - Reservas de ambientes

- **Painel do Professor:**
  - Visualização de disciplinas cadastradas
  - Visualização de reservas de ambientes

- **Autenticação de usuários** com permissões específicas para cada perfil.

---


## 🚀 Como executar o projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Instale e inicie o frontend
cd frontend
npm install
npm start

# Em outro terminal, inicie o backend
cd backend
python -m venv venv
# Ative o ambiente virtual:
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

pip install -r requirements.txt
python manage.py runserver
