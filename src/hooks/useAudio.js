import { useState, useEffect, useRef, useContext } from "react";
import { useLink } from "./useLink";


import { SongContext } from '../context/SongContext';
import { AlbumContext } from "../context/AlbumContext";
import { PlayedContext } from "../context/PlayedContext";

const useAudio = (url) => {
    const { resolveLink } = useLink();
    const [audio, setAudio] = useState(url);
    const { selectTrack, setSong } = useContext(SongContext);
    const { selectedAlbum } = useContext(AlbumContext);
    const { playedTracks, setTrack } = useContext(PlayedContext);
    const [newSong, setNewSong] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentVolume, setCurrentVolume] = useState(volume);
    const [mute, setMute] = useState(false);
    const audioRef = useRef(new Audio(resolveLink(JSON.parse(audio[selectTrack].metadata).animation_url)));

    const intervalRef = useRef();
    const isReady = useRef(false);

    const { duration } = audioRef.current;


    setTrack(selectTrack);


    const toPrevTrack = () => {
        if (selectTrack - 1 < 0) {
            setSong(audio.length - 1);
        } else {
            setSong(selectTrack - 1);
        }
    };

    const toNextTrack = () => {
        if (selectTrack < audio.length - 1) {
            setSong(selectTrack + 1);
        } else {
            setSong(0);
        }
    };




    useEffect(() => {
        toggle();
        setAudio(url);
        if (selectTrack === 0) {
            setNewSong(newSong + 1)
        } else {
            setSong(0);
        }
    }, [url]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(resolveLink(JSON.parse(audio[selectTrack].metadata).animation_url));
        audioRef.current.volume = volume;
        setTrackProgress(Math.round(audioRef.current.currentTime));
        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    }, [selectTrack, newSong]);

    const toggle = () => setIsPlaying(!isPlaying);

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(Math.round(audioRef.current.currentTime));
            }
        }, [500]);
    };

    const onSearch = (value) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onSearchEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    const onVolume = (vol) => {
        setVolume(vol);
        audioRef.current.volume = vol;
    };

    const onMute = () => {
        if (mute === false) {
            setMute(true);
            setCurrentVolume(volume);
            setVolume(0);
            audioRef.current.volume = 0;
        } else {
            setMute(false);
            let vol = currentVolume;
            onVolume(vol);
        }
    }

    return [isPlaying, duration, toggle, toNextTrack, toPrevTrack, trackProgress, onSearch, onSearchEnd, onVolume, onMute, selectTrack, audioRef, audio];
};

export default useAudio;