import { useEffect, useRef, useState } from "react";

// ─── КОНСТАНТЫ ────────────────────────────────────────────────────────────────
const LIME = "#D4F542";
const GRAPHITE = "#1A1A1A";
const CREAM = "#F5F5F0";
const WHITE = "#FFFFFF";

// Фото из ТЗ
const SPEAKER_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/fb62c289-24f2-49f0-a3e9-8e261cfa1e2f.jpg";
const HERO_BG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/9d1db74b-0dc0-4ba2-a40d-e112616dd6d1.jpg";
const CASE_BG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/34fe5a3d-a4e4-48a7-816a-7ac08e810d1e.jpg";
const CASE_BG2 = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/ecba640f-0ba3-4141-a4ac-da4533725f65.jpg";
const CASE_BG3 = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/43823ebf-de62-483f-ad5e-bf1e7922408d.jpg";

const ffH: React.CSSProperties = { fontFamily: "'SangBleu Kingdom', 'Cormorant', Georgia, serif" };
const ff: React.CSSProperties = { fontFamily: "'Basis Grotesque Pro', 'IBM Plex Sans', sans-serif" };

// ─── ХЕЛПЕРЫ ──────────────────────────────────────────────────────────────────
const ym = (...args: unknown[]) => {
  const w = window as unknown as Record<string, (...a: unknown[]) => void>;
  if (w["ym"]) w["ym"](...args);
};

const vkGoal = (goal: string) => {
  const w = window as unknown as Record<string, (...a: unknown[]) => void>;
  if (w["VK"] && (w["VK"] as unknown as Record<string, (...a: unknown[]) => void>)["Goal"]) {
    (w["VK"] as unknown as Record<string, (...a: unknown[]) => void>)["Goal"](goal);
  }
};

// ─── ФОРМА GETCOURSE ──────────────────────────────────────────────────────────
const GC_IFRAME_SRC = "https://cabinet.onlinerad.ru/pl/lite/widget/widget?id=1600234";

const GetCourseForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(420);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.origin.includes("onlinerad.ru")) return;
      if (e.data?.height) {
        setHeight(Number(e.data.height));
      }
      if (
        e.data?.type === "form_submitted" ||
        (typeof e.data === "string" && e.data.includes("form_submitted"))
      ) {
        onSuccess();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSuccess]);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <iframe
        ref={iframeRef}
        src={GC_IFRAME_SRC}
        style={{ width: "100%", height: `${height}px`, border: "none", display: "block" }}
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
};

// ─── КАСТОМНЫЙ КУРСОР ──────────────────────────────────────────────────────────
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.closest("button") || t.closest("a") || t.closest("[data-hover]")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: "fixed", pointerEvents: "none", zIndex: 99999,
        width: hovered ? "56px" : "32px", height: hovered ? "56px" : "32px",
        border: `2px solid ${LIME}`, borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
        background: hovered ? `${LIME}22` : "transparent",
        mixBlendMode: "difference",
      }} />
      <div ref={dotRef} style={{
        position: "fixed", pointerEvents: "none", zIndex: 99999,
        width: "6px", height: "6px", background: LIME, borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      }} />
    </>
  );
};

// ─── STICKY HEADER ─────────────────────────────────────────────────────────────
const Header = ({ onRegister }: { onRegister: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? `${GRAPHITE}F0` : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      borderBottom: scrolled ? `1px solid rgba(212,245,66,0.15)` : "none",
    }}>
      <div style={{
        maxWidth: "1440px", margin: "0 auto",
        padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "72px", ...ff,
      }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ ...ffH, color: WHITE, fontWeight: 700, fontSize: "16px", letterSpacing: "0.2em" }}>
            RAD ACADEMY
          </span>
        </a>

        {/* Nav — desktop */}
        <nav style={{ display: "flex", gap: "32px", alignItems: "center" }} className="hide-mobile">
          {[
            { label: "12.05 · 15:00", id: "hero" },
            { label: "Регистрация", id: "register" },
            { label: "Программа", id: "program" },
            { label: "Спикер", id: "speaker" },
          ].map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.75)", fontSize: "14px", letterSpacing: "0.05em",
              ...ff, transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = LIME)}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            >{n.label}</button>
          ))}
        </nav>

        {/* CTA */}
        <button onClick={() => { onRegister(); ym(107087337, "reachGoal", "roadtohoreca_header_cta"); }}
          style={{
            background: LIME, color: GRAPHITE, borderRadius: "100px",
            padding: "12px 24px", border: "none", cursor: "pointer",
            fontWeight: 600, fontSize: "13px", letterSpacing: "0.06em",
            textTransform: "uppercase", ...ff,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = WHITE;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = LIME;
          }}
        >
          Принять участие
        </button>
      </div>
    </header>
  );
};

// ─── КНОПКИ CTA ────────────────────────────────────────────────────────────────
const BtnPrimary = ({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) => (
  <button onClick={onClick} style={{
    background: LIME, color: GRAPHITE, borderRadius: "100px",
    padding: "18px 36px", border: "none", cursor: "pointer",
    fontWeight: 600, fontSize: "15px", letterSpacing: "0.05em",
    textTransform: "uppercase", ...ff, transition: "all 0.3s ease",
    display: "inline-flex", alignItems: "center", gap: "8px", ...style,
  }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.background = GRAPHITE;
      (e.currentTarget as HTMLButtonElement).style.color = LIME;
      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.background = LIME;
      (e.currentTarget as HTMLButtonElement).style.color = GRAPHITE;
      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
    }}
  >{children}</button>
);

const BtnSecondary = ({ children, onClick, dark }: { children: React.ReactNode; onClick?: () => void; dark?: boolean }) => (
  <button onClick={onClick} style={{
    background: dark ? "rgba(255,255,255,0.1)" : "transparent",
    color: dark ? WHITE : GRAPHITE,
    borderRadius: "100px",
    padding: "18px 36px",
    border: `1px solid ${dark ? "rgba(255,255,255,0.3)" : GRAPHITE}`,
    cursor: "pointer",
    fontWeight: 500, fontSize: "15px", letterSpacing: "0.05em",
    textTransform: "uppercase", ...ff, transition: "all 0.3s ease",
    display: "inline-flex", alignItems: "center", gap: "8px",
  }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.background = dark ? WHITE : GRAPHITE;
      (e.currentTarget as HTMLButtonElement).style.color = dark ? GRAPHITE : WHITE;
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.background = dark ? "rgba(255,255,255,0.1)" : "transparent";
      (e.currentTarget as HTMLButtonElement).style.color = dark ? WHITE : GRAPHITE;
    }}
  >{children}</button>
);

