import type { NextPage } from "next";

const RevealedInfo: NextPage = () => {
  return (
    <div className="container mx-auto mt-4 mb-4">
      <div className="w-full flex flex-col gap-3 mx-5">
        <div className="flex flex-col gap-7 ml-0 mr-5">
          <div className="text-6xl font-medium text-red-500 ">S.O.S</div>
          <div className="flex flex-col gap-8 text-[1.4rem] font-medium bg-red-500 text-white p-4 py-10 rounded-md">
            <div>Name : Rachal Lee</div>
            <div>Hotel Info : The Central Hotel</div>
            <div>BirthDate : 1999.04.18</div>
            <div>Telegram : rachel_lee</div>
            <div>Last Contact Time : 03:20 AM</div>
            <div>Last Contact Event : rAAVE Party</div>
          </div>
          <div className="flex-row  font-medium   text-white">
            <button className="bg-[#058050] p-4 block w-full mb-4 rounded-md">Contact Telegram</button>
            <button className="bg-[#ff8200] p-4 block w-full rounded-md">Contact Police</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevealedInfo;
