export default async function addPolygonNetwork() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x89",
              chainName: "Matic(Polygon) Mainnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: ["https://polygon-rpc.com"],
              blockExplorerUrls: ["https://www.polygonscan.com"],
              iconUrls: [
                "https://polygon.technology/media-kit/matic-token-icon.svg",
              ],
            },
          ],
        });
      } catch (addError) {
        console.log("Did not add network");
      }
    }
  }
}
