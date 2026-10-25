import "@fontsource-variable/outfit";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "./styles.css";

const details = document.querySelector(".nav-details");
const navLinks = [...document.querySelectorAll("[data-nav]")];

details?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1099px)").matches) {
      details.removeAttribute("open");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && details?.open) {
    details.removeAttribute("open");
    details.querySelector("summary")?.focus();
  }
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === id) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
}

const hero = document.querySelector(".hero");
const tilt = document.querySelector(".edition-tilt");
const canTilt =
  hero &&
  tilt &&
  window.matchMedia("(pointer: fine)").matches &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

if (canTilt) {
  const baseAngle = () => {
    const style = getComputedStyle(tilt);
    return {
      ry: Number.parseFloat(style.getPropertyValue("--ry")) || -16,
      rx: Number.parseFloat(style.getPropertyValue("--rx")) || 8,
    };
  };

  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    const { ry, rx } = baseAngle();
    tilt.style.animation = "none";
    tilt.style.transform = `rotateY(${ry + px * 14}deg) rotateX(${rx - py * 10}deg)`;
  });

  hero.addEventListener("pointerleave", () => {
    tilt.style.transform = "";
    tilt.style.animation = "";
  });
}
