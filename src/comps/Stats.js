const Stats = ({ speed, time, accuracy }) => {
  return (
    <div id="stats">
      <p>Timer</p>
      <p>Your speed is {speed} symbols/min</p>
      <p>You have been doing it for {time} seconds</p>
      <p>Your accuracy is {accuracy}%</p>
    </div>
  );
};

export default Stats;
