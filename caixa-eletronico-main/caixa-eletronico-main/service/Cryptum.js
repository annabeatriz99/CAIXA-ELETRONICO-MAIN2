const CryptumSdk = require('cryptum-sdk');

const sdk = new CryptumSdk({
    enviroment: 'testnet',
    apiKey: '42OELP0OP5NvqKvckOUT6xU728wDTkmj'
})

const createWallet = async () =>  await sdk.wallet.generateWallet({
    protocol: 'ETHEREUM',
    derivation: { account: 1, address: 1 }
})

module.exports = ({
    createWallet
})
