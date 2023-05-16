import React, { useState, useEffect, useContext } from 'react';
import BlockDetails from './BlockDetails';
import Transactions from './Transactions';
import MyContext from '../context/context';
import { Utils } from 'alchemy-sdk';

const Block = () => {
  const alchemy = useContext(MyContext);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [error, setError] = useState(null);

  const fetchRecentBlocks = async () => {
    try {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      const recentBlockNumbers = Array.from({ length: 10 }, (_, i) => latestBlockNumber - i);
      const recentBlocks = await Promise.all(
        recentBlockNumbers.map((blockNumber) => alchemy.core.getBlock(blockNumber))
      );
      setBlocks(recentBlocks);
    } catch (err) {
      setError(err);
      console.log("Error", err);
    }
  };

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  const handleBlockNumberChange = (event) => {
    setSelectedBlock(null);
    const blockNumber = parseInt(event.target.value);
    if (!isNaN(blockNumber)) {
      setSelectedBlock(null);
      fetchBlockDetails(blockNumber);
    }
  };

  const fetchBlockDetails = async (blockNumber) => {
    try {
      const bTransaction = await alchemy.core.getBlockWithTransactions(blockNumber);
      setSelectedBlock(bTransaction);
    } catch (err) {
      setError(err);
      console.log("Error", err);
    }
  };

  useEffect(() => {
    // Fetch the latest 10 blocks initially
    fetchRecentBlocks();
  }, [alchemy.core]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Block Inspector</h2>
      <div className="flex items-center mt-4">
        <label className="mr-2">Enter Block Number:</label>
        <input
          className="border border-gray-500 px-2 py-1"
          type="number"
          value={selectedBlock ? selectedBlock.number : ''}
          onChange={handleBlockNumberChange}
        />
        <button
          className="ml-2 bg-blue-500 text-white px-5 py-1 rounded"
          onClick={() => fetchBlockDetails(selectedBlock.number)}
        >
          Fetch Block Details
        </button>
      </div>
      {/* Render block details */}
      {selectedBlock && <BlockDetails block={selectedBlock} />}

      {/* Render recent blocks */}
      <h3 className="text-xl font-semibold mt-8">Recent Blocks</h3>
      {blocks.map((block) => (
        <div
          key={block.number}
          className="border border-gray-300 px-4 py-2 mt-2 cursor-pointer"
          onClick={() => handleBlockClick(block)}
        >
          <p>Block Number: {block.number}</p>
          <p>Timestamp: {new Date(block.timestamp * 1000).toString()}</p>
          <p>Transactions: {block.transactions.length}</p>
        </div>
      ))}

      {/* Render transactions */}
      {selectedBlock && <Transactions transactions={selectedBlock.transactions} />}
    </div>
  );
};

export default Block;
