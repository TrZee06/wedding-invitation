/* ============================================================
   WEDDING INVITATION
   Main JavaScript
   ============================================================ */

/* ============================================================
   01. HELPER
   ============================================================ */

/**
 * Mengambil elemen berdasarkan ID.
 */
function getElement(id) {
  return document.getElementById(id);
}

/**
 * Mengubah isi teks sebuah elemen jika elemennya tersedia.
 */
function setText(id, value) {
  const element = getElement(id);

  if (element) {
    element.textContent = value;
  }
}

/**
 * Mengubah atribut sebuah elemen jika elemennya tersedia.
 */
function setAttribute(id, attribute, value) {
  const element = getElement(id);

  if (element) {
    element.setAttribute(attribute, value);
  }
}

/* ============================================================
   02. COUPLE INFORMATION
   ============================================================ */

function loadCoupleInformation() {
  /*
   * Groom
   */

  setText("groom-name", WEDDING_CONFIG.groom.nickname);

  const groomFullName = document.querySelector(
    ".person-card:nth-child(1) .person-full-name",
  );

  if (groomFullName) {
    groomFullName.textContent = WEDDING_CONFIG.groom.fullName;
  }

  const groomParents = document.querySelector(
    ".person-card:nth-child(1) .parents",
  );

  if (groomParents) {
    groomParents.innerHTML = `Putra dari Bapak ${WEDDING_CONFIG.groom.father}<br>
             &amp; Ibu ${WEDDING_CONFIG.groom.mother}`;
  }

  const groomPhoto = document.querySelector(
    ".person-card:nth-child(1) .person-photo img",
  );

  if (groomPhoto) {
    groomPhoto.src = WEDDING_CONFIG.groom.photo;

    groomPhoto.alt = `Foto ${WEDDING_CONFIG.groom.fullName}`;
  }

  /*
   * Bride
   */

  setText("bride-name", WEDDING_CONFIG.bride.nickname);

  const brideFullName = document.querySelector(
    ".person-card:nth-child(3) .person-full-name",
  );

  if (brideFullName) {
    brideFullName.textContent = WEDDING_CONFIG.bride.fullName;
  }

  const brideParents = document.querySelector(
    ".person-card:nth-child(3) .parents",
  );

  if (brideParents) {
    brideParents.innerHTML = `Putri dari Bapak ${WEDDING_CONFIG.bride.father}<br>
             &amp; Ibu ${WEDDING_CONFIG.bride.mother}`;
  }

  const bridePhoto = document.querySelector(
    ".person-card:nth-child(3) .person-photo img",
  );

  if (bridePhoto) {
    bridePhoto.src = WEDDING_CONFIG.bride.photo;

    bridePhoto.alt = `Foto ${WEDDING_CONFIG.bride.fullName}`;
  }

  /*
   * Opening / Footer
   */

  const coupleNameElements = document.querySelectorAll(
    ".couple-name, .footer-names",
  );

  coupleNameElements.forEach((element) => {
    element.innerHTML = `${WEDDING_CONFIG.groom.nickname}
            <span class="ampersand">&amp;</span>
            ${WEDDING_CONFIG.bride.nickname}`;
  });
}

/* ============================================================
   03. WEDDING DATE
   ============================================================ */

function loadWeddingDate() {
  /*
   * Opening date
   */

  const openingDate = document.querySelector(".wedding-date");

  if (openingDate) {
    openingDate.textContent = WEDDING_CONFIG.wedding.openingDate;
  }

  /*
   * Countdown heading
   */

  const countdownHeading = document.querySelector(".countdown-section h2");

  if (countdownHeading) {
    countdownHeading.textContent = WEDDING_CONFIG.wedding.displayDate;
  }
}

/* ============================================================
   04. WEDDING EVENTS
   ============================================================ */

