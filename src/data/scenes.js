import { effects } from "../enums/effectEnums";
import {
  rainEffect,
  chatterEffect,
  natureEffect,
  birdsChirppingEffect,
  cityTrafficEffect,
} from "../imports/effects";

export const scenes = [
  {
    id: 0,
    name: "Girl in Cafe",
    image: "src/assets/scenes/girl-in-cafe_pic.png",
    video: "src/assets/scenes/girl-in-cafe_vid.mp4",
    sounds: [
      { sound: effects.rain, soundPath: rainEffect },
      { sound: effects.chatter, soundPath: chatterEffect },
      { sound: effects.nature, soundPath: natureEffect },
    ],
    fontFamily: "Lobster Two",
  },
  {
    id: 1,
    name: "Neighborhood Cafe",
    image: "src/assets/scenes/neighborhood-cafe_pic.png",
    video: "src/assets/scenes/neighborhood-cafe_vid.mp4",
    sounds: [
      { sound: effects.rain, soundPath: rainEffect },
      { sound: effects.chatter, soundPath: chatterEffect },
      { sound: effects.nature, soundPath: natureEffect },
    ],
    fontFamily: "Signika",
  },
  {
    id: 2,
    name: "Cozy Bedroom",
    image: "src/assets/scenes/cozy-bedroom_pic.png",
    video: "src/assets/scenes/cozy-bedroom_vid.mp4",
    sounds: [
      { sound: effects.birdsChirpping, soundPath: birdsChirppingEffect },
      { sound: effects.cityTraffic, soundPath: cityTrafficEffect },
      { sound: effects.rain, soundPath: rainEffect },
    ],
    fontFamily: "Patrick Hand",
  },
];
