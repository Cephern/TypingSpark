const Buttons = ({
  isOver,
  handleClickAgainBtn,
  handleClickStartBtn,
  btnText,
  isFirstPress,
}) => {
  return (
    <div id="btnDiv">
      {isOver ? (
        <button disabled>Все готово!</button>
      ) : (
        <button
          id="charInput"
          autoFocus
          onClick={handleClickStartBtn}
          disabled={!isFirstPress}
        >
          {btnText}
        </button>
      )}

      <button id="againBtn" onClick={handleClickAgainBtn}>
        Заново
      </button>
    </div>
  );
};

export default Buttons;
