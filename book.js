(() => {
  "use strict";
  const el = id => document.getElementById(id);
  const dialog = el("languages");
  const portrait = el("mona-plate").content.firstElementChild;
  const tones = {en:"#e4b045", es:"#cb6681", ja:"#4d81aa", ko:"#6c9a86", ar:"#d38b47", tr:"#e49688", id:"#5d9394"};
  const spread = document.querySelector("#reader > .story-spread");
  const probeTemplate = spread.cloneNode(true);
  probeTemplate.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
  let current;
  let revealed = false;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function storyHash(lang, story, page = 0) {
    return "#" + lang + (story ? "/" + story.id + (page ? "/" + (page+1) : "") : "");
  }
  function fileURL(lang, story) { return "downloads/owlveria-" + lang + (story ? "-" + story.id : "") + ".epub"; }
  function resolve() {
    const [code, id, number] = location.hash.slice(1).split("/");
    const preferred = (navigator.languages || [navigator.language]).map(lang => lang.split("-")[0]);
    const lang = Object.hasOwn(editions, code) ? code : (preferred.find(lang => Object.hasOwn(editions, lang)) || "en");
    const edition = editions[lang], shelf = shelves[lang];
    const index = edition.stories.findIndex(story => story.id === id);
    const story = edition.stories[index];
    const requested = Number(number);
    const page = story && Number.isInteger(requested) && requested >= 1 && requested <= story.pages.length ? requested-1 : 0;
    return {lang, edition, shelf, index, story, page};
  }
  function titleInto(node, title) {
    node.replaceChildren(...title.split("*").map((text,i) => i % 2 ? element("em", "", text) : document.createTextNode(text)));
  }
  function icon(className, symbol) {
    const node = element("span", className, symbol);
    node.setAttribute("aria-hidden","true");
    return node;
  }
  function bookCard(story, i) {
    const {lang, shelf} = current;
    const name = shelf.covers[i], card = element("article","book");
    const wrap = element("a","book-cover");
    wrap.href = storyHash(lang, story);
    const img = new Image(832,1152);
    img.src = "assets/covers/" + story.id + ".jpg";
    img.alt = name;
    wrap.setAttribute("aria-label", shelf.read + " · " + name);
    const glimpse = element("span","jacket-glimpse");
    glimpse.setAttribute("aria-hidden","true");
    const title = element("span","glimpse-title");
    titleInto(title,story.title);
    const picture = new Image();
    picture.alt = "";
    picture.src = "assets/" + (story.pages[0].spot || "art/mark.png");
    glimpse.append(title,element("span","glimpse-lines",story.pages[0].left[0]),picture);
    const jacket = element("span","jacket-front");
    jacket.append(img);
    wrap.append(glimpse,jacket);
    const actions = element("div","book-actions");
    const read = element("a","read",shelf.read);
    read.href = wrap.href;
    read.setAttribute("aria-label", shelf.read + " · " + name);
    read.append(icon("direction", "↗"));
    const file = element("a","file");
    file.href = fileURL(lang, story);
    file.download = "";
    file.setAttribute("aria-label", shelf.save + " · " + name);
    file.append(icon("download-icon"),document.createTextNode(shelf.save));
    actions.append(read,file);
    card.append(wrap,actions);
    return card;
  }
  function languageMenu() {
    const {lang} = current;
    const items = Object.entries(editions).map(([code, edition]) => {
      const link = element("a","language-choice");
      link.href = storyHash(code);
      link.lang = code;
      link.style.setProperty("--ribbon",tones[code]);
      const thumb = new Image(46,62);
      thumb.src = "assets/covers/thumb-" + edition.stories[0].id + ".jpg";
      thumb.alt = "";
      const name = element("span","native",edition.name);
      name.dir = code === "ar" ? "rtl" : "ltr";
      link.append(thumb,name);
      if (code === lang) {
        link.setAttribute("aria-current","true");
        link.append(icon("selected","✓"));
      }
      link.addEventListener("click", () => dialog.close());
      return link;
    });
    el("language-options").replaceChildren(...items);
  }
  const motionByStory = {
    "the-missing-portrait":["hang","walk"], "libertys-copper-coat":["inspect","inspect"],
    "el-sombrero-de-la-catrina":["hang","inspect"], "el-guia-de-machu-picchu":["inspect","walk"],
    "nami-no-ao":["swell","swell"], "fuji-no-okumiya":["inspect","inspect"],
    "geobukseon-geurim":["sail","hang"], "jinju-gwigeori":["inspect","shine"],
    "eyfelin-anteni":["inspect","inspect"], "penyair-di-atas-pintu":["inspect","hang"]
  };
  function insertDrawing(slot, plate, state) {
    if (plate.art === "mona") {
      slot.replaceChildren(portrait.cloneNode(true));
    } else if (plate.diagram) {
      const canvas = document.createElement("canvas");
      canvas.width=780; canvas.height=640;
      drawBookDiagram(canvas,plate.diagram,Boolean(state));
      slot.replaceChildren(canvas);
    } else {
      const image = new Image();
      image.alt = "";
      image.src = "assets/art/" + plate.art + ".png";
      slot.replaceChildren(image);
    }
  }
  function fillSpread(node, story, number, detail, live) {
    const {edition} = current;
    const page = story.pages[number], state = detail ? 1-page.plate : page.plate;
    const plate = story.plates[state], source = page.source || story.source;
    const field = key => node.querySelector('[data-field="'+key+'"]');
    titleInto(field("title"),page.title || story.title);
    const action = state ? story.back : story.action;
    const fields = {place:story.place, lead:page.left[0], context:page.left[1], passage:detail && page.reveal ? page.reveal : page.right[0],
      tail:page.right[1],caption:plate.caption,action,description:plate.alt,"source-label":edition.source,"source-name":source[0]};
    for (const [key,value] of Object.entries(fields)) field(key).textContent=value;
    field("figure").dataset.motion = (motionByStory[story.id] || ["diagram","diagram"])[state];
    field("figure").dataset.subject = plate.art || plate.diagram+"-"+state;
    field("spot").hidden = !page.spot;
    if (!live) return;
    field("source").href=source[1];
    field("art-action").setAttribute("aria-label",action);
    field("art-action").setAttribute("aria-pressed",String(detail));
    field("reveal").setAttribute("aria-pressed",String(detail));
    field("plate").setAttribute("aria-label",plate.alt);
    const spot = field("spot");
    if (spot.dataset.src !== (page.spot || "")) {
      spot.replaceChildren();
      if (page.spot) {
        const image=new Image();
        image.alt=""; image.src="assets/"+page.spot;
        spot.append(image);
      }
      spot.dataset.src=page.spot || "";
    }
    insertDrawing(field("drawing"),plate,state);
  }
  // Account for the whitespace inside each original illustration as well as
  // the space added by object-fit. The caption always has a clear line below.
  function wrapInk(figure) {
    const profile=inkProfiles[figure.dataset.subject];
    const width=figure.offsetWidth, artHeight=figure.querySelector(".plate-art").offsetHeight;
    if (!profile || !width || !artHeight) return;
    const [w,h,strips]=profile, scale=Math.min(width/w,artHeight/h);
    const dw=w*scale, dh=h*scale, x0=(width-dw)/2, y0=(artHeight-dh)/2;
    const rtl=current.lang==="ar", outside=rtl ? 0 : width;
    const points=[[outside,0]];
    function edge(i) {
      const [lo,hi]=strips[i];
      if(lo>hi) return outside;
      return Math.min(width,Math.max(0,x0+dw*(rtl ? hi : lo)/120+(rtl ? 7 : -7)));
    }
    for(let i=0;i<strips.length;i++) {
      const near=[i,Math.max(0,i-1),Math.min(i+1,strips.length-1)].map(edge);
      const x=rtl ? Math.max(...near) : Math.min(...near);
      points.push([x,y0+dh*i/strips.length],[x,y0+dh*(i+1)/strips.length]);
    }
    points.push([rtl ? width : 0,artHeight+2]);
    const curve=points.map(([x,y])=>x.toFixed(1)+"px "+y.toFixed(1)+"px");
    curve.push((rtl ? "100%" : "0")+" 100%",(rtl ? "0" : "100%")+" 100%");
    figure.style.shapeOutside="polygon("+curve.join(",")+") border-box";
  }
  function updateDrawing() {
    stopDiagramMotion();
    fillSpread(spread,current.story,current.page,revealed,true);
    wrapInk(el("illustration"));
  }
  function showStory() {
    const {lang, edition, shelf, story, index, page} = current;
    const previous = edition.stories[index-1], next = edition.stories[index+1];
    const inside = page+1 < story.pages.length;
    el("back-label").textContent=shelf.library;
    el("reader-save").textContent=shelf.save;
    el("prev-label").textContent=page ? shelf.previousPage : previous ? edition.previous : shelf.library;
    el("next-label").textContent=inside ? shelf.nextPage : next ? edition.next : shelf.library;
    el("shelf-back").href = storyHash(lang);
    el("reader-file").href = fileURL(lang,story);
    el("prev").href = page ? storyHash(lang,story,page-1) : storyHash(lang,previous,previous ? previous.pages.length-1 : 0);
    el("next").href = inside ? storyHash(lang,story,page+1) : storyHash(lang,next);
    const count = new Intl.NumberFormat(lang === "ar" ? "ar-u-nu-arab" : lang);
    el("progress").textContent = count.format(page+1) + " / " + count.format(story.pages.length);
    el("pager").setAttribute("aria-label",edition.contents);
    updateDrawing();
  }
  let measuredLanguage;
  function prepareMeasurements() {
    const {lang,edition} = current;
    const gauge=el("reader-sizing");
    if (measuredLanguage !== lang) {
      const probes=[];
      for (const story of edition.stories) {
        story.pages.forEach((_,number) => {
          for (const detail of [false,true]) {
            const probe=probeTemplate.cloneNode(true);
            fillSpread(probe,story,number,detail,false);
            probes.push(probe);
          }
        });
      }
      gauge.replaceChildren(...probes);
      measuredLanguage=lang;
    }
    measurePages();
  }
  function measurePages() {
    if (!current?.story) return;
    const gauge=el("reader-sizing"), style=el("reader").style;
    if (!gauge.childElementCount) return;
    const max=(selector,axis="height") => Math.ceil(Math.max(...Array.from(gauge.querySelectorAll(selector),n => n.getBoundingClientRect()[axis])))+"px";
    gauge.classList.add("measuring");
    gauge.querySelectorAll(".plate").forEach(wrapInk);
    wrapInk(el("illustration"));
    style.setProperty("--turn-caption",max("figcaption"));
    style.setProperty("--turn-action-width",max(".reveal","width"));
    style.setProperty("--turn-action",max(".reveal"));
    style.setProperty("--turn-credit",max(".source-line"));
    style.setProperty("--turn-left",max(".left-leaf"));
    gauge.classList.remove("measuring");
    style.setProperty("--turn-size",max(".story-spread"));
  }
  let animation=0, motionLayer, printedLayer;
  function stopDiagramMotion() {
    cancelAnimationFrame(animation);
    if (motionLayer?.isConnected) motionLayer.replaceWith(printedLayer);
    motionLayer=null;
    printedLayer=null;
  }
  function playDiagramMotion(event) {
    const pointer=event.type === "pointerenter";
    if (!pointer && !event.currentTarget.matches(":focus-visible")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches ||
        (pointer && (event.pointerType !== "mouse" || !matchMedia("(any-hover: hover)").matches))) return;
    stopDiagramMotion();
    const printed=el("plate-art").querySelector("canvas");
    if (!printed || !current.story) return;
    const page=current.story.pages[current.page], state=revealed ? 1-page.plate : page.plate;
    const name=current.story.plates[state].diagram;
    const canvas=document.createElement("canvas");
    canvas.width=printed.width; canvas.height=printed.height;
    canvas.getContext("2d").drawImage(printed,0,0);
    printed.replaceWith(canvas);
    printedLayer=printed;
    motionLayer=canvas;
    const start=performance.now();
    let lastDraw=-Infinity;
    function frame(time) {
      const t=Math.min(1,(time-start)/900);
      if(t===1) {stopDiagramMotion(); return;}
      if(time-lastDraw >= 30) {
        drawBookDiagram(canvas,name,Boolean(state),Math.sin(Math.PI*t)**2);
        lastDraw=time;
      }
      animation=requestAnimationFrame(frame);
    }
    animation=requestAnimationFrame(frame);
  }
  for (const type of ["pointerenter","focus"]) el("art-action").addEventListener(type,playDiagramMotion);
  for (const type of ["pointerleave","blur"]) el("art-action").addEventListener(type,stopDiagramMotion);
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change",stopDiagramMotion);
  function render(moving = false) {
    const previous = current;
    current = resolve();
    const {lang, edition, shelf, story} = current;
    const hash = storyHash(lang,story,current.page);
    if (location.hash !== hash) history.replaceState(null,"",hash);
    if (dialog.open) dialog.close();
    stopDiagramMotion();
    revealed = false;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.style.setProperty("--edition",tones[lang]);
    const home = storyHash(lang);
    el("home").href = home;
    el("footer-home").href = home;
    el("home").setAttribute("aria-label","Owlveria · " + shelf.library);
    el("language-current").textContent = edition.name;
    el("language-open").setAttribute("aria-label",shelf.language + " · " + edition.name);
    el("languages-title").textContent = shelf.language;
    el("language-close").setAttribute("aria-label",edition.close);
    el("skip").textContent = story ? edition.skip : shelf.library;
    el("privacy").textContent = edition.privacy;
    el("library").hidden = Boolean(story);
    el("reader").hidden = !story;
    if (story) {
      showStory();
      prepareMeasurements();
    } else {
      el("shelf-title").textContent = shelf.title;
      el("shelf-intro").textContent = shelf.intro;
      el("collection-label").textContent = shelf.all;
      el("collection-file").href = fileURL(lang);
      el("books").replaceChildren(...edition.stories.map(bookCard));
    }
    document.title = (story ? (story.pages[current.page].title || story.title).replaceAll("*","") : shelf.title) + " · Owlveria";
    if (moving) {
      el(story ? "story-title" : "shelf-title").focus({preventScroll:true});
      if (!(previous && previous.story && story && previous.lang === lang)) window.scrollTo(0,0);
      else if (spread.getBoundingClientRect().top < -80) el("reader").scrollIntoView({block:"start",behavior:"instant"});
    }
  }
  function reveal() { revealed = !revealed; updateDrawing(); }
  const singleLeaf = matchMedia("(max-width:700px)");
  const reducedMotion = matchMedia("(prefers-reduced-motion:reduce)");
  const interactive = "a,button,input,select,textarea,label,[contenteditable]";
  let press;
  spread.addEventListener("pointerdown", event => {
    press = event.isPrimary && event.button === 0 && !event.target.closest(interactive)
      ? [event.clientX,event.clientY] : null;
  });
  spread.addEventListener("pointercancel", () => { press = null; });
  spread.addEventListener("click", event => {
    const start = press;
    press = null;
    if (!start || event.defaultPrevented || event.button !== 0 ||
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
        event.composedPath().some(node => node instanceof Element && node.matches(interactive))) return;
    if (Math.hypot(event.clientX-start[0],event.clientY-start[1]) > 8 || getSelection()?.isCollapsed === false) return;
    const box = spread.getBoundingClientRect();
    const right = event.clientX >= box.left + box.width/2;
    const forward = singleLeaf.matches || current.page === 0 || right !== (current.lang === "ar");
    location.hash = el(forward ? "next" : "prev").hash;
  });
  let turning;
  function changePage() {
    const next = resolve();
    turning?.skipTransition();
    if (!current.story || !next.story || current.lang !== next.lang || reducedMotion.matches ||
        !document.startViewTransition || (current.story === next.story && current.page === next.page)) {
      render(true);
      return;
    }
    const forward = next.index === current.index ? next.page > current.page : next.index > current.index;
    document.documentElement.dataset.turn = forward !== (current.lang === "ar") ? "right" : "left";
    const effect = document.startViewTransition(() => render(true));
    turning = effect;
    effect.finished.finally(() => {
      if (turning === effect) {
        turning = null;
        delete document.documentElement.dataset.turn;
      }
    });
  }
  el("language-open").addEventListener("click",() => { languageMenu(); dialog.showModal(); });
  el("language-close").addEventListener("click",() => dialog.close());
  dialog.addEventListener("click",event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  el("skip").addEventListener("click",event => {event.preventDefault(); el("main").focus();});
  el("art-action").addEventListener("click",reveal);
  el("reveal").addEventListener("click",reveal);
  document.addEventListener("keydown",event => {
    if (!current.story || dialog.open || event.altKey || event.metaKey || event.ctrlKey || !["ArrowLeft","ArrowRight"].includes(event.key)) return;
    const forwardKey = current.lang === "ar" ? "ArrowLeft" : "ArrowRight";
    const link = el(event.key === forwardKey ? "next" : "prev");
    event.preventDefault();
    location.hash = link.hash;
  });
  window.addEventListener("hashchange",changePage);
  let measuredWidth = 0;
  new ResizeObserver(entries => {
    const width = entries[0].contentRect.width;
    if (width !== measuredWidth) { measuredWidth = width; measurePages(); }
  }).observe(el("main"));
  document.fonts.addEventListener("loadingdone",measurePages);
  render();
  document.fonts.ready.then(measurePages);
})();
