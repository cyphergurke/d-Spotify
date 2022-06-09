import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { Link } from "react-router-dom";

import { marketplaceAddress } from '../config'
import '../NFTs.css';
import NFTMarketplace from '../NFTMarketplace.json'

const Dashboard = () => {
    const [nfts, setNfts] = useState([])

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




    if (loadingState === 'loaded' && !nfts.length) return (


        <div className=" ">
            <h1 className=" ">No NFTs listed</h1>
        </div>
    )
    return (
        <div className='myNft '>


            <div className="nftgrid ">
                {
                    nfts.map((nft, i) => (

                        <div key={i} className=" nftcard">
                            <img src={nft.image} className=" " />
                            <table  >
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
                            <Link to={`../details/?${nft.token}`}>

                                <button className="detailsbtn"  >Details</button>

                            </Link>



                        </div>
                    ))
                }
            </div>

        </div >
    )
}

export default Dashboard;