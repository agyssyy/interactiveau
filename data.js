/* ============================================================
   KOS 21 — PENGHUNI KELIMA
   data.js  ·  semua isi cerita, cast, catatan, foto, mail
   (silakan edit di sini; nama kamu bisa diganti lewat app PROFIL)
   ============================================================ */

/* ---------------- FOTO ---------------- */
/* Semua slot sengaja kosong. Tidak ada foto yang digenerate atau
   disiapkan di sini. Pemilik mengisi sendiri lewat Studio Foto. */
/* ---------------- FOTO DARI FOLDER ---------------- */
/* taruh file di folder "foto/" dengan nama persis seperti di bawah.
   kalau formatnya .png / .webp, ganti ekstensinya di sini. */
const FOTO = {
  av_group:     'foto/av_group.jpg',
  av_martin:    'foto/av_martin.jpg',
  av_james:     'foto/av_james.jpg',
  av_juhoon:    'foto/av_juhoon.jpg',
  av_seonghyeon:'foto/av_seonghyeon.jpg',
  av_me:        'foto/av_me.jpg',
  kos:          'foto/kos.jpg',
  koridor:      'foto/koridor.jpg',
  pintu:        'foto/pintu.jpg',
  grup:         'foto/grup.jpg',
  kamar:        'foto/kamar.jpg',
  sink:         'foto/sink.jpg',
  lemari:       'foto/lemari.jpg',
  selfie:       'foto/selfie.jpg',
  call:         'foto/call.jpg',
  lock:         'foto/lock.jpg',
  home:         'foto/home.jpg',
  face:         'foto/face.jpg'
};

/* ---------------- CAST ---------------- */
/* id dipakai di chat. role/bio bebas diedit dari app PROFIL. */
const CAST = [
  { id:'martin', name:'Martin', nick:'Martin', user:'martin', role:'kamar 1 · leader',
    color:'#ff9f6b', bio:'Yang paling tenang. Selalu yang pertama bilang "jangan".' },
  { id:'james', name:'James', nick:'James', user:'itsjames', role:'kamar 2 · paling berisik',
    color:'#64d2ff', bio:'Kalau dia diam lebih dari satu menit, ada yang salah.' },
  { id:'juhoon', name:'Juhoon', nick:'Juhoon', user:'juhoon', role:'kamar 3 · juru foto',
    color:'#bf5af2', bio:'Motret semua hal. Termasuk yang seharusnya nggak difoto.' },
  { id:'seonghyeon', name:'Seonghyeon', nick:'Seonghyeon', user:'seong_h', role:'kamar 4 · pendiam',
    color:'#30d158', bio:'Nulis terus. Katanya lirik. Isinya aturan.' },
  { id:'me', name:'Keonho', nick:'Kono', user:'keonho', role:'kamar 5 · kamu',
    color:'#ffd60a', bio:'Maknae. Baru pindah 4 hari. Kunci kamarnya 5.' }
];

/* ---------------- FOTO ---------------- */
/* kosongkan = tampil placeholder; isi lewat Studio Foto */
const PHOTOS = [
  { key:'grup',    cap:'minggu lalu. coba hitung.',           date:'28 Okt', hidden:true  },
  { key:'kos',    cap:'Rumah 21. Malam sebelum hujan.',      date:'1 Nov',  hidden:false },
  { key:'kamar',     cap:'kamar 5. TV nyala sendiri.',         date:'2 Nov',  hidden:false },
  { key:'koridor', cap:'koridor. lima pintu.',                date:'4 Nov',  hidden:true  },
  { key:'sink',     cap:'kamar mandi. 6 sikat gigi.',          date:'4 Nov',  hidden:true  },
  { key:'selfie',     cap:'selfie. 03.16',                      date:'4 Nov',  hidden:true  },
  { key:'pintu',     cap:'pintu kamar 5. ujung koridor.',      date:'4 Nov',  hidden:true  },
  { key:'lemari', cap:'lemari kamar 2.',                     date:'4 Nov',  hidden:true  }
];

/* ---------------- CATATAN ---------------- */
const NOTES = [
  { id:'denah', title:'denah rumah 21', date:'2 Nov 2026',
    body:`rumah 21 — 2 lantai (katanya)

lantai 1
  kamar 1  martin
  kamar 2  james
  kamar 3  juhoon
  kamar 4  seonghyeon
  kamar mandi
  dapur

lantai 2
  (nggak ada)

catatan:
  kos ini cuma punya 4 kamar.
  kalau suatu hari kamu lihat pintu kelima di ujung koridor,
  jangan dihitung. jangan dibuka. jangan diketok.

  yang di kamar 5 juga nggak suka diketok.` },

  { id:'aturan', title:'aturan (tulisan tangan)', date:'tanpa tanggal',
    body:`1. jam 3 pagi jangan keluar kamar.
2. kalau ada yang ketok dari dalam lemari, jangan jawab.
3. jangan foto koridor setelah jam 12.
4. kalau ketemu orang yang mukanya nggak jelas di foto, jangan dihapus. dia marah.
5. kalau ada dua orang dengan nama sama, yang lebih dulu ada di rumah itu yang asli.
6. jangan tinggalin kamar 5 kosong.

— s` },

  { id:'lirik', title:'lirik belum jadi', date:'3 Nov 2026',
    body:`lima pintu, empat kunci
satu nama, dua kali
kamu pulang, aku pergi
kamar lima, kamar kami

(chorus belum)
(jangan pakai kata "pulang")` },

  { id:'kode', title:'kode', date:'1 Nov 2026',
    body:`pintu depan     2121
wifi             rumah21 / rumah21 / rumah21
kunci cadangan   di pot bunga

kode hp-nya jangan diganti.
2121 itu tanggal kita semua pindah.
(empat orang. bukan lima.)` }
];

