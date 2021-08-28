import { saveJsonToFile } from "./fs-manager";
import fs from "fs/promises";

const writeFileStub = jest.spyOn(fs, "writeFile").mockResolvedValue();

describe("saveJsonToFile", () => {
  it("should save file to correct place", async () => {
    await saveJsonToFile("2021-08-28 17-13-00 metrics.json", { key: "value" });
    expect(writeFileStub).toHaveBeenCalledWith(
      expect.stringContaining(
        "osm-performance-metrics/data/2021-08-28 17-13-00 metrics"
      ),
      expect.anything()
    );
  });
  it("should stringify content", async () => {
    await saveJsonToFile("2021-08-28 17-13-00 metrics", { key: "value" });
    expect(writeFileStub).toHaveBeenCalledWith(
      expect.anything(),
      '{\n  "key": "value"\n}'
    );
  });
});
