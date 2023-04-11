import React from 'react';

const BlockDetails = ({ block }) => {
    return (
        <div className="mt-8">
            {block && block.number && (
                <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold">Block Number: </h3>
                    <p className="ml-2">{block.number}</p>
                </div>
            )}
            {block && block.timestamp && (
                <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold">Timestamp: </h3>
                    <p className="ml-2">{new Date(block.timestamp * 1000).toString()}</p>
                </div>
            )}
            {block && block.miner && (
                <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold">Miner: </h3>
                    <p className="ml-2">{block.miner}</p>
                </div>
            )}
            {block && block.difficulty && (
                <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold">Difficulty: </h3>
                    <p className="ml-2">{block.difficulty}</p>
                </div>
            )}
            {/* Add more block details as needed */}
        </div>
    );
};

export default BlockDetails;
