import React, { useEffect, useState } from "react";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import sss from "shamirs-secret-sharing";

// Assuming the library is installed and can be imported like this

const TapNFC: React.FC = () => {
  const [legacySignCommand] = useState(false);
  const [digest] = useState("0101010101010101010101010101010101010101010101010101010101010101");
  const [keyNo] = useState("1");
  const [password] = useState("");
  const [statusText, setStatusText] = useState("Please click on one of the buttons below.");
  const [secretA, setSecretA] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [hotel, setHotel] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [shares, setShares] = useState<Buffer[]>([]);
  const [recovered, setRecoveres] = useState<Buffer[]>([]);

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

  const handleSecretSharing = () => {
    const secret = Buffer.from(secretA);
    const shares = sss.split(secret, { shares: 3, threshold: 2 });
    console.log("shares");
    const newShares = sss.split(secret, { shares: 3, threshold: 2 });
    setShares(newShares);
    const recovered = sss.combine(shares.slice(1, 2));
    setRecoveres(recovered);
    console.log(recovered.toString()); // 'secret key'
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
      .then((res: any) => {
        setStatusText(JSON.stringify(res, null, 4));
        console.log(JSON.stringify(res, null, 4));
        handleSecretSharing();
      })
      .catch((e: Error) => {
        console.error("execHaloCmdWeb error", e);
        setStatusText(e.toString());
      });
  };

  return (
    <div className="container mt-3 mb-5">
      <strong>Status text:</strong>
      <pre id="statusText" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {statusText}
      </pre>
      <input type="text" placeholder="Name" value={name} onChange={handleInputChange} />
      <input type="text" placeholder="Surname" value={surname} onChange={handleInputChange} />
      <input type="text" placeholder="Hotel" value={hotel} onChange={handleInputChange} />
      <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={handleInputChange} />
      <button className="btn btn-primary" onClick={() => executeNFC(null)} id="btn-auto">
        Sign using auto-detected method
      </button>
      <button className="btn btn-secondary" onClick={() => executeNFC("credential")} id="btn-credential">
        Sign using Credential API
      </button>
      <button className="btn btn-secondary" onClick={() => executeNFC("webnfc")} id="btn-webnfc">
        Sign using WebNFC
      </button>
      <p>Shares:</p>
      <pre id="shares" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {shares.map(buffer => buffer.toString("utf8")).join(", ")}
      </pre>
      <p>Recovered</p>
      <pre id="recovered" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {recovered ? recovered.map(buffer => buffer.toString("utf8")).join(", ") : ""}{" "}
      </pre>
    </div>
  );
};

export default TapNFC;
