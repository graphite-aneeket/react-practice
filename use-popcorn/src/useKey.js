import { useEffect } from "react";

export function useKey(callback) {
  useEffect(() => {
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [callback]);
}
