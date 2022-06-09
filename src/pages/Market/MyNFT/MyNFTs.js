import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { Link } from 'react-router-dom'

import { marketplaceAddress } from '../config'



import NFTMarketplace from '../NFTMarketplace.json'


const MyNFT = () => {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    //  const router = Router()
    useEffect(() => {
        loadNFTs()
    }, [])
    async function loadNFTs() {
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        const data = await marketplaceContract.fetchMyNFTs()

        const items = await Promise.all(data.map(async i => {
            const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenURI)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
                tokenURI
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
    }
    function listNFT(nft) {
        // router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
    }
    if (loadingState === 'loaded' && !nfts.length) return (
        <div className="noNft">
            <h1 className=" ">No NFTs owned</h1>
        </div>
    )
    return (
        <div className="myNft">

            <div className="nftgrid ">
                {
                    nfts.map((nft, i) => (
                        <div key={i} className="nftcard ">
                            <img src={nft.image} alt={nft.name} />
                            <div className='nftdescription'>
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
                                        <td>Tags: </td>
                                        <td className='nftinfo'>{nft.tags}</td>
                                    </tr>
                                    <tr>
                                        <td>Creator: </td>
                                        <td className='nftinfo'>{nft.creator}</td>
                                    </tr>
                                </table>


                                <Link to={`../sellnft/?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`}  >
                                    <button className='listbtn'>List </button>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div >
    )
}

export default MyNFT;