import React, { useState } from 'react'

import { Tabs } from 'antd';
import { ConnectButton } from 'web3uikit';
import { useMoralis } from 'react-moralis'
import Profile from './Tweets/Profile/Profile';
import Tweets from './Tweets/Tweets/Tweets';
import TweetSettings from './Tweets/TweetSettings/TweetSettings';
// import ... from 'jsmediatags'
import './Community.css'
import Dao from './Dao/Dao';

const { TabPane } = Tabs;


const Community = () => {
    const { isAuthenticated, Moralis } = useMoralis();


    return (
        <>
            {isAuthenticated ? (
                <div className="tweetheader">

                    <div className='wallet'>
                        <ConnectButton className='walletbtn' />
                        <div
                            className="logout"
                            onClick={() => {
                                Moralis.User.logOut().then(() => {
                                    window.location.reload();
                                });
                            }}
                        >
                            Logout
                        </div>

                    </div>
                    <Tabs className='tabs' defaultActiveKey="1" centered>
                        <TabPane tab="FORUM" key="1" >
                            <Tweets />
                        </TabPane>
                        <TabPane tab="PROFILE" key="2">
                            <Profile />
                        </TabPane>
                        <TabPane tab="DAO" key="3">
                            <Dao />
                        </TabPane>
                        <TabPane tab="SETTINGS" key="4">
                            <TweetSettings />
                        </TabPane>
                    </Tabs>
                </div>
            ) : (
                <div className="loginpage">
                    <h1>Connect Your Wallet to Login </h1>
                    <ConnectButton />
                </div>

            )}
        </>
    )
}

export default Community;