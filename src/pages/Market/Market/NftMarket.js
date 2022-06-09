import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { marketplaceAddress } from '../config'
import '../NFTs.css';
import NFTMarketplace from '../NFTMarketplace.json'

const NftMarket = () => {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadNFTs()
    }, [])
    async function loadNFTs() {
        /* create a generic provider and query for unsold market items */
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
        const data = await contract.fetchMarketItems()

        /*
        *  map over items returned from smart contract and format 
        *  them as well as fetch their token metadata
        */
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
                tags: meta.data.tags,
                creator: meta.data.creator,
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
    }
    async function buyNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

        /* user will be prompted to pay the asking proces to complete the transaction */
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price
        })
        await transaction.wait()
        loadNFTs()
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <div className=" ">
            <h1 className=" ">No NFTs in Marketplace</h1>
        </div>
    )
    return (
        <>
            <div className="nftmarket">
                <div className=" "  >
                    <div className=" nftgrid">
                        {
                            nfts.map((nft, i) => (
                                <div key={i} className="nftcard">
                                    <img src={nft.image} className="nftimg" />
                                    <table>
                                        <tr hidden>
                                            <th >Name </th>
                                            <th> description</th>
                                        </tr>
                                        <tr>
                                            <td>Name: </td>
                                            <td className='nftinfo' >{nft.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Description: </td>
                                            <td className='nftinfo'>{nft.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Tags: </td>
                                            <td className='nftinfo'>{nft.tags}</td>
                                        </tr>
                                        <tr>
                                            <td>Creator: </td>
                                            <td className='nftinfo'>{nft.creator}</td>
                                        </tr>
                                    </table>


                                    <div className="buynft">
                                        <p className=" "></p>
                                        <button className=" buynft" onClick={() => buyNft(nft)}>Buy {nft.price} ETH</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default NftMarket;