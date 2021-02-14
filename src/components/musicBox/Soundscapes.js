import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { createAudioElement, soundOptions } from "./../../components/musicBox/musicUtils";
import { changeSoundscapeTrack } from "./../../containers/taskBoard/taskBoardSlice";

const SoundscapesContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #000;
`;

const SoundscapesDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 70%;
    background-color: #df15ad;
    p {
        margin: 0;
    }
`;

const SoundOptionsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
    background-color: #f8faaa;
`;

const SoundOptionsInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #b16afa;
    margin: 0 5px;
    img {
        width: 40px;
        border: ${(p) => (p.isSelectedSound ? "2px dashed orange" : "none")};
    }
    p {
        margin: 0;
    }
`;

const SoundVolumeControl = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #cad1ff;
    height: 20%;
`;


export function Soundscapes() {
    const soundscape = useSelector((s) => s.tasks.soundscape);
    const dispatch = useDispatch();

    const [soundscapeAudioElement, setSoundscapeAudioElement] = useState(undefined);
    console.log("this is the state rn:", soundscapeAudioElement)
    useEffect(() => {
        console.log("state just changed to: ", soundscapeAudioElement);
    }, [soundscapeAudioElement]);

    if (soundscape.isPlaying) {
        if (soundscapeAudioElement !== undefined) {
            console.log(soundscapeAudioElement,"---playing");
            soundscapeAudioElement.play();
        } else {
            console.log("current state is: ",soundscapeAudioElement,"---calling to create element");
            let x = (createAudioElement(soundscape.track));
            console.log(x,"---will be set to state");
            setSoundscapeAudioElement(state=>{
                console.log("state before setting: ",state)
                console.log("being set in state-->",x);
                return x
            });
        }
    } else if (soundscapeAudioElement !== undefined) {
        console.log(soundscapeAudioElement,"---pausing");
        soundscapeAudioElement.pause();
    }

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
                            <p>{soundOptions[i].label}</p>
                        </SoundOptionsInput>
                    ))}
                </SoundOptionsDiv>
            </SoundscapesDiv>
            <SoundVolumeControl>here is volume bar</SoundVolumeControl>
        </SoundscapesContainer>
    );
}
