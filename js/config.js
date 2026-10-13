/* ============================================================
   WEDDING INVITATION
   Central Configuration
   ============================================================ */

const WEDDING_CONFIG = {
  // --------------------------------------------------------
  // 1. INFORMASI UTAMA
  // --------------------------------------------------------

  wedding: {
    title: "Eligius & Diyanti",
    date: "2026-11-16T08:00:00+07:00",
    displayDate: "Minggu, 14 Desember 2026",
    openingDate: "14 Desember 2026",
    musicFile: "assets/music/wedding-song.mp3",

    metaDate: "14 Desember 2026",
    eyebrow: "The Wedding Of",

    // Foto cover untuk halaman opening (opsional)
    // Kalau kosong atau file tidak ada, akan fallback ke warna solid
    coverPhoto: "assets/images/hero.jpg",
  },

  // --------------------------------------------------------
  // 2. MEMPELAI PRIA
  // --------------------------------------------------------

  groom: {
    nickname: "Eligius",
    fullName: "Eligius Zebua",
    father: "Nama Ayah",
    mother: "Nama Ibu",
    photo: "assets/images/groom.jpg",
    parentsPrefix: "Putra dari",
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
    parentsPrefix: "Putri dari",
  },

  // --------------------------------------------------------
  // 4. ACARA PERNIKAHAN
  // --------------------------------------------------------

  events: [
    {
      title: "Akad Nikah",
      date: "Minggu, 14 Desember 2026",
      time: "08.00 WIB — Selesai",
      venue: "Gereja BNKP Pewarta",
      address:
        "Perkudangan Sunrise Bizpark, Blok C No.70, Gelam Jaya, Kec. Ps. Kemis, Kabupaten Tangerang, Banten 15560",
    },
    {
      title: "Resepsi",
      date: "Minggu, 14 Desember 2026",
      time: "11.00 — Selesai",
      venue: "Gereja BNKP Pewarta",
      address:
        "Perkudangan Sunrise Bizpark, Blok C No.70, Gelam Jaya, Kec. Ps. Kemis, Kabupaten Tangerang, Banten 15560",
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
    { src: "assets/images/gallery-01.jpg", alt: "Foto momen 1" },
    { src: "assets/images/gallery-02.jpg", alt: "Foto momen 2" },
    { src: "assets/images/gallery-03.jpg", alt: "Foto momen 3" },
    { src: "assets/images/gallery-04.jpg", alt: "Foto momen 4" },
    { src: "assets/images/gallery-05.jpg", alt: "Foto momen 5" },
    { src: "assets/images/gallery-06.jpg", alt: "Foto momen 6" },
  ],

  // --------------------------------------------------------
  // 7. LOKASI / GOOGLE MAPS
  // --------------------------------------------------------

  location: {
    venue: "Gereja BNKP Pewarta",
    date: "Minggu, 14 Desember 2026",
    address:
      "Perkudangan Sunrise Bizpark, Blok C No.70, Gelam Jaya, Kec. Ps. Kemis, Kabupaten Tangerang, Banten 15560",

    mapsUrl: "https://maps.app.goo.gl/3YnKSgzURREQ82te8",

    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6432980026348!2d106.56107387567151!3d-6.1784792605427725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff001f17800f%3A0x6d63c822d601b8e4!2sGereja%20BNKP%20Pewarta!5e0!3m2!1sid!2sid!4v1791867760826!5m2!1sid!2sid",

    // Koordinat untuk tombol "Petunjuk Arah"
    // Format: "latitude,longitude"
    // Ambil dari Google Maps: klik kanan di lokasi → copy koordinat
    coordinates: "-6.178473391795702, 106.56364824427627",

    // Teks tombol rute
    routeButtonText: "Petunjuk Arah",
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
    phone: "6287749466497",

    quickWishes: [
      "Selamat menempuh hidup baru! Semoga bahagia selalu 🤍",
      "Doa terbaik untuk kalian berdua ✨",
      "Turut berbahagia atas pernikahan kalian 🥂",
    ],

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

  // ============================================================
  // 10. KONTEN TEKS HALAMAN
  // ============================================================

  content: {
    // ---------- OPENING ----------
    opening: {
      guestLabel: "Kepada Yth.",
      guestDefault: "Para Tamu Undangan",
      buttonText: "Buka Undangan",
    },

    // ---------- INTRO ----------
    intro: {
      eyebrow: "UNDANGAN PERNIKAHAN",
      heading: "Dengan penuh sukacita,<br>kami mengundang Anda",
      text: "Untuk hadir dan menjadi bagian dari hari bahagia kami dalam ikatan pernikahan.",
      poem: [
        "Ketika Tuhan menulis takdir-Nya",
        "Tuhan juga menulis satu nama di dalam hidupku",
        "Bertahun aku menunggu satu nama itu",
        "Akhirnya hari ini terjawab sudah penantian itu",
        "Kau adalah takdirku",
      ],
    },

    // ---------- COUPLE ----------
    couple: {
      eyebrow: "Kami Yang Berbahagia",
      heading: "Dua Hati, Satu Cerita",
    },

    // ---------- COUNTDOWN ----------
    countdown: {
      eyebrow: "CATAT TANGGALNYA",
      note: "Menuju hari bahagia kami",
      units: {
        days: "Hari",
        hours: "Jam",
        minutes: "Menit",
        seconds: "Detik",
      },
      // Teks pengganti saat hari-H atau setelahnya
      arrivalTitle: "Hari Ini Hari Bahagia Kami!",
      arrivalText: "Terima kasih telah menjadi bagian dari momen ini 🤍",
      afterTitle: "Terima Kasih",
      afterText:
        "Acara telah berlangsung. Terima kasih atas doa dan restunya 🤍",
    },

    // ---------- EVENTS ----------
    events: {
      eyebrow: "ACARA PERNIKAHAN",
      heading: "Abadikan Momennya",
      buttonText: "Lihat Lokasi",
    },

    // ---------- STORY ----------
    story: {
      eyebrow: "KISAH KAMI",
      heading: "Sebuah Kisah Yang Tak Terlupakan",
    },

    // ---------- GALLERY ----------
    gallery: {
      eyebrow: "KISAH KAMI",
      heading: "Galeri Bersama",
      quote: [
        "“Demikianlah mereka bukan lagi dua, melainkan satu.",
        "Karena itu, apa yang telah dipersatukan Allah,",
        "Tidak boleh diceraikan manusia.”",
        "— Matius 19:6",
      ],
    },

    // ---------- LOCATION ----------
    location: {
      eyebrow: "TEMPAT PERNIKAHAN",
      heading: "Temukan Kami Disini",
      buttonText: "Buka Google Maps",
    },

    // ---------- RSVP ----------
    rsvp: {
      eyebrow: "KONFIRMASI KEHADIRAN",
      heading: "Kami Menantikan<br>Kehadiran Anda",
      text: "Mohon konfirmasi kehadiran Anda agar kami dapat mempersiapkan segalanya dengan baik. Jawaban Anda akan dikirim lewat WhatsApp.",
      nameLabel: "Nama",
      namePlaceholder: "Nama lengkap Anda",
      attendanceLegend: "Kehadiran",
      attendanceHadir: "Hadir",
      attendanceTidak: "Tidak Hadir",
      guestsLabel: "Jumlah tamu (termasuk Anda)",
      guestsOptions: ["1 orang", "2 orang", "3 orang", "4 orang", "5 orang"],
      eventsLegend: "Acara yang akan dihadiri",
      messageLabel: "Ucapan & doa (opsional)",
      messagePlaceholder: "Tulis ucapan untuk kami...",
      quickWishesLabel: "Atau pilih cepat:",
      hint: "Anda akan diarahkan ke WhatsApp dengan pesan yang sudah tersusun. Tinggal tekan kirim.",
      submitText: "Kirim via WhatsApp",
      successNote: "Membuka WhatsApp… Jika tidak terbuka, ",
      successLinkText: "ketuk di sini",
    },

    // ---------- GIFT ----------
    gift: {
      eyebrow: "AMPLOP DIGITAL",
      heading: "Doa lebih dari cukup,<br>tapi jika berkenan berbagi",
      text: "Kehadiranmu adalah hadiah terindah. Jika ingin memberikan tanda kasih, silakan melalui rekening di bawah — tanpa mengurangi rasa hormat kami.",
      copyButtonText: "SALIN NOMOR",
      ownerLabel: "Atas nama",
    },

    // ---------- FOOTER ----------
    footer: {
      thankYou: "Terima kasih telah menjadi bagian dari hari bahagia kami.",
      backToTop: "Kembali ke atas",
    },
  },
};
