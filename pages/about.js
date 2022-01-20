export default function About() {
	return (
		<>
			<section className='text-gray-600 dark:text-gray-300' id="FAQ">
				<div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
					<div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
						<h1 className='font-title sm:text-4xl text-3xl mb-4 font-medium dark:text-white'>
							FAQs
						</h1>
						<p className='mb-8 leading-relaxed text-base'>
							Answers to frequently asked questions.
						</p>
						<p className='mb-8 leading-relaxed'>
							<b className=" text-pink-400">
								I don&apos;t know anything about Blockchain or NFTs. How do I start?
							</b>
							<br />
							So, if you are a company, you should start by contacting a
							profesional in the area. Not because the technology is terribly
							difficult, but because you may need to understand all facets of
							the problem before you start. Your company accounting, legal and
							security needs to be informed and they need to talk with someone
							who will be able to explain the ssytem in a great detail. <br />
							For individuals, you can start by watching{" "}
							<a
								href='https://www.youtube.com/watch?v=YVgfHZMFFFQ'
								target='_blank'
								rel='noreferrer'
								className=' underline'>
								Metamask video introduction
							</a>{" "}
							and installing the Metamask. Link to download Metamask is in a
							footer of the page. We also provide autoconfiguration link to set
							up the Polygon network on Metamask. In a nutshell, you click on
							two links and you are done.
						</p>

						<p className='mb-8 leading-relaxed' id='faq'>
							<b className=" text-pink-400">So all the data I share are written to the blockchain?</b>
							<br />
							Correct. You can think of our application as a easy tool to mint
							your personal data NFTs. The data is stored in the blockchain and
							is not stored on our servers. This also means that we can&apos;t edit
							the data in future (which is both good and bad).
						</p>
						<p className='mb-8 leading-relaxed'>
							<b className=" text-pink-400">There will be a lot of fake accounts right?</b> <br />
							Actually, no, not in a huge number. You have to create a card one
							by one, which is still hard to automate and the security is bound
							to a wallet. Also, we deny &apos;login&apos; to anyone who posted the fake
							before, so it is in fact way easier to create a fake profile on
							any job portal.
						</p>
					</div>
					<div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 shadow-lg shadow-pink-500/50'>
						<img
							className='object-cover object-center rounded'
							alt='hero'
							src='https://source.unsplash.com/random/720x600/?question'
						/>
					</div>
				</div>
			</section>
		</>
	);
}
