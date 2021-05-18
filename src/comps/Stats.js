const Stats = ({ speed, time, accuracy }) => {
  return (
    <div id="stats">
      <div className="timer">
        <p className="speed">{speed}</p>
        <p>Скорость печати, знаков/мин </p>
      </div>
      <div className="timer">
        <div className="accDiv">
          <span className="accuracy">{accuracy}</span>
          <span>%</span>
        </div>
        <p>Ваша точность</p>
      </div>
      <p>
        Вы печатаетe <span>{time}</span>{" "}
        {time === 0
          ? "секунд"
          : time === 1
          ? "секунду"
          : time <= 4
          ? "секунды"
          : "секунд"}
      </p>
    </div>
  );
};

export default Stats;