function loadWeddingEvents() {
  const eventCards = document.querySelectorAll(".event-card");

  const events = WEDDING_CONFIG.events;

  eventCards.forEach((card, index) => {
    const event = events[index];

    if (!event) {
      return;
    }

    const title = card.querySelector("h3");

    if (title) {
      title.textContent = event.title;
    }

    const date = card.querySelector(".event-date");

    if (date) {
      date.textContent = event.date;
    }

    const time = card.querySelector(".event-time");

    if (time) {
      time.textContent = event.time;
    }

    const venue = card.querySelector(".event-venue");

    if (venue) {
      venue.textContent = event.venue;
    }

    const address = card.querySelector(".event-address");

    if (address) {
      const parts = event.address.split(",");

      address.innerHTML = parts.join("<br>");
    }
  });
}

/* ============================================================
   05. OUR STORY
   ============================================================ */

function loadStory() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const stories = WEDDING_CONFIG.story;

  timelineItems.forEach((item, index) => {
    const story = stories[index];

    if (!story) {
      return;
    }

    const year = item.querySelector(".timeline-year");

    if (year) {
      year.textContent = story.year;
    }

    const title = item.querySelector("h3");

    if (title) {
      title.textContent = story.title;
    }

    const description = item.querySelector("p");

    if (description) {
      description.textContent = story.description;
    }
  });
}

/* ============================================================
   06. GALLERY
   ============================================================ */

function loadGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  const gallery = WEDDING_CONFIG.gallery;

  galleryItems.forEach((item, index) => {
    const photo = gallery[index];

    if (!photo) {
      return;
    }

    const image = item.querySelector("img");

    if (!image) {
      return;
    }

    image.src = photo.src;

    image.alt = photo.alt;
  });
}

/* ============================================================
   07. LOCATION
   ============================================================ */

function loadLocation() {
  const location = WEDDING_CONFIG.location;

  /*
   * Venue
   */

  const venue = document.querySelector(".location-info h3");

  if (venue) {
    venue.textContent = location.venue;
  }

  /*
   * Date
   */

  const date = document.querySelector(".location-date");

  if (date) {
    date.textContent = location.date;
  }

  /*
   * Address
   */

  const address = document.querySelector(".location-address");

  if (address) {
    const parts = location.address.split(",");

    address.innerHTML = parts.join("<br>");
  }

  /*
   * Google Maps
   */

  const mapsLink = getElement("maps-link");

  if (mapsLink) {
    mapsLink.href = location.mapsUrl;
  }
}

/* ============================================================
   08. BANK ACCOUNTS
   ============================================================ */

function loadBankAccounts() {
  const cards = document.querySelectorAll(".bank-card");

  const accounts = WEDDING_CONFIG.bankAccounts;

  cards.forEach((card, index) => {
    const account = accounts[index];

    if (!account) {
      return;
    }

    /*
     * Bank name
     */

    const bankName = card.querySelector(".bank-name");

    if (bankName) {
      bankName.textContent = account.bank;
    }

    /*
     * Account owner
     */

    const owner = card.querySelector(".account-owner");

    if (owner) {
      owner.textContent = account.owner;
    }

    /*
     * Account number
     *
     * Tambahkan spasi setiap 4 digit
     * agar tampil lebih mudah dibaca.
     */

    const formattedNumber = account.number.replace(/(.{4})/g, "$1 ").trim();

    const number = card.querySelector(".account-number");

    if (number) {
      number.textContent = formattedNumber;
    }

    /*
     * Data untuk tombol copy
     */

    const copyButton = card.querySelector(".copy-account");

    if (copyButton) {
      copyButton.dataset.account = account.number;
    }
  });
}

/* ============================================================
   09. COPY BANK ACCOUNT
   ============================================================ */

