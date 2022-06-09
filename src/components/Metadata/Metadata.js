//import { EditOutlined } from '@ant-design/icons'
import React, { useState } from 'react'



import './Metadata.css';



export function MetaData({ fileMetaData }) {



  /***
const [show, setShow] = useState(false);

const { artist, setArtist } = useState();

 
   <EditOutlined style={{ marginLeft: "85%" }} onClick={() => setShow(currentShow => !currentShow)} />
      {show ?
        <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
        : null}
 */


  return (
    <div className="Metadata">
      <div className="metaelement">
        Artist: <span>{fileMetaData.common.artist}</span>


      </div>
      <div className="metaelement">
        Track name: <span> {fileMetaData.common.title}</span>

      </div>
      <div className="metaelement">
        Album: <span> {fileMetaData.common.album}</span>
      </div>
      <div className="metaelement">
        BPM according to metadata: <span> {fileMetaData.common.bpm}</span>
      </div>
      <div className="metaelement">
        BPM according to findBPM: <span> {fileMetaData.common.bpm}</span>
      </div>
      <div className="metaelement">
        Duration: <span> {Math.round(fileMetaData.format.duration)} s</span>
      </div>
      <div className="metaelement">
        Sample Rate: <span> {fileMetaData.format.sampleRate} Hz</span>
      </div>
      <div className="metaelement">
        Bits per Sample: <span> {fileMetaData.format.bitsPerSample}</span>
      </div>
      <div className="metaelement">
        Bitrate: <span> {fileMetaData.format.bitrate}</span>
      </div>
      <div className="metaelement">
        Lossless: <span> {fileMetaData.format.lossless}</span>
      </div>
      <div className="metaelement">
        Channels number: <span> {fileMetaData.format.numberOfChannels}</span>
      </div>
      <div className="metaelement">
        Creation time: <span> {fileMetaData.format.creationTime}</span>
      </div>
    </div>
  );
}
