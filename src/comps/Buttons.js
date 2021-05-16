const Buttons = ({
  isOver,
  handleClickAgainBtn,
  handleClickStartBtn,
  btnText,
  isFirstPress,
}) => {
  return (
    <div id="BtnDiv">
      {isOver ? (
        <button disabled>Все готово!</button>
      ) : (
        <button
          id="charInput"
          autoFocus
          type="text"
          onClick={handleClickStartBtn}
          disabled={!isFirstPress}
        >
          {btnText}
        </button>
      )}

      <button onClick={handleClickAgainBtn}>Заново</button>
    </div>
  );
};

export default Buttons;
