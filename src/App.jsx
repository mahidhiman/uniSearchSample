import { createContext } from "react";
import { BrowserRouter, Router, Route } from "react-router-dom";
import Login from "./Pages/Login";
import pb from "./Components/Pockebase";

const PocketbaseContext = createContext(pb);

function App() {
  return (
    <>
      <PocketbaseContext.Provider value={pb}></PocketbaseContext.Provider>
    </>
  );
}

export { PocketbaseContext };

export default App;
