/* ============================================================
   KOSONG — KOS 21
   app.js  ·  mesin hp + aplikasi + hujan + efek
   ============================================================ */
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

/* ---------------- storage ---------------- */
const store = {
  get(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  trySet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

/* ---------------- cast ---------------- */
let CASTS = store.get('kosong.cast', null) || JSON.parse(JSON.stringify(CAST));
function cast() { return CASTS; }
function getCast(id) { return CASTS.find(c => c.id === id) || { id, name:id, nick:id, color:'#555', user:id, role:'', bio:'' }; }
function ME() { return getCast('me'); }
function saveCast() { store.set('kosong.cast', CASTS); }
function initials(n) { return (n || '?').trim().slice(0, 1).toUpperCase(); }

/* foto avatar dari studio (kalau ada) → avatar profil → inisial */
function avPic(id) {
  const own = photoSrc('av_' + id);
  const c = getCast(id);
  const ini = esc(initials(c.name));
  if (own) return `<img src="${esc(own)}" alt="" onerror="this.classList.add('bad')"><span class="ini">${ini}</span>`;
  return c.avatar ? `<img src="${esc(c.avatar)}" alt="" onerror="this.classList.add('bad')"><span class="ini">${ini}</span>` : ini;
}
function avHTML(id, cls = '') {
  const c = getCast(id);
  return `<div class="av ${cls}" style="--c:${c.color}">${avPic(id)}</div>`;
}
function avBig(c) {
  return `<div class="av" style="--c:${c.color};width:56px;height:56px;font-size:19px">${avPic(c.id)}</div>`;
}
function groupAv(cls = '') {
  const p = photoSrc('av_group');
  return `<div class="av grp ${cls}">${p ? `<img src="${esc(p)}" alt="" onerror="this.classList.add('bad')"><span class="ini">21</span>` : '21'}</div>`;
}

/* ============================================================
   FOTO — slot manual (hanya bisa diisi dari Studio pemilik)
   ============================================================ */
const PX = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

function photoSrc(key) {
  const file = (typeof FOTO === 'object' && FOTO && FOTO[key]) ? FOTO[key] : '';
  /* foto hasil upload dari Studio Foto: file-nya ada di folder foto/,
     di sini cuma disimpan cap waktu biar browser nggak pakai gambar lama */
  const stamp = store.get('kosong.stamp.' + key, null);
  if (stamp && file) return file + '?v=' + encodeURIComponent(stamp);
  const own = store.get('kosong.photo.' + key, null);
  if (own) return own;
  return file;
}
/* gambar kecil: kalau belum ada foto, tampil kotak "foto belum diisi" */
const BROKEN = 'data:image/gif;base64,INVALID';
function photoHTML(key, extra = '') {
  const src = photoSrc(key);
  return `<div class="phimg ${extra}">
    <img src="${esc(src || BROKEN)}" alt="" onerror="this.classList.add('bad')">
    <div class="phmiss"><span>foto belum diisi</span><small>taruh di folder foto/</small></div>
  </div>`;
}
function pickPhoto(key) {
  if (!key || key === 'x') return;
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = () => {
    const f = inp.files[0]; if (!f) return;
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        /* 1. kecilkan dulu, lalu kirim ke server supaya jadi file di folder foto/ */
        const cv = shrinkImg(img, 1600);
        cv.toBlob(async blob => {
          let saved = false;
          if (blob) saved = await uploadToFolder(key, blob);
          /* 2. kalau server tidak bisa dipakai (mis. web dibuka tanpa serve.py),
                simpan di perangkat seperti cara lama supaya foto tetap tampil */
          if (!saved) saveLocalPhoto(key, img);
          afterPhoto(key, saved);
        }, 'image/jpeg', .92);
      };
      img.onerror = () => photoToast('File itu tidak bisa dibaca sebagai gambar.', false);
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  };
  inp.click();
}
function shrinkImg(img, max) {
  const r = Math.min(1, max / Math.max(img.width, img.height));
  const cv = document.createElement('canvas');
  cv.width = Math.max(1, Math.round(img.width * r));
  cv.height = Math.max(1, Math.round(img.height * r));
  const cx = cv.getContext('2d');
  cx.fillStyle = '#000'; cx.fillRect(0, 0, cv.width, cv.height);
  cx.drawImage(img, 0, 0, cv.width, cv.height);
  return cv;
}
/* kirim ke serve.py -> foto/<slot>.jpg */
async function uploadToFolder(key, blob) {
  try {
    const r = await fetch('api/upload?slot=' + encodeURIComponent(key), {
      method: 'POST',
      headers: { 'Content-Type': 'image/jpeg' },
      body: blob
    });
    if (!r.ok) return false;
    const j = await r.json();
    if (!j || !j.ok) return false;
    store.del('kosong.photo.' + key);
    store.set('kosong.stamp.' + key, String(j.v || Date.now()));
    return true;
  } catch (e) {
    return false;
  }
}
/* simpanan cadangan di browser (kalau folder foto/ tidak bisa ditulis) */
function saveLocalPhoto(key, img) {
  const cv = shrinkImg(img, 900);
  let data = cv.toDataURL('image/jpeg', .78);
  for (let q = 0; !store.trySet('kosong.photo.' + key, data) && q < 3; q++) {
    const c2 = shrinkImg(cv, Math.round(Math.max(cv.width, cv.height) * .7));
    data = c2.toDataURL('image/jpeg', .7);
  }
  store.del('kosong.stamp.' + key);
}
function afterPhoto(key, inFolder) {
  if (key === 'lock' || key === 'home') updateWalls();
  if (S.app) renderApp();
  photoToast(inFolder
    ? `Foto masuk ke folder foto/${key}.jpg`
    : `Foto tersimpan di perangkat ini.`,
    !!inFolder);
}
function photoToast(msg, ok) {
  const d = document.createElement('div');
  d.textContent = msg;
  d.style.cssText = 'position:fixed;left:50%;bottom:74px;transform:translateX(-50%);z-index:9999;' +
    'max-width:86%;padding:11px 16px;border-radius:14px;font:12.5px/1.4 -apple-system,system-ui,sans-serif;' +
    'text-align:center;color:#f2f2f7;background:' + (ok ? 'rgba(28,32,38,.96)' : 'rgba(58,26,26,.96)') +
    ';border:1px solid ' + (ok ? 'rgba(255,255,255,.14)' : 'rgba(255,69,58,.5)') +
    ';box-shadow:0 10px 30px rgba(0,0,0,.5);backdrop-filter:blur(8px)';
  document.body.appendChild(d);
  setTimeout(() => { d.style.transition = 'opacity .35s'; d.style.opacity = '0'; }, 1900);
  setTimeout(() => d.remove(), 2350);
}
function wallpaper(el, file, grad) {
  el.style.background = `${file ? `url("${file}") center/cover no-repeat, ` : ''}${grad}`;
}

/* ============================================================
   AUDIO
   ============================================================ */
let AC = null, MG = null, droneG = null, ringT = null;
let rainSrc = null, rainGain = null;
function audioInit() {
  if (AC) return;
  try {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    MG = AC.createGain(); MG.gain.value = .75; MG.connect(AC.destination);
    droneG = AC.createGain(); droneG.gain.value = 0; droneG.connect(MG);
    const o1 = AC.createOscillator(), o2 = AC.createOscillator(), o3 = AC.createOscillator();
    o1.type = 'sine'; o1.frequency.value = 55;
    o2.type = 'triangle'; o2.frequency.value = 82.4;
    o3.type = 'sine'; o3.frequency.value = 110.5;
    const f = AC.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 260;
    const g2 = AC.createGain(); g2.gain.value = .35;
    o1.connect(f); o2.connect(g2); g2.connect(f); o3.connect(f);
    f.connect(droneG);
    o1.start(); o2.start(); o3.start();
    const lfo = AC.createOscillator(), lg = AC.createGain();
    lfo.frequency.value = .06; lg.gain.value = 90;
    lfo.connect(lg); lg.connect(f.frequency); lfo.start();
  } catch (e) { AC = null; }
}
function tone(freq, dur = .16, type = 'sine', vol = .05, at = 0) {
  if (!AC || !S.sound) return;
  const t = AC.currentTime + at;
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + .012);
  g.gain.exponentialRampToValueAtTime(.0001, t + dur);
  o.connect(g); g.connect(MG); o.start(t); o.stop(t + dur + .05);
}
function noiseBuf(sec = 1) {
  const b = AC.createBuffer(1, AC.sampleRate * sec, AC.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
function noise(dur = .3, freq = 1200, vol = .07, type = 'bandpass', q = .8) {
  if (!AC || !S.sound) return;
  const src = AC.createBufferSource(); src.buffer = noiseBuf(dur);
  const f = AC.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
  const g = AC.createGain(); g.gain.value = vol;
  src.connect(f); f.connect(g); g.connect(MG); src.start();
  src.stop(AC.currentTime + dur);
}
function chime() { tone(1046, .12, 'sine', .045); tone(1568, .16, 'sine', .03, .09); }
function blip() { tone(880, .06, 'sine', .022); }
function knockSfx() {
  if (!AC || !S.sound) return;
  noise(.14, 260, .16, 'lowpass', .7);
  tone(70, .18, 'sine', .09);
}
function staticSfx(sec = .3) { noise(sec, 2400, .05, 'highpass', .6); }
function panNoise(dur, freq, vol, type, q, pan = 0) {
  if (!AC || !S.sound) return;
  const src = AC.createBufferSource(); src.buffer = noiseBuf(dur);
  const f = AC.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
  const g = AC.createGain(); g.gain.value = vol;
  let out = g;
  if (AC.createStereoPanner) {
    const p = AC.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan));
    g.connect(p); out = p;
  }
  src.connect(f); f.connect(g); out.connect(MG); src.start();
  src.stop(AC.currentTime + dur);
}
function whisperSfx(pan = 0) {
  panNoise(.85, 1450, .05, 'bandpass', 1.3, pan);
  panNoise(.55, 900, .028, 'bandpass', 2.2, -pan * .65);
  tone(190, .7, 'sine', .012);
}
function stingSfx() {
  if (!AC || !S.sound) return;
  const t = AC.currentTime;
  [960, 1290, 1710].forEach((f0, i) => {
    const o = AC.createOscillator(), g = AC.createGain(), bp = AC.createBiquadFilter();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f0 * 1.45, t + .16);
    bp.type = 'bandpass'; bp.frequency.value = 1800 + i * 600; bp.Q.value = 3;
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(.022, t + .04);
    g.gain.exponentialRampToValueAtTime(.0001, t + .42);
    o.connect(bp); bp.connect(g); g.connect(MG);
    o.start(t + i * .01); o.stop(t + .45);
  });
  noise(.3, 3400, .085, 'highpass', .5);
  tone(54, .7, 'sine', .1);
  tone(41, .9, 'sine', .06);
}
function creakSfx() {
  if (!AC || !S.sound) return;
  const t = AC.currentTime;
  [180, 260].forEach((f0, i) => {
    const o = AC.createOscillator(), g = AC.createGain(), f = AC.createBiquadFilter();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(f0, t);
    o.frequency.linearRampToValueAtTime(f0 * 1.35, t + .45);
    o.frequency.linearRampToValueAtTime(f0 * .85, t + .95);
    f.type = 'bandpass'; f.frequency.value = 700 + i * 500; f.Q.value = 4;
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(.018, t + .12);
    g.gain.exponentialRampToValueAtTime(.0001, t + 1);
    o.connect(f); f.connect(g); g.connect(MG); o.start(t); o.stop(t + 1.05);
  });
  noise(1, 420, .02, 'lowpass', .6);
}
function stepSfx() {
  thudSfx();
  noise(.12, 900, .035, 'bandpass', 1.2);
}
function keyTick() { tone(1500 + Math.random() * 600, .018, 'square', .0035); }
function thudSfx() {
  tone(46, .55, 'sine', .085);
  noise(.22, 170, .06, 'lowpass', .8);
}
function breathSfx() {
  noise(.55, 520, .05, 'bandpass', .9);
  setTimeout(() => noise(.65, 420, .04, 'bandpass', .8), 900);
}
/* ---- suara teriakan dari folder suara/ ---- */
/* kalau belum ada file, otomatis pakai teriakan bawaan (disintesis). */
const SUARA_BAWAAN = { teriak: 'suara/teriak.mp3', akhir: 'suara/akhir.mp3' };
function suaraSrc(key) {
  const map = (typeof SUARA === 'object' && SUARA) ? SUARA : {};
  return map[key] || SUARA_BAWAAN[key] || '';
}
let screamEl = null, screamKey = null;
function playScream(key = 'teriak') {
  if (!S.sound) return;
  if (screamEl) { try { screamEl.pause(); screamEl.currentTime = 0; } catch (e) {} screamEl = null; }
  const src = suaraSrc(key);
  if (!src) { screamSfx(); return; }
  try {
    const a = new Audio(src);
    a.volume = key === 'akhir' ? 1 : .95;
    a.preload = 'auto';
    screamEl = a; screamKey = key;
    a.onerror = () => { if (screamEl === a) { screamEl = null; screamSfx(); } };
    const p = a.play();
    if (p && p.catch) p.catch(() => { if (screamEl === a) { screamEl = null; screamSfx(); } });
  } catch (e) {
    screamSfx();
  }
}
function screamSfx() {
  if (!AC || !S.sound) return;
  const t = AC.currentTime;
  [[720, 0], [880, .05], [1060, .11], [640, .52], [980, .58]].forEach(([base, at], i) => {
    const o = AC.createOscillator(), bp = AC.createBiquadFilter(), g = AC.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(base * 1.32, t + at);
    o.frequency.exponentialRampToValueAtTime(base * .48, t + at + 1.2);
    bp.type = 'bandpass';
    bp.frequency.value = 1400 + i * 380;
    bp.Q.value = 2.2;
    g.gain.setValueAtTime(.0001, t + at);
    g.gain.exponentialRampToValueAtTime(.052, t + at + .055);
    g.gain.exponentialRampToValueAtTime(.0001, t + at + 1.45);
    o.connect(bp); bp.connect(g); g.connect(MG);
    o.start(t + at); o.stop(t + at + 1.5);
  });
  noise(1.5, 2600, .06, 'bandpass', .9);
  noise(1, 650, .04, 'lowpass', .7);
  tone(68, 1.3, 'sawtooth', .065);
}
function drone(on) { if (droneG) droneG.gain.linearRampToValueAtTime(on ? .045 : 0, AC.currentTime + 1.4); }

