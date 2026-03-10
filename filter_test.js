// A simple CSS filter approximation in JS, or we can just run it in Puppeteer.
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(`
    <style>
      .primary { filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%); }
      .secondary { filter: brightness(0) saturate(100%) invert(65%) sepia(1%) saturate(0%) hue-rotate(148deg) brightness(87%) contrast(97%); }
      .error { filter: brightness(0) saturate(100%) invert(36%) sepia(23%) saturate(1637%) hue-rotate(315deg) brightness(97%) contrast(85%); }
      .flavie { filter: brightness(0) saturate(100%) invert(72%) sepia(30%) saturate(600%) hue-rotate(350deg) brightness(95%) contrast(85%); }
      div { width: 100px; height: 100px; background: black; }
    </style>
    <div class="primary" id="p"></div>
    <div class="secondary" id="s"></div>
    <div class="error" id="e"></div>
    <div class="flavie" id="f"></div>
  `);
  const colors = await page.evaluate(() => {
    return {
      primary: getComputedStyle(document.getElementById('p')).backgroundColor,
      secondary: getComputedStyle(document.getElementById('s')).backgroundColor,
      error: getComputedStyle(document.getElementById('e')).backgroundColor,
      flavie: getComputedStyle(document.getElementById('f')).backgroundColor,
    };
  });
  console.log(colors);
  await browser.close();
})();
