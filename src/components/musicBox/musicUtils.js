import nature from "./../../sounds/ding.mp3"
import piano from "./../../sounds/sample5MB.mp3"
import none from "./../../sounds/none.mp3"
import ImgNature from "./../../images/rain.svg";
import ImgPiano from "./../../images/piano.svg";
import ImgNone from "./../../images/none.svg"

export const soundOptions ={
    nature:{
        src:nature,
        img:ImgNature,
        label:"Nature",
    },
    piano:{
        src:piano,
        img:ImgPiano,
        label:"Piano",
    },
    none:{
        src:none,
        img:ImgNone,
        label:"None",
    },
}

export function createAudioElement(soundname){
    let soundElement = new Audio(soundOptions[soundname].src);
    soundElement.setAttribute('id',Math.random());
    soundElement.loop = true;
    soundElement.volume=0.5;
    console.log('created new audio element' , soundElement)
    return soundElement;
}



