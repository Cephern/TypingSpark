const Buttons = ({
  isOver,
  handleClickAgainBtn,
  handleClickStartBtn,
  btnText,
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
        >
          {btnText}
        </button>
      )}

      <button onClick={handleClickAgainBtn}>Заново</button>
    </div>
  );
};

export default Buttons;
