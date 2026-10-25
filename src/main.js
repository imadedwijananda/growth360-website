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
