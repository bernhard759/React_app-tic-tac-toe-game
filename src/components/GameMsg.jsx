// Module imports
import "../styles/Msg.css";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

// Square function component
export default function Square({ msg, onClick, cssIn }) {
  // Ref
  const nodeRef = useRef(null);

  // Return the markup
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={cssIn}
      timeout={500}
      classNames="game-msg"
    >
      <div className="game-message" onClick={() => onClick()} ref={nodeRef}>
        {msg}
      </div>
    </CSSTransition>
  );
}
