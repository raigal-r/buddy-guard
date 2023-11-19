import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useFetchBlocks } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const GoldenHour: NextPage = () => {
  const { error } = useFetchBlocks();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      notification.info("Sent S.O.S Message");
    }
  }, [error, countdown]);

  return (
    <div className="container mx-auto ">
      <div className=" flex flex-col items-center justify-center px-5">
        <div className="flex flex-col text-center justify-center items-center mb-8 ">
          <div className="text-3xl font-medium my-8">Check Your Golden Hour</div>
        </div>
        <div className="p-4 border-2 border-orange-500  rounded-full">
          <div className="p-4 border-2 border-orange-300 rounded-full">
            <div className="flex justify-center items-center h-60 p-4 border-2 border-[#F3D416] rounded-full">
              <div className="text-4xl font-bold bg-[#F3D416]  rounded-full w-48 h-48  text-gray-700 p-3 flex justify-center items-center">
                {`${Math.floor(countdown / 60)
                  .toString()
                  .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 w-full px-8">
          <div className="bg-green-700 p-4 block w-full mb-4 rounded-md text-center text-white">
            <button className="text-2xl font-medium py-2">Arrived Home Safely</button>
          </div>
          {/* <div className="bg-[#ff8200] p-4 block w-full rounded-md text-center text-white">
            <button className="text-2xl font-medium">Home</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GoldenHour;
