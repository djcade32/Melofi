import { effects } from "../enums/effectEnums";
import {
  rainEffect,
  chatterEffect,
  natureEffect,
  birdsChirppingEffect,
  cityTrafficEffect,
  stormyNightEffect,
  fanEffect,
  whiteNoiseEffect,
  thunderEffect,
  ambienceEffect,
  oceanEffect,
  waterEffect,
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
    sound: effects.stormyNight,
    soundPath: stormyNightEffect,
  },
  {
    sound: effects.cityTraffic,
    soundPath: cityTrafficEffect,
  },
  {
    sound: effects.fan,
    soundPath: fanEffect,
  },
  {
    sound: effects.whiteNoise,
    soundPath: whiteNoiseEffect,
  },
  {
    sound: effects.thunder,
    soundPath: thunderEffect,
  },
  {
    sound: effects.ambience,
    soundPath: ambienceEffect,
  },
  {
    sound: effects.ocean,
    soundPath: oceanEffect,
  },
  {
    sound: effects.water,
    soundPath: waterEffect,
  },
];
