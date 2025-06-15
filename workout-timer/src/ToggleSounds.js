import React from "react";
import { useSound } from "./contexts/SoundContext";

const ToggleSounds = function ToggleSounds() {
  const { allowSound, setAllowSound } = useSound();

  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
};

export default React.memo(ToggleSounds);

