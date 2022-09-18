const { firefox } = require("playwright");

async function run() {
  // US reservation
  // 256GB model
  // unix timestamp: 1660265760 (2022-08-12T00:56Z)
  const url = "https://getmydeck.ingenhaag.dev/s/US/256/1660265760";

  const browser = await firefox.launch();
  const page = await browser.newPage({
    userAgent:
      "steam-deck-status checker/1.0.0 (https://github.com/lannonbr/steam-deck-status/)",
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

  console.log(JSON.stringify({ lastKnown, timeLeft, percentage }));

  await browser.close();
}

run();
