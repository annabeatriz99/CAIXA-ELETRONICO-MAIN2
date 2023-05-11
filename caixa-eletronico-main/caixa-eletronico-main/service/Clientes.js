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
    const res = await con.query (`DELETE FROM clientes WHERE id = ${id}`)
    return res.rows
}

 const updateByClientes = async (id,{nome, idade, senha, numero_conta, cpf}) =>{
    const con = await db.connect()
    const res = await con.query (`update clientes
    set nome = '${nome}', idade = ${idade}, senha = '${senha}', numero_conta = ${numero_conta}, cpf = ${cpf} where id = ${id}`)
    return res.rows
}

const depositoByClientes = async (id,{saldo_em_real,nome, idade, senha, numero_conta, cpf}) =>{
    const con = await db.connect()
    const res = await con.query (`deposito clientes = ${saldo_em_real}, nome = '${nome}', idade = ${idade}, senha = '${senha}', numero_conta = ${numero_conta}, cpf = ${cpf}`)
    return res.rows
}

module.exports = ({
    getClientes,
    getClientById,
    create,
    deleteById,
    updateByClientes,
    depositoByClientes
})