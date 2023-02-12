const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const { keccak256 } = require("ethereum-cryptography/keccak");
const { recoverPublicKey, verify } = require("ethereum-cryptography/secp256k1");
const { hexToBytes, toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const balances = {
  "0xcf15ca9852715643af4332a579320a69a235d955": 100,
  "0x6a4c6141243a1a6ae27be13b82628f3bb2e33e97": 50,
  "0x04c86556d17444f6d43d13bbc868422e23269c80": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, msgHash } = req.body;
  console.log(req.body);

  if (!signature || !msgHash) {
    res.status(400).send({message: "Incomplete variables"})
  } else {

    setInitialBalance(sender);
    setInitialBalance(recipient);


    // Decode the base64-encoded strings back into binary data
    const signatureArray = new Uint8Array(atob(signature).split("").map((c) => c.charCodeAt(0)));
    const msgHashArray = new Uint8Array(atob(msgHash).split("").map((c) => c.charCodeAt(0)));


    
    const publicKey = recoverPublicKey(msgHashArray, signatureArray, 1);  
    const isSign = verify(signatureArray, msgHashArray, publicKey);
    console.log(isSign)

    if (isSign){
      if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
      } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
      } 
    } else {
      res.status(400).send({ message: "Not authorized!"})
    }
  }


});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
