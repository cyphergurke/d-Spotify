import React, { createContext, useState } from 'react'

export const PortalContext = createContext();


export function PortalProvider({ children }) {
    const [selectedPortal, setSelectedPortal] = useState();

    const setPortal = (portal) => {
        setSelectedPortal(portal);
    }

    return (
        <PortalContext.Provider value={{ selectedPortal, setPortal }}>
            {children}
        </PortalContext.Provider>
    );

}
