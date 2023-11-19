/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { addGuardian, cancelOrder, createOrder, trigExpiredOrder } from "../../utils/buddyContract";
import type { NextPage } from "next";

const contractAddress = "0x305bfBBE058aaCD760E7d6D611dbF780e25b5680";
const contractABI = [
  "function createOrder(address _token, uint256 _stake) external",
  "function addGuardian(uint256 _orderId, address _guardian) external",
  "function cancelOrder(uint256 _orderId) external",
  "function trigExpiredOrder(uint256 _orderId) external",
];

const CreateOrder: NextPage = () => {
  const router = useRouter();

  const handleCreateOrder = async () => {
    const token = "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211";
    const stake = 10000000;
    await createOrder(token, stake);
    router.push("/createBuddyGuard");
  };

  return (
    <div className="container mx-auto ">
      <div className=" flex flex-col items-center justify-center px-5 ">
        <div className="flex flex-col gap-4 text-center justify-center items-center mb-7 ">
          <span className="text-3xl font-medium mb-4">rAAVE Istanbul Party</span>
          <div className="relative w-48 h-48">
            <Image alt="raave" className="cursor-pointer" fill src="/ravve.png" />
          </div>

          <div className="pl-2">
            {/* <span>Wednesday, November 15</span> */}
            <div>
              {" "}
              <span className="font-medium">Start Time:</span>
              <span> 08:00 PM</span>
            </div>
            <div>
              {" "}
              <span className="font-medium">End Time:</span>
              <span> 04:00 AM</span>
            </div>
          </div>
        </div>
        <span className="text-xl font-bold mb-0">Choose Your Stake Coin</span>
        <form className="w-full px-10 py-4">
          <fieldset>
            <div className="relative border border-gray-300 text-gray-800 bg-white">
              <label htmlFor="coin" className="sr-only">
                My field
              </label>
              <select className="appearance-none w-full py-1 px-2  bg-white" name="whatever" id="coin">
                <option value="">Please Choose Coin</option>
                <option value="1">ApeCoin</option>
                <option value="2">AvveGHO</option>
              </select>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </fieldset>
        </form>

        <div className="rounded-full p-2 border-2 border-[#058050] hover:border-[#ff8200] mb-8 mt-4">
          {/* <Link href="./createBuddyGuard"> */}
          <button
            onClick={handleCreateOrder}
            className="bg-[#058050] hover:bg-[#ff8200] rounded-full w-40 h-40 font-bold text-lg  text-white p-3 "
          >
            Leave Soon
          </button>
          {/* </Link> */}
        </div>
        {/* <button className="bg-[#058050] mt-4 w-48 py-4 rounded-xl  text-white font-semibold">Home</button> */}
      </div>
    </div>
  );
};

export default CreateOrder;
