import { effects } from "../enums/effectEnums";
import {
  rainEffect,
  chatterEffect,
  natureEffect,
  birdsChirpingEffect,
  cityTrafficEffect,
  stormyNightEffect,
  fanEffect,
  whiteNoiseEffect,
  thunderEffect,
  ambienceEffect,
  oceanEffect,
  waterEffect,
} from "../imports/effects";

export const SOUNDS = {
  [effects.rain]: {
    sound: effects.rain,
    soundPath: rainEffect,
    soundVolume: 0,
  },
  [effects.chatter]: {
    sound: effects.chatter,
    soundPath: chatterEffect,
    soundVolume: 0,
  },
  [effects.nature]: {
    sound: effects.nature,
    soundPath: natureEffect,
    soundVolume: 0,
  },
  [effects.birdsChirping]: {
    sound: effects.birdsChirping,
    soundPath: birdsChirpingEffect,
    soundVolume: 0,
  },
  [effects.stormyNight]: {
    sound: effects.stormyNight,
    soundPath: stormyNightEffect,
    soundVolume: 0,
  },
  [effects.cityTraffic]: {
    sound: effects.cityTraffic,
    soundPath: cityTrafficEffect,
    soundVolume: 0,
  },
  [effects.fan]: {
    sound: effects.fan,
    soundPath: fanEffect,
    soundVolume: 0,
  },
  [effects.whiteNoise]: {
    sound: effects.whiteNoise,
    soundPath: whiteNoiseEffect,
    soundVolume: 0,
  },
  [effects.thunder]: {
    sound: effects.thunder,
    soundPath: thunderEffect,
    soundVolume: 0,
  },
  [effects.ambience]: {
    sound: effects.ambience,
    soundPath: ambienceEffect,
    soundVolume: 0,
  },
  [effects.ocean]: {
    sound: effects.ocean,
    soundPath: oceanEffect,
    soundVolume: 0,
  },
  [effects.water]: {
    sound: effects.water,
    soundPath: waterEffect,
    soundVolume: 0,
  },
};
