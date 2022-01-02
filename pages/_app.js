import Layout from "../components/layout";
import Head from "next/head";
import "../styles/globals.css";

function Marketplace({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<link rel='shortcut icon' href='/favicon.svg' />
				<title>Younf: You are non fungible</title>
				<meta
					name='description'
					content='Younf turns around the conversation about jobs and revolutionize the hiring market.'
				/>

				<meta property='og:url' content='https://www.younf.com/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Younf: You are non fungible' />
				<meta
					property='og:description'
					content='Younf turns around the conversation about jobs and revolutionize the hiring market.'
				/>
				<meta property='og:image' content='https://younf.com/og.jpg' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='younf.com' />
				<meta property='twitter:url' content='https://www.younf.com/' />
				<meta name='twitter:title' content='Younf: You are non fungible' />
				<meta
					name='twitter:description'
					content='Younf turns around the conversation about jobs and revolutionize the hiring market.'
				/>
				<meta name='twitter:image' content='https://younf.com/og.jpg' />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default Marketplace;
