export default function Line({ i, x1, x2, y1, y2, id }) {
  // console.log("%cThis is the line part: ", "color: #00ff00", x1);
  return (
    <line
      key={i}
      id={id}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="black"
      strokeWidth="4"
      className="line"
    />
  );
}
