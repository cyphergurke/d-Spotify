import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './RecentlyPlayed.css'

import { PlayedContext } from '../../context/PlayedContext'

const RecentlyPlayed = () => {
    const { playedTracks, setPlayedTrack } = useContext();


    //track und album in array playedContext speichern
    //map all tracks with link that setAlbum to this.album onClick={setAlbum(track.album)}

    /***
     * 
     *     {playedTracks && playedTracks.map((track, i) => {
                    <Link >
                        <p >{track.name}</p>
                    </Link>
                })
    
                }
                
     * 
     */

    return (
        <>

            <Link to="/album" >
                <p > Track</p>
            </Link>

            <div >
                Track : Album
            </div>
            <div style={{ color: "white" }}>Hallo!</div>
            <div style={{ color: "white" }}>Hallo!</div>
            <div style={{ color: "white" }}>Hallo!</div>
            <div style={{ color: "white" }}>Hallo!</div>
            <div style={{ color: "white" }}>Hallo!</div>


        </>
    )
}

export default RecentlyPlayed;