const contatos = {};

// Administrador do sistema
contatos.administrador = {
    nome: 'Administrador',
    telefone: '41996394268',
    email: 'gustavo@magius.com.br'
}

contatos.responsavel = [
    contatos.administrador,
    {
        nome: 'Gustavo',
        telefone: '41996394268',
        email: 'gustavo@magius.com.br'
    },
    {
        nome: 'Gustavo2',
        telefone: '4121699423',
        email: 'gustavo@magius.com.br'
    },
    {
        nome: 'Portaria',
        telefone: '4121699421',
        email: 'portaria.magius@magius.com.br'
    },
    {
        nome: 'Portaria2',
        telefone: '41999673384',
        email: 'portaria.magius@magius.com.br'
    },
    {
        nome: 'Martins',
        telefone: '4121699430',
        email: 'wellington.martins@magius.com.br'
    },
    {
        nome: 'Jardim',
        telefone: '4121699431',
        email: 'wellington.jardim@magius.com.br'
    },
    {
        nome: 'William',
        telefone: '4121699429',
        email: 'william.martins@magius.com.br'
    }
];

module.exports = contatos