import { effects } from "../enums/effectEnums";
import {
  rainEffect,
  chatterEffect,
  natureEffect,
  birdsChirppingEffect,
  cityTrafficEffect,
  thunderEffect,
  stormyNightEffect,
  fanEffect,
  ambienceEffect,
  waterEffect,
} from "../imports/effects";
import {
  cityStudio,
  cozyBedroom,
  girlInCafe,
  neighborhoodCafe,
  musicRoom,
  neonCity,
  serenityCabin,
} from "../imports/scenes";

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
  {
    id: 4,
    name: "Music Room",
    image: musicRoom.pic,
    video: musicRoom.vid,
    sounds: [
      { sound: effects.birdsChirpping, soundPath: birdsChirppingEffect },
      { sound: effects.nature, soundPath: natureEffect },
      { sound: effects.fan, soundPath: fanEffect },
    ],
    fontFamily: "Lobster Two",
  },
  {
    id: 5,
    name: "Neon City",
    image: neonCity.pic,
    video: neonCity.vid,
    sounds: [
      { sound: effects.cityTraffic, soundPath: cityTrafficEffect },
      { sound: effects.ambience, soundPath: ambienceEffect },
      { sound: effects.stormyNight, soundPath: stormyNightEffect },
    ],
    fontFamily: "Bruno Ace",
  },
  {
    id: 6,
    name: "Serenity Cabin",
    image: serenityCabin.pic,
    video: serenityCabin.vid,
    sounds: [
      { sound: effects.birdsChirpping, soundPath: birdsChirppingEffect },
      { sound: effects.nature, soundPath: natureEffect },
      { sound: effects.water, soundPath: waterEffect },
    ],
    fontFamily: "var(--font-cardo)",
  },
];
