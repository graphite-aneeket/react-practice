import React, { createContext, useContext, useMemo, useState } from "react";

const SoundContext = createContext();

const SoundProvider = ({ children }) => {
  const [allowSound, setAllowSound] = useState(true);

  const value = useMemo(() => {
    return { allowSound, setAllowSound };
  }, [allowSound]);

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
};

const useSound = () => {
  const value = useContext(SoundContext);
  if (value === undefined) {
    throw new Error("useSound is used outside of SoundContext");
  }
  return value;
};

export { useSound, SoundProvider };