/* hujan tipis: noise loop, bukan file audio */
function rain(on = true) {
  if (!AC) return;
  if (!S.sound) {
    if (rainGain) rainGain.gain.linearRampToValueAtTime(0, AC.currentTime + .4);
    return;
  }
  if (on) {
    if (rainSrc) {
      rainGain.gain.linearRampToValueAtTime(.055, AC.currentTime + 1.2);
      return;
    }
    const sec = 5;
    const buf = AC.createBuffer(1, AC.sampleRate * sec, AC.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + .035 * w) / 1.035;
      d[i] = last * 5.5;
    }
    rainSrc = AC.createBufferSource();
    rainSrc.buffer = buf;
    rainSrc.loop = true;
    const hp = AC.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 280;
    const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2300;
    rainGain = AC.createGain(); rainGain.gain.value = 0;
    rainSrc.connect(hp); hp.connect(lp); lp.connect(rainGain); rainGain.connect(MG);
    rainSrc.start();
    rainGain.gain.linearRampToValueAtTime(.05, AC.currentTime + 2.4);
  } else if (rainGain) {
    rainGain.gain.linearRampToValueAtTime(0, AC.currentTime + 1.6);
  }
}

/* satu nada pelan, buat momen yang nggak perlu dijelaskan */
function softNote(freq = 392, dur = 2.6, vol = .022) {
  if (!AC || !S.sound) return;
  const t = AC.currentTime;
  [1, 2, 3].forEach((m, i) => {
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = i === 0 ? 'sine' : 'triangle';
    o.frequency.value = freq * m;
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(vol / (i + 1.5), t + .04);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g); g.connect(MG);
    o.start(t); o.stop(t + dur + .05);
  });
}
function ring(on) {
  if (on) {
    if (ringT) return;
    const go = () => { tone(680, .38, 'sine', .035); tone(860, .38, 'sine', .025, .42); };
    go(); ringT = setInterval(go, 1800);
  } else { clearInterval(ringT); ringT = null; }
}
function vibrate(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} }

/* ============================================================
   STATE
   ============================================================ */
const S = {
  screen: 'lock', app: null, convo: null,
  clock: '21.00', speed: (() => { const r = store.get('kosong.rate', 1); return [.5, .75, 1, 1.5, 2].includes(r) ? r : 1; })(),
  photoMgr: false, studioUnlocked: false,
  ask: null, storyStarted: false,
  flags: new Set(), unlocked: new Set(),
  unread: { group: 3 },
  lastTimes: { group: '2019', martin: '2019', james: '2019', juhoon: '2019', seonghyeon: '2019', self: '—' },
  endings: (store.get('kosong.endings', []) || []).filter(k => !!ENDINGS[k]),
  sound: store.get('kosong.sound', true),
  typing: {},
  convos: {}
};

function named(t) { return String(t).replace(/\{me\}/g, ME().nick); }

function seed() {
  S.convos = {
    group: {
      id: 'group', name: 'KOS 21', group: true, members: 5, msgs: [
        { sys: 'Sabtu, 24 Agustus 2019' },
        { who: 'martin', text: 'selamat datang di rumah 21. kamar 5 udah dibersihin.' },
        { who: 'james', text: 'kamar 5 itu yang di ujung kan' },
        { who: 'martin', text: 'iya' },
        { who: 'juhoon', text: 'pintunya susah dikunci. tarik dulu baru puter.' },
        { who: 'me', text: 'oke bang makasih' },
        { who: 'seonghyeon', text: 'kalau ada yang pulang malam, sisain lampu koridor.' },
        { who: 'james', text: 'siap bang' }
      ]
    },
    martin: { id: 'martin', name: 'Martin', msgs: [
      { who: 'martin', text: 'kono, kalau ada apa-apa ketuk kamar gue. gue nggak tidur cepat.' },
      { who: 'me', text: 'iya bang' }
    ] },
    james: { id: 'james', name: 'James', msgs: [
      { who: 'james', text: 'nanti gue beliin sikat gigi. kamu yang mana?' },
      { who: 'me', text: 'yang biru' },
      { who: 'james', text: 'oke. gue beli enam.' }
    ] },
    juhoon: { id: 'juhoon', name: 'Juhoon', msgs: [
      { who: 'juhoon', text: 'kono, besok gue foto kita di depan rolling door.' },
      { who: 'me', text: 'buat apa?' },
      { who: 'juhoon', text: 'buat kenang-kenangan.' }
    ] },
    seonghyeon: { id: 'seonghyeon', name: 'Seonghyeon', msgs: [
      { who: 'seonghyeon', text: 'aku tulis sesuatu di catatan. tolong baca.' },
      { who: 'me', text: 'soal apa' },
      { who: 'seonghyeon', text: 'soal rumah ini.' }
    ] },
    self: { id: 'self', name: 'Keonho', hidden: true, msgs: [] }
  };
}

/* ============================================================
   LAYOUT
   ============================================================ */
const PHONE = $('#phone');
function fit() {
  const w = innerWidth, h = innerHeight;
  const s = Math.min((w - 8) / 411, (h - 8) / 871, 1.02);
  PHONE.style.transform = `translate(-50%,-50%) scale(${s})`;
}
addEventListener('resize', fit);
addEventListener('orientationchange', () => setTimeout(fit, 150));

function setScreen(n) {
  S.screen = n;
  $$('.scr').forEach(e => e.classList.remove('on'));
  ({ lock: '#lock', pass: '#pass', home: '#home', app: '#app' }[n] && $({ lock: '#lock', pass: '#pass', home: '#home', app: '#app' }[n]).classList.add('on'));
}
function setClock(t) {
  S.clock = t;
  $('#clk').textContent = t;
  $('#lkTime').textContent = t;
}

/* ============================================================
   LOCK / PASSCODE
   ============================================================ */
const NOTIFS = [
  { id: 'martin', title: 'Martin', text: 'kunci rumah dibalikin besok jam 10.', time: '20.58' },
  { id: 'james', title: 'James', text: 'nasi ayam lima bungkus. jangan telat.', time: '20.56' },
  { id: 'group', title: 'KOS 21', text: 'malam terakhir. jangan tidur dulu.', time: '20.52' }
];
function updateWalls() {
  wallpaper($('#lkWall'), photoSrc('lock'), 'linear-gradient(180deg,#0a0e14 0%,#131c26 52%,#05070a 100%)');
  wallpaper($('#hmWall'), photoSrc('home'), 'linear-gradient(195deg,#0d1219 0%,#1a232e 55%,#05070a 100%)');
}
function renderLock() {
  updateWalls();
  $('#lkNotifs').innerHTML = NOTIFS.map(n => {
    const own = photoSrc(n.id === 'group' ? 'av_group' : 'av_' + n.id);
    const icon = own ? `<img src="${esc(own)}" alt="">`
      : (n.id === 'group' ? '21' : esc(initials(getCast(n.id).name)));
    return `<div class="nt" data-go="${n.id}">
      <div class="ic" style="background:${getCast(n.id).color}">${icon}</div>
      <div class="tx"><b>${esc(n.title)}</b><p>${esc(n.text)}</p><small>${n.time}</small></div>
    </div>`;
  }).join('');
  $$('#lkNotifs .nt').forEach(el => el.onclick = e => { e.stopPropagation(); askPass(); });
  $('#lkNotifs').onclick = () => askPass();
}

let passBuf = '';
function askPass() { setScreen('pass'); passBuf = ''; drawDots(); $('#passHint').textContent = 'tahun pertama di rumah 21'; }
function drawDots() { $$('#dots i').forEach((d, i) => d.classList.toggle('on', i < passBuf.length)); }
function pushDigit(d) {
  if (passBuf.length >= 4) return;
  passBuf += d; blip(); drawDots();
  if (passBuf.length === 4) setTimeout(checkPass, 180);
}
function checkPass() {
  if (passBuf === '2019') { unlockPhone(); return; }
  $('#pass').classList.add('err');
  vibrate(120);
  setTimeout(() => {
    $('#pass').classList.remove('err');
    $('#passHint').textContent = 'kode: 2019';
    passBuf = ''; drawDots();
  }, 420);
}
function unlockPhone() {
  audioInit();
  setScreen('home');
  rain(true);
  setTimeout(() => chime(), 300);
  if (!S.storyStarted) {
    setTimeout(() => notify('KOS 21', '5 anggota · 3 pesan belum dibaca', 'group', 'group'), 2600);
  }
}
(function buildPad() {
  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];
  $('#pad').innerHTML = keys.map(k =>
    k === '' ? '<b class="fn"></b>' :
    k === '⌫' ? '<b class="fn" data-del="1">Hapus</b>' :
    `<b data-k="${k}">${k}</b>`).join('');
  $('#pad').onclick = e => {
    const b = e.target.closest('b'); if (!b) return;
    if (b.dataset.k) pushDigit(b.dataset.k);
    else if (b.dataset.del) { passBuf = passBuf.slice(0, -1); drawDots(); }
  };
  $('#passCancel').onclick = () => setScreen('lock');
})();

/* lock interactions */
(function lockGesture() {
  let y0 = null;
  const up = () => askPass();
  $('#lock').addEventListener('pointerdown', e => { y0 = e.clientY; });
  $('#lock').addEventListener('pointerup', e => {
    if (y0 !== null && y0 - e.clientY > 40) up();
    y0 = null;
  });
  $('#lock').addEventListener('click', e => { if (!e.target.closest('.nt')) up(); });
})();

/* ============================================================
   HOME
   ============================================================ */