function initializeCopyAccount() {
  const copyButtons = document.querySelectorAll(".copy-account");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const account = button.dataset.account;

      /*
       * Pastikan nomor rekening tersedia.
       */

      if (!account) {
        console.error("Nomor rekening tidak ditemukan.");

        return;
      }

      /*
       * Simpan teks asli tombol.
       */

      const originalText = button.textContent;

      try {
        /*
         * Salin nomor rekening
         * ke clipboard.
         */

        await navigator.clipboard.writeText(account);

        /*
         * Berikan feedback
         * kepada pengguna.
         */

        button.textContent = "TERSALIN ✓";

        /*
         * Cegah klik berulang
         * selama feedback ditampilkan.
         */

        button.disabled = true;

        /*
         * Kembalikan tombol
         * setelah 2 detik.
         */

        setTimeout(() => {
          button.textContent = originalText;

          button.disabled = false;
        }, 2000);
      } catch (error) {
        console.error("Gagal menyalin nomor rekening:", error);

        button.textContent = "GAGAL MENYALIN";

        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    });
  });
}

/* ============================================================
   10. COUNTDOWN
   ============================================================ */

/**
 * Mengatur lingkaran progres pada satu unit countdown.
 * fraction = 0 sampai 1 (1 = lingkaran penuh).
 */
function setCountdownRing(unit, fraction) {
  const item = document.querySelector(`.countdown-item[data-unit="${unit}"]`);

  if (!item) {
    return;
  }

  const value = Math.min(Math.max(fraction, 0), 1);

  const ring = item.querySelector(".ring-progress");

  const previous = item.style.getPropertyValue("--progress");

  /*
   * Saat nilai "berputar" kembali ke penuh (misalnya detik 00 -> 59),
   * lompat langsung tanpa animasi agar lingkaran tidak menyapu mundur.
   */

  if (ring && previous !== "" && value > Number(previous) + 0.5) {
    ring.style.transition = "none";

    item.style.setProperty("--progress", value);

    void ring.getBoundingClientRect();

    ring.style.transition = "";

    return;
  }

  item.style.setProperty("--progress", value);
}

function startCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.wedding.date).getTime();

  /*
   * Jika tanggal tidak valid,
   * hentikan countdown.
   */

  if (Number.isNaN(targetDate)) {
    console.error("Tanggal pernikahan tidak valid.");

    return;
  }

  function updateCountdown() {
    const now = Date.now();

    const difference = targetDate - now;

    /*
     * Jika hari pernikahan sudah tiba.
     */

    if (difference <= 0) {
      setText("countdown-days", "00");

      setText("countdown-hours", "00");

      setText("countdown-minutes", "00");

      setText("countdown-seconds", "00");

      ["days", "hours", "minutes", "seconds"].forEach((unit) => {
        setCountdownRing(unit, 0);
      });

      return;
    }

    /*
     * Hitung waktu.
     */

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    const seconds = Math.floor((difference / 1000) % 60);

    /*
     * Tampilkan.
     */

    setText("countdown-days", String(days).padStart(2, "0"));

    setText("countdown-hours", String(hours).padStart(2, "0"));

    setText("countdown-minutes", String(minutes).padStart(2, "0"));

    setText("countdown-seconds", String(seconds).padStart(2, "0"));

    /*
     * Lingkaran progres:
     * - hari   : sisa hari dari 365 hari
     * - jam    : sisa jam dari 24 jam
     * - menit  : sisa menit dari 60 menit
     * - detik  : sisa detik dari 60 detik
     */

    setCountdownRing("days", difference / (1000 * 60 * 60 * 24) / 365);

    setCountdownRing("hours", (hours + minutes / 60) / 24);

    setCountdownRing("minutes", (minutes + seconds / 60) / 60);

    setCountdownRing("seconds", seconds / 60);
  }

  /*
   * Jalankan langsung agar tidak
   * menunggu satu detik pertama.
   */

  updateCountdown();

  /*
   * Perbarui setiap detik.
   */

  setInterval(updateCountdown, 1000);
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */

let revealStarted = false;

/**
 * Menyembunyikan elemen ".reveal" lebih dulu.
 * Dipanggil hanya jika JS berjalan normal, sehingga tanpa JS
 * semua konten tetap terlihat.
 */
function prepareReveal() {
  document.documentElement.classList.add("has-reveal");
}

/**
 * Memunculkan elemen ".reveal" satu per satu saat masuk layar.
 * Dipanggil setelah opening dibuka (supaya animasinya terlihat).
 */
