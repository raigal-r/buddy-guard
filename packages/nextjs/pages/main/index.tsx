import Image from "next/image";
import type { NextPage } from "next";

const Main: NextPage = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-col gap-6  mx-5">
        <div className="flex relative w-24 h-28 ml-4">
          <Image alt="logo" fill src="/logo.png" />
        </div>
        <div className="flex flex-col gap-4 ml-2">
          <div className="text-4xl ">Good Evening</div>
          <div className="text-2xl">0x193sfa938202</div>
        </div>
        <span className="text-xl font-bold mt-6">Today Evening Schedule</span>
        <div className="w-full h-auto  p-4 bg-green-600 rounded-md  mr-4 text-white ">
          <div className="flex flex-col gap-2 ">
            <span className="text-2xl font-medium">rAave Istanbul Party</span>
            <div>
              {" "}
              <span className="font-medium">Hosted by:</span>
              <span> Lens Protocol</span>
            </div>
            <span>Wednesday, November 15</span>
            <span className="text-red-300 font-medium">8:00 PM to 4:00 AM</span>
            <button className="mt-4 w-full p-2 rounded-lg bg-white text-green-600 font-semibold">VISIT EVENT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
