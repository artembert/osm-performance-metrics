import { JSONObject } from "puppeteer";
import fs from "fs/promises";
import * as path from "path";

const distFolder = path.join(__dirname, "..", "data");

export async function saveJsonToFile(
  filename: string,
  data: JSONObject
): Promise<void> {
  await fs.writeFile(
    path.join(distFolder, filename),
    JSON.stringify(data, null, 2)
  );
}