const ICON = {
  messages: '<path d="M21 11.5a8.4 8.4 0 1 1-3.2-6.6L21 4l-1 4.2A8.4 8.4 0 0 1 21 11.5Z"/>',
  photos: '<circle cx="12" cy="12" r="3.2"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
  notes: '<path d="M5 4h11l3 3v13H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  files: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.7H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 5 7.5a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10.3 3V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1.3Z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>',
  safari: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'
};
const APPS = [
  { id: 'messages', name: 'Pesan', bg: 'linear-gradient(180deg,#5df07a,#0bb52c)' },
  { id: 'photos', name: 'Foto', bg: 'linear-gradient(180deg,#ffffff,#d9d9e0)', dark: true },
  { id: 'notes', name: 'Catatan', bg: 'linear-gradient(180deg,#ffe45e,#f7c422)', dark: true },
  { id: 'mail', name: 'Mail', bg: 'linear-gradient(180deg,#5ec8ff,#0a6cff)' },
  { id: 'calendar', name: 'Kalender', bg: 'linear-gradient(180deg,#ffffff,#e6e6ec)', dark: true },
  { id: 'files', name: 'Files', bg: 'linear-gradient(180deg,#43c6ff,#0a6cff)' },
  { id: 'profile', name: 'Profil', bg: 'linear-gradient(180deg,#b9bcc6,#5f636e)' },
  { id: 'settings', name: 'Setelan', bg: 'linear-gradient(180deg,#8e8e93,#3a3a3c)' }
];
const DOCK = [
  { id: 'phone', name: 'Telepon', bg: 'linear-gradient(180deg,#6ef07a,#12b52c)' },
  { id: 'messages', name: 'Pesan', bg: 'linear-gradient(180deg,#5df07a,#0bb52c)' },
  { id: 'safari', name: 'Safari', bg: 'linear-gradient(180deg,#ffffff,#cfd9e6)', dark: true },
  { id: 'settings', name: 'Setelan', bg: 'linear-gradient(180deg,#8e8e93,#3a3a3c)' }
];
function iconHTML(a, dock) {
  const badge = a.id === 'messages' ? unreadTotal() : 0;
  const stroke = a.dark ? '#1b1b1f' : '#fff';
  return `<div class="ic" data-app="${a.id}">
    <u style="background:${a.bg};color:${stroke}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICON[a.id] || ICON.settings}</svg>
      ${badge ? `<i class="bd">${badge}</i>` : ''}
    </u>
    ${dock ? '' : `<span>${a.name}</span>`}
  </div>`;
}
function renderHome() {
  $('#hmGrid').innerHTML = APPS.map(a => iconHTML(a)).join('');
  $('#hmDock').innerHTML = DOCK.map(a => iconHTML(a, true)).join('');
  $$('#home .ic').forEach(el => el.onclick = () => openApp(el.dataset.app));
}
function unreadTotal() {
  return Object.keys(S.unread).reduce((n, k) => n + (S.convos[k] && !S.convos[k].hidden ? S.unread[k] || 0 : 0), 0);
}

/* ============================================================
   APP SHELL
   ============================================================ */
function openApp(id) {
  if (id === 'studio') return;
  S.app = id;
  if (id === 'photos') S.photoMgr = false;
  if (id !== 'messages') S.convo = null;
  setScreen('app');
  renderApp();
}
function goHome() {
  S.app = null; S.convo = null; S.studioUnlocked = false;
  setScreen('home');
  renderHome();
  remindAsk();
}
function remindAsk() {
  const a = S.ask;
  if (!a) return;
  const id = a.conv;
  S.unread[id] = (S.unread[id] || 0) + 1;
  renderHome();
  notify(
    id === 'group' ? 'KOS 21' : getCast(id === 'self' ? 'me' : id).name,
    'balasan kamu ditunggu', id, id === 'self' ? 'me' : id
  );
}

function bar(title, sub, right) {
  return `<button class="ab-back">‹</button>
    <div class="ab-t"><b>${esc(title)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</div>
    <div class="ab-r">${right || ''}</div>`;
}
function setBar(html, backFn) {
  const b = $('#appBar');
  b.innerHTML = html;
  const btn = b.querySelector('.ab-back');
  if (btn) btn.onclick = backFn;
}

function renderApp() {
  const body = $('#appBody');
  const foot = $('#appFoot');
  body.style.overflowY = 'auto';
  body.style.inset = '92px 0 0 0';
  foot.style.display = 'none';
  foot.innerHTML = '';
  if (!S.app) return;
  switch (S.app) {
    case 'messages': return S.convo ? renderChatView() : renderMessagesList();
    case 'notes': return renderNotes();
    case 'photos': return renderPhotos();
    case 'studio': return renderStudio();
    case 'mail': return renderMail();
    case 'calendar': return renderCalendar();
    case 'files': return renderFiles();
    case 'profile': return renderProfile();
    case 'settings': return renderSettings();
    case 'phone': return renderPhone();
    case 'safari': return renderSafari();
  }
}

/* ============================================================
   MESSAGES
   ============================================================ */
function convOrder() {
  const order = ['group', 'martin', 'james', 'juhoon', 'seonghyeon', 'self'];
  return order.filter(id => S.convos[id] && !S.convos[id].hidden);
}
function lastMsg(c) {
  const m = [...c.msgs].reverse().find(x => x.text || x.img);
  if (!m) return 'Belum ada pesan';
  if (m.img) return '📷 Foto';
  return (m.who === 'me' ? 'Kamu: ' : (c.group ? getCast(m.who).nick + ': ' : '')) + named(m.text);
}
function renderMessagesList() {
  setBar(bar('Pesan', '', '<span style="font-size:15px;opacity:.75">✎</span>'), goHome);
  const times = S.lastTimes;
  const rows = convOrder().map(id => {
    const c = S.convos[id];
    const av = c.group
      ? groupAv()
      : avHTML(id === 'self' ? 'me' : id);
    const name = c.group ? c.name : getCast(id === 'self' ? 'me' : id).name;
    const u = S.unread[id] || 0;
    const last = lastMsg(c);
    return `<div class="li conv" data-conv="${id}" data-s="${esc((name + ' ' + last).toLowerCase())}">
      ${av}
      <div class="li-c">
        <div class="li-t"><b>${esc(name)}${id === 'group' ? ' <span class="pill">grup</span>' : ''}</b>
          <small>${times[id] || ''}</small></div>
        <p>${esc(last)}</p>
      </div>
      ${u ? `<i class="bd">${u}</i>` : ''}
    </div>`;
  }).join('');
  $('#appBody').innerHTML = `
    <div class="searchwrap"><span class="si">⌕</span>
      <input id="convSearch" placeholder="Cari" autocomplete="off" spellcheck="false">
      <span class="sc" id="convClear">✕</span></div>
    <div class="list" id="convList">${rows}</div>
    <div class="emptyhint" id="convNone" style="display:none">Tidak ada percakapan yang cocok.</div>`;
  $$('#appBody .conv').forEach(el => el.onclick = () => openConvo(el.dataset.conv));
  const inp = $('#convSearch'), clear = $('#convClear');
  const filter = () => {
    const q = inp.value.trim().toLowerCase();
    let n = 0;
    $$('#convList .conv').forEach(el => {
      const hit = !q || el.dataset.s.indexOf(q) >= 0;
      el.style.display = hit ? '' : 'none';
      if (hit) n++;
    });
    $('#convNone').style.display = n ? 'none' : 'block';
    clear.style.display = q ? 'block' : 'none';
  };
  inp.oninput = filter;
  clear.onclick = () => { inp.value = ''; filter(); inp.focus(); };
  filter();
}

function openConvo(id) {
  S.convo = id;
  S.unread[id] = 0;
  renderApp();
  if (id === 'group' && !S.storyStarted) {
    S.storyStarted = true;
    setTimeout(runStory, 500);
  }
}
function closeConvo() { S.convo = null; renderApp(); remindAsk(); }

function renderChatView() {
  const c = S.convos[S.convo];
  if (!c) return renderMessagesList();
  const isGroup = !!c.group;
  const name = c.group ? c.name : getCast(S.convo === 'self' ? 'me' : S.convo).name;
  const sub = c.group ? `${c.members} orang` : (c.id === 'self' ? '+62 812-3344-0521' : 'terakhir dilihat 21.00');
  const right = `<span class="spd" id="spdBtn">${S.speed}×</span>${c.group ? '<span id="grpInfo" style="font-size:15px;opacity:.85;cursor:pointer">ⓘ</span>' : ''}`;
  setBar(bar(name, sub, right), closeConvo);

  $('#appBody').style.overflowY = 'hidden';
  $('#appBody').innerHTML = `<div class="chatwrap">
      <div class="chat" id="chatScroll"></div>
      <div class="chat-foot">
        <div class="choices" id="choices"></div>
        <div class="composer"><span class="plus">＋</span><div class="cf" id="cfText">Pesan</div><span class="send" id="sendBtn">↑</span></div>
      </div>
      <div class="kb" id="kb">${kbHTML()}</div>
    </div>`;
  $('#chatScroll').style.flex = '1';
  renderChat();
  $('#spdBtn').onclick = e => {
    e.stopPropagation();
    const arr = [0.5, 0.75, 1, 1.5, 2];
    let i = arr.indexOf(S.speed); if (i < 0) i = 2;
    S.speed = arr[(i + 1) % arr.length];
    store.set('kosong.rate', S.speed);
    $('#spdBtn').textContent = S.speed + '×';
  };
  if (c.id === 'group') $('#grpInfo').onclick = showMembers;
}

function kbHTML() {
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const letters = rows.map((row, i) => {
    const keys = [...row].map(ch => `<b data-k="${ch}">${ch}</b>`).join('');
    if (i === 0) return `<div class="kb-row">${keys}</div>`;
    if (i === 1) return `<div class="kb-row kb-indent">${keys}</div>`;
    return `<div class="kb-row"><b class="mod" data-mod="shift">⇧</b>${keys}<b class="mod" data-mod="del">⌫</b></div>`;
  }).join('');
  const symRow = (row, last) => {
    const keys = [...row].map(ch => {
      const h = ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : ch;
      return `<b data-k="${h}">${h}</b>`;
    }).join('');
    return `<div class="kb-row">${keys}${last ? '<b class="mod" data-mod="del">⌫</b>' : ''}</div>`;
  };
  const syms = symRow('1234567890') + symRow('-/:;()$&@"') + symRow(".,?!'_#%", true);
  return `<div class="kb-layer kbl">${letters}</div>
    <div class="kb-layer kbs">${syms}</div>
    <div class="kb-row"><b class="mod wide" data-mod="num">123</b><b class="space" data-mod="space">spasi</b><b class="mod sendk" id="kbSend">↑</b></div>`;
}

/* simulasi Kono mengetik: keyboard muncul, huruf diketik satu-satu, lalu terkirim */
async function konoType(text) {
  const kb = $('#kb'), cf = $('#cfText');
  const wrap = $('#chatScroll')?.closest('.chatwrap');
  if (!kb || !cf || !wrap) return;
  const conv = S.convo;
  const raw = String(text);
  const numKey = kb.querySelector('[data-mod="num"]');
  const symKeys = new Set([...kb.querySelectorAll('.kbs b[data-k]')].map(x => x.dataset.k));
  const common = ".,?!'";
  const useSym = on => {
    kb.classList.toggle('syms', on);
    if (numKey) numKey.textContent = on ? 'ABC' : '123';
  };
  useSym(false);
  kb.classList.add('on');
  wrap.classList.add('kb-open');
  cf.classList.add('typing');
  cf.textContent = '';
  const keys = [...kb.querySelectorAll('b[data-k]')];
  const step = Math.max(42, Math.min(95, 1800 / Math.max(8, raw.length)));
  for (let i = 0; i < raw.length; i++) {
    if (S.convo !== conv) break;
    const ch = raw[i].toLowerCase();
    if (/[a-z]/.test(ch)) useSym(false);
    else if (ch !== ' ' && !common.includes(ch) && symKeys.has(ch)) useSym(true);
    if (ch !== ' ') {
      const k = keys.find(x => x.dataset.k === ch);
      if (k) {
        k.classList.add('hit');
        setTimeout(() => k.classList.remove('hit'), 65);
      }
    }
    cf.textContent = raw.slice(0, i + 1);
    if (i % 4 === 0) keyTick();
    await sleep(step * (.85 + Math.random() * .3));
  }
  await sleep(190);
  useSym(false);
  const s = $('#kbSend');
  if (s) s.classList.add('hit');
  keyTick();
  await sleep(150);
  cf.textContent = 'Pesan';
  cf.classList.remove('typing');
  kb.classList.remove('on');
  wrap.classList.remove('kb-open');
  if (s) s.classList.remove('hit');
  await sleep(80);
}

