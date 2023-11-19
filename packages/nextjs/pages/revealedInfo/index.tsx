import type { NextPage } from "next";

const RevealedInfo: NextPage = () => {
  // const { error } = useFetchBlocks();

  // useEffect(() => {
  //   if (getTargetNetwork().id === hardhat.id && error) {
  //     notification.error(
  //       <>
  //         <p className="font-bold mt-0 mb-1">Cannot connect to local provider</p>
  //         <p className="m-0">
  //           - Did you forget to run <code className="italic bg-base-300 text-base font-bold">yarn chain</code> ?
  //         </p>
  //         <p className="mt-1 break-normal">
  //           - Or you can change <code className="italic bg-base-300 text-base font-bold">targetNetwork</code> in{" "}
  //           <code className="italic bg-base-300 text-base font-bold">scaffold.config.ts</code>
  //         </p>
  //       </>,
  //     );
  //   }

  //   if (getTargetNetwork().id !== hardhat.id) {
  //     notification.error(
  //       <>
  //         <p className="font-bold mt-0 mb-1">
  //           <code className="italic bg-base-300 text-base font-bold"> targeNetwork </code> is not localhost
  //         </p>
  //         <p className="m-0">
  //           - You are on <code className="italic bg-base-300 text-base font-bold">{getTargetNetwork().name}</code> .This
  //           block explorer is only for <code className="italic bg-base-300 text-base font-bold">localhost</code>.
  //         </p>
  //         <p className="mt-1 break-normal">
  //           - You can use{" "}
  //           <a className="text-accent" href={getTargetNetwork().blockExplorers?.default.url}>
  //             {getTargetNetwork().blockExplorers?.default.name}
  //           </a>{" "}
  //           instead
  //         </p>
  //       </>,
  //     );
  //   }
  // }, [error]);

  return (
    <div className="container mx-auto mt-4 mb-4">
      <div className="w-full flex flex-col gap-3 mx-5">
        {/* <div className="flex relative w-40 h-48 ml-0">
          <Image alt="buddy-joy" fill src="/buddy-rc.png" />
        </div> */}
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
