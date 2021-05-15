const Modal = ({ speed, accuracy, time, handleClickAgainBtn }) => {
  return (
    <div className="modal">
      <p>Поздравляем! Вы набрали весь текст!</p>
      <p>Ваш результат: </p>
      <p>Скорость - {speed} знаков в минуту</p>
      <p>Точность - {accuracy}%</p>
      <p>Время выполнения - {time} секунд</p>
      <button onClick={handleClickAgainBtn}>Заново</button>
    </div>
  );
};

export default Modal;
