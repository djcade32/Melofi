import { effects } from "../enums/effectEnums";
import {
  BsCloudRain,
  HiOutlineChatBubbleLeftRight,
  BsTree,
  SlSocialTwitter,
  HiOutlineBuildingOffice2,
  WiNightAltStormShowers,
  LuFan,
  CgEditNoise,
  IoThunderstormOutline,
  LuWaves,
  GiBigWave,
  MdOutlineWaterDrop,
  IoBookSharp,
  PiMoonFill,
  FaHeadphones,
} from "../imports/icons";

const getIcon = (iconName, props) => {
  switch (iconName) {
    case effects.rain:
      return <BsCloudRain key={iconName} {...props} />;

    case effects.chatter:
      return <HiOutlineChatBubbleLeftRight key={iconName} {...props} />;

    case effects.nature:
      return <BsTree key={iconName} {...props} />;

    case effects.birdsChirping:
      return <SlSocialTwitter key={iconName} {...props} />;

    case effects.cityTraffic:
      return <HiOutlineBuildingOffice2 key={iconName} {...props} />;

    case effects.stormyNight:
      return <WiNightAltStormShowers key={iconName} {...props} />;

    case effects.fan:
      return <LuFan key={iconName} {...props} />;

    case effects.whiteNoise:
      return <LuWaves key={iconName} {...props} />;

    case effects.thunder:
      return <IoThunderstormOutline key={iconName} {...props} />;

    case effects.ambience:
      return <CgEditNoise key={iconName} {...props} />;

    case effects.ocean:
      return <GiBigWave key={iconName} {...props} />;

    case effects.water:
      return <MdOutlineWaterDrop key={iconName} {...props} />;

    case "Study":
      return <IoBookSharp key={iconName} {...props} />;

    case "Relax":
      return <FaHeadphones key={iconName} {...props} />;

    case "Sleepy":
      return <PiMoonFill key={iconName} {...props} />;

    default:
      break;
  }
};

export { getIcon };
