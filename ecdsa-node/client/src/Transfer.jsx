import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, signature, msgHash }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");


  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    
    if(!signature || !msgHash){
      console.log("sign a message to transfer funds")
    }

    // Convert the signature and msgHash arrays to base64-encoded strings
  const signatureBase64 = btoa(String.fromCharCode.apply(null, signature));
  const msgHashBase64 = btoa(String.fromCharCode.apply(null, msgHash));

  try {
    const {
      data: { balance },
    } = await server.post(`send`, {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
      signature: signatureBase64,
      msgHash: msgHashBase64,
    });
    setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
