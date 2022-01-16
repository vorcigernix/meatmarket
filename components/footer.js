import addPolygonNetwork from "./injectPolygon";

const Footer = () => {
	return (
		<footer className='text-zinc-600  text-sm'>
			<div className='container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col'>
				<div className='w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10'>
					<a className='flex title-font font-medium items-center md:justify-start justify-center text-zinc-900 dark:text-zinc-200'>
						<img src='favicon.svg' alt='Younf' className="h-16 w-16" />
						<span className='ml-3 text-xl'>Younf</span>
					</a>
					<p className='mt-2 text-sm text-zinc-500'>You are non fungible.</p>
				</div>
				<div className='flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first'>
					<div className='lg:w-1/4 md:w-1/2 w-full px-4'>
						<h2 className='title-font font-medium text-zinc-900 dark:text-zinc-200 tracking-widest text-sm mb-3'>
							Setup
						</h2>
						<nav className='list-none mb-10'>
							<li>
								<a
									href='https://metamask.io/download.html'
									className='text-zinc-600 hover:text-zinc-800'>
									Install MetaMask
								</a>
							</li>
							<li>
								<button
									onClick={() => addPolygonNetwork()}
									className='text-zinc-600 hover:text-zinc-800 text-left'>
									Add Polygon network to MetaMask
								</button>
							</li>
						</nav>
					</div>
					<div className='lg:w-1/4 md:w-1/2 w-full px-4'>
						<h2 className='title-font font-medium text-zinc-900 dark:text-zinc-200 tracking-widest text-sm mb-3'>
							Our Policies
						</h2>
						<nav className='list-none mb-10'>
							<li>
								<a href='tos.pdf' className='text-zinc-600 hover:text-zinc-800'>
									Terms of Use
								</a>
							</li>
							<li>
								<a
									href='privacy.pdf'
									className='text-zinc-600 hover:text-zinc-800'>
									Cookies
								</a>
							</li>
							<li>
								<a
									href='privacy.pdf'
									className='text-zinc-600 hover:text-zinc-800'>
									Privacy policy
								</a>
							</li>
							<li></li>
						</nav>
					</div>
					<div className='lg:w-1/4 md:w-1/2 w-full px-4'>
						<h2 className='title-font font-medium text-zinc-900 dark:text-zinc-200 tracking-widest text-sm mb-3'>
							Technology
						</h2>
						<nav className='list-none mb-10'>
							<li>
								<a
									href='https://ethereum.org/en/'
									className='text-zinc-600 hover:text-zinc-800'>
									Ethereum
								</a>
							</li>
							<li>
								<a
									href='https://polygon.technology/'
									className='text-zinc-600 hover:text-zinc-800'>
									Polygon
								</a>
							</li>
							<li>
								<a
									href='https://vercel.com/'
									className='text-zinc-600 hover:text-zinc-800'>
									Vercel
								</a>
							</li>
							<li></li>
						</nav>
					</div>
					<div className='lg:w-1/4 md:w-1/2 w-full px-4'>
						<h2 className='title-font font-medium text-zinc-900 dark:text-zinc-200 tracking-widest text-sm mb-3'>
							Contacts
						</h2>
						<nav className='list-none mb-10'>
							<li>
								<a
									href='https://twitter.com/vorcigernix'
									className='text-zinc-600 hover:text-zinc-800'>
									Twitter
								</a>
							</li>
							<li>
								<a
									href='https://www.linkedin.com/in/adamsobotka'
									className='text-zinc-600 hover:text-zinc-800'>
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href='mailto:marketing@younf.com'
									className='text-zinc-600 hover:text-zinc-800'>
									E-mail
								</a>
							</li>
							<li></li>
						</nav>
					</div>
				</div>
			</div>
			<div className='bg-zinc-100'>
				<div className='container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row'>
					<p className='text-zinc-500 text-sm text-center sm:text-left'>
						© 2022 Younf - All rights reserved.
					</p>
					<span className='inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start'>
						<a
							className='ml-3 text-zinc-500'
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
							className='ml-3 text-zinc-500'
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
