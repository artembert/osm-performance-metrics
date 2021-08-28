import puppeteer, { Mouse } from "puppeteer";
import {
  getStepPoints,
  moveByPointsSequential,
} from "../mouse-driver/mouse-driver.js";
import { installMouseHelper } from "../mouse-driver/mouse-cursor.js";

(async () => {
  // const args = await puppeteer.defaultArgs().filter((flag: string) => flag !== '--enable-automation');
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    ignoreDefaultArgs: true,
    defaultViewport: { width: 640, height: 640 },
    // args
  });
  const page = await browser.newPage();
  await installMouseHelper(page);
  const devtoolsProtocolClient = await page.target().createCDPSession();
  await devtoolsProtocolClient.send("Overlay.setShowFPSCounter", {
    show: true,
  });
  // await devtoolsProtocolClient.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto(
    "http://localhost:8080/#background=Bing&disable_features=boundaries&map=16.33/59.94534/30.25223",
    { waitUntil: "networkidle0" }
  );
  await moveMouse(page.mouse);
  const metrics = await page.metrics();
  console.info(metrics);
  // await page.screenshot({ path: './image.jpg', type: 'jpeg' });
  // await page.close();
  // await browser.close();
})();

async function moveMouse(mouse: Mouse): Promise<void> {
  const points: [number, number][] = [
    [100, 100],
    [100, 540],
    [540, 540],
    [540, 100],
    [100, 100],
  ];
  for await (let [index, startPoint] of points.entries()) {
    if (!points[index + 1]) {
      return;
    }
    const stepPoints = getStepPoints(startPoint, points[index + 1], 100);
    console.log(stepPoints);
    await moveByPointsSequential(mouse, stepPoints);
  }
}
