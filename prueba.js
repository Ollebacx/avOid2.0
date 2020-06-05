var UserProfile = {
  isOnline: navigator.onLine,
  isAuthenticated: !1,
  isTouchDevice: function () {
    return navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)
  },
  supportsAudio: function () {
    return !this.isTouchDevice()
  },
  suportsLocalStorage: function () {
    return "localStorage" in window && null !== window.localStorage
  }
},
  SinuousSound = {
    IDLE: "MusicIdleARR",
    CALM: "MusicCalmARR",
    FUN: "MusicFunARR",
    FX_EXPLOSION: "fx_explosion",
    FX_BREAK: "fx_break",
    FX_BUBBLE: "fx_bubble",
    isMute: !1,
    isReady: !1,
    initialize: function () {
      var c = document.createElement("div");
      c.setAttribute("id", "sound");
      document.body.appendChild(c);
      UserProfile.supportsAudio() && swfobject.embedSWF("/assets/swf/sound.swf", "sound", "10", "10", "9.0.0", "", {}, {
        allowScriptAccess: "always"
      }, {
        id: "soundSWF"
      }, this.embedFlashStatusHandler)
    },
    embedFlashStatusHandler: function (c) {
      c.success && (SinuousSound.isReady = !0, SinuousSound.isMute ? SinuousSound.mute() : SinuousSound.unmute())
    },
    play: function (c) {
      if (UserProfile.supportsAudio() && SinuousSound.isReady && document.getElementById("soundSWF") && "none" != document.getElementById("soundSWF").style.display) try {
        document.getElementById("soundSWF").sendToActionScript(c)
      } catch (h) { }
    },
    mute: function () {
      this.isMute = !0;
      this.isReady && document.getElementById("soundSWF") && (document.getElementById("soundSWF").style.display = "none")
    },
    unmute: function () {
      this.isMute = !1;
      this.isReady && document.getElementById("soundSWF") && (document.getElementById("soundSWF").style.display = "block")
    }
  },
  AJAX = {
    post: function (c, h, F, Q) {
      $.post(c, h, F)
    }
  };

function Point(c, h) {
  this.position = {
    x: c,
    y: h
  }
}
Point.prototype.distanceTo = function (c) {
  var h = c.x - this.position.x;
  c = c.y - this.position.y;
  return Math.sqrt(h * h + c * c)
};
Point.prototype.clonePosition = function () {
  return {
    x: this.position.x,
    y: this.position.y
  }
};

