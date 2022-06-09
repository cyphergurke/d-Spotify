import React, { useState, useContext, useRef } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import Web3Modal from 'web3modal'
import { SkynetClient } from "skynet-js"
import { marketplaceAddress } from '../config'
import NFTMarketplace from '../NFTMarketplace.json'
import './MintNFT.css'
import { PortalContext } from "../../../context/PortalContext";


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


export default function NFTAlbum() {
    const { selectedPortal, setPortal } = useContext(PortalContext);
    const [fileUrl, setFileUrl] = useState(null)
    const [songs, setSongs] = useState([])
    const [formInput, updateFormInput] = useState({ price: '', symbol: '', name: '', genre: '', year: '' })
    const [storage, setStorage] = useState();


    if (storage == "Skynet") {
        console.log("upload to Skynet")
    }
    if (storage == "IPFS") {
        console.log("upload to IPFS")
    }
    if (storage == undefined) {
        setStorage("Skynet")
    }


    if (selectedPortal == undefined) {
        setPortal('https://FilePortal.org/')
    }
    const skyclient = new SkynetClient(selectedPortal);


    // const { duration } = audioRef.current;

    console.log(songs)

    const audioRef = useRef(new Audio(songs[0]))
    const { duration } = audioRef.current
    console.log(duration)

    const albumDuration = () => {

        songs.map((song, i) => {
            console.log(song[i])
            //const audioRef = useRef(new Audio(song[i]));
            // const { duration } = audioRef.current
        })
        //    const audioRef = useRef(new Audio("https://siasky.net/AADVA_Q5F2jOIjYYZUTJxFEZjrDLi6nqaM8uwxC3XP2gvw"));
        //    const { duration } = audioRef.current
        //console.log(duration)
    }



    /***
    const metadata = () => {
        const file = songs[0]
        jsmediatags.read(file, {
            onSuccess: function (tag) {
                console.log(tag);
            },
            onError: function (error) {
                console.log(error)
            }
        })
    }
     */


    //  const router = BrowserRouter()

    //get
    //   const [jsondata, setJSON] = useState('');
    //const [jsonlink, setJSONlink] = useState([]);
    //  const [metalink, setMetalink] = useState([{}]);

    //  https://www.youtube.com/watch?v=GgzWFxIiwK4&list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH&index=44


    /*
            const fetchjson = async () => {
                const response = await fetch('/api')
                const data = await response.json()
                setJSONlink(data)
                console.log('Success!')
            }
            const link = jsonlink.skylink
            console.log(link)
        
    
    
        const submitjson = async () => {
            const response = await fetch('/api', {
                method: 'POST',
                body: JSON.stringify({ postitem }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setJSONlink(data)
    
            console.log(data.name, data.tags)
        }
    */


    /**
        useEffect(() => {
            fetch("/api")
                .then((res) => res.json())
                .then((jsondata) => setJSON(jsondata.message));
        }, []);
    
        if (!jsondata) {
            console.log("Loading")
        } else {
            console.log(jsondata)
        }
        //console.log(jsondata)
    
     


    async function upskynet(e) { //upskynet
        /* upload image to skynet  
        const file = e.target.files[0]
        try {
            const { skylink } = await client.uploadFile(file)

            const link = skylink.slice(6)
            const url = `https://siasky.net/${link}`
            //  console.log(url)
            setFileUrl(url)
            return url
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    const postitem = { name: 'peter', description: 'asdaw', tags: 'Asd', creator: 'aasd', price: 123 }




    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setMetalink(data)
            }
        )
    }, [])
    */
    /*
    fetch("http://localhost:3001/api", {
        method: 'POST',
        body: postitem,
        headers: {
            'Content-Type': 'applications/json'
        }
    })
        .then(res => res.json())
        .then(
            (result) => {

                //callback for the response
            }
        );
   */

    /**
        useEffect(() => {
            // POST request using axios inside useEffect React hook
    
            axios.post('/api', data)
                .then(response => setJSON(response.data.jsondata));
        }, []);
    
    
    
        useEffect(() => {
            axios.get('/api')
                .then(res => {
                    setJSONlink(res.data.skylink)
                    console.log('success!')
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])
        const linksky = jsonlink.skylink
    
    
     */


    /*
        async function uploadToSkynet() { //uploadToSkynet
            const { name, description, tags, creator, price } = formInput
            if (!name || !description || !tags || !creator || !price || !fileUrl) return
            /*     metadata    
            fs.writeFileSync('./jsonlink.json', formInput)
    
            try {
                const { skylink } = await client.uploadFile(file)
    
                const link = skylink.slice(6)
                const url = `https://siasky.net/${link}`
                /* after metadata is uploaded to Skynet, return the URL to use it in the transaction     
                return url
            } catch (error) {
                console.log('Error uploading file: ', error)
            }
        }
     */


    async function onChangeImage(e) { //upskynet
        // upload image to skynet  
        const file = e.target.files[0]
        try {
            const { skylink } = await skyclient.uploadFile(file)

            const link = skylink.slice(6)
            const url = `https://siasky.net/${link}`
            console.log(url)
            setFileUrl(url)

        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    const onChangeSongs = (e) => {

        setSongs(e.target.files)

        const data = new FormData();
        data.append('file', songs);
        console.log(data, songs[1]);


        /***
         * 
         *    const reader = new FileReader();
           const fileName = e.name;
           const fileSize = (e.size / 1000000).toFixed(2);
           console.log(songs, reader, fileName, fileSize)
         * 
         */
    }

    /**   async function onChange(e) {
           //upload image to IPFS  
           const file = e.target.files[0]
           try {
               const added = await client.add(
                   file,
                   {
                       progress: (prog) => console.log(`received: ${prog}`)
                   }
               )
               const url = `https://ipfs.infura.io/ipfs/${added.path}`
               setFileUrl(url)
           } catch (error) {
               console.log('Error uploading file: ', error)
           }
       } */

    async function uploadToIPFS() { //price: '', name: '', symbol: '', name: '', genre: '', year: ''
        const { name, symbol, genre, year, price } = formInput
        if (!name || !symbol || !genre || !year || !price || !fileUrl) return
        //first, upload metadata to IPFS  
        const data = JSON.stringify({
            name, symbol, genre, year, image: fileUrl
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
        console.log("Success IPFS Upload Metadata")

        //    router.push('/')

    }


    return (
        <div className="nftmusic">

            <div className=" nftform">


                <h1 className='title' >Mint your NFT Music Album!</h1>
                <div className='albumpreview'>
                    <h2>Album preview</h2>
                    {
                        fileUrl && (
                            <img className="rounded mt-4" width="350" src={fileUrl} />
                        )
                    }
                    {
                        fileUrl && (
                            <>

                                <table className=''>

                                    <tr>
                                        <td >Album: </td>
                                        <td className='albumpreviewInput'>{formInput.symbol}</td>
                                    </tr>
                                    <tr>
                                        <td >Artist: </td>
                                        <td className='albumpreviewInput'>{formInput.name}</td>
                                    </tr>
                                    <tr>
                                        <td >Genre: </td>
                                        <td className='albumpreviewInput'>{formInput.genre}</td>
                                    </tr>
                                    <tr>
                                        <td >Year: </td>
                                        <td className='albumpreviewInput'>{formInput.year}</td>
                                    </tr>
                                    <tr>
                                        <td >Price: </td>
                                        <td className='albumpreviewInput'>{formInput.price}</td>
                                    </tr>

                                    {songs.length !== 0 &&
                                        <>
                                            <tr>
                                                <td >Songs: </td>
                                                <td className='albumpreviewInput'>{songs.length}</td>
                                            </tr>
                                        </>

                                    }
                                    <tr>
                                        <td >Duration:</td>
                                        <td className='albumpreviewInput'>Album duration</td>
                                    </tr>
                                </table>




                            </>
                        )
                    }

                    <div className='songlist'>

                        Audio

                    </div>


                </div>
                <h2>Album Name</h2>
                <input
                    placeholder="Album Name"

                    onChange={e => updateFormInput({ ...formInput, symbol: e.target.value })}
                />

                <h2>Artist Name</h2>
                <input
                    placeholder="Artist"


                    name="tags"
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <h2>Genre</h2>
                <input
                    placeholder="Genre"
                    className=""
                    onChange={e => updateFormInput({ ...formInput, genre: e.target.value })}
                />
                <h2>Year</h2>
                <input
                    type="number"
                    defaultValue="2000"
                    placeholder="Year"

                    onChange={e => updateFormInput({ ...formInput, year: e.target.value })}
                />
                <h2>Sell Album</h2>
                <input
                    type="number"
                    placeholder="Asset Price in Eth"


                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <h2>Choose Storage Type ({storage})</h2>
                <div className='storagetype' >
                    <div className='storagetypeSkynet' onClick={() => setStorage("Skynet")}>
                        Skynet
                    </div>
                    <div className='storagetypeIPFS' onClick={() => setStorage("IPFS")}>
                        IPFS
                    </div>
                </div>
                <h2>Upload Cover Image</h2>
                <div className='uploadbtn'>
                    <button className='uploadfilebtn'>Choose Cover image</button>
                    <input
                        type="file"
                        name="Asset"
                        accept="image/*"

                        onChange={onChangeImage} //onChange upskynet
                    />
                </div>
                <h2>Upload Album Songs</h2>
                <div className='uploadbtn'>
                    <button className='uploadfilebtn'>Choose Songs</button>
                    <input
                        type="file"
                        accept="audio/*"
                        multiple="multiple"
                        name="Asset"
                        className=" "
                        onChange={(e) => onChangeSongs(e)} //onChange upskynet
                    />
                </div>
                <button onClick={listNFTForSale} className="CreateNftButton">
                    Create Album NFT
                </button>



            </div>
        </div>
    )
}

