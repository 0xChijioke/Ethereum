import server from "./server";
import { getPublicKey, sign } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ privateKey, setPrivateKey, balance, setBalance, setAddress, address, msgHash, setMsgHash, setSignature }) {
  let publicKey;

  function makeHash(evt){
    setMsgHash(keccak256(new Uint8Array(evt.target.value)));
  }

  
  
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    if (privateKey){
      const publicK = getPublicKey(privateKey).slice(1);
      publicKey = toHex(publicK);
      const pubHas = keccak256(publicK);
      const pubHash = pubHas.slice(-20);
      address = `0x${toHex(pubHash)}`;
      setAddress(address)
    }
    
    if (address) {
      const { data: { balance }, } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  async function signM(){
    const signMsg = await sign(msgHash, privateKey);
    setSignature(signMsg);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Enter you private key to sign transactions" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <div className="address">Wallet Address: {address}</div>
      <div>
        <input placeholder="Input any message" onChange={makeHash} />
        <div>
          <button onClick={signM}>sign</button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
