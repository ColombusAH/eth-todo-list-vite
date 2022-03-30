import "./style.css";
import { ethers } from "ethers";
const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Hello BlockChain!</h1>
`;
// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
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
loadAccounts();