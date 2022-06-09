import React, { useState, useRef, useEffect } from 'react';
import { Input } from 'web3uikit';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { defaultImgs } from '../../../../components/Tweets/defaultimgs';

import "./settings.css";


const TweetSettings = () => {
    const { Moralis, isAuthenticated, account } = useMoralis();
    const [bio, setBio] = useState();
    const [username, setUserName] = useState();
    const [theFile, setTheFile] = useState();
    const [selectedPFP, setSelectedPFP] = useState();
    const [pfps, setPfps] = useState([]); //[pfp1, pfp2, pfp3, pfp4, pfp5];
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
    const Web3Api = useMoralisWeb3Api();


    const resolveLink = (url) => {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io.ipfs/");
    };

    useEffect(() => {

        const fetchNFTs = async () => {
            const options = {
                chain: "mumbai",
                address: account
            }

            const mumbaiNFTs = await Web3Api.account.getNFTs(options);
            const images = mumbaiNFTs.result.map(
                (e) => resolveLink(JSON.parse(e.metadata)?.image)
            );
            setPfps(images);
        }

        fetchNFTs();

    }, [isAuthenticated, account])

    const onBannerClick = () => {
        inputFile.current.click();
    };

    const changeHandler = (event) => {

        const img = event.target.files[0];
        setTheFile(img);
        setSelectedFile(URL.createObjectURL(img));
    };

    const saveEdits = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (bio) {
            myDetails.set("bio", bio);
        }
        if (selectedPFP) {
            myDetails.set("pfp", selectedPFP);
        }
        if (username) {
            myDetails.set("username", username);
        }

        if (theFile) {
            const data = theFile;
            const file = new Moralis.File(data.name, data);
            await file.saveIPFS();
            myDetails.set("banner", file.ipfs());
        }
        console.log("Success");
        await myDetails.save();

    }

    return (
        <>

            <div className='settingsPage'>

                <input
                    placeholder='Name'
                    name='nameChange'
                    onChange={(e) => setUserName(e.target.value)}
                />
                <textarea
                    placeholder="Bio"
                    name='bioChange'
                    onChange={(e) => setBio(e.target.value)}
                />


                <div className='pfp'>
                    <p>Profile image (Your NFTs)</p>
                    <div className='pfpOptions'>
                        {pfps.map((e, i) => {
                            return (
                                <>
                                    <img width={350} src={e} className={
                                        selectedPFP === e ? "pfpOptionSelected" : "pfpOption"
                                    }
                                        onClick={() => { setSelectedPFP(pfps[i]); }}
                                    ></img>
                                </>
                            )
                        })}

                    </div>
                </div>
                <div className='pfp'>
                    Profile Banner
                    <div className='pfpOptions'>
                        <img src={selectedFile} classname="banner"
                            onClick={onBannerClick}
                        ></img>
                        <input
                            type="file"
                            name="file"
                            ref={inputFile}
                            onChange={{ changeHandler }}
                            style={{ display: "none" }} />

                    </div>
                </div>
                <div className='save' onClick={() => saveEdits()}  >
                    Save
                </div>
            </div>

        </>
    )
}

export default TweetSettings;
