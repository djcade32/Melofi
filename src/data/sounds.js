import { effects } from "../enums/effectEnums";
import {
  rainEffect,
  chatterEffect,
  natureEffect,
  birdsChirppingEffect,
  cityTrafficEffect,
} from "../imports/effects";

export const sounds = [
  {
    sound: effects.rain,
    soundPath: rainEffect,
  },
  {
    sound: effects.chatter,
    soundPath: chatterEffect,
  },
  {
    sound: effects.nature,
    soundPath: natureEffect,
  },
  {
    sound: effects.birdsChirpping,
    soundPath: birdsChirppingEffect,
  },
  {
    sound: effects.cityTraffic,
    soundPath: cityTrafficEffect,
  },
];
