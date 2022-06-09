import React, { createContext, useState } from 'react'

export const SongContext = createContext();



export function SongProvider({ children }) {
    const [selectTrack, setSelectTrack] = useState();

    const setSong = (index) => {
        setSelectTrack(index);
    }

    return (
        <SongContext.Provider value={{ selectTrack, setSong }}>
            {children}
        </SongContext.Provider>
    );
}


