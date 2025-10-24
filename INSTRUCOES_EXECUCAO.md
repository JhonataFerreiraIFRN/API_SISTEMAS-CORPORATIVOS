# Instruções de Execução - Sistema Corporativo

## 🚀 Como executar o projeto completo

### 1. Configurar a API Rails

```bash
# Instalar dependências
bundle install

# Executar migrações do banco de dados
rails db:migrate

# Iniciar o servidor Rails
rails server
```

A API estará disponível em: `http://localhost:3000`

### 2. Configurar o Frontend

**Opção 1 - Servidor HTTP simples:**
```bash
cd frontend
python -m http.server 8000
```

**Opção 2 - Node.js (se tiver instalado):**
```bash
cd frontend
npx http-server -p 8000
```

**Opção 3 - Abrir diretamente:**
- Abra o arquivo `frontend/index.html` diretamente no navegador

O frontend estará disponível em: `http://localhost:8000`

### 3. Testar as Funcionalidades

#### 🔐 Autenticação
1. **Criar um usuário primeiro:**
   - Use a seção "Gerenciamento de Usuários"
   - Preencha nome, email e senha
   - Clique em "Criar Usuário"

2. **Fazer login:**
   - Use o email e senha criados
   - Clique em "Entrar"

#### 💰 Operações Bancárias
Após o login, você terá acesso a:

- **Extrato**: Visualizar todas as movimentações
- **Depósito**: Adicionar dinheiro à conta
- **Saque**: Retirar dinheiro da conta  
- **Transferência**: Enviar dinheiro para outro usuário
- **Pagamento**: Realizar pagamentos

### 4. Endpoints da API Disponíveis

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/login` | Autenticação | ❌ |
| GET | `/usuarios` | Listar usuários | ✅ |
| POST | `/usuarios` | Criar usuário | ❌ |
| GET | `/movimentacoes` | Extrato | ✅ |
| POST | `/movimentacoes` | Operações bancárias | ✅ |

### 5. Tipos de Operação

- **D** - Depósito
- **S** - Saque
- **T** - Transferência  
- **P** - Pagamento

### 6. Estrutura do Projeto

```
API_SISTEMAS-CORPORATIVOS/
├── app/                    # Backend Rails
│   ├── controllers/        # Controladores da API
│   ├── models/            # Modelos de dados
│   └── ...
├── frontend/               # Frontend
│   ├── index.html         # Interface principal
│   ├── styles.css       # Estilos
│   ├── script.js          # Lógica JavaScript
│   └── README.md          # Documentação do frontend
├── config/                # Configurações Rails
└── ...
```

### 7. Solução de Problemas

**Erro de CORS:**
- Certifique-se de que o gem `rack-cors` está instalado
- Reinicie o servidor Rails após instalar dependências

**Erro de conexão:**
- Verifique se a API está rodando na porta 3000
- Verifique se o frontend está acessando a URL correta

**Erro de autenticação:**
- Certifique-se de criar um usuário antes de fazer login
- Verifique se o token JWT está sendo armazenado corretamente

### 8. Dados de Teste

Para testar rapidamente, você pode criar um usuário com:
- **Nome**: João Silva
- **Email**: joao@email.com  
- **Senha**: 123456

Depois use essas credenciais para fazer login e testar as operações bancárias.

---

## ✅ Checklist de Funcionalidades Implementadas

- [x] **Login/Logout** - Autenticação JWT
- [x] **Gerenciamento de Usuários** - Criar e listar usuários
- [x] **Extrato** - Visualizar movimentações
- [x] **Depósito** - Adicionar dinheiro
- [x] **Saque** - Retirar dinheiro
- [x] **Transferência** - Enviar para outro usuário
- [x] **Pagamento** - Realizar pagamentos
- [x] **Interface Responsiva** - Funciona em desktop e mobile
- [x] **CORS Habilitado** - Permite requisições do frontend
- [x] **Validações** - Campos obrigatórios e formatos
- [x] **Feedback Visual** - Mensagens de sucesso/erro