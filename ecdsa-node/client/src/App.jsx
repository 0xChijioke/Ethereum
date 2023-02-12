import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [msgHash, setMsgHash] = useState();
  const [signature, setSignature] = useState();

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setAddress={setAddress}
        address={address}
        msgHash={msgHash}
        setMsgHash={setMsgHash}
        setSignature={setSignature}
      />
      <Transfer setBalance={setBalance} address={address} signature={signature} msgHash={msgHash} />
    </div>
  );
}

export default App;
