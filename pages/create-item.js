import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { useDropzone } from "react-dropzone";
import Link from "next/link";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

export default function CreateItem() {
	const [fileUrl, setFileUrl] = useState(null);
	const [location, setLocation] = useState(null);
	const [formInput, updateFormInput] = useState({
		price: "",
		name: "",
		description: "",
		skills: "",
		github: "",
		email: "",
		mobile: "",
		linked: "",
	});
	const [loadingState, setLoadingState] = useState(false);
	const router = useRouter();
	useEffect(() => {
		async function loadLocation(url) {
			const _response = await fetch(url);
			_response = await _response.json();
			//console.log(_response);
			const { features } = _response;
			//console.log(features[0].text);
			setLocation(features[0].text);
		}
		if (!navigator.geolocation) {
			console.log("Geolocation is not supported by your browser");
		} else {
			navigator.geolocation.getCurrentPosition((position) => {
				loadLocation(
					`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?types=country&access_token=pk.eyJ1Ijoidm9yY2lnZXJuaXgiLCJhIjoiY2t4a2NjOGNuMTBwcTJ4cGVpaHFtam13eiJ9.LSf7p8o4R61WKWDJ_OQ9cg`
				);
			});
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		onDrop: async (acceptedFiles) => {
			//console.log(URL.createObjectURL(acceptedFiles[0]));
			//const file = URL.createObjectURL(acceptedFiles[0]);
			console.log(acceptedFiles[0]);
			const file = acceptedFiles[0];
			const reader = new FileReader();

			reader.onabort = () => console.log("file reading was aborted");
			reader.onerror = () => console.log("file reading has failed");
			reader.onload = async () => {
				// Do whatever you want with the file contents
				const binaryStr = reader.result;
				console.log(binaryStr);
				try {
					const added = await client.add(binaryStr, {
						progress: (prog) => console.log(`received: ${prog}`),
					});
					const url = `https://ipfs.infura.io/ipfs/${added.path}`;
					setFileUrl(url);
					console.log(url);
				} catch (error) {
					console.log("Error uploading file: ", error);
				}
			};
			reader.readAsArrayBuffer(file);
		},
	});

	async function createMarket() {
		const { name, description, price, skills, github, email, mobile, linked } =
			formInput;
		if (!name || !description || !price || !fileUrl) return;
		/* first, upload to IPFS */
		const data = JSON.stringify({
			name,
			description,
			image: fileUrl,
			skills,
			github,
			email,
			mobile,
			linked,
			location,
		});
		try {
			const added = await client.add(data);
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			/* after file is uploaded to IPFS, pass the URL to save it on Polygon */
			createSale(url);
		} catch (error) {
			console.log("Error uploading file: ", error);
		}
	}

	async function createSale(url) {
		setLoadingState(true);
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		/* next, create the item */
		let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
		let transaction = await contract.createToken(url);
		let tx = await transaction.wait();
		let event = tx.events[0];
		console.log(event);
		let value = event.args[2];
		let tokenId = value.toNumber();

		const price = ethers.utils.parseUnits(formInput.price, "ether");

		/* then list the item for sale on the marketplace */
		contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();

		transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
			value: listingPrice,
		});
		await transaction.wait();
		setLoadingState(false);
		router.push("/");
	}

	if (loadingState) {
		return (
			<section className='text-gray-600 body-font'>
				<div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
					<div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
						<h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
							Before you wink
							<br className='inline-block' />
							your card will be ready
						</h1>
						<p className='mb-8 leading-relaxed'>
							Now we ask for a confirmations from you. First is a "sign" that
							works the same way as a signature on a paper. Second is actual
							creation of a card on blockchain. After the transactions are
							confirmed, we will redirect you to the main page automatically.
						</p>
						<div className='flex md:mt-4 mt-6'>
							<Link href='/about'>
								<a className='text-purple-500 inline-flex items-center'>
									Lost?
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-4 h-4 ml-2'
										viewBox='0 0 24 24'>
										<path d='M5 12h14M12 5l7 7-7 7'></path>
									</svg>
								</a>
							</Link>
						</div>
					</div>
					<div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
						<img
							className='object-cover object-center rounded'
							alt='hero'
							src='contract.svg'
						/>
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto flex flex-wrap'>
					<h2 className='sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5'>
						Create Younf Profile
					</h2>
					<div className='md:w-3/5 md:pl-6'>
						<p className='leading-relaxed text-base'>
							Younf profile is like free business card in NFT token. You put the
							card to the marketplace and whoever buys the card get a direct
							contact information. You get 95% of the price you set on the card
							by setting your level.
						</p>
						<div className='flex md:mt-4 mt-6'>
							<Link href='/about'>
								<a className='text-purple-500 inline-flex items-center'>
									Wait, but why
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-4 h-4 ml-2'
										viewBox='0 0 24 24'>
										<path d='M5 12h14M12 5l7 7-7 7'></path>
									</svg>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<section className='max-w-md mx-auto bg-white rounded-xl shadow-lg shadow-purple-500/50 overflow-hidden md:max-w-4xl '>
				<div className='md:flex'>
					<div className='md:shrink-0'>
						{fileUrl && (
							<img
								className='h-48 w-full object-cover md:h-full md:w-72'
								src={fileUrl}
							/>
						)}
						{!fileUrl && (
							<div
								{...getRootProps({
									className:
										"h-48 md:h-full md:w-72 bg-gradient-to-tl from-purple-500 to-pink-200 justify-center items-center text-center p-8 text-xs flex flex-col text-white",
								})}>
								<input {...getInputProps()} />
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-10 w-10'
									viewBox='0 0 20 20'
									fill='white'>
									<path
										fillRule='evenodd'
										d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
										clipRule='evenodd'
									/>
								</svg>
								<p className='pt-4'>
									Drop your profile picture here, or click to browse.
								</p>
								<span className='p-4 flex '>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 mr-2'
										viewBox='0 0 20 20'
										fill='currentColor'>
										<path
											fillRule='evenodd'
											d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
											clipRule='evenodd'
										/>
									</svg>
									{location}
								</span>
							</div>
						)}
					</div>

					<div className='p-8 text-base md:text-sm'>
						{!location && (
							<div className=' bg-gradient-to-tl from-pink-700 text-center to-pink-400 text-white rounded-3xl m-4 p-4'>
								We ask for your location to store country level information
								only.
							</div>
						)}
						<input
							required
							placeholder='Full Name'
							className='w-full mt-2 border rounded p-4'
							onChange={(e) =>
								updateFormInput({ ...formInput, name: e.target.value })
							}
						/>
						<textarea
							required
							placeholder='About me'
							className='w-full mt-2 border rounded p-4'
							onChange={(e) =>
								updateFormInput({ ...formInput, description: e.target.value })
							}
						/>
						<input
							required
							placeholder='Skills (separated by commas)'
							className='w-full border rounded p-2'
							onChange={(e) =>
								updateFormInput({ ...formInput, skills: e.target.value })
							}
						/>
						<div className='flex flex-col md:flex-row'>
							<input
								required
								placeholder='E-mail'
								className='w-full mt-4 mr-2 border rounded p-2'
								onChange={(e) =>
									updateFormInput({ ...formInput, email: e.target.value })
								}
							/>
							<input
								required
								placeholder='Mobile'
								className='w-full mt-4 border rounded p-2'
								onChange={(e) =>
									updateFormInput({ ...formInput, mobile: e.target.value })
								}
							/>
						</div>
						<div className='flex flex-col md:flex-row'>
							<input
								placeholder='Github Name'
								className='w-full mt-2 mr-2 border rounded p-2'
								onChange={(e) =>
									updateFormInput({ ...formInput, github: e.target.value })
								}
							/>
							<input
								placeholder='LinkedIn'
								className='w-full mt-2 border rounded p-2'
								onChange={(e) =>
									updateFormInput({ ...formInput, linked: e.target.value })
								}
							/>
						</div>
						<div className='flex mt-2 border rounded p-4 text-gray-400'>
							<span className='mr-3'>Level</span>
							<button
								className='border-2 border-gray-100 bg-white focus:border-purple-400 rounded-full w-6 h-6 focus:outline-none'
								onClick={(e) =>
									updateFormInput({ ...formInput, price: "0.01" })
								}></button>
							<button
								className='border-2 border-gray-100 ml-1 focus:border-purple-400 bg-purple-200 rounded-full w-6 h-6 focus:outline-none'
								onClick={(e) =>
									updateFormInput({ ...formInput, price: "0.03" })
								}></button>
							<button
								className='border-2 border-gray-100 ml-1 focus:border-purple-900 bg-purple-500 rounded-full w-6 h-6 focus:outline-none'
								onClick={(e) =>
									updateFormInput({ ...formInput, price: "0.1" })
								}></button>
							<span className='ml-4'>{formInput.price} ETH</span>
						</div>
						{formInput.price &&
							formInput.name &&
							formInput.description &&
							formInput.email &&
							formInput.mobile &&
							fileUrl && (
								<button
									onClick={createMarket}
									className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-2'>
									Create Profile
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-4 h-4 ml-1'
										viewBox='0 0 24 24'>
										<path d='M5 12h14M12 5l7 7-7 7'></path>
									</svg>
								</button>
							)}
					</div>
				</div>
			</section>
		</>
	);
}
