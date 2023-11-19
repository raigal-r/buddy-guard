import Image from "next/image";
import type { NextPage } from "next";

const Main: NextPage = () => {
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
