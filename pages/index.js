import Link from "next/link";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import addPolygonNetwork from "/components/injectPolygon";

export default function Page() {
  const [provider, setProvider] = useState(null);
  const checkProvider = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const chainId = await provider.request({
        method: "eth_chainId",
      });
      setProvider(chainId);
      console.log(chainId);
    } else {
      console.error("No wallet provider detected");
      setProvider(false);
    }
  };
  useEffect(() => {
    checkProvider();
  }, []);
  return (
    <>
      <section className="text-gray-600 dark:text-gray-300 ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="font-title sm:text-4xl text-3xl mb-4 font-medium dark:text-white">
              Hiring market&nbsp;
              <br className="hidden lg:inline-block" />
              is wrong
            </h1>
            <p className="mb-8 leading-relaxed ">
              <b className=" text-pink-400">You are non-fungible</b>. Way we
              discuss job opportunities is based on centuries old model. It was
              build in times of factory workers begging for a barely paid job. A
              human resources departments were created on the idea of handling
              humans as a&nbsp;
              <b className=" dark:text-white">resources</b>.
            </p>

            {!provider ? (
              <>
                <div className="flex justify-center">
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-sans ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Install Wallet
                    </button>
                  </a>
                </div>
                <p className="mt-4 leading-relaxed flex">
                  You do not have installed wallet. To use this application, you
                  need to have a wallet installed and configured.
                </p>
                <p className="my-8 leading-relaxed">
                  Wallet is a browser extension that allows you to interact with
                  a programs called &quot;smart contracts &quot;. One type of
                  the smart contract is an NFT token and this application is
                  based on the use of NFT tokens as a contact information.
                </p>
              </>
            ) : provider === "0x13881" ? (
              <>
                <Link href="/create-item" passHref>
                  <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-sans ">
                    Create Profile
                  </button>
                </Link>
                <p className="mt-4 leading-relaxed flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  You are on the right network and your wallet is configured.
                </p>
                <p className="my-8 leading-relaxed">
                  So how does this work? We elevate the conversation between the
                  companies and a senior specialists. Specialized knowledge
                  workers usually have a very good jobs and they typically not
                  respond to the offers. On Younf the specialists create an NFT
                  &quot;business card&quot; and any company can buy it in order
                  to get a direct contact information. For specialists, there is
                  a fee covering the time they spent discussing the job offer.
                  For companies, there is a market of higly specialized
                  knowledge workers.
                </p>
              </>
            ) : (
              <>
                <button
                  className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-sans"
                  onClick={() => addPolygonNetwork()}
                >
                  Configure Network
                </button>
                <p className="mt-4 leading-relaxed flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  You have a wallet, but it is not set on Polygon network. Click
                  on botton above or &nbsp;
                  <a
                    href="https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    configure network manually
                  </a>
                  .
                </p>
                <p className="my-8 leading-relaxed">
                  So how does this work? We elevate the conversation between the
                  companies and a senior specialists. Specialized knowledge
                  workers usually have a very good jobs and they typically not
                  respond to the offers. On Younf the specialists create an NFT
                  &quot;business card&quot; and any company can buy it in order
                  to get a direct contact information. For specialists, there is
                  a fee covering the time they spent discussing the job offer.
                  For companies, there is a market of higly specialized
                  knowledge workers.
                </p>
              </>
            )}
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 shadow-lg shadow-pink-500/50">
            <picture>
              <source srcSet="/images/1.avif" type="image/avif" />
              <img
                className="object-cover object-center rounded"
                decoding="async"
                loading="lazy"
                src="/images/1.jpg"
                alt="hero image"
              />
            </picture>
          </div>
        </div>
      </section>
      <section className="text-gray-600 dark:text-gray-300 ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10 shadow-lg shadow-pink-500/50">
            <picture>
              <source srcSet="/images/3.avif" type="image/avif" />
              <img
                className="object-cover object-center rounded"
                decoding="async"
                loading="lazy"
                src="/images/3.jpg"
                alt="hero image"
              />
            </picture>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="font-title sm:text-4xl text-3xl mb-4 font-medium dark:text-white">
              Changing the game&nbsp;
              <br className="hidden lg:inline-block" />
              for the knowledge workers
            </h1>
            <p className="mb-8 leading-relaxed">
              We are software developers ourselves. We know how bad is a
              <b className=" text-pink-400"> conversation</b> you usually have
              with recruiters. It is not their fault, the system is obsolete. We
              are here to change it.
            </p>
            <div className="flex justify-center">
              <Link href="/create-item" passHref>
                <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-sans">
                  Create profile
                </button>
              </Link>
            </div>
            <p className="my-8 leading-relaxed">
              When company buys NFT card with your profile, it presents an
              upfront investment - this alone turns the conversation around. It
              covers the expense of the time you spend discussing the offer and
              it incentivize the recriters to prepare better for the
              conversation.
            </p>
          </div>
        </div>
      </section>
      <section className="text-gray-600 dark:text-gray-300 ">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="font-title sm:text-4xl text-3xl mb-4 font-medium dark:text-white">
              Changing the conversation&nbsp;
              <br className="hidden lg:inline-block" />
              for recruiters
            </h1>
            <p className="mb-8 leading-relaxed">
              Yes, we ask you to pay for the information that you can possibly
              find &quot;for free&quot;. There are{" "}
              <b className=" text-pink-400"> two reasons</b> why this make sense
              for you. <b className="dark:text-white">First</b>, we have some
              unique profiles. Some people would not create a LinkedIn/other
              portal profile. They have a good job and have zero intent to do
              so. The way they are changing the position is usually by a normal
              human conversation with someone from a different company. If you
              are a good recruiter, you actually have experience with this from
              several meetups, conferences and other similar events.
            </p>
            <div className="flex justify-center">
              <Link href="/profiles" passHref>
                <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded font-sans">
                  Show profiles
                </button>
              </Link>
            </div>
            <p className="my-8 leading-relaxed">
              <b className=" dark:text-white">Second</b>, even if you find
              someone on LinkedIn, you have to pay for that. The concept of a
              job portal is built to provide a quantity. You probably know how
              much you actually pay for a good candidate and yet, the person on
              other end may have very{" "}
              <b className=" text-pink-400"> limited motivation </b>
              in continuing discussion. Actually, more experienced people are,
              less motivated they are to change the job.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 shadow-lg shadow-pink-500/50">
            <picture>
              <source srcSet="/images/5.avif" type="image/avif" />
              <img
                className="object-cover object-center rounded"
                decoding="async"
                loading="lazy"
                src="/images/5.jpg"
                alt="hero image"
              />
            </picture>
          </div>
        </div>
      </section>
    </>
  );
}
