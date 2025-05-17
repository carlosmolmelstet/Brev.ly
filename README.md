# 📎 Brev.ly - Checklist de Funcionalidades

Este projeto é dividido em duas partes: **Web (Frontend)** e **Server (Backend)**. Abaixo está a lista completa de funcionalidades implementadas.

---

## 🌐 Web (Frontend)

✅ SPA construída com **React + Vite**  
🎨 Foco total na responsividade e experiência do usuário

### ✅ Funcionalidades
- [x] Criar um novo link encurtado
  - [x] Validação de formato do encurtamento
  - [x] Verificação de encurtamento já existente
- [x] Deletar um link
- [x] Obter a URL original a partir do encurtamento
- [x] Listar todas as URLs cadastradas
- [x] Incrementar a quantidade de acessos de um link
- [x] Baixar um relatório em formato CSV com os links criados

### 💡 Requisitos de Interface
- [x] Aplicação construída com **React SPA + Vite**
- [x] Layout fiel ao Figma
- [x] Boa experiência de usuário:
  - `Empty States`
  - Ícones de carregamento
  - Bloqueio de ações conforme estado
- [x] Responsividade completa (Desktop e Mobile)

---

## 🖥️ Server (Backend)

🔒 Backend robusto com foco em performance e validações

### ✅ Funcionalidades
- [x] Criar um link encurtado
  - [x] Validação de formato inválido
  - [x] Detecção de encurtamento duplicado
- [x] Obter a URL original a partir da URL encurtada
- [x] Deletar um link
- [x] Listar todas as URLs cadastradas
- [x] Incrementar a contagem de acessos
- [x] Exportar links criados para CSV

### ☁️ Exportação para CSV
- [x] Arquivo CSV acessível por **CDN Cloudflare R2**
- [x] Nome único e aleatório para cada exportação
- [x] Listagem performática mesmo com grande volume de dados
- [x] Campos do CSV:
  - URL original
  - URL encurtada
  - Contagem de acessos
  - Data de criação


