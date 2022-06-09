import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import axios from 'axios'
import Web3Modal from 'web3modal'

import { marketplaceAddress } from '../config'

import NFTMarketplace from '../NFTMarketplace.json'
import { useLocation } from 'react-router-dom'
import '../index.css'

const SellNft = () => {
    const [formInput, updateFormInput] = useState({ price: '', image: '' })
    const location = useLocation();
    const id = location.search.slice(4, 5)
    const tokenURI = location.search.slice(15)
    const { image, price } = formInput

    async function fetchNFT() {
        if (!tokenURI) return
        const meta = await axios.get(tokenURI)
        updateFormInput(state => ({ ...state, image: meta.data.image }))
    }
    useEffect(() => {
        fetchNFT()
    }, [id])
    async function listNFTForSale() {
        if (!price) return
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        let listingPrice = await contract.getListingPrice()

        listingPrice = listingPrice.toString()
        let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice })
        await transaction.wait()

        //router.push('/')
    }

    return (
        <div className=" nftheader">

            <div className='sellnft'>

                <h1 className=' '>Sell your NFT!</h1>
                <div className='nftprice'>
                    <input
                        placeholder="Asset Price in Eth"
                        type="number"
                        className=" "
                        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    /> <p >ETH</p>
                </div>
                <div>
                    {
                        image && (
                            <img className=" " width="350" src={image} />
                        )
                    }
                </div>

                <button onClick={listNFTForSale} className=" ">
                    List NFT
                </button>
            </div>
        </div>
    )
}
export default SellNft;