const DoubleCTA = ({ onRegister, dark = false }: { onRegister: () => void; dark?: boolean }) => (
  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
    <BtnPrimary onClick={() => { onRegister(); ym(107087337, "reachGoal", "roadtohoreca_cta_click"); }}>
      Принять участие
    </BtnPrimary>
    <BtnSecondary dark={dark} onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>
      Задать вопрос
    </BtnSecondary>
  </div>
);

// ─── МЕТКА СЕКЦИИ ──────────────────────────────────────────────────────────────
const SectionLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div style={{
    ...ff, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase",
    color: light ? "rgba(255,255,255,0.5)" : "rgba(26,26,26,0.5)",
    marginBottom: "24px", fontWeight: 500,
  }}>{children}</div>
);

// ─── AOS ОБЁРТКА ───────────────────────────────────────────────────────────────
const AOS = ({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) => (
  <div className="aos-item" style={{
    opacity: 0, transform: "translateY(32px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    ...style,
  }}>{children}</div>
);

// ─── АККОРДЕОН ─────────────────────────────────────────────────────────────────
const AccordionItem = ({ title, children, onLime = false }: { title: string; children: React.ReactNode; onLime?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: onLime ? GRAPHITE : "rgba(255,255,255,0.05)",
      borderRadius: "16px", overflow: "hidden",
      border: `1px solid ${onLime ? "transparent" : "rgba(255,255,255,0.1)"}`,
      marginBottom: "12px",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 28px", background: "none", border: "none", cursor: "pointer",
        ...ff, color: WHITE, fontSize: "17px", fontWeight: 600, textAlign: "left",
        letterSpacing: "0.02em",
      }}>
        <span>{title}</span>
        <span style={{
          width: "28px", height: "28px", borderRadius: "50%",
          background: LIME, color: GRAPHITE,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", fontWeight: 400, flexShrink: 0,
          transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "rotate(0)",
        }}>+</span>
      </button>
      {open && (
        <div style={{
          padding: "0 28px 24px", color: "rgba(255,255,255,0.75)", ...ff,
          fontSize: "16px", lineHeight: 1.6,
        }}>{children}</div>
      )}
    </div>
  );
};

// ─── СЧЁТЧИК ЦИФР ──────────────────────────────────────────────────────────────
const CounterStat = ({ prefix = "", suffix = "", label, target, decimals = 0 }: {
  prefix?: string; suffix?: string; label: string; target: string; decimals?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(numericTarget) || numericTarget === 0) {
      setVal(target);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = numericTarget * eased;
          setVal(decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString("ru"));
          if (progress < 1) requestAnimationFrame(tick);
          else setVal(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        ...ffH, color: LIME, fontSize: "clamp(48px, 8vw, 96px)",
        fontWeight: 700, lineHeight: 1, marginBottom: "12px",
      }}>
        {prefix}{val}{suffix}
      </div>
      <div style={{ ...ff, color: "rgba(255,255,255,0.7)", fontSize: "16px", lineHeight: 1.5, maxWidth: "200px", margin: "0 auto" }}>
        {label}
      </div>
    </div>
  );
};

// ─── ОТЗЫВЫ УЧЕНИЦ (KINESCOPE) ────────────────────────────────────────────────
const REVIEWS = [
  {
    id: "iQpZB7LgYgEhvcSMJnEcDB",
    cover: "https://cdn.poehali.dev/files/69761a21-7c8e-42a5-bc91-0c9d3fc966a5.png",
    name: "Ученица 1",
  },
  {
    id: "39zsErsitVSgkai4HddiFW",
    cover: "https://cdn.poehali.dev/files/867dc6f4-24d8-41cc-b670-4470e7baf561.png",
    name: "Ученица 2",
  },
  {
    id: "vNjK1onGKjzKsRfFjou9Sd",
    cover: "https://cdn.poehali.dev/files/9287f5f1-8b2d-4862-a261-6c1fa9be0ddb.png",
    name: "Ученица 3",
  },
  {
    id: "5LVYSYxGcBou32VDfrZELD",
    cover: "https://cdn.poehali.dev/files/75036c32-7c92-4038-852b-19e59163ff6d.png",
    name: "Ученица 4",
  },
  {
    id: "qySjCSjbmaqHQbEp13kPxX",
    cover: "https://cdn.poehali.dev/files/90a8cb34-77d3-4a77-9336-90201349a322.png",
    name: "Ученица 5",
  },
];

const VideoCard = ({ review }: { review: typeof REVIEWS[0] }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{
      position: "relative",
      borderRadius: "16px",
      overflow: "hidden",
      aspectRatio: "9/16",
      background: "#000",
      cursor: "pointer",
      flexShrink: 0,
    }}
      onClick={() => setPlaying(true)}
    >
      {!playing ? (
        <>
          <img
            src={review.cover}
            alt={review.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "64px", height: "64px",
            background: LIME,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 0 rgba(212,245,66,0.4)",
            animation: "pulse-lime 2s infinite",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polygon points="9,7 19,12 9,17" fill={GRAPHITE} />
            </svg>
          </div>
        </>
      ) : (
        <iframe
          src={`https://kinescope.io/embed/${review.id}?autoplay=1`}
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      )}
    </div>
  );
};

