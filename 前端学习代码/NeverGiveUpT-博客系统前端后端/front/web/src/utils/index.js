export const colors = [
  "#424242",
  "#37474f",
  "#64dd17",
  "#795548",
  "#f57c00",
  "#00e676",
  "#004d40",
  "#dce775",
  "#18ffff",
  "#03a9f4",
  "#bf360c",
  "#6a1b9a",
  "#aa00ff",
  "#673ab7",
  "#4db6ac",
];

export const isPC = (() => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
    "XiaoMi/MiuiBrowser",
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag && window.innerWidth > 750;
})();

export const randomNum = (m, n) => {
  return Math.floor(Math.random() * (m - n) + n);
};

export const randomColor = () => {
  return colors[randomNum(1, 15)];
};

//rgb颜色随机
export const rgb = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let rgb = "rgb(" + r + "," + g + "," + b + ")";
  return rgb;
};

export const index_fullScreenAnimation = (ref_canvas) => {
  let size = 0;
  function project3D(x, y, z, lets) {
    let p, d;
    x -= lets.camX;
    y -= lets.camY - 8;
    z -= lets.camZ;
    p = Math.atan2(x, z);
    d = Math.sqrt(x * x + z * z);
    x = Math.sin(p - lets.yaw) * d;
    z = Math.cos(p - lets.yaw) * d;
    p = Math.atan2(y, z);
    d = Math.sqrt(y * y + z * z);
    y = Math.sin(p - lets.pitch) * d;
    z = Math.cos(p - lets.pitch) * d;
    let rx1 = -1000;
    let ry1 = 1;
    let rx2 = 1000;
    let ry2 = 1;
    let rx3 = 0;
    let ry3 = 0;
    let rx4 = x;
    let ry4 = z;
    let uc = (ry4 - ry3) * (rx2 - rx1) - (rx4 - rx3) * (ry2 - ry1);
    let ua = ((rx4 - rx3) * (ry1 - ry3) - (ry4 - ry3) * (rx1 - rx3)) / uc;
    let ub = ((rx2 - rx1) * (ry1 - ry3) - (ry2 - ry1) * (rx1 - rx3)) / uc;
    if (!z) z = 0.000000001;
    if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
      return {
        x: lets.cx + (rx1 + ua * (rx2 - rx1)) * lets.scale,
        y: lets.cy + (y / z) * lets.scale,
        d: x * x + y * y + z * z,
      };
    } else {
      return { d: -1 };
    }
  }
  function elevation(x, y, z) {
    let dist = Math.sqrt(x * x + y * y + z * z);
    if (dist && z / dist >= -1 && z / dist <= 1) return Math.acos(z / dist);
    return 0.00000001;
  }
  function rgb(col) {
    col += 0.000001;
    let r = parseInt((0.5 + Math.sin(col) * 0.5) * 16);
    let g = parseInt((0.5 + Math.cos(col) * 0.5) * 16);
    let b = parseInt((0.5 - Math.sin(col) * 0.5) * 16);
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
  }
  function interpolateColors(RGB1, RGB2, degree) {
    let w2 = degree;
    let w1 = 1 - w2;
    return [
      w1 * RGB1[0] + w2 * RGB2[0],
      w1 * RGB1[1] + w2 * RGB2[1],
      w1 * RGB1[2] + w2 * RGB2[2],
    ];
  }
  function rgbArray(col) {
    col += 0.000001;
    let r = parseInt((0.5 + Math.sin(col) * 0.5) * 256);
    let g = parseInt((0.5 + Math.cos(col) * 0.5) * 256);
    let b = parseInt((0.5 - Math.sin(col) * 0.5) * 256);
    return [r, g, b];
  }
  function colorString(arr) {
    let r = parseInt(arr[0]);
    let g = parseInt(arr[1]);
    let b = parseInt(arr[2]);
    return (
      "#" +
      ("0" + r.toString(16)).slice(-2) +
      ("0" + g.toString(16)).slice(-2) +
      ("0" + b.toString(16)).slice(-2)
    );
  }
  function process(lets) {
    if (lets.points.length < lets.initParticles)
      for (let i = 0; i < 5; ++i) spawnParticle(lets);
    let p, d, t;
    p = Math.atan2(lets.camX, lets.camZ);
    d = Math.sqrt(lets.camX * lets.camX + lets.camZ * lets.camZ);
    d -= Math.sin(lets.frameNo / 80) / 25;
    t = Math.cos(lets.frameNo / 300) / 165;
    lets.camX = Math.sin(p + t) * d;
    lets.camZ = Math.cos(p + t) * d;
    lets.camY = -Math.sin(lets.frameNo / 220) * 15;
    lets.yaw = Math.PI + p + t;
    lets.pitch = elevation(lets.camX, lets.camZ, lets.camY) - Math.PI / 2;
    for (let i = 0; i < lets.points.length; ++i) {
      let x = lets.points[i].x;
      // let y = lets.points[i].y;
      let z = lets.points[i].z;
      let d = Math.sqrt(x * x + z * z) / 1.0075;
      let t = 0.1 / (1 + (d * d) / 5);
      p = Math.atan2(x, z) + t;
      lets.points[i].x = Math.sin(p) * d;
      lets.points[i].z = Math.cos(p) * d;
      lets.points[i].y +=
        lets.points[i].vy * t * ((Math.sqrt(lets.distributionRadius) - d) * 2);
      if (lets.points[i].y > lets.vortexHeight / 2 || d < 0.25) {
        lets.points.splice(i, 1);
        spawnParticle(lets);
      }
    }
  }
  function drawFloor(lets) {
    let x, y, z, d, point, a;
    for (let i = -25; i <= 25; i += 1) {
      for (let j = -25; j <= 25; j += 1) {
        x = i * 2;
        z = j * 2;
        y = lets.floor;
        d = Math.sqrt(x * x + z * z);
        point = project3D(x, y - (d * d) / 85, z, lets);
        if (point.d != -1) {
          size = 1 + 15000 / (1 + point.d);
          a = 0.15 - Math.pow(d / 50, 4) * 0.15;
          if (a > 0) {
            lets.ctx.fillStyle = colorString(
              interpolateColors(
                rgbArray(d / 26 - lets.frameNo / 40),
                [0, 128, 32],
                0.5 + Math.sin(d / 6 - lets.frameNo / 8) / 2
              )
            );
            lets.ctx.globalAlpha = a;
            lets.ctx.fillRect(
              point.x - size / 2,
              point.y - size / 2,
              size,
              size
            );
          }
        }
      }
    }
    lets.ctx.fillStyle = "#82f";
    for (let i = -25; i <= 25; i += 1) {
      for (let j = -25; j <= 25; j += 1) {
        x = i * 2;
        z = j * 2;
        y = -lets.floor;
        d = Math.sqrt(x * x + z * z);
        point = project3D(x, y + (d * d) / 85, z, lets);
        if (point.d != -1) {
          size = 1 + 15000 / (1 + point.d);
          a = 0.15 - Math.pow(d / 50, 4) * 0.15;
          if (a > 0) {
            lets.ctx.fillStyle = colorString(
              interpolateColors(
                rgbArray(-d / 26 - lets.frameNo / 40),
                [32, 0, 128],
                0.5 + Math.sin(-d / 6 - lets.frameNo / 8) / 2
              )
            );
            lets.ctx.globalAlpha = a;
            lets.ctx.fillRect(
              point.x - size / 2,
              point.y - size / 2,
              size,
              size
            );
          }
        }
      }
    }
  }
  function sortFunction(a, b) {
    return b.dist - a.dist;
  }
  function draw(lets) {
    lets.ctx.globalAlpha = 0.15;
    lets.ctx.fillStyle = "#000";
    lets.ctx.fillRect(0, 0, lets.canvas.width, lets.canvas.height);
    drawFloor(lets);
    let point, x, y, z;
    for (let i = 0; i < lets.points.length; ++i) {
      x = lets.points[i].x;
      y = lets.points[i].y;
      z = lets.points[i].z;
      point = project3D(x, y, z, lets);
      if (point.d != -1) {
        lets.points[i].dist = point.d;
        size = 1 + lets.points[i].radius / (1 + point.d);
        let d = Math.abs(lets.points[i].y);
        let a = 0.8 - Math.pow(d / (lets.vortexHeight / 2), 1000) * 0.8;
        lets.ctx.globalAlpha = a >= 0 && a <= 1 ? a : 0;
        lets.ctx.fillStyle = rgb(lets.points[i].color);
        if (
          point.x > -1 &&
          point.x < lets.canvas.width &&
          point.y > -1 &&
          point.y < lets.canvas.height
        )
          lets.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
      }
    }
    lets.points.sort(sortFunction);
  }
  function spawnParticle(lets) {
    let p, ls;
    let pt = {};
    p = Math.PI * 2 * Math.random();
    ls = Math.sqrt(Math.random() * lets.distributionRadius);
    pt.x = Math.sin(p) * ls;
    pt.y = -lets.vortexHeight / 2;
    pt.vy = lets.initV / 20 + Math.random() * lets.initV;
    pt.z = Math.cos(p) * ls;
    pt.radius = 200 + 800 * Math.random();
    pt.color = pt.radius / 1000 + lets.frameNo / 250;
    lets.points.push(pt);
  }
  function frame(lets) {
    if (lets === undefined) {
      lets = {};
      lets.canvas = ref_canvas;
      lets.ctx = lets.canvas.getContext("2d");
      lets.canvas.width = window.innerWidth;
      lets.canvas.height = window.innerHeight;
      window.addEventListener(
        "resize",
        function() {
          lets.canvas.width = window.innerWidth;
          lets.canvas.height = window.innerHeight;
          lets.cx = lets.canvas.width / 2;
          lets.cy = lets.canvas.height / 2;
        },
        true
      );
      lets.frameNo = 0;
      lets.camX = 0;
      lets.camY = 0;
      lets.camZ = -14;
      lets.pitch = elevation(lets.camX, lets.camZ, lets.camY) - Math.PI / 2;
      lets.yaw = 0;
      lets.cx = lets.canvas.width / 2;
      lets.cy = lets.canvas.height / 2;
      lets.bounding = 10;
      lets.scale = 500;
      lets.floor = 26.5;
      lets.points = [];
      lets.initParticles = 1000;
      lets.initV = 0.01;
      lets.distributionRadius = 800;
      lets.vortexHeight = 25;
    }
    lets.frameNo++;
    requestAnimationFrame(function() {
      frame(lets);
    });
    process(lets);
    draw(lets);
  }
  frame();
};

