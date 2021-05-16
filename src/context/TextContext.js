import { createContext, useState, useEffect } from "react";

export const textContext = createContext();

const TextContextProvider = (props) => {
  const [text, setText] = useState();
  const [type, setType] = useState("all-meat");
  const [paras, setParas] = useState("1");

  async function fetchText() {
    const res = await fetch(
      `https://baconipsum.com/api/?type=${type}&paras=${paras}`
    );
    const data = await res.json();
    let filteredData = data.map((paragraph) => {
      let result = paragraph
        .replace(/\s[\s\u200B\u200D\uFEFF]/g, "")
        .replace(/\./g, ". ")
        .replace(/\s$/, "");
      return result;
    });

    setText(filteredData);
  }

  useEffect(() => {
    fetchText();
  }, []);

  return (
    <textContext.Provider value={{ text, setType, setParas, fetchText }}>
      {props.children}
    </textContext.Provider>
  );
};

export default TextContextProvider;
