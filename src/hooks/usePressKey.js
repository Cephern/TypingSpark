import { useState, useEffect } from "react";

const useKeyPress = (startTimer, cb) => {
  const [pressedKey, setPressedKey] = useState();

  useEffect(() => {
    const handleKeyPress = ({ key }) => {
      setPressedKey(key);
      cb && cb(key);
    };

    if (startTimer) {
      document.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  return pressedKey;
};

export default useKeyPress;
