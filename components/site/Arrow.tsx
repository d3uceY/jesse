/**
 * Arrow — the pixel arrows, drawn in SpriteWare and exported as vector rects
 * (one rect per horizontal run) rather than a bitmap, so they stay crisp at
 * any size and take the colour of the text they sit in.
 *
 * ne: 10×10, n: 9×10. "s" is the same glyph rotated 180°, which is exact.
 */

type Dir = "ne" | "n" | "s";

type Shape = {
  w: number;
  h: number;
  rows: [number, number, number][];
};

const NE: Shape = {
  w: 10,
  h: 10,
  rows: [
    [6, 0, 4],
    [6, 1, 4],
    [6, 2, 4],
    [5, 3, 2],
    [4, 4, 2],
    [3, 5, 2],
    [2, 6, 2],
    [1, 7, 2],
    [0, 8, 2],
  ],
};

const N: Shape = {
  w: 9,
  h: 10,
  rows: [
    [4, 0, 1],
    [3, 1, 3],
    [2, 2, 5],
    [1, 3, 7],
    [3, 4, 3],
    [3, 5, 3],
    [3, 6, 3],
    [3, 7, 3],
    [3, 8, 3],
  ],
};

export default function Arrow({
  dir = "ne",
  className,
}: {
  dir?: Dir;
  className?: string;
}) {
  const shape = dir === "ne" ? NE : N;
  const flip =
    dir === "s"
      ? `rotate(180 ${shape.w / 2} ${shape.h / 2})`
      : undefined;

  return (
    <svg
      className={"arrow arrow--" + dir + (className ? " " + className : "")}
      viewBox={`0 0 ${shape.w} ${shape.h}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={flip} fill="currentColor">
        {shape.rows.map(([x, y, w]) => (
          <rect key={x + ":" + y} x={x} y={y} width={w} height="1" />
        ))}
      </g>
    </svg>
  );
}
