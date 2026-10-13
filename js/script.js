/* ============================================================
   WEDDING INVITATION — Main JavaScript
   ============================================================ */

/* ============================================================
   01. HELPER
   ============================================================ */

function getElement(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const element = getElement(id);
  if (element) element.textContent = value;
}

function setHTML(id, value) {
  const element = getElement(id);
  if (element && typeof value === "string") element.innerHTML = value;
}

function setAttribute(id, attribute, value) {
  const element = getElement(id);
  if (element) element.setAttribute(attribute, value);
}

/**
 * Isi src gambar dengan aman.
 * - Kalau src kosong → sembunyikan + tambah class .is-empty
 * - Kalau file tidak ada → onerror otomatis sembunyikan
 */
function setImageSrc(img, src, alt) {
  if (!img) return;

  /* Bersihkan handler onerror sebelumnya */
  img.onerror = null;

  if (!src || typeof src !== "string" || !src.trim()) {
    img.style.display = "none";
    img.alt = "";
    if (img.parentElement) img.parentElement.classList.add("is-empty");
    return;
  }

  img.style.display = "";
  if (img.parentElement) img.parentElement.classList.remove("is-empty");
  img.src = src;
  if (alt) img.alt = alt;

  /* Fallback kalau file-nya tidak ditemukan */
  img.onerror = () => {
    img.style.display = "none";
    img.alt = "";
    if (img.parentElement) img.parentElement.classList.add("is-empty");
  };
}

/* ============================================================
   02. RENDER KONTEN DARI CONFIG
   ============================================================ */

function renderContent() {
  const c = WEDDING_CONFIG.content || {};

  /* OPENING */
  const op = c.opening || {};
  setText("guest-label", op.guestLabel || "Kepada Yth.");
  setText("guest-name", op.guestDefault || "Para Tamu Undangan");
  setText("open-invitation", op.buttonText || "Buka Undangan");
  setText(
    "opening-eyebrow",
    WEDDING_CONFIG.wedding.eyebrow || "The Wedding Of",
  );
  setText("opening-meta-date", WEDDING_CONFIG.wedding.metaDate || "");

  /* INTRO */
  const intro = c.intro || {};
  setText("intro-eyebrow", intro.eyebrow || "");
  setHTML("intro-heading", intro.heading || "");
  setText("intro-text", intro.text || "");
  renderParagraphs("intro-poem", intro.poem);

  /* COUPLE */
  const couple = c.couple || {};
  setText("couple-eyebrow", couple.eyebrow || "");
  setText("couple-heading", couple.heading || "");

  /* COUNTDOWN */
  const cd = c.countdown || {};
  setText("countdown-eyebrow", cd.eyebrow || "");
  setText("countdown-heading", WEDDING_CONFIG.wedding.displayDate || "");
  setText("countdown-note", cd.note || "");

  const units = cd.units || {};
  document.querySelectorAll(".countdown-item").forEach((item) => {
    const unit = item.dataset.unit;
    const label = item.querySelector("small");
    if (label && units[unit]) label.textContent = units[unit];
  });

  /* EVENTS */
  const ev = c.events || {};
  setText("events-eyebrow", ev.eyebrow || "");
  setText("events-heading", ev.heading || "");
  document.querySelectorAll(".event-card .btn-secondary").forEach((btn) => {
    btn.textContent = ev.buttonText || "Lihat Lokasi";
  });

  /* STORY */
  const story = c.story || {};
  setText("story-eyebrow", story.eyebrow || "");
  setText("story-heading", story.heading || "");

  /* GALLERY */
  const gal = c.gallery || {};
  setText("gallery-eyebrow", gal.eyebrow || "");
  setText("gallery-heading", gal.heading || "");
  renderParagraphs("gallery-quote", gal.quote);

  /* LOCATION */
  const loc = c.location || {};
  setText("location-eyebrow", loc.eyebrow || "");
  setText("location-heading", loc.heading || "");
  setText("maps-link", loc.buttonText || "Buka Google Maps");

  /* RSVP */
  const rsvp = c.rsvp || {};
  setText("rsvp-eyebrow", rsvp.eyebrow || "");
  setHTML("rsvp-heading", rsvp.heading || "");
  setText("rsvp-text", rsvp.text || "");

  setText("rsvp-name-label", rsvp.nameLabel || "Nama");
  setAttribute("rsvp-name", "placeholder", rsvp.namePlaceholder || "");

  setText("rsvp-attendance-legend", rsvp.attendanceLegend || "Kehadiran");
  setText("rsvp-choice-hadir", rsvp.attendanceHadir || "Hadir");
  setText("rsvp-choice-tidak", rsvp.attendanceTidak || "Tidak Hadir");

  setText("rsvp-guests-label", rsvp.guestsLabel || "Jumlah tamu");
  renderOptions("rsvp-guests", rsvp.guestsOptions, "orang");

  setText(
    "rsvp-events-legend",
    rsvp.eventsLegend || "Acara yang akan dihadiri",
  );
  setText("rsvp-message-label", rsvp.messageLabel || "Ucapan & doa (opsional)");
  setAttribute("rsvp-message", "placeholder", rsvp.messagePlaceholder || "");
  setText("rsvp-wishes-label", rsvp.quickWishesLabel || "Atau pilih cepat:");
  setText("rsvp-hint", rsvp.hint || "");
  setText("rsvp-submit-text", rsvp.submitText || "Kirim via WhatsApp");

  /* GIFT */
  const gift = c.gift || {};
  setText("gift-eyebrow", gift.eyebrow || "");
  setHTML("gift-heading", gift.heading || "");
  setText("gift-text", gift.text || "");
  setText("gift-owner-label", gift.ownerLabel || "Atas nama");

  document.querySelectorAll(".copy-account").forEach((btn) => {
    btn.textContent = gift.copyButtonText || "SALIN NOMOR";
  });

  /* FOOTER */
  const footer = c.footer || {};
  setText("footer-thank-you", footer.thankYou || "");
  setText("footer-back-to-top", footer.backToTop || "Kembali ke atas");
}

