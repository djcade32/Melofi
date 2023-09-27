import { effects } from "../enums/effectEnums";

import {
  cityStudio,
  cozyBedroom,
  girlInCafe,
  neighborhoodCafe,
  musicRoom,
  neonCity,
  serenityCabin,
  girlAtDusk,
  cozyRainNight,
  neonNightMarket,
  modernLivingRoom,
  theOffice,
  pastelParadise,
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
    premium: false,
  },
  {
    id: 1,
    name: "Neighborhood Cafe",
    image: neighborhoodCafe.pic,
    video: neighborhoodCafe.vid,
    sounds: [SOUNDS[effects.rain], SOUNDS[effects.chatter], SOUNDS[effects.nature]],
    fontFamily: "var(--font-signika)",
    premium: false,
  },
  {
    id: 2,
    name: "Cozy Bedroom",
    image: cozyBedroom.pic,
    video: cozyBedroom.vid,
    sounds: [SOUNDS[effects.birdsChirping], SOUNDS[effects.cityTraffic], SOUNDS[effects.rain]],
    fontFamily: "var(--font-patrick-hand)",
    premium: false,
  },
  {
    id: 3,
    name: "City Studio",
    image: cityStudio.pic,
    video: cityStudio.vid,
    sounds: [SOUNDS[effects.thunder], SOUNDS[effects.cityTraffic], SOUNDS[effects.stormyNight]],
    fontFamily: "var(--font-cardo)",
    premium: false,
  },
  {
    id: 4,
    name: "Music Room",
    image: musicRoom.pic,
    video: musicRoom.vid,
    sounds: [SOUNDS[effects.birdsChirping], SOUNDS[effects.nature], SOUNDS[effects.fan]],
    fontFamily: "Lobster Two",
    premium: false,
  },
  {
    id: 5,
    name: "Neon City",
    image: neonCity.pic,
    video: neonCity.vid,
    sounds: [SOUNDS[effects.cityTraffic], SOUNDS[effects.ambience], SOUNDS[effects.stormyNight]],
    fontFamily: "Bruno Ace",
    premium: false,
  },
  {
    id: 6,
    name: "Serenity Cabin",
    image: serenityCabin.pic,
    video: serenityCabin.vid,
    sounds: [SOUNDS[effects.birdsChirping], SOUNDS[effects.nature], SOUNDS[effects.water]],
    fontFamily: "var(--font-cardo)",
    premium: false,
  },
  {
    id: 7,
    name: "Girl At Dusk",
    image: girlAtDusk.pic,
    video: girlAtDusk.vid,
    sounds: [SOUNDS[effects.ocean], SOUNDS[effects.chatter], SOUNDS[effects.keyboard]],
    fontFamily: "var(--font-lobster-two)",
    premium: true,
  },
  {
    id: 8,
    name: "Cozy Rain Night",
    image: cozyRainNight.pic,
    video: cozyRainNight.vid,
    sounds: [SOUNDS[effects.thunder], SOUNDS[effects.rain], SOUNDS[effects.fan]],
    fontFamily: "var(--font-cardo)",
    premium: true,
  },
  {
    id: 9,
    name: "Neon Night Market",
    image: neonNightMarket.pic,
    video: neonNightMarket.vid,
    sounds: [SOUNDS[effects.stormyNight], SOUNDS[effects.train], SOUNDS[effects.cityTraffic]],
    fontFamily: "Bruno Ace",
    premium: true,
  },
  {
    id: 10,
    name: "Modern Living Room",
    image: modernLivingRoom.pic,
    video: modernLivingRoom.vid,
    sounds: [SOUNDS[effects.rain], SOUNDS[effects.nature], SOUNDS[effects.fireplace]],
    fontFamily: "Bruno Ace",
    premium: true,
  },
  {
    id: 11,
    name: "The Office",
    image: theOffice.pic,
    video: theOffice.vid,
    sounds: [SOUNDS[effects.fan], SOUNDS[effects.morning], SOUNDS[effects.clock]],
    fontFamily: "var(--font-signika)",
    premium: true,
  },
  {
    id: 12,
    name: "Pastel Paradise",
    image: pastelParadise.pic,
    video: pastelParadise.vid,
    sounds: [SOUNDS[effects.fan], SOUNDS[effects.morning], SOUNDS[effects.keyboard]],
    fontFamily: "Bruno Ace",
    premium: true,
  },
];
