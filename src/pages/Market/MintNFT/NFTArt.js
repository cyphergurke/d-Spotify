import React, { useState, useContext } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'
import { SkynetClient } from "skynet-js"
import { marketplaceAddress } from '../config'
import NFTMarketplace from '../NFTMarketplace.json'
import './MintNFT.css'
import { PortalContext } from "../../../context/PortalContext";


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


export default function NFTArt() {
    const { selectedPortal, setPortal } = useContext(PortalContext);
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '', tags: '', creator: '' })

    const skyclient = new SkynetClient(selectedPortal);

    if (selectedPortal == undefined) {
        setPortal('https://FilePortal.org/')
    }



    async function onChange(e) { //upskynet
        // upload image to skynet  
        const file = e.target.files[0]
        try {
            const { skylink } = await skyclient.uploadFile(file)

            const link = skylink.slice(6)
            const url = `https://siasky.net/${link}`
            //  console.log(url)
            setFileUrl(url)

        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }


    async function uploadToIPFS() {
        const { name, description, tags, creator, price } = formInput
        if (!name || !description || !tags || !creator || !price || !fileUrl) return
        //first, upload metadata to IPFS  
        const data = JSON.stringify({
            name, description, tags, creator, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            // after metadata is uploaded to IPFS, return the URL to use it in the transaction  

            return url
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }




    async function listNFTForSale() {
        const url = await uploadToIPFS()
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        /* create the NFT */

        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        let transaction = await contract.createToken(url, price, { value: listingPrice })
        await transaction.wait()




    }

    return (
        <div className="nftmusic">

            <div className="nftform">

                <h1 className='title'>Create your NFT!</h1>
                <h2>Name</h2>
                <input
                    placeholder="Asset Name"

                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <h2>Description</h2>
                <textarea
                    placeholder="Asset Description"

                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                />
                <h2>Tags</h2>
                <input
                    placeholder="Asset tags"


                    name="tags"
                    onChange={e => updateFormInput({ ...formInput, tags: e.target.value })}
                />
                <h2>Creator</h2>
                <input
                    placeholder="Asset Creator"

                    onChange={e => updateFormInput({ ...formInput, creator: e.target.value })}
                />
                <h2>Price in Eth</h2>
                <input
                    type="number"
                    placeholder="Asset Price in Eth"
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />

                <div className='uploadbtn'>
                    <button className='uploadfilebtn'>Upload Art</button>
                    <input
                        type="file"
                        name="Asset"

                        onChange={onChange} //onChange upskynet
                    />
                </div>
                {
                    fileUrl && (
                        <img className="rounded mt-4" width="350" src={fileUrl} />
                    )
                }
                <button onClick={listNFTForSale} className="CreateNftButton">
                    Create NFT
                </button>

            </div>

        </div>
    )
}