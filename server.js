const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

const { Web3 } = require("web3");
const web3 = new Web3(
  "https://optimism-sepolia.infura.io/v3/9b7be415fa304a86acaad068dee45744"
);

const abi =
  require("/home/kauanluacio/Servidor/build/contracts/newNFT.json").abi;
const contractAddress = "0xb5aad160cad5ee45d1af0ea4db02974caf8c0c35"; // Substitua pelo endereço do seu contrato

app.post("/mint-token", async (req, res) => {
  const { address, tokenId, uri } = req.body;

  try {
    console.log(address);

    const contract = new web3.eth.Contract(abi, contractAddress);

    const transactionObject = {
      from: "0xf995D460814f29fBa86512291eceEf47D25CB7E4",
      to: contractAddress,
      gas: 2000000,
      gasPrice: 20000000000, // Preço do gas em wei (opcional)
      data: contract.methods.mint(address, tokenId, uri).encodeABI(), // Codifique a chamada do contrato
    };

    // Chamar a função mint do contrato Solidity

    // const accounts = await web3.eth.getAccounts();
    // await contract.methods.mint(address, tokenId, uri).send({ from: address });

    const signedTransaction = await web3.eth.accounts.signTransaction(
      transactionObject,
      "0db6b9c6a9bcb5099cf9b2a4161576f59b856b2a3d30672d8b416025a9af307b"
    );

    const result = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log(result);

    res.send("Token minted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to mint token");
  }
});
