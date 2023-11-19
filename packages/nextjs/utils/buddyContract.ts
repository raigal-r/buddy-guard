/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from "ethers";

const contractAddress = "0x305bfBBE058aaCD760E7d6D611dbF780e25b5680";

const contractABI = [
  "function createOrder(address _token, uint256 _stake) external",
  "function addGuardian(uint256 _orderId, address _guardian) external",
  "function cancelOrder(uint256 _orderId) external",
  "function trigExpiredOrder(uint256 _orderId) external",
];

let provider;
let signer;

if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum as any);
  signer = provider.getSigner();
}

const contract = new ethers.Contract(contractAddress, contractABI, signer);

async function createOrder(token: string, stake: number) {
  const overrides = {
    gasLimit: ethers.utils.hexlify(1000000), // 1 million gas
  };
  const tx = await contract.createOrder(token, stake, overrides);
  const receipt = await tx.wait();
  console.log(tx);
}

async function addGuardian(orderId: number, guardian: string) {
  const overrides = {
    gasLimit: ethers.utils.hexlify(1000000), // 1 million gas
  };
  const tx = await contract.addGuardian(orderId, guardian, overrides);
  const receipt = await tx.wait();
  console.log(tx);
}

async function cancelOrder(orderId: number) {
  const overrides = {
    gasLimit: ethers.utils.hexlify(1000000), // 1 million gas
  };
  const tx = await contract.cancelOrder(orderId, overrides);
  const receipt = await tx.wait();
  console.log(tx);
}

async function trigExpiredOrder(orderId: number) {
  const overrides = {
    gasLimit: ethers.utils.hexlify(1000000), // 1 million gas
  };
  const tx = await contract.trigExpiredOrder(orderId, overrides);
  const receipt = await tx.wait();
  console.log(tx);
}

export { createOrder, addGuardian, cancelOrder, trigExpiredOrder };
