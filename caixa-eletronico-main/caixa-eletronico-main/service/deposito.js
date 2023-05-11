const depositoByClientes = async (id,{saldo_em_real,nome, idade, senha, numero_conta, cpf}) =>{
    const con = await db.connect()
    const res = await con.query (`deposito = ${saldo_em_real}, nome = '${nome}', idade = ${idade}, senha = '${senha}', numero_conta = ${numero_conta}, cpf = ${cpf}`)
    return res.rows
}

module.exports = ({
    depositoByClientes
})