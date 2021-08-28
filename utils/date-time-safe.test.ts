import { dateTimeSafe } from "./date-time-safe";

describe("dateTimeSafe()", () => {
  it("should return correct date", () => {
    expect(dateTimeSafe(new Date(2021, 7, 28, 17, 13))).toEqual(
      "2021-08-28 17-13-00"
    );
  });
});
