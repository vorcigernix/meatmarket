import Layout from '../components/layout'
import "../styles/globals.css";

function Marketplace({ Component, pageProps }) {
	return (
		<Layout>
			
			<Component {...pageProps} />
		
		</Layout>
	);
}

export default Marketplace;
