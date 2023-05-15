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

const depositoByClientes = async ({saldo_em_real,numero_conta}) =>{

    const con = await db.connect()
    const clientes = await con.query(`select * from clientes where numero_conta = ${numero_conta}`) //trazer conta

    if( clientes.rows.length == 0){  
        throw new Exception("conta nao encontrada")
    } //verificação
    const cliente = clientes.rows[0]     //pegando a primeira linha do array de clientes

    const novo_saldo = saldo_em_real + cliente.saldo_em_real   //pegando o saldo e somando com o valor anterior
    
    const res = await con.query (`update clientes set saldo_em_real = ${novo_saldo} where numero_conta =${numero_conta}`)
    return res.rows
} //atualizando o resgitro no banco


const saqueByCliente = async({saldo_em_real, numero_conta}) =>{
    const con = await db.connect()
    const clientes = await con.query(`select * from clientes where numero_conta = ${numero_conta}`)

    if( clientes.rows.length === 0){  
        throw new Exception("conta nao encontrada")
    }
    const cliente = clientes.rows[0]

    if (saldo_em_real > cliente.saldo_em_real) {
        throw new Exception("Saldo insuficiente");
      }
   
    const novo_saldo = cliente.saldo_em_real - saldo_em_real
    
        const res = await con.query (`update clientes set saldo_em_real = ${novo_saldo}  where numero_conta =${numero_conta}`)
    return res.rows

}


module.exports = ({
    getClientes,
    getClientById,
    create,
    deleteById,
    updateByClientes,
    depositoByClientes,
    saqueByCliente
})