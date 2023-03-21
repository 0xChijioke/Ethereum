import React from 'react';
import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/context';
import { Utils } from 'alchemy-sdk';
import moment from 'moment/moment';


const Block = () => {
    const alchemy = useContext(MyContext);
    const [blockNumber, setBlockNumber] = useState();
    const [block, setBlock] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        async function getBlockNumberAndTransactions() {
            try{
                const bNumber = await alchemy.core.getBlockNumber();
                setBlockNumber(bNumber);
                const bTransaction = await alchemy.core.getBlockWithTransactions(blockNumber);
                setBlock(bTransaction);
            } catch (err) {
                setError(err);
                console.log("Error", err);
            }

        }
        getBlockNumberAndTransactions();
    });

    const handlePreviousBlock = async () => {
        const previousBlock = await alchemy.core.getBlockWithTransactions(block.number - 1);
        setBlock(previousBlock);
      }
    
      const handleNextBlock = async () => {
        const nextBlock = await alchemy.core.getBlockWithTransactions(block.number + 1);
        setBlock(nextBlock);
      }

    
  return (
    <div>
        <div className="bg-slate-900 p-4 flex md:flex-row flex-col shadow-lg rounded-xl w-full">
            <div className="w-full md:w-fit flex flex-col rounded-xl">
                <h4 className="pb-3 text-xl font-semibold text-center">Block</h4>

                <div className="divider"></div>

                <div className="flex flex-row justify-between">
                    <div className="badge mt-3 items-start badge-outline">latest</div>

                    <div>
                        <div className="btn-group">
                            <div className="tooltip" data-tip="view previous block">
                                <button className="btn hover:bg-cyan-700" onClick={handlePreviousBlock}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                            </div>
                            <div className="tooltip" data-tip="view next block">
                                <button className="btn hover:bg-cyan-700" onClick={handleNextBlock}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="space-y-7">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col font-extrabold text-2xl"><span className="font-bold text-lg">Block #</span> {block.number}</div>
                        <div  className="flex flex-col text-base text right font-medium"><span className="flex-wrap font-bold text-lg">Age</span> {moment(Date(block.timestamp)).fromNow()}</div>
                    </div>
                    <div className="text-sm"><span className="font-bold">Transactions:</span> {block.transactions && block.transactions.length -1} transactions in this block.</div>
                    <div className="text-sm"><span className="font-bold">Gas used:</span> {block.gasUsed && Utils.formatEther(block.gasUsed)} Ether</div>
                    <div className="text-sm"><span className="font-bold">Gas limit:</span> {Number(block.gasLimit)}</div>
                    <div className="text-sm"><span className="font-bold ">Base fee:</span> {Number(block.baseFeePerGas)}</div>
                    <div className="text-sm"><span className="font-bold">Nonce:</span> {block.nonce}</div>
                    <div className="text-sm"><span className="font-bold">Block timestamp:</span> {moment.unix(block.timestamp).local().format("llll")}</div>
                    <div className="text-sm"><span className="font-bold">Extra data:</span> {block.extraData}</div>
                    <div className="text-sm"><span className="font-bold">Miner:</span> {block.miner}</div>
                    <div className="text-sm"><span className="font-bold">Block hash:</span> {block.hash? block.hash : "0x" }</div>
                    <div className="text-sm"><span className="font-bold">Block parent hash:</span> {block.parentHash? block.parentHash : "0x" }</div>
                </div>
            </div>
            
            <div className="flex flex-1 flex-col w-fit">
                <h4 className="pb-3 text-xl font-semibol text-center">Transactions</h4>

                <div className="divider"></div>

                <div>
                    <div>Block {blockNumber} Transactions</div>
                    {block.transactions && block.transactions.map((transaction) => {
                        <>
                            <div>Transaction Type: {transaction.type}</div>
                            <div>Transaction Hash: {transaction.hash}</div>
                            <div>Transaction blockHash: {transaction.blockHash}</div>
                            <div>Transaction blockNumber: {transaction.blockNumber}</div>
                            <div>Transaction Index: {transaction.transactionIndex}</div>
                            <div>ChainId: {transaction.chainId}</div>
                            <div>From: {transaction.from}</div>
                            <div>To: {transaction.to}</div>
                            <div>Value: {transaction.value && Utils.formatEther(transaction.value)}</div>
                            <div>Nonce: {transaction.nonce}</div>
                            <div>Gas Price: {transaction.gasPrice && Utils.formatEther(transaction.gasPrice)}</div>
                            <div>Max Priority Fee: {transaction.maxPriorityFeePerGas && Utils.formatEther(transaction.maxPriorityFeePerGas)}</div>
                            <div>Max Fee Per Gas: {transaction.maxFeePerGas && Utils.formatEther(transaction.maxFeePerGas)}</div>
                            <div>Gas limit: {transaction.gasLimit && Utils.formatEther(transaction.gasLimit)}</div>
                            <div>Creates: {transaction.creates}</div>
                            <div>Data: {transaction.data && transaction.data}</div>
                            <div>v: {transaction.v && transaction.v}</div>
                            <div>r: {transaction.r && transaction.r}</div>
                            <div>s: {transaction.s && transaction.s}</div>
                        </>
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Block