export const tags_fullScreenAnimation = () => {
  let a = document.querySelector("canvas");
  if (!a || !a.getContext) {
    return false;
  }
  function u(z, i) {
    return Math.floor(Math.random() * (i - z + 1) + z);
  }
  let d = a.getContext("2d");
  let x = (a.width = window.innerWidth);
  let y = (a.height = window.innerHeight);
  let m = x / 2;
  let n = y / 2;
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(i) {
      setTimeout(i, 17);
    };
  let k = 1;
  let l = [];
  let t = x / 2;
  if (x < 768) {
    t = x / 2;
  }
  function j(i, z, A) {
    this.ctx = i;
    this.init(z, A);
  }
  j.prototype.init = function(i, z) {
    this.x = i;
    this.y = z;
    this.c = "255, 255, 255";
    this.r = t;
  };
  j.prototype.resize = function() {
    this.x = x / 2;
    this.y = y / 2;
    this.r = t;
  };
  j.prototype.render = function() {
    this.draw();
  };
  j.prototype.draw = function() {
    d.save();
    d.beginPath();
    d.globalAlpha = 0.8;
    let i = this.c;
    let z = d.createRadialGradient(
      this.x,
      this.y,
      this.r,
      x / 2 - this.r,
      y / 2,
      0
    );
    z.addColorStop(0, "rgba(" + i + ", " + 1 * 1 + ")");
    z.addColorStop(0.5, "rgba(" + i + ", " + 1 * 0.2 + ")");
    z.addColorStop(1, "rgba(" + i + ", " + 1 * 0 + ")");
    d.fillStyle = z;
    d.arc(this.x, this.y, this.r, Math.PI * 2, false);
    d.fill();
    d.restore();
  };
  for (let f = 0; f < k; f++) {
    let h = new j(d, 0, 0);
    l.push(h);
  }
  let r = 2000;
  let s = [];
  let c = [
    "rgb(54, 38, 112)",
    "rgb(98, 98, 159)",
    "rgb(0, 137, 190)",
    "rgb(0, 108, 154)",
  ];
  if (x < 768) {
    r = 1000;
  }
  function q(i, A, B, z) {
    this.ctx = i;
    this.init(A, B, z);
  }
  q.prototype.init = function(z, A, i) {
    this.x = z;
    this.y = A;
    this.r = i;
    this.s = 0.1;
    this.ga = u(0, 1) + 0.1;
    this.v = { x: 0, y: 0 };
    this.c = c[u(0, c.length - 1)];
  };
  q.prototype.closest = function() {
    let C = this.x - m;
    let D = this.y - n;
    let z = C * C + D * D;
    let B = Math.sqrt(z);
    this.v.x = (C / B) * (1 + this.s);
    this.v.y = (D / B) * (1 + this.s);
    this.r += 0.05;
    this.x += this.v.x;
    this.y += this.v.y;
    if (Math.abs(this.x - m) < 10 && Math.abs(this.y - n) < 10) {
      this.x = u(0, x);
      this.y = u(0, y);
      this.s = 0.1;
      this.r = 1;
    }
    if (this.x < 0 || this.x > x) {
      this.x = u(0, x);
      this.s = 0.1;
      this.r = 1;
    }
    if (this.y < 0 || this.y > y) {
      this.y = u(0, y);
      this.s = 0.1;
      this.r = 1;
    }
  };
  q.prototype.updateParams = function() {
    this.s += 0.05;
  };
  q.prototype.resize = function() {
    this.x = u(0, x);
    this.y = u(0, y);
  };
  q.prototype.draw = function() {
    let i = this.ctx;
    i.save();
    i.beginPath();
    i.globalAlpha = this.ga;
    i.fillStyle = this.c;
    i.globalCompositeOperation = "lighter";
    i.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    i.fill();
    i.restore();
  };
  q.prototype.render = function(z) {
    this.closest(z);
    this.updateParams();
    this.draw();
  };
  for (let f = 0; f < r; f++) {
    let p = new q(d, u(0, x), u(0, y), 1);
    s.push(p);
  }
  // let w = "Please holding down the mouse.";
  function e() {
    d.save();
    d.fillStyle = "rgb(0, 137, 190)";
    d.font = '16px "sans-serif"';
    d.textAlign = "center";
    d.textBaseline = "middle";
    // d.fillText(w, x / 2, y / 2);
  }
  function v() {
    d.clearRect(0, 0, x, y);
    l[0].render();
    e();
    for (let z = 0; z < s.length; z++) {
      s[z].render(z);
    }
    requestAnimationFrame(v);
  }
  v();
  function o() {
    x = a.width = window.innerWidth;
    y = a.height = window.innerHeight;
    l[0].render();
    for (let z = 0; z < s.length; z++) {
      s[z].resize();
    }
  }
  window.addEventListener("resize", function() {
    o();
  });
  let b;
  window.addEventListener("mousedown", function() {
    b = setInterval(function() {
      for (let z = 0; z < s.length; z++) {
        s[z].s += 1;
        s[z].r += 2;
      }
      // w = "Warp";
      l[0].r += 0.5;
    }, 20);
  });
  window.addEventListener("mouseup", function() {
    clearInterval(b);
    // w = "Please holding down the mouse.";
  });
  window.addEventListener("mousemove", function(i) {
    m = i.clientX;
    n = i.clientY;
  });
  window.addEventListener(
    "touchstart",
    function() {
      let z = event.targetTouches[0];
      m = z.pageX;
      n = z.pageY;
      b = setInterval(function() {
        for (let A = 0; A < s.length; A++) {
          s[A].s += 1;
          s[A].r += 3;
        }
        // w = "Warp";
        l[0].r += 0.5;
      }, 20);
    },
    false
  );
  window.addEventListener("touchend", function() {
    clearInterval(b);
    // w = "Please holding down the mouse.";
  });
};

