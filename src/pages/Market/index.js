import React from 'react'


import Dashboard from './Dashboard/Dashboard'
import MyNFT from './MyNFT/MyNFTs'
import NftMarket from './Market/NftMarket'
import MintNft from './MintNFT/MintNft'
import './index.css'
import { Tabs } from 'antd'


const { TabPane } = Tabs



export default function NftMusic() {

    return (
        <div className=" nftheader">


            <Tabs defaultActiveKey="1"   >
                <TabPane tab="NFT MINTING" key="1">

                    <MintNft />


                </TabPane>

                <TabPane tab="NFT MUSIC MARKET" key="2">

                    <NftMarket />


                </TabPane>
                <TabPane tab="MY NFTS" key="3">

                    <MyNFT />


                </TabPane>
                <TabPane tab="Dashboard" key="4">

                    <Dashboard />


                </TabPane>
            </Tabs >

        </div>
    )
}

