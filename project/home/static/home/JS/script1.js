// ============================================================
// STATE COUNCIL — motion.js
// Uses "Motion" (motion.dev), the vanilla-JS successor to
// Framer Motion, loaded from CDN as an ES module.
// ============================================================
import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@11.15.0/+esm";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ------------------------------------------------------------
   Mobile nav toggle
------------------------------------------------------------ */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.style.display === "block";
    nav.style.display = open ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!open));
  });
}

/* ------------------------------------------------------------
   Nav link underline micro-interaction
------------------------------------------------------------ */
function initNavHover() {
  document.querySelectorAll(".primary-nav a").forEach((link) => {
    if (prefersReducedMotion) return;
    link.addEventListener("mouseenter", () => {
      animate(
        link,
        { transform: ["translateY(0px)", "translateY(-1px)"] },
        { duration: 0.18, easing: "ease-out" }
      );
    });
    link.addEventListener("mouseleave", () => {
      animate(link, { transform: "translateY(0px)" }, { duration: 0.18 });
    });
  });
}

/* ------------------------------------------------------------
   Hero entrance — headline + actions stagger in on load
------------------------------------------------------------ */
function initHeroEntrance() {
  const eyebrow = document.querySelector(".hero-copy .eyebrow");
  const heading = document.querySelector(".hero-copy h1");
  const lede = document.querySelector(".hero-copy .lede");
  const actions = document.querySelector(".hero-actions");
  const strip = document.querySelector(".session-strip");

  const targets = [eyebrow, heading, lede, actions, strip].filter(Boolean);
  if (!targets.length) return;

  if (prefersReducedMotion) {
    targets.forEach((el) => (el.style.opacity = "1"));
    return;
  }

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
  });

  animate(
    targets,
    { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0px)"] },
    { duration: 0.7, delay: stagger(0.09), easing: [0.22, 1, 0.36, 1] }
  );
}

/* ------------------------------------------------------------
   Chamber arc — the signature element.
   Builds a semicircle of "seats" (like an assembly chamber)
   and animates them filling in, seat by seat, on load.
------------------------------------------------------------ */
function buildChamber() {
  const container = document.querySelector("#chamber-svg");
  if (!container) return;

  const rows = 5;
  const seatsPerRowBase = 8;
  const cx = 260;
  const cy = 250;
  const radiusStart = 70;
  const radiusStep = 34;
  const majorityShare = 0.56; // fraction of seats styled as "majority"

  const svgNS = "http://www.w3.org/2000/svg";
  const seats = [];

  let totalSeats = 0;
  for (let r = 0; r < rows; r++) {
    const seatsInRow = seatsPerRowBase + r * 3;
    totalSeats += seatsInRow;
  }
  const majorityCount = Math.round(totalSeats * majorityShare);

  let seatIndex = 0;
  for (let r = 0; r < rows; r++) {
    const seatsInRow = seatsPerRowBase + r * 3;
    const radius = radiusStart + r * radiusStep;
    for (let s = 0; s < seatsInRow; s++) {
      // spread seats across a 200-degree arc (like a chamber, not a full circle)
      const angleDeg = 190 - (s / (seatsInRow - 1)) * 200;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = cx + radius * Math.cos(angleRad);
      const y = cy - radius * Math.sin(angleRad) * 0.72;

      const circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", x.toFixed(1));
      circle.setAttribute("cy", y.toFixed(1));
      circle.setAttribute("r", "5.4");
      circle.setAttribute(
        "class",
        "chamber-seat" + (seatIndex < majorityCount ? " majority" : "")
      );
      container.appendChild(circle);
      seats.push(circle);
      seatIndex++;
    }
  }

  // shuffle fill order slightly so it doesn't animate strictly row by row
  const fillOrder = [...seats].sort(() => Math.random() - 0.5);

  if (prefersReducedMotion) {
    seats.forEach((s) => (s.style.opacity = "1"));
    return;
  }

  fillOrder.forEach((seat) => (seat.style.opacity = "0"));

  animate(
    fillOrder,
    { opacity: [0, 1], scale: [0, 1] },
    { duration: 0.5, delay: stagger(0.012), easing: "ease-out" }
  );
}

/* ------------------------------------------------------------
   Scroll-triggered reveals for any element with .reveal
------------------------------------------------------------ */
function initScrollReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach((el) => (el.style.opacity = "1"));
    return;
  }

  items.forEach((el) => {
    el.style.transform = "translateY(18px)";
  });

  inView(
    ".reveal",
    (el) => {
      animate(
        el.target,
        { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] },
        { duration: 0.6, easing: [0.22, 1, 0.36, 1] }
      );
    },
    { margin: "-10% 0px -10% 0px" }
  );
}

/* ------------------------------------------------------------
   Stagger groups (.reveal-group) — children fan in together
------------------------------------------------------------ */
function initStaggerGroups() {
  const groups = document.querySelectorAll(".reveal-group");
  if (!groups.length || prefersReducedMotion) {
    groups.forEach((g) =>
      g.querySelectorAll(".reveal-child").forEach((c) => (c.style.opacity = "1"))
    );
    return;
  }

  groups.forEach((group) => {
    const children = group.querySelectorAll(".reveal-child");
    children.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(16px)";
    });
  });

  inView(
    ".reveal-group",
    (el) => {
      const children = el.target.querySelectorAll(".reveal-child");
      animate(
        children,
        { opacity: [0, 1], transform: ["translateY(16px)", "translateY(0px)"] },
        { duration: 0.55, delay: stagger(0.08), easing: [0.22, 1, 0.36, 1] }
      );
    },
    { margin: "-10% 0px -10% 0px" }
  );
}

/* ------------------------------------------------------------
   Init
------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initNavHover();
  initHeroEntrance();
  buildChamber();
  initScrollReveals();
  initStaggerGroups();
});