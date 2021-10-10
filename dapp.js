/*
 *  dAPP.js
 *  @Created on: 10-October-2021
 *  @Author: Chandramohan Jagtap
 *  @Email:  cmjagtap1@gmail.com
 *  @Description:
 *		This is a simple dAPP intracts with ethereum blockchain.
 */

const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const INFURA_KEY = "";  // Replace your infura-key
const web3 = new Web3('wss://ropsten.infura.io/ws/v3/' + INFURA_KEY); 
const account = ''; // Replace wallet address with metamask wallet address
const privateKey = Buffer.from('', 'hex'); // Replace Private key to sign the transaction.
const contract_Address = ""; //replace deployed contract address
const abi = ;
const contract = new web3.eth.Contract(abi, contract_Address); // Instantiating smart contract


function signTransaction(smartContractFunction)
{
    web3.eth.getTransactionCount(account, (err, txCount) => {
        web3.eth.getGasPrice(function(e, r) {
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contract_Address,
            value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(r),
            data: smartContractFunction
        }
        const tx = new Tx(txObject, { chain: 'ropsten' });
        
        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', receipt => {
            console.log(receipt);
        })
    });
})
}

function createStudent(studentName, studentClass) {

    const smartContractFunction = contract.methods.create(studentName,studentClass).encodeABI();
    signTransaction(smartContractFunction);
}

function readStudent(studentRollNo) {
    contract.methods.read(studentRollNo).call().then(function(result) {
        console.log(result);
      });
}
function updateStudent(studentRollNo,studentName, studentClass) {

    const smartContractFunction = contract.methods.update(studentRollNo,studentName,studentClass).encodeABI();
    signTransaction(smartContractFunction);
}
function deleteStudent(studentRollNo)
{
    const smartContractFunction = contract.methods.destroy(studentRollNo).encodeABI();
    signTransaction(smartContractFunction);
}
createStudent('cm','First Year');
//readStudent(0);
//updateStudent(0,'cm','Second Year')
//deleteStudent(0);

