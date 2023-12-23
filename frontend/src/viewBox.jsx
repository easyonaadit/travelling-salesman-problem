import { useState } from "react";
import Node from "./Node";
// import Line from "./Line";

function ViewBox() {
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);

  const handleSVGonClick = (e) => {
    // console.log("(" + e.pageX + ", " + e.pageY + ")");
    setNodes((prevNodes) => {
      if (prevNodes.length == 0) {
        return [[e.pageX, e.pageY]];
      } else {
        const newNodes = [...prevNodes, [e.pageX, e.pageY]];
        updateLines(newNodes);
        return newNodes;
      }
    });
    // console.table(nodes);
  };

  const handleHelper = () => {
    console.log("Helper button");
    console.log("%cTHIS is the node value: ", "color: #0000ff", nodes[0][0]);
    console.table(nodes[0]);
  };

  function updateLines(newNodes) {
    console.log("%cInside update lines", "color: #0000ff");
    const newLines = [];
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        let x1 = newNodes[i][0];
        let x2 = newNodes[j][0];
        let y1 = newNodes[i][1];
        let y2 = newNodes[j][1];
        newLines.push({ x1, x2, y1, y2 });
        // if (lines.length == 0) {
        //   setLines([[x1, x2, y1, y2]]);
        // } else {
        //   setLines([...lines, [x1, x2, y1, y2]]);
        // }
      }
    }

    setLines(newLines);
    console.log(lines);
  }

  return (
    <div className="body" id="body">
      <button onClick={handleHelper}>Helper</button>
      <svg
        viewBox="7 120 1500 892"
        width="1500"
        height="892"
        id="svg"
        onClick={(e) => handleSVGonClick(e)}
      >
        {nodes.map((node, index) => {
          return <Node key={index} cx={node[0]} cy={node[1]} />;
        })}
        {lines.map((line, index) => {
          return (
            // <h1>{lines.x1}</h1>
            <Line
              key={index}
              x1={line.x1}
              x2={line.x2}
              y1={line.y1}
              y2={line.y2}
            />
          );
        })}
      </svg>
    </div>
  );
}

function Line({ i, x1, x2, y1, y2 }) {
  console.log("%cThis is the line part: ", "color: #00ff00", x1);
  return (
    <line
      key={i}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="black"
      strokeWidth="4"
    />
  );
}

export default ViewBox;
