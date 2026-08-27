import { animate } from "https://cdn.jsdelivr.net/npm/motion@12.23.12/+esm";

// Initialize Lucide for icons
lucide.createIcons();

// Card entrance the main card
animate(
  ".student-card",
  {
    opacity: [0, 1],
    scale: [0.9, 1],
    y: [30, 0],
    x: [30, 0],
  },
  {
    type: "spring",
    stiffness: 280,
    damping: 30,
  },
);

// Information cards the details card
animate(
  ".info-item",
  {
    opacity: [0, 1],
    y: [15, 0],
    x: [15, 0],
  },
  {
    delay: 0.15,
    duration: 0.5,
    ease: "ease-out",
  },
);

// Shimmer
animate(
  ".shimmer",
  {
    x: ["-200%", "500%"],
    rotate: 45,
  },
  {
    duration: 1.8,
    repeat: Infinity,
    ease: "linear",
  },
);
