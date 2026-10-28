/* ============================================================
   KOSONG — KOS 21
   data.js · AU sedih · cerita, cast, catatan, surat, foto
   ============================================================ */

/* ---------------- FOTO ---------------- */
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
  lock:         'foto/lock.jpg',
  home:         'foto/home.jpg'
};

/* ---------------- CAST ---------------- */
const CAST = [
  { id:'martin', name:'Martin', nick:'Martin', user:'martin', role:'kamar 1 · yang paling tua',
    color:'#e0a878', bio:'Selalu yang paling dulu bangun. Selalu yang paling akhir ngaku kalau sedih.' },
  { id:'james', name:'James', nick:'James', user:'itsjames', role:'kamar 2 · paling berisik',
    color:'#7fb6d9', bio:'Ketawanya paling keras. Diamnya paling lama kalau lagi nahan nangis.' },
  { id:'juhoon', name:'Juhoon', nick:'Juhoon', user:'juhoon', role:'kamar 3 · juru foto',
    color:'#b79ad6', bio:'Motret semua hal. Katanya biar nggak lupa. Padahal dia yang paling susah lupa.' },
  { id:'seonghyeon', name:'Seonghyeon', nick:'Seonghyeon', user:'seong_h', role:'kamar 4 · pendiam',
    color:'#9fc6a8', bio:'Nulis terus. Katanya lirik. Sebenarnya surat yang nggak pernah dikirim.' },
  { id:'me', name:'Keonho', nick:'Kono', user:'keonho', role:'kamar 5 · kamu',
    color:'#e6c96a', bio:'Paling kecil waktu masuk. Paling lama tinggal. Paling terakhir pergi.' }
];

/* ---------------- FOTO ---------------- */
const PHOTOS = [
  { key:'grup',    cap:'hari pertama. 2019.',                 date:'2019',   hidden:true  },
  { key:'kos',     cap:'rumah 21. malam terakhir.',            date:'27 Feb', hidden:false },
  { key:'kamar',   cap:'kamar 5. tinggal TV.',                 date:'27 Feb', hidden:false },
  { key:'koridor', cap:'koridor. lampu terakhir.',             date:'27 Feb', hidden:true  },
  { key:'sink',    cap:'kamar mandi. enam sikat gigi.',        date:'28 Feb', hidden:true  },
  { key:'selfie',  cap:'2021. sebelum sei pulang.',             date:'2021',   hidden:true  },
  { key:'pintu',   cap:'pintu kamar 5. nama kamu masih di situ.', date:'28 Feb', hidden:true },
  { key:'lemari',  cap:'lemari kamar 2. jaket yang ketinggalan.', date:'28 Feb', hidden:true }
];

/* ---------------- CATATAN ---------------- */
const NOTES = [
  { id:'denah', title:'denah rumah 21', date:'ditulis 2019',
    body:`rumah 21 — dua lantai (katanya)

lantai 1
  kamar 1  martin
  kamar 2  james
  kamar 3  juhoon
  kamar 4  seonghyeon
  kamar 5  kono
  kamar mandi
  dapur
  ruang tamu
  balkon kecil

lantai 2
  (nggak ada. james pernah ngaku ada, tapi dia bohong.)

catatan:
  kamar 5 paling kecil.
  tapi yang paling lama diisi, kamar 5.` },

  { id:'aturan', title:'aturan rumah (tulisan james)', date:'tanpa tanggal',
    body:`1. yang masak, cuci piring.
2. yang telat bayar listrik, traktir makan.
3. jangan ambil makanan di kulkas tanpa nanya.
4. kalau ada yang pulang malam, sisain lampu koridor.
5. jangan lupa matiin TV sebelum tidur.
   (kono nggak pernah nurut.)
6. kalau ada yang pindah, jangan lupa pamit.

— j

catatan kecil di bawahnya, tulisan tangan lain:
nomor 6 itu nggak fair.` },

  { id:'lirik', title:'lagu belum jadi', date:'26 Feb 2027',
    body:`lima pintu, satu koridor
empat nama, satu yang paling akhir
kamu pulang, aku pergi
rumah tetap di sini

(chorus)
kalau nanti kita lupa
cara pulang ke rumah ini
biar lampu koridor yang inget
biar pintu yang jaga

(belum selesai. nanti kalau ketemu lagi.)` },

  { id:'kode', title:'kode & catatan penting', date:'2019',
    body:`pintu depan     2019
wifi            rumah21 / rumah21
kunci cadangan  di pot bunga

2019 itu tahun pertama kita tinggal di sini.
jangan diganti. biar kita inget.
(kita berlima.)` }
];