function renderChat() {
  const box = $('#chatScroll');
  if (!box) return;
  const c = S.convos[S.convo];
  if (!c) return;
  let h = '';
  c.msgs.forEach(m => {
    if (m.sys) { h += `<div class="sys">${esc(named(m.sys))}</div>`; return; }
    if (m.who === 'me') {
      h += `<div class="msg me"><div class="mw">${m.img ? imgBubble(m) : `<div class="bb">${esc(named(m.text))}</div>`}</div></div>`;
      return;
    }
    const person = getCast(m.who);
    h += `<div class="msg them">
      ${c.group ? avHTML(m.who, 'sm') : ''}
      <div class="mw">
        ${c.group ? `<span class="who" style="color:${person.color}">${esc(person.name)}</span>` : ''}
        ${m.img ? imgBubble(m) : `<div class="bb">${esc(named(m.text))}</div>`}
      </div>
    </div>`;
  });
  if (c.typing) h += `<div class="typing"><i></i><i></i><i></i></div>`;
  box.innerHTML = h;
  box.scrollTop = box.scrollHeight;
  renderChoices();
}
function imgBubble(m) {
  return `<div class="bb img">${photoHTML(m.imgKey)}<span class="cap">${esc(m.cap || '')}</span></div>`;
}

function renderChoices() {
  const box = $('#choices');
  if (!box) return;
  const a = S.ask;
  if (!a || a.conv !== S.convo) { box.innerHTML = ''; return; }
  box.innerHTML = a.opts.map((o, i) =>
    `<button data-i="${i}" class="${o.locked ? 'locked' : ''}" ${o.locked ? 'disabled' : ''}>
      ${esc(o.t)}${o.hint ? `<small>${esc(o.hint)}</small>` : ''}
    </button>`).join('');
  box.onclick = async e => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    const o = a.opts[+b.dataset.i];
    S.ask = null;
    clearTimeout(askJumpT);
    box.innerHTML = '';
    if (!o.silent) {
      if (S.convo === a.conv && S.app === 'messages' && S.screen === 'app') await konoType(o.t);
      push(a.conv, { who: 'me', text: o.t });
      blip();
      if (S.convo === a.conv) renderChat();
    }
    a.res(o.v);
  };
}

function push(id, msg) {
  const c = S.convos[id];
  if (!c) return;
  c.msgs.push(msg);
  S.lastTimes[id] = S.clock;
  if (id === 'self') c.hidden = false;
  const visible = S.app === 'messages' && S.convo === id;
  if (!visible) {
    S.unread[id] = (S.unread[id] || 0) + 1;
    renderHome();
    if (S.app === 'messages' && !S.convo) renderMessagesList();
    if (msg.text || msg.img) notify(c.group ? c.name : getCast(id === 'self' ? 'me' : id).name,
      msg.img ? '📷 Foto' : named(msg.text), id, id === 'self' ? 'me' : id);
  }
}

/* kit helpers */
async function nap(ms) { await sleep(Math.max(120, ms / (S.speed || 1))); }

async function them(id, who, text, o = {}) {
  const c = S.convos[id];
  if (!c) return;
  if (who === 'unknown') return;
  c.typing = who;
  if (S.convo === id) renderChat();
  await nap(o.delay || 2300 + Math.random() * 1400);
  c.typing = null;
  push(id, { who, text: named(text) });
  if (S.convo === id) renderChat();
}
async function mine(id, text) {
  if (S.convo === id && S.app === 'messages' && S.screen === 'app') await konoType(text);
  push(id, { who: 'me', text: named(text) });
  if (S.convo === id) renderChat();
  await nap(550);
}
async function themImg(id, who, key, cap) {
  const c = S.convos[id];
  c.typing = who;
  if (S.convo === id) renderChat();
  await nap(2800);
  c.typing = null;
  push(id, { who, img: true, imgKey: key, cap });
  S.unlocked.add(key);
  if (S.convo === id) renderChat();
  await nap(500);
}
async function sysLine(id, text) {
  const c = S.convos[id]; if (!c) return;
  c.msgs.push({ sys: text });
  S.lastTimes[id] = S.clock;
  if (S.convo === id) renderChat();
  await nap(1200);
}
let askJumpT = null;
function ask(id, opts) {
  return new Promise(res => {
    S.ask = { conv: id, opts, res };
    if (S.convo === id) { renderChoices(); return; }
    const isDM = id !== 'group';
    S.unread[id] = (S.unread[id] || 0) + 1;
    renderHome();
    if (S.app === 'messages' && !S.convo) renderMessagesList();
    notify(
      id === 'group' ? 'KOS 21' : getCast(id === 'self' ? 'me' : id).name,
      isDM ? 'butuh balasan kamu' : 'ada pesan baru',
      id, id === 'self' ? 'me' : id
    );
    clearTimeout(askJumpT);
    askJumpT = setTimeout(() => {
      if (S.ask && S.ask.conv === id && S.convo !== id) {
        if (S.app !== 'messages') openApp('messages');
        openConvo(id);
      }
    }, 1500);
  });
}

function showMembers() {
  const c = S.convos.group;
  const rows = ['martin', 'james', 'juhoon', 'seonghyeon', 'me'].map(id => {
    const p = getCast(id);
    return `<div class="li">${avHTML(id)}<div class="li-c"><div class="li-t"><b>${esc(p.name)}${id === 'me' ? ' (kamu)' : ''}</b></div><p>${esc(p.role || p.user)}</p></div></div>`;
  }).join('');
  const extra = c.members > 5 ? `<div class="li"><div class="av" style="--c:#1a1a1d">?</div><div class="li-c"><div class="li-t"><b style="color:#8e8e93">1 lainnya</b></div><p>—</p></div></div>` : '';
  $('#appBody').style.overflowY = 'auto';
  $('#appBody').innerHTML = `
    <div class="grp-info">${groupAv('grp-big')}
      <b>KOS 21</b><small>${c.members} anggota · dibuat 2019</small>
      <span>5 kamar. 5 nama. 8 tahun.</span></div>
    <div class="sec">anggota · ${c.members}</div><div class="list">${rows}${extra}</div>
    <div class="sec">media</div><div class="list"><div class="li"><div class="li-c"><p>8 foto · 0 tautan</p></div></div></div>`;
  setBar(bar('Info', `KOS 21 · ${c.members} orang`), () => { S.convo = 'group'; renderApp(); });
  $('#appBar .ab-back').onclick = () => { S.convo = 'group'; renderApp(); };
}

/* ============================================================
   NOTES
   ============================================================ */
function renderNotes() {
  setBar(bar('Catatan', `${NOTES.length} catatan`, '<span style="font-size:15px;opacity:.6">✎</span>'), goHome);
  const rows = NOTES.map(n => {
    const first = (n.body || '').split('\n').filter(Boolean)[0] || '';
    return `<div class="li note" data-note="${n.id}" data-s="${esc((n.title + ' ' + n.body).toLowerCase())}">
      <div class="note-ic"></div>
      <div class="li-c">
        <div class="li-t"><b>${esc(n.title)}</b><small>${esc(n.date)}</small></div>
        <p>${esc(first.slice(0, 68))}${first.length > 68 ? '…' : ''}</p>
      </div>
    </div>`;
  }).join('');
  $('#appBody').innerHTML = `
    <div class="searchwrap"><span class="si">⌕</span>
      <input id="noteSearch" placeholder="Cari catatan" autocomplete="off">
      <span class="sc" id="noteClear">✕</span></div>
    <div class="sec">semua catatan</div>
    <div class="list" id="noteList">${rows}</div>
    <div class="emptyhint" id="noteNone" style="display:none">Tidak ada catatan yang cocok.</div>`;
  $$('#appBody .note').forEach(el => el.onclick = () => openNote(el.dataset.note));
  const inp = $('#noteSearch'), clear = $('#noteClear');
  const filter = () => {
    const q = inp.value.trim().toLowerCase();
    let n = 0;
    $$('#noteList .note').forEach(el => {
      const hit = !q || el.dataset.s.indexOf(q) >= 0;
      el.style.display = hit ? '' : 'none';
      if (hit) n++;
    });
    $('#noteNone').style.display = n ? 'none' : 'block';
    clear.style.display = q ? 'block' : 'none';
  };
  inp.oninput = filter;
  clear.onclick = () => { inp.value = ''; filter(); inp.focus(); };
  filter();
}
function openNote(id) {
  const n = NOTES.find(x => x.id === id);
  if (!n) return;
  S.flags.add(n.id);
  setBar(bar('Catatan', n.title, '<span style="font-size:14px;opacity:.5">⋯</span>'), renderNotes);
  $('#appBody').innerHTML = `<div class="doc">
    <h1>${esc(n.title)}</h1><div class="meta">${esc(n.date)}</div>
    ${n.body.split('\n\n').map(p => `<p>${esc(p)}</p>`).join('')}
    <div class="docfoot">— disimpan di perangkat ini.</div>
  </div>`;
}

/* ============================================================
   PHOTOS
   ============================================================ */
function userPhotos() { return store.get('kosong.photos', []); }
function renderPhotos() {
  setBar(bar('Foto', 'Rumah 21 · malam terakhir', ''), goHome);
  const up = userPhotos().map((p, i) => `
    <div class="ph" data-u="${i}"><img src="${p.src}" alt=""><span class="tag">${esc(p.cap || 'ditambahkan')}</span></div>`).join('');
  const ph = PHOTOS.map(p => {
    const open = !p.hidden || S.unlocked.has(p.key);
    return `<div class="ph" data-ph="${p.key}">
      ${open ? photoHTML(p.key) : `<div style="width:100%;height:100%;background:#0e0e11;display:grid;place-items:center;color:#3a3a40;font-size:18px">⌁</div>`}
      <span class="tag">${open ? esc(p.cap) : 'terkunci'}</span></div>`;
  }).join('');
  const slots = photoSlots();
  $('#appBody').innerHTML = `
    <div class="pghead">
      <div><b id="phCount">0</b> / ${PHOTOS.length + userPhotos().length} foto terisi</div>
      <small>delapan tahun, delapan foto</small>
    </div>
    <div class="pgrid">${up}${ph}</div>
    <div class="pgempty">Kalau ada foto yang belum muncul, berarti fotonya belum pernah dikirim ke chat.</div>`;
  let filled = 0;
  const setCount = () => { const el = $('#phCount'); if (el) el.textContent = filled; };
  $$('#appBody .ph img').forEach(im => {
    const ok = () => { if (im.naturalWidth > 0) { filled++; setCount(); } };
    if (im.complete) ok(); else im.addEventListener('load', ok, { once: true });
  });
  setCount();
  $$('#appBody .ph').forEach(el => {
    if (el.dataset.ph) el.onclick = () => openPhoto(el.dataset.ph);
    if (el.dataset.u) el.onclick = () => openUserPhoto(+el.dataset.u);
  });
}

/* ---- kelola semua slot foto ---- */
function photoSlots() {
  const labels = {
    kos: 'Rumah 21 — foto pembuka',
    koridor: 'Koridor · 5 pintu',
    pintu: 'Pintu kamar 5',
    grup: 'Foto grup berlima (5 orang)',
    kamar: 'Kamar 5',
    sink: 'Kamar mandi · 6 sikat gigi',
    lemari: 'Lemari kamar 2',
    selfie: 'Selfie kamu',
    call: 'Layar video call',
    lock: 'Wallpaper lock screen',
    home: 'Wallpaper home',
    face: 'Wajah jumpscare (foto menakutkan)'
  };
  const av = [
    ['av_group', 'Foto grup KOS 21'],
    ['av_martin', 'Martin'],
    ['av_james', 'James'],
    ['av_juhoon', 'Juhoon'],
    ['av_seonghyeon', 'Seonghyeon'],
    ['av_me', 'Keonho (kamu)']
  ].map(([key, label]) => ({ key, label, sec: 'profil grup & anggota', round: true }));
  return [
    ...av,
    ...PHOTOS.map(p => ({ key: p.key, label: labels[p.key] || p.cap, sec: 'foto cerita' })),
    { key: 'face', label: labels.face, sec: 'jumpscare' },
    { key: 'call', label: labels.call, sec: 'tampilan' },
    { key: 'lock', label: labels.lock, sec: 'tampilan' },
    { key: 'home', label: labels.home, sec: 'tampilan' }
  ];
}
/* ---- studio foto (khusus pemilik) ---- */
function ownerPIN() { return store.get('kosong.ownerpin', ''); }
/* akses upload foto sudah dihapus dari build ini */
function studioHidden() { return true; }