function renderParagraphs(containerId, items) {
  const container = getElement(containerId);
  if (!container || !Array.isArray(items)) return;

  container.innerHTML = "";
  items.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    container.append(p);
  });
}

function renderOptions(selectId, items, fallbackSuffix) {
  const select = getElement(selectId);
  if (!select || !Array.isArray(items) || items.length === 0) return;

  select.innerHTML = "";
  items.forEach((label, index) => {
    const opt = document.createElement("option");
    opt.value = String(index + 1);
    opt.textContent =
      typeof label === "string" && label.trim()
        ? label
        : `${index + 1} ${fallbackSuffix}`;
    select.append(opt);
  });
}

/* ============================================================
   03. COUPLE
   ============================================================ */

function loadCoupleInformation() {
  const groom = WEDDING_CONFIG.groom;
  const bride = WEDDING_CONFIG.bride;

  setText("groom-name", groom.nickname);
  const groomCard = document.querySelector(".person-card--groom");
  if (groomCard) {
    const fullName = groomCard.querySelector(".person-full-name");
    if (fullName) fullName.textContent = groom.fullName;

    const parents = groomCard.querySelector(".parents");
    if (parents) {
      const prefix = groom.parentsPrefix || "Putra dari";
      parents.innerHTML = `${prefix} Bapak ${groom.father}<br>&amp; Ibu ${groom.mother}`;
    }

    const photo = groomCard.querySelector(".person-photo img");
    setImageSrc(photo, groom.photo, `Foto ${groom.fullName}`);
  }

  setText("bride-name", bride.nickname);
  const brideCard = document.querySelector(".person-card--bride");
  if (brideCard) {
    const fullName = brideCard.querySelector(".person-full-name");
    if (fullName) fullName.textContent = bride.fullName;

    const parents = brideCard.querySelector(".parents");
    if (parents) {
      const prefix = bride.parentsPrefix || "Putri dari";
      parents.innerHTML = `${prefix} Bapak ${bride.father}<br>&amp; Ibu ${bride.mother}`;
    }

    const photo = brideCard.querySelector(".person-photo img");
    setImageSrc(photo, bride.photo, `Foto ${bride.fullName}`);
  }

  const coupleNameElements = document.querySelectorAll(
    ".couple-name, .footer-names",
  );
  coupleNameElements.forEach((element) => {
    element.innerHTML = `${groom.nickname}
      <span class="ampersand">&amp;</span>
      ${bride.nickname}`;
  });
}

/* ============================================================
   04. WEDDING DATE
   ============================================================ */

function loadWeddingDate() {
  const openingDate = document.querySelector(".wedding-date");
  if (openingDate) {
    openingDate.textContent = WEDDING_CONFIG.wedding.openingDate;
  }
}

