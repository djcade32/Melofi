import { effects } from "../enums/effectEnums";

import {
  cityStudio,
  cozyBedroom,
  girlInCafe,
  neighborhoodCafe,
  musicRoom,
  neonCity,
  serenityCabin,
} from "../imports/scenes";
import { SOUNDS } from "./sounds";

export const scenes = [
  {
    id: 0,
    name: "Girl in Cafe",
    image: girlInCafe.pic,
    video: girlInCafe.vid,
    sounds: [SOUNDS[effects.rain], SOUNDS[effects.chatter], SOUNDS[effects.nature]],
    fontFamily: "var(--font-lobster-two)",
  },
  {
    id: 1,
    name: "Neighborhood Cafe",
    image: neighborhoodCafe.pic,
    video: neighborhoodCafe.vid,
    sounds: [SOUNDS[effects.rain], SOUNDS[effects.chatter], SOUNDS[effects.nature]],
    fontFamily: "var(--font-signika)",
  },
  {
    id: 2,
    name: "Cozy Bedroom",
    image: cozyBedroom.pic,
    video: cozyBedroom.vid,
    sounds: [SOUNDS[effects.birdsChirping], SOUNDS[effects.cityTraffic], SOUNDS[effects.rain]],
    fontFamily: "var(--font-patrick-hand)",
  },
  {
    id: 3,
    name: "City Studio",
    image: cityStudio.pic,
    video: cityStudio.vid,
    sounds: [SOUNDS[effects.thunder], SOUNDS[effects.cityTraffic], SOUNDS[effects.stormyNight]],
    fontFamily: "var(--font-cardo)",
  },
  {
    id: 4,
    name: "Music Room",
    image: musicRoom.pic,
    video: musicRoom.vid,
    sounds: [SOUNDS[effects.birdsChirping], SOUNDS[effects.nature], SOUNDS[effects.fan]],
    fontFamily: "Lobster Two",
  },
  {
    id: 5,
    name: "Neon City",
    image: neonCity.pic,
    video: neonCity.vid,
    sounds: [SOUNDS[effects.cityTraffic], SOUNDS[effects.ambience], SOUNDS[effects.stormyNight]],
    fontFamily: "Bruno Ace",
  },
  {
    id: 6,
    name: "Serenity Cabin",
    image: serenityCabin.pic,
    video: serenityCabin.vid,
    sounds: [SOUNDS[effects.birdsChirping], SOUNDS[effects.nature], SOUNDS[effects.water]],
    fontFamily: "var(--font-cardo)",
  },
];