/* pintu rahasia dimatikan: tidak ada jalan masuk ke upload */
function bindFootSecret() {
  const f = $('#setFoot');
  if (!f) return;
  f.onclick = null;
  f.style.cursor = 'default';
}
function openOwnerGate() {
  $('#modal').innerHTML = `<div class="modal-bg"><div class="modal">
    <h3>Akses pemilik<button id="mClose">Batal</button></h3>
    <p style="font-size:12px;line-height:1.7;color:#8e8e93;margin-bottom:14px">
      Studio disembunyikan. Masukkan PIN untuk membuka tempat upload lagi.
    </p>
    <div class="fld"><label>PIN pemilik</label>
      <input id="gatePin" type="password" inputmode="numeric" maxlength="8" placeholder="••••" autocomplete="current-password"></div>
    <div class="pinerr" id="gateErr"></div>
    <div class="btn" id="gateGo">Buka studio</div>
  </div></div>`;
  const close = () => { $('#modal').innerHTML = ''; };
  $('#mClose').onclick = close;
  $('#modal .modal-bg').onclick = e => { if (e.target.classList.contains('modal-bg')) close(); };
  const go = () => {
    if ($('#gatePin').value.trim() !== ownerPIN()) {
      $('#gateErr').textContent = 'PIN salah.';
      $('#gatePin').value = '';
      $('#gatePin').focus();
      return;
    }
    close();
    store.del('kosong.studioHidden');
    S.studioUnlocked = true;
    openApp('studio');
    renderApp();
  };
  $('#gateGo').onclick = go;
  $('#gatePin').onkeydown = e => { if (e.key === 'Enter') go(); };
  setTimeout(() => { const i = $('#gatePin'); if (i) i.focus(); }, 60);
}

function renderStudio() {
  S.studioUnlocked = true;
  return renderStudioPanel();
}

function studioShell(inner, right) {
  setBar(bar('Studio Foto', 'khusus pemilik', right || ''), goHome);
  $('#appBody').innerHTML = inner;
}

function renderStudioSetup() {
  studioShell(`
    <div class="studio-hero">
      <div class="sh-k">⌘</div>
      <h2>Buat PIN pemilik</h2>
      <p>PIN ini menjaga semua slot foto. Orang lain yang membuka AU ini
      tetap bisa chat, tapi tidak bisa mengganti atau mengisi foto.</p>
    </div>
    <div class="studio-form">
      <div class="fld"><label>PIN baru · 4–8 angka</label>
        <input id="pin1" type="password" inputmode="numeric" maxlength="8" placeholder="••••" autocomplete="new-password"></div>
      <div class="fld"><label>Ulangi PIN</label>
        <input id="pin2" type="password" inputmode="numeric" maxlength="8" placeholder="••••" autocomplete="new-password"></div>
      <div class="pinerr" id="pinErr"></div>
      <div class="btn" id="pinMake">Simpan PIN</div>
      <p class="studio-note">Catat PIN-nya. Kalau lupa, PIN dan semua foto yang sudah diisi harus dihapus.</p>
    </div>`);
  const make = () => {
    const a = $('#pin1').value.trim(), b = $('#pin2').value.trim();
    const err = $('#pinErr');
    if (!/^\d{4,8}$/.test(a)) { err.textContent = 'PIN harus 4–8 angka.'; return; }
    if (a !== b) { err.textContent = 'PIN tidak sama.'; return; }
    store.set('kosong.ownerpin', a);
    S.studioUnlocked = true;
    renderApp();
  };
  $('#pinMake').onclick = make;
  $('#pin2').onkeydown = e => { if (e.key === 'Enter') make(); };
}

function renderStudioLock() {
  studioShell(`
    <div class="studio-hero">
      <div class="sh-k">⌂</div>
      <h2>Studio terkunci</h2>
      <p>Masukkan PIN pemilik untuk membuka slot foto.</p>
    </div>
    <div class="studio-form">
      <div class="fld"><label>PIN pemilik</label>
        <input id="pinIn" type="password" inputmode="numeric" maxlength="8" placeholder="••••" autocomplete="current-password"></div>
      <div class="pinerr" id="pinErr"></div>
      <div class="btn" id="pinGo">Buka</div>
      <div class="studio-forgot" id="pinForgot">Lupa PIN?</div>
    </div>`);
  const go = () => {
    if ($('#pinIn').value.trim() === ownerPIN()) {
      S.studioUnlocked = true;
      renderApp();
    } else {
      $('#pinErr').textContent = 'PIN salah.';
      $('#pinIn').value = '';
      $('#pinIn').focus();
    }
  };
  $('#pinGo').onclick = go;
  $('#pinIn').onkeydown = e => { if (e.key === 'Enter') go(); };
  $('#pinForgot').onclick = () => {
    $('#modal').innerHTML = `<div class="modal-bg"><div class="modal">
      <h3>Lupa PIN?<button id="mClose">Batal</button></h3>
      <p style="font-size:12.5px;line-height:1.75;color:#a7a7ae;margin-bottom:16px">
        PIN tidak bisa dipulihkan. Menghapusnya akan menghapus PIN dan
        <b style="color:#e8e4da">semua foto</b> yang sudah diisi, lalu kamu bisa membuat PIN baru.
      </p>
      <div class="btn red" id="pinWipe">Hapus PIN & semua foto</div>
      <div class="fld" style="margin-top:14px"><label>Ketik HAPUS untuk konfirmasi</label>
        <input id="wipeWord" placeholder="HAPUS" autocomplete="off"></div>
    </div></div>`;
    const close = () => { $('#modal').innerHTML = ''; };
    $('#mClose').onclick = close;
    $('#modal .modal-bg').onclick = e => { if (e.target.classList.contains('modal-bg')) close(); };
    $('#pinWipe').onclick = () => {
      if ($('#wipeWord').value.trim().toUpperCase() !== 'HAPUS') {
        $('#wipeWord').style.borderColor = '#ff453a';
        return;
      }
      store.del('kosong.ownerpin');
      Object.keys(localStorage).filter(k => k.indexOf('kosong.photo.') === 0).forEach(k => localStorage.removeItem(k));
      S.studioUnlocked = false;
      $('#modal').innerHTML = '';
      updateWalls();
      renderApp();
    };
  };
}

function renderStudioPanel() {
  studioShell('');
  const slots = photoSlots();
  const owned = k => !!(store.get('kosong.stamp.' + k, null) || store.get('kosong.photo.' + k, null));
  const groups = [];
  slots.forEach(sl => {
    let g = groups.find(x => x.sec === sl.sec);
    if (!g) { g = { sec: sl.sec, items: [] }; groups.push(g); }
    g.items.push(sl);
  });
  const rows = groups.map(g => {
    const items = g.items.map(sl => {
      const src = photoSrc(sl.key);
      const isOwn = owned(sl.key);
      return `<div class="slot" data-slot="${esc(sl.key)}" data-filled="${isOwn ? '1' : '0'}">
        <div class="slot-th ${sl.round ? 'round' : ''}">${src ? `<img src="${esc(src)}" alt="">` : (sl.round ? '☺' : '＋')}</div>
        <div class="slot-c"><b>${esc(sl.label)}</b><small>${isOwn ? 'terisi · ketuk untuk ganti' : 'ketuk untuk pilih foto'}</small></div>
        <div class="slot-go">${isOwn ? 'Ganti' : 'Pilih'}</div>
        ${isOwn ? `<div class="del" data-del="${esc(sl.key)}">✕</div>` : ''}
      </div>`;
    }).join('');
    return `<div class="sec">${esc(g.sec)}</div><div class="list" style="padding-top:0">${items}</div>`;
  }).join('');
  $('#appBody').innerHTML = `
    <div class="sec" id="slotCount">slot foto · 0 / ${slots.length} terisi</div>
    ${rows}
    <div class="studio-note" style="padding:14px 18px 44px">
      Ketuk satu baris, lalu pilih foto dari galeri. Foto otomatis dikecilkan dan
      <b style="color:#e8e4da">disimpan sebagai file di folder <code>foto/</code></b>
      (mis. <code>foto/kamar.jpg</code>), lalu langsung dipakai di chat, galeri, avatar, dan wallpaper.
    </div>`;
  const recount = () => {
    const n = $$('#appBody .slot[data-filled="1"]').length;
    const el = $('#slotCount'); if (el) el.textContent = `slot foto · ${n} / ${slots.length} terisi`;
  };
  $$('#appBody .slot-th img').forEach(img => {
    const slot = img.closest('.slot');
    img.onload = () => { slot.dataset.filled = '1'; recount(); };
    img.onerror = () => {
      slot.dataset.filled = '0';
      slot.querySelector('.slot-th').innerHTML = '＋';
      const sm = slot.querySelector('.slot-c small'); if (sm) sm.textContent = 'ketuk untuk pilih foto';
      const go = slot.querySelector('.slot-go'); if (go) go.textContent = 'Pilih';
      const d = slot.querySelector('.del'); if (d) d.remove();
      recount();
    };
  });
  recount();
  $$('#appBody .slot').forEach(el => {
    el.onclick = e => { if (e.target.closest('.del')) return; pickPhoto(el.dataset.slot); };
  });
  $$('#appBody .del').forEach(el => {
    el.onclick = async e => {
      e.stopPropagation();
      const k = el.dataset.del;
      store.del('kosong.photo.' + k);
      store.del('kosong.stamp.' + k);
      /* hapus juga file di folder foto/ (kalau ada) */
      try { await fetch('api/delete?slot=' + encodeURIComponent(k), { method: 'POST' }); } catch (_) {}
      updateWalls();
      renderStudioPanel();
    };
  });
}
function openPhoto(key) {
  const p = PHOTOS.find(x => x.key === key);
  if (p.hidden && !S.unlocked.has(p.key)) return;
  S.flags.add(key);
  setBar(bar('Foto', p.date, '<span style="font-size:13px;opacity:.45">Bagikan</span>'), renderPhotos);
  $('#appBody').innerHTML = `<div class="pview">
    <div class="pv-img">${photoHTML(p.key)}</div>
    <div class="pv-cap">${esc(p.cap)}</div>
  </div>`;
}
function openUserPhoto(i) {
  const p = userPhotos()[i];
  setBar(bar('Foto', 'ditambahkan', '<span style="font-size:13px;opacity:.45">Bagikan</span>'), renderPhotos);
  $('#appBody').innerHTML = `<div class="pview">
    <div class="pv-img"><img src="${p.src}" alt=""></div>
    <div class="pv-cap">${esc(p.cap || 'ditambahkan')}</div>
  </div>`;
}

/* ============================================================
   MAIL
   ============================================================ */
function renderMail() {
  const read = id => S.flags.has('mail_' + id);
  const unread = MAILS.filter(m => !read(m.id)).length;
  setBar(bar('Mail', unread ? `${unread} belum dibaca` : 'Kotak masuk',
    '<span style="font-size:15px;opacity:.6">✎</span>'), goHome);
  const rows = MAILS.map(m => {
    const seen = read(m.id);
    const c = getCast(m.id) || {};
    return `<div class="li mail ${seen ? '' : 'fresh'}" data-mail="${m.id}">
      <div class="av" style="--c:${seen ? '#3a3a42' : '#0a84ff'}">${esc(initials(m.from))}</div>
      <div class="li-c">
        <div class="li-t"><b>${esc(m.from)}</b><small>${esc(m.date)}</small></div>
        <p class="msub">${esc(m.subject)}</p>
        <p>${esc(m.preview)}</p>
      </div>
      ${seen ? '' : '<i class="dot"></i>'}
    </div>`;
  }).join('');
  $('#appBody').innerHTML = `
    <div class="sec">kotak masuk</div>
    <div class="list">${rows}</div>
    <div class="emptyhint" style="padding:16px 24px">Tidak ada surat lain.</div>`;
  $$('#appBody .li[data-mail]').forEach(el => el.onclick = () => openMail(el.dataset.mail));
}
function openMail(id) {
  const m = MAILS.find(x => x.id === id);
  if (!m) return;
  S.flags.add('mail_' + id);
  setBar(bar('Mail', m.from, '<span style="font-size:15px;opacity:.55">↩</span>'), renderMail);
  $('#appBody').innerHTML = `<div class="mailbody">
    <div class="mailhead">
      <div class="av" style="--c:#0a84ff">${esc(initials(m.from))}</div>
      <div><b>${esc(m.from)}</b><small>kepada saya · ${esc(m.date)} 2027</small></div>
    </div>
    <h2>${esc(m.subject)}</h2>
    ${m.body.split('\n').map(l => `<p>${esc(l) || '&nbsp;'}</p>`).join('')}
    <div class="mailfoot">— disimpan di perangkat ini.</div>
  </div>`;
}

