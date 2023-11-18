import React, { useState } from "react";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";

// Assuming the library is installed and can be imported like this

const TapNFC: React.FC = () => {
  const [legacySignCommand] = useState(false);
  const [digest] = useState("0101010101010101010101010101010101010101010101010101010101010101");
  const [keyNo] = useState("1");
  const [password] = useState("");
  const [statusText, setStatusText] = useState("Please click on one of the buttons below.");

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

      <button className="btn btn-primary" onClick={() => executeNFC(null)} id="btn-auto">
        Sign using auto-detected method
      </button>
      <button className="btn btn-secondary" onClick={() => executeNFC("credential")} id="btn-credential">
        Sign using Credential API
      </button>
      <button className="btn btn-secondary" onClick={() => executeNFC("webnfc")} id="btn-webnfc">
        Sign using WebNFC
      </button>
    </div>
  );
};

export default TapNFC;
