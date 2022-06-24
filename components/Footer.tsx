import Link from "next/link";


export default function Footer() {
    return (
      <footer className="pb-4 text-gray-200">
        <div className="max-w-5xl xl:max-w-5xl mx-auto divide-y divide-white px-4 sm:px-6 md:px-8">
          <ul className="text-sm font-medium sm:pb-20 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-10 space-y pb-5">
            <li className="space-y-5 row-span-2">
              <h2 className="text-2xl tracking-wide text-white">Contribute</h2>
              <ul className="space-y-4 text-md">
                <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="https://app.appsmith.com/app/submit-a-tool-to-tooldb/submittool-628dfd0f7901344ba8d28334"
                  >
                    <a target={"_blank"} rel="noreferrer" className="hover:text-white">Submit a tool</a>
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="https://github.com/julianYaman/tooldb"
                  >
                    <a target={"_blank"} rel="noreferrer" className="hover:text-white">GitHub</a>
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="https://github.com/julianYaman/tooldb/issues"
                  >
                    <a target={"_blank"} rel="noreferrer" className="hover:text-white">Report a bug</a>
                  </Link>
                </li>{" "}
              </ul>
            </li>
            <li className="space-y-5 row-span-2">
              <h2 className="text-2xl tracking-wide text-white">Social</h2>
              <ul className="space-y-4">
                <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="https://julianyaman.com"
                  >
                    <a target={"_blank"} rel="noreferrer" className="hover:text-white">Blog</a>
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="https://discord.gg/yAUmDNb"
                  >
                    <a target={"_blank"} rel="noreferrer" className="hover:text-white">Discord</a>
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="https://mobile.twitter.com/tooldbdev"
                  >
                    <a target={"_blank"} rel="noreferrer" className="hover:text-white">Twitter</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="space-y-5 row-span-2">
              <h2 className="text-2xl tracking-wide text-white">Project</h2>
              <ul className="space-y-4">
              <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="/"
                  >
                    <a className="hover:text-white">About</a>
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="https://github.com/julianyaman/tooldb"
                  >
                    <a className="hover:text-white">Contributors</a>
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition-colors duration-200 text-xl"
                    href="/donate"
                  >
                    <a className="hover:text-white">Donate & Sponsors</a>
                  </Link>
                </li>
                <li>
                  <Link href="/partners">
                    <a className="md:mr-5 lg:mr-11 ml-0 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
                      Partners
                    </a>
                  </Link>
                </li>
              </ul>
            </li>

          </ul>
          <div className="flex flex-col-reverse justify-between pt-5 pb-4 border-t lg:flex-row">
            <ul className="flex flex-col space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <li>
                <Link
                  href="https://wikipediabot.yaman.pro/legal"
                  className="text-md text-gray-200 hover:text-white transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                >
                  <a target={"_blank"} rel="noreferrer" className="hover:text-white">Legal</a>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.iubenda.com/privacy-policy/97555269"
                  className="text-md text-gray-200 hover:text-white transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                >
                  <a target={"_blank"} rel="noreferrer" className="hover:text-white">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.iubenda.com/privacy-policy/97555269/cookie-policy"
                  className="text-md text-gray-200 hover:text-white transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold"
                >
                  <a target={"_blank"} rel="noreferrer" className="hover:text-white">Cookie Policy</a>
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-3 sm:flex-row">
              <Link
                href="/"
                className="text-md text-gray-200 hover:text-white transition-colors duration-300 hover:text-deep-purple-accent-400 font-semibold tracking-tight"
              >
                © 2022 tooldb.
              </Link>
              <Link href="https://icons8.com">
                <a target={"_blank"} rel="noreferrer" className="hover:text-white">Icons from Icons8</a>
              </Link>
            </ul>
          </div>
        </div>
      </footer>
    );
  }