function startReveal() {
  if (revealStarted) {
    return;
  }

  revealStarted = true;

  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  items.forEach((item) => observer.observe(item));
}

/* ============================================================
   11. SCROLL LOCK
   ============================================================ */

/**
 * Mengunci / membuka scroll halaman.
 * Class dipasang di <html> dan <body> agar bekerja
 * konsisten di semua browser (termasuk Safari iOS).
 */
function lockScroll(isLocked) {
  document.documentElement.classList.toggle("invitation-locked", isLocked);
  document.body.classList.toggle("invitation-locked", isLocked);

  /*
   * Saat halaman dibuka, mulai animasi muncul pada konten.
   */

  if (!isLocked) {
    startReveal();
  }
}

/* ============================================================
   12. OPENING / INVITATION
   ============================================================ */

/**
 * Mengisi data pada tampilan amplop:
 * - inisial pada segel & monogram (dari nama panggilan di config.js)
 * - nama pada surat di dalam amplop
 * - nama tamu dari link, contoh: index.html?to=Budi+Santoso
 */
function loadOpeningEnvelope() {
  const groomName = (WEDDING_CONFIG.groom.nickname || "").trim();
  const brideName = (WEDDING_CONFIG.bride.nickname || "").trim();

  /*
   * Inisial
   */

  const initials = (groomName.charAt(0) + brideName.charAt(0)).toUpperCase();

  document.querySelectorAll("[data-initials]").forEach((element) => {
    element.textContent = initials;
  });

  /*
   * Nama pada surat
   */

  setText("letter-names", `${groomName} & ${brideName}`);

  /*
   * Nama tamu (textContent = aman dari HTML injection).
   */

  const guest = new URLSearchParams(window.location.search).get("to");

  if (guest && guest.trim()) {
    const guestName = guest.trim().slice(0, 60);

    setText("guest-name", guestName);

    /*
     * Isi otomatis kolom nama pada form RSVP.
     */

    const rsvpName = getElement("rsvp-name");

    if (rsvpName) {
      rsvpName.value = guestName;
    }
  }

  /*
   * Tanggal pada footer.
   */

  document.querySelectorAll(".footer-date").forEach((element) => {
    element.textContent = WEDDING_CONFIG.wedding.openingDate;
  });
}

/**
 * Teks halaman yang ikut config.js:
 * - judul tab browser
 * - teks "With love, ..." pada footer
 *
 * Catatan: tag pratinjau link (og:...) di <head> tidak bisa diubah
 * lewat JS karena WhatsApp tidak menjalankan JavaScript;
 * ubah manual di index.html.
 */
function loadPageText() {
  const wedding = WEDDING_CONFIG.wedding || {};

  const groomName = (WEDDING_CONFIG.groom.nickname || "").trim();
  const brideName = (WEDDING_CONFIG.bride.nickname || "").trim();

  /*
   * Judul tab browser
   */

  const coupleTitle = wedding.title || `${groomName} & ${brideName}`;

  document.title = `${coupleTitle} — Undangan Pernikahan`;

  /*
   * Footer
   */

  document.querySelectorAll(".footer-copyright").forEach((element) => {
    element.textContent = `With love, ${groomName} & ${brideName}`;
  });
}

