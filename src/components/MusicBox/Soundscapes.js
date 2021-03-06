import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { soundOptions, generateAudioElement, muteOption } from "./musicUtils";
import { changeSoundscapeTrack } from "./../../containers/taskBoard/taskBoardSlice";
import { MusicVolumeControl } from "./MusicVolumeControl";
import { GoUnmute, GoMute } from "react-icons/go";

const SoundscapesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    /* transition: box-shadow 0.2s ease-in-out,transform 0.2s ease-in-out ;
    &:hover {
        transform: scale(1.02);
        -webkit-box-shadow: 0 2px 10px rgba(166, 173, 201, 0.8);
        box-shadow: 0 2px 10px rgba(166, 173, 201, 0.8);
    } */
`;

const SoundscapesDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 70%;
    /* background-color: orange; */
    color: #fabb18;
`;

const SoundscapesHeader = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 90%;
    position: relative;
    p {
        margin: 0;
        font-weight: bold;
    }
    svg {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.4em;
        margin-left: auto;
    }
    svg#unmuted {
        cursor: pointer;
    }
`;

const SoundOptionsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 85%;
    /* background-color: #f8faaa; */
`;

const SoundOptionsInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    /* background-color: #b16afa; */
    height: 80%;
    margin: 0 5px;
    img {
        width: 40px;
        cursor: pointer;
        transition: transform 0.2s;
        &:hover {
            transform: scale(1.3);
        }
    }
    span {
        margin: 0;
        font-size: 0.8em;
        font-weight: bold;
        color: ${(p) => (p.isSelectedSound ? "#FABB18" : p.theme.primaryText)};
        cursor: pointer;
    }
`;

const SoundVolumeControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 15%;
`;

export function Soundscapes() {
    const soundscape = useSelector((s) => s.tasks.soundscape);
    const dispatch = useDispatch();

    const [soundscapeAudioElement, setSoundscapeAudioElement] = useState(() => generateAudioElement(soundscape.track, soundscape.volume));

    // ---- danger zone: don't change without full surety , this code is prone to issues ---///

    useEffect(() => {
        soundscapeAudioElement.src = soundscape.track !== "mute" ? soundOptions[soundscape.track].src : muteOption.src;
        return () => soundscapeAudioElement.pause();
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
                <SoundscapesHeader>
                    <p>Soundscapes</p>
                    {soundscape.track === "mute" ? <GoMute id="muted" /> : <GoUnmute id="unmuted" onClick={() => dispatch(changeSoundscapeTrack("mute"))} />}
                </SoundscapesHeader>
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
                <MusicVolumeControl isDisabled={soundscape.track==="mute"}/>
            </SoundVolumeControl>
        </SoundscapesContainer>
    );
}