/* ---------------- SURAT ---------------- */
const MAILS = [
  { id:'kontrak', from:'pemilik rumah 21', subject:'Kontrak berakhir — terima kasih',
    date:'20 Feb', preview:'Kunci dikembalikan tanggal 28 Februari...',
    body:`Halo penghuni rumah 21,

Kontrak rumah berakhir tanggal 28 Februari 2027. Kunci dikembalikan
paling lambat pukul 10.00.

Terima kasih sudah menjaga rumah ini selama delapan tahun.
Kalau nanti kalian lewat, mampir saja.

Salam,
H.` },

  { id:'james', from:'James', subject:'foto 2019',
    date:'27 Feb', preview:'nih foto pertama kita. jangan dihapus...',
    body:`nih foto pertama kita. jangan dihapus.

gue inget waktu itu lu diem banget di depan rolling door.
gue kira lu mau kabur.

ternyata lu cuma takut nggak diterima.

bego. kita nungguin lu setengah jam.

— j` },

  { id:'besok', from:'Martin', subject:'buat yang terakhir pergi',
    date:'27 Feb', preview:'kalau kamu baca ini, berarti kamu masih di rumah...',
    body:`kalau kamu baca ini, berarti kamu masih di rumah.

jangan buru-buru. matiin lampu satu-satu. tutup pintu.
taruh kunci di pot bunga.

kamu nggak harus nangis di depan kita.
tapi kalau mau, nangis aja. nggak ada yang lihat.

gue bangga sama kamu.
dari anak yang takut masuk rumah, sampai jadi orang yang
terakhir ninggalin rumah ini.

— m` }
];

/* ---------------- KALENDER ---------------- */
const EVENTS = {
  26: ['Makan terakhir'],
  27: ['Malam terakhir'],
  28: ['Balikin kunci · 10.00']
};

