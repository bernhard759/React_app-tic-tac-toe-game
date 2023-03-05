// Module import
import "../styles/Board.css";
import { useState } from "react";
import Square from "./Square";
import GameMsg from "./GameMsg";

export default function Board() {
  // Board states
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [playing, setPlaying] = useState(true);
  const [userAction, setUserAction] = useState(true);
  const [winningCombo, setWinningCombo] = useState([]);

  // For the transition
  const [inMsg, setInMsg] = useState(false);

  // Render a Square component
  function renderSquare(i) {
    return (
      <Square
        key={i}
        cssClass={winningCombo.includes(i) ? "winner" : ""}
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    );
  }

  // Handle a square click
  function handleClick(i) {
    //console.log("clicked", i);
    // Update the squares state
    const squaresNew = squares.slice();
    if (squaresNew[i] !== "" || !userAction) return;
    squaresNew[i] = turn;
    setSquares(squaresNew);
    // Check for winner or draw
    isWinner(squaresNew);
    isDraw(squaresNew);
    // Switch turns
    setTurn(turn === "X" ? "O" : "X");
  }

  // Check for a winner
  function isWinner(squares) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    possibleLines.forEach((line) => {
      const [a, b, c] = line;
      if (
        squares[a] !== "" &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(turn);
        setWinningCombo([a, b, c]);
        console.log("winner");
        setTimeout(() => setPlaying(false), 1000);
        setUserAction(false);
        // For the game message transition
        setInMsg(true);
        setTimeout(() => setInMsg(false), 4000);
      }
    });
  }

  // Check for a draw
  function isDraw(squares) {
    let draw = squares.filter((s) => s === "").length === 0;
    if (draw) {
      console.log("draw");
      setTimeout(() => setPlaying(false), 1000);
      setUserAction(false);
      // For the game message transition
      setInMsg(true);
      setTimeout(() => setInMsg(false), 4000);
    }
  }

  // Play a new game
  function playNewGame() {
    setSquares(Array(9).fill(""));
    setWinner("");
    setPlaying(true);
    setInMsg(false);
    setUserAction(true);
    setWinningCombo([]);
  }

  // Return the markup
  return (
    <>
      {playing === true ? (
        <div className="board">
          {squares.map((s, i) => {
            return renderSquare(i);
          })}
        </div>
      ) : (
        <div className="gameover">
          {winner !== "" ? (
            <div>The winner is {winner}.</div>
          ) : (
            <div>The game ended in a draw.</div>
          )}
          <button onClick={() => playNewGame()}>Play again</button>
        </div>
      )}
      <GameMsg
        msg={!inMsg ? "" : winner !== "" ? `${winner} won!` : "Draw!"}
        onClick={() => setInMsg(false)}
        cssIn={inMsg}
      ></GameMsg>
    </>
  );
}
