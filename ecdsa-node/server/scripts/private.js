const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");



const privateKey = secp.utils.randomPrivateKey();
const pk = utils.toHex(privateKey);
console.log("private Key:", pk);
const public = secp.getPublicKey(privateKey).slice(1);
console.log(public)
const publicKey = utils.toHex(public);
console.log("public key:", publicKey);

const pubHas = keccak256(public);
const pubHash = pubHas.slice(-20)
const address = `0x${utils.toHex(pubHash)}`
console.log("Address:", address);




// private Key: c3ace9a4b572754b21e6bfd74d772889885f02fda56759e725143732b2b7474b
// public key: 6d47dc7d6a40fb0209dab710335390ccff79717edfa7c9f4ed7de17e031cf6eb0c5b177bd7bedc59f71770366d1e5f544a6ccfc90d304c8623214b56af41c9a0    
// Address: 0x6a4c6141243a1a6ae27be13b82628f3bb2e33e97


// private Key: 59eceaaa40304297dc51b79c09b7b4a02a825b606cb0def0f1243d5b0433d74d
// public key: d3ec0e3581358f40a4b5866c2cbfcabb4228e6892759f82b418761a862b7af66bdc254417a96e0d6a28b5e4dea754efd86f16cbf109fcba1784677d2a37b0a95    
// Address: 0x04c86556d17444f6d43d13bbc868422e23269c80


// private Key: 19b7afe0fb724d5a13d8fb55aafb0eb2ca0e8bdcec19844200e1c1ddd8de1dcd
// public key: 921c0b91f3ec05c4b2f749cd9bd7a539dff986aa3df4888133cad064c9aecef140e0d6b5efeb715aee32274d83e4f696d27847d221216fbe47285d163890cb0f    
// Address: 0xcf15ca9852715643af4332a579320a69a235d955