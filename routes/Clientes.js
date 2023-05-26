const express = require("express")
const router = express.Router()
const Clientes = require("../service/Clientes")
const { Client } = require("pg")

router.get("/clientes", async (req, res) => {
    try {
        const clientes = await Clientes.getClientes()
        // console.log(clientes)
        res.send(clientes)
    } catch (e) {
        console.log(e)
        res.status(500).send({ error: true, message: e.toString() })
    }
})

router.get("/clientes/:id", async (req, res) => {
    try{
        const client = await Clientes.getClientById(req.params.id) 
        if(client.length === 0) return res.status(404).send({ error : true, message: "Id não encontrado!"})
        res.send(client[0])
    }catch(e){
        console.log(e)
        res.status(500).send({ error: true, message: e.toString() })
    }
})

router.post("/clientes", async (req, res) => {
    try{

        const result = await Clientes.create(req.body)
        res.send(result)

    }catch(e){
        console.log(e)
        res.status(500).send({ error : true, message: e.toString()})
    }
})


router.delete("/clientes/:id", async (req, res) => {
    try{

        const id = req.params.id
        const result = await Clientes.deleteById(id)
        res.send(result)

    }catch(e){
        console.log(e)
        res.status(500).send({ error: true, message: e.toString() })
    }
})

router.put("/clientes/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const result = await Clientes.updateByClientes(id, req.body)
        res.send(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send({ error: true, message: e.toString() })
    }
})

router.post("/clientes/depositoByClientes", async (req, res) => {
    try{
        
        const result = await Clientes.depositoByClientes(req.body)
        res.send(result)

    }catch(e){
        console.log(e)
        res.status(500).send({ error : true, message: e.toString()})
    }
})

router.post("/clientes/saqueByCliente", async (req, res) =>{
    try{
        const result = await Clientes.saqueByCliente(req.body)
        res.send(result)
    }
    catch(e){
        console.log(e)
        res.status(500).send({ error : true, message: e.toString()})
    }
})
router.post("/clientes/transferenciaByClientes", async (req, res) =>{
    try{
      const result = await Clientes.transferenciaByClientes(req.body)
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send({ error : true, message: e.toString()})
    }
})

router.get ("/extratoByNumeroConta/:id", async (req, res) => {
    try{
    const result = await Clientes.extratoByClientes ({ numero_conta : req.params.id })
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })

  router.post ("/clientes/somarNumeros", async(req, res) =>{
    try{
        const result = await Clientes.somarNumeros(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })

  router.post ("/clientes/maiorNumero", async(req, res) =>{
    try{
        const result = await Clientes.maiorNumero(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })

  router.post ("/clientes/vogaisMaiusculas", async(req, res) =>{
    try{
        const result = await Clientes.vogaisMaiusculas(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })
  router.post ("/clientes/filtrarPalavras", async(req, res) =>{
    try{
        const result = await Clientes.filtrarPalavras(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })

  router.post ("/clientes/somaNumerosPares", async(req, res) =>{
    try{
        const result = await Clientes.somaNumerosPares(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })
  router.post ("/clientes/inverterTexto", async(req, res) =>{
    try{
        const result = await Clientes.inverterTexto(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })

  router.get ("/clientes/numerosUnicos", async(req, res) =>{
    try{
        const result = await Clientes.numerosUnicos(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })

  router.get ("/clientes/contarVogais", async(req, res) =>{
    try{
        const result = await Clientes.contarVogais(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })

  router.put ("/clientes/ordenarPalavras", async(req, res) =>{
    try{
        const result = await Clientes.ordenarPalavras(req.body)
          res.send(result)
      }catch(e){
          console.log(e)
          res.status(500).send({ error : true, message: e.toString()})
      }
  })


module.exports = router