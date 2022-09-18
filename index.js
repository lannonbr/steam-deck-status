const { firefox } = require("playwright");

async function run() {
  const url = "https://getmydeck.ingenhaag.dev/s/US/256/1660265760";

  const browser = await firefox.launch();
  const page = await browser.newPage({
    userAgent:
      "stream-deck-status checker/1.0.0 (https://github.com/lannonbr/stream-deck-status/)",
  });
  await page.goto(url);

  await page.waitForTimeout(2000);

  const f = await page.$$("#results li");

  const lastKnownProcessedStr = await f[2].textContent();
  const timeLeftStr = await f[4].textContent();
  const percentageStr = await f[5].textContent();

  const lastKnown = lastKnownProcessedStr
    .split("last known order: ")[1]
    .split(")")[0];

  const percentage = parseFloat(
    percentageStr.split("You're ")[1].split(" %")[0]
  );

  const timeLeft = timeLeftStr.split("You have ")[1].split(" worth of")[0];

  console.log({ lastKnown, timeLeft, percentage });

  await browser.close();
}

run();