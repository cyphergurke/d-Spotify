import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { useLocation } from "react-router-dom";
import { marketplaceAddress } from '../config';
import NFTMarketplace from '../NFTMarketplace.json';
import '../NFTs.css';

const NftDetails = () => {
    const [nfts, setNfts] = useState([])

    const location = useLocation();
    const addr = location.search.slice(1)

    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadNFTs()
    }, [])
    async function loadNFTs() {
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        const data = await contract.fetchItemsListed()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await contract.tokenURI(i.tokenId)


            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')


            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
                token: tokenUri.slice(28),
            }

            return item

        }))

        setNfts(items)
        setLoadingState('loaded')



    }

    if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>)



    return (
        <div className=' '>
            <div className="  ">
                <h2 className=" ">NFT Details</h2>
                <div className="nftgrid ">

                    {
                        nfts.map((nft, i) => (
                            nft.token === addr ?
                                <div className="nftcard">
                                    <div className="">
                                        <p style={{ height: '64px' }} className=" ">{nft.name}</p>

                                    </div>
                                    <img src={nft.image} className=" " />

                                    <div className=" ">
                                        <p className=" ">Price - {nft.price} Eth</p>
                                    </div>
                                </div>
                                : null
                        ))
                    }
                </div>
            </div>
        </div >

    )
}

export default NftDetails;