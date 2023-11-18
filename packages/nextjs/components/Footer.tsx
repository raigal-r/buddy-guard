import React from "react";
import Image from "next/image";
import { hardhat } from "viem/chains";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const isLocalNetwork = getTargetNetwork().id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-3 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div>
                {/* <div className="btn btn-primary btn-sm font-normal normal-case gap-1 cursor-auto">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{nativeCurrencyPrice}</span>
                </div> */}
              </div>
            )}
            {isLocalNetwork && (
              <>
                {/* <Faucet />
                <Link href="/blockexplorer" passHref className="btn btn-primary btn-sm font-normal normal-case gap-1">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <span>Block Explorer</span>
                </Link> */}
              </>
            )}
          </div>
          {/* <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} /> */}
        </div>
      </div>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center"></div>
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                ©2023{" "}
                <a href="https://github.com/raigal-r/buddy-guard" target="_blank" rel="noreferrer" className="link">
                  Buddy-Guard
                </a>
              </p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex relative w-8 h-10">
                  {" "}
                  <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.png" />
                </div>
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
