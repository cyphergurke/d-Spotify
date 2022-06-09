import React, { useState } from 'react'
import { SkynetClient } from 'skynet-js'
//import { ContentRecordDAC } from "@skynetlabs/content-record-library";

//import { PortalContext } from '../../Context/PortalContext';

import './Mysky.css';


const client = new SkynetClient();
const hostApp = "host-app.hns";



const Mysky = () => {

    const [logedin, setLogin] = useState();

    /**
    
    
        async function loadDacsExample() {
            try {
                const mySky = await client.loadMySky(hostApp);
    
                // Initialize DAC, auto-adding permissions.
                const dac = new ContentRecordDAC()
                await mySky.loadDacs(dac);
            } catch (error) {
                console.log(error)
            }
        }
    
         */
    return (
        <>
            {!logedin &&
                <>
                    <div className='singin' >
                        <button className='myskybtn'>Login</button>
                        <button className='myskybtn'>Register</button>
                    </div>
                </>
            }
        </>
    )
}

export default Mysky;