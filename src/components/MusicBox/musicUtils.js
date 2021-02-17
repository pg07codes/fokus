import rain from "./../../sounds/rain.mp3";
import piano from "./../../sounds/piano.mp3";
import river from "./../../sounds/river.mp3";
import forest from "./../../sounds/forest.mp3";
import none from "./../../sounds/none.mp3";
import ImgRain from "./../../images/rain.svg";
import ImgPiano from "./../../images/piano.svg";
import ImgNone from "./../../images/none.svg";
import ImgRiver from "./../../images/river.svg";
import ImgForest from "./../../images/forest.svg";

export const soundOptions = {
    rain: {
        src: rain,
        img: ImgRain,
        label: "Rain",
    },
    piano: {
        src: piano,
        img: ImgPiano,
        label: "Piano",
    },
    river: {
        src: river,
        img: ImgRiver,
        label: "River",
    },
    Forest: {
        src: forest,
        img: ImgForest,
        label: "Forest",
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
