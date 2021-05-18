import { useState, useEffect, useRef, useContext } from "react";
import { textContext } from "../context/TextContext";
import useKeyPress from "../hooks/usePressKey";
import useTimer from "../hooks/useTimer";
import Buttons from "./Buttons";
import Form from "./Form";
import Keyboard from "./Keyboard";
import Modal from "./Modal";
import Stats from "./Stats";

const Text = () => {
  const [index, setIndex] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [btnText, setBtnText] = useState("Начать");
  const [textLength, setTextLength] = useState(0);
  const [pressedKey, setPressedKey] = useState("");

  // Stats state
  const [pressesCount, setPressesCount] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  //   Timer state
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [isFirstPress, setIsFirstPress] = useState(true);

  const spans = useRef(null);

  const { text } = useContext(textContext);

  let spanIndex = -1;

  const getTextLength = () => {
    let textLength = 0;
    if (text) {
      text.forEach((paragraph) => {
        textLength += paragraph.length;
      });
    }

    return textLength;
  };

  const calculateAccuracy = () => {
    const oneSymbolWeight = Math.ceil(100 / textLength);
    if (accuracy < 0 + oneSymbolWeight) {
      setAccuracy(0);
      return;
    }
    setAccuracy(accuracy - oneSymbolWeight);
  };

  const checkWhenTyping = (pressedKey, currentSpan) => {
    if (currentSpan.innerText.toLowerCase() === pressedKey) {
      currentSpan.classList.remove("current");
      if (currentSpan.nextSibling) {
        currentSpan.nextSibling.classList.add("current");
      }
      currentSpan.classList.remove("red");
      currentSpan.classList.add("green");
      setIndex(index + 1);

      if (index === textLength - 1) {
        setIsOver(true);
        setStartTimer(false);
      }
      return;
    }
    currentSpan.classList.remove("green");
    currentSpan.classList.add("red");
    calculateAccuracy();
  };

  // Events
  const handleClickAgainBtn = () => {
    setIsOver(false);
    setStartTimer(false);
    setIsFirstPress(true);
    setIndex(0);
    setPressesCount(0);
    setSpeed(0);
    setAccuracy(100);
    setTime(0);
    setBtnText("Начать");

    spans.current.querySelectorAll("span").forEach((span) => {
      span.classList.remove("green") || span.classList.remove("red");
      span.classList.remove("current");
    });
  };

  const handleClickStartBtn = (e) => {
    setStartTimer(true);
    setBtnText("Печатайте!");
    spans.current.querySelector("span[id='0']").classList.add("current");
    e.target.blur();
  };

  //  Effects
  useKeyPress(startTimer, (key) => {
    setPressesCount(pressesCount + 1);

    if (isFirstPress) {
      setStartTimer(true);
      setIsFirstPress(false);
    }

    const pressedChar = key.toLowerCase();
    setPressedKey(pressedChar);
    const currentSpan = spans.current.querySelector(`span[id="${index}"]`);

    checkWhenTyping(key, currentSpan);
  });

  useTimer(startTimer, time, pressesCount, setTime, setSpeed);

  useEffect(() => {
    let textLength = getTextLength();
    setTextLength(textLength);
  }, [text]);

  // Render

  return (
    <main>
      <Form
        setIsOver={setIsOver}
        setStartTimer={setStartTimer}
        setIsFirstPress={setIsFirstPress}
        setIndex={setIndex}
        setPressesCount={setPressesCount}
        setSpeed={setSpeed}
        setAccuracy={setAccuracy}
        setTime={setTime}
        setBtnText={setBtnText}
        spans={spans}
      />

      <Stats time={time} speed={speed} accuracy={accuracy} />

      {text && textLength ? (
        <div id="text">
          <div className="spans" ref={spans}>
            {text.map((paragraph, index) => (
              <p key={index + "p"}>
                {paragraph.split("").map((char) => {
                  spanIndex++;
                  return (
                    <span key={spanIndex} id={spanIndex}>
                      {char}
                    </span>
                  );
                })}
              </p>
            ))}
          </div>

          <Buttons
            isOver={isOver}
            handleClickStartBtn={handleClickStartBtn}
            handleClickAgainBtn={handleClickAgainBtn}
            btnText={btnText}
            isFirstPress={isFirstPress}
          />
        </div>
      ) : (
        <div id="text">Ожидаем текст...</div>
      )}

      <Keyboard pressedKey={pressedKey} />

      {isOver ? (
        <Modal
          speed={speed}
          time={time}
          accuracy={accuracy}
          handleClickAgainBtn={handleClickAgainBtn}
        />
      ) : null}
    </main>
  );
};

export default Text;
