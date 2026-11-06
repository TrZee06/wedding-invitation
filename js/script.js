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

function setImageSrc(img, src, alt) {
  if (!img) return;
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

  img.onerror = () => {
    img.style.display = "none";
    img.alt = "";
    if (img.parentElement) img.parentElement.classList.add("is-empty");
  };
}

function formatWeddingDate(style) {
  const date = new Date(WEDDING_CONFIG.wedding.date);
  if (Number.isNaN(date.getTime())) return "";
  const opts = {
    long: { weekday: "long", day: "numeric", month: "long", year: "numeric" },
    short: { day: "numeric", month: "long", year: "numeric" },
    upper: { day: "2-digit", month: "long", year: "numeric" },
  };
  const fmt = new Intl.DateTimeFormat("id-ID", opts[style] || opts.long).format(
    date,
  );
  return style === "upper" ? fmt.toUpperCase() : fmt;
}

function isIosSafari() {
  return (
    /iP(hone|ad|od)/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
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
  setText("opening-meta-date", formatWeddingDate("upper"));

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
  setText("countdown-heading", formatWeddingDate("long"));
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

  function formatParents(person) {
    const fmt = person.parentsFormat || "Ama {father} & Ina {mother}";
    return fmt
      .replace("{father}", person.father)
      .replace("{mother}", person.mother);
  }

  setText("groom-name", groom.nickname);
  const groomCard = document.querySelector(".person-card--groom");
  if (groomCard) {
    const fullName = groomCard.querySelector(".person-full-name");
    if (fullName) fullName.textContent = groom.fullName;
    const parents = groomCard.querySelector(".parents");
    if (parents) {
      const prefix = groom.parentsPrefix || "Putra dari";
      parents.innerHTML = `${prefix} ${formatParents(groom)}`;
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
      parents.innerHTML = `${prefix} ${formatParents(bride)}`;
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
  if (openingDate) openingDate.textContent = formatWeddingDate("upper");
}

/* ============================================================
   05. EVENTS
   ============================================================ */

function loadWeddingEvents() {
  const grid = getElement("events-grid");
  if (!grid) return;
  const events = Array.isArray(WEDDING_CONFIG.events)
    ? WEDDING_CONFIG.events
    : [];
  grid.innerHTML = "";

  events.forEach((event, index) => {
    const card = document.createElement("article");
    card.className = "event-card reveal";
    card.style.setProperty("--delay", String(3 + index));

    const icon = document.createElement("div");
    icon.className = "event-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("h3");
    title.textContent = event.title || "";

    const date = document.createElement("p");
    date.className = "event-date";
    date.textContent = event.date || "";

    const time = document.createElement("p");
    time.className = "event-time";
    time.textContent = event.time || "";

    const venue = document.createElement("p");
    venue.className = "event-venue";
    venue.textContent = event.venue || "";

    const address = document.createElement("p");
    address.className = "event-address";
    if (event.address) {
      const parts = event.address
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const lines =
        parts.length > 3
          ? [parts[0], parts[1], parts.slice(2).join(", ")]
          : parts;
      address.innerHTML = lines.join("<br>");
    }

    const btn = document.createElement("a");
    btn.className = "btn btn-secondary event-map-link";
    btn.textContent = event.buttonText || "Lihat Lokasi";
    if (event.mapsUrl) {
      btn.href = event.mapsUrl;
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
    } else if (event.scrollTarget) {
      btn.href = event.scrollTarget;
    } else {
      btn.href = "#location";
    }

    card.append(icon, title, date, time, venue, address, btn);
    grid.append(card);
  });
}

/* ============================================================
   06. GALLERY
   ============================================================ */

function loadGallery() {
  const grid = getElement("gallery-grid");
  if (!grid) return;
  const gallery = Array.isArray(WEDDING_CONFIG.gallery)
    ? WEDDING_CONFIG.gallery
    : [];
  grid.innerHTML = "";

  gallery.forEach((photo, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "gallery-item reveal";
    item.style.setProperty("--delay", String(index % 3));
    item.dataset.index = String(index);

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = photo.alt || "";
    setImageSrc(img, photo.src, photo.alt);

    item.append(img);
    grid.append(item);
  });
}

/* ============================================================
   07. TURUT MENGUNDANG
   ============================================================ */

function loadFamilyList() {
  const familyConfig = WEDDING_CONFIG.familyList;
  const familyContent = WEDDING_CONFIG.content.family || {};

  if (!familyConfig) return;

  setText("family-eyebrow", familyContent.eyebrow || "TURUT MENGUNDANG");
  setText("family-heading", familyContent.heading || "Keluarga Besar");
  setText("family-groom-title", familyContent.groomTitle || "Mempelai Pria");
  setText("family-bride-title", familyContent.brideTitle || "Mempelai Wanita");

  const groomList = getElement("family-groom-list");
  if (groomList && familyConfig.groomSide) {
    groomList.innerHTML = "";
    familyConfig.groomSide.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      groomList.appendChild(li);
    });
  }

  const brideList = getElement("family-bride-list");
  if (brideList && familyConfig.brideSide) {
    brideList.innerHTML = "";
    familyConfig.brideSide.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      brideList.appendChild(li);
    });
  }
}

