import Image from "next/image"
import Link from "next/link";
import Logo from "../assets/default-monochrome-white.svg"
import { SiDiscord, SiTwitter } from "react-icons/si";
import { Avatar, Button, Dropdown, Spinner } from "flowbite-react";
import LoginModal from "./LoginModal";
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from "../util/supabase";
import { Suspense, useEffect, useState } from 'react';

export default function Header(props:any) {
  
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user, error } = useUser();
  const [ userData, setUserData] : any = useState({username: "loading..."});

  const supabaseCallUser = supabase.auth.user()

  useEffect(() => {
    setIsLoading(false);
    async function loadData(user:any) {
      const { data } : any = await supabase.from('profiles').select('*').eq("user_id", user?.id);
      setUserData(data[0]);
    }
    if (user) {
      loadData(user);
    }
    if(supabaseCallUser){
      loadData(supabaseCallUser)
    }
  }, [user]);

  return (
    <header className="fixed top-0 w-full clearNav z-50">
      {
        showLoginModal ? (
          <LoginModal showHandler={setShowLoginModal} onClose={() => setShowLoginModal(false)} />
        ) : null
      }
      <div className="max-w-6xl mx-auto flex flex-wrap px-5 md:py-1 flex-col md:flex-row">
        <div className="flex flex-row items-center justify-between">
          <Link
            href="/"
            className="flex text-3xl text-white font-medium mb-4 md:mb-0 cursor-pointer"
          ><a><Image 
            src={Logo}
            width="160px"
            height="100%"
            className="cursor-pointer"
            alt="Logo of tooldb"
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
            "md:flex md:flex-grow items-center" +
            (navbarOpen ? " flex flex-wrap" : " hidden")
          }
        >
          <div className="md:mx-auto font-4 pt-1 lg:pl-14 pl-1 gap-6 md:gap-0 flex flex-wrap items-center md:text-base text-1xl md:justify-center justify-items-start">
            <a href="https://julianyaman.com" className="md:mr-5 lg:mr-11 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              Blog
            </a>
            <Link href="/donate">
              <a className="md:mr-5 lg:mr-11 ml-0 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
                Donate
              </a>
            </Link>
            <Link href="/partners">
              <a className="md:mr-5 lg:mr-11 ml-0 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
                Partners
              </a>
            </Link>
            <a target="_blank" rel="noreferrer" href="https://app.appsmith.com/app/submit-a-tool-to-tooldb/submittool-628dfd0f7901344ba8d28334" className="md:mr-5 cursor-pointer text-yellow-300 hover:text-white font-semibold tr04 ">
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
            href="https://twitter.com/tooldbdev"
            rel="noopener noreferrer"
            target="_blank"
            className="invisible md:visible mr-3 hover:text-white text-gray-300"
          >
            <SiTwitter size="1.5em"/>
          </a>
          <a
            data-v-54e46119=""
            href="https://github.com/julianyaman/tooldb"
            rel="noopener noreferrer"
            target="_blank"
            className="invisible md:visible mr-3"
          >
            <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/julianyaman/tooldb?style=social" />
          </a>
          { isLoading ? (<Spinner aria-label="Loading" size='xl' color="yellow" />) : (
          <Suspense fallback={<div className="text-center"><Spinner aria-label="Loading" size='xl' color="red" /></div>}>
          { supabaseCallUser ? (
            <Dropdown size="sm" color="blue" outline={!!supabaseCallUser}  label={supabaseCallUser.user_metadata.full_name ? 
            (<Avatar
              img={supabaseCallUser.user_metadata.avatar_url}
              rounded={true}
              size="xs"
            >
            </Avatar>) : <span>{supabaseCallUser.user_metadata.full_name || userData.username || supabaseCallUser.email}</span> }>
              <Dropdown.Header>
                <span className="block text-sm">
                  {supabaseCallUser.user_metadata.full_name || userData.username || supabaseCallUser.email }
                </span>
                <span className="block truncate text-xs font-medium">
                  {supabaseCallUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link href="/profile/settings">
                  <a className="block text-sm">Settings</a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {supabase.auth.signOut(); window.location.href = "/";}}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
            
          ) : (
          <Button
            size="md"
            onClick={() => {setShowLoginModal(true)}}
          >
            Sign In
          </Button>
          )}
          </Suspense>
          )}
        </div>
      </div>
    </header>
  );
}