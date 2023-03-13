import { Alchemy, Network } from 'alchemy-sdk';
import { Block, Header } from "./components";

import './App.css';
import MyContext from './context/context';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {

  return (
    <>
    <MyContext.Provider value={alchemy}>
      <main className="p-3 max-w-screen min-h-screen flex flex-col">
        <Header />
        <Block />
      </main>
    </MyContext.Provider>
    </>
  );
}

export default App;
