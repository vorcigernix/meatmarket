require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = process.env.privateKey || fs.readFileSync(".secret").toString().trim();
const infuraId = process.env.infuraId || fs.readFileSync(".infuraid").toString().trim();

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
		},
		mumbai: {
			// Infura
			//url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
			url: `https://polygon-mumbai.g.alchemy.com/v2/${infuraId}`,
			accounts: [privateKey],
		},
		matic: {
			// Infura
			url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
			//url: "https://rpc-mainnet.maticvigil.com",
			accounts: [privateKey],
		},
		ropsten: {
			// Infura
			url: `https://ropsten.infura.io/v3/${infuraId}`,
			accounts: [privateKey],
		},
	},
	solidity: {
		version: "0.8.4",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
