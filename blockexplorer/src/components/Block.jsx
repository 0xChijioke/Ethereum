import React from 'react';
import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/context';
import { Utils } from 'alchemy-sdk';


const Block = () => {
    const alchemy = useContext(MyContext);
    const [blockNumber, setBlockNumber] = useState();
    const [block, setBlock] = useState({});

    useEffect(() => {
        async function getBlockNumberAndTransactions() {
            const bNumber = await alchemy.core.getBlockNumber();
            setBlockNumber(bNumber);
            const bTransaction = await alchemy.core.getBlockWithTransactions(bNumber);
            setBlock(bTransaction);

        }
        getBlockNumberAndTransactions();
    });


  return (
    <div>
        <div className="bg-slate-900 p-4 rounded-xl w-1/2">
            <h4 className="font-medium text-right">Block Height: {blockNumber}</h4>
            <div className="w-full">
                <div className="badge items-start badge-outline">latest</div>
                <div>Block number: {block.number}</div>
                <div>Block hash: {block.hash}</div>
                <div>Block parent hash: {block.parentHash}</div>
                <div>Block timestamp: {Date(block.timestamp)}</div>
                <div>Nonce: {block.nonce}</div>
                <div>Difficulty: {block.difficulty}</div>
                <div>Gas limit: {Number(block.gasLimit)}</div>
                <div>Gas used: {Number(block.gasUsed)}</div>
                <div>Miner: {block.miner}</div>
                <div>Extra data: {block.extraData}</div>
                <div>Base fee: {Number(block.baseFeePerGas)}</div>
                <div>_difficulty: {Number(block._difficulty)}</div>
            </div>
        </div>
    </div>
  )
}

export default Block