import bell from "./../../sounds/bell.mp3";
import piano from "./../../sounds/piano.mp3";
import river from "./../../sounds/river.mp3";
import forest from "./../../sounds/forest.mp3";
import alphaWave from "./../../sounds/alphaWave.mp3";
import ImgBell from "./../../images/bell.svg";
import ImgPiano from "./../../images/piano.svg";
import ImgAlphaWave from "./../../images/alphaWave.svg";
import ImgRiver from "./../../images/river.svg";
import ImgForest from "./../../images/forest.svg";

export const soundOptions = {
    alphaWave: {
        src: alphaWave,
        img: ImgAlphaWave,
        label: "Waves",
    },
    piano: {
        src: piano,
        img: ImgPiano,
        label: "Piano",
    },
    bell: {
        src: bell,
        img: ImgBell,
        label: "Bell",
    },
    Forest: {
        src: forest,
        img: ImgForest,
        label: "Forest",
    },
    river: {
        src: river,
        img: ImgRiver,
        label: "River",
    },
};

export function generateAudioElement(trackname) {
    let audioElement = new Audio(soundOptions[trackname].src);
    audioElement.loop = true;
    return audioElement;
}
