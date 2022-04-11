import Layout from "../components/layout";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { GTM_ID, pageview } from "../components/gtm";
import {useEffect} from 'react';

function Marketplace({ Component, pageProps }) {
	const router = useRouter();
	useEffect(() => {
		router.events.on("routeChangeComplete", pageview);
		return () => {
			router.events.off("routeChangeComplete", pageview);
		};
	}, [router.events]);
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
				<meta property='og:image' content='https://younf.com/ogyounf.png' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content='younf.com' />
				<meta property='twitter:url' content='https://www.younf.com/' />
				<meta name='twitter:title' content='You.nf: You are non fungible' />
				<meta
					name='twitter:description'
					content='You.nf turns around the conversation about jobs and revolutionize the hiring market.'
				/>
				<meta name='twitter:image' content='https://younf.com/ogyounf.png' />
			</Head>
			<Script
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
				}}
			/>
			<Component {...pageProps} />
		</Layout>
	);
}

export default Marketplace;