/* ---------------- STORY ---------------- */
const STORY = async (K) => {
  const g = 'group';
  const say = (who, text, d = 1300) => K.say(g, who, text, { delay: d });
  const me = text => K.me(g, text);
  const sys = text => K.sys(g, text);
  const pic = (who, key, cap) => K.img(g, who, key, cap);
  const note = (f = 392, d = 2.5, v = .022) => { if (K.note) K.note(f, d, v); };

  /* ============================================================
     21.00 — MALAM TERAKHIR
     ============================================================ */
  await K.wait(700);
  await K.setClock('21.00');
  await sys('Sabtu, 27 Februari 2027 · 21.00');
  await sys('Malam terakhir di rumah 21');

  await say('martin', 'kono.');
  await say('martin', 'kamu masih di kamar?');
  await me('iya. kardus terakhir.');
  await say('james', 'kardus gue enam. punya lu dua?');
  await me('dua. sisanya udah dikirim minggu lalu.');
  await say('james', 'anjir. gue yang paling banyak barang.');
  await say('juhoon', 'karena lu yang paling banyak drama.');
  await say('james', 'drama itu seni, juh.');
  await say('seonghyeon', 'drama itu capek.');
  await say('james', 'sei, lu belum tidur?');
  await say('seonghyeon', 'belum. nunggu semua pada pulang.');
  await K.wait(600);
  await say('martin', 'pemilik rumah ambil kunci besok jam 10.');
  await say('martin', 'kita punya satu malam.');

  const a = await K.ask(g, [
    { t: 'gue belum siap', v: 'siap' },
    { t: 'satu malam buat beresin doang', v: 'beres' },
    { t: '...', v: 'diem' }
  ]);

  if (a === 'siap') {
    await say('martin', 'gue juga belum.');
    await say('james', 'jangan mulai. gue belum siap nangis.');
    await say('juhoon', 'lu nangis tiap iklan sedih.');
    await say('james', 'itu iklan keluarga, beda.');
    await say('seonghyeon', 'kita juga keluarga.');
    await K.wait(700);
    await say('james', '...');
    await say('james', 'sei, jangan gitu. gue serius.');
  } else if (a === 'beres') {
    await say('james', 'satu malam buat enam kardus? lu gila.');
    await say('martin', 'kono.');
    await say('james', 'iya iya. gue bantu.');
    await say('juhoon', 'gue juga.');
    await say('seonghyeon', 'gue udah beres dari kemarin.');
    await say('james', 'pamer.');
    await K.wait(700);
    await say('martin', 'kita makan dulu. james yang pesen.');
  } else {
    await say('seonghyeon', 'kono?');
    await say('martin', 'kono.');
    await me('nanti gue keluar.');
    await say('james', 'jangan lama-lama. nasi ayamnya dingin.');
    await K.wait(700);
    await say('martin', 'kita makan bareng. terakhir.');
  }

  await K.wait(600);
  await say('james', 'udah gue pesen. nasi ayam lima bungkus.');
  await say('juhoon', 'lima?');
  await say('james', 'iya. kita kan lima.');
  await say('seonghyeon', 'masih lima.');
  await K.wait(800);

  /* ============================================================
     21.40 — RUMAH
     ============================================================ */
  await K.setClock('21.40');
  await sys('21.40');
  await say('me', 'gue keluar bentar.');
  await K.wait(700);
  await pic('me', 'kos', 'rumah 21. malam terakhir.');
  await K.wait(500);
  await me('rumahnya masih sama.');
  await me('catnya udah pudar.');
  await say('martin', 'delapan tahun.');
  await say('james', 'gue inget pertama kali masuk, kamar gue bau lem.');
  await say('juhoon', 'kamar lu emang bau.');
  await say('james', 'kamar lu bau kertas.');
  await say('seonghyeon', 'kamar gue bau tinta.');
  await say('martin', 'kamar gue bau obat.');
  await say('james', 'kamar kono bau...');
  await me('jangan.');
  await say('james', '...TV.');
  await K.wait(600);
  await say('martin', 'besok jam segini, udah ada orang lain di kamar kita.');
  await K.wait(900);

  /* ============================================================
     22.05 — FOTO 2019
     ============================================================ */
  await K.setClock('22.05');
  await sys('22.05');
  await say('juhoon', 'gue nemu foto lama.');
  await pic('juhoon', 'grup', 'hari pertama. 2019.');
  await K.wait(700);
  note(392, 3, .024);
  await say('james', 'anjir. kita masih muda.');
  await say('seonghyeon', 'muka lu masih polos.');
  await say('james', 'sekarang juga.');
  await say('juhoon', 'nggak.');
  await me('gue masih inget hari itu.');
  await me('gue takut banget.');
  await say('martin', 'kamu diem di depan rolling door setengah jam.');
  await me('iya. gue kira kalian nggak mau nerima gue.');
  await say('seonghyeon', 'kita malah nungguin.');
  await say('james', 'sambil bawa kardus lu. berat anjir.');
  await K.wait(700);

  const b = await K.ask(g, [
    { t: 'makasih udah nerima gue', v: 'makasih' },
    { t: 'foto itu jangan dikirim', v: 'hapus' },
    { t: 'kita foto lagi sekarang', v: 'foto' }
  ]);

  if (b === 'makasih') {
    await say('martin', 'nggak usah makasih.');
    await say('james', 'iya. nanti gue nangis.');
    await say('juhoon', 'gue udah nangis.');
    await say('seonghyeon', 'belum.');
    await say('james', 'sei, lu nggak punya air mata ya?');
    await say('seonghyeon', 'punya. tapi gue simpen.');
    await K.wait(600);
    await say('james', 'buat apa?');
    await say('seonghyeon', 'buat nanti.');
  } else if (b === 'hapus') {
    await say('juhoon', 'kenapa?');
    await me('muka gue jelek.');
    await say('james', 'bohong. lu paling ganteng di foto itu.');
    await say('juhoon', 'jangan dihapus.');
    await say('martin', 'fotonya bagus.');
    await K.wait(500);
    await me('...');
    await me('ya udah. jangan dihapus.');
    await say('james', 'bagus. gue mau jadiin wallpaper.');
    await me('jangan.');
  } else {
    await say('james', 'sekarang? gue pake celana tidur.');
    await say('juhoon', 'justru bagus.');
    await say('martin', 'di depan rolling door.');
    await say('seonghyeon', 'gue ambil fotonya.');
    await K.wait(800);
    await say('juhoon', 'hasilnya blur.');
    await say('james', 'yang penting ada.');
    await say('martin', 'yang penting kita.');
    await K.wait(700);
  }

  /* ============================================================
     23.10 — KAMAR 5
     ============================================================ */
  await K.setClock('23.10');
  await sys('23.10');
  await say('me', 'gue balik ke kamar dulu.');
  await K.wait(600);
  await pic('me', 'kamar', 'kamar 5. tinggal TV.');
  await K.wait(500);
  await me('kamar gue kosong.');
  await me('aneh. biasanya penuh.');
  await say('james', 'TV-nya masih nyala.');
  await me('biarin dulu.');
  await say('martin', 'kenapa?');
  await me('biar ada suara.');
  await say('seonghyeon', 'dulu kamu nggak bisa tidur tanpa TV.');
  await me('masih nggak bisa.');
  await say('martin', 'besok kamu tidur di mana?');
  await me('kontrakan baru. sempit.');
  await say('james', 'kalau sempit, tidur di sini aja.');
  await K.wait(800);
  await say('james', '...');
  await say('james', 'eh. nggak bisa ya.');
  await K.wait(900);

  /* ============================================================
     23.50 — KORIDOR
     ============================================================ */
  await K.setClock('23.50');
  await sys('23.50');
  await say('martin', 'kardus di luar kamar semua. jangan lupa.');
  await say('james', 'kardus gue udah di koridor.');
  await say('juhoon', 'punya gue juga.');
  await say('seonghyeon', 'punya gue di depan pintu.');
  await me('gue terakhir.');
  await K.wait(600);
  await pic('me', 'koridor', 'koridor. lampu terakhir.');
  await K.wait(500);
  await me('lampu koridor masih nyala semua.');
  await me('besok udah bukan kita yang bayar listriknya.');
  await say('james', 'kalau ada yang lupa matiin, tagihin gue.');
  await say('martin', 'james.');
  await say('james', 'becanda.');
  await say('juhoon', 'foto dulu. koridor terakhir.');
  await say('seonghyeon', 'kosongin kamar 1 dulu.');
  await say('martin', 'kenapa?');
  await say('seonghyeon', 'biar kelihatan kalau kita beneran pergi.');
  await K.wait(900);

  /* ============================================================
     00.20 — ENAM SIKAT GIGI
     ============================================================ */
  await K.setClock('00.20');
  await sys('00.20');
  await say('james', 'tadi gue hitung sikat gigi di kamar mandi.');
  await say('james', 'ada enam.');
  await say('seonghyeon', 'kita kan lima.');
  await say('james', 'nah.');
  await me('yang satu siapa?');
  await say('james', 'nggak tau. gue beli enam pas pertama pindah.');
  await say('martin', 'kok enam?');
  await say('james', 'gue panik. gue beli satu buat jaga-jaga.');
  await say('juhoon', 'jaga-jaga buat siapa?');
  await say('james', 'nggak tau. buat kalau ada yang dateng.');
  await K.wait(600);
  await pic('james', 'sink', 'kamar mandi. enam sikat gigi.');
  await K.wait(500);
  await me('berarti ada satu yang nggak pernah dipake.');
  await say('james', 'iya.');
  await say('seonghyeon', 'jangan dibuang.');
  await say('james', 'kenapa?');
  await say('seonghyeon', 'biar rumah ini inget kita berlima.');
  await K.wait(700);

  const c = await K.ask(g, [
    { t: 'simpen sikatnya', v: 'simpen' },
    { t: 'buang aja, udah kotor', v: 'buang' },
    { t: 'gue bawa pulang', v: 'bawa' }
  ]);

  if (c === 'simpen') {
    await say('james', 'oke. gue simpen di kardus.');
    await say('seonghyeon', 'jangan di kardus.');
    await say('james', 'terus di mana?');
    await say('seonghyeon', 'di rak. biar yang baru lihat.');
    await say('martin', 'nanti dikira penghuni lama masih ada.');
    await say('seonghyeon', 'iya.');
    await K.wait(600);
  } else if (c === 'buang') {
    await say('james', 'iya ya. udah lama juga.');
    await say('seonghyeon', 'jangan.');
    await say('james', 'sei, ini sikat gigi.');
    await say('seonghyeon', 'gue tau.');
    await K.wait(500);
    await say('james', '...');
    await say('james', 'ya udah. gue simpen.');
    await say('seonghyeon', 'makasih.');
  } else {
    await say('james', 'yang mana?');
    await me('yang belum kepake.');
    await say('james', 'buat apa?');
    await me('buat kalau gue kangen.');
    await K.wait(700);
    await say('seonghyeon', 'kono.');
    await say('james', 'itu sikat gigi, bego.');
    await me('terserah.');
    await say('james', '...');
    await say('james', 'ya udah. bungkus yang rapi.');
  }

  /* ============================================================
     00.55 — FOTO 2021
     ============================================================ */
  await K.setClock('00.55');
  await sys('00.55');
  await say('martin', 'udah. tidur di ruang tamu aja. kasur udah digelar.');
  await say('james', 'kayak camping.');
  await say('juhoon', 'camping di rumah sendiri.');
  await say('seonghyeon', 'terakhir kali.');
  await K.wait(600);
  await say('juhoon', 'gue nemu foto lain.');
  await pic('juhoon', 'selfie', '2021. sebelum sei pulang.');
  await K.wait(700);
  note(349, 3, .022);
  await say('james', 'itu hoodie lu masih ada?');
  await me('udah bolong.');
  await say('seonghyeon', 'gue masih inget hari itu.');
  await say('juhoon', 'hari terakhir sebelum lu balik ke kampung.');
  await say('seonghyeon', 'setahun.');
  await say('martin', 'setahun kita cuma lewat chat.');
  await say('james', 'tapi tiap minggu gue kirim meme.');
  await say('seonghyeon', 'iya. itu yang bikin gue pulang.');
  await K.wait(600);
  await me('gue kira kita bakal bubar waktu itu.');
  await say('martin', 'nggak.');
  await say('james', 'grup kita terlalu jelek buat bubar.');
  await say('juhoon', 'bener.');
  await K.wait(800);

  /* ============================================================
     01.40 — BALKON
     ============================================================ */
  await K.setClock('01.40');
  await sys('01.40');
  await say('me', 'gue ambil minum dulu.');
  await K.wait(500);
  await sys('Di balkon, dua suara. Pelan.');
  await K.wait(700);
  await say('martin', 'kono paling susah.');
  await say('james', 'kenapa?');
  await say('martin', 'dia yang paling lama di sini.');
  await say('martin', 'kita semua udah punya tujuan. dia belum.');
  await say('james', 'jangan bilang gitu di depan dia.');
  await say('martin', 'gue nggak akan.');
  await say('james', 'dia bakal baik-baik aja.');
  await say('martin', 'iya. gue cuma...');
  await K.wait(700);

  const d = await K.ask(g, [
    { t: 'dengerin terus', v: 'denger' },
    { t: 'keluar dan gabung', v: 'gabung' },
    { t: 'balik ke kamar', v: 'kamar' }
  ]);

  if (d === 'denger') {
    await K.wait(700);
    await say('james', 'kono?');
    await say('martin', 'udah dari tadi?');
    await me('baru.');
    await say('james', 'bohong.');
    await K.wait(500);
    await say('martin', 'maaf.');
    await me('nggak apa-apa.');
    await me('gue juga ngerasa.');
    await say('martin', '...');
    await say('james', 'nah. sekarang gue yang mau nangis.');
    await say('martin', 'jangan.');
  } else if (d === 'gabung') {
    await say('james', 'kono. ikut.' );
    await K.wait(400);
    await say('martin', 'gue nggak maksud ngomong gitu.');
    await me('tapi bener.');
    await say('james', 'salah.');
    await say('james', 'lu udah punya tujuan. lu cuma belum lihat.');
    await me('apa?');
    await say('james', 'ya... ini. jadi orang yang bikin orang lain betah.');
    await K.wait(600);
    await say('martin', 'james bener.');
  } else {
    await K.wait(900);
    await sys('Kamu balik ke kamar.');
    await K.wait(700);
    await sys('Martin mengirim pesan pribadi.');
    await K.say('martin', 'martin', 'kamu denger ya?');
    await K.say('martin', 'me', 'nggak.');
    await K.say('martin', 'martin', 'bohong.');
    await K.wait(600);
    await K.say('martin', 'martin', 'maaf.');
    await K.say('martin', 'me', 'nggak apa-apa. gue juga ngerasa.');
    await K.say('martin', 'martin', 'besok kita ngomong lagi.');
    await K.say('martin', 'me', 'iya.');
    await K.wait(700);
    await sys('Kamu kembali ke ruang tamu.');
  }

  /* ============================================================
     02.20 — KORIDOR, NAMA DI PINTU
     ============================================================ */
  await K.setClock('02.20');
  await sys('02.20');
  await say('me', 'gue belum ngantuk.');
  await say('james', 'sama.');
  await say('martin', 'tidur. besok pagi-pagi.');
  await say('seonghyeon', 'biarin. malam terakhir.');
  await K.wait(700);
  await say('me', 'gue ke koridor bentar.');
  await K.wait(500);
  await pic('me', 'pintu', 'pintu kamar 5. nama gue masih di situ.');
  await K.wait(600);
  await me('nama gue masih nempel.');
  await me('2019.');
  await say('james', 'belum dicabut?');
  await me('belum.');
  await say('martin', 'biarin aja.');
  await me('nanti yang baru tinggal di sini bakal bingung.');
  await say('james', 'biarin mereka bingung.');
  await say('seonghyeon', 'biar mereka tau, kamar ini pernah ada yang tinggal.');
  await K.wait(800);

  /* ============================================================
     03.00 — JAMES DI KORIDOR
     ============================================================ */
  await K.setClock('03.00');
  await sys('03.00');
  await say('james', 'kono.');
  await me('hah.');
  await say('james', 'gue takut.');
  await me('takut apa?');
  await say('james', 'besok kita bukan tetangga lagi.');
  await me('kita masih temen.');
  await say('james', 'beda.');
  await me('nggak.');
  await say('james', 'kalau kita sibuk, kita bakal lupa.');
  await me('gue nggak bakal lupa.');
  await say('james', 'janji?');
  await me('janji.');
  await say('james', 'kalau lu bohong, gue dateng ke kontrakan lu.');
  await me('boleh.');
  await K.wait(700);
  await say('james', '...');
  await say('james', 'gue beneran nangis ya.');
  await me('jangan.');
  await say('james', 'telat.');
  await K.wait(900);
  note(330, 3.2, .02);

  /* ============================================================
     04.10 — SEONGHYEON PULANG
     ============================================================ */
  await K.setClock('04.10');
  await sys('04.10');
  await say('seonghyeon', 'gue berangkat.');
  await say('james', 'bus lu jam lima.');
  await say('seonghyeon', 'iya. gue jalan kaki ke terminal.');
  await say('martin', 'gue antar.');
  await say('seonghyeon', 'nggak. gue mau jalan sendiri.');
  await K.wait(700);
  await say('seonghyeon', 'kono.');
  await me('hah.');
  await say('seonghyeon', 'ini buku gue. ada lirik yang belum selesai.');
  await me('buat apa?');
  await say('seonghyeon', 'buat kamu.');
  await say('seonghyeon', 'kalau ketemu, kita selesaiin.');
  await me('janji.');
  await K.wait(800);
  await say('james', 'sei.');
  await say('seonghyeon', 'jangan peluk gue.');
  await say('james', 'telat.');
  await K.wait(600);
  await say('martin', 'jaga diri.');
  await say('seonghyeon', 'iya.');
  await say('juhoon', 'kirim foto.');
  await say('seonghyeon', 'iya.');
  await K.wait(700);
  await sys('Seonghyeon keluar dari rumah 21 · 04.12');
  await K.wait(800);
  await me('sei.');
  await K.wait(600);
  await say('james', 'jangan.');
  await say('martin', 'biarin dia jalan.');
  await K.wait(900);

  /* ============================================================
     05.00 — MARTIN & JAMES PULANG
     ============================================================ */
  await K.setClock('05.00');
  await sys('05.00');
  await say('martin', 'gue sama james berangkat.');
  await say('juhoon', 'gue jam tujuh.');
  await me('gue terakhir.');
  await say('martin', 'iya. kamu terakhir.');
  await K.wait(700);
  await say('martin', 'ini kunci cadangan.');
  await me('buat apa?');
  await say('martin', 'buat kamu.');
  await me('rumahnya udah bukan punya kita.');
  await say('martin', 'kuncinya tetap punya kamu.');
  await K.wait(800);
  await say('james', 'kono.');
  await me('hah.');
  await say('james', 'jangan lupa makan.');
  await me('iya.');
  await say('james', 'gue serius.');
  await me('iya.');
  await say('james', '...');
  await say('james', 'gue peluk dulu.');
  await K.wait(700);
  await say('martin', 'james.');
  await say('james', 'sebentar.');
  await K.wait(1000);
  await say('martin', 'kami jalan.');
  await sys('Martin dan James keluar dari rumah 21 · 05.03');
  await K.wait(800);
  await say('juhoon', 'tinggal kita berdua.');
  await me('tinggal kita berdua.');
  await K.wait(900);

  /* ============================================================
     05.40 — JUHOON PULANG
     ============================================================ */
  await K.setClock('05.40');
  await sys('05.40');
  await say('juhoon', 'gue berangkat.');
  await me('jam tujuh kan?');
  await say('juhoon', 'gue mau sarapan dulu di stasiun.');
  await me('iya.');
  await K.wait(700);
  await say('juhoon', 'ini kartu memori kamera gue.');
  await me('semua foto?');
  await say('juhoon', 'semua. 2019 sampai hari ini.');
  await me('nanti gue kirim ke grup.');
  await say('juhoon', 'jangan semua. simpen yang bagus.');
  await me('yang jelek?');
  await say('juhoon', 'hapus. biar kenangan kita kelihatan bagus.');
  await me('bohong.');
  await say('juhoon', 'iya.');
  await K.wait(700);
  await say('juhoon', 'kono.');
  await me('hah.');
  await say('juhoon', 'makasih udah jadi yang paling akhir.');
  await me('bukan pilihan.');
  await say('juhoon', 'tetep.');
  await K.wait(700);
  await sys('Juhoon keluar dari rumah 21 · 05.42');
  await K.wait(900);

  /* ============================================================
     06.00 — TERAKHIR
     ============================================================ */
  await K.setClock('06.00');
  await sys('06.00');
  await say('me', 'gue sendirian.');
  await K.wait(700);
  await pic('me', 'lemari', 'lemari kamar 2. jaket yang ketinggalan.');
  await K.wait(600);
  await me('james ketinggalan jaket.');
  await say('james', 'simpen dulu. nanti gue ambil.');
  await me('kapan?');
  await K.wait(700);
  await say('james', '...');
  await say('james', 'simpen aja. buat lu.');
  await me('bau lu.');
  await say('james', 'wangi.');
  await me('nggak.');
  await say('james', 'terserah.');
  await K.wait(800);

  await sys('06.15 — semua kamar kosong');
  await me('kamar 1 kosong.');
  await me('kamar 2 kosong.');
  await me('kamar 3 kosong.');
  await me('kamar 4 kosong.');
  await me('kamar 5...');
  await K.wait(700);
  await me('kamar 5 juga kosong.');
  await K.wait(900);
  await note(262, 3.5, .018);

  await say('martin', 'kono, udah keluar?');
  await me('belum. bentar.');
  await say('james', 'jangan lupa kunci.');
  await say('juhoon', 'jangan lupa foto.');
  await say('seonghyeon', 'jangan lupa.');
  await me('lupa apa?');
  await say('seonghyeon', 'apa aja.');
  await K.wait(900);

  await sys('06.24 — pintu rolling ditutup');
  await K.fx.blackout(900);
  await K.wait(700);
  await me('udah. kunci di pot bunga.');
  await say('martin', 'makasih, kono.');
  await say('james', 'dadah rumah.');
  await say('juhoon', 'dadah.');
  await say('seonghyeon', 'sampai ketemu.');
  await me('sampai ketemu.');
  await K.wait(1000);

  /* ============================================================
     SETAHUN KEMUDIAN
     ============================================================ */
  await K.setClock('06.10');
  await sys('Setahun kemudian.');
  await sys('Grup KOS 21 masih ada.');
  await K.wait(700);
  await sys('Tidak ada yang keluar.');
  await K.wait(700);
  await sys('Tidak ada yang diganti namanya.');
  await K.wait(900);
  await me('kalian masih di sana?');
  await K.wait(900);
  await sys('Pesan dibaca 4 orang.');
  await K.wait(1200);
  await K.typingGhost(g, 'me', 2600);
  await sys('Kono berhenti mengetik.');
  await K.wait(1000);
  await me('gue kangen.');
  await K.wait(1400);
  await note(196, 4, .016);
  return K.end('kosong');
};

