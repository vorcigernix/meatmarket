import Link from "next/link";
const Nav = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" passHref>
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src="favicon2.svg" alt="Younf" className="w-28 h-28" />
            <span className="ml-3 text-xl">Younf</span>
          </a>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/create-item" passHref>
            <a className="mr-5 hover:text-gray-900">Create Profile</a>
          </Link>
          <Link href="/my-assets" passHref>
            <a className="mr-5 hover:text-gray-900">My Contacts</a>
          </Link>
          <Link href="/creator-dashboard" passHref>
            <a className="mr-5 hover:text-gray-900">Dashboard</a>
          </Link>
          <Link href="/about" passHref>
            <a className="mr-5 hover:text-gray-900">About</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
