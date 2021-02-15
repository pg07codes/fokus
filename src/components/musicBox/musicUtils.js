import nature from "./../../sounds/ding.mp3";
import piano from "./../../sounds/sample5MB.mp3";
import none from "./../../sounds/none.mp3";
import ImgNature from "./../../images/rain.svg";
import ImgPiano from "./../../images/piano.svg";
import ImgNone from "./../../images/none.svg";

export const soundOptions = {
    nature: {
        src: nature,
        img: ImgNature,
        label: "Nature",
    },
    piano: {
        src: piano,
        img: ImgPiano,
        label: "Piano",
    },
    none: {
        src: none,
        img: ImgNone,
        label: "None",
    },
};

export function generateAudioElement(trackname) {
    let audioElement = new Audio(soundOptions[trackname].src);
    audioElement.loop = true;
    return audioElement;
}
