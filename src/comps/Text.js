import { useState, useRef } from "react";
import useKeyPress from "../hooks/usePressKey";
import useTimer from "../hooks/useTimer";
import Buttons from "./Buttons";
import Modal from "./Modal";
import Stats from "./Stats";

const Text = () => {
  const [index, setIndex] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [btnText, setBtnText] = useState("Начать");

  // Stats state
  const [pressesCount, setPressesCount] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  //   Timer state
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [isFirstPress, setIsFirstPress] = useState(true);

  const spans = useRef(null);

  const text = "Lorem ipsum.";

  const calculateAccuracy = () => {
    const oneSymbolWeight = Math.ceil(100 / text.length);
    if (accuracy < 0 + oneSymbolWeight) {
      setAccuracy(0);
      return;
    }
    setAccuracy(accuracy - oneSymbolWeight);
  };

  const checkWhenTyping = (pressedChar, currentSpan) => {
    if (currentSpan.innerText.toLowerCase() === pressedChar) {
      currentSpan.classList.remove("red");
      currentSpan.classList.add("green");
      setIndex(index + 1);

      if (index === text.length - 1) {
        setIsOver(true);
        setStartTimer(false);
      }
    } else {
      currentSpan.classList.remove("green");
      currentSpan.classList.add("red");
      calculateAccuracy();
    }
  };

  // Events
  const handleClickAgainBtn = () => {
    setIsOver(false);
    setStartTimer(false);
    setIndex(0);
    setPressesCount(0);
    setSpeed(0);
    setAccuracy(100);
    setTime(0);
    setBtnText("Начать");

    spans.current
      .querySelectorAll("span")
      .forEach((span) => span.classList.remove("green" || "red"));
  };

  const handleClickStartBtn = () => {
    setStartTimer(true);
    setBtnText("Печатайте!");
  };

  //  Effects

  useKeyPress(startTimer, (key) => {
    setPressesCount(pressesCount + 1);

    if (isFirstPress) {
      setStartTimer(true);
      setIsFirstPress(false);
    }

    const pressedChar = key.toLowerCase();

    const currentSpan = spans.current.querySelector(`span[id="${index}"]`);

    checkWhenTyping(pressedChar, currentSpan);
  });

  useTimer(startTimer, time, pressesCount, setTime, setSpeed);

  // Render

  return (
    <div id="text">
      <div className="spans" ref={spans}>
        {text.split("").map((char, index) => (
          <span className="init" key={index} id={index}>
            {char}
          </span>
        ))}
      </div>

      <Buttons
        isOver={isOver}
        handleClickStartBtn={handleClickStartBtn}
        handleClickAgainBtn={handleClickAgainBtn}
        btnText={btnText}
      />

      <Stats time={time} speed={speed} accuracy={accuracy} />

      {isOver ? (
        <Modal
          speed={speed}
          time={time}
          accuracy={accuracy}
          handleClickAgainBtn={handleClickAgainBtn}
        />
      ) : null}
    </div>
  );
};

export default Text;
