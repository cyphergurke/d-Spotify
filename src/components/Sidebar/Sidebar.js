import React, { useState } from 'react';
import { SearchOutlined, DownCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Select, Layout } from 'antd';
import './Sidebar.css';
import Skynet from '../../images/skynet-icon.png';
import RecentlyPlayed from '../RecentlyPlayed/RecentlyPlayed';
import Search from 'antd/lib/transfer/search';

//const { Option } = Select;

const { Sider } = Layout;
//  <RecentlyPlayed />

export const Sidebar = () => {
    const [search, setSearch] = useState();


    const isEnter = (e) => {
        if (e.keyCode == 13) {
            startSearch()
        }
    }

    const startSearch = () => {
        console.log(search)

    }

    return (
        <>
            <Sider width="270px" className="sideBar" >
                <Link to="/settings">
                    <SettingOutlined style={{ fontSize: "25px", paddingLeft: "80%", position: "flex", color: "#1DB954" }}
                    />
                </Link>

                <Link to="/">

                    <img src={Skynet} alt="logo" className="logo"></img>
                </Link>

                <div className='searchBar'>
                    <input placeholder='Search' onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => isEnter(e)} />
                    <SearchOutlined style={{ fontSize: "30px" }} onClick={() => startSearch()} />
                </div>
                <Link to="/">
                    <p  >Home</p>
                </Link>

                <Link to="/mymusic">
                    <p  >MyMusic</p>

                </Link>
                <Link to="/community">
                    <p >Community</p>

                </Link>
                <Link to="/nftmusic">
                    <p >NFT Music</p>

                </Link>
                <Link to="/upload">
                    <div className='upload'    >
                        <p>Upload Free Musik</p>

                    </div>
                </Link>
                <div className='recentPlayed'>
                    <p className='recentTitle'>RECENTLY PLAYED</p>

                </div>
                <div className='install' /**onClick={() => installApp() } */  >
                    <p>Install App</p>
                    <DownCircleOutlined style={{ fontSize: "30px" }} />
                </div>
            </Sider>
        </>
    )
}
