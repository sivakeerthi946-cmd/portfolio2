"use strict";

/* ===== Edit these roles for the typing animation ===== */
const ROLES = [
  "Python Developer",
  "SQL Developer",
  "Java (OOPs) Programmer",
  "HTML & CSS Web Developer"
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ===== Footer year ===== */
$("#year").textContent = new Date().getFullYear();

/* ===== Theme toggle (remembers choice) ===== */
const root = document.documentElement;
const themeBtn = $("#themeToggle");
function setTheme(t) {
  root.setAttribute("data-theme", t);
  themeBtn.innerHTML = t === "dark" ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  try { localStorage.setItem("theme", t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");
themeBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

/* ===== Mobile menu ===== */
const navLinks = $("#navLinks");
$("#menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
$$("#navLinks a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

/* ===== Typing animation ===== */
(function typing() {
  const el = $("#typed");
  let r = 0, c = 0, deleting = false;
  function tick() {
    const word = ROLES[r];
    el.textContent = word.slice(0, c);
    let delay = deleting ? 45 : 90;
    if (!deleting && c === word.length) { deleting = true; delay = 1400; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % ROLES.length; delay = 400; }
    else { c += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ===== Scroll: progress bar, navbar, active link, back-to-top ===== */
const nav = $("#nav"), progress = $("#progress"), toTop = $("#toTop");
const sections = $$("section[id]");
const links = $$("#navLinks a");
function onScroll() {
  const y = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (y / h) * 100 + "%";
  nav.classList.toggle("scrolled", y > 30);
  toTop.classList.toggle("show", y > 500);
  let current = "";
  sections.forEach(s => { if (y >= s.offsetTop - 120) current = s.id; });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ===== Reveal on scroll + skill bars + counters ===== */
function countUp(el) {
  const target = +el.dataset.count;
  const start = performance.now(), dur = 1500;
  (function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(start);
}
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("show");
    $$(".track i", el).forEach(b => (b.style.width = b.dataset.w + "%"));
    $$("[data-count]", el).forEach(countUp);
    io.unobserve(el);
  });
}, { threshold: 0.15 });
$$(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + "s";
  io.observe(el);
});

/* ===== 3D tilt on project cards ===== */
if (window.matchMedia("(hover: hover)").matches) {
  $$(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = "none";
      card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.5s ease, box-shadow 0.3s, border-color 0.3s";
      card.style.transform = "";
    });
  });
}

/* ===== Hero particle network background ===== */
(function particles() {
  const canvas = $("#bg");
  const ctx = canvas.getContext("2d");
  let w, h, pts = [];
  const mouse = { x: null, y: null };
  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const n = Math.min(90, Math.floor((w * h) / 16000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5
    }));
  }
  window.addEventListener("resize", resize);
  canvas.parentElement.addEventListener("mousemove", e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = mouse.y = null; });
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const color = getComputedStyle(root).getPropertyValue("--accent").trim() || "#38bdf8";
    ctx.fillStyle = color; ctx.strokeStyle = color;
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.globalAlpha = 0.7;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.globalAlpha = (1 - d / 120) * 0.3;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      if (mouse.x !== null) {
        const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (d < 150) {
          ctx.globalAlpha = (1 - d / 150) * 0.5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  resize();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
})();

/* ===== Contact form -> opens the visitor's email app ===== */
/* Change this to your real email */
const MY_EMAIL = "sivakeerthi946@gmail.com";
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = encodeURIComponent($("#cName").value);
  const email = $("#cEmail").value;
  const msg = encodeURIComponent($("#cMsg").value + "\n\nFrom: " + email);
  window.location.href = `mailto:${MY_EMAIL}?subject=Portfolio%20Contact%20from%20${name}&body=${msg}`;
});
