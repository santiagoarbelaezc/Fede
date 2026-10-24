"use strict";
// ============================================================
// Federico Alvarez – Profile Links
// src/main.ts  |  TypeScript Logic Layer
// ============================================================
// ── Data ─────────────────────────────────────────────────────
const profileConfig = {
    name: "Federico Alvarez",
    title: "Ingeniero de Sistemas · Fotógrafo",
    badge: "Disponible para proyectos",
    bio: "Combinando la precisión de la ingeniería con la sensibilidad artística de la fotografía. Capturando momentos únicos a través del lente y desarrollando soluciones digitales modernas.",
    avatar: "./assets/fede1.jpg",
    socialLinks: [
        {
            id: "instagram",
            label: "Instagram",
            subtitle: "Fotos & Momentos",
            url: "https://www.instagram.com/fedealvarezzzz/",
            platform: "instagram",
            featured: true,
        },
    ],
};
// ── Profile Renderer ──────────────────────────────────────────
class ProfileRenderer {
    constructor(config) {
        this.config = config;
    }
    render() {
        const fields = [
            ["profile-name", this.config.name],
            ["profile-badge", this.config.badge],
            ["profile-bio", this.config.bio],
        ];
        fields.forEach(([id, text]) => {
            const el = document.getElementById(id);
            if (el)
                el.textContent = text;
        });
        // Static avatar
        const avatar = document.getElementById("profile-avatar");
        if (avatar && !avatar.src.includes("fede1.jpg")) {
            avatar.src = this.config.avatar;
            avatar.alt = this.config.name;
        }
    }
}
// ── Cursor Glow ───────────────────────────────────────────────
class CursorGlow {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.glowX = 0;
        this.glowY = 0;
        this.glow = document.getElementById("cursor-glow");
    }
    init() {
        if (!this.glow)
            return;
        document.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        this.animate();
    }
    animate() {
        const lerp = (a, b, t) => a + (b - a) * t;
        this.glowX = lerp(this.glowX, this.mouseX, 0.08);
        this.glowY = lerp(this.glowY, this.mouseY, 0.08);
        if (this.glow) {
            this.glow.style.transform = `translate(${this.glowX - 200}px, ${this.glowY - 200}px)`;
        }
        requestAnimationFrame(() => this.animate());
    }
}
// ── Scroll Progress ───────────────────────────────────────────
function initScrollProgress() {
    const bar = document.getElementById("scroll-progress");
    if (!bar)
        return;
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${pct}%`;
    }, { passive: true });
}
// ── Link Click Tracking ───────────────────────────────────────
function initLinkTracking() {
    document.querySelectorAll("a[data-track]").forEach((link) => {
        link.addEventListener("click", () => {
            const platform = link.dataset["track"] ?? "unknown";
            console.info(`[Analytics] Link clicked: ${platform} → ${new Date().toISOString()}`);
        });
    });
}
function initAOS() {
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 820,
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
        });
    }
}
// ── Scroll Indicator ──────────────────────────────────────────
function initScrollIndicator() {
    const el = document.getElementById("scroll-indicator");
    if (!el)
        return;
    window.addEventListener("scroll", () => {
        if (window.scrollY > 60)
            el.classList.add("hidden-indicator");
    }, { passive: true });
}
// ── Lightbox ──────────────────────────────────────────────────
class Lightbox {
    constructor() {
        this.overlay = document.getElementById("lightbox");
        this.img = document.getElementById("lightbox-img");
        this.closeBtn = document.getElementById("lightbox-close");
    }
    init() {
        if (!this.overlay || !this.img)
            return;
        this.closeBtn?.addEventListener("click", () => this.close());
        this.overlay.addEventListener("click", (e) => {
            if (e.target === this.overlay)
                this.close();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape")
                this.close();
        });
        document.querySelectorAll(".lightbox-trigger").forEach((cell) => {
            cell.addEventListener("click", () => this.open(cell));
            cell.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    this.open(cell);
                }
            });
        });
    }
    open(cell) {
        const src = cell.dataset["src"];
        const alt = cell.dataset["alt"] ?? "Federico Alvarez";
        if (!src || !this.img || !this.overlay)
            return;
        this.img.src = src;
        this.img.alt = alt;
        this.overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }
    close() {
        this.overlay?.classList.remove("open");
        document.body.style.overflow = "";
        setTimeout(() => {
            if (this.img && !this.overlay?.classList.contains("open")) {
                this.img.src = "";
            }
        }, 320);
    }
}
// ── Bootstrap ─────────────────────────────────────────────────
function bootstrap() {
    new ProfileRenderer(profileConfig).render();
    new Lightbox().init();
    new CursorGlow().init();
    initScrollProgress();
    initLinkTracking();
    initScrollIndicator();
    initAOS();
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
}
else {
    bootstrap();
}
//# sourceMappingURL=main.js.map