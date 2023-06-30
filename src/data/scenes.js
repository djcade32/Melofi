import { effects } from "../enums/effectEnums";
import {
  rainEffect,
  chatterEffect,
  natureEffect,
  birdsChirppingEffect,
  cityTrafficEffect,
  thunderEffect,
  stormyNightEffect,
} from "../imports/effects";
import { cityStudio, cozyBedroom, girlInCafe, neighborhoodCafe } from "../imports/scenes";

export const scenes = [
  {
    id: 0,
    name: "Girl in Cafe",
    image: girlInCafe.pic,
    video: girlInCafe.vid,
    sounds: [
      { sound: effects.rain, soundPath: rainEffect },
      { sound: effects.chatter, soundPath: chatterEffect },
      { sound: effects.nature, soundPath: natureEffect },
    ],
    fontFamily: "var(--font-lobster-two)",
  },
  {
    id: 1,
    name: "Neighborhood Cafe",
    image: neighborhoodCafe.pic,
    video: neighborhoodCafe.vid,
    sounds: [
      { sound: effects.rain, soundPath: rainEffect },
      { sound: effects.chatter, soundPath: chatterEffect },
      { sound: effects.nature, soundPath: natureEffect },
    ],
    fontFamily: "var(--font-signika)",
  },
  {
    id: 2,
    name: "Cozy Bedroom",
    image: cozyBedroom.pic,
    video: cozyBedroom.vid,
    sounds: [
      { sound: effects.birdsChirpping, soundPath: birdsChirppingEffect },
      { sound: effects.cityTraffic, soundPath: cityTrafficEffect },
      { sound: effects.rain, soundPath: rainEffect },
    ],
    fontFamily: "var(--font-patrick-hand)",
  },
  {
    id: 3,
    name: "City Studio",
    image: cityStudio.pic,
    video: cityStudio.vid,
    sounds: [
      { sound: effects.thunder, soundPath: thunderEffect },
      { sound: effects.cityTraffic, soundPath: cityTrafficEffect },
      { sound: effects.stormyNight, soundPath: stormyNightEffect },
    ],
    fontFamily: "var(--font-cardo)",
  },
];
