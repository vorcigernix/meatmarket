import Layout from "../components/layout";
import Head from "next/head";
import "../styles/globals.css";

function Marketplace({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<link rel='shortcut icon' href='/favicon.svg' />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default Marketplace;
