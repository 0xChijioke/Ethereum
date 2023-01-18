pragma solidity ^0.8.0;

import "https://github.com/Uniswap/uniswap-v2-periphery/contracts/UniswapV2Pair.sol";
import "https://github.com/Uniswap/uniswap-v2-periphery/contracts/IUniswapV2Router02.sol";

contract SmartContractWallet {
    // The address of the wallet owner
    address public owner;
    // Mapping of authorized signers
    mapping(address => bool) public authorizedSigners;
    // Mapping of recovered addresses
    mapping(address => bool) public recovered;
    // Mapping of authorized recover addresses
    mapping(address => bool) public authorizedRecover;
    // Threshold number of authorized signers needed to recover the wallet
    uint public threshold;
    // Uniswap router contract's address
    address public router;

    // constructor: sets the msg.sender as the owner and an authorized signer
    // sets the threshold to 2
    // sets the router to the Uniswap router contract's address
    constructor(address _router) public {
        owner = msg.sender;
        authorizedSigners[msg.sender] = true;
        threshold = 2;
        router = _router;
    }

    // Adds an address as an authorized signer
    function addAuthorizedSigner(address _signer) public {
        require(msg.sender == owner);
        authorizedSigners[_signer] = true;
    }

    // Removes an address from the authorized signers
    function removeAuthorizedSigner(address _signer) public {
        require(msg.sender == owner);
        authorizedSigners[_signer] = false;
    }

    // sets the threshold for the number of authorized signers needed to recover the wallet
    function setThreshold(uint _threshold) public {
        require(msg.sender == owner);
        threshold = _threshold;
    }

    // Function to recover the wallet using a signed message
    function recover(bytes memory _signedMessage, bytes memory sig) public {
        // Only an address that has not recovered yet can call this function
        require(!recovered[msg.sender]);

        // Recover the address that signed the message
        bytes32 messageHash = sha3(_signedMessage);
        address signer = ecrecover(messageHash, sig);
        // Check that the signer is an authorized signer
        require(authorizedSigners[signer]);

        // Add the address trying to recover to the authorizedRecover mapping
        authorizedRecover[msg.sender] = true;
        // check if the threshold of authorized recover address is reached
        if (countAuthorizedRecover() >= threshold) {
            // Change the owner to the address that called the function
            owner = msg.sender;
            // mark the address as recovered
            recovered[msg.sender] = true;
        }