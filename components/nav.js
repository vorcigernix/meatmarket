import Link from "next/link";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
const Nav = () => {
  const [provider, setProvider] = useState(null);
  useEffect(() => {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
    console.log(provider);
  }, [provider]);
  return (
    <header className="text-zinc-600 dark:text-zinc-400 md:mb-4">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" passHref>
          <a className="flex font-title font-medium items-center  mb-4 md:mb-0">
            <img src="favicon.svg" alt="Younf" className="w-28 h-28" />
            <div className="flex flex-col ml-4">
              <span className="text-4xl font-display dark:text-white ">
                Younf
              </span>
              <hr className="border-2 border-zinc-200 dark:border-white w-16 m-1" />
              <span className=" font-body">You are non-fungible</span>
            </div>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center md:space-x-12 justify-center font-semibold">
          <Link href="/profiles" passHref>
            <a className="mr-5 hover:text-pink-400">Profiles</a>
          </Link>
          <Link href="/create-item" passHref>
            <a className="mr-5 hover:text-pink-400">Create Profile</a>
          </Link>
          {provider ? (
            <>
              <Link href="/my-assets" passHref>
                <a className="mr-5 hover:text-pink-400">My Contacts</a>
              </Link>
              <Link href="/creator-dashboard" passHref>
                <a className="mr-5 hover:text-pink-400">Dashboard</a>
              </Link>
            </>
          ) : (
            <Link href="/about" passHref>
              <a className="mr-5 hover:text-pink-400 flex">
                How to
                <span className="flex h-3 w-3">
                  <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </a>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
