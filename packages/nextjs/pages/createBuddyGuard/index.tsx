import Image from "next/image";
import type { NextPage } from "next";

const CreateBuddyGuard: NextPage = () => {
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
    <div className="container mx-auto ">
      <div className=" flex flex-col items-center justify-center px-5 ">
        <div className="flex flex-col text-center justify-center items-center mb-8 ">
          <div className="text-3xl font-medium">Add Your Buddy-Guard!</div>
          {/* <div className="relative w-40 h-40">
            <Image alt="raave" className="cursor-pointer" fill src="/ravve.png" />
          </div> */}

          {/* <div className="pl-2">
            <span>Wednesday, November 15</span>
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
          </div> */}
        </div>

        <div className="rounded-full p-2 border-2 border-[#058050] hover:border-[#ff8200] my-8 ">
          <button className=" font-bold text-lg  bg-[#058050] hover:bg-[#ff8200] rounded-full w-40 h-40  text-white p-3 ">
            Add
            <br /> Buddy-Guard
          </button>
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
