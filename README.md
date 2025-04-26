# ChamegoPet 🐾

O **ChamegoPet** é um projeto que conecta pessoas interessadas em adotar pets a animais disponíveis para adoção.  
O projeto é dividido em duas grandes partes: o **sistema web/backend** e o **aplicativo mobile**.

## 📂 Organização do Projeto

### 1. Sistema Backend (`/sistema/`)

Esta pasta contém toda a parte responsável pela API e gerenciamento de dados.

- `sistema/__init__.py`: Inicialização do sistema.
- `sistema/settings.py`: Configurações do backend (segurança, banco de dados, apps instalados).
- `sistema/urls.py`: Definição das rotas/endpoints da API.
- `sistema/views.py`: Funções para tratar as requisições.
- `sistema/wsgi.py` e `sistema/asgi.py`: Configurações para deployment.
- `db.sqlite3`: Banco de dados utilizado no projeto.
- `static/`: Arquivos estáticos (imagens, CSS, JS).
- `templates/`: Páginas HTML (caso sejam utilizadas).

> 🛠️ Backend desenvolvido em **Python** utilizando o framework **Django**.

---

### 2. Aplicativo Mobile (`/chamegopet-mobile/`)

Esta pasta contém o código do aplicativo mobile para usuários finais.

- `src/`: Código-fonte do aplicativo (páginas, componentes, serviços).
- `.editorconfig`, `.eslintrc.json`, `angular.json`, `capacitor.config.ts`: Arquivos de configuração do projeto.
- `package.json`: Gerenciamento de dependências do aplicativo.

O aplicativo é desenvolvido utilizando:

- **Ionic Framework** (baseado em Angular)
- **Capacitor** (para integração com funcionalidades nativas dos dispositivos)

> 📱 O app permite visualizar, divulgar e adotar pets.

---

### 3. Ambiente Virtual e Dependências

- `virtual/`: Ambiente virtual Python com as bibliotecas necessárias para o backend.
- `node_modules/`: Pacote de dependências Node.js utilizadas no aplicativo mobile.

> ⚠️ Estas pastas são geradas automaticamente ao instalar as dependências e geralmente não precisam ser modificadas manualmente.

---

## 🚀 Como Rodar o Projeto

### Backend

```bash
cd sistema
source ../virtual/bin/activate  # Ativar o ambiente virtual
python manage.py runserver      # Rodar o backend
