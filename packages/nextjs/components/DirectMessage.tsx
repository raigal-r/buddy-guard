/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { type Env, MessageWithCID, PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";

const DirectMessage: React.FC = () => {
  //   const [message, setMessage] = useState<MessageWithCID | null>(null); // change state variable type

  //   useEffect(() => {
  //     const initializeAndSendMessage = async () => {
  //       const signer = ethers.Wallet.createRandom();

  //       // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
  //       const userAlice = await PushAPI.initialize(signer, { env: "staging" as Env });

  //       // Send a message to Bob
  //       const aliceMessagesBob = await userAlice.chat.send("0x072d7e87c13bCe2751B5766A0E2280BAD235974f", {
  //         content: "Gm gm! It's a me... Mario",
  //       });

  //       setMessage(aliceMessagesBob);
  //     };

  //     initializeAndSendMessage();
  //   }, []);

  return (
    <>
      <div>
        <p>Hola</p>
      </div>
    </>
  );
};

export default DirectMessage;