/* ============================================================
   05. EVENTS
   ============================================================ */

function loadWeddingEvents() {
  const eventCards = document.querySelectorAll(".event-card");
  const events = WEDDING_CONFIG.events;

  eventCards.forEach((card, index) => {
    const event = events[index];
    if (!event) return;

    const title = card.querySelector("h3");
    if (title) title.textContent = event.title;

    const date = card.querySelector(".event-date");
    if (date) date.textContent = event.date;

    const time = card.querySelector(".event-time");
    if (time) time.textContent = event.time;

    const venue = card.querySelector(".event-venue");
    if (venue) venue.textContent = event.venue;

    const address = card.querySelector(".event-address");
    if (address) {
      const parts = event.address.split(",");
      address.innerHTML = parts.join("<br>");
    }
  });
}

/* ============================================================
   06. STORY
   ============================================================ */

function loadStory() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const stories = WEDDING_CONFIG.story;

  timelineItems.forEach((item, index) => {
    const story = stories[index];
    if (!story) return;

    const year = item.querySelector(".timeline-year");
    if (year) year.textContent = story.year;

    const title = item.querySelector("h3");
    if (title) title.textContent = story.title;

    const description = item.querySelector("p");
    if (description) description.textContent = story.description;
  });
}

/* ============================================================
   07. GALLERY + LAZY LOADING + MASONRY
   ============================================================ */

function loadGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const gallery = WEDDING_CONFIG.gallery;

  galleryItems.forEach((item, index) => {
    const photo = gallery[index];
    if (!photo) return;

    const image = item.querySelector("img");
    if (image) {
      /* Lazy loading */
      image.loading = "lazy";
      image.decoding = "async";

      setImageSrc(image, photo.src, photo.alt);

      /* Simpan index untuk lightbox */
      item.dataset.index = index;
    }
  });
}

/* ============================================================
   08. LOCATION + ROUTE
   ============================================================ */

