import addPolygonNetwork from "./injectPolygonMain";

const Footer = () => {
  return (
    <footer className="text-zinc-600 ">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          <div className="flex flex-col md:flex-row font-title font-bold items-center mb-4 md:mb-0">
            <img src="favicon.svg" alt="You.nf" className="w-28 h-28" />
            <div className="hidden md:flex md:flex-col md:ml-4">
              <span className="text-xl font-display dark:text-white ">
                You.nf
              </span>
              <hr className="border-1 border-zinc-200 dark:border-white w-16 m-1" />
              <span className="font-body text-sm">You are non-fungible</span>
            </div>
          </div>
        </div>
        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-sm">
            <h2 className="font-title font-bold text-zinc-900 dark:text-zinc-200 tracking-widest mb-4 text-base">
              Setup
            </h2>
            <nav className="list-none mb-10 text-zinc-600  hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white">
              <li className="pb-2">
                <a href="https://metamask.io/download.html">Install MetaMask</a>
              </li>
              <li className="pb-2">
                <button
                  onClick={() => addPolygonNetwork()}
                  className="text-left"
                >
                  Setup Polygon network
                </button>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-sm">
            <h2 className="font-title font-bold text-zinc-900 dark:text-zinc-200 tracking-widest mb-4 text-base">
              Our Policies
            </h2>
            <nav className="list-none mb-10 text-zinc-600  hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white">
              <li className="pb-2">
                <a href="tos.pdf">Terms of Use</a>
              </li>
              <li className="pb-2">
                <a href="privacy.pdf">Cookies</a>
              </li>
              <li className="pb-2">
                <a href="privacy.pdf">Privacy policy</a>
              </li>
              <li className="pb-2"></li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-sm">
            <h2 className="font-title font-bold text-zinc-900 dark:text-zinc-200 tracking-widest mb-4 text-base">
              Technology
            </h2>
            <nav className="list-none mb-10 text-zinc-600  hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white">
              <li className="pb-2">
                <a href="https://ethereum.org/en/">Ethereum</a>
              </li>
              <li className="pb-2">
                <a href="https://polygon.technology/">Polygon</a>
              </li>
              <li className="pb-2">
                <a href="https://vercel.com/">Vercel</a>
              </li>
              <li className="pb-2"></li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 text-sm">
            <h2 className="font-title font-bold text-zinc-900 dark:text-zinc-200 tracking-widest mb-4 text-base">
              Contacts
            </h2>
            <nav className="list-none mb-10 text-zinc-600  hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-white">
              <li className="pb-2">
                <a href="https://twitter.com/vorcigernix">Twitter</a>
              </li>
              <li className="pb-2">
                <a href="https://www.linkedin.com/in/adamsobotka">LinkedIn</a>
              </li>
              <li className="pb-2">
                <a href="mailto:marketing@younf.com">E-mail</a>
              </li>
              <li className="pb-2"></li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-zinc-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-zinc-500 text-sm text-center sm:text-left">
            © 2022 You.nf - All rights reserved.
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a
              className="ml-3 text-zinc-500"
              href="https://twitter.com/vorcigernix"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              className="ml-3 text-zinc-500"
              href="https://www.linkedin.com/in/adamsobotka"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
