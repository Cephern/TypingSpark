import { useEffect } from "react";

const useTimer = (startTimer, time, pressesCount, setTime, setSpeed) => {
  useEffect(() => {
    let intervalId;
    if (startTimer) {
      intervalId = setInterval(() => {
        setTime(time + 0.5);
        setSpeed(time > 0 ? Math.floor((pressesCount * 60) / time) : 0);
      }, 500);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [time, startTimer]);
};

export default useTimer;
