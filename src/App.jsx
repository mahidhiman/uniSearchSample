import { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import pb from "./Components/Pockebase";

const PocketbaseContext = createContext(pb);

function App() {
  return (
    <>
      <PocketbaseContext.Provider value={pb}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Router>
      </PocketbaseContext.Provider>
    </>
  );
}

export { PocketbaseContext };

export default App;
