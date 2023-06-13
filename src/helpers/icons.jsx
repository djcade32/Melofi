import { effects } from "../enums/effectEnums";
import {
  BsCloudRain,
  HiOutlineChatBubbleLeftRight,
  BsTree,
  SlSocialTwitter,
  HiOutlineBuildingOffice2,
} from "../imports/icons";

const getIcon = (iconName, props) => {
  switch (iconName) {
    case effects.rain:
      return <BsCloudRain key={iconName} {...props} />;

    case effects.chatter:
      return <HiOutlineChatBubbleLeftRight key={iconName} {...props} />;

    case effects.nature:
      return <BsTree key={iconName} {...props} />;

    case effects.birdsChirpping:
      return <SlSocialTwitter key={iconName} {...props} />;

    case effects.cityTraffic:
      return <HiOutlineBuildingOffice2 key={iconName} {...props} />;

    default:
      break;
  }
};

export { getIcon };
