// Module Import
import "./styles/App.css";
import { useState } from "react";
import Board  from "./components/Board"

// App component
function App() {


  return (
    <>
      <h1>Tic tac toe game</h1>
      <h2>Built with ReactJS</h2>
      <Board></Board>
    </>
  );
}

export default App;