/* ---------------- MAIL ---------------- */
const MAILS = [
  { id:'kontrak', from:'pemilik rumah 21', subject:'Perpanjangan kontrak — 4 kamar',
    date:'28 Okt', preview:'Perpanjangan otomatis untuk 4 kamar...',
    body:`Halo penghuni rumah 21,

Kontrak diperpanjang 6 bulan untuk 4 (empat) kamar:
kamar 1, 2, 3, dan 4.

Kamar di ujung koridor tidak termasuk dalam kontrak dan tidak
pernah disewakan. Mohon tidak memasang nama di pintunya.

Salam,
H.` },

  { id:'james', from:'James', subject:'foto minggu lalu',
    date:'3 Nov', preview:'nih hasil jepretan juhoon. bagus kan...',
    body:`nih hasil jepretan juhoon. bagus kan

ada satu yang aneh, tapi gausah dibahas
(attachment: grup.jpg)` },

  { id:'besok', from:'Keonho', subject:'baca ini besok',
    date:'5 Nov', preview:'kalau kamu masih inget punya kamar...',
    body:`kalau kamu masih inget punya kamar, berarti kamu belum keluar.

aku udah di kamar 5 dari hari sabtu.
kamu baru datang hari minggu.

kita nggak bisa berdua di sini.

— kono` }
];

/* ---------------- KALENDER ---------------- */
const EVENTS = {
  1:  ['Pindah — 4 orang'],
  2:  ['Kamar 5 (?)'],
  3:  ['Hujan'],
  4:  ['Jangan tidur'],
  5:  ['Jangan tidur']
};

