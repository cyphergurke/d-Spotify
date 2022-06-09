import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MintNFT.css'

import NFTAlbum from './NFTAlbum'
import NFTArt from './NFTArt'



export default function MintNft() {
    const [music, setMusic] = useState();

    return (
        <div className="nftmusic">
            <Link to="/nftmusic" className='switchNft'>


                {music &&
                    <p onClick={() => setMusic(false)}>Mint Art NFT</p>
                }
                {music === false &&
                    <p onClick={() => setMusic(true)}>Mint Music NFT</p>
                }


            </Link>
            {music === undefined &&
                <div className='uploadform' >
                    <h1 className='title' style={{ color: 'white', fontWeight: '200', }} > Music or Art NFT?</h1>
                    <div className='uploadtype'>
                        <div className='single' onClick={() => setMusic(true)}>
                            Music
                        </div>
                        <div className='albummultiple' onClick={() => setMusic(false)}>
                            Art
                        </div>
                    </div>
                </div>
            }
            {music &&

                <NFTAlbum />
            }
            {music === false &&

                <NFTArt />
            }

        </div>
    )
}

