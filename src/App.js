import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Layout } from 'antd';

import Player from "./components/AudioPlayer/AudioPlayer";
import Home from "./pages/Home/Home";
import Album from './pages/Album/Album';
import Upload from './pages/Upload/Upload';
import Settings from './pages/Settings/Settings';

import './App.css';

import { SongProvider } from './context/SongContext';
import { PortalProvider } from './context/PortalContext';
import Mymusik from './pages/Mymusik/Mymusik';
import Community from './pages/Community/Community';
import { AlbumProvider } from './context/AlbumContext';
import { PlayedProvider } from './context/PlayedContext';
import { Sidebar } from './components/Sidebar/Sidebar';
import NftMusic from './pages/Market/index';
import NftDetails from './pages/Market/Details/Details';
import SellNft from './pages/Market/SellNft/SellNft';
import Dao from './pages/Community/Dao/Dao';
import Proposal from './pages/Community/Dao/Proposal';

const { Footer, Content } = Layout;

const App = () => {
  const [selectedAlbum, setAlbum] = useState();


  return (
    <Layout>
      <PortalProvider>
        <AlbumProvider>
          <SongProvider>
            <PlayedProvider>
              <Layout>
                <Sidebar />
                <Content className='contentWindow'>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/album" element={<Album setAlbum={setAlbum} />} />
                    <Route path="/mymusic" element={<Mymusik />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/dao" element={<Dao />}></Route>
                    <Route path="/proposal" element={<Proposal />}></Route>
                    <Route path="/nftmusic" element={<NftMusic />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/details" element={<NftDetails />} />
                    <Route path="/sellnft" element={<SellNft />} />
                  </Routes>
                </Content>
              </Layout>


              <Footer style={{ position: "fixed", bottom: "0", width: "100%" }}>
                {selectedAlbum &&
                  <Player url={selectedAlbum} />
                }

              </Footer>
            </PlayedProvider>
          </SongProvider>
        </AlbumProvider>
      </PortalProvider>
    </Layout >
  )
};

export default App;
