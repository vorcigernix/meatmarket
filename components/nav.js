import Link from "next/link";
const Nav = () => {
	return (
		<header className='text-gray-600 body-font'>
			<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
				<Link href='/' passHref>
					<a className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='w-10 h-10 text-white p-2 bg-gradient-to-l from-pink-500  via-purple-500 to-pink-500 background-animate rounded-full'
							viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
							/>
						</svg>
						<span className='ml-3 text-xl'>Younf</span>
					</a>
				</Link>
				<nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
					<Link href='/create-item' passHref>
						<a className='mr-5 hover:text-gray-900'>Create Profile</a>
					</Link>
					<Link href='/my-assets' passHref>
						<a className='mr-5 hover:text-gray-900'>My Contacts</a>
					</Link>
					<Link href='/creator-dashboard' passHref>
						<a className='mr-5 hover:text-gray-900'>Dashboard</a>
					</Link>
                    <Link href='/about' passHref>
						<a className='mr-5 hover:text-gray-900'>About</a>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Nav;
