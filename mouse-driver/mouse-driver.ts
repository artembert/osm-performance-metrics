import { Mouse } from "puppeteer";
import { timeout } from "../utils/timeout.js";

type MouseCoordinates = [number, number];

export function getStepPoints(
  [startX, startY]: MouseCoordinates,
  [endX, endY]: MouseCoordinates,
  stepSize: number
): MouseCoordinates[] {
  if (startX !== endX && startY !== endY) {
    throw new Error(
      "the movement not at the right angle is not supported currently"
    );
  }
  let direction: "horizontal" | "vertical";
  let constantPosition: number;
  let startPoint: number;
  let lineLength: number;
  if (startX === endX) {
    direction = "vertical";
    constantPosition = startX;
    startPoint = startY;
    lineLength = endY - startY;
  } else {
    direction = "horizontal";
    constantPosition = startY;
    startPoint = startX;
    lineLength = endX - startX;
  }
  return getSegments(lineLength, stepSize).map((indent) => {
    if (direction === "horizontal") {
      return [indent + startPoint, constantPosition];
    } else {
      return [constantPosition, indent + startPoint];
    }
  });
}

export async function moveByPointsSequential(
  mouse: Mouse,
  points: MouseCoordinates[],
  delay = 1000
): Promise<void> {
  for (let [x, y] of points) {
    await mouse.move(x, y);
    console.log(x, y);
    await timeout(delay);
  }
}

function getSegments(totalLength: number, stepSize: number): number[] {
  const length = Math.abs(totalLength);
  let currentPosition: number = 0;
  const points: number[] = [];
  while (currentPosition < length) {
    points.push(currentPosition);
    currentPosition += stepSize;
  }
  points.push(length);
  return totalLength > 0 ? points : points.map((item) => -item);
}
