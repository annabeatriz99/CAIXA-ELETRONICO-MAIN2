const { query } = require("express")
const db = require("../db")

const getClientes = async () => {
    const con = await db.connect()
    const res = await con.query("SELECT * FROM clientes")
    return res.rows
}

const getClientById = async (id) => {
    const con = await db.connect()
    const res = await con.query(`SELECT * FROM clientes WHERE id = ${id}`)
    return res.rows
}

const create = async ({ nome, idade, senha, numero_conta, cpf }) => {
    const con = await db.connect()
    const res = await con.query(`INSERT INTO clientes (nome, idade, senha, numero_conta, cpf) VALUES ('${nome}', ${idade}, '${senha}', '${numero_conta}', '${cpf}')`)
    return res.rows
}

const deleteById = async (id) => {
    const con = await db.connect()
    const res = await con.query(`DELETE FROM clientes WHERE id = ${id}`)
    return res.rows
}

const updateByClientes = async (id, { nome, idade, senha, numero_conta, cpf }) => {
    const con = await db.connect()
    const res = await con.query(`update clientes
    set nome = '${nome}', idade = ${idade}, senha = '${senha}', numero_conta = ${numero_conta}, cpf = ${cpf} where id = ${id}`)
    return res.rows
}

const depositoByClientes = async ({ saldo_em_real, numero_conta }) => {

    const con = await db.connect()
    const clientes = await con.query(`select * from clientes where numero_conta = ${numero_conta}`) //trazer conta

    if (clientes.rows.length == 0) {
        throw new Exception("conta nao encontrada")
    } //verificação
    const cliente = clientes.rows[0]     //pegando a primeira linha do array de clientes

    const novo_saldo = saldo_em_real + cliente.saldo_em_real   //pegando o saldo e somando com o valor anterior

    const res = await con.query(`update clientes set saldo_em_real = ${novo_saldo} where numero_conta =${numero_conta}`)
    await insert_extrato (numero_conta, saldo_em_real, "deposito")
    return res.rows
} //atualizando o resgitro no banco

//ISSSSSOO É UMA FUNÇÃO 
const insert_extrato = async (numero_conta, valor, tipo_transacao) => {
    const con = await db.connect()
    await con.query(`insert into extrato (numero_conta, valor, tipo_transacao) values (${numero_conta}, ${valor}, '${tipo_transacao}')`)
}

// isso tambem é uma função :) function insert_extrato (){}


const saqueByCliente = async ({ saldo_em_real, numero_conta }) => {
    const con = await db.connect()
    const clientes = await con.query(`select * from clientes where numero_conta = ${numero_conta}`)

    if (clientes.rows.length === 0) {
        throw new Exception("conta nao encontrada")
    }
    const cliente = clientes.rows[0]

    if (saldo_em_real > cliente.saldo_em_real) {
        throw new Exception("Saldo insuficiente");
    }

    const novo_saldo = cliente.saldo_em_real - saldo_em_real

    const res = await con.query(`update clientes set saldo_em_real = ${novo_saldo}  where numero_conta =${numero_conta}`)
    await insert_extrato(numero_conta, saldo_em_real, "saque")

    return res.rows

}



const transferenciaByClientes = async ({ saldo_em_real, conta_origem, conta_destino }) => {
    const con = await db.connect();
    const clientesOrigem = await con.query(`SELECT * FROM clientes WHERE numero_conta = ${conta_origem}`);
    const clientesDestino = await con.query(`SELECT * FROM clientes WHERE numero_conta = ${conta_destino}`);

    if (clientesOrigem.rows.length === 0 || clientesDestino.rows.length === 0) {
        throw new Exception("Conta não encontrada");
    }

    const clienteOrigem = clientesOrigem.rows[0];
    const clienteDestino = clientesDestino.rows[0];

    if (saldo_em_real > clienteOrigem.saldo_em_real) {
        throw new Exception("Saldo insuficiente");
    }

    const novo_saldo_origem = clienteOrigem.saldo_em_real - saldo_em_real;
    const novo_saldo_destino = clienteDestino.saldo_em_real + saldo_em_real;

    const resOrigem = await con.query(`UPDATE clientes SET saldo_em_real = ${novo_saldo_origem} WHERE numero_conta = ${conta_origem}`);
    const resDestino = await con.query(`UPDATE clientes SET saldo_em_real = ${novo_saldo_destino} WHERE numero_conta = ${conta_destino}`);

    await insert_extrato (conta_origem, saldo_em_real, "transferencia_saida")
    await insert_extrato (conta_destino, saldo_em_real, "tranferencia_entrada")

}

const extratoByClientes = async ({ numero_conta, tipo_transacao, valor }) => {
    const con = await db.connect();
    const extrato = await con.query(`select * from extrato where numero_conta = ${numero_conta}`)

    if (extrato.rows.length === 0) {
        throw new Exception("sem informacoes")
    }
    return extrato.rows;
}

module.exports = ({
    getClientes,
    getClientById,
    create,
    deleteById,
    updateByClientes,
    depositoByClientes,
    saqueByCliente,
    transferenciaByClientes,
    extratoByClientes

})