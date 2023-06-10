import { createContext, useState, useContext } from "react";

const AppContext = createContext({});

const AppContextProvider = (props) => {
  const [musicVolume, setMusicVolume] = useState(35);

  return (
    <AppContext.Provider
      value={{
        musicVolume,
        setMusicVolume,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);