function initializeOpening() {
  const opening = document.querySelector(".opening-section");
  const openButton = getElement("open-invitation");
  const envelope = getElement("envelope");

  /*
   * Jika elemen tidak ditemukan,
   * hentikan fungsi (halaman tetap bisa di-scroll).
   */

  if (!opening || !openButton) {
    console.warn(
      'Elemen ".opening-section" atau "#open-invitation" tidak ditemukan.',
    );

    startReveal();

    return;
  }

  /*
   * Cegah browser memulihkan posisi scroll lama
   * saat halaman di-refresh, lalu mulai dari atas.
   */

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  /*
   * Kunci scroll selama opening ditampilkan.
   */

  lockScroll(true);

  /*
   * Membuka undangan: amplop terbuka, lalu opening menghilang.
   */

  let isOpening = false;

  function openInvitation() {
    /*
     * Cegah klik berulang (tombol + amplop).
     */

    if (isOpening) {
      return;
    }

    isOpening = true;

    /*
     * Mulai musik langsung di dalam event klik
     * (syarat browser agar audio boleh diputar).
     */

    playWeddingMusic();

    /*
     * Jalankan animasi amplop.
     */

    opening.classList.add("is-opening");

    openButton.disabled = true;

    /*
     * Pengguna dengan "reduce motion" tidak perlu menunggu animasi.
     */

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const envelopeDuration = reduceMotion ? 0 : 1200;

    /*
     * Setelah amplop terbuka, hilangkan opening
     * dan buka kembali scroll halaman.
     */

    setTimeout(() => {
      opening.classList.add("is-hidden");

      lockScroll(false);

      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      /*
       * Setelah animasi memudar selesai, sembunyikan
       * opening dari screen reader.
       */

      setTimeout(() => {
        opening.setAttribute("aria-hidden", "true");
      }, 750);
    }, envelopeDuration);
  }

  openButton.addEventListener("click", openInvitation);

  if (envelope) {
    envelope.addEventListener("click", openInvitation);
  }
}

/* ============================================================
   13. WEDDING MUSIC
   ============================================================ */

let weddingMusic = null;

let musicToggle = null;

/*
 * Inisialisasi musik.
 */

function initializeMusic() {
  weddingMusic = getElement("wedding-music");

  musicToggle = getElement("music-toggle");

  /*
   * Pastikan elemen tersedia.
   */

  if (!weddingMusic || !musicToggle) {
    console.warn('Elemen "#wedding-music" atau "#music-toggle" tidak ditemukan.');

    return;
  }

  /*
   * Gunakan file musik dari config.js
   * (hanya jika nilainya ada).
   */

  const musicFile = WEDDING_CONFIG.wedding && WEDDING_CONFIG.wedding.musicFile;

  if (musicFile) {
    weddingMusic.src = musicFile;
  } else if (
    !weddingMusic.getAttribute("src") &&
    !weddingMusic.querySelector("source")
  ) {
    console.warn("WEDDING_CONFIG.wedding.musicFile belum diisi.");
  }

  weddingMusic.loop = true;

  /*
   * Tombol musik.
   */

  musicToggle.addEventListener("click", toggleWeddingMusic);

  /*
   * Jaga tampilan tombol tetap sinkron dengan status audio
   * (misalnya jika dijeda lewat kontrol bawaan HP/browser).
   */

  weddingMusic.addEventListener("play", () => updateMusicButton(true));

  weddingMusic.addEventListener("pause", () => updateMusicButton(false));

  /*
   * Kondisi awal.
   */

  updateMusicButton(false);
}

/*
 * Memutar musik.
 */

async function playWeddingMusic() {
  if (!weddingMusic) {
    return;
  }

  try {
    await weddingMusic.play();

    updateMusicButton(true);
  } catch (error) {
    console.warn("Musik tidak dapat diputar:", error);

    updateMusicButton(false);
  }
}

/*
 * Pause musik.
 */

function pauseWeddingMusic() {
  if (!weddingMusic) {
    return;
  }

  weddingMusic.pause();

  updateMusicButton(false);
}

/*
 * Toggle Play / Pause.
 */

async function toggleWeddingMusic() {
  if (!weddingMusic) {
    return;
  }

  if (weddingMusic.paused) {
    await playWeddingMusic();
  } else {
    pauseWeddingMusic();
  }
}

/*
 * Update tampilan tombol musik.
 */

function updateMusicButton(isPlaying) {
  if (!musicToggle) {
    return;
  }

  musicToggle.classList.toggle("is-playing", isPlaying);

  musicToggle.textContent = isPlaying ? "♫" : "♪";

  musicToggle.setAttribute("aria-pressed", String(isPlaying));

  musicToggle.setAttribute(
    "aria-label",
    isPlaying ? "Jeda musik" : "Putar musik",
  );
}

/* ============================================================
   RSVP VIA WHATSAPP
   ============================================================ */