/* ============================================================
   08. LOCATION
   ============================================================ */

function loadLocation() {
  const location = WEDDING_CONFIG.location;

  const venue = document.querySelector(".location-info h3");
  if (venue) venue.textContent = location.venue;
  const date = document.querySelector(".location-date");
  if (date) date.textContent = location.date;
  const address = document.querySelector(".location-address");
  if (address) {
    const parts = location.address
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const lines =
      parts.length > 3
        ? [parts[0], parts[1], parts.slice(2).join(", ")]
        : parts;
    address.innerHTML = lines.join("<br>");
  }

  const mapsLink = getElement("maps-link");
  if (mapsLink) mapsLink.href = location.mapsUrl;

  const routeButton = getElement("route-link");
  if (routeButton && location.coordinates) {
    routeButton.href = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates}`;
    routeButton.hidden = false;
  } else if (routeButton) {
    routeButton.hidden = true;
  }

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
  const grid = getElement("bank-grid");
  if (!grid) return;
  const accounts = Array.isArray(WEDDING_CONFIG.bankAccounts)
    ? WEDDING_CONFIG.bankAccounts
    : [];
  const giftContent = WEDDING_CONFIG.content.gift || {};
  const ownerLabel = giftContent.ownerLabel || "Atas nama";
  const copyText = giftContent.copyButtonText || "SALIN NOMOR";
  grid.innerHTML = "";

  accounts.forEach((account, index) => {
    const card = document.createElement("article");
    card.className = "bank-card reveal";
    card.style.setProperty("--delay", String(3 + index));

    const top = document.createElement("div");
    top.className = "bank-card-top";
    const chip = document.createElement("span");
    chip.className = "bank-chip";
    chip.setAttribute("aria-hidden", "true");
    const bankName = document.createElement("div");
    bankName.className = "bank-name";
    bankName.textContent = account.bank || "";
    top.append(chip, bankName);

    const number = document.createElement("p");
    number.className = "account-number";
    number.textContent = String(account.number || "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    const foot = document.createElement("div");
    foot.className = "bank-card-foot";

    const owner = document.createElement("div");
    owner.className = "bank-owner";
    const ownerLabelEl = document.createElement("span");
    ownerLabelEl.className = "bank-owner-label";
    ownerLabelEl.textContent = ownerLabel;
    const ownerName = document.createElement("p");
    ownerName.className = "account-owner";
    ownerName.textContent = account.owner || "";
    owner.append(ownerLabelEl, ownerName);

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "copy-account";
    copyBtn.textContent = copyText;
    copyBtn.dataset.account = String(account.number || "");

    foot.append(owner, copyBtn);
    card.append(top, number, foot);
    grid.append(card);
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
   11. LIGHTBOX
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
    if (counter) counter.textContent = `${currentIndex + 1} / ${images.length}`;
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

    if (lastFocused && typeof lastFocused.focus === "function")
      lastFocused.focus();
  }

  function prevImage() {
    showImage(currentIndex - 1);
  }
  function nextImage() {
    showImage(currentIndex + 1);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
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

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-active")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") prevImage();
    if (event.key === "ArrowRight") nextImage();
  });

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
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) prevImage();
        else nextImage();
      }
    },
    { passive: true },
  );
}

/* ============================================================
   12. COUNTDOWN
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

function fireConfetti() {
  const container = document.querySelector(".countdown-section");
  if (!container) return;

  const colors = ["#a58b70", "#806a53", "#f8f5f0", "#ded5ca", "#7d3d33"];
  for (let i = 0; i < 60; i++) {
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
  const eventTime = new Date(WEDDING_CONFIG.wedding.date).getTime();
  const startOfDay = new Date(
    WEDDING_CONFIG.wedding.dateStartOfDay || WEDDING_CONFIG.wedding.date,
  ).getTime();
  if (Number.isNaN(eventTime) || Number.isNaN(startOfDay)) return;

  const cd = WEDDING_CONFIG.content.countdown || {};
  const countdownWrapper = document.querySelector(".countdown");
  const noteEl = document.querySelector(".countdown-note");
  const headingEl = document.querySelector(".countdown-section h2");
  let confettiFired = false;

  function updateCountdown() {
    const now = Date.now();

    if (now < startOfDay) {
      const difference = eventTime - now;
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
      return;
    }

    if (countdownWrapper) countdownWrapper.hidden = true;
    const daysSince = Math.floor((now - startOfDay) / (1000 * 60 * 60 * 24));

    if (daysSince === 0) {
      if (headingEl)
        headingEl.textContent =
          cd.arrivalTitle || "Hari Ini Hari Bahagia Kami!";
      if (noteEl) noteEl.textContent = cd.arrivalText || "";
      if (!confettiFired) {
        confettiFired = true;
        fireConfetti();
      }
    } else {
      if (headingEl) headingEl.textContent = cd.afterTitle || "Terima Kasih";
      if (noteEl) noteEl.textContent = cd.afterText || "";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ============================================================
   13. SCROLL REVEAL
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

  // ── SAFETY NET ──
  // Paksa elemen di #intro langsung visible agar tidak ada
  // section kosong selama observer callback async
  setTimeout(() => {
    document
      .querySelectorAll("#intro .reveal:not(.is-visible)")
      .forEach((el) => el.classList.add("is-visible"));
  }, 100);
}

/* ============================================================
   14. SCROLL LOCK
   ============================================================ */

function lockScroll(isLocked) {
  document.documentElement.classList.toggle("invitation-locked", isLocked);
  document.body.classList.toggle("invitation-locked", isLocked);
}

/* ============================================================
   15. OPENING
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

  /* --- LOGIKA PEMANGGILAN FOTO HERO (fix GitHub Pages subfolder) --- */
  const opening = document.querySelector(".opening-section");
  const coverPhoto = WEDDING_CONFIG.wedding.coverPhoto;

  if (opening && coverPhoto) {
    // Resolve ke URL absolut terhadap baseURI dokumen.
    // Ini mengatasi kasus GitHub Pages subfolder (/wedding-invitation/)
    // yang sebelumnya membuat path relatif hero.jpg gagal dimuat.
    const absoluteUrl = new URL(coverPhoto, document.baseURI).href;

    const testImg = new Image();
    testImg.onload = () => {
      opening.classList.add("has-photo");
      opening.style.setProperty("--cover-url", `url("${absoluteUrl}")`);
    };
    testImg.onerror = () => {
      console.warn("Hero image gagal dimuat:", absoluteUrl);
    };
    testImg.src = absoluteUrl; // ← pakai URL absolut, bukan path relatif
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
      // 1. Hapus opening dari layout
      opening.classList.add("is-hidden");
      opening.setAttribute("aria-hidden", "true");

      // 2. Reset scroll ke atas SEBELUM observer aktif
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      // 3. Buka scroll lock
      lockScroll(false);

      // 4. Force reflow + trigger observer di frame berikutnya
      void document.body.offsetHeight;
      requestAnimationFrame(startReveal);
    }, envelopeDuration);
  }

  openButton.addEventListener("click", openInvitation);
  if (envelope) envelope.addEventListener("click", openInvitation);
}

/* ============================================================
   16. MUSIC
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

function fadeIn(audio, duration = 2000) {
  clearInterval(fadeTimer);
  if (isIosSafari()) {
    audio.volume = 1;
    return;
  }
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

function fadeOut(audio, duration = 1500, onDone) {
  clearInterval(fadeTimer);
  if (isIosSafari()) {
    audio.pause();
    if (typeof onDone === "function") onDone();
    return;
  }
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
    const template = templates[key] || "";
    if (!template) {
      showStatus("Template RSVP tidak ditemukan di config.js.", true);
      return;
    }

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
  loadOpeningEnvelope();
  initializeOpening();
  loadPageText();

  loadCoupleInformation();
  loadWeddingDate();
  loadWeddingEvents();
  loadGallery();
  loadFamilyList();
  loadLocation();
  loadBankAccounts();
  initializeCopyAccount();
  initializeRsvp();
  initializeLightbox();

  startCountdown();

  document.body.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const targetId = link.getAttribute("href");
    if (targetId === "#") return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});
