import { getStepPoints } from "./mouse-driver.js";

describe("sequentialMovement()", () => {
  it("positive direction", () => {
    getStepPoints([1, 1], [10, 1], 1);
    getStepPoints([2, 7], [2, 9], 1);
  });

  it("invert direction", () => {
    getStepPoints([7, 7], [3, 7], 1);
    getStepPoints([2, 8], [2, 3], 1);
  });
});
