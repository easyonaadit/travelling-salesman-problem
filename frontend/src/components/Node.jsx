export default function Node({ i, cx, cy , id}) {
  // if(i === 1 ) {return <circle cx={cx} cy={cy} r="17" key={i} data-id={i} className="node if-node"/>;}
  return <circle cx={cx} cy={cy} r="17" key={i} data-id={i} className="node" id={id}/>;
}
