import { useRef, useEffect } from "react";

const Keyboard = ({ pressedKey }) => {
  const keys = [
    ["!", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
  ];

  const keyboard = useRef(null);

  useEffect(() => {
    if (pressedKey) {
      let isIncludeKey = false;
      keys.forEach((keyRow) =>
        keyRow.includes(pressedKey) ? (isIncludeKey = true) : null
      );
      if (isIncludeKey) {
        keyboard.current
          .querySelectorAll("span")
          .forEach((span) => span.classList.remove("pressed"));
        let currentKeyboardSpan = keyboard.current.querySelector(
          `span[id="${"key_" + pressedKey}"]`
        );
        currentKeyboardSpan.classList.add("pressed");
      }
    }
  }, [pressedKey]);

  return (
    <div id="keyboard" ref={keyboard}>
      {keys.map((keyRow, index) => (
        <div className="row" key={index + "keyRow"}>
          {keyRow.map((char, index) => (
            <span key={index + "char"} id={"key_" + char}>
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
