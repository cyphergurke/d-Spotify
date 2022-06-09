import React, { useContext } from 'react';

import { Select } from 'antd';
import { PortalContext } from '../../context/PortalContext';



const { Option } = Select;

export default () => {

    const { selectedPortal, setPortal } = useContext(PortalContext);

    if (selectedPortal === undefined) {
        setPortal("https://FilePortal.org/");
    }
    console.log(selectedPortal)

    return (

        <div className='portal'>
            <p>Portal</p>
            <Select className='selectportal' defaultValue="https://FilePortal.org/" onChange={(value) => setPortal(value)}>
                <Option value="https://FilePortal.org/">
                    FilePortal
                </Option>
                <Option value="https://siasky.net/">
                    SiaSky
                </Option>
            </Select>
        </div>
    )
}