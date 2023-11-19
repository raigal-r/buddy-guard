import { useEffect } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { hardhat } from "viem/chains";
import { useFetchBlocks } from "~~/hooks/scaffold-eth";
import { getTargetNetwork, notification } from "~~/utils/scaffold-eth";

const Main: NextPage = () => {
  const { error } = useFetchBlocks();

  useEffect(() => {
    if (getTargetNetwork().id === hardhat.id && error) {
      notification.error(
        <>
          <p className="font-bold mt-0 mb-1">Cannot connect to local provider</p>
          <p className="m-0">
            - Did you forget to run <code className="italic bg-base-300 text-base font-bold">yarn chain</code> ?
          </p>
          <p className="mt-1 break-normal">
            - Or you can change <code className="italic bg-base-300 text-base font-bold">targetNetwork</code> in{" "}
            <code className="italic bg-base-300 text-base font-bold">scaffold.config.ts</code>
          </p>
        </>,
      );
    }

    if (getTargetNetwork().id !== hardhat.id) {
      notification.error(
        <>
          <p className="font-bold mt-0 mb-1">
            <code className="italic bg-base-300 text-base font-bold"> targeNetwork </code> is not localhost
          </p>
          <p className="m-0">
            - You are on <code className="italic bg-base-300 text-base font-bold">{getTargetNetwork().name}</code> .This
            block explorer is only for <code className="italic bg-base-300 text-base font-bold">localhost</code>.
          </p>
          <p className="mt-1 break-normal">
            - You can use{" "}
            <a className="text-accent" href={getTargetNetwork().blockExplorers?.default.url}>
              {getTargetNetwork().blockExplorers?.default.name}
            </a>{" "}
            instead
          </p>
        </>,
      );
    }
  }, [error]);

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col gap-6  px-5">
        <div className="flex relative w-24 h-28 ml-4 ">
          <Image alt="logo" fill src="/logo.png" />
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="text-4xl ">Good Evening!</div>
          {/* <div className="text-xl">Your Wallet : 0x193sfa938202</div> */}
        </div>
        <span className="text-xl font-medium ">Today Evening Schedule</span>

        <div className="w-full h-auto  p-4 bg-[#F53C3A] rounded-md  text-white ">
          <div className="flex flex-col gap-2 ">
            <span className="text-2xl font-medium">rAAVE Istanbul Party</span>
            <div className="pl-2">
              <span>Wednesday, November 15</span>
              <div>
                {" "}
                <span className="font-medium">Start Time:</span>
                <span> 08:00 PM</span>
              </div>
              <div>
                {" "}
                <span className="font-medium">Start Time:</span>
                <span> 04:00 AM</span>
              </div>
            </div>
            <button className="mt-4 w-full p-2 rounded-lg bg-white text-gray-800 font-semibold">VISIT EVENT</button>
          </div>
        </div>
        <div className="w-full h-auto  p-4 bg-[#F1CF39] rounded-md  text-white ">
          <div className="flex flex-col gap-2 ">
            <span className="text-2xl font-medium">1inch Mixer</span>
            <div className="pl-2">
              <span>Wednesday, November 15</span>
              <div>
                {" "}
                <span className="font-medium">Start Time:</span>
                <span> 09:00 PM</span>
              </div>
              <div>
                {" "}
                <span className="font-medium">Start Time:</span>
                <span> 02:00 AM</span>
              </div>
            </div>
            <button className="mt-4 w-full p-2 rounded-lg bg-white text-gray-800  font-semibold">VISIT EVENT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
