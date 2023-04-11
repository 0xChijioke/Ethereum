import React, { useState, useEffect, useContext } from 'react';
import BlockDetails from './BlockDetails';
import Transactions from './Transactions';
import MyContext from '../context/context';
import { Utils } from 'alchemy-sdk';

const Block = () => {
    const alchemy = useContext(MyContext);
    const [block, setBlock] = useState({});
    const [blockNumber, setBlockNumber] = useState(0);
    const [error, setError] = useState(null);
    const [blockCards, setBlockCards] = useState([]);

    const handleBlockNumberChange = (event) => {
        setBlockNumber(event.target.value);
    }

    const fetchBlockDetails = async () => {
        try {
            const bTransaction = await alchemy.core.getBlockWithTransactions(blockNumber);
            setBlock(bTransaction);
        } catch (err) {
            setError(err);
            console.log("Error", err);
        }
    }

    const fetchNextBlockDetails = async () => {
        try {
            const nextBlockNumber = blockNumber + 1;
            const bTransaction = await alchemy.core.getBlockWithTransactions(nextBlockNumber);
            setBlockNumber(nextBlockNumber);
            setBlock(bTransaction);
        } catch (err) {
            setError(err);
            console.log("Error", err);
        }
    }

    const fetchPreviousBlockDetails = async () => {
        try {
            const previousBlockNumber = blockNumber - 1;
            if (previousBlockNumber >= 0) {
                const bTransaction = await alchemy.core.getBlockWithTransactions(previousBlockNumber);
                setBlockNumber(previousBlockNumber);
                setBlock(bTransaction);
            }
        } catch (err) {
            setError(err);
            console.log("Error", err);
        }
    }

    // Fetch the latest block details initially
    async function fetchLatestBlockDetails() {
        try {
            const bNumber = await alchemy.core.getBlockNumber();
            setBlockNumber(bNumber);
            const bTransaction = await alchemy.core.getBlockWithTransactions(bNumber);
            setBlock(bTransaction);
        } catch (err) {
            setError(err);
            console.log("Error", err);
        }
    }

    // Click event handler for "View Latest Block" button or link
    const handleViewLatestBlock = () => {
        fetchLatestBlockDetails();
    }

    useEffect(() => {
        fetchLatestBlockDetails();
    }, []);

    useEffect(() => {
        // Update block cards
        if (block && Object.keys(block).length > 0) {
            setBlockCards(prevBlockCards => {
                const newBlockCard = {
                    id: block.number,
                    block: block,
                };
                // Remove the oldest block card if there are already 4 block cards
                if (prevBlockCards.length === 4) {
                    prevBlockCards.pop();
                }
                // Add the new block card to the beginning
                prevBlockCards.unshift(newBlockCard);
                return prevBlockCards;
            });
        }
    }, [block]);


    return (
        <div>
            <div className="flex md:flex-row md:justify-between flex-col mt-4">
                <div>
                    <label className="mr-2">Enter Block No.:</label>
                    <input className="border border-gray-500 px-2 py-1" type="number" value={blockNumber} onChange={handleBlockNumberChange} />
                    <button className="bg-blue-500 text-white px-4 py-1 ml-2" onClick={fetchBlockDetails}>View Block</button>
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-1" onClick={handleViewLatestBlock}>View Latest Block</button>
                    <button className="bg-blue-500 text-white px-4 py-1 ml-2" onClick={fetchPreviousBlockDetails}>Previous</button>
                    <button className="bg-blue-500 text-white px-4 py-1 ml-2" onClick={fetchNextBlockDetails}>Next</button>
                </div>
            </div>
            {error && <div className="text-red-500 mt-4">{error.message}</div>}
            {block && Object.keys(block).length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-8">
                    {blockCards.map((blockCard) => (
                        <BlockDetails key={blockCard.id} block={blockCard.block} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Block;