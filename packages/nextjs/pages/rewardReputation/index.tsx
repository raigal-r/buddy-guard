import Image from "next/image";
import type { NextPage } from "next";

const RewardReputation: NextPage = () => {
  return (
    <div className="container mx-auto mt-2 mb-4">
      <div className="w-full flex flex-col gap-3 mx-5 00">
        <div className="flex relative w-40 h-48 ml-0">
          <Image alt="buddy-joy" fill src="/buddy-joy.png" />
        </div>
        <div className="flex flex-col gap-4 ml-0 mr-4 font-medium">
          <div className="text-4xl ">Hello! Buddy-Guard</div>
          <div className="text-xl  border-4 border-green-600 py-6 px-4 rounded-md flex flex-col gap-4">
            <div className="">Wallet : 0x193sfa938202</div>
            <div>Reward Score: 97</div>
            <div className="flex gap-1">
              <span>80 Ape Coin</span>
              <span className="mx-4">|</span>
              <span>77 GHO Coin</span>
            </div>
          </div>
        </div>
        <span className="text-xl font-bold mt-3">Buddy-Guard Reward History</span>
        <div className="flex gap-4 text-lg">
          <span className="font-medium ">#05</span>
          <span className="flex gap-4 text-md">11/16</span>
          <span>rAAVE Istanbul</span>
          <span>10 Coins</span>
        </div>
        <div className="flex gap-4 text-lg">
          <span className="font-medium ">#04</span>
          <span className="flex gap-4 text-md">11/15</span>
          <span>ApeCoin Istanbul</span>
          <span>10 Coins</span>
        </div>
        <div className="flex gap-4 text-lg">
          <span className="font-medium ">#03</span>
          <span className="flex gap-4 text-md">11/15</span>
          <span>Push Istanbul</span>
          <span>10 Coins</span>
        </div>
        <div className="flex gap-4 text-lg">
          <span className="font-medium ">#02</span>
          <span className="flex gap-4 text-md">11/13</span>
          <span>Mantle Mixer</span>
          <span>10 Coins</span>
        </div>
        <div className="flex gap-4 text-lg">
          <span className="font-medium ">#01</span>
          <span className="flex gap-4 text-md">11/13</span>
          <span>Arx After Party</span>
          <span>10 Coins</span>
        </div>
      </div>
    </div>
  );
};

export default RewardReputation;
