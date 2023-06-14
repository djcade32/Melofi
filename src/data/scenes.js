import { effects } from "../enums/effectEnums";
import {
  rainEffect,
  chatterEffect,
  natureEffect,
  birdsChirppingEffect,
  cityTrafficEffect,
} from "../imports/effects";
import { cozyBedroom, girlInCafe, neighborhoodCafe } from "../imports/scenes";

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
    fontFamily: "Lobster Two",
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
    fontFamily: "Signika",
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
    fontFamily: "Patrick Hand",
  },
];
