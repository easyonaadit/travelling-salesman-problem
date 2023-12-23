export default function Node({ cx, cy, i }) {
  return <circle cx={cx} cy={cy} r="17" key={i} data-id={i} />;
}
