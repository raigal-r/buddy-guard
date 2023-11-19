/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import React from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

export const StatusContext = React.createContext({
  statusText: "",
  setStatusText: (newStatus: string) => {},
});

export const SecretContext = React.createContext({
  statusSecret: "",
  setStatusSecret: (newStatus: string) => {},
  shares: [] as Buffer[],
  setShares: (newShares: Buffer[]) => {},
});

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const [statusText, setStatusText] = React.useState("Waiting for NFC setup...");
  const [statusSecret, setStatusSecret] = React.useState(""); // Add this line
  const [buffer, setBuffer] = React.useState<Buffer | null>(null); // Add this line

  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  // const [isDarkTheme, setIsDarkTheme] = useState(true);
  // const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        // theme={isDarkTheme ? darkTheme() : lightTheme()}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="relative flex flex-col flex-1">
            <StatusContext.Provider value={{ statusText, setStatusText }}>
              <SecretContext.Provider value={{ statusSecret, setStatusSecret, shares: [], setShares: () => {} }}>
                <Component {...pageProps} />
              </SecretContext.Provider>
            </StatusContext.Provider>
          </main>
          <Footer />
        </div>
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
