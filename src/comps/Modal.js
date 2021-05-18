const Modal = ({ speed, accuracy, time, handleClickAgainBtn }) => {
  return (
    <div className="modal">
      <div className="modal-inner">
        <h3>Поздравляем! Вы набрали весь текст!</h3>
        <h4>Ваш результат: </h4>
        <p>
          Скорость - <span className="modal-span">{speed}</span> знаков в минуту
        </p>
        <p>
          Точность - <span className="modal-span">{accuracy}</span>%
        </p>
        <p>
          Время выполнения - <span className="modal-span">{time}</span> секунд
        </p>
        <div className="modalBtn">
          <button onClick={handleClickAgainBtn}>Заново</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
