import { useContext } from "react";
import { textContext } from "../context/TextContext";

const Form = ({
  setIsOver,
  setStartTimer,
  setIsFirstPress,
  setIndex,
  setPressesCount,
  setSpeed,
  setAccuracy,
  setTime,
  setBtnText,
  spans,
}) => {
  const { setType, setParas, fetchText } = useContext(textContext);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleParasChange = (e) => {
    setParas(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchText();

    setIsOver(false);
    setStartTimer(false);
    setIsFirstPress(true);
    setIndex(0);
    setPressesCount(0);
    setSpeed(0);
    setAccuracy(100);
    setTime(0);
    setBtnText("Начать");

    if (spans.current) {
      spans.current.querySelectorAll("span").forEach((span) => {
        span.classList.remove("green") || span.classList.remove("red");
        span.classList.remove("current");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="type">Тип текста</label>
        <select onChange={handleTypeChange} name="type" id="typeSelect">
          <option value="all-meat">All meat</option>
          <option value="meat-and-filler">Meat with lorem ipsum filler</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="paras">Параграфы</label>
        <select name="paras" id="parasSelect" onChange={handleParasChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <button>Получить текст</button>
    </form>
  );
};

export default Form;