function loadLocation() {
  const location = WEDDING_CONFIG.location;

  const venue = document.querySelector(".location-info h3");
  if (venue) venue.textContent = location.venue;

  const date = document.querySelector(".location-date");
  if (date) date.textContent = location.date;

  const address = document.querySelector(".location-address");
  if (address) {
    const parts = location.address.split(",");
    address.innerHTML = parts.join("<br>");
  }

  const mapsLink = getElement("maps-link");
  if (mapsLink) mapsLink.href = location.mapsUrl;

  /* Tombol Petunjuk Arah */
  const routeButton = getElement("route-link");
  if (routeButton && location.coordinates) {
    routeButton.href = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates}`;
    routeButton.hidden = false;
  } else if (routeButton) {
    routeButton.hidden = true;
  }

  /* iframe Google Maps */
  const iframe = getElement("maps-iframe");
  const placeholder = getElement("maps-placeholder");

  if (iframe && location.mapsEmbed && location.mapsEmbed.trim()) {
    iframe.src = location.mapsEmbed;
    iframe.hidden = false;
    if (placeholder) placeholder.hidden = true;
  } else {
    if (iframe) iframe.hidden = true;
    if (placeholder) placeholder.hidden = false;
  }
}

/* ============================================================
   09. BANK ACCOUNTS
   ============================================================ */

function loadBankAccounts() {
  const cards = document.querySelectorAll(".bank-card");
  const accounts = WEDDING_CONFIG.bankAccounts;

  cards.forEach((card, index) => {
    const account = accounts[index];
    if (!account) return;

    const bankName = card.querySelector(".bank-name");
    if (bankName) bankName.textContent = account.bank;

    const owner = card.querySelector(".account-owner");
    if (owner) owner.textContent = account.owner;

    const formattedNumber = account.number.replace(/(.{4})/g, "$1 ").trim();

    const number = card.querySelector(".account-number");
    if (number) number.textContent = formattedNumber;

    const copyButton = card.querySelector(".copy-account");
    if (copyButton) copyButton.dataset.account = account.number;
  });
}

/* ============================================================
   10. COPY BANK ACCOUNT
   ============================================================ */

function initializeCopyAccount() {
  document.querySelectorAll(".copy-account").forEach((button) => {
    button.addEventListener("click", async () => {
      const account = button.dataset.account;
      if (!account) return;

      const originalText = button.textContent;

      try {
        await navigator.clipboard.writeText(account);
        button.textContent = "TERSALIN ✓";
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 2000);
      } catch (error) {
        console.error("Gagal menyalin:", error);
        button.textContent = "GAGAL MENYALIN";
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    });
  });
}

/* ============================================================
   11. LIGHTBOX + PREV/NEXT + KEYBOARD + SWIPE
   ============================================================ */

function initializeLightbox() {
  const lightbox = getElement("lightbox");
  const lightboxImage = getElement("lightbox-image");
  const closeButton = getElement("lightbox-close");
  const prevButton = getElement("lightbox-prev");
  const nextButton = getElement("lightbox-next");
  const counter = getElement("lightbox-counter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!lightbox || !lightboxImage || !closeButton) return;
  if (galleryItems.length === 0) return;

  const images = Array.from(galleryItems)
    .map((item) => {
      const img = item.querySelector("img");
      return { src: img ? img.src : "", alt: img ? img.alt : "" };
    })
    .filter((p) => p.src);

  let currentIndex = 0;
  let lastFocused = null;

  function showImage(index) {
    if (images.length === 0) return;
    currentIndex = (index + images.length) % images.length;
    const photo = images[currentIndex];
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt || "";

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  }

  function openLightbox(index) {
    lastFocused = document.activeElement;
    showImage(index);
    lightbox.classList.add("is-active");
    lightbox.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("lightbox-open");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("lightbox-open");
    document.body.classList.remove("lightbox-open");

    setTimeout(() => {
      if (!lightbox.classList.contains("is-active")) {
        lightboxImage.src = "";
        lightboxImage.alt = "";
      }
    }, 300);

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function prevImage() {
    showImage(currentIndex - 1);
  }

  function nextImage() {
    showImage(currentIndex + 1);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      /* Kalau src foto kosong, jangan buka */
      const img = item.querySelector("img");
      if (!img || !img.src) return;
      const validIndex = images.findIndex((p) => p.src === img.src);
      openLightbox(validIndex >= 0 ? validIndex : index);
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  if (prevButton) prevButton.addEventListener("click", prevImage);
  if (nextButton) nextButton.addEventListener("click", nextImage);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  /* Keyboard navigation */
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") prevImage();
    if (event.key === "ArrowRight") nextImage();
  });

  /* Swipe gesture (HP) */
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    const threshold = 50;
    if (Math.abs(diff) < threshold) return;
    if (diff > 0) prevImage();
    else nextImage();
  }
}

/* ============================================================
   12. COUNTDOWN + HARI-H + CONFETTI
   ============================================================ */

function setCountdownRing(unit, fraction) {
  const item = document.querySelector(`.countdown-item[data-unit="${unit}"]`);
  if (!item) return;

  const value = Math.min(Math.max(fraction, 0), 1);
  const ring = item.querySelector(".ring-progress");
  const previous = item.style.getPropertyValue("--progress");

  if (ring && previous !== "" && value > Number(previous) + 0.5) {
    ring.style.transition = "none";
    item.style.setProperty("--progress", value);
    void ring.getBoundingClientRect();
    ring.style.transition = "";
    return;
  }

  item.style.setProperty("--progress", value);
}

/**
 * Tampilkan confetti di section countdown.
 */
function fireConfetti() {
  const container = document.querySelector(".countdown-section");
  if (!container) return;

  const colors = ["#a58b70", "#806a53", "#f8f5f0", "#ded5ca", "#7d3d33"];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("span");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + "s";
    confetti.style.animationDuration = 3 + Math.random() * 2 + "s";
    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 6000);
  }
}

function startCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.wedding.date).getTime();
  if (Number.isNaN(targetDate)) return;

  const cd = WEDDING_CONFIG.content.countdown || {};
  const countdownWrapper = document.querySelector(".countdown");
  const noteEl = document.querySelector(".countdown-note");
  const headingEl = document.querySelector(".countdown-section h2");
  let confettiFired = false;

  function updateCountdown() {
    const now = Date.now();
    const difference = targetDate - now;

    /* Sudah lewat atau pas hari-H */
    if (difference <= 0) {
      /* Sembunyikan angka countdown, tampilkan teks khusus */
      if (countdownWrapper) countdownWrapper.hidden = true;

      /* Hitung selisih hari dari tanggal target */
      const daysSince = Math.floor(-difference / (1000 * 60 * 60 * 24));

      if (daysSince === 0) {
        /* Hari-H! */
        if (headingEl)
          headingEl.textContent =
            cd.arrivalTitle || "Hari Ini Hari Bahagia Kami!";
        if (noteEl) noteEl.textContent = cd.arrivalText || "";

        /* Confetti sekali saja */
        if (!confettiFired) {
          confettiFired = true;
          fireConfetti();
        }
      } else {
        /* Setelah hari-H */
        if (headingEl) headingEl.textContent = cd.afterTitle || "Terima Kasih";
        if (noteEl) noteEl.textContent = cd.afterText || "";
      }
      return;
    }

    /* Masih menghitung */
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setText("countdown-days", String(days).padStart(2, "0"));
    setText("countdown-hours", String(hours).padStart(2, "0"));
    setText("countdown-minutes", String(minutes).padStart(2, "0"));
    setText("countdown-seconds", String(seconds).padStart(2, "0"));

    setCountdownRing("days", difference / (1000 * 60 * 60 * 24) / 365);
    setCountdownRing("hours", (hours + minutes / 60) / 24);
    setCountdownRing("minutes", (minutes + seconds / 60) / 60);
    setCountdownRing("seconds", seconds / 60);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ============================================================
   13. SCROLL REVEAL + PARALLAX
   ============================================================ */

let revealStarted = false;

function prepareReveal() {
  document.documentElement.classList.add("has-reveal");
}

function startReveal() {
  if (revealStarted) return;
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

/**
 * Parallax halus untuk foto mempelai & foto cover.
 * Menggunakan requestAnimationFrame agar tidak lag.
 */
function initializeParallax() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotion) return;

  const targets = document.querySelectorAll(
    ".person-photo img, .opening-section.has-photo",
  );
  if (targets.length === 0) return;

  let ticking = false;

  function update() {
    const viewportH = window.innerHeight;

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      /* Hanya proses elemen yang terlihat */
      if (rect.bottom < 0 || rect.top > viewportH) return;

      /* Hitung seberapa jauh elemen di viewport (-1 sampai 1) */
      const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;

      /* Geser sedikit (maks 20px) */
      const offset = progress * 20;

      /* Skip elemen opening (sudah pakai transform scale) */
      if (!el.classList.contains("opening-section")) {
        el.style.transform = `translateY(${offset}px) scale(1.05)`;
      }
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}

/* ============================================================
   14. SCROLL LOCK
   ============================================================ */

function lockScroll(isLocked) {
  document.documentElement.classList.toggle("invitation-locked", isLocked);
  document.body.classList.toggle("invitation-locked", isLocked);
  if (!isLocked) startReveal();
}

/* ============================================================
   15. OPENING + COVER BACKGROUND
   ============================================================ */

function loadOpeningEnvelope() {
  const groomName = (WEDDING_CONFIG.groom.nickname || "").trim();
  const brideName = (WEDDING_CONFIG.bride.nickname || "").trim();
  const initials = (groomName.charAt(0) + brideName.charAt(0)).toUpperCase();

  document.querySelectorAll("[data-initials]").forEach((element) => {
    element.textContent = initials;
  });

  setText("letter-names", `${groomName} & ${brideName}`);

  const guest = new URLSearchParams(window.location.search).get("to");
  if (guest && guest.trim()) {
    const guestName = guest.trim().slice(0, 60);
    setText("guest-name", guestName);
    const rsvpName = getElement("rsvp-name");
    if (rsvpName) rsvpName.value = guestName;
  }

  document.querySelectorAll(".footer-date").forEach((element) => {
    element.textContent = WEDDING_CONFIG.wedding.openingDate;
  });

  /* Cover photo — kalau ada, tambahkan class has-photo */
  const opening = document.querySelector(".opening-section");
  const coverPhoto = WEDDING_CONFIG.wedding.coverPhoto;
  if (opening && coverPhoto && coverPhoto.trim()) {
    /* Preload dulu; baru pasang class kalau berhasil dimuat */
    const test = new Image();
    test.onload = () => {
      opening.classList.add("has-photo");
      opening.style.setProperty("--cover-url", `url("${coverPhoto}")`);
    };
    test.onerror = () => {
      /* Foto cover gagal → biarkan warna solid */
      opening.classList.remove("has-photo");
    };
    test.src = coverPhoto;
  }
}

function loadPageText() {
  const wedding = WEDDING_CONFIG.wedding || {};
  const groomName = (WEDDING_CONFIG.groom.nickname || "").trim();
  const brideName = (WEDDING_CONFIG.bride.nickname || "").trim();
  const coupleTitle = wedding.title || `${groomName} & ${brideName}`;
  document.title = `${coupleTitle} — Undangan Pernikahan`;

  document.querySelectorAll(".footer-copyright").forEach((element) => {
    element.textContent = `With love, ${groomName} & ${brideName}`;
  });
}

function initializeOpening() {
  const opening = document.querySelector(".opening-section");
  const openButton = getElement("open-invitation");
  const envelope = getElement("envelope");

  if (!opening || !openButton) {
    startReveal();
    return;
  }

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  lockScroll(true);

  let isOpening = false;

  function openInvitation() {
    if (isOpening) return;
    isOpening = true;

    playWeddingMusic();
    opening.classList.add("is-opening");
    openButton.disabled = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const envelopeDuration = reduceMotion ? 0 : 1200;

    setTimeout(() => {
      opening.classList.add("is-hidden");
      lockScroll(false);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      setTimeout(() => {
        opening.setAttribute("aria-hidden", "true");
      }, 750);
    }, envelopeDuration);
  }

  openButton.addEventListener("click", openInvitation);
  if (envelope) envelope.addEventListener("click", openInvitation);
}

/* ============================================================
   16. MUSIC + FADE IN/OUT
   ============================================================ */

let weddingMusic = null;
let musicToggle = null;
let fadeTimer = null;

function initializeMusic() {
  weddingMusic = getElement("wedding-music");
  musicToggle = getElement("music-toggle");

  if (!weddingMusic || !musicToggle) return;

  const musicFile = WEDDING_CONFIG.wedding && WEDDING_CONFIG.wedding.musicFile;
  if (musicFile) weddingMusic.src = musicFile;

  weddingMusic.loop = true;

  musicToggle.addEventListener("click", toggleWeddingMusic);

  weddingMusic.addEventListener("play", () => updateMusicButton(true));
  weddingMusic.addEventListener("pause", () => updateMusicButton(false));

  updateMusicButton(false);
}

/**
 * Fade in audio pelan-pelan sampai target volume.
 */
function fadeIn(audio, duration = 2000) {
  clearInterval(fadeTimer);
  audio.volume = 0;

  const steps = 40;
  const stepTime = duration / steps;
  const stepVol = 1 / steps;

  fadeTimer = setInterval(() => {
    if (audio.volume + stepVol >= 1) {
      audio.volume = 1;
      clearInterval(fadeTimer);
    } else {
      audio.volume = Math.min(1, audio.volume + stepVol);
    }
  }, stepTime);
}

/**
 * Fade out audio pelan-pelan, lalu pause.
 */
function fadeOut(audio, duration = 1500, onDone) {
  clearInterval(fadeTimer);

  const startVol = audio.volume || 1;
  const steps = 30;
  const stepTime = duration / steps;
  const stepVol = startVol / steps;

  fadeTimer = setInterval(() => {
    if (audio.volume - stepVol <= 0) {
      audio.volume = 0;
      clearInterval(fadeTimer);
      audio.pause();
      audio.volume = 1;
      if (typeof onDone === "function") onDone();
    } else {
      audio.volume = Math.max(0, audio.volume - stepVol);
    }
  }, stepTime);
}

async function playWeddingMusic() {
  if (!weddingMusic) return;
  try {
    await weddingMusic.play();
    fadeIn(weddingMusic, 2500);
    updateMusicButton(true);
  } catch (error) {
    console.warn("Musik tidak dapat diputar:", error);
    updateMusicButton(false);
  }
}

function pauseWeddingMusic() {
  if (!weddingMusic) return;
  fadeOut(weddingMusic, 1500, () => updateMusicButton(false));
}

async function toggleWeddingMusic() {
  if (!weddingMusic) return;
  if (weddingMusic.paused) {
    await playWeddingMusic();
  } else {
    pauseWeddingMusic();
  }
}

function updateMusicButton(isPlaying) {
  if (!musicToggle) return;
  musicToggle.classList.toggle("is-playing", isPlaying);
  musicToggle.textContent = isPlaying ? "♫" : "♪";
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute(
    "aria-label",
    isPlaying ? "Jeda musik" : "Putar musik",
  );
}

/* ============================================================
   17. RSVP
   ============================================================ */

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

function buildRsvpMessage(template, values) {
  const withBlocks = template.replace(/\[\[([\s\S]*?)\]\]/g, (match, block) => {
    const keys = block.match(/\{(\w+)\}/g) || [];
    const hasEmpty = keys.some((key) => !values[key.slice(1, -1)]);
    return hasEmpty ? "" : block;
  });

  return withBlocks
    .replace(/\{(\w+)\}/g, (match, key) =>
      key in values ? values[key] : match,
    )
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isMobileDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

function openWhatsapp(url) {
  if (isMobileDevice()) {
    window.location.href = url;
    return;
  }
  const popup = window.open(url, "_blank");
  if (popup) popup.opener = null;
  else window.location.href = url;
}

function initializeRsvp() {
  const form = getElement("rsvp-form");
  if (!form) return;

  const config = WEDDING_CONFIG.whatsapp || {};
  const rsvpContent =
    (WEDDING_CONFIG.content && WEDDING_CONFIG.content.rsvp) || {};

  const guestsField = getElement("rsvp-guests-field");
  const eventsField = getElement("rsvp-events-field");
  const eventsBox = getElement("rsvp-events");
  const wishesBox = getElement("rsvp-wishes");
  const messageInput = getElement("rsvp-message");
  const status = getElement("rsvp-status");

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

  const wishes = Array.isArray(config.quickWishes) ? config.quickWishes : [];

  function clearActiveWish() {
    if (!wishesBox) return;
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
    messageInput.addEventListener("input", clearActiveWish);
  }

  function updateAttendFields() {
    const selected = form.querySelector('input[name="attendance"]:checked');
    const isAttending = !selected || selected.value === "hadir";
    if (guestsField) guestsField.hidden = !isAttending;
    if (eventsField) eventsField.hidden = !isAttending || !hasEvents;
  }

  form.querySelectorAll('input[name="attendance"]').forEach((input) => {
    input.addEventListener("change", updateAttendFields);
  });

  updateAttendFields();

  function showStatus(text, isError) {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle("is-error", Boolean(isError));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const phone = String(config.phone || "").replace(/\D/g, "");
    if (phone.length < 8) {
      showStatus("Nomor WhatsApp belum diatur di config.js.", true);
      return;
    }

    const data = new FormData(form);
    const isAttending = data.get("attendance") === "hadir";

    const chosenEvents =
      isAttending && hasEvents ? data.getAll("events").map(String) : [];

    if (isAttending && hasEvents && chosenEvents.length === 0) {
      showStatus("Pilih minimal satu acara yang akan Anda hadiri.", true);
      const firstEvent = form.querySelector('input[name="events"]');
      if (firstEvent) firstEvent.focus();
      return;
    }

    const listFormat =
      typeof Intl !== "undefined" && Intl.ListFormat
        ? new Intl.ListFormat("id", { style: "long", type: "conjunction" })
        : null;

    const values = {
      mempelai: `${WEDDING_CONFIG.groom.nickname} & ${WEDDING_CONFIG.bride.nickname}`,
      nama: String(data.get("name") || "")
        .replace(/[*_~]/g, "")
        .trim(),
      jumlah: isAttending ? String(data.get("guests") || "1") : "",
      acara: listFormat
        ? listFormat.format(chosenEvents)
        : chosenEvents.join(", "),
      ucapan: String(data.get("message") || "").trim(),
    };

    const templates = config.templates || {};
    const key = isAttending ? "hadir" : "tidak";
    const template = templates[key] || DEFAULT_RSVP_TEMPLATES[key];

    const message = buildRsvpMessage(template, values);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    if (status) {
      status.classList.remove("is-error");
      status.textContent =
        rsvpContent.successNote || "Membuka WhatsApp… Jika tidak terbuka, ";
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = rsvpContent.successLinkText || "ketuk di sini";
      status.append(link, ".");
    }

    openWhatsapp(url);
  });
}

/* ============================================================
   18. INITIALIZE
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof WEDDING_CONFIG === "undefined") {
    console.error("WEDDING_CONFIG tidak ditemukan.");
    return;
  }

  renderContent();
  prepareReveal();
  initializeMusic();
  initializeOpening();
  loadOpeningEnvelope();
  loadPageText();

  loadCoupleInformation();
  loadWeddingDate();
  loadWeddingEvents();
  loadStory();
  loadGallery();
  loadLocation();
  loadBankAccounts();
  initializeCopyAccount();
  initializeRsvp();
  initializeLightbox();
  initializeParallax();

  startCountdown();
});
