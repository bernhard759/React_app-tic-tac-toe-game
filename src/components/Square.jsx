// Module import
import "../styles/Square.css";

// Square function component
export default function Square({ cssClass, value, onClick }) {
  // Return the markup
  return (
    <div className={"square " + cssClass} onClick={() => onClick()}>
      {value}
    </div>
  );
}
