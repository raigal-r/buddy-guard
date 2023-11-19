import Image from "next/image";
import type { NextPage } from "next";

const Landing: NextPage = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-col mb-5 mx-5">
        <div>
          <Image alt="logo" className="flex lg:hidden relative  " fill src="/logo.png" />
        </div>
      </div>
    </div>
  );
};

export default Landing;
