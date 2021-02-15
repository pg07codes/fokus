import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { soundOptions, generateAudioElement } from "./../../components/musicBox/musicUtils";
import { changeSoundscapeTrack } from "./../../containers/taskBoard/taskBoardSlice";
import { MusicVolumeControl } from "./MusicVolumeControl";

const SoundscapesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius:10px;
    /* background-color: #000; */
`;

const SoundscapesDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 70%;
    /* background-color: #df15ad; */
    color:#c1c1d7;
    p {
        margin: 0;
        font-weight:bold;
    }
`;

const SoundOptionsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
    /* background-color: #f8faaa; */
`;

const SoundOptionsInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    /* background-color: #b16afa; */
    height:70%;
    margin: 0 5px;
    color:${(p) => (p.isSelectedSound ? "#0000cd" : "#c1c1d7")};
    img {
        width: 40px;
        margin-bottom:8px;
        border-radius:50%;
        border:${(p) => (p.isSelectedSound ? "3px solid #0000cd" : "none")};
    }
    span {
        margin: 0;
        font-size:0.9em;
        font-weight:bold;
        font-style:italic;
    }
`;

const SoundVolumeControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #cad1ff; */
    width:85%;
    height: 20%;
`;

export function Soundscapes() {
    const soundscape = useSelector((s) => s.tasks.soundscape);
    const dispatch = useDispatch();

    const [soundscapeAudioElement, setSoundscapeAudioElement] = useState(() => generateAudioElement(soundscape.track, soundscape.volume));

    // ---- danger zone: don't change without full surety , this code is prone to issues ---///

    useEffect(() => {
        soundscapeAudioElement.src = soundOptions[soundscape.track].src;
    }, [soundscape.track, soundscapeAudioElement, soundscape.isPlaying]);

    soundscapeAudioElement.volume = soundscape.volume;
    soundscapeAudioElement.addEventListener("canplay", () => {
        if (soundscape.isPlaying) {
            soundscapeAudioElement.play();
        } else {
            soundscapeAudioElement.pause();
        }
    });

    // ---- danger zone: this might be due to my lack of knowledge of useEffect or weird Audio element behaviour ---///

    function isSelectedSound(track) {
        return soundscape.track === track;
    }

    return (
        <SoundscapesContainer>
            <SoundscapesDiv>
                <p>Soundscapes</p>
                <SoundOptionsDiv>
                    {Object.keys(soundOptions).map((i) => (
                        <SoundOptionsInput key={i} onClick={() => dispatch(changeSoundscapeTrack(i))} isSelectedSound={isSelectedSound(i)}>
                            <img src={soundOptions[i].img} alt={i} />
                            <span>{soundOptions[i].label}</span>
                        </SoundOptionsInput>
                    ))}
                </SoundOptionsDiv>
            </SoundscapesDiv>
            <SoundVolumeControl>
                <MusicVolumeControl isDisabled={soundscape.track==="none"}/>
            </SoundVolumeControl>
        </SoundscapesContainer>
    );
}
