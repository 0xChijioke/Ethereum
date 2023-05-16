import React from 'react';

const BlockDetails = ({ block }) => {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Block Details</h3>
            {block ? (
                <div className=" rounded shadow-md p-4">
                    <div className="font-semibold mb-2">Block Number</div>
                    <div className="text-gray-800">{block.blockNumber}</div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-gray-600">Transactions</div>
                        {block.transactions && block.transactions.length > 0 ? (
                            <div className="text-gray-800">{block.transactions.length}</div>
                        ) : (
                            <div className="text-gray-800">No transactions found</div>
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-gray-600">Time</div>
                        <div className="text-gray-800">{block.time}</div>
                    </div>
                    {/* Render transaction details here */}
                    {block.transactions && block.transactions.length > 0 && (
                        <div>
                            <h4 className="text-md font-semibold mt-4 mb-2">Transactions</h4>
                            <div className="grid grid-cols-1 gap-4">
                                {block.transactions.map((transaction, index) => (
                                    <div
                                        key={index}
                                        className="rounded shadow-md p-4"
                                    >
                                        <div className="font-semibold mb-2">
                                            Transaction #{index + 1}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-gray-600">From</div>
                                            <div className="text-gray-800">{transaction.from}</div>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="text-gray-600">To</div>
                                            <div className="text-gray-800">{transaction.to}</div>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="text-gray-600">Value</div>
                                            {/* <div className="text-gray-800">{transaction.value} Ether</div> */}
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="text-gray-600">Time</div>
                                            <div className="text-gray-800">{transaction.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-gray-600">No block found</div>
            )}
        </div>
    );
};

export default BlockDetails;
