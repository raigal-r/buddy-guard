/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { StatusContext } from "../../pages/_app";
import { addGuardian, cancelOrder, createOrder, trigExpiredOrder } from "../../utils/buddyContract";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import type { NextPage } from "next";

const contractAddress = "0x305bfBBE058aaCD760E7d6D611dbF780e25b5680";
const contractABI = [
  "function createOrder(address _token, uint256 _stake) external",
  "function addGuardian(uint256 _orderId, address _guardian) external",
  "function cancelOrder(uint256 _orderId) external",
  "function trigExpiredOrder(uint256 _orderId) external",
];

const CreateBuddyGuard: NextPage = () => {
  const router = useRouter();

  const [legacySignCommand] = useState(false);
  const [digest] = useState("0101010101010101010101010101010101010101010101010101010101010101");
  const [keyNo] = useState("1");
  const [password] = useState("");
  const [statusText, setStatusTextA] = useState("Please click on one of the buttons below.");

  const { setStatusText } = useContext(StatusContext);

  const handleCreateBuddyGuard = async () => {
    const guardian = "0x44c37214e41dF6BcB562016826cAD848d58bF95e";
    const orderId = 2;
    await addGuardian(orderId, guardian);
    router.push("/goldenHour-path");
  };

  const executeNFC = (method: string | null) => {
    setStatusText("Tap the tag to the back of your smartphone and hold it for a while.");

    const options = {
      method: method,
    };

    const command = {
      name: "sign",
      keyNo: keyNo,
      digest: digest,
      legacySignCommand: legacySignCommand,
      password: password,
    };

    execHaloCmdWeb(command, options)
      .then(async (res: any) => {
        setStatusText(JSON.stringify(res, null, 4));
        setStatusTextA(JSON.stringify(res, null, 4));
        console.log(JSON.stringify(res, null, 4));
        handleCreateBuddyGuard();
      })
      .catch((e: Error) => {
        console.error("execHaloCmdWeb error", e);
        setStatusText(e.toString());
      });
  };

  return (
    <div className="container mx-auto ">
      <div className=" flex flex-col items-center justify-center px-5 ">
        <div className="flex flex-col text-center justify-center items-center mb-8 ">
          <div className="text-3xl font-medium">Add Your Buddy-Guard!</div>
        </div>

        <div className="rounded-full p-2 border-2 border-[#058050] hover:border-[#ff8200] my-8 ">
          {/* <Link href="./goldenHour"> */}
          <button
            onClick={() => handleCreateBuddyGuard()}
            //onClick={() => executeNFC(null)}
            className=" font-bold text-lg  bg-[#058050] hover:bg-[#ff8200] rounded-full w-40 h-40  text-white p-3 "
          >
            Add
            <br /> Buddy-Guard
          </button>
          {/* </Link> */}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="text-2xl font-medium mb-8 mt-10">Today Buddy Guard List</div>
          <div className="grid grid-cols-3 w-full h-40 gap-2">
            <div className="flex flex-row justify-center bg-[#F1CF39] rounded-lg p-2">
              <div className="flex relative w-full h-full">
                1
                <Image alt="nobg-logo" fill src="/bg-nobg.png" />
              </div>
            </div>
            <div className=" bg-[#38F78B] rounded-lg p-2">
              {" "}
              <div className="flex relative w-full h-full">
                {" "}
                2
                <Image alt="nobg-logo" fill src="/bg-nobg.png" />
              </div>
            </div>
            <div className=" bg-[#F53C3A] rounded-lg p-2">
              <div className="flex relative w-full h-full">
                3
                <Image alt="nobg-logo" fill src="/bg-nobg.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBuddyGuard;
