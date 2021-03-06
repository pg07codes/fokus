import bell from "./../../sounds/bell.mp3";
import piano from "./../../sounds/piano.mp3";
import river from "./../../sounds/river.mp3";
import forest from "./../../sounds/forest.mp3";
import calm from "./../../sounds/calm.mp3";

import mute from "./../../sounds/mute.mp3";

import ImgBell from "./../../images/bell.svg";
import ImgPiano from "./../../images/piano.svg";
import ImgCalm from "./../../images/calm.svg";
import ImgRiver from "./../../images/river.svg";
import ImgForest from "./../../images/forest.svg";

export const muteOption = {
    src: mute,
    img: null,
    label: "Mute",
};

export const soundOptions = {
    calm: {
        src: calm,
        img: ImgCalm,
        label: "Calm",
    },
    forest: {
        src: forest,
        img: ImgForest,
        label: "Forest",
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
    bell: {
        src: bell,
        img: ImgBell,
        label: "Bell",
    },
};

export function generateAudioElement(trackname) {
    let audioElement = trackname !== "mute" ? new Audio(soundOptions[trackname].src) : new Audio(muteOption.src);
    audioElement.loop = true;
    return audioElement;
}
