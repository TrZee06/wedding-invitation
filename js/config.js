/* ============================================================
   WEDDING INVITATION
   Central Configuration
   Ubah informasi undangan dari file ini.
   ============================================================ */

const WEDDING_CONFIG = {
  // --------------------------------------------------------
  // 1. INFORMASI UTAMA
  // --------------------------------------------------------

  wedding: {
    title: "Eligius & Diyanti",
    date: "2026-12-20T08:00:00+07:00",
    displayDate: "Minggu, 20 Desember 2026",
    openingDate: "20 DECEMBER 2026",
    musicFile: "assets/music/wedding-song.mp3",
  },

  // --------------------------------------------------------
  // 2. MEMPELAI PRIA
  // --------------------------------------------------------

  groom: {
    nickname: "Eligius",
    fullName: "Eligius Putra",
    father: "Nama Ayah",
    mother: "Nama Ibu",
    photo: "assets/images/groom.jpg",
  },

  // --------------------------------------------------------
  // 3. MEMPELAI WANITA
  // --------------------------------------------------------

  bride: {
    nickname: "Diyanti",
    fullName: "Indri Diyanti",
    father: "Nama Ayah",
    mother: "Nama Ibu",
    photo: "assets/images/bride.jpg",
  },

  // --------------------------------------------------------
  // 4. ACARA PERNIKAHAN
  // --------------------------------------------------------

  events: [
    {
      title: "Akad Nikah",
      date: "Minggu, 20 Desember 2026",
      time: "08.00 WIB — Selesai",
      venue: "Nama Gedung / Tempat",
      address: "Jl. Contoh No. 123, Tangerang, Banten",
    },
    {
      title: "Resepsi",
      date: "Minggu, 20 Desember 2026",
      time: "11.00 — 14.00 WIB",
      venue: "Nama Gedung / Tempat",
      address: "Jl. Contoh No. 123, Tangerang, Banten",
    },
  ],

  // --------------------------------------------------------
  // 5. OUR STORY
  // --------------------------------------------------------

  story: [
    {
      year: "2020",
      title: "Pertemuan Pertama",
      description:
        "Cerita singkat tentang bagaimana kami pertama kali bertemu.",
    },
    {
      year: "2022",
      title: "Tumbuh Bersama",
      description:
        "Cerita tentang perjalanan kami hingga semakin mengenal satu sama lain.",
    },
    {
      year: "2026",
      title: "Awal dari Selamanya",
      description:
        "Hari ketika kami memutuskan untuk melanjutkan perjalanan ini bersama.",
    },
  ],

  // --------------------------------------------------------
  // 6. GALERI FOTO
  // --------------------------------------------------------

  gallery: [
    {
      src: "assets/images/gallery-01.jpg",
      alt: "Foto momen 1",
    },
    {
      src: "assets/images/gallery-02.jpg",
      alt: "Foto momen 2",
    },
    {
      src: "assets/images/gallery-03.jpg",
      alt: "Foto momen 3",
    },
    {
      src: "assets/images/gallery-04.jpg",
      alt: "Foto momen 4",
    },
    {
      src: "assets/images/gallery-05.jpg",
      alt: "Foto momen 5",
    },
    {
      src: "assets/images/gallery-06.jpg",
      alt: "Foto momen 6",
    },
  ],

  // --------------------------------------------------------
  // 7. LOKASI / GOOGLE MAPS
  // --------------------------------------------------------

  location: {
    venue: "Nama Gedung / Tempat",
    date: "Minggu, 20 Desember 2026",
    address: "Jl. Contoh No. 123, Tangerang, Banten",

    // Ganti dengan tautan Google Maps lokasi pernikahan.
    mapsUrl: "https://maps.google.com/?q=Tangerang",
  },

  // --------------------------------------------------------
  // 8. REKENING AMPLOP DIGITAL
  // --------------------------------------------------------

  bankAccounts: [
    {
      bank: "BCA",
      owner: "Eligius",
      number: "123456789012",
    },
    {
      bank: "MANDIRI",
      owner: "Indri Diyanti",
      number: "987654321098",
    },
  ],

  // --------------------------------------------------------
  // 9. RSVP WHATSAPP
  // --------------------------------------------------------

  whatsapp: {
    // Nomor tujuan RSVP.
    // Gunakan kode negara, tanpa tanda +, spasi, atau strip.
    // +62 877-4946-6497  ->  6287749466497
    phone: "6287749466497",

    // Ucapan cepat: tombol yang mengisi kolom "Ucapan & doa" sekali ketuk.
    // Hapus semua isinya ([]) jika tidak ingin memakai fitur ini.
    quickWishes: [
      "Selamat menempuh hidup baru! Semoga bahagia selalu 🤍",
      "Doa terbaik untuk kalian berdua ✨",
      "Turut berbahagia atas pernikahan kalian 🥂",
    ],

    // Isi pesan WhatsApp yang dikirim tamu.
    //
    // Penanda yang bisa dipakai:
    //   {mempelai}  nama pasangan      {nama}    nama tamu
    //   {jumlah}    jumlah tamu        {acara}   acara yang dihadiri
    //   {ucapan}    ucapan & doa
    //
    // [[ ... ]] = bagian opsional: otomatis dibuang jika ada penanda
    // di dalamnya yang kosong (misalnya tamu tidak menulis ucapan).
    // *teks* = huruf tebal di WhatsApp.
    templates: {
      hadir: `Halo {mempelai} 👋

Saya *{nama}* dengan senang hati mengonfirmasi kehadiran di pernikahan kalian 🤍

📌 Kehadiran: *Hadir*
👥 Jumlah tamu: *{jumlah} orang*
[[🗓 Acara: {acara}]]

[[💌 Ucapan & doa:
{ucapan}]]

Sampai jumpa di hari bahagia kalian! ✨`,

      tidak: `Halo {mempelai} 👋

Saya *{nama}* mohon maaf belum bisa hadir di pernikahan kalian 🙏

📌 Kehadiran: *Tidak hadir*

[[💌 Ucapan & doa:
{ucapan}]]

Semoga acaranya berjalan lancar dan penuh kebahagiaan 🤍`,
    },
  },
};
