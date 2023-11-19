/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { StatusContext } from "../pages/_app";
import { SecretContext } from "../pages/_app";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { ethers } from "ethers";
import sss from "shamirs-secret-sharing";

// Assuming the library is installed and can be imported like this

const TapNFC: React.FC = () => {
  const [legacySignCommand] = useState(false);
  const [digest] = useState("0101010101010101010101010101010101010101010101010101010101010101");
  const [keyNo] = useState("1");
  const [password] = useState("");
  const [statusText, setStatusTextA] = useState("Please click on one of the buttons below.");
  const [secretA, setSecretA] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [hotel, setHotel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [shares, setShares] = useState<Buffer[]>([]);
  const [recovered, setRecoveres] = useState<Buffer[]>([]);
  const { setStatusText } = useContext(StatusContext);
  const { setStatusSecret } = useContext(SecretContext);

  useEffect(() => {
    const newSecret = `${name}${surname}${hotel}${phoneNumber}`;
    setSecretA(newSecret);
  }, [name, surname, hotel, phoneNumber]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.placeholder) {
      case "Name":
        setName(event.target.value);
        break;
      case "Surname":
        setSurname(event.target.value);
        break;
      case "Hotel":
        setHotel(event.target.value);
        break;
      case "Phone Number":
        setPhoneNumber(event.target.value);
        break;
      default:
        break;
    }
  };

  function arr2hex(buffer: ArrayBuffer) {
    return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, "0")).join("");
  }

  const handleSecretSharing = () => {
    const secret = Buffer.from(secretA);
    const shares = sss.split(secret, { shares: 3, threshold: 2 });
    console.log("secretA", secretA);
    console.log("shares", shares);
    const newShares = sss.split(secret, { shares: 3, threshold: 2 });
    setShares(newShares);
    const recovered = sss.combine(shares.slice(0, 2));
    setRecoveres(recovered);
    console.log("recovered", Buffer.from(arr2hex(recovered.buffer), "hex").toString("utf8"));
  };

  const executeNFC = (method: string | null) => {
    setStatusText("Tap the tag to the back of your smartphone and hold it for a while.");

    const options = {
      method: method,
    };

    const command = {
      name: "sign",
      keyNo: keyNo,
      digest: digest,
      legacySignCommand: legacySignCommand,
      password: password,
    };

    execHaloCmdWeb(command, options)
      .then(async (res: any) => {
        setStatusText(JSON.stringify(res, null, 4));
        setStatusTextA(JSON.stringify(res, null, 4));
        setStatusSecret(JSON.stringify(res, null, 4));
        console.log(JSON.stringify(res, null, 4));
        handleSecretSharing();
      })
      .catch((e: Error) => {
        console.error("execHaloCmdWeb error", e);
        setStatusText(e.toString());
      });
  };

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col gap-6  px-5">
        <div className="flex flex-col gap-4 ">
          <div className="text-4xl ">Register Your NFC</div>
        </div>
        <div className="flex flex-col gap-2 container mt-3 mb-5">
          {/* <pre id="statusText" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {statusText}
      </pre> */}
          <div>
            <span className="text-lg font-medium">First Name</span>
            <input
              className="p-2 border-2 ml-11 mb-2 rounded-md border-gray-400 "
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span className="text-lg font-medium">Surname</span>
            <input
              className="p-2 border-2 ml-14 mb-2 rounded-md border-gray-400 "
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span className="text-lg font-medium">Hotel Name</span>
            <input
              className="p-2 border-2 ml-9 mb-2 rounded-md border-gray-400 "
              type="text"
              placeholder="Hotel"
              value={hotel}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span className="text-lg font-medium">Phone Number</span>
            <input
              className="p-2 border-2 ml-2 mb-2 rounded-md border-gray-400 "
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="p-4 bg-[#058050] rounded-md my-4 text-white font-medium text-lg"
            onClick={() => handleSecretSharing()}
            id="btn-auto"
          >
            Register Personal Information
          </button>
          <Link href="./main">
            <button
              className="p-4 bg-[#ff8200] rounded-md w-full text-white font-medium text-xl"
              onClick={() => executeNFC(null)}
              id="btn-auto"
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TapNFC;
