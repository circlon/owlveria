/* Each jacket is composed from original illustrations and the lettering of its edition. */
const bitmaps = new Map();
async function inkImage(name) {
  if (!bitmaps.has(name)) {
    const img = new Image();
    img.src = "../assets/art/" + name + ".png";
    await img.decode();
    bitmaps.set(name, img);
  }
  return bitmaps.get(name);
}

async function printJacket(code, index, scale = 1.6) {
  const page = document.querySelector("#paper");
  const W = 520, H = 720;
  page.width = W*scale; page.height = H*scale;
  const ctx = page.getContext("2d");
  ctx.scale(scale,scale);
  let seed = code.charCodeAt(0)*113 + index*441;
  const rand = () => ((seed = (seed*1664525+1013904223)>>>0)/4294967296);
  const face = ({ja:"Ja",ko:"Ko",ar:"Ar"})[code] || "Letter";
  await document.fonts.load("92px "+face, shelves[code].covers[index]);
  const dark="#182633", cream="#fff1ce", red="#cb4938";
  function path(points) {
    ctx.beginPath();
    points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();
  }
  function block(color,points){ctx.fillStyle=color;path(points);ctx.fill();}
  function disc(x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
  function ground(y,color){
    ctx.strokeStyle=color;ctx.lineWidth=1.2;ctx.beginPath();
    for(let i=0;i<165;i++){const x=rand()*530,dy=rand()*24;ctx.moveTo(x,y+dy);ctx.lineTo(x+6+rand()*17,y+dy-2);}ctx.stroke();
  }
  function band(color, y, bottom = true) {
    const edge = []; for(let x=-3;x<540;x+=8)edge.push([x,y+Math.sin(x/89)*7+rand()*4]);
    block(color,[...edge,[535,bottom?H:-2],[-3,bottom?H:-2]]);
  }
  function letters(lines,x,y,width,size,color,settings={}) {
    ctx.save();ctx.translate(x,y);ctx.rotate((settings.angle||0)*Math.PI/180);
    ctx.textBaseline="alphabetic";ctx.fillStyle=color;ctx.textAlign=settings.align||"left";
    if(code==="ar")ctx.direction="rtl";
    const sizes=Array.isArray(size)?size:lines.map(()=>size);
    let baseline=0;
    lines.forEach((line,i)=>{
      let px=sizes[i];ctx.font=px+"px "+face;
      if(ctx.measureText(line).width>width) {px*=width/ctx.measureText(line).width;ctx.font=px+"px "+face;}
      if(i)baseline+=(settings.leading||.91)*px;
      ctx.fillText(line,0,baseline);
      if(face==="Letter"){ctx.strokeStyle=color;ctx.lineWidth=1.05;ctx.lineJoin="round";ctx.strokeText(line,0,baseline);}
    });ctx.restore();
  }
  async function art(name,x,y,w,h,opts={}) {
    const im=typeof name==="string"?await inkImage(name):name;
    ctx.save();ctx.translate(x+w/2,y+h/2);ctx.rotate((opts.angle||0)*Math.PI/180);
    if(opts.clip){ctx.beginPath();ctx.rect(-w/2,-h/2,w,h);ctx.clip();}
    const factor=(opts.fill?Math.max:Math.min)(w/im.width,h/im.height);
    const dw=im.width*factor,dh=im.height*factor;
    ctx.globalCompositeOperation=opts.blend||"source-over";
    ctx.drawImage(im,-w/2+(w-dw)*(opts.fx??.5),-h/2+(h-dh)*(opts.fy??.5),dw,dh);ctx.restore();
  }
  function diagram(name,state,crop) {
    const pic=document.createElement("canvas");pic.width=780;pic.height=640;drawBookDiagram(pic,name,state);
    if(!crop)return pic;
    const region=document.createElement("canvas");region.width=crop[2];region.height=crop[3];
    region.getContext("2d").drawImage(pic,...crop,0,0,region.width,region.height);return region;
  }
  function base(color){ctx.fillStyle=color;ctx.fillRect(0,0,W,H);}
  const key=code+index;
  switch(key){
    case "en0":
      base("#edb645");band("#e4a53d",644);ground(655,"#b67e34");
      await art("frame",32,332,229,273,{angle:-7,blend:"multiply"});
      await art("peruggia",230,264,253,435);
      letters(["THE MISSING","MONA LISA"],38,141,439,[93,122],dark,{angle:-3});break;
    case "en1":
      base("#add1b6");await art("liberty-copper",0,0,W,525,{fill:true,clip:true,fy:.09,blend:"multiply"});
      band("#264a4c",474);letters(["LIBERTY’S","COPPER COAT"],38,536,444,[92,111],cream,{angle:1});break;
    case "es0":
      base("#db7293");disc(333,448,241,"#f7c69a");
      await art("catrina-print",79,249,365,439,{angle:5});
      letters(["EL SOMBRERO","DE LA CATRINA"],32,124,450,[91,103],"#412932",{angle:-3});break;
    case "es1":
      base("#246554");await art("machu-terraces",0,220,W,398,{fill:true,clip:true,fy:.5,blend:"luminosity"});
      band("#e7b589",555);await art("machu-family",77,424,374,249);
      letters(["EL GUÍA DE","MACHU PICCHU"],32,125,455,[88,104],cream,{angle:1});break;
    case "ja0":
      base("#f4eaca");await art("great-wave",0,239,W,481,{fill:true,clip:true,fx:.35});
      letters(["北斎の","波の青"],35,120,437,[77,105],"#1e3a69",{angle:-2});break;
    case "ja1":
      base("#c6523e");ctx.save();ctx.beginPath();ctx.arc(267,444,211,0,Math.PI*2);ctx.clip();
      await art("fuji-shrine",55,228,424,431,{fill:true,clip:true,fy:.4});ctx.restore();
      letters(["富士山の","てっぺん"],34,115,438,[72,90],"#fff1cc",{angle:2});break;
    case "ko0":
      base("#bbcdb4");band("#619c96",401);ground(457,"#417c81");ground(538,"#4c8f8e");
      await art("turtle-ship",14,280,492,239);
      letters(["거북선의","얼굴"],38,129,426,[93,123],"#203c40",{angle:-3});break;
    case "ko1":
      base("#e5b44a");await art("pearl-portrait",0,-10,W,551,{fill:true,clip:true,fy:.21});
      band("#ecbd4f",489);letters(["진주 귀걸이의","비밀"],34,561,450,[79,101],dark,{angle:-2});break;
    case "ar0": {
      base("#e7a84c");disc(124,332,86,"#f6d385");
      const ancient=diagram("pyramid",true,[33,71,717,486]),modern=diagram("pyramid",false,[33,71,717,486]);
      await art(modern,9,276,505,367);ctx.save();
      path([[0,210],[274,260],[205,670],[0,670]]);ctx.clip();await art(ancient,9,276,505,367);ctx.restore();ground(642,"#bf8e48");
      letters(["كساء","الهرم"],474,116,437,[88,100],"#46312d",{align:"right",leading:1.05});break;
    }
    case "ar1":
      base("#33475a");disc(115,329,85,"#e78b56");
      await art(diagram("sunset",false,[46,74,694,503]),8,299,278,258,{angle:-4});
      await art(diagram("sunset",true,[46,74,694,503]),234,346,271,260,{angle:4});
      letters(["نافذتان","للغروب"],474,119,431,[76,89],"#fff0c8",{align:"right",leading:1.09});break;
    case "tr0":
      base("#ea9c87");band("#f0bc66",501);
      await art(diagram("coffee",false,[95,257,565,260]),19,326,490,298);
      ground(586,"#c9854c");letters(["FİNCANIN","ZARFI"],38,145,437,[112,140],"#2c3e42",{angle:-4});break;
    case "tr1":
      base("#eabb59");await art("eiffel-wire",237,111,293,506,{angle:4,fill:true,clip:true,fy:.45,blend:"multiply"});
      letters(["EYFEL’İN","İNCE","TELİ"],31,170,286,[103,116,122],"#1f3853",{angle:-4});break;
    case "id0":
      base("#23595d");await art(diagram("lake",true,[80,64,648,505]),0,242,W,438);
      letters(["DANAU","DI ATAS DANAU"],35,143,451,[121,104],"#f6ddb1",{angle:-3});break;
    case "id1":
      base("#d58776");await art("thinker",0,0,W,528,{fill:true,clip:true,fy:.86,blend:"multiply"});
      band("#263545",474);letters(["PENYAIR","DI ATAS PINTU"],34,551,451,[108,99],"#f7deaf",{angle:1});break;
  }
  // Printed paper fibres and the narrow fold of a bound jacket.
  for(let i=0;i<8200;i++){
    const x=rand()*W,y=rand()*H;
    ctx.fillStyle=i%2?"rgba(255,248,221,.14)":"rgba(32,25,34,.07)";
    ctx.fillRect(x,y,.5+rand()*2,.35+rand()*1.3);
  }
  ctx.fillStyle="#17212b23";ctx.fillRect(0,0,8,H);
  ctx.fillStyle="#fff4c947";ctx.fillRect(10,0,1.6,H);
  // A small publisher's ticket, always clear of the title.
  block("#f9edce",[[27,662],[143,660],[145,696],[25,699]]);
  await art("wordmark",32,666,105,27,{blend:"multiply"});
  return page.toDataURL("image/jpeg",.91).split(",")[1];
}

// A collected edition has its own front cover and both individual jackets inside.
async function printCollection(code) {
  const sheet = document.querySelector("#paper");
  sheet.width=832; sheet.height=1152;
  const c=sheet.getContext("2d");
  c.scale(1.6,1.6);
  const color={en:"#e9ba68",es:"#dd8d9b",ja:"#cad6cf",ko:"#b9cabb",ar:"#e3aa64",tr:"#e7ad9c",id:"#96b7a5"}[code];
  c.fillStyle=color; c.fillRect(0,0,520,720);
  c.fillStyle="#292e31"; c.fillRect(12,0,2,720);
  const mark=await inkImage("wordmark");
  c.globalCompositeOperation="multiply";
  c.drawImage(mark,37,35,153,43);c.globalCompositeOperation="source-over";
  const face=({ja:"Ja",ko:"Ko",ar:"Ar"})[code]||"Letter";
  await document.fonts.load("82px "+face,shelves[code].title);
  let size=92;
  const title=shelves[code].title;
  c.font=size+"px "+face;
  size=Math.min(size,size*443/c.measureText(title).width);
  c.font=size+"px "+face;c.fillStyle="#252e30";c.textAlign="center";
  if(code==="ar")c.direction="rtl";
  c.fillText(title,266,184);
  const pictures=await Promise.all(editions[code].stories.map(async story=>{
    const pic=new Image();pic.src="../assets/covers/"+story.id+".jpg";await pic.decode();return pic;
  }));
  for (const [i,pic] of pictures.entries()) {
    c.save();c.translate(i?357:176,i?474:420);c.rotate(i ? .09 : -.095);
    c.fillStyle="#5a4e3d";c.fillRect(-117,-168,244,341);c.drawImage(pic,-120,-172,240,333);c.restore();
  }
  c.strokeStyle="#3d443b";c.lineWidth=2;c.beginPath();c.moveTo(41,669);c.lineTo(478,666);c.stroke();
  return sheet.toDataURL("image/jpeg",.9).split(",")[1];
}
