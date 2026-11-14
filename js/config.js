/* ============================================================
   WEDDING INVITATION
   Central Configuration
   ============================================================ */

const WEDDING_CONFIG = {
  // --------------------------------------------------------
  // 1. INFORMASI UTAMA
  // --------------------------------------------------------

  wedding: {
    title: "Seven & Hertika",
    date: "2026-11-22T13:00:00+07:00",
    dateStartOfDay: "2026-11-22T00:00:00+07:00",
    musicFile: "assets/music/wedding-song.mp3",
    eyebrow: "The Wedding Of",
    coverPhoto: "assets/images/hero.jpg",
  },

  // --------------------------------------------------------
  // 2. MEMPELAI PRIA
  // --------------------------------------------------------
  groom: {
    nickname: "Seven",
    fullName: "Kasih Sevenndi Zebua",
    // Menggabungkan nama ayah dan ibu menjadi satu string
    father: "Seven Zebua",
    mother: "Seven Zebua",
    photo: "assets/images/groom.jpg",
    parentsPrefix: "Putra ke-1 dari",
    // Menggunakan A/I. dan menghapus format lama
    parentsFormat: "A/I. {father}",
  },

  // --------------------------------------------------------
  // 3. MEMPELAI WANITA
  // --------------------------------------------------------
  bride: {
    nickname: "Herti",
    fullName: "Hertika Gulo",
    father: "Safi Gulo",
    mother: "Safi Gulo",
    photo: "assets/images/bride.jpg",
    parentsPrefix: "Putri ke-2 dari",
    parentsFormat: "A/I. {father}",
  },

  // --------------------------------------------------------
  // 4. ACARA PERNIKAHAN
  // --------------------------------------------------------

  events: [
    {
      title: "Pemberkatan",
      date: "Minggu, 22 November 2026",
      time: "13.00 WIB — Selesai",
      venue: "Gereja ONKP Tangerang",
      address: "Jl. Sunrise Jaya Blok A No.15, Ps. Kemis, Kab. Tangerang",
      mapsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Gereja+ONKP+Tangerang",
      buttonText: "Petunjuk Arah",
    },
    {
      title: "Acara Adat / Resepsi",
      date: "Minggu, 22 November 2026",
      time: "16.00 WIB — Selesai",
      venue: "Gereja BNKP Pewarta Tangerang",
      address:
        "Pergudangan Sunrise Bizpark Blok C No.70, Ps. Kemis, Kab. Tangerang",
      scrollTarget: "#location",
      buttonText: "Lihat Detail",
    },
  ],

  // --------------------------------------------------------
  // 5. GALERI FOTO
  // --------------------------------------------------------

  gallery: [
    { src: "assets/images/gallery-01.jpeg", alt: "Momen Seven & Hertika 1" },
    { src: "assets/images/gallery-02.jpg", alt: "Momen Seven & Hertika 2" },
    { src: "assets/images/gallery-03.jpg", alt: "Momen Seven & Hertika 3" },
    { src: "assets/images/gallery-04.jpg", alt: "Momen Seven & Hertika 4" },
    { src: "assets/images/gallery-05.jpg", alt: "Momen Seven & Hertika 5" },
    { src: "assets/images/gallery-06.jpg", alt: "Momen Seven & Hertika 6" },
  ],

  // --------------------------------------------------------
  // 6. LOKASI / GOOGLE MAPS (Untuk Section Peta Bawah)
  // --------------------------------------------------------

  location: {
    venue: "Gereja BNKP Pewarta",
    date: "Minggu, 22 November 2026",
    address:
      "Pergudangan Sunrise Bizpark Blok C No.70, Ps. Kemis, Kab. Tangerang", // ← GANTI
    mapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=-6.178473391795702,106.56364824427627",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6432980026348!2d106.56107387567151!3d-6.1784792605427725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ff001f17800f%3A0x6d63c822d601b8e4!2sGereja%20BNKP%20Pewarta!5e0!3m2!1sid!2sid!4v1791867760826!5m2!1sid!2sid",
    coordinates: "-6.178473391795702,106.56364824427627",
    routeButtonText: "Petunjuk Arah",
  },

  // --------------------------------------------------------
  // 7. REKENING AMPLOP DIGITAL
  // --------------------------------------------------------

  bankAccounts: [
    {
      bank: "BCA",
      owner: "Kasih Sevenndi Zebua",
      number: "1670936569",
    },
    {
      bank: "DANA",
      owner: "Kasih Sevenndi Zebua",
      number: "081211238559",
    },
  ],

  // --------------------------------------------------------
  // 8. RSVP WHATSAPP
  // --------------------------------------------------------

  whatsapp: {
    phone: "6281211238559",
    quickWishes: [
      "Selamat menempuh hidup baru Seven & Hertika! Semoga bahagia selalu 🤍",
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

  // --------------------------------------------------------
  // 9. TURUT MENGUNDANG (FAMILY LIST)
  // --------------------------------------------------------

  familyList: {
    groomSide: [
      "A/i. Seven Zebua (Nias)",
      "A/i. Seri Zebua (Nias)",
      "A/i. Fari Zebua (Nias)",
      "A/i. Tini Zebua (Nias)",
      "Ramali/Uco Zebua (Nias)",
      "Eka Daeli (Jakarta)",
      "A/i. Sastra (Depok)",
      "A/i. Naura Gulo (Tangerang)",
    ],
    brideSide: [
      "A/I. Safi Gulo",
      "A/I. Daniel Gulo",
      "A/I. Murni Gulo",
      "A/I. Ayu Gulo",
      "A/I. Lilis Gulo",
    ],
  },

  // ============================================================
  // 10. KONTEN TEKS HALAMAN
  // ============================================================

  content: {
    opening: {
      guestLabel: "Kepada Yth.",
      guestDefault: "Para Tamu Undangan",
      buttonText: "Buka Undangan",
    },
    intro: {
      eyebrow: "UNDANGAN PERNIKAHAN",
      heading: "Dengan penuh sukacita,<br>kami mengundang Anda",
      text: "Untuk hadir dan menjadi bagian dari hari bahagia kami dalam ikatan pernikahan.",
      poem: [
        "“Tuhan membuat segala sesuatu indah pada waktunya. Indah ketika Dia mempertemukan, indah ketika Dia menumbuhkan kasih, dan indah saat kami melangkah bersama di jalan-Nya.”",
        "“Cinta sejati bersumber dari Allah. Kiranya kasih Kristus menjadi dasar dan pusat dari rumah tangga yang akan kami bangun bersama.”",
      ],
    },
    couple: {
      eyebrow: "Kami Yang Berbahagia",
      heading: "Dua Hati, Satu Cerita",
    },
    countdown: {
      eyebrow: "CATAT TANGGALNYA",
      // Mengganti teks "Menuju hari bahagia kami"
      note: "“Bukan karena kami hebat, tetapi karena kasih Tuhan yang lebih dulu menyatukan dan menuntun langkah kami hingga hari ini.”",
      units: { days: "Hari", hours: "Jam", minutes: "Menit", seconds: "Detik" },
      arrivalTitle: "Hari Ini Hari Bahagia Kami!",
      arrivalText: "Terima kasih telah menjadi bagian dari momen ini 🤍",
      afterTitle: "Terima Kasih",
      afterText:
        "Acara telah berlangsung. Terima kasih atas doa dan restunya 🤍",
    },
    events: {
      eyebrow: "ACARA PERNIKAHAN",
      heading: "Abadikan Momennya",
      buttonText: "Petunjuk Arah", // Diubah
    },
    // SECTION STORY DIHAPUS DARI SINI
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
    // KONTEN BARU UNTUK TURUT MENGUNDANG
    family: {
      eyebrow: "TURUT MENGUNDANG",
      heading: "Keluarga Besar",
      groomTitle: "Mempelai Pria",
      brideTitle: "Mempelai Wanita",
    },
    location: {
      eyebrow: "TEMPAT PERNIKAHAN",
      heading: "Temukan Kami Disini",
      buttonText: "Buka Google Maps",
    },
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
    gift: {
      eyebrow: "AMPLOP DIGITAL",
      heading: "Doa lebih dari cukup,<br>tapi jika berkenan berbagi",
      text: "Kehadiran Anda adalah hadiah terindah. Jika ingin memberikan tanda kasih, silakan melalui rekening di bawah — tanpa mengurangi rasa hormat kami.", // ← GANTI
      copyButtonText: "SALIN NOMOR",
      ownerLabel: "Atas nama",
    },
    footer: {
      thankYou: "Terima kasih telah menjadi bagian dari hari bahagia kami.",
      backToTop: "Kembali ke atas",
    },
  },
};