const ReviewsSection = () => {
  const [index, setIndex] = useState(0);
  const total = REVIEWS.length;
  const maxIndex = total - 3;

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(maxIndex, i + 1));

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return (
    <section style={{
      background: "#111",
      padding: "clamp(60px, 10vh, 120px) 0",
    }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 80px)" }}>
        <AOS><SectionLabel light>10 / Отзывы учениц</SectionLabel></AOS>

        <AOS delay={80}>
          <h2 style={{
            ...ffH, color: WHITE,
            fontSize: "clamp(32px, 5vw, 72px)",
            textTransform: "uppercase", lineHeight: 0.95,
            letterSpacing: "-0.02em", margin: "0 0 56px",
          }}>
            Они уже<br /><span style={{ color: LIME }}>прошли путь</span>
          </h2>
        </AOS>
      </div>

      <div style={{ position: "relative", overflow: "hidden", padding: "0 clamp(20px, 5vw, 80px)" }}>
        <div style={{
          display: "flex",
          gap: "20px",
          transform: `translateX(calc(-${index} * (100% / 3 + 20px / 3 * 2)))`,
          transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}>
          {REVIEWS.map((r) => (
            <div key={r.id} style={{ flex: "0 0 calc(33.333% - 14px)", minWidth: 0 }}>
              <VideoCard review={r} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 80px)" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginTop: "40px",
        }}>
          <button
            onClick={prev}
            disabled={!canPrev}
            style={{
              width: "56px", height: "56px",
              borderRadius: "50%",
              border: `2px solid ${canPrev ? LIME : "rgba(255,255,255,0.2)"}`,
              background: "transparent",
              cursor: canPrev ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease",
              opacity: canPrev ? 1 : 0.35,
              animation: canPrev ? "arrow-bounce-left 1.5s ease-in-out infinite" : "none",
            }}
            onMouseEnter={e => { if (canPrev) (e.currentTarget as HTMLButtonElement).style.background = LIME; }}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "transparent"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke={canPrev ? LIME : "rgba(255,255,255,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  width: i === index ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: i === index ? LIME : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={!canNext}
            style={{
              width: "56px", height: "56px",
              borderRadius: "50%",
              border: `2px solid ${canNext ? LIME : "rgba(255,255,255,0.2)"}`,
              background: "transparent",
              cursor: canNext ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease",
              opacity: canNext ? 1 : 0.35,
              animation: canNext ? "arrow-bounce-right 1.5s ease-in-out infinite" : "none",
            }}
            onMouseEnter={e => { if (canNext) (e.currentTarget as HTMLButtonElement).style.background = LIME; }}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "transparent"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke={canNext ? LIME : "rgba(255,255,255,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// ГЛАВНЫЙ КОМПОНЕНТ
// ──────────────────────────────────────────────────────────────────────────────
export default function RoadToHorecaPage() {
  const [registerOpen, setRegisterOpen] = useState(false);

  // AOS наблюдатель
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll(".aos-item").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Метрика — просмотр страницы
  useEffect(() => {
    ym(107087337, "reachGoal", "roadtohoreca_page_view");
  }, []);

  const openRegister = () => {
    setRegisterOpen(true);
    ym(107087337, "reachGoal", "roadtohoreca_open_register");
    vkGoal("view_registration");
  };

  return (
    <div style={{ background: GRAPHITE, ...ff }}>
      {/* Кастомный курсор */}
      <CustomCursor />

      {/* Sticky Header */}
      <Header onRegister={openRegister} />

      {/* Модальное окно регистрации — GetCourse */}
      {registerOpen && (
        <div onClick={() => setRegisterOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          padding: "16px",
          overflowY: "auto",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: WHITE, borderRadius: "20px",
            width: "100%", maxWidth: "520px",
            padding: "48px 40px 40px",
            position: "relative",
            margin: "auto",
            boxSizing: "border-box",
          }}>
            <button onClick={() => setRegisterOpen(false)} style={{
              position: "absolute", top: "16px", right: "16px",
              background: "rgba(0,0,0,0.08)", border: "none", cursor: "pointer",
              borderRadius: "50%", width: "32px", height: "32px",
              fontSize: "16px", color: GRAPHITE, lineHeight: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>✕</button>
            <GetCourseForm onSuccess={() => {
              ym(107087337, "reachGoal", "roadtohoreca_form_submit");
              vkGoal("lead");
            }} />
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 1 · HERO
      ═══════════════════════════════════════════════════════ */}
      <section id="hero" style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        overflow: "hidden",
      }}>
        {/* Фоновое фото */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover", backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transform: "scale(1.05)",
        }} />
        {/* Градиентная заливка */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 100%)",
        }} />

        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: "1440px", margin: "0 auto", width: "100%",
          padding: "0 clamp(20px, 5vw, 80px) clamp(60px, 8vh, 100px)",
        }}>
          {/* Плашка */}
          <AOS>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(26,26,26,0.7)", backdropFilter: "blur(8px)",
              borderRadius: "100px", padding: "8px 20px",
              border: "1px solid rgba(212,245,66,0.3)",
              ...ff, fontSize: "13px", color: WHITE, letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: "28px",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: LIME, flexShrink: 0 }} />
              Бесплатный онлайн-эфир · 12 Мая · 15:00 МСК
            </div>
          </AOS>

          {/* H1 */}
          <AOS delay={100}>
            <h1 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(44px, 8.5vw, 120px)",
              textTransform: "uppercase", lineHeight: 0.9,
              letterSpacing: "-0.02em", margin: "0 0 12px",
              fontWeight: 700,
            }}>
              Заказов стало меньше.<br />Деньги — в другом месте.
            </h1>
          </AOS>
          <AOS delay={180}>
            <h2 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(22px, 3.5vw, 52px)",
              fontStyle: "italic", fontWeight: 400,
              letterSpacing: "-0.01em", lineHeight: 1,
              margin: "0 0 28px",
            }}>
              Где дизайнеру искать клиентов в 2026 году
            </h2>
          </AOS>

          {/* Подзаголовок */}
          <AOS delay={250}>
            <p style={{
              ...ff, color: "rgba(255,255,255,0.8)",
              fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.5,
              maxWidth: "720px", margin: "0 0 40px",
            }}>
              Пока одни ждут, когда «вернутся клиенты», другие уже работают с отельерами
              и закрывают проекты на 4,5 млн ₽ за 1,5 месяца. На эфире 12 мая Анна Симонова
              покажет, где именно искать заказы и как в них заходить.
            </p>
          </AOS>

          {/* Кнопки */}
          <AOS delay={320}>
            <DoubleCTA onRegister={openRegister} dark />
          </AOS>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 2 · РЕАЛЬНОСТЬ РЫНКА (графит)
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: "#111111", padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)",
      }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel light>01 / Реальность 2026</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(32px, 5.5vw, 76px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 20px", maxWidth: "1000px",
            }}>
              Заказчики откладывают ремонты. Чеки падают. Конкуренция — растёт.
            </h2>
          </AOS>

          <AOS delay={140}>
            <p style={{ ...ff, color: "rgba(255,255,255,0.6)", fontSize: "20px", marginBottom: "48px" }}>
              И это не временно. Это новая норма жилого рынка.
            </p>
          </AOS>

          {/* 2 колонки */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "48px" }} className="grid-cols-1-md">
            <AOS delay={180}>
              <p style={{ ...ff, color: "rgba(255,255,255,0.75)", fontSize: "17px", lineHeight: 1.7 }}>
                Поговорите с любым дизайнером жилых интерьеров — услышите одно и то же:<br /><br />
                — Лиды стали холоднее<br />
                — Цикл сделки растянулся в 2–3 раза<br />
                — Клиенты торгуются за каждые 50 000 ₽<br />
                — Половина «горячих» заявок в итоге не закрывается<br /><br />
                Раньше можно было закрыть глаза. Сейчас — нет.
              </p>
            </AOS>
            <AOS delay={220}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Новостройки сдают, но ремонты откладывают",
                  "Бюджеты режут на 30–40%",
                  "На один проект — 5–7 дизайнеров в шорт-листе",
                  "Демпинг от новичков и нейросетей",
                  "«Сделайте подешевле» — стало нормой переговоров",
                ].map((item, i) => (
                  <li key={i} style={{
                    ...ff, color: "rgba(255,255,255,0.8)",
                    fontSize: "16px", lineHeight: 1.6,
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", gap: "12px", alignItems: "flex-start",
                  }}>
                    <span style={{ color: LIME, marginTop: "2px", flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </AOS>
          </div>

          {/* Плашка-вывод */}
          <AOS delay={280}>
            <div style={{
              background: LIME, borderRadius: "24px",
              padding: "32px 40px", marginBottom: "48px",
            }}>
              <p style={{ ...ff, color: GRAPHITE, fontSize: "18px", lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                Ждать «когда отпустит» — стратегия проигравших. Вопрос не в том, что делать с жилым рынком.
                Вопрос — куда смотреть, чтобы заказы были.
              </p>
            </div>
          </AOS>

          <AOS delay={320}><DoubleCTA onRegister={openRegister} dark /></AOS>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 3 · ОТВЕТ — ГДЕ ДЕНЬГИ (лайм)
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: LIME, padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel>02 / Ответ</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(28px, 4.5vw, 68px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 24px", maxWidth: "1000px",
            }}>
              Деньги — там, где бизнес не может отложить ремонт
            </h2>
          </AOS>

          <AOS delay={130}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.7)", fontSize: "18px", marginBottom: "48px", maxWidth: "760px", lineHeight: 1.6 }}>
              Отельеры, рестораторы, владельцы кафе и апартаментов не могут «подождать». У них простаивает
              объект — горят деньги. У них договор с франшизой — горят сроки. Они платят дизайнеру в 2–3 раза
              больше — потому что это инвестиция, а не трата.
            </p>
          </AOS>

          {/* 3 карточки */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "48px" }} className="grid-cols-1-md">
            {/* Карточка 1 — Жилой клиент */}
            <AOS delay={160}>
              <div style={{
                background: WHITE, borderRadius: "24px", padding: "36px 32px",
                border: "2px solid rgba(26,26,26,0.1)",
              }}>
                <div style={{ ...ff, color: "rgba(26,26,26,0.4)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                  ⚪ Частный заказчик
                </div>
                <div style={{ ...ffH, color: GRAPHITE, fontSize: "20px", fontWeight: 700, marginBottom: "20px", lineHeight: 1.2 }}>
                  «Можем подождать»
                </div>
                {[
                  ["Решение", "6–12 месяцев"],
                  ["Чек", "торгуется за каждые 50 000 ₽"],
                  ["Сейчас", "откладывает или режет смету"],
                ].map(([k, v], i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    padding: "10px 0", borderBottom: "1px solid rgba(26,26,26,0.08)",
                    ...ff, fontSize: "14px", gap: "8px",
                  }}>
                    <span style={{ color: "rgba(26,26,26,0.45)", flexShrink: 0 }}>{k}</span>
                    <span style={{ color: GRAPHITE, fontWeight: 500, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
            </AOS>

            {/* Карточка 2 — HoReCa */}
            <AOS delay={220}>
              <div style={{
                background: GRAPHITE, borderRadius: "24px", padding: "36px 32px",
                border: "2px solid rgba(212,245,66,0.3)",
              }}>
                <div style={{ ...ff, color: LIME, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                  🟩 Бизнесмен-отельер
                </div>
                <div style={{ ...ffH, color: WHITE, fontSize: "20px", fontWeight: 700, marginBottom: "20px", lineHeight: 1.2 }}>
                  «Каждый день простоя — минус деньги»
                </div>
                {[
                  ["Решение", "2–3 недели"],
                  ["Чек", "от 4,5 млн ₽"],
                  ["Сейчас", "ищет дизайнера и платит вперёд"],
                ].map(([k, v], i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
                    ...ff, fontSize: "14px", gap: "8px",
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>{k}</span>
                    <span style={{ color: LIME, fontWeight: 600, textAlign: "right" }}>{v}</span>
                  </div>
                ))}
              </div>
            </AOS>

            {/* Карточка 3 — Вывод */}
            <AOS delay={280}>
              <div style={{
                background: WHITE, borderRadius: "24px", padding: "36px 32px",
                border: "2px solid rgba(26,26,26,0.1)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ ...ff, color: "rgba(26,26,26,0.4)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                    ⚫ Что это значит
                  </div>
                  <div style={{ ...ffH, color: GRAPHITE, fontSize: "20px", fontWeight: 700, marginBottom: "20px", lineHeight: 1.2 }}>
                    Заказы есть. Бюджеты есть. Запросы — есть.
                  </div>
                </div>
                <p style={{ ...ff, color: "rgba(26,26,26,0.65)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                  Просто рынок, где они находятся, отличается от того, где вы привыкли работать.
                </p>
              </div>
            </AOS>
          </div>

          <AOS delay={320}>
            <p style={{
              ...ff, color: "rgba(26,26,26,0.7)", fontSize: "18px",
              lineHeight: 1.6, textAlign: "center", maxWidth: "760px", margin: "0 auto 48px",
            }}>
              На эфире 12 мая разберём конкретно: кто эти заказчики, где они ищут дизайнеров,
              и как зайти в эту нишу за ближайшие 2–4 недели.
            </p>
          </AOS>

          <AOS delay={360}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DoubleCTA onRegister={openRegister} />
            </div>
          </AOS>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 4 · ДЛЯ КОГО (молочный)
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: CREAM, padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel>03 / Для кого эфир</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(28px, 4.5vw, 64px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 20px", maxWidth: "900px",
            }}>
              Эфир для дизайнеров, которые хотят работать — а не ждать клиента
            </h2>
          </AOS>

          <AOS delay={130}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.7)", fontSize: "18px", marginBottom: "48px", maxWidth: "640px" }}>
              Если хотя бы 3 из 6 пунктов про вас — приходите.
            </p>
          </AOS>

          {/* Сетка 3×2 */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            gridAutoRows: "1fr",
          }} className="grid-cols-1-md">
            {[
              { n: "01/", title: "Заказов стало меньше", text: "Вы видите, что лиды холоднее, цикл сделки длиннее, чек ниже." },
              { n: "02/", title: "Вы устали ждать «когда вернутся клиенты»", text: "Понимаете: ждать — не стратегия. Нужно действовать." },
              { n: "03/", title: "Вы дизайнер с опытом 3+ года", text: "Работаете с жилыми интерьерами, есть портфолио и насмотренность." },
              { n: "04/", title: "Хотите большие чеки и крупные проекты", text: "Вместо 5 мелких — 1 серьёзный, который закроет квартал." },
              { n: "05/", title: "Пробовали зайти в коммерцию", text: "Получали отказы, давление по цене или непонимание, с чего начать." },
              { n: "06/", title: "Вы готовы к новому", text: "Понимаете: рынок изменился — ваше позиционирование тоже должно измениться." },
            ].map((card, i) => (
              <AOS key={i} delay={i * 60} style={{ height: "100%" }}>
                <div data-hover style={{
                  background: WHITE, borderRadius: "24px", padding: "32px",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                  cursor: "default", height: "100%",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ ...ff, color: LIME, fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "12px" }}
                    className="card-num-graphite">{card.n}</div>
                  <div style={{ ...ffH, color: GRAPHITE, fontSize: "22px", marginBottom: "12px", lineHeight: 1.2 }}>{card.title}</div>
                  <div style={{ ...ff, color: "rgba(26,26,26,0.65)", fontSize: "15px", lineHeight: 1.6 }}>{card.text}</div>
                </div>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 4 · ЧТО ВЫ ПОЛУЧИТЕ (молочный)
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: CREAM, padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel>03 / Что заберёте с эфира</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(28px, 4.5vw, 64px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 20px", maxWidth: "880px",
            }}>
              За 75 минут эфира вы получите карту — где искать заказы уже на этой неделе
            </h2>
          </AOS>

          <AOS delay={120}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.6)", fontSize: "18px", marginBottom: "48px" }}>
              Что конкретно вы заберёте с эфира
            </p>
          </AOS>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="grid-cols-1-md">
            {[
              { bg: LIME, tc: GRAPHITE, n: "01/", title: "Карта рынка HoReCa", text: "Кто конкретно сейчас ищет дизайнеров: отели, рестораны, апарт-комплексы, франшизы." },
              { bg: GRAPHITE, tc: WHITE, n: "02/", title: "Где они ищут", text: "Конкретные каналы и площадки, где отельеры выбирают дизайнеров. Не «Авито»." },
              { bg: LIME, tc: GRAPHITE, n: "03/", title: "Как заходить в диалог", text: "Анатомия первого касания и КП, которое отельер дочитывает до конца." },
              { bg: GRAPHITE, tc: WHITE, n: "04/", title: "Что показать в портфолио", text: "Если у вас только жилые проекты — как их «упаковать» под коммерческого заказчика." },
              { bg: LIME, tc: GRAPHITE, n: "05/", title: "Математика чека", text: "Один HoReCa-проект = 3–4 жилых. Конкретные цифры, не абстракции." },
              { bg: GRAPHITE, tc: WHITE, n: "06/", title: "Точка входа на этой неделе", text: "Что сделать в ближайшие 7 дней, чтобы получить первый коммерческий запрос." },
            ].map((card, i) => (
              <AOS key={i} delay={i * 60}>
                <div data-hover style={{
                  background: card.bg, borderRadius: "24px", padding: "36px 32px",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
                >
                  <div style={{ ...ff, color: card.bg === LIME ? "rgba(26,26,26,0.5)" : "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.12em", marginBottom: "16px" }}>{card.n}</div>
                  <div style={{ ...ffH, color: card.tc, fontSize: "22px", marginBottom: "14px", lineHeight: 1.2 }}>{card.title}</div>
                  <div style={{ ...ff, color: card.bg === LIME ? "rgba(26,26,26,0.7)" : "rgba(255,255,255,0.7)", fontSize: "15px", lineHeight: 1.6 }}>{card.text}</div>
                </div>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 5 · РЕАЛЬНЫЙ КЕЙС (графит + фото)
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: GRAPHITE, overflow: "hidden",
        padding: "0 0 clamp(60px, 10vh, 120px)",
      }}>
        {/* Фото-баннер */}
        <div style={{
          position: "relative", height: "clamp(300px, 50vw, 560px)",
          marginBottom: "clamp(40px, 6vh, 80px)",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}>
          {[CASE_BG, CASE_BG2].map((src, i) => (
            <div key={i} style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }} />
          ))}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(26,26,26,0.8) 100%)",
          }} />
          <div style={{
            position: "absolute", bottom: "40px", left: "clamp(20px, 5vw, 80px)",
            zIndex: 2,
          }}>
            <AOS>
              <SectionLabel light>04 / Реальный кейс</SectionLabel>
            </AOS>
            <AOS delay={80}>
              <h2 style={{
                ...ffH, color: WHITE,
                fontSize: "clamp(28px, 5vw, 72px)",
                textTransform: "uppercase", lineHeight: 0.95,
                letterSpacing: "-0.02em", maxWidth: "760px",
              }}>
                Другой уровень чека — на цифрах
              </h2>
            </AOS>
          </div>
        </div>

        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 80px)" }}>
          {/* Сравнение */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "48px" }} className="grid-cols-1-md">
            <AOS>
              <div style={{
                background: CREAM, borderRadius: "24px", padding: "40px 36px",
              }}>
                <div style={{ ...ff, fontSize: "12px", letterSpacing: "0.12em", color: "rgba(26,26,26,0.5)", marginBottom: "20px", textTransform: "uppercase" }}>
                  Дизайнер жилых интерьеров
                </div>
                {[
                  ["Чек", "600 000 – 1 200 000 ₽"],
                  ["Срок", "2–4 месяца"],
                  ["Параллельных проектов", "3–5"],
                  ["Клиент", "Частный заказчик"],
                  ["Развитие", "Точечное"],
                ].map(([k, v], i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(26,26,26,0.1)",
                    ...ff, color: GRAPHITE, fontSize: "15px",
                  }}>
                    <span style={{ color: "rgba(26,26,26,0.5)" }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </AOS>

            <AOS delay={120}>
              <div style={{
                background: LIME, borderRadius: "24px", padding: "40px 36px",
              }}>
                <div style={{ ...ff, fontSize: "12px", letterSpacing: "0.12em", color: "rgba(26,26,26,0.5)", marginBottom: "20px", textTransform: "uppercase" }}>
                  Дизайнер HoReCa
                </div>
                {[
                  ["Чек", "от 4 500 000 ₽"],
                  ["Срок", "1,5 месяца"],
                  ["Параллельных проектов", "1–2"],
                  ["Клиент", "Бизнесмен-отельер"],
                  ["Развитие", "Ниши, рост репутации"],
                ].map(([k, v], i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: "1px solid rgba(26,26,26,0.15)",
                    ...ff, color: GRAPHITE, fontSize: "15px",
                  }}>
                    <span style={{ color: "rgba(26,26,26,0.5)" }}>{k}</span>
                    <span style={{ fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </AOS>
          </div>

          <AOS delay={160}>
            <p style={{
              ...ff, color: "rgba(255,255,255,0.7)", fontSize: "17px",
              lineHeight: 1.7, textAlign: "center", maxWidth: "700px", margin: "0 auto 48px",
            }}>
              Это не «успешный успех» из 2019-го. Это текущий проект Анны Симоновой, закрытый в условиях того же
              рынка, на котором вы сейчас не можете найти клиентов.
            </p>
          </AOS>

          <AOS delay={200}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DoubleCTA onRegister={openRegister} dark />
            </div>
          </AOS>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 6 · ПРОГРАММА (лайм)
      ═══════════════════════════════════════════════════════ */}
      <section id="program" style={{ background: LIME, padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel>05 / Программа</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(32px, 5vw, 72px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 16px",
            }}>
              Программа эфира
            </h2>
          </AOS>

          <AOS delay={120}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.65)", fontSize: "18px", marginBottom: "48px" }}>
              75 минут основной программы + ответы на вопросы
            </p>
          </AOS>

          <div style={{ maxWidth: "860px" }}>
            {[
              { title: "Вступление", text: "Что реально происходит с дизайн-рынком в 2026. Почему «жилой» больше не кормит — и куда сместились деньги." },
              { title: "Блок 1 · Карта HoReCa-рынка", text: "Кто заказчики. Сколько объектов. Сколько денег в нише. Где она растёт быстрее всего." },
              { title: "Блок 2 · Как мыслит отельер", text: "4 фильтра, через которые проходит каждое КП. Что отельер покупает на самом деле." },
              { title: "Блок 3 · Анатомия КП для отельера", text: "Структура работающего КП. Язык бизнеса вместо языка вкуса." },
              { title: "Блок 4 · Математика и кейс", text: "Один отель = 3–4 квартиры. Кейс: 4,5 млн ₽ за 1,5 месяца — разбор от первого лица." },
              { title: "Блок 5 · Точка входа", text: "Дорожная карта на ближайшие 2–4 недели. 3 сценария: быстрый, плановый, постепенный." },
              { title: "Ответы на вопросы", text: "Анна ответит на вопросы участников в прямом эфире." },
            ].map((item, i) => (
              <AOS key={i} delay={i * 50}>
                <AccordionItem title={item.title} onLime>
                  {item.text}
                </AccordionItem>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 7 · ЭКСПЕРТ (молочный)
      ═══════════════════════════════════════════════════════ */}
      <section id="speaker" style={{ background: CREAM, padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)", overflow: "hidden" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel>06 / Ведущая эфира</SectionLabel></AOS>

          <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }} className="grid-cols-1-md">
            {/* Фото */}
            <AOS delay={80}>
              <div style={{
                borderRadius: "32px", overflow: "hidden",
                aspectRatio: "3/4", maxHeight: "700px",
              }}>
                <img src={SPEAKER_PHOTO} alt="Анна Симонова" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  display: "block",
                }} />
              </div>
            </AOS>

            {/* Текст */}
            <div>
              <AOS delay={120}>
                <h2 style={{
                  ...ffH, color: GRAPHITE,
                  fontSize: "clamp(32px, 4vw, 56px)",
                  textTransform: "uppercase", lineHeight: 0.95,
                  letterSpacing: "-0.02em", margin: "0 0 8px",
                }}>
                  Анна Симонова
                </h2>
                <p style={{ ...ff, color: "rgba(26,26,26,0.5)", fontSize: "15px", marginBottom: "32px" }}>
                  основатель RAD ACADEMY
                </p>
              </AOS>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
                {[
                  "18 лет в коммерческом дизайне, более 100 реальных кейсов HoReCa по России и СНГ",
                  "Руководит и реализует проекты для флагманских ресторанов, кафе и отелей",
                  "RAD Academy: 1800 учеников, 1450 коммерческих проектов, сотни внедрённых методов",
                  "Автор ведущих программ по подготовке дизайнеров к работе с HoReCa",
                  "Жюри отраслевых конкурсов, лауреат Russian Hospitality Awards",
                ].map((item, i) => (
                  <AOS key={i} delay={140 + i * 50}>
                    <li style={{
                      ...ff, color: "rgba(26,26,26,0.75)", fontSize: "16px", lineHeight: 1.6,
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(26,26,26,0.1)",
                      display: "flex", gap: "12px", alignItems: "flex-start",
                    }}>
                      <span style={{ color: LIME, fontSize: "18px", fontWeight: 700, marginTop: "-1px", flexShrink: 0 }}>→</span>
                      {item}
                    </li>
                  </AOS>
                ))}
              </ul>

              <AOS delay={400}>
                <blockquote style={{
                  ...ffH, color: GRAPHITE,
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontStyle: "italic", lineHeight: 1.5,
                  margin: 0, padding: "28px 28px",
                  borderLeft: `4px solid ${LIME}`,
                  background: "rgba(212,245,66,0.1)",
                  borderRadius: "0 16px 16px 0",
                }}>
                  «Рынок не "вернётся". Это иллюзия, которая стоит дизайнерам года жизни и половины оборота.
                  Деньги в дизайне есть — просто они переехали туда, где бизнес не может ждать.
                  И моя задача — показать вам этот рынок изнутри».
                  <footer style={{ ...ff, fontSize: "14px", color: "rgba(26,26,26,0.5)", marginTop: "12px", fontStyle: "normal" }}>
                    — Анна Симонова
                  </footer>
                </blockquote>
              </AOS>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 8 · РЫНОК (графит, цифры)
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0D0D0D", padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel light>07 / Рынок HoReCa</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(28px, 4.5vw, 64px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 60px", maxWidth: "800px",
            }}>
              Почему HoReCa растёт — когда жилой падает
            </h2>
          </AOS>

          {/* 4 цифры */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginBottom: "60px" }} className="grid-cols-2-md">
            <AOS delay={100}><CounterStat suffix="%" prefix="+" target="5" label="рост рынка гостиничного бизнеса в России в год" /></AOS>
            <AOS delay={160}><CounterStat suffix="" prefix="" target="1 ТРЛН ₽" label="прогнозируемый объём рынка HoReCa к 2027 году" /></AOS>
            <AOS delay={220}><CounterStat suffix="+" target="40000" label="объектов размещения в России — большинство ждут реновацию" /></AOS>
            <AOS delay={280}><CounterStat suffix="%" prefix="<" target="5" label="дизайнеров профессионально специализируются на HoReCa" /></AOS>
          </div>

          <AOS delay={320}>
            <p style={{
              ...ff, color: "rgba(255,255,255,0.6)", fontSize: "18px",
              lineHeight: 1.7, textAlign: "center", maxWidth: "700px", margin: "0 auto",
            }}>
              Жилой рынок насыщен и сжимается. HoReCa — растёт и недозаполнен.
              Те, кто заходит сейчас, забирают лучшие проекты на ближайшие 5 лет.
            </p>
          </AOS>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 9 · ОТЛИЧИЕ HORECA (лайм)
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: LIME, padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel>08 / Разница в мышлении</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(28px, 4.5vw, 64px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 48px", maxWidth: "840px",
            }}>
              Что отличает дизайнера HoReCa от дизайнера жилых
            </h2>
          </AOS>

          {/* Таблица */}
          <AOS delay={120}>
            <div style={{ borderRadius: "24px", overflow: "hidden", background: GRAPHITE }}>
              {/* Заголовок */}
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 2fr 2fr",
                background: "#111", padding: "16px 28px",
              }}>
                {["Параметр", "Жилые", "HoReCa"].map((h, i) => (
                  <div key={i} style={{
                    ...ff, color: "rgba(255,255,255,0.4)", fontSize: "12px",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    textAlign: i > 0 ? "center" : "left",
                  }}>{h}</div>
                ))}
              </div>
              {[
                ["Главная цель", "Сделать красиво", "Работает на бизнес"],
                ["Язык", "Эстетика, вкус", "Концепция, ROI, операционка"],
                ["Стандарты", "Не критично", "Обязательно"],
                ["Эксплуатация", "Не учитывается", "На этапе концепции"],
                ["Клиент", "Частное лицо", "Бизнесмен, инвестор"],
                ["Чек", "Стандартный", "В 2–3 раза выше"],
                ["Срок проекта", "2–4 месяца", "1,5–2 месяца"],
              ].map(([param, left, right], i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "2fr 2fr 2fr",
                  padding: "18px 28px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.03)",
                }}>
                  <div style={{ ...ff, color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>{param}</div>
                  <div style={{ ...ff, color: "rgba(255,255,255,0.6)", fontSize: "15px", textAlign: "center" }}>{left}</div>
                  <div style={{ ...ff, color: LIME, fontSize: "15px", fontWeight: 600, textAlign: "center" }}>{right}</div>
                </div>
              ))}
            </div>
          </AOS>

          <AOS delay={200}>
            <p style={{
              ...ff, color: "rgba(26,26,26,0.65)", fontSize: "18px",
              marginTop: "32px", fontStyle: "italic",
            }}>
              Это разница не в опыте. Это разница в мышлении и системе.
            </p>
          </AOS>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 10 · БОНУСЫ (молочный)
      ═══════════════════════════════════════════════════════ */}
      <section style={{ background: CREAM, padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel>09 / Бонусы</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(32px, 5vw, 72px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 16px",
            }}>
              Бонусы для участников эфира
            </h2>
          </AOS>

          <AOS delay={120}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.6)", fontSize: "18px", marginBottom: "48px" }}>
              Что вы получите бесплатно за регистрацию и присутствие на эфире
            </p>
          </AOS>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "40px" }} className="grid-cols-1-md">
            {[
              {
                n: "Бонус 01/",
                title: "Именной сертификат участника эфира",
                text: "Официальный сертификат с вашим именем от RAD ACADEMY. Подтверждение участия — для портфолио, резюме и переговоров с заказчиками.",
              },
              {
                n: "Бонус 02/",
                title: "Чек-лист «3 шага к дизайн-проекту коммерческого объекта»",
                text: "Пошаговая система входа в коммерческий проект для дизайнера, который раньше работал только с жилыми.",
              },
              {
                n: "Бонус 03/",
                title: "Чек-лист «Ошибки при работе над концепцией»",
                text: "Топ ошибок, которые делают дизайнеры жилых интерьеров на этапе концепции для HoReCa. Проверьте свой текущий подход и устраните слабые места.",
              },
            ].map((card, i) => (
              <AOS key={i} delay={i * 80}>
                <div data-hover style={{
                  background: GRAPHITE, borderRadius: "24px", padding: "36px 32px",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  border: `1px solid rgba(212,245,66,0.2)`,
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"}
                >
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: `${LIME}22`, borderRadius: "100px",
                    padding: "6px 14px", marginBottom: "20px",
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: LIME }} />
                    <span style={{ ...ff, color: LIME, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{card.n}</span>
                  </div>
                  <div style={{ ...ffH, color: WHITE, fontSize: "20px", marginBottom: "14px", lineHeight: 1.3 }}>{card.title}</div>
                  <div style={{ ...ff, color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.6 }}>{card.text}</div>
                </div>
              </AOS>
            ))}
          </div>

          <AOS delay={280}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.45)", fontSize: "14px", marginBottom: "40px" }}>
              Бонусы получают только участники, присутствовавшие на эфире вживую.
            </p>
          </AOS>

          <AOS delay={320}><DoubleCTA onRegister={openRegister} /></AOS>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 10 · ОТЗЫВЫ УЧЕНИЦ (графит)
      ═══════════════════════════════════════════════════════ */}
      <ReviewsSection />

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 11 · FAQ (графит)
      ═══════════════════════════════════════════════════════ */}
      <section id="faq" style={{ background: GRAPHITE, padding: "clamp(60px, 10vh, 120px) clamp(20px, 5vw, 80px)" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <AOS><SectionLabel light>11 / Вопросы и ответы</SectionLabel></AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(36px, 5.5vw, 80px)",
              textTransform: "uppercase", lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "0 0 48px",
            }}>
              Частые вопросы
            </h2>
          </AOS>

          <div style={{ maxWidth: "860px" }}>
            {[
              { q: "У меня всё ещё идут жилые проекты. Зачем мне HoReCa?", a: "Затем, чтобы не оказаться в ситуации, когда жилой поток иссякнет. На эфире покажем, как добавить HoReCa-направление параллельно — без отказа от текущих клиентов." },
              { q: "Эфир бесплатный?", a: "Да. Полностью. Без скрытых условий." },
              { q: "Будет ли запись?", a: "Запись будет доступна только зарегистрированным участникам и только в течение ограниченного времени." },
              { q: "Я работаю с жилыми интерьерами 5+ лет. Это для меня?", a: "Да, эфир для опытных дизайнеров. Для тех, кто уже состоялся в жилом сегменте." },
              { q: "У меня нет коммерческих проектов в портфолио. Я смогу зайти в HoReCa?", a: "Да. Анна объяснит, как использовать ваш текущий опыт жилых для входа в HoReCa." },
              { q: "Будут ли продажи на эфире?", a: "В конце эфира Анна расскажет про обучающую программу RAD ACADEMY — без давления, только для тех, кому это нужно." },
              { q: "Сколько длится эфир?", a: "75 минут основной программы + ответы на вопросы." },
              { q: "Как подключиться?", a: "После регистрации придёт письмо со ссылкой. За час до эфира — напоминание." },
            ].map((item, i) => (
              <AOS key={i} delay={i * 50}>
                <AccordionItem title={item.q}>{item.a}</AccordionItem>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ЭКРАН 12 · ФИНАЛЬНЫЙ CTA (лайм)
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: LIME, padding: "clamp(80px, 14vh, 160px) clamp(20px, 5vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        textAlign: "center", minHeight: "80vh",
        flexDirection: "column",
      }}>
        <div style={{ maxWidth: "1000px" }}>
          <AOS>
            <div style={{
              ...ff, color: "rgba(26,26,26,0.5)", fontSize: "13px",
              letterSpacing: "0.2em", textTransform: "uppercase",
              marginBottom: "28px",
            }}>
              12.05 · 15:00 МСК
            </div>
          </AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(40px, 8vw, 120px)",
              textTransform: "uppercase", lineHeight: 0.88,
              letterSpacing: "-0.03em", margin: "0 0 32px",
            }}>
              Ждать — значит терять.<br />
              75 минут — и вы знаете,<br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>где искать заказы.</span>
            </h2>
          </AOS>

          <AOS delay={160}>
            <p style={{
              ...ff, color: "rgba(26,26,26,0.65)", fontSize: "18px",
              lineHeight: 1.6, marginBottom: "48px",
            }}>
              Бесплатный эфир Анны Симоновой. 12 мая в 15:00 МСК. Конкретика, цифры, дорожная карта.
            </p>
          </AOS>

          <AOS delay={220}>
            <button
              onClick={() => { openRegister(); ym(107087337, "reachGoal", "roadtohoreca_final_cta"); }}
              style={{
                background: GRAPHITE, color: LIME,
                borderRadius: "100px", padding: "22px 56px",
                border: "none", cursor: "pointer",
                fontWeight: 700, fontSize: "17px", letterSpacing: "0.08em",
                textTransform: "uppercase", ...ff,
                transition: "all 0.3s ease",
                boxShadow: "0 8px 40px rgba(26,26,26,0.3)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 16px 60px rgba(26,26,26,0.4)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 40px rgba(26,26,26,0.3)";
              }}
            >
              Зарегистрироваться на эфир →
            </button>
          </AOS>

          <AOS delay={280}>
            <p style={{
              ...ff, color: "rgba(26,26,26,0.45)", fontSize: "13px",
              marginTop: "20px", letterSpacing: "0.05em",
            }}>
              Бесплатно · Онлайн · Запись только зарегистрированным
            </p>
          </AOS>
        </div>
      </section>

      {/* ─── ФУТЕР ──────────────────────────────────────────────── */}
      <footer style={{ background: "#0D0C0B", padding: "40px 48px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ width: 40, height: 1, background: LIME, margin: "0 auto 36px", opacity: 0.6 }} />
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <img src="https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/c9557609-04c7-411a-a6d8-97ee87fa41f3.png" alt="RAD ACADEMY" style={{ height: 28, width: "auto", objectFit: "contain", filter: "invert(1) brightness(2)" }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", margin: 0, lineHeight: 1.6, ...ff }}>
              © 2026 ИП Вылегжанина А.С.<br />
              <a href="https://radacademy.ru" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>radacademy.ru</a>
              {" · "}
              <a href="mailto:mail@onlinerad.ru" style={{ color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>mail@onlinerad.ru</a>
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "Telegram", href: "https://t.me/rad_academy_design" },
                { label: "ВКонтакте", href: "https://vk.com/radacademy" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", textDecoration: "none", ...ff, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = LIME)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
                >{s.label}</a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Публичная оферта", href: "https://radacademy.ru/offer" },
              { label: "Политика обработки персональных данных", href: "https://radacademy.ru/privacy_policy" },
              { label: "Согласие на обработку персональных данных", href: "https://radacademy.ru/consent_user" },
              { label: "Контактная информация", href: "https://radacademy.ru/contacts" },
            ].map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", textDecoration: "none", lineHeight: 1.6, ...ff, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = LIME)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
              >{link.label}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ─── АДАПТИВНЫЕ СТИЛИ ─────────────────────────────────────── */}
      <style>{`
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .grid-cols-1-md { grid-template-columns: 1fr !important; }
          .grid-cols-2-md { grid-template-columns: 1fr 1fr !important; }
          .reviews-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .grid-cols-2-md { grid-template-columns: 1fr !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
        * { box-sizing: border-box; }
        body { cursor: none; }
        @media (hover: none) {
          body { cursor: auto; }
        }
        @keyframes pulse-lime {
          0% { box-shadow: 0 0 0 0 rgba(212,245,66,0.5); }
          70% { box-shadow: 0 0 0 18px rgba(212,245,66,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,245,66,0); }
        }
        @keyframes arrow-bounce-left {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-5px); }
        }
        @keyframes arrow-bounce-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}