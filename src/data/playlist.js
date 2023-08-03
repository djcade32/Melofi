import { getIcon } from "../helpers/icons";
import { PiMaskHappyFill, PiMoonFill, FaHeadphones } from "../imports/icons";
import { Happy, Relax, Sleepy } from "./songs";

const playlistIconConfig = {
  size: 30,
  color: "var(--color-secondary)",
};

const playlist = [
  {
    icon: getIcon("Happy", playlistIconConfig),
    label: "Happy",
    spotifyPlaylistId: "6JMt2yxWecgTXAzkDW0TrZ",
    melofiPlaylist: Happy,
  },
  {
    icon: getIcon("Relax", playlistIconConfig),
    label: "Relax",
    spotifyPlaylistId: "1OyBZa9DEbKT6ye47QDQgR",
    melofiPlaylist: Relax,
  },
  {
    icon: getIcon("Sleepy", playlistIconConfig),
    label: "Sleepy",
    spotifyPlaylistId: "1rg4Z5eRMGgD6k58cNiaL6",
    melofiPlaylist: Sleepy,
  },
];

export default playlist;
