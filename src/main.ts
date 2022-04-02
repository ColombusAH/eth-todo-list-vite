import "./style.css";
import { ethers, BigNumber } from "ethers";
import ContractAbi from "../build/contracts/TodoList.json";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello BlockChain!</h1>
`;
// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
const contractAddress = "0x752D0149e71Cd821118f0243B30108eB32fbDaF3";
// const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner();


async function loadAccounts() {
	// MetaMask requires requesting permission to connect users accounts
	const accounts = await provider.listAccounts();
	console.log(accounts);
}
async function getContractByProvider(provider: any) {
	console.log("getContractByProvider");
	const { abi } = ContractAbi;
	const contract = new ethers.Contract(contractAddress, abi, provider);
	console.log({ contract });
	return contract;
}

async function getContractBySigner(signer: any) {
	console.log("getContractBySigner");
	const { abi } = ContractAbi;
	const contract = new ethers.Contract(contractAddress, abi, signer);
	console.log({ contract });

	return contract;
}
loadAccounts();
const contract = await getContractByProvider(provider);
const contractSigner = await  getContractBySigner(signer);
provider.getNetwork().then(console.log);
const tco = await contract.todosCount();
const tc = BigNumber.from(tco).toNumber();
console.log(tc);

// const res = await contractSigner.createTodo("test");
// console.log(res);
const todo = await contract.todos(0);
console.log(todo);
