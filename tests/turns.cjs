// Serve the site locally, then run: node tests/turns.cjs http://127.0.0.1:4357/
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const origin = process.argv[2];
if (!origin) throw new Error("Supply the local site URL");

const languages = ["en","es","ja","ko","ar","tr","id"];
const viewports = [320,375,650,840,1310];
async function geometry(page) {
  return page.evaluate(() => {
    const rect = selector => {
      const box = document.querySelector(selector).getBoundingClientRect();
      return [box.left + scrollX,box.top + scrollY,box.width,box.height].map(value => Math.round(value*64)/64);
    };
    return {
      book:rect("#reader > .story-spread"), art:rect("#plate-art"), reveal:rect("#reveal"),
      navigation:rect("#pager"), counter:rect("#progress")
    };
  });
}
async function readyPage(page, code, index, part) {
  await page.waitForFunction(([lang, position, number]) => {
    const story = editions[lang].stories[position];
    return getComputedStyle(document.querySelector("#reader > .story-spread")).display === "grid" &&
      document.documentElement.lang === lang && !document.getElementById("reader").hidden &&
      location.hash === "#" + lang + "/" + story.id + (number ? "/"+(number+1) : "") &&
      document.getElementById("story-title").textContent === (story.pages[number].title || story.title).replaceAll("*","");
  }, [code,index,part]);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)));
  });
}
async function run() {
  const browser = await chromium.launch({channel:"chrome"});
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror",error => errors.push(error.message));
    for (const width of viewports) {
      await page.setViewportSize({width,height:812});
      for (const code of languages) {
        const label = code + " at " + width;
        await page.goto(new URL("#"+code,origin).href);
        await page.waitForFunction(lang => document.documentElement.lang === lang && !document.getElementById("library").hidden, code);
        await page.locator(".book-cover").first().click();
        await readyPage(page,code,0,0);
        const baseline = await geometry(page);
        const first = page.url();
        for (const index of [0,1]) {
          for (const part of [0,1,2]) {
            if (index || part) {
              await page.locator("#next").click();
              await readyPage(page,code,index,part);
            }
            const id=label+" book "+index+" spread "+part;
            assert.deepEqual(await geometry(page),baseline,id);
            const original=await page.locator("#passage").textContent();
            const caption=await page.locator("#caption").textContent();
            await page.locator("#reveal").click();
            if (part===0) assert.notEqual(await page.locator("#passage").textContent(),original,id);
            assert.notEqual(await page.locator("#caption").textContent(),caption,id);
            assert.deepEqual(await geometry(page),baseline,id+" reveal");
            await page.locator("#art-action").click();
            assert.equal(await page.locator("#caption").textContent(),caption,id);
            assert.equal(await page.locator("#passage").textContent(),original,id);
            assert.deepEqual(await geometry(page),baseline,id+" return");
          }
        }
        for (let step=4;step>=0;step--) {
          await page.locator("#prev").click();
          await readyPage(page,code,Math.floor(step/3),step%3);
        }
        assert.equal(page.url(),first,label+" backward");
        assert.deepEqual(await geometry(page),baseline,label+" backward");
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),label+" overflow");
      }
      console.log("Stable page, art, reveal and pagination at",width,"CSS pixels across all seven editions.");
    }
    assert.deepEqual(errors,[]);
  } finally { await browser.close(); }
}
run().catch(error => {console.error(error);process.exitCode=1;});
