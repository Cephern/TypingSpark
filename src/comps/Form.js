import { useState, useContext } from "react";
import { textContext } from "../context/TextContext";

const Form = () => {
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

      <button>Submit</button>
    </form>
  );
};

export default Form;
