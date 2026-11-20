/* Two-state book illustrations for stories whose source material is a manuscript. */
function drawBookDiagram(canvas, name, detail, motion = 0) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.save();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const ink = "#424038";
  let seed = 2718;
  function random() {
    seed = (1664525 * seed + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  function polygon(points) {
    const path = new Path2D();
    points.forEach(([x, y], i) => i ? path.lineTo(x, y) : path.moveTo(x, y));
    path.closePath();
    return path;
  }
  function ellipse(x, y, rx, ry) {
    const p = new Path2D();
    p.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    return p;
  }
  function pen(path, color = ink, width = 2) {
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke(path);
  }
  function line(x, y, x2, y2, color = ink, width = 1.6) {
    const p = new Path2D();
    p.moveTo(x, y);
    p.lineTo(x2, y2);
    pen(p, color, width);
  }
  function paint(path, color, outline = ink, width = 2.5) {
    ctx.fillStyle = color;
    ctx.fill(path, "evenodd");
    if (outline) pen(path, outline, width);
  }
  function pencil(path, color = "#3f443c", spacing = 9, tilt = -65) {
    ctx.save();
    ctx.clip(path, "evenodd");
    ctx.globalAlpha = .25;
    ctx.beginPath();
    for (let y = -200; y < 900; y += spacing) {
      for (let x = -150; x < 1000; x += 31) {
        const yy = y + x * tilt / 780 + 2.5 * random();
        ctx.moveTo(x + random() * 5, yy);
        ctx.lineTo(x + 18 + random() * 16, yy + tilt / 30 + random() * 2);
      }
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.25;
    ctx.stroke();
    ctx.restore();
  }
  function ground(y, mid = 385, radius = 260) {
    for (let i = 0; i < 115; i++) {
      const x = mid + (random() * 2 - 1) * radius;
      const offset = 1 + random() * 14;
      line(x, y + offset, x + 2 + random() * 12, y + offset - 1, "#c5bba4", .9);
    }
  }

  function pyramid() {
    const apex = [375, 96], left = [48, 461], ridge = [440, 536], right = [734, 448];
    const point = (base, t) => base.map((value, i) => apex[i] + (value - apex[i]) * t);
    ground(515, 378, 310);
    if (detail) {
      const front = polygon([apex, left, ridge]), side = polygon([apex, ridge, right]);
      paint(front, motion ? "rgb(255, "+Math.round(251+motion*4)+", "+Math.round(223+motion*26)+")" : "#fffbdf", "#706653"); pencil(front, "#a49974", 13, -100);
      paint(side, "#ddd6bb", "#706653"); pencil(side, "#92876e", 7, 160);
      for (let i = 1; i < 15; i++) {
        const t = i / 15;
        const a = point(left, t), b = point(ridge, t), c = point(right, t);
        line(...a, ...b, "#ddd4b5", .8); line(...b, ...c, "#c9bea3", .8);
      }
      return;
    }
    const rows = 24;
    for (let i = 0; i < rows; i++) {
      const t = i / rows, bottom = (i + 1) / rows;
      const ends = [left, ridge, right].map(v => point(v, bottom));
      const starts = [left, ridge, right].map(v => point(v, t));
      for (let side = 0; side < 2; side++) {
        const [a, b] = starts.slice(side, side + 2);
        const [c, d] = ends.slice(side, side + 2);
        const shift = side ? -4 : 4;
        const path = polygon([[a[0] - shift, a[1]], b, d, c, [c[0], c[1] - 5], [a[0] - shift, a[1] + 2]]);
        const colors = side ? ["#b18f61", "#bda078", "#b99769"] : ["#e6c692", "#ddbd88", "#e8cc9e"];
        paint(path, colors[i % 3], "#77674d", 1.35);
        if (motion && !side) {
          ctx.save(); ctx.globalAlpha=motion*Math.max(0,1-Math.abs(i/rows-motion)*4)*.58;
          paint(path,"#fff5d7",null); ctx.restore();
        }
        const blocks = Math.round(bottom * 11);
        for (let j = 1; j < blocks; j++) {
          const frac = (j + (i % 2) * .38) / blocks;
          line(a[0] + (b[0]-a[0])*frac, a[1]+(b[1]-a[1])*frac,
            c[0]+(d[0]-c[0])*frac, c[1]+(d[1]-c[1])*frac, "#887453", 1);
        }
      }
    }
  }

  function coffee() {
    function rose(x, y, size) {
      ctx.save(); ctx.translate(x, y); ctx.scale(size, size);
      pen(new Path2D("M0 0 Q-3 16 5 35 M2 23 Q-12 14 -16 19 Q-8 29 2 24 M3 29 Q10 15 17 18 Q12 27 3 29"), "#697557", 2);
      paint(new Path2D("M-13 -2 Q-16 -10 -8 -12 Q0 -20 6 -12 Q16 -13 14 -4 Q20 5 10 9 Q7 16 -2 12 Q-12 15 -13 6 Q-19 1 -13 -2Z"), "#bf6f73", "#8f5055", 1.4);
      pen(new Path2D("M-9 -4 Q-4 -11 2 -6 Q9 -7 7 0 Q5 7 -2 3 Q-5 1 -2 -2 M-10 4 Q-5 11 4 8"), "#87444c", 1.8);
      ctx.restore();
    }
    function cup(x, y, scale) {
      ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
      const bowl = new Path2D("M-111 0 C-106 93 -79 167 -25 177 Q0 185 25 177 C79 167 106 93 111 0Z");
      paint(bowl, "#f6ecda"); pencil(bowl, "#b2a58e", 9);
      paint(ellipse(0, 0, 111, 24), "#f5e5c7", "#7f694c", 3.5);
      pen(ellipse(0, -1, 103, 18), "#c1a360", 2);
      rose(-6, 72, 1.12); rose(29, 80, .65);
      ctx.restore();
    }
    function holder(x, y, scale) {
      ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
      paint(new Path2D("M-17 126 Q-13 159 -25 179 Q-35 187 -63 193 Q-75 199 -68 205 Q0 230 68 205 Q75 199 63 193 Q30 187 25 179 Q13 159 17 126Z"), "#a8a79d");
      pen(ellipse(0, 200, 70, 14), "#69695e", 2);
      const bowl = new Path2D("M-122 0 C-118 80 -84 128 -28 146 Q0 157 28 146 C84 128 118 80 122 0 Q0 26 -122 0Z");
      for (let j = -3; j <= 3; j++) {
        const xx = j*28, h = 50 - Math.abs(j)*7;
        bowl.moveTo(xx, 38);
        bowl.bezierCurveTo(xx-18, 51, xx-13, 56+h, xx, 54+h);
        bowl.bezierCurveTo(xx+14, 55+h, xx+16, 53, xx, 38);
        bowl.closePath();
      }
      paint(bowl, "#bdbcb1", "#54584e", 2.5); pencil(bowl, "#595e50", 5, 160);
      pen(new Path2D("M-119 8 Q0 36 119 8 M-107 49 Q0 70 107 49 M-48 131 Q0 153 48 131"), "#62675c", 2.5);
      ctx.restore();
    }
    ground(detail ? 492 : 484);
    if (detail) {
      cup(390, 219-motion*28, 1.05); holder(390, 252, 1.12);
    } else {
      cup(219+motion*61, 319-motion*42, .92); holder(522, 286, .93);
    }
  }

  function lake() {
    const water = new Path2D("M150 82 C198 90 238 83 284 108 Q345 104 385 158 Q436 167 447 208 Q484 238 486 262 C521 280 557 296 568 337 Q593 375 610 402 Q644 428 641 472 Q680 503 625 525 Q603 558 577 534 Q553 546 532 510 Q495 507 482 465 Q416 432 403 388 Q361 366 327 329 Q275 301 241 259 Q200 256 182 218 Q148 199 132 161 Q92 128 112 111 Q116 89 150 82Z");
    const island = new Path2D("M283 139 Q313 138 341 165 Q378 170 387 203 Q421 213 438 253 Q456 276 470 299 Q478 329 505 352 Q514 371 492 391 Q472 400 453 377 Q421 377 395 342 Q364 330 348 300 Q320 292 307 258 Q279 245 262 216 Q246 185 267 181 Q256 155 283 139Z");
    const inner = new Path2D("M327 225 Q338 215 346 220 Q351 227 348 233 Q338 238 328 234 Q323 231 327 225Z");
    ctx.save();
    if (motion) {ctx.translate(345,230);ctx.scale(1+.08*motion,1+.08*motion);ctx.translate(-345,-230);}
    if (detail) { ctx.translate(-280, -130); ctx.scale(1.78, 1.78); }
    paint(water, "#89afa9", "#465e59", 2.8);
    pencil(water, "#265c63", 5, 7);
    paint(island, "#ccb881", "#635f44", 2.4);
    pencil(island, "#797651", 8, -255);
    ctx.save(); ctx.clip(island);
    for (let i = 0; i < 4; i++) {
      ctx.save(); ctx.translate(375, 261); ctx.scale(1 - i * .16, 1 - i * .14); ctx.translate(-375, -261);
      pen(island, "#a39163", 1.4); ctx.restore();
    }
    ctx.restore();
    paint(inner, "#789e9b", "#405e5c", 1.7);
    ctx.restore();
    const x = detail ? 321 : 500, y = detail ? 274 : 320;
    const end = detail ? [515,162] : [590,230];
    pen(new Path2D("M"+x+" "+y+" Q"+(x+55)+" "+(y-65)+" "+end[0]+" "+end[1]), "#51594b", 1.5);
    paint(ellipse(x, y, 3.5, 3.5), "#4a594d", null);
    ctx.fillStyle = ink;
    ctx.font = "italic 28px Georgia";
    ctx.fillText(detail ? "Sidihoni" : "Toba", end[0]+6, end[1]-3);
  }

  function sunset() {
    const view = new Path2D();
    view.roundRect(91, 85, 598, 454, [5,5,2,2]);
    paint(view, "#e9d7b8");
    ctx.save(); ctx.clip(view);
    pencil(view, "#ac7c54", 8, -35);
    const horizon = detail ? 350 : 312;
    paint(ellipse(318, 340 - 28*motion, 27, 27), "#cc7646", "#a36342", 1);
    const sea = polygon([[88,horizon],[692,horizon],[692,548],[88,548]]);
    paint(sea, detail ? "#a8b5a7" : "#b2b8a9", "#878e7d", 1.5);
    pencil(sea, "#647d79", 6, 6);
    const city = new Path2D();
    city.moveTo(80, 530);
    let x = 80;
    while (x < 710) {
      const w = 13 + random() * 23;
      const height = (detail ? 22 : 52) + random() * (detail ? 43 : 77);
      const y = 495 - height;
      city.lineTo(x,y); city.lineTo(x+w*.2,y); city.lineTo(x+w*.2,y-5); city.lineTo(x+w*.75,y-5);
      city.lineTo(x+w*.75,y); city.lineTo(x+w,y); x += w;
    }
    city.lineTo(710,550); city.closePath(); paint(city, "#707c79", "#5e6965", 1.5); pencil(city, "#374b48", 5, -130);
    ctx.restore();
    pen(view, "#625d50", 5);
    const sill = polygon([[85,536],[695,536],[721,555],[61,555]]);
    paint(sill, "#beb39b"); pencil(sill, "#766e60", 6);
    line(384,90,384,533,"#655f53",8);
    line(389,90,389,533,"#ddd4bc",3);
  }

  const drawings = { pyramid, coffee, lake, sunset };
  drawings[name]();
  ctx.restore();
}
