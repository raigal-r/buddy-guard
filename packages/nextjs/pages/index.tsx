import React, { Fragment, useEffect, useState } from "react";
import router from "next/router";
import TapNFC from "../components/TapNFC";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { Dialog, Transition } from "@headlessui/react";
import { NfcCardSignMessageResult } from "jubmoji-api";
import type { NextPage } from "next";
import DirectMessage from "~~/components/DirectMessage";
import { MetaHeader } from "~~/components/MetaHeader";

export type ForegroundTapModalProps = {
  message: string;
  onTap: (args: NfcCardSignMessageResult) => Promise<void>;
};

const Home: NextPage = () => {
  // const [pubKey, setPubKey] = useState<string>("");
  // const [rawSig, setRawSig] = useState<string>("");
  // const [digest, setDigest] = useState<string>("");

  // useEffect(() => {
  //   console.log("pubKey", pubKey);
  //   console.log("rawSig", rawSig);
  //   console.log("digest", digest);
  //   setIsForeground(false);
  // }, [pubKey]);

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <>
          <div>
            <TapNFC />
            <DirectMessage />
          </div>
        </>
      </div>
    </>
  );
};

export default Home;

export function ForegroundTapModal({ message, onTap }: ForegroundTapModalProps) {
  const [statusText, setStatusText] = useState("Waiting for NFC setup...");

  useEffect(() => {
    async function runScan() {
      const command = {
        name: "sign",
        keyNo: 1,
        digest: "",
      };

      let res;
      try {
        // --- request NFC command execution ---
        res = await execHaloCmdWeb(command, {
          statusCallback: (cause: any) => {
            if (cause === "init") {
              setStatusText("Please tap the tag to the back of your smartphone and hold it...");
            } else if (cause === "retry") {
              setStatusText("Something went wrong, please try to tap the tag again...");
            } else if (cause === "scanned") {
              setStatusText("Tag scanned successfully, post-processing the result...");
            } else {
              setStatusText(cause);
            }
          },
        });

        await onTap({
          digest: res.input.digest,
          rawSig: res.signature.raw,
          pubKey: res.publicKey,
        });
        setStatusText(`Tapped card! Process result...`);
        // Then navigate to the main page
        router.push("./main");
      } catch (error) {
        console.error(error);
        setStatusText("Scanning failed, please try again.");
      }
    }

    runScan();
  }, [onTap, message]);

  return (
    <Modal isOpen={true} setIsOpen={() => console.log("setIsOpen function called")}>
      {" "}
      <span className="font-helvetica text-[23px] font-bold leading-none text-woodsmoke-100">
        Place the NFC card on your phone.
      </span>
      <span className="font-helvetica text-base font-normal leading-[22.4px] text-woodsmoke-100">{statusText}</span>
      <span className="font-helvetica text-base font-normal leading-[22.4px] text-woodsmoke-100">
        {"If you still can't tap, check out the "}
        <a
          href="https://pse-team.notion.site/Card-tapping-instructions-ac5cae2f72e34155ba67d8a251b2857c?pvs=4"
          target="_blank"
          className="underline"
          rel="noreferrer"
        >
          troubleshooting guide
        </a>
        .
      </span>
    </Modal>
  );
}

export interface ModalProps extends Pick<React.HTMLAttributes<HTMLDivElement>, "children"> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

export const Icons: Record<string, any> = {
  close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="#F5F5F6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  closable = true, // show close button when active
  onClose, // run when modal close
}: ModalProps) => {
  const onCloseModal = (): void => {
    onClose?.();
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="fixed top-0 bottom-0 left-0 right-0 bg-shark-970 w-full transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all">
                {closable && (
                  <div className="fixed z-100 right-[24px] top-[6px] flex items-center h-12 py-8">
                    <button
                      type="button"
                      className="ml-auto ring-0 focus:right-0 focus:outline-none outline-none cursor-pointer"
                      onClick={onCloseModal}
                    >
                      <Icons.close />
                    </button>
                  </div>
                )}
                <div className="flex flex-col grow h-full overflow-scroll pb-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

Modal.displayName = "Modal";
