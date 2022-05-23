import React from "react";
import Image from "next/image"
import Link from "next/link";
import Logo from "../assets/default-monochrome-white.svg"
import { SiDiscord, SiMastodon, SiTwitter } from "react-icons/si";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [flyer, setFlyer] = React.useState(false);
  const [flyerTwo, setFlyerTwo] = React.useState(false);

  return (
    <header className="fixed top-0 w-full clearNav z-50">
      <div className="max-w-5xl mx-auto flex flex-wrap p-5 flex-col md:flex-row">
        <div className="flex flex-row items-center justify-between p-3 md:p-1">
          <Link
            href="/"
            className="flex text-3xl text-white font-medium mb-4 md:mb-0 cursor-pointer"
          ><a><Image 
            src={Logo}
            width="160px"
            className="cursor-pointer"
          /></a>
          </Link>
          <button
            className="text-white pb-4 cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none content-end ml-auto"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className="md:ml-auto md:mr-auto font-4 pt-1 md:pl-14 pl-1 flex flex-wrap items-center md:text-base text-1xl md:justify-center justify-items-start">
            <a href="https://github.com/julianyaman/tooldb" className="mr-11 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              About
            </a>
            <a href="https://julianyaman.com" className="mr-11 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              Blog
            </a>
            <Link href="/donate">
              <a className="mr-12 ml-0 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
                Donate
              </a>
            </Link>
            <a href="https://github.com/julianyaman/tooldb/issues" className="mr-5 cursor-pointer text-yellow-300 hover:text-white font-semibold tr04 ">
              Submit a tool
            </a>
          </div>
          <a
            href="https://discord.com/invite/ccpgH3b"
            rel="noopener noreferrer"
            target="_blank"
            className="invisible md:visible mr-3 hover:text-white text-gray-300"
          >
            <SiDiscord size="1.5em"/>
          </a>
          <a
            href="https://mstdn.social/@tooldbdev"
            rel="noopener noreferrer me"
            target="_blank"
            className="invisible md:visible mr-3 hover:text-white text-gray-300"
          >
            <SiMastodon size="1.5em"/>
          </a>
          <a
            href="https://twitter.com/tooldbdev"
            rel="noopener noreferrer"
            target="_blank"
            className="invisible md:visible mr-3 hover:text-white text-gray-300"
          >
            <SiTwitter size="1.5em"/>
          </a>
          <a
            data-v-54e46119=""
            href="https://github.com/julianyaman"
            rel="noopener noreferrer"
            target="_blank"
            className="invisible md:visible"
          >
            <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/julianyaman/btoold?style=social" />
          </a>
        </div>
      </div>
    </header>
  );
}