/* ---------------- STORY ---------------- */
/* {me} = nickname kamu (default: Kono) */
const STORY = async (K) => {
  const g = 'group';
  const say = (who, text) => K.say(g, who, text);
  const me = text => K.me(g, text);
  const sys = text => K.sys(g, text);
  const pic = (who, key, cap) => K.img(g, who, key, cap);

  /* satu-satunya akhir: keempat penghuni hilang, tinggal kamu. */
  const finale = async () => {
    await K.wait(1600);
    await K.fx.blackout(1600);
    await K.setClock('06.10');
    await sys('06.10 — pagi');
    await K.wait(900);
    await say('martin', 'kono?');
    await K.wait(1300);
    await say('martin', 'kono, lu di kamar?');
    await me('iya. masih di kamar.');
    await me('martin?');
    await K.wait(1200);
    await sys('Martin keluar dari grup');
    await me('martin, jawab.');
    await me('ini nggak lucu, tai.');
    await sys('James keluar dari grup');
    await me('james?');
    await sys('Juhoon keluar dari grup');
    await sys('Seonghyeon keluar dari grup');
    await me('juhoon. seonghyeon.');
    await me('bangsat, jawab dong.');
    await K.wait(1500);
    await K.setMembers(1);
    await sys('Grup ini sekarang cuma berisi kamu.');
    await K.wait(1100);
    await sys('4 anggota hilang dalam 6 detik.');
    await K.wait(900);
    await me('halo?');
    await me('ada orang?');
    await K.wait(700);
    await K.fx.scream(1500);
    await K.wait(200);
    await K.fx.face(420);
    await K.wait(700);
    return K.end('hilang');
  };

  /* ============================================================
     BAB 1 — 03.00
     ============================================================ */
  await K.wait(900);
  await sys('Hari ini 03.00');
  await say('james', '{me}');
  await say('james', 'lu masih bangun kan');
  await say('james', 'anjir ada yang ketok kamar gua');
  await say('james', 'dari dalem lemari bangsat');
  await say('martin', 'james.');
  await say('james', 'serius!');
  await say('james', 'gua nggak lagi becanda');
  await K.fx.eyes(650);

  const a = await K.ask(g, [
    { t: 'dari dalem?? serius?', v: 0 },
    { t: 'jangan buka lemarinya goblok', v: 1 },
    { t: 'aku ke kamar lu sekarang', v: 2 }
  ]);

  if (a === 0) {
    await say('james', 'serius anjir. tiga kali. pelan');
    await say('james', 'kayak orang kehabisan napas');
    await say('james', 'terus berhenti');
    await say('james', 'terus ketok lagi dari atas');
    await say('martin', 'james, keluar dari kamar');
    await say('james', 'nggak bisa tai');
    await say('james', 'pintunya ketahan dari dalem');
    await say('martin', 'jangan sentuh pintunya.');
  } else if (a === 1) {
    await say('james', 'iya iya nggak gua buka');
    await say('james', 'tapi dia masih ketok');
    await say('james', 'kono, lu denger nggak sih?');
    await say('seonghyeon', 'aku denger.');
    await say('seonghyeon', 'dari kamar gua.');
    await say('james', 'hah?');
    await say('seonghyeon', 'ketukannya sama.');
    await say('martin', 'berhenti.');
  } else {
    await say('james', 'jangan anjir');
    await say('james', 'pintu kamar gua ketahan dari dalem');
    await say('james', 'bukan gua yang nahan');
    await say('martin', 'semua di kamar masing-masing. sekarang.');
    await say('james', 'kono jangan ke sini');
    await say('james', 'gua nggak becanda');
    await say('seonghyeon', 'jangan ada yang keluar kamar.');
  }

  await K.wait(1000);
  await me('oke. satu-satu. gua di kamar 5, pintu kekunci dari dalem.');
  await say('martin', 'james, kamu kamar 2 kan');
  await say('james', 'iya');
  await say('martin', 'kono kamar 5');
  await K.wait(800);
  await say('juhoon', 'kos ini cuma 4 kamar tai');
  await say('seonghyeon', '5.');
  await say('seonghyeon', 'ada satu lagi di ujung koridor.');
  await me('ujung koridor itu tempat sampah kan?');
  await say('martin', 'itu gudang.');
  await say('seonghyeon', 'gudang nggak ada nama di pintunya.');
  await say('juhoon', 'terus kenapa ada nama di pintu itu?');
  await K.wait(1100);
  await say('martin', 'juhoon.');
  await say('juhoon', 'maaf. gua cuma nanya.');
  await say('juhoon', 'tapi beneran, ada lima nama di pintu itu.');
  await say('juhoon', 'empat di pintu kamar. satu di ujung koridor.');
  await K.wait(700);
  await me('lima nama. tapi kalian bilang cuma 4 kamar.');
  await say('seonghyeon', 'iya.');
  await say('martin', 'jangan dibaca namanya.');
  await K.wait(700);

  await pic('juhoon', 'koridor', 'koridor. 03.03');
  await K.unlock('koridor');
  await K.wait(1400);

  await say('james', 'lampu koridornya hidup semua');
  await say('juhoon', 'padahal nggak ada yang nyalain.');
  await say('james', 'pintu ke-5 itu nggak ada di denah anjir');
  await say('martin', 'kono, kamu pindah hari apa');
  await me('minggu');
  await say('martin', 'kita berempat pindah sabtu.');
  await say('juhoon', 'nama lu udah ada di pintu itu sebelum kita masuk.');
  await say('james', 'sebelum kita masuk semua?');
  await say('juhoon', 'iya.');
  await me('jadi nama gua udah ada di situ sebelum gua pindah?');
  await me('gimana bisa, bangsat.');
  await K.wait(1000);
  await say('seonghyeon', 'kono, buka catatan lu.');
  await say('seonghyeon', 'yang denah rumah.');
  await me('denahnya cuma 4 kamar');
  await say('seonghyeon', 'iya. sekarang.');
  await sys('Catatan diperbarui · 03.04');
  await K.fx.whisper('jangan baca', 900);
  await K.wait(900);

  const b = await K.ask(g, [
    { t: 'buka catatan denah', v: 0 },
    { t: 'aku telepon martin', v: 1 },
    { t: 'aku keluar kamar, cek koridor', v: 2 }
  ]);

  if (b === 0) {
    await sys('Catatan · denah rumah 21');
    await say('seonghyeon', 'lihat pojok kanan bawah.');
    await say('seonghyeon', 'ada kotak kecil.');
    await say('seonghyeon', 'yang nggak ada di denah lama.');
    await me('ada satu kotak lagi');
    await me('di ujung koridor');
    await say('martin', 'jangan dibaca.');
    await say('seonghyeon', 'terlambat.');
    await say('james', 'isinya apa anjir');
    await me('"kamar 5 — sudah terisi"');
    await K.wait(1200);
    await say('martin', 'tutup catatannya.');
    await K.fx.glitch(520);
    await K.clockGlitch(1000);
    await K.fx.eyes(720);
  } else if (b === 1) {
    await sys('Panggilan keluar · Martin · 00:00');
    const call1 = await K.call({ from: 'martin', video: false, outgoing: true });
    if (call1 === 'accept') {
      await say('martin', 'kono, dengerin gua.');
      await say('martin', 'jangan keluar kamar.');
      await say('martin', 'jangan buka pintu.');
      await say('martin', 'jangan jawab kalau ada yang manggil.');
      await me('martin, ada apa sih');
      await say('martin', 'kamar 5 itu bukan kamar.');
      await say('martin', 'itu pintu.');
      await K.fx.static(1300);
      await K.fx.breath(1800);
    } else {
      await sys('Panggilan dibatalkan.');
      await K.wait(900);
      await say('martin', 'kenapa lu tutup?');
      await say('martin', 'gua lagi di luar. jangan keluar kamar lu.');
      await say('martin', 'kunci pintu. sekarang.');
      await K.fx.breath(1500);
    }
    await say('seonghyeon', 'kono, cek catatan lu.');
    await me('nanti');
    await say('seonghyeon', 'sekarang.');
  } else {
    await say('james', 'jangan anjir');
    await say('martin', 'kono.');
    await say('juhoon', 'gua ikut.');
    await sys('Kamu membuka pintu kamar 5.');
    await K.wait(900);
    await pic('me', 'koridor', 'koridor. 03.04');
    await me('lampu koridornya hidup semua');
    await me('padahal dari kamar tadi gelap');
    await say('juhoon', 'jangan ke ujung.');
    await me('lima pintu. semuanya ketutup.');
    await me('tapi ada bayangan di bawah pintu kelima.');
    await say('martin', 'tutup pintu lu. sekarang.');
    await K.fx.knock(2);
    await sys('Ketukan · dari dalam kamar 5.');
    await K.fx.creak(1000);
    await K.fx.eyes(800);
    await K.fx.blackout(1200);
  }

  await K.wait(1100);
  await say('james', 'tadi ada 6 sikat gigi di kamar mandi');
  await say('james', 'gua beli 4 doang');
  await say('james', 'yang dua lagi warnanya sama semua');
  await say('seonghyeon', 'warna apa');
  await say('james', 'ijo. kayak yang kono pake.');
  await me('punyaku biru, tai. dari kemarin.');
  await me('yang ijo bukan punyaku.');
  await K.wait(900);
  await pic('james', 'sink', 'kamar mandi. 6 sikat gigi.');
  await K.unlock('sink');
  await K.wait(1300);
  await say('martin', 'jangan ada yang ke kamar mandi malam ini.');
  await say('james', 'terus gua mau pipis gimana');
  await say('martin', 'tahan.');

  await K.fx.glitch(650);
  await K.scare('ENAM', 680);
  await K.wait(120);
  await K.fx.face(300);
  await K.wait(300);
  await K.fx.eyes(620);
  await K.fx.whisper('yang keenam kamu', 1100);
  await K.wait(900);

  await say('seonghyeon', 'kono.');
  await say('seonghyeon', 'aku nemu foto di galeri gua.');
  await say('seonghyeon', 'foto kita minggu lalu.');
  await say('me', 'terus?');
  await say('seonghyeon', 'coba hitung orangnya.');
  await pic('seonghyeon', 'grup', 'minggu lalu. coba hitung.');
  await K.unlock('grup');
  await K.wait(1500);
  await say('james', 'kita berempat kan');
  await me('ada lima.');
  await say('seonghyeon', 'iya.');
  await me('yang kelima aku.');
  await K.wait(700);
  await say('seonghyeon', 'foto ini minggu lalu.');
  await say('seonghyeon', 'kamu pindah hari minggu.');
  await me('jadi itu bukan aku.');
  await me('tapi mukaku.');
  await K.clockGlitch(900);
  await K.fx.eyes(600);
  await say('martin', 'seonghyeon.');
  await say('seonghyeon', 'maaf.');
  await K.fx.glitch(420);

  /* --- pilihan tengah --- */
  const c1 = await K.ask(g, [
    { t: 'aku kirim selfie sekarang', v: 'selfie' },
    { t: 'juhoon, hapus fotonya', v: 'hapus' },
    { t: 'aku keluar dari grup ini', v: 'grup' }
  ]);

  if (c1 === 'selfie') {
    await K.wait(700);
    await pic('me', 'selfie', 'selfie. 03.16');
    await K.unlock('selfie');
    await K.wait(1000);
    await say('james', 'kono, itu foto lama kan');
    await say('juhoon', 'di belakang lu ada food court');
    await me('itu kamar 5');
    await say('martin', 'kamar 5 nggak ada tangga.');
    await me('aku baru foto. 03.16.');
    await say('martin', 'mall itu tutup jam 10.');
    await me('berarti fotonya lama');
    await me('tapi aku baru tekan tombolnya');
    await say('martin', 'itu bukan lu.');
    await me('loh');
    await say('martin', 'jangan dibalas apapun.');
    await K.wait(900);
    await K.fx.glitch(500);
    await K.scare('ITU BUKAN KAMU', 680);
    await K.fx.face(320);
    await K.fx.eyes(650);
    await sys('Pesan gagal terkirim · 4 pesan');
    await K.wait(1200);
  } else if (c1 === 'grup') {
    await K.wait(700);
    await sys('Kamu keluar dari grup "KOS 21"');
    await K.wait(1000);
    await sys('Kamu ditambahkan kembali oleh Martin');
    await K.wait(900);
    await say('martin', 'kono?');
    await say('martin', 'jangan keluar lagi.');
    await say('seonghyeon', 'kalau lu keluar, dia bisa masuk.');
    await me('dia siapa');
    await say('seonghyeon', 'yang namanya ada di pintu.');
    await K.wait(800);
    await K.fx.glitch(600);
    await K.fx.whisper('dia masuk', 1000);
  } else {
    await say('juhoon', 'udah nggak bisa, tai');
    await say('juhoon', 'fotonya udah ada di galeri semua orang.');
    await say('juhoon', 'bahkan di galeri yang nggak punya hp.');
    await me('maksud lu?');
    await say('juhoon', 'gua juga nggak ngerti.');
    await K.wait(900);
    await K.fx.glitch(450);
    await K.fx.breath(1600);
  }

  await K.wait(1400);
  await sys('03.10 — hujan mulai turun');
  await say('martin', 'semua di kamar.');
  await say('martin', 'jangan ada yang tidur.');
  await say('james', 'gimana caranya nggak tidur');
  await say('martin', 'jangan tutup mata.');
  await say('juhoon', 'gw denger sesuatu di koridor');
  await say('seonghyeon', 'aku juga.');
  await K.wait(1000);

  /* ============================================================
     BAB 2 — obrolan pribadi (03.11)
     ============================================================ */
  await sys('James mengirim pesan pribadi');
  await K.notify('James', 'pesan pribadi', 'james');
  await K.fx.eyes(520);
  {
    const dc = 'james';
    const say = (w, t) => K.say(dc, w, t);
    const me = t => K.me(dc, t);
    await say('james', 'kono');
    await say('james', 'lu masih di kamar 5 kan');
    await say('james', 'jawab pake chat ini. jangan di grup');
    const dm1 = await K.ask('james', [
      { t: 'iya, kenapa?', v: 0 },
      { t: 'kenapa pindah ke dm?', v: 1 },
      { t: 'aku nggak di kamar 5', v: 2 }
    ]);
    if (dm1 === 0) {
      await say('james', 'karena di grup ada yang baca');
      await say('james', 'selain kita berlima');
      await say('james', 'tadi gua cek anggota grup. ada 6.');
      await say('james', 'padahal kita cuma 5.');
    } else if (dm1 === 1) {
      await say('james', 'karena pesan di grup kehapus');
      await say('james', 'gua kirim "ada yang ketok", terus ilang');
      await say('james', 'gua kirim lagi, ilang lagi');
      await say('james', 'cuma lu yang bisa liat');
    } else {
      await say('james', 'maksud lu apa');
      await say('james', 'kamar 5 itu kamar lu');
      await say('james', 'kalau lu nggak di sana, lu di mana');
      await say('james', 'kono.');
      await say('james', 'jawab.');
    }
    await K.wait(900);
    await say('james', 'gua denger suara ngetik');
    await say('james', 'dari dalem lemari');
    await say('james', 'persis kayak suara gua ngetik');
    await me('jangan buka lemarinya. please.');
    await say('james', 'anjir');
    await say('james', 'kono, lu masih di sana?');
    await me('masih');
    await me('tapi di sini ada suara orang ngetik dari lemari.');
    await say('james', 'jangan kemana-mana');
    await say('james', 'gua buka pintu sekarang');
    await me('jangan. tunggu. jangan buka pintu gua.');
    await K.wait(1000);
  }
  await sys('James berhenti mengirim pesan');
  await K.fx.knock(3);
  await K.scare('JANGAN BUKA', 650);

  await K.wait(1500);
  await sys('Martin mengirim pesan pribadi');
  await K.notify('Martin', 'pesan pribadi', 'martin');
  {
    const dc = 'martin';
    const say = (w, t) => K.say(dc, w, t);
    const me = t => K.me(dc, t);
    await say('martin', 'kono.');
    await say('martin', 'jangan percaya James.');
    await me('kenapa?');
    await say('martin', 'karena James udah nggak di kamar 2.');
    await say('martin', 'gua cek dari luar. pintunya kebuka.');
    await say('martin', 'kasurnya kosong.');
    await me('terus yang chat aku siapa');
    await say('martin', 'gua nggak tau.');
    await say('martin', 'tapi dia tau semua yang James tau.');
    await K.wait(900);
    await say('martin', 'kunci kamar 5 masih di lu?');
    await me('masih');
    await say('martin', 'jangan kasih.');
    await say('martin', 'jangan buka pintu buat siapapun.');
    await say('martin', 'termasuk gua.');
    await me('martin, lu sekarang di mana?');
    await me('jawab jujur.');
    await K.fx.whisper('termasuk gua', 1000);
    await K.wait(1100);
  }
  await sys('Martin berhenti mengirim pesan');

  await K.wait(1200);
  await sys('Seonghyeon mengirim pesan pribadi');
  await K.notify('Seonghyeon', 'pesan pribadi', 'seonghyeon');
  {
    const dc = 'seonghyeon';
    const say = (w, t) => K.say(dc, w, t);
    const me = t => K.me(dc, t);
    await say('seonghyeon', 'aku udah baca catatan yang nggak aku tulis.');
    await say('seonghyeon', 'isinya aturan.');
    await me('aturan apa');
    await say('seonghyeon', '1. jangan tidur di kamar 5.');
    await say('seonghyeon', '2. jangan jawab ketukan.');
    await say('seonghyeon', '3. kalau ada 5 orang di foto, yang kelima jangan diliat.');
    await me('kalau dilanggar?');
    await say('seonghyeon', 'aturan ke-4.');
    await say('seonghyeon', '4. jangan baca aturan ke-4.');
    await K.fx.eyes(680);
    await K.fx.whisper('aturan ke-5', 1100);
    await me('terlambat. gua udah baca.');
    await me('seonghyeon, ada aturan ke-5 nggak?');
    await K.wait(1200);
    await me('anjir');
    await say('seonghyeon', 'iya.');
    await say('seonghyeon', 'gua udah baca.');
    await say('seonghyeon', 'makanya gua nggak bisa keluar kamar.');
    await me('seonghyeon?');
    await K.wait(1000);
  }
  await sys('Seonghyeon berhenti mengirim pesan');
  await K.fx.glitch(700);

  await K.wait(1400);
  await sys('Juhoon mengirim pesan pribadi');
  await K.notify('Juhoon', 'pesan pribadi', 'juhoon');
  {
    const dc = 'juhoon';
    const say = (w, t) => K.say(dc, w, t);
    const me = t => K.me(dc, t);
    await say('juhoon', 'kono, ini penting.');
    await say('juhoon', 'gue cek metadata foto grup itu.');
    await say('juhoon', 'tertulisnya diambil jam 02.59 tadi.');
    await me('hah?');
    await me('sei bilang foto itu minggu lalu');
    await say('juhoon', 'iya. makanya gua takut.');
    await say('juhoon', 'gue nggak pernah keluar kamar.');
    await say('juhoon', 'tapi di foto kita berlima. di depan rolling door.');
    await say('juhoon', 'gue nggak motret itu.');
    await me('terus siapa yang jepret');
    await say('juhoon', 'nggak ada yang megang kamera.');
    await say('juhoon', 'semua tangan kita kelihatan.');
    await me('juhoon, jangan main-main.');
    await K.fx.breath(1800);
    await K.wait(1100);
    await say('juhoon', 'kono, jangan ke koridor.');
    await say('juhoon', 'gue denger pintu kelima kebuka.');
  }
  await sys('Juhoon berhenti mengirim pesan');
  await K.fx.knock(2);
  await K.scare('JANGAN KELUAR', 620);

  await K.wait(1500);
  await sys('03.16 — semua chat pribadi offline');
  await K.fx.breath(2200);
  await K.fx.eyes(700);
  await say('martin', 'kono.');
  await say('martin', 'kita perlu ngomong.');
  await say('martin', 'kamar 5 itu bukan kamar.');
  await me('terus apa');
  await say('martin', 'pintu.');
  await say('martin', 'pintu yang nggak boleh dibuka dari dalem.');
  await me('aku tinggal di sini 4 hari');
  await say('martin', 'iya.');
  await say('martin', 'dan tiap malem ada yang ngetuk dari dalem.');
  await say('martin', 'bukan dari luar.');
  await K.wait(1200);
  await say('james', 'kono, gua udah di koridor.');
  await say('james', 'pintu kamar lu kebuka.');
  await say('james', 'lu di mana?');
  await say('martin', 'james, jangan.');
  await say('james', 'kamar 5 kosong.');
  await say('james', 'kasurnya masih anget.');
  await say('james', 'tapi nggak ada orang.');
  await K.fx.glitch(600);
  await K.scare('KOSONG', 600);
  await K.fx.face(340);
  await sys('Kamu melihat kamar 5 dari pintu.');
  await K.wait(1400);

  /* ============================================================
     BAB 3 — kamar 5 (03.21)
     ============================================================ */
  await K.setClock('03.21');
  await sys('03.21 — lampu kamar 5 mati');
  await K.fx.breath(2400);
  await K.fx.blackout(1300);
  await K.typingGhost(g, 'unknown', 2400);
  await say('me', 'lampu mati');
  await say('me', 'aku masih di kamar');
  await say('me', 'james? martin? ada yang bisa baca ini?');
  await say('martin', 'jangan gerak.');
  await say('seonghyeon', 'kono, liat pintu.');
  await say('me', 'pintu kamar gua?');
  await say('james', 'ada nama di pintu lu.');
  await say('james', 'bukan nama lu.');
  await say('me', 'terus nama siapa, bangsat.');
  await K.wait(900);
  await pic('me', 'pintu', 'pintu kamar 5. 03.21');
  await K.unlock('pintu');
  await K.clockGlitch(1100);
  await K.fx.eyes(650);
  await K.wait(1400);
  await me('ada tanggal di bawahnya. 2021.');
  await me('aku pindah ke sini hari minggu.');
  await say('juhoon', 'tahun 2021 itu sebelum kita semua kenal.');
  await me('berarti itu bukan gua. kan?');
  await me('kalian tau kan itu bukan gua.');
  await say('martin', 'kono, kunci pintunya.');
  await me('udah');
  await say('martin', 'dari luar.');
  await me('apa?');
  await say('martin', 'kunci dari luar. sekarang.');
  await K.wait(1000);
  await say('james', 'jangan percaya martin.');
  await say('james', 'dia yang naruh nama lu di pintu.');
  await say('martin', 'james, diam.');
  await say('james', 'bukannya lu yang bilang kamar 5 nggak disewain?');
  await say('james', 'terus kenapa kono tinggal di sana?');
  await K.wait(900);
  await say('martin', 'karena kono yang buka pintunya.');
  await say('seonghyeon', 'cukup.');
  await say('seonghyeon', 'kalian berdua udah nggak di kamar masing-masing.');
  await say('james', 'maksud lu?');
  await say('seonghyeon', 'gua cek. kamar 2 kosong. kamar 1 kosong.');
  await sys('3 anggota tidak diketahui lokasinya.');
  await K.wait(1200);

  const d1 = await K.ask(g, [
    { t: 'buka pintu kamar 5', v: 'buka' },
    { t: 'ketuk pintu dari dalem', v: 'ketuk' },
    { t: 'naik ke lemari, sembunyi', v: 'lemari' }
  ]);

  if (d1 === 'buka') {
    await say('martin', 'jangan.');
    await me('aku mau tau apa yang di luar');
    await sys('Pintu terbuka.');
    await K.wait(800);
    await pic('me', 'koridor', 'koridor. 03.25');
    await me('koridornya panjang banget');
    await me('ada lima pintu');
    await me('lampu koridornya hidup semua');
    await me('semua pintunya ketutup');
    await say('seonghyeon', 'hitung lagi.');
    await me('satu dua tiga empat lima');
    await say('seonghyeon', 'enam.');
    await me('hah');
    await say('seonghyeon', 'pintu kamar lu. di belakang lu.');
    await K.fx.glitch(700);
    await K.scare('ENAM PINTU', 700);
  } else if (d1 === 'ketuk') {
    await K.fx.knock(3);
    await K.wait(900);
    await sys('Ada yang menjawab dari luar.');
    await say('martin', 'jangan buka.');
    await say('james', 'dia ngetuk balik.');
    await me('suaranya kayak suara aku');
    await say('seonghyeon', 'jangan jawab.');
    await K.wait(800);
    await sys('"Masuk."');
    await K.fx.static(1500);
    await K.scare('JANGAN JAWAB', 680);
  } else {
    await say('martin', 'kenapa lemari');
    await me('dari sini aku bisa liat kamar');
    await me('ada kasur, lemari, jendela');
    await me('dan ada aku lagi di kasur');
    await say('james', 'hah');
    await me('dia pake piyama aku');
    await me('dia lagi liat hp');
    await me('hp itu... hp gua.');
    await say('seonghyeon', 'jangan turun.');
    await K.wait(900);
    await K.fx.glitch(650);
    await K.scare('JANGAN TURUN', 680);
  }

  await K.wait(1300);
  await pic('me', 'kamar', 'kamar 5. TV nyala sendiri.');
  await K.unlock('kamar');
  await K.wait(1100);
  await me('TV-nya nyala');
  await me('padahal nggak ada yang nyalain');
  await me('layarnya putih. nggak ada gambar');
  await K.wait(700);
  await me('jendelanya kebuka');
  await K.fx.whisper('keluar', 900);
  await me('padahal tadi ketutup');
  await say('seonghyeon', 'jangan liat keluar.');
  await me('udah liat');
  await say('seonghyeon', 'apa yang lu liat');
  await me('rumah ini dari luar');
  await me('ada empat jendela');
  await me('dan satu pintu lagi di samping');
  await me('ada orang berdiri di depan pintu itu.');
  await me('dia liat ke jendela gua.');
  await say('martin', 'itu bukan pintu.');
  await me('terus apa');
  await say('martin', 'jangan buka.');
  await K.wait(1200);

  await sys('03.32 — sinyal hilang');
  await K.fx.glitch(800);
  await say('james', 'kono');
  await say('james', 'hp gua tiba-tiba nunjukin chat lu');
  await say('james', 'padahal gua nggak buka chat lu');
  await say('james', 'pesannya: "aku di kamar 5"');
  await me('aku nggak ngirim itu');
  await say('james', 'gua tau.');
  await say('james', 'karena pesan itu dikirim dari hp lu.');
  await say('james', 'jam 03.32.');
  await me('sekarang jam berapa');
  await say('james', '03.32.');
  await K.wait(900);

  /* --- chat dengan diri sendiri --- */
  await sys('Pesan baru · dari Keonho');
  await K.notify('Keonho', 'aku di kamar 5', 'self');
  {
    const dc = 'self';
    const say = (w, t) => K.say(dc, w, t);
    const me = t => K.me(dc, t);
    const sys = t => K.sys(dc, t);
    await say('keonho', 'aku di kamar 5');
    await say('keonho', 'kamu di kamar 5');
    await say('keonho', 'kita nggak bisa berdua');

    const c2 = await K.ask('self', [
      { t: 'siapa kamu bangsat', v: 0 },
      { t: 'keluar dari kamar aku', v: 1 },
      { t: 'aku nggak tinggal di kamar 5', v: 2 }
    ]);

    if (c2 === 0) {
      await say('keonho', 'aku kamu yang kemarin');
      await say('keonho', 'yang kamu ganti');
      await say('keonho', 'yang namanya udah ada di pintu');
      await say('keonho', 'sebelum kamu pindah');
    } else if (c2 === 1) {
      await say('keonho', 'ini kamar aku');
      await say('keonho', 'nama di pintu itu nama aku dulu');
      await say('keonho', 'kamu tinggal di kamar aku');
    } else {
      await say('keonho', 'kamu tinggal di kamar 5');
      await say('keonho', 'dari 2021');
      await say('keonho', 'kamu cuma lupa.');
      await say('keonho', 'kamu udah pernah ke sini.');
    }

    await K.wait(1200);
    await say('keonho', 'kamu tau kenapa James denger ketukan?');
    await me('kenapa');
    await say('keonho', 'karena aku ngetuk dari dalem lemari.');
    await say('keonho', 'pintu kamar 5 itu nyambung ke semua lemari.');
    await me('itu nggak masuk akal');
    await say('keonho', 'iya.');
    await say('keonho', 'karena kamu udah nggak masuk akal.');
    await K.fx.eyes(720);
    await K.fx.whisper('kamu yang di lemari', 1200);
    await K.wait(1100);
    await say('keonho', 'aku telepon ya');
    await sys('Panggilan masuk · Keonho');

    const call = await K.call({ from: 'me', video: true });
    if (call === 'accept') {
      await K.fx.static(3000);
      await K.scare('BUKAN KAMU', 720);
      await K.fx.face(380);
      await say('keonho', 'kamu nggak kelihatan');
      await say('keonho', 'di kamera cuma ada kasur kosong');
      await say('keonho', 'berarti kamu bukan di kamar 5');
      await say('keonho', 'berarti kamu yang di lemari');
      await me('terus kamu siapa');
      await say('keonho', 'aku yang di kamar.');
      await K.wait(900);
      await sys('Panggilan berakhir · 03.39');
    } else {
      await say('keonho', 'kenapa kamu tolak telepon kamu sendiri');
      await say('keonho', 'aku cuma mau liat kamu sekali lagi');
      await me('jangan telepon lagi');
      await say('keonho', 'nanti.');
      await K.wait(700);
      await sys('Panggilan tak terjawab · 03.39');
      await K.scare('NANTI', 520);
    }

    await K.wait(1300);
    await say('keonho', 'sampai ketemu.');
    await sys('Keonho keluar dari chat.');
  }
  await K.fx.glitch(600);

  /* --- grup kembali --- */
  await K.setMembers(6);
  await K.wait(1400);
  await sys('Grup KOS 21 · 6 anggota');
  await say('juhoon', 'grup ini sekarang ada 6 orang');
  await say('james', 'hah anjir');
  await say('martin', 'jangan dibuka profilnya.');
  await say('seonghyeon', 'kono, kamu masih di kamar?');
  await say('seonghyeon', 'jangan buka pintu.');
  await say('juhoon', 'ada anggota baru. namanya kosong.');
  await say('james', 'fotonya item semua.');
  await say('martin', 'jangan liat fotonya.');
  await K.wait(500);
  await K.fx.steps(2, 640);
  await K.wait(500);
  await K.typingGhost(g, 'unknown', 2800);
  await K.fx.glitch(700);
  await K.ghost('aku yang kelima');

  /* ============================================================
     BAB 4 — 03.45
     ============================================================ */
  await K.setClock('03.45');
  await sys('03.45 — hujan berhenti');
  await K.fx.creak(1100);
  await K.fx.knock(3);
  await K.scare('JANGAN BUKA', 720);
  await say('martin', 'ada yang ketok');
  await say('james', 'dari dalem lemari kamar gua berhenti');
  await say('juhoon', 'sekarang dari kamar {me}');
  await me('dari lemari gua juga. persis di belakang kepala gua.');
  await me('gua ngerasa ada yang nempel di telinga gua.');
  await say('seonghyeon', 'kono. jangan jawab.');
  await say('martin', 'jangan buka pintu.');
  await say('james', 'jangan tidur.');
  await K.wait(1400);

  const e2 = await K.ask(g, [
    { t: 'tetap di kamar', v: 'stay' },
    { t: 'aku tidur aja', v: 'tidur' },
    { t: 'aku keluar rumah sekarang', v: 'bus' }
  ]);

  if (e2 === 'tidur') {
    await say('martin', 'jangan.');
    await say('james', 'kono jangan tidur');
    await me('aku capek');
    await K.fx.blackout(1400);
    await K.wait(800);
    await say('keonho', 'selamat tidur.');
    await K.fx.static(1200);
    await finale();
    return;
  }

  if (e2 === 'bus') {
    await say('james', 'kono jangan');
    await say('martin', 'kono');
    await say('juhoon', 'pintu depan kekunci dari luar');
    await me('aku pake kunci cadangan');
    await say('seonghyeon', 'jangan.');
    await K.fx.knock(2);
    await K.fx.blackout(900);
    await say('keonho', 'busnya belum dateng.');
    await K.wait(900);
    await finale();
    return;
  }

  await me('gua nggak akan buka pintu. gua janji.');
  await say('martin', 'bagus.');
  await say('martin', 'jangan jawab ketukan.');
  await K.wait(1200);
  await sys('Ketukan · 3 kali · dari dalam lemari');
  await K.wait(900);
  await say('james', 'lemari gua ketutup rapat');
  await pic('james', 'lemari', 'lemari kamar 2. jam 03.45.');
  await K.unlock('lemari');
  await K.fx.eyes(620);
  await say('james', 'gue buka dikit');
  await say('james', 'ada koridor di dalem');
  await say('james', 'kayak di kamar kono');
  await say('martin', 'jangan masuk.');
  await say('juhoon', 'dia udah masuk.');
  await K.wait(1100);
  await sys('James keluar dari grup');
  await me('james? james, jawab.');
  await K.wait(900);
  await say('martin', 'james?');
  await say('seonghyeon', 'jangan cari dia.');
  await K.wait(1000);
  await sys('Seonghyeon keluar dari grup');
  await me('sei. jangan diem.');
  await say('juhoon', 'anjir');
  await say('martin', 'tinggal kita bertiga.');
  await K.wait(900);
  await sys('Juhoon keluar dari grup');
  await me('juhoon?');
  await K.wait(1000);
  await say('martin', 'kono.');
  await say('martin', 'jangan keluar kamar.');
  await say('martin', 'apapun yang lu denger.');
  await K.wait(900);
  await sys('Martin keluar dari grup');
  await me('martin?');
  await me('kalian di mana sih.');
  await K.wait(900);
  await K.fx.eyes(750);
  await K.fx.breath(2200);
  await K.wait(1200);

  await sys('Grup ini sekarang cuma berisi kamu.');
  await K.wait(1000);
  await K.fx.blackout(1200);
  await K.wait(900);
  await say('keonho', 'sekarang cuma kita.');
  await me('kita?');
  await say('keonho', 'kamu dan aku.');
  await say('keonho', 'buka pintunya.');
  await K.wait(1000);

  await sys('Ketukan terakhir · 3 kali');
  await K.wait(900);
  await sys('04.00 — semua kamar kosong');
  await K.wait(1000);
  await sys('05.30 — matahari terbit');
  await K.wait(1000);
  await K.ghost('jangan tinggalin aku');
  await K.typingGhost(g, 'unknown', 2600);
  await sys('06.09 — tidak ada suara');
  await K.wait(800);
  await farewell(K, finale);
};

