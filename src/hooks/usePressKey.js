import { useEffect } from "react";

const useKeyPress = (startTimer, cb) => {
  useEffect(() => {
    const handleKeyPress = ({ key }) => {
      cb && cb(key);
    };

    if (startTimer) {
      document.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });
};

export default useKeyPress;
