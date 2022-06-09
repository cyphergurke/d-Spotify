import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ClockCircleOutlined, CloudDownloadOutlined } from "@ant-design/icons"
import { SkynetClient } from "skynet-js";

//import { useAlbum } from '../../hooks/useAlbum';
import './Album.css';
import { apiResponse } from '../../helpers/apiCallResponse';
import { SongContext } from '../../context/SongContext';
import { PortalContext } from '../../context/PortalContext';
//import { AlbumContext } from '../../Context/AlbumContext';
//import { PlayedContext } from '../../Context/PlayedContext';



const albumDetails = apiResponse;



const Album = ({ setAlbum }) => {
  const { state: album } = useLocation();
  const { selectTrack, setSong } = useContext(SongContext);
  const { selectedPortal } = useContext(PortalContext);
  //const { albumDetails } = useAlbum(album.contract);
  // const { setAlbum } = useContext(AlbumContext);
  //const { playedTracks, setTrack } = useContext(SongContext);



  const playThisSong = (i) => {
    setSong(i)
    setAlbum(albumDetails)

  }
  const client = new SkynetClient(selectedPortal);



  const twofunc = () => {
    if (selectTrack !== 0) {
      setSong(0)
    }
    setAlbum(albumDetails)

  }



  async function download(e) {


    if (e.includes("skynet://")) {
      const skylink = e;
      const link = skylink.slice(9);
      try {
        await client.downloadFile(link);
        // Or client.openFile(skylink) to open it in a new browser tab.
      } catch (error) {
        console.log(error);
      }
    } else {
      //Download from IPFS
    }

  };


  return (
    <>

      <div className="albumContent">
        <div className="topBan"  >
          <img

            src={album.image}
            alt="albumcover"
            className="albumCover"
          ></img>
          <div className="albumDeets">
            <div>ALBUM</div>
            <div className="title">{album.title}</div>
            <div className="artist">
              {albumDetails && JSON.parse(albumDetails[0].metadata).artist}
            </div>
            <div>
              {albumDetails && JSON.parse(albumDetails[0].metadata).year} •{" "}
              {albumDetails && albumDetails.length} Songs
            </div>
          </div>
        </div>
        <div className="topBan">
          <div className="playButton" onClick={() => twofunc()}>
            PLAY
          </div>
        </div>
        <div className="tableHeader">
          <div className="numberHeader">#</div>
          <div className="titleHeader">TITLE</div>
          <div className="numberHeader">
            <ClockCircleOutlined />
          </div>
        </div>
        {albumDetails &&
          albumDetails.map((track, i) => {
            track = JSON.parse(track.metadata);
            return (
              <>
                <div key={track.id}>
                  <CloudDownloadOutlined onClick={() => download(track.animation_url)} className="downloadbtn" />

                  <div className="tableContent" onClick={() => playThisSong(i)}>
                    <div className="numberHeader">{i + 1}</div>

                    <div
                      className="titleHeader"
                      style={{ color: "rgb(205, 203, 203)", cursor: "pointer" }} >
                      {track.name}
                    </div>
                    <div className="numberHeader">{track.duration}</div>
                  </div>
                </div>
              </>
            );
          })}
      </div>

    </>
  );
};

export default Album;