/**
 * Templat pesan bawaan (dipakai jika config.js tidak memilikinya).
 */
const DEFAULT_RSVP_TEMPLATES = {
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
};

/**
 * Menyusun pesan dari templat.
 * - {penanda}  diganti dengan nilainya
 * - [[ ... ]]  bagian opsional; dibuang jika ada penanda di dalamnya yang kosong
 */
function buildRsvpMessage(template, values) {
  const withBlocks = template.replace(/\[\[([\s\S]*?)\]\]/g, (match, block) => {
    const keys = block.match(/\{(\w+)\}/g) || [];

    const hasEmpty = keys.some((key) => !values[key.slice(1, -1)]);

    return hasEmpty ? "" : block;
  });

  return withBlocks
    .replace(/\{(\w+)\}/g, (match, key) => (key in values ? values[key] : match))
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Perangkat sentuh (HP / tablet)?
 */
function isMobileDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

/**
 * Membuka WhatsApp.
 * - HP      : langsung pindah di tab yang sama (paling andal; aplikasi
 *             WhatsApp terbuka otomatis, tombol "kembali" membawa ke undangan)
 * - Desktop : tab baru supaya undangan tetap terbuka
 */
function openWhatsapp(url) {
  if (isMobileDevice()) {
    window.location.href = url;

    return;
  }

  const popup = window.open(url, "_blank");

  if (popup) {
    popup.opener = null;
  } else {
    window.location.href = url;
  }
}

function initializeRsvp() {
  const form = getElement("rsvp-form");

  if (!form) {
    return;
  }

  const config = WEDDING_CONFIG.whatsapp || {};

  const guestsField = getElement("rsvp-guests-field");

  const eventsField = getElement("rsvp-events-field");

  const eventsBox = getElement("rsvp-events");

  const wishesBox = getElement("rsvp-wishes");

  const messageInput = getElement("rsvp-message");

  const status = getElement("rsvp-status");

  /*
   * Pilihan acara (dari config.events).
   * Hanya ditampilkan jika ada lebih dari satu acara.
   */

  const events = Array.isArray(WEDDING_CONFIG.events)
    ? WEDDING_CONFIG.events
    : [];

  const hasEvents = Boolean(eventsBox) && events.length > 1;

  if (hasEvents) {
    events.forEach((item) => {
      const label = document.createElement("label");

      label.className = "rsvp-choice rsvp-choice--event";

      const input = document.createElement("input");

      input.type = "checkbox";
      input.name = "events";
      input.value = item.title;
      input.checked = true;

      const box = document.createElement("span");

      const title = document.createElement("strong");

      title.textContent = item.title;

      box.append(title);

      if (item.time) {
        const time = document.createElement("small");

        time.textContent = item.time;

        box.append(time);
      }

      label.append(input, box);

      eventsBox.append(label);
    });
  }

  /*
   * Ucapan cepat (dari config.whatsapp.quickWishes).
   */

  const wishes = Array.isArray(config.quickWishes) ? config.quickWishes : [];

  function clearActiveWish() {
    if (!wishesBox) {
      return;
    }

    wishesBox.querySelectorAll(".rsvp-chip").forEach((chip) => {
      chip.classList.remove("is-active");

      chip.setAttribute("aria-pressed", "false");
    });
  }

  if (wishesBox && messageInput && wishes.length > 0) {
    wishes.forEach((wish) => {
      const chip = document.createElement("button");

      chip.type = "button";
      chip.className = "rsvp-chip";
      chip.textContent = wish;
      chip.setAttribute("aria-pressed", "false");

      chip.addEventListener("click", () => {
        messageInput.value = wish;

        clearActiveWish();

        chip.classList.add("is-active");

        chip.setAttribute("aria-pressed", "true");
      });

      wishesBox.append(chip);
    });

    wishesBox.hidden = false;

    /*
     * Jika tamu mengubah tulisannya sendiri,
     * lepaskan tanda pilihan pada tombol.
     */

    messageInput.addEventListener("input", clearActiveWish);
  }

  /*
   * Jumlah tamu & acara hanya ditampilkan jika hadir.
   */

  function updateAttendFields() {
    const selected = form.querySelector('input[name="attendance"]:checked');

    const isAttending = !selected || selected.value === "hadir";

    if (guestsField) {
      guestsField.hidden = !isAttending;
    }

    if (eventsField) {
      eventsField.hidden = !isAttending || !hasEvents;
    }
  }

  form.querySelectorAll('input[name="attendance"]').forEach((input) => {
    input.addEventListener("change", updateAttendFields);
  });

  updateAttendFields();

  /*
   * Tampilkan pesan di bawah tombol.
   */

  function showStatus(text, isError) {
    if (!status) {
      return;
    }

    status.textContent = text;

    status.classList.toggle("is-error", Boolean(isError));
  }

  /*
   * Kirim: susun pesan lalu langsung buka WhatsApp.
   * (Browser sudah memeriksa kolom wajib sebelum event ini berjalan.)
   */

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const phone = String(config.phone || "").replace(/\D/g, "");

    if (phone.length < 8) {
      showStatus("Nomor WhatsApp belum diatur di config.js.", true);

      return;
    }

    const data = new FormData(form);

    const isAttending = data.get("attendance") === "hadir";

    /*
     * Acara yang dipilih (minimal satu).
     */

    const chosenEvents =
      isAttending && hasEvents ? data.getAll("events").map(String) : [];

    if (isAttending && hasEvents && chosenEvents.length === 0) {
      showStatus("Pilih minimal satu acara yang akan Anda hadiri.", true);

      const firstEvent = form.querySelector('input[name="events"]');

      if (firstEvent) {
        firstEvent.focus();
      }

      return;
    }

    const listFormat =
      typeof Intl !== "undefined" && Intl.ListFormat
        ? new Intl.ListFormat("id", { style: "long", type: "conjunction" })
        : null;

    /*
     * Nilai untuk penanda pada templat.
     * (tanda * _ ~ dibuang dari nama agar tidak merusak huruf tebal WhatsApp)
     */

    const values = {
      mempelai: `${WEDDING_CONFIG.groom.nickname} & ${WEDDING_CONFIG.bride.nickname}`,
      nama: String(data.get("name") || "").replace(/[*_~]/g, "").trim(),
      jumlah: isAttending ? String(data.get("guests") || "1") : "",
      acara: listFormat
        ? listFormat.format(chosenEvents)
        : chosenEvents.join(", "),
      ucapan: String(data.get("message") || "").trim(),
    };

    /*
     * Pilih templat (dari config.js, atau bawaan).
     */

    const templates = config.templates || {};

    const key = isAttending ? "hadir" : "tidak";

    const template = templates[key] || DEFAULT_RSVP_TEMPLATES[key];

    const message = buildRsvpMessage(template, values);

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    /*
     * Cadangan jika WhatsApp tidak terbuka otomatis.
     */

    if (status) {
      status.classList.remove("is-error");

      status.textContent = "Membuka WhatsApp… Jika tidak terbuka, ";

      const link = document.createElement("a");

      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "ketuk di sini";

      status.append(link, ".");
    }

    openWhatsapp(url);
  });
}

/* ============================================================
   14. INITIALIZE
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /*
   * Pastikan config tersedia.
   */

  if (typeof WEDDING_CONFIG === "undefined") {
    console.error("WEDDING_CONFIG tidak ditemukan.");

    return;
  }

  /*
   * Opening & musik dijalankan lebih dulu agar halaman
   * langsung terkunci dan tombolnya aktif, walaupun ada
   * loader lain di bawah yang bermasalah.
   */

  prepareReveal();

  initializeMusic();

  initializeOpening();

  loadOpeningEnvelope();

  loadPageText();

  /*
   * Jalankan semua loader.
   */

  loadCoupleInformation();

  loadWeddingDate();

  loadWeddingEvents();

  loadStory();

  loadGallery();

  loadLocation();

  loadBankAccounts();

  initializeCopyAccount();

  initializeRsvp();

  startCountdown();
});
