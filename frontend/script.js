// Configuração da API
const API_BASE_URL = 'http://localhost:3000';
let authToken = localStorage.getItem('authToken');
let currentUser = null;

// Elementos do DOM
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logout-btn');
const loadUsersBtn = document.getElementById('loadUsersBtn');
const loadExtractBtn = document.getElementById('loadExtractBtn');
const depositForm = document.getElementById('depositForm');
const withdrawForm = document.getElementById('withdrawForm');
const transferForm = document.getElementById('transferForm');
const paymentForm = document.getElementById('paymentForm');

// Seções
const loginSection = document.getElementById('login-form');
const userInfoSection = document.getElementById('user-info');
const usersSection = document.getElementById('users-section');
const movementsSection = document.getElementById('movements-section');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    if (authToken) {
        showAuthenticatedUI();
    } else {
        showLoginUI();
    }
    
    setupEventListeners();
});

function setupEventListeners() {
    // Login
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Usuários
    loadUsersBtn.addEventListener('click', loadUsers);
    
    // Extrato
    loadExtractBtn.addEventListener('click', loadExtract);
    
    // Operações bancárias
    depositForm.addEventListener('submit', (e) => handleBankOperation(e, 'D'));
    withdrawForm.addEventListener('submit', (e) => handleBankOperation(e, 'S'));
    transferForm.addEventListener('submit', (e) => handleBankOperation(e, 'T'));
    paymentForm.addEventListener('submit', (e) => handleBankOperation(e, 'P'));
}

// Autenticação
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            showMessage('Login realizado com sucesso!', 'success');
            showAuthenticatedUI();
        } else {
            showMessage(data.error || 'Erro no login', 'error');
        }
    } catch (error) {
        showMessage('Erro de conexão com a API', 'error');
        console.error('Login error:', error);
    }
}

function handleLogout() {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    showLoginUI();
    showMessage('Logout realizado com sucesso!', 'info');
}

function showLoginUI() {
    loginSection.style.display = 'flex';
    userInfoSection.style.display = 'none';
    usersSection.style.display = 'none';
    movementsSection.style.display = 'none';
}

function showAuthenticatedUI() {
    loginSection.style.display = 'none';
    userInfoSection.style.display = 'flex';
    usersSection.style.display = 'block';
    movementsSection.style.display = 'block';
}

// Gerenciamento de Usuários

async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayUsers(data);
            showMessage('Usuários carregados com sucesso!', 'success');
        } else {
            showMessage(data.error || 'Erro ao carregar usuários', 'error');
        }
    } catch (error) {
        showMessage('Erro de conexão com a API', 'error');
        console.error('Load users error:', error);
    }
}

function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    
    if (users.length === 0) {
        usersList.innerHTML = '<p>Nenhum usuário encontrado</p>';
        return;
    }
    
    usersList.innerHTML = users.map(user => `
        <div class="user-item">
            <div class="user-info">
                <div class="user-name">${user.nome || 'Nome não informado'}</div>
                <div class="user-email">${user.email}</div>
            </div>
        </div>
    `).join('');
}

// Extrato
async function loadExtract() {
    try {
        const response = await fetch(`${API_BASE_URL}/movimentacoes`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayExtract(data);
            showMessage('Extrato carregado com sucesso!', 'success');
        } else {
            showMessage(data.error || 'Erro ao carregar extrato', 'error');
        }
    } catch (error) {
        showMessage('Erro de conexão com a API', 'error');
        console.error('Load extract error:', error);
    }
}

function displayExtract(movements) {
    const extractList = document.getElementById('extractList');
    
    if (movements.length === 0) {
        extractList.innerHTML = '<p>Nenhuma movimentação encontrada</p>';
        return;
    }
    
    extractList.innerHTML = movements.map(movement => {
        const operationType = getOperationTypeName(movement.tipo_operacao);
        const valueClass = movement.tipo_operacao === 'D' ? 'positive' : 'negative';
        const formattedDate = new Date(movement.data_operacao).toLocaleDateString('pt-BR');
        
        return `
            <div class="movement-item">
                <div class="movement-info">
                    <div class="movement-type">${operationType}</div>
                    <div class="movement-description">${movement.descricao}</div>
                    <div class="movement-date">${formattedDate}</div>
                </div>
                <div class="movement-value ${valueClass}">
                    R$ ${parseFloat(movement.valor_operacao).toFixed(2)}
                </div>
            </div>
        `;
    }).join('');
}

function getOperationTypeName(type) {
    const types = {
        'D': 'Depósito',
        'S': 'Saque',
        'T': 'Transferência',
        'P': 'Pagamento'
    };
    return types[type] || type;
}

// Operações Bancárias
async function handleBankOperation(e, operationType) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    let movimentacaoData = {
        tipo_operacao: operationType,
        correntista_id: 1, // ID fixo para demonstração - em produção seria o ID do usuário logado
        data_operacao: new Date().toISOString().split('T')[0],
        descricao: '',
        valor_operacao: 0
    };
    
    // Preencher dados específicos de cada operação
    switch (operationType) {
        case 'D': // Depósito
            movimentacaoData.valor_operacao = parseFloat(document.getElementById('depositValue').value);
            movimentacaoData.descricao = document.getElementById('depositDescription').value;
            break;
        case 'S': // Saque
            movimentacaoData.valor_operacao = parseFloat(document.getElementById('withdrawValue').value);
            movimentacaoData.descricao = document.getElementById('withdrawDescription').value;
            break;
        case 'T': // Transferência
            movimentacaoData.valor_operacao = parseFloat(document.getElementById('transferValue').value);
            movimentacaoData.descricao = document.getElementById('transferDescription').value;
            movimentacaoData.correntista_beneficiario_id = parseInt(document.getElementById('transferBeneficiary').value);
            break;
        case 'P': // Pagamento
            movimentacaoData.valor_operacao = parseFloat(document.getElementById('paymentValue').value);
            movimentacaoData.descricao = document.getElementById('paymentDescription').value;
            break;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/movimentacoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ movimentacao: movimentacaoData })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            const operationName = getOperationTypeName(operationType);
            showMessage(`${operationName} realizado com sucesso!`, 'success');
            form.reset();
            loadExtract(); // Recarrega o extrato
        } else {
            showMessage(data.errors ? data.errors.join(', ') : 'Erro na operação', 'error');
        }
    } catch (error) {
        showMessage('Erro de conexão com a API', 'error');
        console.error('Bank operation error:', error);
    }
}

// Sistema de Mensagens
function showMessage(message, type = 'info') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = `message ${type}`;
    messageEl.classList.add('show');
    
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 3000);
}

// Utilitários
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR');
}