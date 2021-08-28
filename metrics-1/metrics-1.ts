import puppeteer, { JSONObject, Mouse } from "puppeteer";
import {
  getStepPoints,
  moveByPointsSequential,
} from "../mouse-driver/mouse-driver.js";
import { installMouseHelper } from "../mouse-driver/mouse-cursor.js";
import { saveJsonToFile } from "../storage/fs-manager.js";
import { dateTimeSafe } from "../utils/date-time-safe.js";

const pageSize = { width: 840, height: 640 } as const;
const borderIndent = 100;
const sidePanelWidth = 300;

const pageUrl =
  "http://localhost:8080/#background=Bing&disable_features=boundaries&map=16.32/59.93804/30.23595";

(async () => {
  // const args = await puppeteer.defaultArgs().filter((flag: string) => flag !== '--enable-automation');
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    defaultViewport: pageSize,
  });
  const page = await browser.newPage();
  await installMouseHelper(page);
  const devtoolsProtocolClient = await page.target().createCDPSession();
  await devtoolsProtocolClient.send("Overlay.setShowFPSCounter", {
    show: true,
  });
  // await devtoolsProtocolClient.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto(pageUrl, { waitUntil: "networkidle0" });
  await moveMouse(page.mouse);
  const metrics = await page.metrics();
  console.info(metrics);
  await saveJsonToFile(
    dateTimeSafe(new Date()) + " default",
    metrics as JSONObject
  );
  // await page.screenshot({ path: './image.jpg', type: 'jpeg' });
  // await page.close();
  // await browser.close();
})();

async function moveMouse(mouse: Mouse): Promise<void> {
  const points: [number, number][] = [
    [sidePanelWidth, borderIndent],
    [pageSize.width - borderIndent, borderIndent],
    [pageSize.width - borderIndent, pageSize.height - borderIndent],
    [sidePanelWidth, pageSize.height - borderIndent],
    [sidePanelWidth, borderIndent],
  ];
  for await (let [index, startPoint] of points.entries()) {
    if (!points[index + 1]) {
      return;
    }
    const stepPoints = getStepPoints(startPoint, points[index + 1], 40);
    await moveByPointsSequential(mouse, stepPoints);
  }
}
