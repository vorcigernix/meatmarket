import Link from "next/link";
const Nav = () => {
  return (
    <header className="text-zinc-600 dark:text-zinc-400">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" passHref>
          <a className="flex font-title font-medium items-center  mb-4 md:mb-0">
            <img src="favicon.svg" alt="Younf" className="w-28 h-28" />
            <div className="flex flex-col ml-4">
              <span className="text-4xl font-display dark:text-white ">Younf</span>
              <hr className="border-2 border-pink-500 w-16"/>
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
          <Link href="/my-assets" passHref>
            <a className="mr-5 hover:text-pink-400">My Contacts</a>
          </Link>
          <Link href="/creator-dashboard" passHref>
            <a className="mr-5 hover:text-pink-400">Dashboard</a>
          </Link>
          <Link href="/about" passHref>
            <a className="mr-5 hover:text-pink-400">How to</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
