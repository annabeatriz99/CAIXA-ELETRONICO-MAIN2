const express = require("express")
const router = express.Router()

const { createWallet } = require("../service/Cryptum")

router.post("/create", async (req, res) => {
    try {

        const wallet = await createWallet()

        res.send(wallet)

    } catch (e) {
        res.status(500).send({ error: true, message: e.toString() })
    }
})


module.exports = router