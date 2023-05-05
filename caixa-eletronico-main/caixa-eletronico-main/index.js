const express = require('express')
const cors = require("cors")
const app = express()
const port = 3020

app.use(cors())
app.use(express.json({ limit: '600mb' }))

const entryWallet = require("./routes/wallet")
const entryClient = require("./routes/Clientes")

app.use("/wallet", entryWallet)
app.use(entryClient)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))