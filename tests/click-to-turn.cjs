// Run against preview.py with the same Playwright installation as turns.cjs.
const assert = require("node:assert/strict");
const {chromium} = require("playwright");
const origin = process.argv[2];
if (!origin) throw new Error("Supply the local site URL");

async function at(page, hash) {
  await page.waitForFunction(hash => {
    const [lang, id, number] = hash.slice(1).split("/");
    const story = editions[lang].stories.find(s => s.id === id);
    return location.hash === hash && document.documentElement.dataset.turn === undefined &&
      document.getElementById("story-title").textContent === (story.pages[(number || 1)-1].title || story.title).replaceAll("*","");
  }, hash);
}

async function pressPaper(page, fraction, touch = false) {
  const r = await page.locator("#reader > .story-spread").boundingBox();
  const x = r.x + fraction * r.width, y = r.y + 12;
  if (touch) await page.touchscreen.tap(x,y);
  else await page.mouse.click(x,y);
}

async function run() {
  const browser = await chromium.launch({channel:"chrome"});
  try {
    for (const mobile of [false,true]) {
      const context = await browser.newContext({viewport:{width:mobile ? 375 : 1200,height:850},hasTouch:mobile});
      const page = await context.newPage();
      for (const [lang, id] of [["en","libertys-copper-coat"],["ar","kisa-al-haram"]]) {
        const book = "#" + lang + "/" + id;
        const forward = lang === "ar" ? .2 : .8, backward = 1-forward;
        await page.goto(new URL(book,origin).href);
        await at(page,book);
        await pressPaper(page,backward,mobile);
        await at(page,book+"/2");
        await pressPaper(page,mobile ? backward : forward,mobile);
        await at(page,book+"/3");
        if (mobile) await page.locator("#prev").click();
        else await pressPaper(page,backward);
        await at(page,book+"/2");
        await page.locator("#art-action").click();
        await page.locator("#reveal").click();
        assert.equal(await page.locator("#art-action").getAttribute("aria-pressed"),"false");
        assert.equal(new URL(page.url()).hash,book+"/2");
        if (!mobile) {
          const lead = await page.locator("#lead").boundingBox();
          await page.mouse.move(lead.x+5,lead.y+10);
          await page.mouse.down();
          await page.mouse.move(lead.x+lead.width-12,lead.y+30,{steps:10});
          await page.mouse.up();
          assert(await page.evaluate(() => String(getSelection()).length > 0));
          await at(page,book+"/2");
          await page.evaluate(() => getSelection().removeAllRanges());
        }
      }
      await context.close();
    }
    console.log("Page taps, both reading directions, narrow screens, illustration controls and text selection passed.");
  } finally {
    await browser.close();
  }
}
run().catch(err => {console.error(err);process.exitCode=1;});
