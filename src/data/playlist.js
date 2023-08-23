import { getIcon } from "../helpers/icons";
import { Study, Relax, Sleepy } from "./songs";

const playlistIconConfig = {
  size: 30,
  color: "var(--color-secondary)",
};

const playlist = [
  {
    id: 0,
    icon: getIcon("Study", playlistIconConfig),
    label: "Study",
    spotifyPlaylistId: "6JMt2yxWecgTXAzkDW0TrZ",
    melofiPlaylist: Study,
  },
  {
    id: 1,
    icon: getIcon("Relax", playlistIconConfig),
    label: "Relax",
    spotifyPlaylistId: "1OyBZa9DEbKT6ye47QDQgR",
    melofiPlaylist: Relax,
  },
  {
    id: 2,
    icon: getIcon("Sleepy", playlistIconConfig),
    label: "Sleepy",
    spotifyPlaylistId: "1rg4Z5eRMGgD6k58cNiaL6",
    melofiPlaylist: Sleepy,
  },
];

export default playlist;