async function farewell(K, finale) {
  const g = 'group';
  await K.wait(900);
  await K.say(g, 'keonho', 'kamu masih di sana?');
  await K.say(g, 'me', 'iya. aku masih di sini.');
  await K.say(g, 'me', 'kamu siapa, bangsat.');
  await K.clockGlitch(1000);
  await K.wait(1100);
  await K.say(g, 'keonho', 'aku nunggu.');
  await K.wait(1200);
  await K.fx.scare('JANGAN LIHAT', 620);
  await K.wait(300);
  await K.fx.face(400);
  await K.wait(300);
  return finale();
}

/* ---------------- ENDINGS ---------------- */
/* cuma satu akhir. pilihan apa pun membawa kamu ke sini. */
const ENDINGS = {
  hilang: {
    code: 'AKHIR',
    title: 'MEREKA HILANG',
    body: [
      'Pagi datang tanpa suara. Kamu keluar dari kamar 5.',
      'Pintu kamar 1, 2, 3, 4 terbuka. Kasur rapi. Barang masih ada. Orangnya tidak.',
      'Martin nggak ada di dapur. James nggak nyanyi sumbang. Juhoon nggak motret apa-apa. Seonghyeon nggak nulis.',
      'Di grup KOS 21, cuma tersisa kamu. Empat nama hilang dari daftar anggota, satu per satu, tanpa pesan perpisahan.',
      'Kamu buka chat mereka. Semua kosong. Kamu buka galeri. Foto grup itu sekarang cuma ada kamu, sendirian, di depan rumah.',
      'Di koridor, pintu kelima perlahan terbuka. Di pintunya sudah tertulis namamu.',
      'Kamu ngetuk pelan. Dari dalam, ada yang jawab: "masuk."',
      'Kamu masuk, karena sekarang rumah ini cuma punya satu penghuni.'
    ],
    mark: 'empat orang hilang. satu pintu tinggal buat kamu.'
  }
};
