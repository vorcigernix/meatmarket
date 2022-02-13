import Layout from "../components/layout";
import Head from "next/head";
import "../styles/globals.css";

function Marketplace({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<link rel='shortcut icon' href='/favicon.svg' />
				<title>You.nf: You are not fungible</title>
				<meta
					name='description'
					content='You.nf turns around the conversation about jobs and revolutionize the hiring market.'
				/>

				<meta property='og:url' content='https://www.younf.com/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='You.nf: You are non fungible' />
				<meta
					property='og:description'
					content='You.nf turns around the conversation about jobs and revolutionize the hiring market.'
				/>
				<meta property='og:image' content='https://younf.com/og.png' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='younf.com' />
				<meta property='twitter:url' content='https://www.younf.com/' />
				<meta name='twitter:title' content='You.nf: You are non fungible' />
				<meta
					name='twitter:description'
					content='You.nf turns around the conversation about jobs and revolutionize the hiring market.'
				/>
				<meta name='twitter:image' content='https://younf.com/og.png' />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default Marketplace;
