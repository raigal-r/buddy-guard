import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

interface HeaderMenuLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/main",
  },
  // {
  //   label: "Debug Contracts",
  //   href: "/debug",
  //   icon: <BugAntIcon className="h-4 w-4" />,
  // },
];

export const HeaderMenuLinks = () => {
  const router = useRouter();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = router.pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "" : ""
              } focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const burgerMenuRef = useRef<HTMLDivElement>(null);
  // useOutsideClick(
  //   burgerMenuRef,
  //   useCallback(() => setIsDrawerOpen(false), []),
  // );
  const accountState = useAccount();

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 px-0 sm:px-0">
      <div className="navbar-start w-full lg:w-1/2">
        <div className="flex lg:hidden relative w-48 h-20 ml-4">
          <Image alt="SE2 logo" className="cursor-pointer" fill src="/BG-logo.png" />
        </div>

        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0 ">
          <div className="flex relative w-10 h-12">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.png" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Buddy-Guard</span>
            <span className="text-xs">Walking Every Steps With You</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        {!accountState.isConnected && (
          <>
            <RainbowKitCustomConnectButton />
          </>
        )}
        <FaucetButton />
      </div>
    </div>
  );
};
