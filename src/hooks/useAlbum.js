import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export const useAlbum = (contract) => {
    const { token } = useMoralisWeb3Api();
    const { isInitialized } = useMoralis();

    const [album, setAlbum] = useState();

    const fetchAlbum = async () => {
        return await token
            .getAllTokenIds({
                address: contract,
                chain: "ropsten"
            })
            .then((result) => result);
    };
    useEffect(() => {
        if (isInitialized) {
            fetchAlbum().then((songs) => {
                setAlbum(songs.result)
            });
        }
    }, [isInitialized, contract, fetchAlbum]);



    return { fetchAlbum, album };
};