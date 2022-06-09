import useAudio from "../../hooks/useAudio";
import { useState } from "react";
import { Slider } from "antd";
import { useLink } from "../../hooks/useLink";
import "./AudioPlayer.css";
import { CloseOutlined, SoundOutlined, StepBackwardOutlined, StepForwardOutlined, PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";



const Player = ({ url }) => {
    const { resolveLink } = useLink();
    const [iconstate, setIcon] = useState(true);
    const [
        playing,
        duration,
        toggle,
        toNextTrack,
        toPrevTrack,
        trackProgress,
        onSearch,
        onSearchEnd,
        onVolume,
        onMute,
        trackIndex
    ] = useAudio(url);


    const minSec = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnMin = minutes < 10 ? `0${minutes}` : minutes;
        const seconds = Math.floor(secs % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : seconds;

        return `${returnMin}:${returnSec}`;
    };


    const voltwofunc = (value) => {

        onVolume(value / 100)

        if (iconstate === false) {
            setIcon(true);
            onMute();
        }
    };

    const icontwofuncmute = () => {
        setIcon(false);
        onMute();
    };
    const icontwofuncunmute = () => {
        setIcon(true);
        onMute();
    };



    return (
        <>

            <div className="audiofooter">

                <div className="buttons" style={{ width: "300px", justifyContent: "start", }}>
                    <img className="cover" src={resolveLink(JSON.parse(url[trackIndex].metadata).image)} alt="currentCover" />
                    <div>
                        <div className="songTitle">{JSON.parse(url[trackIndex].metadata).name}</div>
                        <div className="songAlbum">{url[trackIndex].name}</div>
                    </div>
                </div>
                <div className="songElement">
                    <div className="buttons  ">
                        <StepBackwardOutlined className="forback" onClick={toPrevTrack} />
                        {playing ?
                            <PauseCircleFilled className="pauseplay" onClick={toggle} /> :
                            <PlayCircleFilled className="pauseplay" onClick={toggle} />
                        }
                        <StepForwardOutlined className="forback" onClick={toNextTrack} />
                    </div>
                    <div className="buttons">
                        {minSec(trackProgress)}
                        <Slider
                            value={trackProgress}
                            step={1}
                            min={0}
                            max={duration ? duration : 0}
                            className="trackprogress"
                            tooltipVisible={false}
                            onChange={(value) => onSearch(value)}
                            onAfterChange={onSearchEnd}
                        />
                        {duration ? minSec(Math.round(duration)) : "00:00"}
                    </div>
                </div>
                <div className="soundDiv">

                    {iconstate &&
                        < SoundOutlined onClick={() => icontwofuncmute()} />

                    }{!iconstate &&
                        <CloseOutlined onClick={() => icontwofuncunmute()} />
                    }


                    <Slider
                        className="volume"
                        defaultValue={100}
                        tooltipVisible={false}
                        onChange={(value) => voltwofunc(value)}
                    />
                </div>
            </div>

        </>
    );
};

export default Player;