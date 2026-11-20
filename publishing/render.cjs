// Run against a local HTTP server for this site. Only the cover JPEGs go into the website.
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");
const [origin, artDirectory, language] = process.argv.slice(2);
if (!origin || !artDirectory) throw new Error("Usage: node publishing/render.cjs LOCAL_URL TEMP_ART_DIRECTORY [LANGUAGE]");
const covers = path.resolve(__dirname, "../assets/covers");
const save = (directory, name, encoded) => fs.writeFileSync(path.join(directory, name), Buffer.from(encoded, "base64"));
async function render() {
  fs.mkdirSync(artDirectory, {recursive:true});
  fs.mkdirSync(covers, {recursive:true});
  const browser = await chromium.launch({channel:"chrome"});
  try {
    const page = await browser.newPage();
    await page.goto(new URL("publishing/jackets.html", origin).href);
    const editionsToPrint = language ? [language] : await page.evaluate(() => Object.keys(editions));
    for (const code of editionsToPrint) {
      const stories = await page.evaluate(code => editions[code].stories.map(story => story.id), code);
      for (const [index, id] of stories.entries()) {
        const jpeg = await page.evaluate(([code,index]) => printJacket(code,index), [code,index]);
        save(covers, id + ".jpg", jpeg);
        if (index === 0) {
          const miniature = await page.evaluate(() => {
            const small = document.createElement("canvas");
            small.width = 78; small.height = 108;
            small.getContext("2d").drawImage(document.querySelector("#paper"),0,0,78,108);
            return small.toDataURL("image/jpeg",.83).split(",")[1];
          });
          save(covers, "thumb-" + id + ".jpg", miniature);
        }
      }
      save(artDirectory, "collection-" + code + ".jpg", await page.evaluate(code => printCollection(code), code));
    }
    const drawingAssets = await page.evaluate(async () => {
      const plates = {};
      for (const name of ["pyramid","sunset","coffee","lake"]) {
        for (const state of [0,1]) {
          const canvas=document.createElement("canvas");
          canvas.width=780; canvas.height=640;
          drawBookDiagram(canvas, name, Boolean(state));
          plates[name+"-"+state]=canvas.toDataURL("image/png").split(",")[1];
        }
      }
      const frame=document.createElement("canvas");
      frame.width=540; frame.height=810;
      const c=frame.getContext("2d");
      c.drawImage(await inkImage("mona"),83,134,373,547);
      c.drawImage(await inkImage("frame"),0,0,540,810);
      plates.mona=frame.toDataURL("image/png").split(",")[1];
      return plates;
    });
    for (const [name,data] of Object.entries(drawingAssets)) save(artDirectory, name+".png", data);
  } finally { await browser.close(); }
}
render().catch(error => {console.error(error);process.exitCode=1;});