export const about_fullScreenAnimation = (a) => {
  if (!a || !a.getContext) {
    return false;
  }
  function m(q, i) {
    return Math.floor(Math.random() * (i - q + 1) + q);
  }
  let c = a.getContext("2d");
  let o = (a.width = window.innerWidth);
  let p = (a.height = window.innerHeight);
  let e = o / 2;
  let f = p / 2;
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(i) {
      setTimeout(i, 17);
    };
  let k = 500;
  let l = [];
  function j(i, r, s, q) {
    this.ctx = i;
    this.init(r, s, q);
  }
  j.prototype.init = function(q, r, i) {
    this.x = q;
    this.y = r;
    this.h = i;
    this.h === true ? (this.r = 1) : (this.r = 1);
    this.l = m(5, 10);
    this.a = m(0, 360);
    this.rad = (this.a * Math.PI) / 180;
    this.c = { r: m(0, 255), g: m(0, 100), b: m(0, 255) };
    this.v = {
      x: m(-5, 5) * Math.random() + 1,
      y: m(-5, 5) * Math.random() + 1,
      z: Math.random() * 3,
    };
  };
  j.prototype.draw = function() {
    let i = this.ctx;
    i.save();
    i.globalCompositeOperation = "lighter";
    i.fillStyle = "rgb(" + this.c.r + ", " + this.c.g + ", " + this.c.b + ")";
    i.beginPath();
    i.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    i.fill();
    i.restore();
  };
  j.prototype.updatePosition = function() {
    this.x += Math.cos(this.rad) * 3 + this.v.x;
    this.y += Math.sin(this.rad) * 3 + this.v.y;
  };
  j.prototype.wrapPosition = function() {
    if (this.x < 0 - 200) {
      this.x = o;
    }
    if (this.x > o + 200) {
      this.x = 0;
    }
    if (this.y < 0 - 200) {
      this.y = p;
    }
    if (this.y > p + 200) {
      this.y = 0;
    }
  };
  j.prototype.closestPug = function(t) {
    let u = t;
    let s = Number.MAX_VALUE;
    let q = 0;
    for (let t = 0; t < l.length; t++) {
      if (u !== t && l[t].h === true) {
        let B = Math.abs(this.x - l[t].x);
        let C = Math.abs(this.y - l[t].y);
        let r = B * B + C * C;
        let w = Math.floor(Math.sqrt(r));
        if (w < s) {
          s = w;
          q = t;
        }
      }
    }
    let z = l[q].x;
    let A = l[q].y;
    let B = this.x - z;
    let C = this.y - A;
    let r = B * B + C * C;
    let v = Math.sqrt(r);
    this.v.x = (B / v) * this.v.z;
    this.v.y = (C / v) * this.v.z;
    this.x += Math.cos(this.rad);
    this.y += Math.sin(this.rad);
    this.x -= this.v.x;
    this.y -= this.v.y;
  };
  j.prototype.updateParams = function() {
    this.a -= 1;
    this.rad = (this.a * Math.PI) / 180;
    this.l -= 0.1;
    if (this.l < 0) {
      this.v.x = m(-5, 5) + 1;
      this.v.y = m(-5, 5) + 1;
      this.l = m(5, 10);
    }
  };
  j.prototype.render = function(q) {
    if (this.h === true) {
      this.updatePosition();
    }
    if (this.h !== true) {
      this.closestPug(q);
    }
    this.updateParams();
    this.wrapPosition();
    this.draw();
  };
  for (let d = 0; d < k; d++) {
    let h = new j(c, o / 2, p / 2, d === 0 ? true : false);
    l.push(h);
  }
  function n() {
    c.globalCompositeOperation = "darken";
    c.globalAlpha = 0.03;
    c.fillStyle = "rgb(0, 0, 0)";
    c.fillRect(0, 0, o, p);
    c.globalCompositeOperation = "source-over";
    c.globalAlpha = 1;
    for (let q = 0; q < l.length; q++) {
      l[q].render(q);
    }
    requestAnimationFrame(n);
  }
  n();
  function g() {
    o = a.width = window.innerWidth;
    p = a.height = window.innerHeight;
  }
  window.addEventListener("resize", function() {
    g();
  });
  window.addEventListener("mousemove", function(i) {
    e = i.clientX;
    f = i.clientY;
  });
  let b;
  window.addEventListener("mousedown", function(i) {
    e = i.clientX;
    f = i.clientY;
    b = setInterval(function() {
      let r = m(1, 10);
      for (let q = 0; q < r; q++) {
        let s = new j(c, e, f, Math.random() < 0.01 ? true : false);
        l.push(s);
      }
    }, 80);
  });
  window.addEventListener("mouseup", function() {
    clearInterval(b);
  });
  window.addEventListener(
    "touchstart",
    function() {
      let q = event.targetTouches[0];
      e = q.pageX;
      f = q.pageY;
      b = setInterval(function() {
        let s = m(1, 10);
        for (let r = 0; r < s; r++) {
          let t = new j(c, e, f, Math.random() < 0.01 ? true : false);
          l.push(t);
        }
      }, 80);
    },
    false
  );
  window.addEventListener("touchend", function() {
    clearInterval(b);
  });
};