function Region() {
  this.top = this.left = 999999;
  this.bottom = this.right = 0
}
Region.prototype.reset = function () {
  this.top = this.left = 999999;
  this.bottom = this.right = 0
};
Region.prototype.inflate = function (c, h) {
  this.left = Math.min(this.left, c);
  this.top = Math.min(this.top, h);
  this.right = Math.max(this.right, c);
  this.bottom = Math.max(this.bottom, h)
};
Region.prototype.expand = function (c, h) {
  this.left -= c;
  this.top -= h;
  this.right += 2 * c;
  this.bottom += 2 * h
};
Region.prototype.contains = function (c, h) {
  return c > this.left && c < this.right && h > this.top && h < this.bottom
};
Region.prototype.size = function () {
  return (this.right - this.left + (this.bottom - this.top)) / 2
};
Region.prototype.center = function () {
  return new Point(this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2)
};
Region.prototype.toRectangle = function () {
  return {
    x: this.left,
    y: this.top,
    width: this.right - this.left,
    height: this.bottom - this.top
  }
};
var SinuousWorld = new function () {
  var c, h, F;

  function Q() {
    UserProfile.suportsLocalStorage() && (localStorage.unlockedLevels = q.unlockedLevels, localStorage.selectedLevel = q.selectedLevel, localStorage.mute = q.mute)
  }

  function ma() {
    q.mute ? (R.innerHTML = "Turn audio on", SinuousSound.mute()) : (R.innerHTML = "Turn audio off", SinuousSound.unmute())
  }

  function Ca() {
    q.mute = !q.mute;
    ma();
    Q();
    event.preventDefault()
  }

  function Da() {
    UserProfile.suportsLocalStorage() && (localStorage.unlockedLevels = null, localStorage.selectedLevel = null,
      q.unlockedLevels = 1, u = q.selectedLevel = 1);
    S();
    event.preventDefault();
    alert("Game history was reset.")
  }

  function Ea() {
    v || G.setAttribute("class", "open")
  }

  function Fa() {
    G.setAttribute("class", "")
  }

  function Ga(g) {
    0 == v && (SinuousSound.play(SinuousSound.CALM), v = !0, y = [], B = [], L = F = h = c = M = t = 0, u = q.selectedLevel, a.trail = [], a.position.x = H, a.position.y = I, a.shield = 0, a.gravity = 0, a.flicker = 0, a.lives = 2, a.timewarped = !1, a.timefactor = 0, a.sizewarped = !1, a.sizefactor = 0, a.gravitywarped = !1, a.gravityfactor = 0, N && (N.style.display = "none"),
      A.style.display = "none", z.style.display = "block", O.style.display = "none", T = (new Date).getTime());
    UserProfile.isTouchDevice() || g.preventDefault()
  }

  function na() {
    SinuousSound.play(SinuousSound.IDLE);
    SinuousSound.play(SinuousSound.FX_EXPLOSION);
    v = !1;
    oa = (new Date).getTime() - T;
    Ha();
    N && (N.style.display = "block");
    A.style.display = "block";
    t = Math.round(t);
    pa.innerHTML = "Game Over! (" + t + " points)";
    scoreText = "Level: <span>" + u + "</span>";
    scoreText += " Score: <span>" + Math.round(t) + "</span>";
    scoreText += " Time: <span>" +
      Math.round(((new Date).getTime() - T) / 1E3 * 100) / 100 + "s</span>";
    z.innerHTML = scoreText
  }

  function S() {
    for (var a = U.getElementsByTagName("li"), b = 0, x = a.length; b < x; b++) {
      var c = b >= q.unlockedLevels ? "locked" : "unlocked";
      b + 1 == q.selectedLevel && (c = "selected");
      a[b].setAttribute("class", c)
    }
  }

  function Ia(a) {
    "unlocked" == a.target.getAttribute("class") && (q.selectedLevel = parseInt(a.target.getAttribute("data-level")), u = q.selectedLevel, S(), Q());
    a.preventDefault()
  }

  function V() {
    qa.style.display = "none";
    O.style.display = "none";
    UserProfile.isOnline = !1
  }

  function Ja(a) {
    a = 10 > f.length;
    for (var g = 0; g < f.length; g++)
      if (t > f[g].score) {
        a = !0;
        break
      } a && (W.value && " " != W.value ? (Ka(), O.style.display = "none") : alert("Name can not be empty."))
  }

  function Ha() {
    AJAX.post("/php/highscore.php", "m=ghs" + (C ? "&table=facebook" : ""), function (a) {
      f = eval(a);
      La()
    }, function () {
      V()
    })
  }

  function Ma() {
    AJAX.post("/php/highscore.php", "m=ghs" + (C ? "&table=facebook" : ""), function (a) {
      f = eval(a);
      ca()
    }, function () {
      V()
    })
  }

  function Ka() {
    var a = W.value,
      b = Math.round(oa / 1E3 * 100) / 100;
    a = "m=shs&n=" + a + ("&s=" +
      t * t * 3.14159265 * Math.max(a.length, 1));
    a = a + ("&d=" + b) + ("&sc=" + sc);
    a += "&fc=" + Math.round(c);
    a += "&fs=" + Math.round(h);
    a += "&ms=" + Math.round(F);
    a += "&cs=" + Math.round(L);
    a += "&f=" + Math.round((da + ea + D) / 3);
    a += C ? "&table=facebook" : "";
    AJAX.post("/php/highscore.php", a, function (a) {
      f = eval(a);
      ca()
    }, function () {
      V()
    })
  }

  function ca() {
    if (f) {
      for (var a = "", b = 0; b < f.length; b++) a += "<li>", a += '<span class="place">' + (b + 1) + ".</span>", a += '<span class="name">' + f[b].name + "</span>", a += '<span class="score">' + f[b].score + " p</span>", a += '<span class="date">' +
        f[b].date + "</span>", a += "</li>";
      ra.innerHTML = a
    }
  }

  function La() {
    if (f && 0 == v && UserProfile.isAuthenticated) {
      for (var a = 1, b = 0; b < f.length; b++) f[b].score > t && a++;
      10 > a && (1 < f.length && (b = 9 <= f.length ? f.pop() : {}) && (b.name = "", b.score = Math.round(t), b.date = "", newHighscoreData = f.slice(0, a - 1), newHighscoreData.push(b), f = newHighscoreData = newHighscoreData.concat(f.slice(a - 1)), ca()), sa.innerHTML = "You made #" + a + " on the top list!", O.style.display = "block")
    }
  }

  function Na(a) {
    C ? (H = a.clientX - $(r).offset().left, I = a.clientY - $(r).offset().top) :
      (H = a.clientX - .5 * (window.innerWidth - k.width) - 6, I = a.clientY - .5 * (window.innerHeight - k.height) - 6)
  }

  function Oa(a) { }

  function Pa(a) { }

  function Qa(a) {
    1 == a.touches.length && (a.preventDefault(), H = a.touches[0].pageX - .5 * (window.innerWidth - k.width), I = a.touches[0].pageY - .5 * (window.innerHeight - k.height))
  }

  function Ra(a) {
    1 == a.touches.length && (a.preventDefault(), H = a.touches[0].pageX - .5 * (window.innerWidth - k.width) - 60, I = a.touches[0].pageY - .5 * (window.innerHeight - k.height) - 30)
  }

  function Sa(a) { }

  function ta() {
    k.width = UserProfile.isTouchDevice() ?
      window.innerWidth : ua;
    k.height = UserProfile.isTouchDevice() ? window.innerHeight : va;
    r.width = k.width;
    r.height = k.height;
    var a = C ? 0 : 6;
    UserProfile.isTouchDevice() ? (A.style.left = "0px", A.style.top = "0px", z.style.left = "0px", z.style.top = "0px") : (A.style.left = a + "px", A.style.top = Math.round(k.height / 4) + "px", z.style.left = a + "px", z.style.top = a + "px")
  }

  function P(a, b, c) {
    c = c || 1;
    for (c = 10 * c + 15 * Math.random() * c; 0 <= --c;) {
      var g = new Point;
      g.position.x = a.x + Math.sin(c) * b;
      g.position.y = a.y + Math.cos(c) * b;
      g.velocity = {
        x: -4 + 8 * Math.random(),
        y: -4 + 8 * Math.random()
      };
      g.alpha = 1;
      X.push(g)
    }
  }

  function Y(a, b, c, k) {
    Z.push({
      x: a,
      y: b,
      width: c,
      height: k
    })
  }

  function E(a, b, c) {
    Y(a - c, b - c, 2 * c, 2 * c)
  }

  function fa() {
    for (var g = Z.length; g--;) {
      var w = Z[g];
      b.clearRect(Math.floor(w.x), Math.floor(w.y), Math.ceil(w.width), Math.ceil(w.height))
    }
    Z = [];
    g = (new Date).getTime();
    ha++;
    g > ia + 1E3 && (D = Math.min(Math.round(1E3 * ha / (g - ia)), 60), da = Math.min(da, D), ea = Math.max(ea, D), ia = g, ha = 0);
    var x = J[u - 1],
      m = J[u];
    g = x.factor;
    w = x.multiplier;
    u < J.length && v && (g += M / x.duration * (m.factor - x.factor));
    m =
      .01 + Math.max(Math.min(D, 60), 0) / 60 * .99;
    (m = m * m * w) || (m = .5);
    w = K.x * g * (1 - a.timefactor);
    x = K.y * g * (1 - a.timefactor);
    var l = 1 == a.flicker % 4 || 2 == a.flicker % 4;
    if (v) {
      pp = a.clonePosition();
      a.position.x += .25 * (H - a.position.x);
      a.position.y += .25 * (I - a.position.y);
      t += .4 * g * m;
      t += .1 * a.distanceTo(pp) * m;
      c++;
      h += .4 * g * m;
      F += .1 * a.distanceTo(pp) * m;
      a.flicker = Math.max(a.flicker - 1, 0);
      a.shield = Math.max(a.shield - 1, 0);
      a.gravity = Math.max(a.gravity - .35, 0);
      a.timewarped ? (.5999 < a.timefactor && (a.timewarped = !1), a.timefactor += .1 * (.6 - a.timefactor)) :
        a.timefactor += .002 * (0 - a.timefactor);
      a.timefactor = Math.max(Math.min(a.timefactor, 1), 0);
      a.sizewarped ? (.5999 < a.sizefactor && (a.sizewarped = !1), a.sizefactor += .04 * (.6 - a.sizefactor)) : a.sizefactor += .01 * (0 - a.sizefactor);
      a.sizefactor = Math.max(Math.min(a.sizefactor, 1), 0);
      a.gravitywarped ? (.99995 < a.gravityfactor && (a.gravitywarped = !1), a.gravityfactor += .04 * (1 - a.gravityfactor)) : (.12 > a.gravityfactor && (a.gravityfactor = 0), a.gravityfactor += .014 * (0 - a.gravityfactor));
      a.gravityfactor = Math.max(Math.min(a.gravityfactor, 1),
        0);
      if (0 < a.shield && (100 < a.shield || 0 != a.shield % 3)) {
        var d = Math.min(a.shield, 100) / 50 * a.size;
        b.beginPath();
        b.fillStyle = "#167a66";
        b.strokeStyle = "#00ffcc";
        b.arc(a.position.x, a.position.y, d, 0, 2 * Math.PI, !0);
        b.fill();
        b.stroke();
        E(a.position.x, a.position.y, d + 2)
      }
      if (0 < a.gravityfactor) {
        var f = 120 * a.gravityfactor;
        d = b.createRadialGradient(a.position.x, a.position.y, 0, a.position.x, a.position.y, f);
        d.addColorStop(.1, "rgba(0, 70, 70, 0.8)");
        d.addColorStop(.8, "rgba(0, 70, 70, 0)");
        b.beginPath();
        b.fillStyle = d;
        b.arc(a.position.x,
          a.position.y, f, 0, 2 * Math.PI, !0);
        b.fill();
        E(a.position.x, a.position.y, f)
      }
      for (; 60 > a.trail.length - 1;) a.trail.push(new Point(a.position.x, a.position.y));
      b.beginPath();
      b.strokeStyle = l ? "333333" : "#648d93";
      b.lineWidth = 2;
      var r = new Region;
      d = 0;
      for (f = a.trail.length; d < f; d++) p = a.trail[d], p2 = a.trail[d + 1], 0 == d ? b.moveTo(p.position.x, p.position.y) : p2 && b.quadraticCurveTo(p.position.x, p.position.y, p.position.x + (p2.position.x - p.position.x) / 2, p.position.y + (p2.position.y - p.position.y) / 2), r.inflate(p.position.x, p.position.y),
        p.position.x += w, p.position.y += x;
      r.expand(10, 10);
      d = r.toRectangle();
      Y(d.x, d.y, d.width, d.height);
      b.stroke();
      b.closePath();
      f = 0;
      for (d = a.trail.length - 1; 0 < d; d--) {
        p = a.trail[d];
        if (51 == d || 45 == d || 39 == d) b.beginPath(), b.lineWidth = .5, b.fillStyle = l ? "#333333" : "#8ff1ff", b.arc(p.position.x, p.position.y, 2.5, 0, 2 * Math.PI, !0), b.fill(), E(p.position.x, p.position.y, 8), f++;
        if (f == a.lives) break
      }
      60 < a.trail.length && a.trail.shift();
      b.beginPath();
      b.fillStyle = l ? "#333333" : "#8ff1ff";
      b.arc(a.position.x, a.position.y, a.size / 2, 0, 2 * Math.PI,
        !0);
      b.fill();
      E(a.position.x, a.position.y, a.size + 6)
    }
    v && (0 > a.position.x || a.position.x > k.width || 0 > a.position.y || a.position.y > k.height) && (P(a.position, 10), na());
    for (d = 0; d < y.length; d++) {
      p = y[d];
      p.size = p.originalSize * (1 - a.sizefactor);
      p.offset.x *= .95;
      p.offset.y *= .95;
      l = p.distanceTo(a.position);
      if (v)
        if (0 < a.gravityfactor) r = Math.atan2(p.position.y - a.position.y, p.position.x - a.position.x), f = 120 * a.gravityfactor, l < f && (p.offset.x += .2 * (Math.cos(r) * (f - l) - p.offset.x), p.offset.y += .2 * (Math.sin(r) * (f - l) - p.offset.y));
        else if (0 <
          a.shield && l < .5 * (4 * a.size + p.size)) {
          SinuousSound.play(SinuousSound.FX_BREAK);
          P(p.position, 10);
          y.splice(d, 1);
          d--;
          t += 20 * m;
          L += 20 * m;
          aa(Math.ceil(20 * m), p.clonePosition(), p.force);
          continue
        } else l < .5 * (a.size + p.size) && 0 == a.flicker && (0 < a.lives ? (P(a.position, 4), a.lives--, a.flicker += 60, y.splice(d, 1), d--) : (P(a.position, 10), na()));
      b.beginPath();
      b.fillStyle = "#ff0000";
      b.arc(p.position.x + p.offset.x, p.position.y + p.offset.y, p.size / 2, 0, 2 * Math.PI, !0);
      b.fill();
      E(p.position.x + p.offset.x, p.position.y + p.offset.y, p.size);
      p.position.x +=
        w * p.force;
      p.position.y += x * p.force;
      if (p.position.x < -p.size || p.position.y > k.height + p.size) y.splice(d, 1), d--, v && M++
    }
    for (d = 0; d < B.length; d++) {
      p = B[d];
      if (p.distanceTo(a.position) < .5 * (a.size + p.size) && v) {
        SinuousSound.play(SinuousSound.FX_BUBBLE);
        "shield" == p.type ? (SinuousSound.play(SinuousSound.FUN), a.shield = 300) : "life" == p.type ? 3 > a.lives && (aa("LIFE UP!", p.clonePosition(), p.force), a.lives = Math.min(a.lives + 1, 3)) : "gravitywarp" == p.type ? a.gravitywarped = !0 : "timewarp" == p.type ? a.timewarped = !0 : "sizewarp" == p.type && (a.sizewarped = !0);
        "life" != p.type && (t += 50 * m, L += 50 * m, aa(Math.ceil(50 * m), p.clonePosition(), p.force));
        for (l = 0; l < y.length; l++) e = y[l], 100 > e.distanceTo(p.position) && (SinuousSound.play(SinuousSound.FX_BREAK), P(e.position, 10), y.splice(l, 1), l--, t += 20 * m, L += 20 * m, aa(Math.ceil(20 * m), e.clonePosition(), e.force));
        B.splice(d, 1);
        d--
      } else if (p.position.x < -p.size || p.position.y > k.height + p.size) B.splice(d, 1), d--;
      l = "";
      f = "#000";
      "shield" === p.type ? (l = "S", f = "#007766") : "life" === p.type ? (l = "1", f = "#009955") : "gravitywarp" === p.type ? (l = "G", f = "#225599") :
        "timewarp" === p.type ? (l = "T", f = "#665599") : "sizewarp" === p.type && (l = "M", f = "#acac00");
      b.beginPath();
      b.fillStyle = f;
      b.arc(p.position.x, p.position.y, p.size / 2, 0, 2 * Math.PI, !0);
      b.fill();
      b.save();
      b.font = "bold 12px Arial";
      b.fillStyle = "#ffffff";
      b.fillText(l, p.position.x - .5 * b.measureText(l).width, p.position.y + 4);
      b.restore();
      E(p.position.x, p.position.y, p.size);
      p.position.x += w * p.force;
      p.position.y += x * p.force
    }
    y.length < 27 * g && y.push(wa(new xa));
    if (1 > B.length && .994 < Math.random() && 0 == a.isBoosted()) {
      for (g = new ja;
        "life" ==
        g.type && 3 <= a.lives;) g.randomizeType();
      B.push(wa(g))
    }
    1 == a.shield && v && SinuousSound.play(SinuousSound.CALM);
    for (d = 0; d < X.length; d++) p = X[d], p.velocity.x += .04 * (w - p.velocity.x), p.velocity.y += .04 * (x - p.velocity.y), p.position.x += p.velocity.x, p.position.y += p.velocity.y, p.alpha -= .02, b.fillStyle = "rgba(255,255,255," + Math.max(p.alpha, 0) + ")", b.fillRect(p.position.x, p.position.y, 1, 1), E(p.position.x, p.position.y, 2), 0 >= p.alpha && X.splice(d, 1);
    for (d = 0; d < ba.length; d++) p = ba[d], p.position.x += w * p.force, p.position.y += x * p.force,
      --p.position.y, g = b.measureText(p.text).width, m = p.position.x - .5 * g, b.save(), b.font = "10px Arial", b.fillStyle = "rgba( 255, 255, 255, " + p.alpha + " )", b.fillText(p.text, m, p.position.y), b.restore(), Y(m - 5, p.position.y - 12, g + 8, 22), p.alpha *= .96, .05 > p.alpha && (ba.splice(d, 1), d--);
    n.message && "" !== n.message && (n.progress += .05 * (n.target - n.progress), .9999999 < n.progress ? n.target = 0 : 0 == n.target && .05 > n.progress && (n.message = ""), b.save(), b.font = "bold 22px Arial", p = {
      x: k.width - b.measureText(n.message).width - 15,
      y: k.height + 40 -
        55 * n.progress
    }, b.translate(p.x, p.y), b.fillStyle = "rgba( 0, 0, 0, " + .4 * n.progress + " )", b.fillRect(-15, -30, 200, 100), b.fillStyle = "rgba( 255, 255, 255, " + n.progress + " )", b.fillText(n.message, 0, 0), Y(p.x - 15, p.y - 30, 200, 100), b.restore());
    if (v) {
      if (g = M > J[u - 1].duration) u < J.length ? (u++, M = 0, q.unlockedLevels = Math.max(q.unlockedLevels, u), Q(), S(), g = !0) : g = !1;
      g && (n.message = "LEVEL " + u + "!", n.progress = 0, n.target = 1);
      scoreText = "Level: <span>" + u + "</span>";
      scoreText += " Score: <span>" + Math.round(t) + "</span>";
      scoreText += " Time: <span>" +
        Math.round(((new Date).getTime() - T) / 1E3 * 100) / 100 + "s</span>";
      scoreText += ' <p class="fps">FPS: <span>' + Math.round(D) + " (" + Math.round(100 * Math.max(Math.min(D / 60, 60), 0)) + "%)</span></p>";
      z.innerHTML = scoreText
    }
    ka || requestAnimFrame(fa)
  }

  function aa(a, b, c) {
    ba.push({
      text: a,
      position: {
        x: b.x,
        y: b.y
      },
      alpha: 1,
      force: c
    })
  }

  function wa(a) {
    .5 < Math.random() ? (a.position.x = Math.random() * k.width, a.position.y = -20) : (a.position.x = k.width + 20, a.position.y = .2 * -k.height + Math.random() * k.height * 1.2);
    return a
  }

  function la() {
    this.position = {
      x: 0,
      y: 0
    };
    this.trail = [];
    this.size = 8;
    this.shield = 0;
    this.lives = 2;
    this.flicker = 0;
    this.gravitywarped = !1;
    this.gravityfactor = 0;
    this.timewarped = !1;
    this.timefactor = 0;
    this.sizewarped = !1;
    this.sizefactor = 0
  }

  function xa() {
    this.position = {
      x: 0,
      y: 0
    };
    this.offset = {
      x: 0,
      y: 0
    };
    this.originalSize = this.size = 6 + 4 * Math.random();
    this.force = 1 + .4 * Math.random()
  }

  function ja() {
    this.type = null;
    this.position = {
      x: 0,
      y: 0
    };
    this.size = 20 + 4 * Math.random();
    this.force = .8 + .4 * Math.random();
    this.randomizeType()
  }
  var C = window.FACEBOOK_MODE || !1,
    ua = C ?
      758 : 1E3,
    va = C ? 500 : 600,
    ya = "shield shield life gravitywarp gravitywarp timewarp sizewarp".split(" "),
    k = {
      x: 0,
      y: 0,
      width: UserProfile.isTouchDevice() ? window.innerWidth : ua,
      height: UserProfile.isTouchDevice() ? window.innerHeight : va
    },
    r, b, G, z, A, pa, U, N, za, R, Aa = null,
    n = {
      messsage: "",
      progress: 0,
      target: 0
    },
    y = [],
    B = [],
    X = [],
    ba = [],
    a = null,
    H = window.innerWidth - k.width,
    I = window.innerHeight - k.height,
    v = !1,
    ka = !1,
    t = 0,
    T = 0,
    oa = 0,
    M = 0,
    Z = [],
    u = 1,
    J = [{
      factor: 1.2,
      duration: 100,
      multiplier: .5
    }, {
      factor: 1.4,
      duration: 200,
      multiplier: .6
    }, {
      factor: 1.6,
      duration: 300,
      multiplier: .7
    }, {
      factor: 1.8,
      duration: 450,
      multiplier: .8
    }, {
      factor: 2,
      duration: 600,
      multiplier: 1
    }, {
      factor: 2.4,
      duration: 800,
      multiplier: 1.1
    }, {
      factor: 2.9,
      duration: 1E3,
      multiplier: 1.3
    }, {
      factor: 3.5,
      duration: 1300,
      multiplier: 1.7
    }, {
      factor: 4.8,
      duration: 2E3,
      multiplier: 2
    }],
    q = {
      unlockedLevels: 1,
      selectedLevel: 1,
      mute: !1
    },
    K = {
      x: -1.3,
      y: 1
    };
  var L = F = h = c = 0;
  var D = {
    fps: 0,
    fpsMin: 1E3,
    fpsMax: 0
  },
    da = 1E3,
    ea = 0,
    ia = (new Date).getTime(),
    ha = 0,
    f = [],
    qa, ra, O, W, Ba, sa = null;
  this.initialize = function () {
    r = document.getElementById("world");
    G = document.getElementsByTagName("header")[0];
    A = document.getElementById("game-panels");
    z = document.getElementById("game-status");
    document.getElementById("message");
    N = document.getElementById("promotion");
    pa = document.getElementById("title");
    U = document.getElementById("level-selector");
    za = document.getElementById("start-button");
    R = document.getElementById("mute-button");
    Aa = document.getElementById("reset-button");
    qa = document.getElementById("highscore-list");
    ra = document.getElementById("highscore-output");
    O =
      document.getElementById("highscore-win");
    W = document.getElementById("highscore-input");
    Ba = document.getElementById("highscore-submit");
    sa = document.getElementById("highscore-place");
    if (r && r.getContext) {
      b = r.getContext("2d");
      document.addEventListener("mousemove", Na, !1);
      document.addEventListener("mousedown", Oa, !1);
      document.addEventListener("mouseup", Pa, !1);
      r.addEventListener("touchstart", Qa, !1);
      document.addEventListener("touchmove", Ra, !1);
      document.addEventListener("touchend", Sa, !1);
      za.addEventListener("click",
        Ga, !1);
      R.addEventListener("click", Ca, !1);
      Aa.addEventListener("click", Da, !1);
      Ba.addEventListener("click", Ja, !1);
      G.addEventListener("mouseover", Ea, !1);
      G.addEventListener("mouseout", Fa, !1);
      window.addEventListener("resize", ta, !1);
      SinuousSound.initialize();
      if (UserProfile.suportsLocalStorage()) {
        var c = parseInt(localStorage.unlockedLevels),
          f = parseInt(localStorage.selectedLevel),
          h = localStorage.mute;
        c && (q.unlockedLevels = c);
        f && (q.selectedLevel = f);
        h && (q.mute = "true" == h)
      }
      ma();
      h = "";
      c = 1;
      for (f = J.length; c <= f; c++) h +=
        '<li data-level="' + c + '">' + c + "</li>";
      U.getElementsByTagName("ul")[0].innerHTML = h;
      h = U.getElementsByTagName("li");
      c = 0;
      for (f = h.length; c < f; c++) h[c].addEventListener("click", Ia, !1);
      S();
      a = new la;
      ta();
      UserProfile.isTouchDevice() && (z.style.width = k.width + "px", r.style.border = "none", G.style.display = "none", K.x *= 2, K.y *= 2);
      fa();
      UserProfile.isOnline || V();
      r.style.display = "block";
      A.style.display = "block";
      Ma()
    }
  };
  this.pause = function () {
    ka = !0;
    SinuousSound.mute()
  };
  this.resume = function () {
    ka = !1;
    UserProfile.suportsLocalStorage() &&
      "false" == localStorage.mute && (SinuousSound.unmute(), SinuousSound.play(SinuousSound.CALM));
    fa()
  };
  la.prototype = new Point;
  la.prototype.isBoosted = function () {
    return 0 != this.shield || 0 != this.gravityfactor
  };
  xa.prototype = new Point;
  ja.prototype = new Point;
  ja.prototype.randomizeType = function () {
    this.type = ya[Math.round(Math.random() * (ya.length - 1))]
  }
};
window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (c, h) {
    window.setTimeout(c, 1E3 / 60)
  }
}();
window.addEventListener("load", function (c) {
  window.applicationCache && window.applicationCache.addEventListener("updateready", function (c) {
    window.applicationCache.status == window.applicationCache.UPDATEREADY && (window.applicationCache.swapCache(), confirm("A new version of the game is available. Load it?") && window.location.reload())
  }, !1)
});
FACEBOOK_MODE ? (UserProfile.isOnline = !0, UserProfile.isAuthenticated = !0, SinuousWorld.initialize()) : $.post("/php/login-verify.php", "").success(function (c) {
  UserProfile.isOnline = !0;
  "false" == c ? (UserProfile.isAuthenticated = !1, document.getElementById("highscore-list").innerHTML += '<p class="auth out">You need to <a href="/php/login.php">sign in</a> with a Google account to be eligible for the leaderboard.</p>') : (UserProfile.isAuthenticated = !0, document.getElementById("highscore-list").innerHTML += '<p class="auth in">Logged in as ' +
    c + '. <a href="/php/logout.php">Sign out?</a></p>');
  SinuousWorld.initialize()
}).error(function () {
  UserProfile.isOnline = !1;
  UserProfile.isAuthenticated = !1;
  SinuousWorld.initialize()
});

function sendToJavaScript(c) {
  "SoundController ready and loaded!" == c && SinuousSound.play(SinuousSound.IDLE)
};