/* ============================================================
   CALENDAR
   ============================================================ */
function renderCalendar() {
  const sel = S.calDay || 27;
  setBar(bar('Kalender', 'Februari 2027', '<span id="calToday" style="font-size:12px;color:#8fb3c9;cursor:pointer">Hari ini</span>'), goHome);
  const days = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];
  let cells = '';
  for (let d = 1; d <= 28; d++) {
    const ev = EVENTS[d];
    const cls = ['cell', d === sel ? 'sel' : '', d === 27 ? 'today' : '', ev ? 'mark' : ''].join(' ');
    cells += `<div class="${cls}" data-d="${d}">${d}${ev ? '<i class="cdot"></i>' : ''}</div>`;
  }
  const ev = EVENTS[sel];
  const detail = ev ? `<div class="cal-detail">
      <b>${String(sel).padStart(2, '0')} Februari</b>
      <p>${esc(ev[0])}</p>
      <small>${sel === 27 ? 'malam terakhir · tidak ada pengingat' : 'pengingat · tidak berbunyi'}</small>
    </div>` : `<div class="cal-detail empty"><b>${String(sel).padStart(2, '0')} Februari</b><p>Tidak ada agenda.</p></div>`;
  const list = Object.keys(EVENTS).map(d => `<div class="li calrow" data-d="${d}">
    <div class="calnum">${String(d).padStart(2, '0')}</div>
    <div class="li-c"><div class="li-t"><b>${esc(EVENTS[d][0])}</b><small>Feb ${d}</small></div>
    <p>${d == 27 ? 'hari ini · malam terakhir' : 'agenda'}</p></div></div>`).join('');
  $('#appBody').innerHTML = `
    <div class="cal"><div class="cal-h">${days.map(d => `<span>${d}</span>`).join('')}</div>
      <div class="cal-g">${cells}</div></div>
    ${detail}
    <div class="sec">agenda bulan ini</div><div class="list">${list}</div>`;
  $$('#appBody .cell[data-d]').forEach(el => el.onclick = () => { S.calDay = +el.dataset.d; renderCalendar(); });
  $$('#appBody .calrow').forEach(el => el.onclick = () => { S.calDay = +el.dataset.d; renderCalendar(); });
  const t = $('#calToday');
  if (t) t.onclick = () => { S.calDay = 27; renderCalendar(); };
}

/* ============================================================
   FILES
   ============================================================ */
function renderFiles() {
  setBar(bar('Files', 'Di iPhone ini', '<span style="font-size:14px;opacity:.5">⋯</span>'), goHome);
  const files = [
    ['audio', 'voice_note_2112.m4a', '0:14', '27 Feb', 'rec'],
    ['pdf', 'kontrak_rumah21.pdf', '84 KB', '20 Feb', 'kontrak']
  ];
  const rows = files.map(f => `<div class="li" data-f="${f[4]}">
    <div class="file-ic" style="background:${f[0] === 'audio' ? '#ff9f0a' : '#ff453a'}">${f[0] === 'audio' ? '♫' : 'PDF'}</div>
    <div class="li-c"><div class="li-t"><b>${esc(f[1])}</b><small>${esc(f[3])}</small></div><p>${esc(f[2])}</p></div>
    <div class="fgo">›</div></div>`).join('');
  $('#appBody').innerHTML = `
    <div class="store">
      <div class="store-top"><b>iPhone</b><small>2,1 dari 64 GB terpakai</small></div>
      <div class="store-bar"><i style="width:34%"></i></div>
      <div class="store-leg"><span>Foto 1,2 GB</span><span>Lainnya 0,9 GB</span></div>
    </div>
    <div class="sec">baru-baru ini</div>
    <div class="list">${rows}</div>
    <div class="sec">lokasi</div>
    <div class="list">
      <div class="li"><div class="file-ic" style="background:#0a84ff">☁</div>
        <div class="li-c"><div class="li-t"><b>iCloud Drive</b><small>offline</small></div><p>tidak tersambung</p></div></div>
      <div class="li"><div class="file-ic" style="background:#2c2c2e;color:#8e8e93">⌂</div>
        <div class="li-c"><div class="li-t"><b>Rumah 21</b><small>dibagikan</small></div><p>8 foto · hanya lihat</p></div></div>
    </div>`;
  $$('#appBody .li[data-f]').forEach(el => el.onclick = () => {
    if (el.dataset.f === 'rec') return playRec();
    openMail('kontrak');
  });
}
function playRec() {
  audioInit();
  $('#appBody').innerHTML = `<div class="doc"><h1>voice_note_2112.m4a</h1><div class="meta">21.12 · 14 detik</div>
    <div class="wave" id="wave">${Array.from({ length: 40 }, () => '<i style="height:6px"></i>').join('')}</div>
    <p id="recT" style="text-align:center;color:#8e8e93;font-size:12px">memutar…</p>
    <p style="margin-top:22px;color:#b9b5ad;font-size:13px;line-height:1.9">— "kono... nasi ayamnya udah dateng.<br>jangan diem di kamar terus. turun."</p>
    <p style="margin-top:10px;color:#55555c;font-size:11px">— james, 21.12</p></div>`;
  setBar(bar('Files', 'voice_note_2112.m4a'), renderFiles);
  const bars = $$('#wave i');
  let t = 0;
  const iv = setInterval(() => {
    t += 100;
    bars.forEach(b => b.style.height = (4 + Math.random() * (t % 900 < 400 ? 26 : 8)) + 'px');
    noise(.12, 180 + Math.random() * 90, .035, 'lowpass', .9);
    if (t > 4000) { clearInterval(iv); $('#recT').textContent = 'selesai'; }
  }, 110);
}

/* ============================================================
   PHONE / SAFARI
   ============================================================ */
function renderPhone() {
  setBar(bar('Telepon', 'Sukamaju · 21.00', '<span style="font-size:16px;opacity:.6">＋</span>'), goHome);
  const calls = [
    ['Martin', 'Hari ini 20.58', 'masuk · 00:12', 'martin'],
    ['James', 'Hari ini 20.56', 'masuk · 00:40', 'james'],
    ['Juhoon', 'Kemarin 22.05', 'masuk · 01:02', 'juhoon'],
    ['Seonghyeon', 'Kemarin 20.50', 'tak terjawab', 'seonghyeon']
  ];
  const rows = calls.map(r => {
    const missed = r[2].indexOf('tak terjawab') >= 0;
    const name = r[3] ? getCast(r[3]) : null;
    const av = name
      ? `<div class="av" style="--c:${name.color}">${esc(initials(name.name))}</div>`
      : `<div class="av" style="--c:#2c2c2e;color:#8e8e93">?</div>`;
    return `<div class="li">
      ${av}
      <div class="li-c">
        <div class="li-t"><b style="${missed ? 'color:#d98b7e' : ''}">${esc(r[0])}</b><small>${esc(r[1])}</small></div>
        <p>${esc(r[2])}</p>
      </div>
      <div class="callbtn" style="color:${missed ? '#d98b7e' : '#8fb3c9'}">✆</div>
    </div>`;
  }).join('');
  $('#appBody').innerHTML = `
    <div class="sec">terbaru</div>
    <div class="list">${rows}</div>
    <div class="phone-note">Panggilan terakhir: hari ini 20.58.<br>Martin. 12 detik.</div>`;
}
function renderSafari() {
  setBar(bar('Safari', '', '<span style="font-size:14px;opacity:.5">⋯</span>'), goHome);
  $('#appBody').innerHTML = `
    <div class="safari">
      <div class="sf-bar"><span class="sf-lock">⌁</span>
        <input id="sfUrl" value="rumah21.local" spellcheck="false" autocomplete="off">
        <span class="sf-go" id="sfGo">↵</span>
      </div>
      <div class="sf-body" id="sfBody">
        <div class="sf-ic">⌂</div>
        <h3>RUMAH 21 — 5 kamar</h3>
        <p>Rp 450.000 / bulan · Sukamaju<br>Sudah terisi 5 dari 5 kamar.</p>
        <small>iklan ini disimpan di cache. terakhir dibuka 2019.</small>
      </div>
      <div class="sf-tabs"><span>‹</span><span>›</span><span>↗</span><span>▤</span><span>▢</span></div>
    </div>`;
  const go = () => {
    const u = $('#sfUrl').value.trim() || 'rumah21.local';
    $('#sfBody').innerHTML = `<div class="sf-ic">⌁</div>
      <h3>Tidak bisa membuka ${esc(u)}</h3>
      <p>Halaman ini sudah tidak ada. Mungkin sudah dihapus, atau memang sudah waktunya.</p>
      <small>kesalahan: 404</small>`;
  };
  $('#sfGo').onclick = go;
  $('#sfUrl').onkeydown = e => { if (e.key === 'Enter') go(); };
}

/* ============================================================
   PROFILE
   ============================================================ */
