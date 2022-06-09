import React, { createContext, useState } from 'react'

export const AlbumContext = createContext();


export function AlbumProvider({ children }) {
    const [selectedAlbum, setSelectedAlbum] = useState();

    const setAlbum = (album) => {
        setSelectedAlbum(album);
    }

    return (
        <AlbumContext.Provider value={{ selectedAlbum, setAlbum }}>
            {children}
        </AlbumContext.Provider>
    );
}