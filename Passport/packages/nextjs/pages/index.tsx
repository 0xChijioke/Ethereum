import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";





const Home: NextPage = () => {
  const { address, isConnected} = useAccount();
  const [score, setScore] = useState<number | null>(null);
  const [noScoreMessage, setNoScoreMessage] = useState("");


  // This endpoint is used to generate the appropriate message for them to sign.
  // https://api.scorer.gitcoin.co/registry/signing-message


  // Once the user has signed the message, we'll send a new request to this endpoint along with the address, Scorer ID, signature, and nonce.
  // https://api.scorer.gitcoin.co/registry/submit-passport
  // const response = await fetch(SUBMIT_PASSPORT_URI, {
  //   method: 'POST',
  //   headers,
  //   body: JSON.stringify({
  //     address: ,
  //     scorer_id: SCORER_ID,
  //     signature: ,
  //     nonce: 
  //   })
  // })

  useEffect(() => {
    async function fetchPassportScore() {
      const response = await fetch(`/api/score?address=${address}`);
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setScore(data.score);;
        setNoScoreMessage("");
      } else {
        const errorData = await response.json();
        setScore(null);
        setNoScoreMessage(errorData.error);
      }
    }

    if (address && isConnected) {
      fetchPassportScore();
    }
  }, [address, isConnected]);


  console.log("Score: ", score);
  console.log("No Score: ", noScoreMessage);


  return (
    <>
      <Head>
        <title>Scaffold-ETH 2 App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold">packages/nextjs/pages/index.tsx</code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract <code className="italic bg-base-300 text-base font-bold">YourContract.sol</code> in{" "}
            <code className="italic bg-base-300 text-base font-bold">packages/hardhat/contracts</code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Experiment with{" "}
                <Link href="/example-ui" passHref className="link">
                  Example UI
                </Link>{" "}
                to build your own UI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
