import React, { useContext, useState } from 'react';
import { Select, Switch } from 'antd';

import './Settings.css';
import { PortalContext } from '../../context/PortalContext';


const onChange = (checked) => {
    console.log(`switch to ${checked}`);
};

const { Option } = Select;


const Settings = () => {
    const { selectedPortal, setPortal } = useContext(PortalContext);
    const [customPortal, setCustomPortal] = useState();

    if (selectedPortal === undefined) {
        setPortal("https://FilePortal.org/");
    }

    return (

        <div className='settings'>

            <h1 className='settingstitle'>Settings  </h1>

            <div className='portalsettings'>
                <p > Portal Settings</p>
                <div className='sets'>
                    <p>Select Portal (current: {selectedPortal})</p>

                    <Select style={{ fontSize: "25px", width: "200px", background: "transparent" }} className='selectportal' placeholder="Select" onChange={(value) => setPortal(value)}>
                        <Option value="https://FilePortal.org/">
                            FilePortal
                        </Option>
                        <Option value="https://siasky.net/">
                            SiaSky
                        </Option>
                    </Select>





                    <div className='customportal'>
                        <p>Set custom Portal ( i.e. https://skynetfree.net/ )</p>
                        <input className='' placeholder="Your Portal" onChange={e => setCustomPortal(e.target.value.trim())} />
                        <button onClick={() => setPortal(customPortal)}>Set Portal</button>
                    </div>
                </div>
            </div>
            <div className='profilesettings'>
                <p > Profile Settings</p>
                <div className='sets'>


                    <p >Public Profile <Switch defaultChecked style={{ backgroundColor: "#1DB954", marginLeft: "20px" }} onChange={onChange} /></p>
                    <p>Public Playlists <Switch defaultChecked style={{ backgroundColor: "#1DB954", marginLeft: "20px" }} onChange={onChange} /></p>
                    <p>Public Likes <Switch defaultChecked style={{ backgroundColor: "#1DB954", marginLeft: "20px" }} onChange={onChange} /></p>


                </div>
            </div>

        </div>
    )
}

export default Settings;