export const archives_fullScreenAnimation = (canvas) => {
  let ctx = canvas.getContext("2d");
  let height = void 0,
    width = void 0,
    particles = [],
    outerparticles = [];

  let noofpoints = 200,
    trashold = 10;
  let x = void 0,
    y = void 0,
    p = void 0,
    n = void 0,
    factor = 0,
    dist = void 0,
    inc = 0.005,
    deltaangle = (Math.PI * 2) / noofpoints,
    r = Math.min(height, width) * 0.5;

  let distance = function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  };
  let mapVal = function mapVal(num, in_min, in_max, out_min, out_max) {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };
  let resize = function resize() {
    height = window.innerHeight;
    // ctx.canvas.clientHeight;
    width = window.innerWidth;
    // ctx.canvas.clientWidth;

    if (
      ctx.canvas.clientWidth !== canvas.width ||
      ctx.canvas.clientHeight !== canvas.height
    ) {
      canvas.width = width;
      canvas.height = height;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      particles = [];
      r = ~~(Math.min(canvas.width, canvas.height) * 0.4) - 10;
      for (let i = deltaangle; i <= Math.PI * 2; i += deltaangle) {
        x = r * Math.cos(i);
        y = r * Math.sin(i);
        particles.push({
          x: x,
          y: y,
        });

        x = r * 5 * Math.cos(i);
        y = r * 5 * Math.sin(i);
        outerparticles.push({
          x: x,
          y: y,
        });
      }
    }
  };
  // let random = function random(min, max, isInt) {
  //   return ~~(Math.random() * (max - min) + min);
  // };

  resize();

  let draw = function draw() {
    ctx.clearRect(-width, -height, width * 2, height * 2);
    ctx.fillStyle = "#fff";
    ctx.lineWidth = 0.5;

    // ctx.beginPath();
    // ctx.arc(0, 0, r, 0, Math.PI*2 ,false);
    // ctx.closePath();
    // ctx.stroke();

    for (let i = 0; i < particles.length; i++) {
      let o = outerparticles[i];
      p = particles[i];
      n = particles[~~((i * factor) % noofpoints)];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 0.1, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
      dist = ~~distance(p.x, p.y, n.x, n.y);
      if (dist > 1) {
        dist = ~~distance(width / 2, height / 2, p.x + n.x / 2, p.y + n.y / 2);
      }
      ctx.strokeStyle = "hsl(" + mapVal(dist, 0, r * 2, 0, 360) + ",100%,50%)";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(n.x, n.y);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(o.x, o.y);
      ctx.stroke();
      ctx.closePath();
    }
  };

  let render = function render() {
    if (factor > trashold || factor < 0) {
      inc = -inc;
      factor = Math.abs(factor);
    }

    resize();
    draw();
    factor += inc;
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

export const animateScroll = (element, speed, offset) => {
  let rect = element.getBoundingClientRect();
  //获取元素相对窗口的top值，此处应加上窗口本身的偏移
  let top = window.pageYOffset + rect.top;
  let currentTop = 0;
  let requestId;
  //采用requestAnimationFrame，平滑动画
  function step() {
    currentTop += speed;
    if (currentTop <= top) {
      window.scrollTo(0, currentTop + offset);
      requestId = window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(requestId);
    }
  }
  window.requestAnimationFrame(step);
};

export const Icon = {
  github: "http://www.nevergiveupt.top/github.png",
  sf: "http://www.nevergiveupt.top/sf.jpeg",
  zhihu: "http://www.nevergiveupt.top/zhihu.jpg",
};

import wx from "weixin-js-sdk";
import axios from "@/utils/axios";

const JS_API = ["scanQRCode", "chooseImage", "getLocation"];
export const wxHelper = {
  setConfig() {
    const pageUrl = encodeURIComponent(location.href.split("#")[0]);
    return axios
      .get(`/signature?&url=${pageUrl}`)
      .then((res) => {
        return new Promise((resolve, reject) => {
          const { appId, timestamp, nonceStr, signature } = res.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名
            jsApiList: JS_API, // 必填，需要使用的JS接口列表
          });
          wx.error((res) => {
            reject(res);
          });
          wx.ready(() => {
            resolve(wx);
          });
        });
      })
      .catch((ex) => {
        throw ex;
      });
  },

  /**
   *
   * @param {*} method 将要调用的方法名
   * @param {*} configParam wx配置对象。
   */
  call(method, configParam) {
    return this.setConfig()
      .then((wx) => {
        const fn = wx[method];
        if (!fn) {
          throw new Error(` Do not contains the method of ${method}`);
        }
        return fn.call(wx, configParam);
      })
      .catch((e) => {
        throw e;
      });
  },
};

import crypto from "crypto";

export const createMd5 = (key, word) => {
  const hmac = crypto.createHash("md5", key);
  const a = hmac.update(word).digest();
  const l = a.toString("base64");
  return l
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
