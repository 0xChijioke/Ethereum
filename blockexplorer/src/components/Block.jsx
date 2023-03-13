import React from 'react';
import { useState, useEffect, useContext } from 'react';
import MyContext from '../context/context';



const Block = () => {
    const alchemy = useContext(MyContext);
    const [blockNumber, setBlockNumber] = useState();

    console.log(blockNumber)
    useEffect(() => {
        async function getBlockNumber() {
            const bNumber = await alchemy.core?.getBlockNumber();
            setBlockNumber(bNumber);
        }
        getBlockNumber();
    });


  return (
    <div>
        <div className="bg-slate-900 p-4 rounded-xl w-1/3">
            <h4 className="font-medium text-right">Block Height: {blockNumber}</h4>
        </div>
    </div>
  )
}

export default Block