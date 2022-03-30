import "./style.css";
import { ethers } from "ethers";
import ContractAbi from "../build/contracts/TodoList.json";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello BlockChain!</h1>
`;
// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const contractAddress = "0xFF1Fd887eF9a8dae55c1Cd478803b372f29A17C1";
const provider = new ethers.providers.Web3Provider((window as any).ethereum);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner();

console.log(signer);

async function loadAccounts() {
	// MetaMask requires requesting permission to connect users accounts
	const accounts = await provider.send("eth_requestAccounts", []);
	console.log(accounts);
}
async function getContractByProvider(provider: any) {
  console.log('getContractByProvider');
	const { abi } = ContractAbi;
	const contract = new ethers.Contract(contractAddress, abi, provider);
  console.log(contract);
  return contract
}

async function getContractBySigner(signer: any) {
  console.log('getContractBySigner');
	const { abi } = ContractAbi;
	const contract = new ethers.Contract(contractAddress, abi, signer);
  console.log(contract);
  
  return contract
}
loadAccounts();
getContractByProvider(provider);
getContractBySigner(signer);
console.log(await provider.getBlockNumber());
