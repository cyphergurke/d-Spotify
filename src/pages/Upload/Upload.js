import React, { useState, useCallback } from 'react';
import { SkynetClient } from 'skynet-js';
//import { create as ipfsHttpClient } from 'ipfs-http-client';
import { CloudUploadOutlined } from '@ant-design/icons'
//import ... from 'jsmediatags'
import { useDropzone } from "react-dropzone";


import { MetaData } from '../../components/Metadata/Metadata';
import './Upload.css';
import * as _buffer from 'buffer';

const skyclient = new SkynetClient('https://siasky.net');
//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');


const Uploadmusik = () => {
    const [fileUrl, setFileUrl] = useState(null)
    // const [formInput, updateFormInput] = useState({ artist: '', songname: '', ablumname: '', date: '', description: '', tags: '', })
    const [fileLoaded, setFileLoaded] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [fileURL, setFileURL] = useState("");
    const [fileMetaData, setFileMetaData] = useState({});
    const [single, setSingle] = useState();



    window.global = window;
    window.Buffer = _buffer.Buffer;

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            const fileName = file.name;
            const fileSize = (file.size / 1000000).toFixed(2);

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                // Do whatever you want with the file contents

                const objectURL = URL.createObjectURL(file);

                setFileLoaded(true);
                setFileName(fileName);
                setFileSize(fileSize);
                setFileURL(objectURL);
                (async () => {
                    try {
                        //   const metaData = await mm.fetchFromUrl(objectURL);
                        //   setFileMetaData([metaData]);
                    } catch (error) {
                        console.error(error.message);
                    }
                })();
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "audio/*"
    });


    const duration = fileMetaData[0] ? fileMetaData[0].format.duration : 0;


    async function onChange(e) {

        const file = e.target.files[0]

        try {
            const { skylink } = await skyclient.uploadFile(file)

            const link = skylink.slice(6)
            const url = `https://siasky.net/${link}`

            setFileUrl(url)

            console.log(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }


    /**
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
    
         */


    return fileLoaded && fileURL && fileMetaData[0] ? (
        <>  <div className='uploadform' >
            <h1 className='title' style={{ color: 'white', fontWeight: '200', }} > Upload Musik</h1>
            <div {...getRootProps()} className="Dropzone">
                <input {...getInputProps()} />
                <span>
                    Filename: <span className="DropzoneFileName">{fileName}</span>
                </span>
                <div>File size: {fileSize} MB</div>
            </div>

            <MetaData fileMetaData={fileMetaData[0]} />


            <div className=" uploadbutton " onClick={() => console.log("Button Submit")}>
                Upload
            </div>



        </div>
        </>
    ) : (<>
        {single === undefined &&
            <div className='uploadform' >
                <h1 className='title' style={{ color: 'white', fontWeight: '200', }} > Single or Album?</h1>
                <div className='uploadtype'>
                    <div className='single' onClick={() => setSingle(true)}>
                        Single
                    </div>
                    <div className='albummultiple' onClick={() => setSingle(false)}>
                        Album
                    </div>
                </div>
            </div>
        }

        {single &&
            <div className='uploadform' >
                <h1 className='title' style={{ color: 'white', fontWeight: '200', }} > Upload Single</h1>
                <div {...getRootProps()} className="Dropzone">
                    <input {...getInputProps()} onLoadedMetadata />

                    <CloudUploadOutlined style={{ fontSize: "40px" }} />
                </div>
            </div>
        }

        {single === false &&
            <div className='uploadform' >
                <h1 className='title' style={{ color: 'white', fontWeight: '200', }} > Upload Album</h1>
                <div {...getRootProps()} className="Dropzone">
                    <input {...getInputProps()} />

                    <CloudUploadOutlined style={{ fontSize: "40px" }} />
                </div>
            </div>
        }
    </>

    );
}
export default Uploadmusik;


