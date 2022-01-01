require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString().trim();
const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 1337,
		},
		mumbai: {
			// Infura
			//url: `https://polygon-mumbai.infura.io/v3/f0671e059fde4ab1a541db0a8ea9aa1d`,
			url: `https://polygon-mumbai.g.alchemy.com/v2/elWZjOPfS0H03lYqe4-fSCu7LM4i7HUD`,
			accounts: [privateKey],
		},
		matic: {
			// Infura
			url: `https://polygon-mainnet.infura.io/v3/f0671e059fde4ab1a541db0a8ea9aa1d`,
			//url: "https://rpc-mainnet.maticvigil.com",
			accounts: [privateKey],
		},
		ropsten: {
			// Infura
			url: `https://ropsten.infura.io/v3/f0671e059fde4ab1a541db0a8ea9aa1d`,
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
