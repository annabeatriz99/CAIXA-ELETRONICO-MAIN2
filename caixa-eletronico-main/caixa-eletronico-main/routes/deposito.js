const { route } = require("./Clientes")

const router = express.Router()

router.depositoByClientes("/clientes/:id", async (req, res) => {
    try{
        
        const id = req.params.id
        const result = await Clientes.depositoByClientes(id, req.body)
        res.send(result)

    }catch(e){
        console.log(e)
        res.status(500).send({ error : true, message: e.toString()})
    }
})

module.exports = router