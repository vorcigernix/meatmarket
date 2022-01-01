import Link from "next/link";
export default function About() {
	return (
		<>
			<section className='text-gray-600 body-font text-sm'>
				<div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
					<div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
						<h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
							Hiring market&nbsp;
							<br className='lg:hidden' />
							is wrong.
						</h1>
						<p className='mb-8 leading-relaxed text-base'>
							<b>You are non-fungible</b>. Way we discuss about job
							opportunities is based on centuries old model. It was build in
							times of factory workers begging for a barely paid job. A human
							resources department were created on the idea of handling humans
							as a <b>resources</b>.
						</p>
						<div className='container mx-auto flex px-5 py-12 items-center justify-center flex-col'>
							<div className='text-center lg:w-2/3 w-full'>
								<h1 className='title-font text-2xl  mb-4 font-medium text-gray-900'>
									This no longer works for
								</h1>
								<div className='flex justify-center'>
									<a href='#you'>
										<button className='inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-500 rounded text-lg'>
											You
										</button>
									</a>
									<span className='justify-center w-8 text-3xl'>+</span>
									<a href='#companies'>
										<button className='ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg'>
											Companies
										</button>
									</a>
								</div>
							</div>
						</div>
						<p className='mb-8 leading-relaxed' id='you'>
							This may sound unfair and far from your current experience.
							Companies understood that scarce resources needs a different
							approach and the experience of knowledge workers today does not
							resemble the factories at all. But when you discuss your next,
							ghosts from past appears. You get your mailbox and LinkedIn full
							of irrelevant offers, than you go through the rounds of interviews
							that does not resemble a <b>conversation of adults</b>. After all
							of that, you end in the discussion you should have on the
							beginning - what the job is about and if you fit into the team.
						</p>
						<p className='mb-8 leading-relaxed'>
							Our <b>solution</b> is to turn the whole process around. Talent
							sourcing companies and company HRs find your contact based on
							skills and locality. They see the public part of the profile:
							picture, name and skills. Then, if they are interested, they buy
							your contact card that reveals your email and phone number. For
							the price of the token, company now own your contact and can start
							the conversation. Token price filters out most of irrelevant
							offers and in worst case it covers the cost of time you invest in
							further discussion.
						</p>
						<div className='flex justify-center'>
							<Link href='/create-item'>
								<button className='inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-500 rounded text-lg'>
									Create profile
								</button>
							</Link>
						</div>
					</div>
					<div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 shadow-lg shadow-purple-500/50'>
						<img
							className='object-cover object-center rounded'
							alt='hero'
							src='https://source.unsplash.com/random/720x600/?people'
						/>
					</div>
				</div>
			</section>
			<section className='text-gray-600 body-font text-sm'>
				<div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
					<div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 shadow-lg shadow-purple-500/50'>
						<img
							className='object-cover object-center rounded'
							alt='hero'
							src='https://source.unsplash.com/random/720x600/?company'
						/>
					</div>
					<div
						className='lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'
						id='companies'>
						<h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
							Let's&nbsp;
							<br className='lg:hidden' />
							fix it.
						</h1>
						<p className='mb-8 leading-relaxed text-base'>
							Logical question would be: why would companies buy the contact
							tokens? There is a LinkedIn and huge amount of job portals.
						</p>
						<p className='mb-8 leading-relaxed'>
							First of all, our portal is not a silver bullet. Companies
							probably should continue to use the same job portals as they do
							now. Problem we are solving for companies is that most of
							experienced professionals have a good job already and they mostly
							don't spend their time to look at job market. The way they change
							companies is mostly friend referrals, direct conversations on the
							events and sometimes they can be convinced by a very good
							headhunters. Generally, more <b>human interactions</b> than job
							portals.
						</p>
						<div className='flex justify-center'>
							<Link href='/'>
								<button className='inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-500 rounded text-lg'>
									Back to profiles
								</button>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className='text-gray-600 body-font text-sm'>
				<div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
					<div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
						<h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
							FAQs
						</h1>
						<p className='mb-8 leading-relaxed text-base'>
							Answers to frequently asked questions.
						</p>
						<p className='mb-8 leading-relaxed'>
							<b>
								I don't know anything about Blockchain or NFTs. How do I start?
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
								className=' underline'>
								Metamask video introduction
							</a>{" "}
							and installing the Metamask. Link to download Metamask is in a
							footer of the page. We also provide autoconfiguration link to set
							up the Polygon network on Metamask. In a nutshell, you click on
							two links and you are done.
						</p>

						<p className='mb-8 leading-relaxed' id='faq'>
							<b>So all the data I share are written to the blockchain?</b>
							<br />
							Correct. You can think of our application as a easy tool to mint
							your personal data NFTs. The data is stored in the blockchain and
							is not stored on our servers. This also means that we can't edit
							the data in future (which is both good and bad).
						</p>
						<p className='mb-8 leading-relaxed'>
							<b>There will be a lot of fake accounts right?</b> <br />
							Actually, no, not in a huge number. You have to create a card one
							by one, which is still hard to automate and the security is bound
							to a wallet. Also, we deny "login" to anyone who posted the fake
							before, so it is in fact way easier to create a fake profile on
							any job portal.
						</p>
					</div>
					<div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 shadow-lg shadow-purple-500/50'>
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
