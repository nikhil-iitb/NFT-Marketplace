// const Web3 = require('web3');
// const {infura_provider, contractAbi, contractAddress} = require('./ContractInfo.js');
// // console.log(contractAbi)
// const address = '0xFC95f9Bd14aD4f932Ddb7C7Ed4f81F644C5CB6Db';
// const privateKey = '0xf16f231e65756d9b826bd91b179328249508c32648a671e5fccfed2a2d80ea14';


// const transferTokenEth = async (address, toAddress, privateKey, tokenId, nft_id) => {
//   const web3 = new Web3(infura_provider);
//   const networkId = await web3.eth.net.getId();
//   const myContract = new web3.eth.Contract(
//     contractAbi,
//     contractAddress
//   );

//   const tx = myContract.methods.transferFrom(address, toAddress, tokenId);
//   const gas = await tx.estimateGas({from: address});
//   const gasPrice = await web3.eth.getGasPrice();
//   const data = tx.encodeABI();
//   const nonce = await web3.eth.getTransactionCount(address);

//   const signedTx = await web3.eth.accounts.signTransaction(
//     {
//       to: myContract.options.address, 
//       data,
//       gas,
//       gasPrice,
//       nonce, 
//       chainId: networkId
//     },
//     privateKey
//   );
//   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//   console.log(`Transaction hash: ${receipt.transactionHash}`);
//   return receipt.transactionHash
// }


// const mintTokenEth = async (address, privateKey, metadataUri, toAddress, nft_id) => {
//   const web3 = new Web3(infura_provider);
//   const networkId = await web3.eth.net.getId();
//   const myContract = new web3.eth.Contract(
//     contractAbi,
//     contractAddress
//   );

//   const tx = myContract.methods.createToken(metadataUri);
//   const gas = await tx.estimateGas({from: address});
//   const gasPrice = await web3.eth.getGasPrice();
//   const data = tx.encodeABI();
//   const nonce = await web3.eth.getTransactionCount(address);

//   const signedTx = await web3.eth.accounts.signTransaction(
//     {
//       to: myContract.options.address, 
//       data,
//       gas,
//       gasPrice,
//       nonce, 
//       chainId: networkId
//     },
//     privateKey
//   );
//   const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//   console.log(`Transaction hash for minting: ${receipt.transactionHash}`);
//   const tokenNum =  await myContract.methods.get().call();
//   transferTokenEth(address, toAddress, privateKey, tokenNum, nft_id)
// //   return receipt.transactionHash
// }

// // module.exports = {transferTokenEth, mintTokenEth};

// mintTokenEth(address, privateKey, "https://sarcasm.sarc-iitb.org/")
// to_address = "0x7cE212E18302f47F5482088c7D00e1c1222f58a0"
// async function hell (){    
//     const web3 = new Web3(infura_provider);
//     var value = web3.utils.toWei('0.5', 'ether')

//     var SignedTransaction = await web3.eth.accounts.signTransaction({
//         to : to_address,
//         value:value,
//         gas: 2000000,

//     }, privateKey)

//     web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then(
//         (receipt)=>{
//             console.log(receipt)
//         })
// }

// hell()