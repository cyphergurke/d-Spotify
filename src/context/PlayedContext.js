import React, { createContext, useState } from 'react'

export const PlayedContext = createContext();

export function PlayedProvider({ children }) {
    const [playedTracks, setPlayedTrack] = useState({});

    const setTrack = (track) => {
        setPlayedTrack(track);
    }

    return (
        <PlayedContext.Provider value={{ playedTracks, setTrack }}>
            {children}
        </PlayedContext.Provider>
    );
}


