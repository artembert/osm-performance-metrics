import { JSONObject } from "puppeteer";
import fs from "fs/promises";
import * as path from "path";

const distFolder = path.join(path.resolve(), "data");

export async function saveJsonToFile(
  filename: string,
  data: JSONObject
): Promise<void> {
  await fs.writeFile(
    path.join(distFolder, filename + ".json"),
    JSON.stringify(data, null, 2)
  );
}