/* ---------------- ENDINGS ---------------- */
const ENDINGS = {
  kosong: {
    code: 'AKHIR',
    title: 'KOSONG',
    body: [
      'Rumah 21 masih berdiri. Catnya sudah dicat ulang. Rolling door-nya sekarang biru.',
      'Kamar 1 sampai 4 diisi orang lain. Kamar 5 di ujung koridor sekarang punya penghuni baru. Namanya bukan Kono.',
      'Martin kerja di percetakan. James buka warung kopi kecil. Juhoon motret pernikahan. Seonghyeon akhirnya menyelesaikan lagunya.',
      'Kono pindah tiga kali dalam setahun. Di setiap kamar, dia selalu tidur dengan TV menyala.',
      'Grup KOS 21 masih ada. Namanya nggak pernah diganti. Isinya kadang meme, kadang ucapan ulang tahun, kadang cuma "halo".',
      'Tapi nggak ada lagi suara James yang berisik di koridor. Nggak ada lagi Juhoon yang motret semua hal. Nggak ada lagi Seonghyeon yang nulis di buku. Nggak ada lagi Martin yang bilang "jangan".',
      'Yang hilang bukan cuma rumah. Yang hilang adalah versi kita yang tinggal di dalamnya.',
      'Kono masih menyimpan kunci cadangan. Dia tahu pintunya sudah diganti. Tapi kunci itu tetap ada di laci, di samping foto lima orang di depan rolling door.',
      'Kadang dia membuka chat, mengetik sesuatu, lalu menghapusnya. Karena nggak semua rindu harus sampai.'
    ],
    mark: 'rumah 21 masih ada. yang kosong cuma kita.'
  }
};
