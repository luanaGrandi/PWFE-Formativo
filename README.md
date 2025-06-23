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

# Frontend:
abrir a pasta: formativo-escola
cd meu-projeto
npm i
npm run dev

# Backend
- Abra a pasta formativa em uma nova pagina do vscode
python -m venv env
env\Scripts\activate

## Verificar banco de dados 🔍

Nesse projeto estamos utilizando o banco de dados, para que ele funcione sem nenhume erro, faça essas passos:
 - entre na pasta: projeto;
 - entre no: ```settings.py```
 - procure o nome:```DATABASES```
- Veja se ele está correto desta forma:
  ```
   'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'cadastro',
        'USER': 'root', -. esse user será do seu mysql
        'PASSWORD': 'senai', -> essa senha será de acordo com a senha do seu mysql
        'HOST': 'localhost',
        'PORT': '3306'
    }
  ```


Para que o banco de dados funcione, você precisa criar a tabela no MySQL Workbench, usando o comando

```
  CREATE DATABASE cadastro (nome da tabela);
  USE cadastro(nome da tabela);
```

Após a criação da tabela no banco de dados. De esses comandos para salvar suas alterações:
```
  py manage.py makemigrations
   py manage.py migrate 
```

##  Criar usuário
Para que você possa ter acesso a todas as funcionalidades do projeto, precisa criar um usuário com essa comando:
```python manage.py createsuperuser```

## Rodar o Projeto 🚀
Para rodar o projeto basta dar esse comando:
  - ```python manage.py runserver```

## Chegamos ao final 🎉

Passo a passo de como rodar o projeto está pronto, agora só falta você utiliza-lo !  p

