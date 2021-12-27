import Nav from "../components/nav";
import "../styles/globals.css";

function Marketplace({ Component, pageProps }) {
	return (
		<div>
			<Nav />
			<Component {...pageProps} />
		</div>
	);
}

export default Marketplace;
