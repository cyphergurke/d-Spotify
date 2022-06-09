import React from 'react'

import { Tabs } from 'antd';


import { library } from '../../helpers/albumList';
import "../Home/Home.css";
import { Link } from 'react-router-dom';
const { TabPane } = Tabs

const Mymusik = () => {
    return (
        <>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="FEED" key="1">
                    <h1 className="featuredTitle">My Uploads</h1>
                    <div className="albums">
                        {library.map((e) => (
                            <Link to="/album" state={e} className="albumSelection">
                                <img
                                    src={e.image}
                                    alt="bull"
                                    style={{ width: "150px", marginBottom: "10px" }}
                                ></img>
                                <p>{e.title}</p>
                            </Link>
                        ))}
                    </div>
                </TabPane>
                <TabPane tab="MY PLAYLISTS" key="2">
                    <h1 className="featuredTitle">My Uploads</h1>
                    <div className="albums">
                        {library.map((e) => (
                            <Link to="/album" state={e} className="albumSelection">
                                <img
                                    src={e.image}
                                    alt="bull"
                                    style={{ width: "150px", marginBottom: "10px" }}
                                ></img>
                                <p>{e.title}</p>
                            </Link>
                        ))}
                    </div>
                </TabPane>
                <TabPane tab="UPLOADS" key="3">
                    <h1 className="featuredTitle">My Uploads</h1>
                    <div className="albums">
                        {library.map((e) => (
                            <Link to="/album" state={e} className="albumSelection">
                                <img
                                    src={e.image}
                                    alt="bull"
                                    style={{ width: "150px", marginBottom: "10px" }}
                                ></img>
                                <p>{e.title}</p>
                            </Link>
                        ))}
                    </div>
                </TabPane>
            </Tabs>
        </>
    );
}

export default Mymusik;