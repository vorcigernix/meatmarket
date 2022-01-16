import Link from "next/link";
const Nav = () => {
  return (
    <header className="text-zinc-600 dark:text-zinc-400 ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" passHref>
          <a className="flex title-font font-medium items-center  mb-4 md:mb-0">
            <img src="favicon.svg" alt="Younf" className="w-28 h-28" />
            <span className="ml-3 dark:text-white text-4xl">Younf</span>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link href="/profiles" passHref>
            <a className="mr-5 hover:text-gray-400">Profiles</a>
          </Link>
          <Link href="/create-item" passHref>
            <a className="mr-5 hover:text-gray-400">Create Profile</a>
          </Link>
          <Link href="/my-assets" passHref>
            <a className="mr-5 hover:text-gray-400">My Contacts</a>
          </Link>
          <Link href="/creator-dashboard" passHref>
            <a className="mr-5 hover:text-gray-400">Dashboard</a>
          </Link>
          <Link href="/about" passHref>
            <a className="mr-5 hover:text-gray-400">How to</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
