import "./App.css";
import Main from "./comps/Main";
import TextContextProvider from "./context/TextContext";

function App() {
  return (
    <div className="App">
      <TextContextProvider>
        <Main />
      </TextContextProvider>
    </div>
  );
}

export default App;
