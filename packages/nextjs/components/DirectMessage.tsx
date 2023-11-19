/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { type Env, MessageWithCID, PushAPI } from "@pushprotocol/restapi";
import { Wallet, ethers } from "ethers";
import { sepolia } from "wagmi";

const DirectMessage: React.FC = () => {
  //   const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  //   const network = sepolia;

  //   const [message, setMessage] = useState<MessageWithCID | null>(null); // change state variable type
  //   const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls.alchemy.http[0]);
  //     const signer = new ethers.Wallet(privateKey, provider);
  //   useEffect(() => {
  //     const initializeAndSendMessage = async () => {
  //       // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
  //       const userAlice = await PushAPI.initialize(signer, { env: "staging" as Env });

  //       // Send a message to Bob
  //       const aliceMessagesBob = await userAlice.chat.send("0xaaD254C50ebA6f779b431d6B882fCEA135822f93", {
  //         content: "Gm gm! It's a me... Mario",
  //       });

  //       setMessage(aliceMessagesBob);
  //     };

  //     initializeAndSendMessage();
  //   }, []);

  return <></>;
};

export default DirectMessage;
