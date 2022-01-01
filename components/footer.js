import addPolygonNetwork from "./injectPolygon";

const Footer = () => {
	return (
		<footer className='text-gray-600 body-font text-sm'>
			<div className='container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col'>
				<div className='w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10'>
					<a className='flex title-font font-medium items-center md:justify-start justify-center text-gray-900'>
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
					<p className='mt-2 text-sm text-gray-500'>You are non fungible.</p>
				</div>
				<div className='flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first'>
					<div className='lg:w-1/4 md:w-1/2 w-full px-4'>
						<h2 className='title-font font-medium text-gray-900 tracking-widest text-sm mb-3'>
							Setup
						</h2>
						<nav className='list-none mb-10'>
							<li>
								<a
									href='https://metamask.io/download.html'
									className='text-gray-600 hover:text-gray-800'>
									Install MetaMask
								</a>
							</li>
							<li>
								<button
									onClick={() => addPolygonNetwork()}
									className='text-gray-600 hover:text-gray-800 text-left'>
									Add Polygon network to MetaMask
								</button>
							</li>
						</nav>
					</div>
					<div className='lg:w-1/4 md:w-1/2 w-full px-4'>
						<h2 className='title-font font-medium text-gray-900 tracking-widest text-sm mb-3'>
							Our Policies
						</h2>
						<nav className='list-none mb-10'>
							<li>
								<a href='tos.pdf' className='text-gray-600 hover:text-gray-800'>
									Terms of Use
								</a>
							</li>
							<li>
								<a
									href='privacy.pdf'
									className='text-gray-600 hover:text-gray-800'>
									Cookies
								</a>
							</li>
							<li>
								<a
									href='privacy.pdf'
									className='text-gray-600 hover:text-gray-800'>
									Privacy policy
								</a>
							</li>
							<li></li>
						</nav>
					</div>
					<div className='lg:w-1/4 md:w-1/2 w-full px-4'>
						<h2 className='title-font font-medium text-gray-900 tracking-widest text-sm mb-3'>
							Technology
						</h2>
						<nav className='list-none mb-10'>
							<li>
								<a
									href='https://ethereum.org/en/'
									className='text-gray-600 hover:text-gray-800'>
									Ethereum
								</a>
							</li>
							<li>
								<a
									href='https://polygon.technology/'
									className='text-gray-600 hover:text-gray-800'>
									Polygon
								</a>
							</li>
							<li>
								<a
									href='https://vercel.com/'
									className='text-gray-600 hover:text-gray-800'>
									Vercel
								</a>
							</li>
							<li></li>
						</nav>
					</div>
					<div className='lg:w-1/4 md:w-1/2 w-full px-4'>
						<h2 className='title-font font-medium text-gray-900 tracking-widest text-sm mb-3'>
							Contacts
						</h2>
						<nav className='list-none mb-10'>
							<li>
								<a
									href='https://twitter.com/vorcigernix'
									className='text-gray-600 hover:text-gray-800'>
									Twitter
								</a>
							</li>
							<li>
								<a
									href='https://www.linkedin.com/in/adamsobotka'
									className='text-gray-600 hover:text-gray-800'>
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href='mailto:marketing@younf.com'
									className='text-gray-600 hover:text-gray-800'>
									E-mail
								</a>
							</li>
							<li></li>
						</nav>
					</div>
				</div>
			</div>
			<div className='bg-gray-100'>
				<div className='container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row'>
					<p className='text-gray-500 text-sm text-center sm:text-left'>
						© 2022 Younf - All rights reserved.
					</p>
					<span className='inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start'>
						<a
							className='ml-3 text-gray-500'
							href='https://twitter.com/vorcigernix'
							rel='noopener noreferrer'>
							<svg
								fill='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								className='w-5 h-5'
								viewBox='0 0 24 24'>
								<path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
							</svg>
						</a>
						<a
							className='ml-3 text-gray-500'
							href='https://www.linkedin.com/in/adamsobotka'
							rel='noopener noreferrer'>
							<svg
								fill='currentColor'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='0'
								className='w-5 h-5'
								viewBox='0 0 24 24'>
								<path
									stroke='none'
									d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'></path>
								<circle cx='4' cy='4' r='2' stroke='none'></circle>
							</svg>
						</a>
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