function renderProfile() {
  setBar(bar('Profil', 'cast & OC · bisa diedit'), goHome);
  const rows = cast().map(c => `
    <div class="li" data-p="${c.id}">
      ${avBig(c)}
      <div class="li-c">
        <div class="li-t"><b>${esc(c.name)}${c.id === 'me' ? ' (kamu)' : ''}</b><small>@${esc(c.user || '')}</small></div>
        <p>${esc(c.bio || '—')}</p>
        <span class="role">${esc(c.role || 'cast')}</span>
      </div>
    </div>`).join('');
  $('#appBody').innerHTML = `<div class="sec">cast</div><div class="list">${rows}</div>
    <div style="padding:18px 16px 50px">
      <div class="btn" id="pAdd">＋ Tambah profil</div>
      <div class="btn ghost" id="pReset">Reset ke bawaan</div>
      <p style="font-size:11px;color:#5a5a60;line-height:1.7;margin-top:14px">
        Foto profil tersimpan di perangkat ini. Nama kamu di sini dipakai di seluruh chat.
      </p>
    </div>`;
  $$('#appBody .li[data-p]').forEach(el => el.onclick = () => editProfile(el.dataset.p));
  $('#pAdd').onclick = () => editProfile(null);
  $('#pReset').onclick = () => {
    CASTS = JSON.parse(JSON.stringify(CAST)); saveCast(); renderProfile();
  };
}
function editProfile(id) {
  const isNew = !id;
  const c = isNew
    ? { id: 'c' + Date.now(), name: '', nick: '', user: '', role: '', bio: '', color: '#0a84ff' }
    : { ...getCast(id) };
  const colors = ['#ff9f6b', '#64d2ff', '#bf5af2', '#30d158', '#ffd60a', '#ff453a', '#0a84ff', '#ffffff'];
  $('#modal').innerHTML = `<div class="modal-bg"><div class="modal">
    <h3>${isNew ? 'Tambah profil' : 'Edit profil'}<button id="mClose">Batal</button></h3>
    <div class="av-row">
      <div class="av-prev" id="avPrev" style="background:${c.color}">${c.avatar ? `<img src="${c.avatar}">` : esc(initials(c.name || '?'))}</div>
      <div>
        <div class="btn ghost" id="avUp" style="width:auto;padding:8px 14px;margin:0">Upload foto</div>
        <div style="font-size:10.5px;color:#6f6f75;margin-top:6px">jpg / png · otomatis dikecilin</div>
      </div>
    </div>
    <div class="fld"><label>Nama</label><input id="fName" value="${esc(c.name)}" placeholder="Keonho"></div>
    <div class="fld"><label>Panggilan (dipakai di chat)</label><input id="fNick" value="${esc(c.nick || '')}" placeholder="Kono"></div>
    <div class="fld"><label>Username</label><input id="fUser" value="${esc(c.user || '')}" placeholder="keonho"></div>
    <div class="fld"><label>Peran</label><input id="fRole" value="${esc(c.role || '')}" placeholder="kamar 5 · kamu"></div>
    <div class="fld"><label>Bio</label><textarea id="fBio" placeholder="...">${esc(c.bio || '')}</textarea></div>
    <div class="fld"><label>Warna nama</label>
      <div class="swatches" id="sw">${colors.map(x => `<div class="sw ${x === c.color ? 'on' : ''}" data-c="${x}" style="background:${x}"></div>`).join('')}</div>
    </div>
    <div class="btn" id="mSave">Simpan</div>
    ${!isNew && c.id !== 'me' ? `<div class="btn red" id="mDel" style="margin-top:8px">Hapus profil</div>` : ''}
  </div></div>`;

  const close = () => { $('#modal').innerHTML = ''; };
  $('#mClose').onclick = close;
  $('#modal .modal-bg').onclick = e => { if (e.target.classList.contains('modal-bg')) close(); };
  $('#sw').onclick = e => {
    const s = e.target.closest('.sw'); if (!s) return;
    c.color = s.dataset.c;
    $$('#sw .sw').forEach(x => x.classList.toggle('on', x === s));
    $('#avPrev').style.background = c.color;
  };
  $('#fName').oninput = e => { c.name = e.target.value; if (!c.avatar) $('#avPrev').textContent = initials(c.name || '?'); };
  $('#fNick').oninput = e => c.nick = e.target.value;
  $('#fUser').oninput = e => c.user = e.target.value;
  $('#fRole').oninput = e => c.role = e.target.value;
  $('#fBio').oninput = e => c.bio = e.target.value;
  $('#avUp').onclick = () => {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
    inp.onchange = () => {
      const f = inp.files[0]; if (!f) return;
      const fr = new FileReader();
      fr.onload = () => {
        const img = new Image();
        img.onload = () => {
          const s = 320, cv = document.createElement('canvas'); cv.width = cv.height = s;
          const ctx = cv.getContext('2d');
          const r = Math.max(s / img.width, s / img.height);
          const w = img.width * r, h = img.height * r;
          ctx.drawImage(img, (s - w) / 2, (s - h) / 2, w, h);
          c.avatar = cv.toDataURL('image/jpeg', .82);
          $('#avPrev').innerHTML = `<img src="${c.avatar}">`;
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(f);
    };
    inp.click();
  };
  $('#mSave').onclick = () => {
    c.nick = c.nick || c.name;
    if (isNew) CASTS.push(c);
    else {
      const i = CASTS.findIndex(x => x.id === c.id);
      if (i >= 0) CASTS[i] = c;
    }
    saveCast(); close(); renderProfile(); renderHome();
    if (S.convo) renderChat();
  };
  if ($('#mDel')) $('#mDel').onclick = () => {
    CASTS = CASTS.filter(x => x.id !== c.id); saveCast(); close(); renderProfile();
  };
}

/* ============================================================
   SETTINGS
   ============================================================ */
function renderSettings() {
  setBar(bar('Setelan', ''), goHome);
  $('#appBody').innerHTML = `
    <div class="grp">
      <div class="li" id="sndRow"><div class="li-c"><b>Suara</b><small>hujan & efek</small></div>
        <div class="toggle ${S.sound ? 'on' : ''}" id="sndTog"><i></i></div></div>
      <div class="li" id="spdRow"><div class="li-c"><b>Kecepatan chat</b><small>ketuk untuk ubah</small></div><div style="color:#8e8e93;font-size:13px">${S.speed}×</div></div>
      <div class="li" id="profRow"><div class="li-c"><b>Profil & cast</b><small>edit nama, foto, bio</small></div><div style="color:#8e8e93">›</div></div>
      ${studioHidden() ? '' : `<div class="li" id="photoRow"><div class="li-c"><b>Studio Foto <span class="own-tag">PEMILIK</span></b><small>satu tempat untuk semua foto & wallpaper</small></div><div style="color:#8e8e93">🔒</div></div>`}
    </div>
    <div class="grp">
      <div class="li"><div class="li-c"><b>Umum</b><small>KOS 21 · malam terakhir</small></div></div>
      <div class="li" id="installRow" style="display:none"><div class="li-c"><b>Pasang di perangkat</b><small>buka seperti app, tanpa browser</small></div><div style="color:#0a84ff;font-size:13px">Pasang</div></div>
      <div class="li"><div class="li-c"><b>Penyimpanan</b><small>8 tahun percakapan</small></div></div>
      <div class="li"><div class="li-c"><b>AirDrop</b><small>Menerima dari: teman-teman</small></div></div>
    </div>
    <div class="grp">
      <div class="li" id="endRow"><div class="li-c"><b>Akhir ditemukan</b><small>${S.endings.length} / ${Object.keys(ENDINGS).length}</small></div><div style="color:#8e8e93">›</div></div>
      <div class="li" id="resetRow"><div class="li-c"><b style="color:#ff453a">Mulai ulang cerita</b><small>hapus progres, simpan akhir</small></div></div>
    </div>
    <p id="setFoot" style="text-align:center;font-size:10px;color:#4a4a50;margin:20px 0 34px;letter-spacing:.2em;cursor:default;user-select:none">KOS 21 · KOSONG</p>`;
  $('#sndTog').onclick = () => {
    S.sound = !S.sound; store.set('kosong.sound', S.sound);
    if (S.sound) { audioInit(); chime(); rain(true); } else rain(false);
    renderSettings();
  };
  $('#profRow').onclick = () => openApp('profile');
  const ir = $('#installRow');
  if (ir && window.__install) {
    ir.style.display = 'flex';
    ir.onclick = async () => {
      const p = window.__install; window.__install = null;
      ir.style.display = 'none';
      try { p.prompt(); await p.userChoice; } catch (e) {}
    };
  }
  if ($('#photoRow')) $('#photoRow').onclick = () => openApp('studio');
  bindFootSecret();
  $('#spdRow').onclick = () => {
    const arr = [0.5, 0.75, 1, 1.5, 2];
    let i = arr.indexOf(S.speed); if (i < 0) i = 2;
    S.speed = arr[(i + 1) % arr.length];
    store.set('kosong.rate', S.speed);
    renderSettings();
  };
  $('#resetRow').onclick = () => {
    $('#modal').innerHTML = `<div class="modal-bg"><div class="modal">
      <h3>Mulai ulang?<button id="rCancel">Batal</button></h3>
      <p style="font-size:12.5px;line-height:1.7;color:#a7a7ae;margin-bottom:16px">
        Chat akan kembali ke awal. Foto yang sudah kamu isi tetap tersimpan,
        dan akhir yang sudah ditemukan tetap tercatat.
      </p>
      <div class="btn red" id="rYes">Mulai ulang</div>
    </div></div>`;
    const close = () => { $('#modal').innerHTML = ''; };
    $('#rCancel').onclick = close;
    $('#modal .modal-bg').onclick = e => { if (e.target.classList.contains('modal-bg')) close(); };
    $('#rYes').onclick = () => { location.reload(); };
  };
  $('#endRow').onclick = () => showEndings();
}

/* ============================================================
   BANNER / FX
   ============================================================ */
let bannerT = null;
function notify(title, text, conv, avId) {
  const b = $('#banner');
  const own = photoSrc(avId === 'group' ? 'av_group' : 'av_' + (avId || 'me'));
  b.innerHTML = `<div class="ic" style="background:${avId === 'group' ? '#2b2f36' : getCast(avId || 'me').color}">${own ? `<img src="${esc(own)}" alt="">` : (avId === 'group' ? '21' : esc(initials(getCast(avId || 'me').name)))}</div>
    <div class="bt"><b>${esc(title)}</b><p>${esc(text)}</p></div><small>sekarang</small>`;
  b.classList.add('on');
  chime(); vibrate(30);
  b.onpointerdown = e => e.stopPropagation();
  b.onclick = e => {
    e.stopPropagation();
    b.classList.remove('on');
    if (!conv) return;
    if (S.app !== 'messages') openApp('messages');
    setScreen('app');
    S.convo = conv;
    openConvo(conv);
  };
  clearTimeout(bannerT);
  bannerT = setTimeout(() => b.classList.remove('on'), 4200);
}

const FACE_SVG = `<svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<defs>
  <radialGradient id="fsk" cx="50%" cy="34%" r="66%">
    <stop offset="0" stop-color="#8f8676"/><stop offset=".5" stop-color="#5d564b"/><stop offset="1" stop-color="#0b0a09"/>
  </radialGradient>
  <filter id="fblur"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="fsoft"><feGaussianBlur stdDeviation="2.4"/></filter>
</defs>
<ellipse cx="200" cy="252" rx="132" ry="210" fill="url(#fsk)" filter="url(#fblur)"/>
<ellipse cx="200" cy="470" rx="86" ry="58" fill="#070605" opacity=".9" filter="url(#fblur)"/>
<ellipse cx="140" cy="226" rx="38" ry="22" fill="#030303" filter="url(#fsoft)"/>
<ellipse cx="261" cy="231" rx="36" ry="21" fill="#030303" filter="url(#fsoft)"/>
<circle cx="141" cy="227" r="2.4" fill="#b8ae9b" opacity=".75"/>
<circle cx="261" cy="232" r="2.2" fill="#b8ae9b" opacity=".6"/>
<ellipse cx="200" cy="306" rx="13" ry="28" fill="rgba(0,0,0,.22)" filter="url(#fsoft)"/>
<ellipse cx="204" cy="395" rx="23" ry="35" fill="#030303" filter="url(#fsoft)"/>
<ellipse cx="204" cy="383" rx="19" ry="8" fill="rgba(10,8,6,.5)" filter="url(#fsoft)"/>
</svg>`;

const fx = {
  async glitch(ms = 500) {
    document.body.classList.add('glitch');
    staticSfx(.3);
    await sleep(ms);
    document.body.classList.remove('glitch');
  },
  async blackout(ms = 1600) {
    const b = $('#black');
    b.style.opacity = '1';
    await sleep(ms);
    b.style.opacity = '0';
    await sleep(220);
  },
  async knock(n = 3) {
    for (let i = 0; i < n; i++) {
      document.body.classList.add('knock');
      knockSfx(); vibrate([60, 40, 60]);
      await sleep(440);
      document.body.classList.remove('knock');
    }
  },
  async static(ms = 900) {
    staticSfx(ms / 1000);
    document.body.classList.add('glitch');
    await sleep(ms);
    document.body.classList.remove('glitch');
  },
  async face(ms = 320) {
    audioInit();
    let el = $('#faceScare');
    if (!el) {
      el = document.createElement('div'); el.id = 'faceScare';
      ($('#screen') || document.body).appendChild(el);
    }
    const facePhoto = photoSrc('face');
    el.innerHTML = facePhoto
      ? `<img src="${esc(facePhoto)}" alt="">`
      : FACE_SVG;
    el.classList.toggle('isphoto', !!facePhoto);
    const fimg = el.querySelector('img');
    if (fimg) fimg.onerror = () => {
      el.innerHTML = FACE_SVG;
      el.classList.remove('isphoto');
    };
    el.classList.add('on');
    stingSfx(); thudSfx();
    document.body.classList.add('shudder');
    vibrate([150, 50, 220]);
    await sleep(ms);
    el.classList.remove('on');
    document.body.classList.remove('shudder');
    await sleep(150);
  },
  async scare(word = 'JANGAN', ms = 780) {
    audioInit();
    let el = $('#scare');
    if (!el) { el = document.createElement('div'); el.id = 'scare'; ($('#screen') || document.body).appendChild(el); }
    el.dataset.text = word;
    el.textContent = word;
    staticSfx(.3);
    stingSfx();
    document.body.classList.add('scareCut');
    await sleep(55);
    document.body.classList.remove('scareCut');
    el.classList.add('on');
    document.body.classList.add('shudder');
    tone(42, .55, 'sawtooth', .09);
    noise(.45, 780, .12, 'lowpass', .7);
    vibrate([90, 40, 170]);
    await sleep(ms);
    el.classList.remove('on');
    document.body.classList.remove('shudder');
    await sleep(140);
  },
  async whisper(word = 'jangan liat ke belakang', ms = 1150) {
    audioInit();
    let el = $('#whisper');
    if (!el) { el = document.createElement('div'); el.id = 'whisper'; ($('#screen') || document.body).appendChild(el); }
    el.textContent = word;
    el.style.setProperty('--wx', (Math.random() * 26 - 13).toFixed(1) + 'px');
    el.classList.add('on');
    whisperSfx((Math.random() * 2 - 1) * .85);
    vibrate(20);
    await sleep(ms);
    el.classList.remove('on');
  },
  async eyes(ms = 680) {
    audioInit();
    let el = $('#eyesScare');
    if (!el) {
      el = document.createElement('div'); el.id = 'eyesScare';
      ($('#screen') || document.body).appendChild(el);
    }
    if (!el.querySelector('.eye')) {
      el.innerHTML = '<div class="eye l"><s></s><u></u><em></em></div><div class="eye r"><s></s><u></u><em></em></div>';
    }
    el.classList.add('on');
    whisperSfx((Math.random() * 2 - 1) * .5); thudSfx();
    vibrate([30, 90, 40]);
    await sleep(ms);
    el.classList.remove('on');
    await sleep(120);
  },
  async creak(ms = 1000) {
    audioInit();
    creakSfx();
    vibrate(30);
    await sleep(ms);
  },
  async steps(n = 2, gap = 560) {
    audioInit();
    for (let i = 0; i < n; i++) {
      stepSfx();
      vibrate([14, 30, 14]);
      await sleep(gap + Math.random() * 180);
    }
  },
  async clockGlitch(ms = 900) {
    const prev = S.clock;
    const a = $('#clk'), b = $('#lkTime');
    if (a) a.textContent = '--.--';
    if (b) b.textContent = '03.45';
    staticSfx(.18);
    await sleep(ms);
    if (a) a.textContent = prev;
    if (b) b.textContent = prev;
  },
  async breath(ms = 2400) {
    audioInit();
    document.body.classList.add('breath');
    breathSfx(); thudSfx();
    vibrate([20, 60, 20]);
    await sleep(ms);
    document.body.classList.remove('breath');
  },
  async scream(ms = 1550) {
    audioInit();
    document.body.classList.add('scream');
    playScream('teriak');
    vibrate([160, 60, 260]);
    await sleep(ms);
    document.body.classList.remove('scream');
    await sleep(160);
  }
};
function fxFree() { return !document.querySelector('#scare.on, #eyesScare.on, #whisper.on, #faceScare.on') && !document.body.classList.contains('scream'); }
let scaresThisSession = 0;
function ambientScare() {
  if (scaresThisSession >= 5) return;
  if (!S.storyStarted) return;
  if (S.screen !== 'home' && S.screen !== 'lock') return;
  if (S.ask || !fxFree()) return;
  if (document.querySelector('#endScr.on, #callScr.on')) return;
  scaresThisSession++;
  const r = Math.random();
  if (r < .26) fx.whisper(['jangan liat ke belakang', 'ada yang di belakangmu', 'jangan jawab'][Math.floor(Math.random() * 3)], 900);
  else if (r < .48) fx.eyes(620);
  else if (r < .62) { fx.knock(1); fx.glitch(320); }
  else if (r < .74) fx.steps(2, 620);
  else if (r < .84) fx.creak(900);
  else if (r < .9) fx.face(260);
  else {
    const words = ['JANGAN', 'LIMA', 'BUKAN KAMU', 'DI BELAKANGMU', 'JANGAN LIHAT'];
    fx.scare(words[Math.floor(Math.random() * words.length)], 520);
  }
}
function chatScare() {
  if (!S.storyStarted || !fxFree()) return;
  if (S.screen !== 'app' || S.app !== 'messages' || S.convo !== 'group') return;
  if (S.ask) return;
  if (document.querySelector('#endScr.on, #callScr.on')) return;
  const r = Math.random();
  if (r < .24) fx.whisper('jangan liat ke belakang', 900);
  else if (r < .44) fx.eyes(600);
  else if (r < .6) fx.knock(1);
  else if (r < .72) fx.clockGlitch(750);
  else if (r < .82) fx.steps(1, 420);
  else if (r < .9) fx.creak(820);
  else fx.breath(1500);
}
/* AU ini nggak punya jumpscare acak. Semua suara datang dari cerita. */

/* ============================================================
   CALL
   ============================================================ */
function callScene({ from = 'me', video = true, outgoing = false } = {}) {
  return new Promise(resolve => {
    const p = getCast(from);
    const scr = $('#callScr');
    scr.innerHTML = `<div class="call" id="callBox">
      <div class="video" style="background:${photoSrc('call') ? `url('${photoSrc('call')}') center/cover,` : ''}#050506"><div class="vnoise"></div></div>
      <div class="v-top"><b>${esc(p.name)}</b><small id="callTimer">00:00</small></div>
      <div class="subs" id="subs"></div>
      <div class="c-info">
        <div class="c-av">${avPic(from)}</div>
        <h2>${esc(p.name)}</h2>
        <div class="c-sub">${outgoing ? 'memanggil…' : (video ? 'FaceTime Video' : 'Telepon')}</div>
      </div>
      <div class="c-btns${outgoing ? ' out' : ''}">
        <div class="cb" id="decline"><i>✕</i>${outgoing ? 'Batal' : 'Tolak'}</div>
        ${outgoing ? '' : '<div class="cb acc" id="accept"><i>✓</i>Terima</div>'}
      </div>
      <div class="endbtn" id="hang" style="display:none">✕</div>
    </div>`;
    scr.classList.add('on');
    audioInit(); ring(true);
    const box = $('#callBox');
    let done = false, autoT = null;

    const finish = (ans) => {
      if (done) return;
      done = true;
      clearTimeout(autoT);
      ring(false);
      scr.classList.remove('on');
      scr.innerHTML = '';
      resolve(ans);
    };
    $('#decline').onclick = () => finish('decline');
    const pick = async () => {
      if (done) return;
      clearTimeout(autoT);
      ring(false);
      box.classList.add('live');
      box.querySelector('.v-top small').textContent = outgoing ? 'tersambung' : 'menyambungkan…';
      await sleep(900);
      if (done) return;
      let t = 0;
      const timer = setInterval(() => {
        t++;
        const el = $('#callTimer');
        if (el) el.textContent = '00:' + String(t).padStart(2, '0');
      }, 1000);
      setTimeout(() => { const h = $('#hang'); if (h) h.style.display = 'grid'; }, 1500);

      const lines = [
        '…',
        'kono?',
        'kamu nggak kelihatan'
      ];
      const sub = $('#subs');
      for (const l of lines) {
        if (!sub) break;
        sub.innerHTML = `<span>${esc(l)}</span>`;
        staticSfx(.18); vibrate(25);
        await sleep(1500);
      }
      staticSfx(1.2);
      await sleep(700);
      clearInterval(timer);
      finish('accept');
    };
    const acc = $('#accept');
    if (acc) acc.onclick = pick;
    /* panggilan keluar: otomatis tersambung sebentar lagi, atau dibatalkan */
    if (outgoing) autoT = setTimeout(pick, 2200);
    $('#hang').onclick = () => finish('accept');
  });
}

/* ============================================================
   ENDING
   ============================================================ */
async function showEnding(id) {
  const e = ENDINGS[id];
  if (!e) return;
  if (!S.endings.includes(id)) { S.endings.push(id); store.set('kosong.endings', S.endings); }
  drone(false);
  rain(false);
  const black = $('#black');
  if (black) {
    black.style.transition = 'opacity 2.4s ease';
    black.style.opacity = '1';
    await sleep(2500);
  }
  $('#endScr').innerHTML = `<div class="end">
    <div class="e-code">${esc(e.code)}</div>
    <h2>${esc(e.title)}</h2>
    <div class="e-body">${e.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <div class="e-mark">— ${esc(e.mark)}</div>
    <div class="e-btns">
      <button class="solid" onclick="location.reload()">Ulangi dari awal</button>
      <button id="eArch">Arsip akhir (${S.endings.length}/${Object.keys(ENDINGS).length})</button>
    </div>
    <div class="e-arch" id="eArchList"></div>
  </div>`;
  $('#endScr').classList.add('on');
  $('#eArch').onclick = () => {
    const keys = Object.keys(ENDINGS);
    $('#eArchList').innerHTML = keys.map(k =>
      `<span style="color:${S.endings.includes(k) ? '#c9c4bb' : '#494950'}">${S.endings.includes(k) ? '■' : '□'} ${esc(ENDINGS[k].title)}</span>`).join('<br>');
  };
  softNote(196, 5, .018);
}

function showEndings() {
  const keys = Object.keys(ENDINGS);
  $('#endScr').innerHTML = `<div class="end">
    <div class="e-code">ARSIP</div><h2>AKHIR</h2>
    <div class="e-body">${keys.map((k, i) =>
      `<p><span style="color:${S.endings.includes(k) ? '#e8e4da' : '#4d4d54'}">${String(i + 1).padStart(2, '0')} · ${esc(ENDINGS[k].title)}</span></p>`).join('')}</div>
    <div class="e-mark">${S.endings.length} dari ${keys.length} ditemukan</div>
    <div class="e-btns"><button class="solid" onclick="document.getElementById('endScr').classList.remove('on')">Tutup</button></div>
  </div>`;
  $('#endScr').classList.add('on');
}

/* ============================================================
   STORY KIT
   ============================================================ */
const kit = {
  wait: nap,
  sys: sysLine,
  say: (c, w, t, o) => them(c, w, t, o),
  me: mine,
  img: (c, w, key, cap) => themImg(c, w, key, cap),
  imgsys: async (c, key) => { await themImg(c, 'juhoon', key, PHOTOS.find(p => p.key === key)?.cap || ''); },
  ask,
  notify: (t, txt, c) => notify(t, txt, c || 'group', c === 'self' ? 'me' : (c || 'group')),
  ghost: async (text, id = 'group') => {
    push(id, { who: 'me', text: named(text) });
    if (S.convo === id) renderChat();
    await nap(650);
    await fx.glitch(260);
  },
  typingGhost: async (id = 'group', who = 'group', ms = 2200) => {
    const c = S.convos[id];
    if (!c) return;
    c.typing = who;
    if (S.convo === id) renderChat();
    await sleep(ms);
    c.typing = null;
    if (S.convo === id) renderChat();
  },
  call: callScene,
  fx,
  scare: (w, ms) => fx.scare(w, ms),
  whisper: (w, ms) => fx.whisper(w, ms),
  eyes: ms => fx.eyes(ms),
  breath: ms => fx.breath(ms),
  clockGlitch: ms => fx.clockGlitch(ms),
  setClock,
  note: (f, d, v) => softNote(f, d, v),
  rain: on => rain(on),
  setMembers: n => { S.convos.group.members = n; if (S.app === 'messages') renderApp(); },
  unlock: k => S.unlocked.add(k),
  has: f => S.flags.has(f),
  end: showEnding,
  name: () => ME().nick
};
async function runStory() {
  try { await STORY(kit); } catch (e) { console.error(e); }
}

/* garis bawah (home indicator): ketuk atau geser ke atas untuk ke home */
function bindHomebar() {
  const hb = $('#homebar');
  if (!hb) return;
  let sy = null, sx = null;
  const go = () => {
    if (S.screen === 'lock') return;
    if (document.querySelector('#callScr.on, #endScr.on')) return;
    if (S.screen === 'home' && !S.app) return;
    goHome();
  };
  hb.onpointerdown = e => { sy = e.clientY; sx = e.clientX; };
  hb.onpointerup = e => {
    if (sy !== null && sy - e.clientY > 22 && Math.abs(e.clientX - sx) < 48) go();
    sy = null; sx = null;
  };
  hb.onpointercancel = () => { sy = null; sx = null; };
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  fit();
  seed();
  renderLock();
  renderHome();
  setScreen('lock');
  setClock('21.00');
  // grain
  $('#grain').style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3"/></filter><rect width="160" height="160" filter="url(#n)" opacity="0.55"/></svg>')}")`;
  $('#grain').style.backgroundSize = '160px 160px';
  bindHomebar();
  if (!S.sound) { /* tetap bisa dihidupkan dari setelan */ }
  document.addEventListener('pointerdown', () => { if (S.screen !== 'lock') audioInit(); }, { once: true });
  // cegah zoom dobel tap
  let last = 0;
  document.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - last < 300) e.preventDefault();
    last = now;
  }, { passive: false });
  // bisa dipasang seperti app (Chrome/Edge)
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}
init();

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  window.__install = e;
  if (S.app === 'settings') renderSettings();
});

/* expose buat debug */
window.KOSONG = { S, openApp, openConvo, goHome, showEnding, CASTS, saveCast };
