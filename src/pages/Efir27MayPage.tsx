import { useEffect, useRef, useState, useCallback } from "react";

// ─── КОНСТАНТЫ ────────────────────────────────────────────────────────────────
const LIME = "#D4F542";
const GRAPHITE = "#1A1A1A";
const CREAM = "#F5F5F0";
const WHITE = "#FFFFFF";

const SPEAKER_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/fb62c289-24f2-49f0-a3e9-8e261cfa1e2f.jpg";
const HERO_BG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/9d1db74b-0dc0-4ba2-a40d-e112616dd6d1.jpg";
const CASE_BG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/34fe5a3d-a4e4-48a7-816a-7ac08e810d1e.jpg";

const ffH: React.CSSProperties = { fontFamily: "'SangBleu Kingdom', 'Cormorant', Georgia, serif" };
const ff: React.CSSProperties = { fontFamily: "'Basis Grotesque Pro', 'IBM Plex Sans', sans-serif" };

// ─── ХЕЛПЕРЫ ──────────────────────────────────────────────────────────────────
const ym = (...args: unknown[]) => {
  const w = window as unknown as Record<string, (...a: unknown[]) => void>;
  if (w["ym"]) w["ym"](...args);
};

const vkGoal = (goal: string) => {
  const w = window as unknown as { _tmr?: Array<Record<string, unknown>> };
  if (w._tmr) {
    w._tmr.push({ type: "reachGoal", id: "3761153", goal });
  }
};

// ─── ФОРМА GETCOURSE ──────────────────────────────────────────────────────────
const GC_BASE_SRC = "https://cabinet.onlinerad.ru/pl/lite/widget/widget?id=1606908";
const GC_SUCCESS_URL = "cabinet.onlinerad.ru/sps_web";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const YM_COUNTER = 107087337;

const getUtmParams = (): Record<string, string> => {
  const sp = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  UTM_PARAMS.forEach(k => { if (sp.has(k)) result[k] = sp.get(k)!; });
  return result;
};

const getGcSrc = (clientId?: string) => {
  const utms = getUtmParams();
  const extra = new URLSearchParams(utms as Record<string, string>);
  if (clientId) extra.set("ym_uid", clientId);
  const extraStr = extra.toString();
  return extraStr ? `${GC_BASE_SRC}&${extraStr}` : GC_BASE_SRC;
};

const getYmClientId = (): Promise<string | null> =>
  new Promise(resolve => {
    const w = window as unknown as Record<string, (...a: unknown[]) => void>;
    if (!w["ym"]) return resolve(null);
    try {
      w["ym"](YM_COUNTER, "getClientID", (id: string) => resolve(id ?? null));
      setTimeout(() => resolve(null), 2000);
    } catch { resolve(null); }
  });

const GetCourseForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(420);
  const [gcSrc, setGcSrc] = useState(() => getGcSrc());
  const firedRef = useRef(false);

  useEffect(() => {
    getYmClientId().then(clientId => {
      setGcSrc(getGcSrc(clientId ?? undefined));
    });
  }, []);

  useEffect(() => {
    firedRef.current = false;
    const fireOnce = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      onSuccess();
    };
    const handleMessage = (e: MessageEvent) => {
      if (!e.origin.includes("onlinerad.ru")) return;
      const raw = typeof e.data === "string" ? e.data : JSON.stringify(e.data ?? "");
      const successKeywords = ["form_submitted", "success", "order_added", "lead", "purchase"];
      if (successKeywords.some(k => raw.toLowerCase().includes(k))) fireOnce();
      if (e.data?.height) setHeight(Number(e.data.height));
    };
    window.addEventListener("message", handleMessage);
    const iframe = iframeRef.current;
    let loadCount = 0;
    const handleLoad = () => {
      loadCount++;
      if (loadCount > 1) fireOnce();
    };
    iframe?.addEventListener("load", handleLoad);
    let observer: PerformanceObserver | null = null;
    try {
      observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes(GC_SUCCESS_URL)) fireOnce();
        }
      });
      observer.observe({ type: "navigation", buffered: true });
    } catch (_e) { /* not supported */ }
    return () => {
      window.removeEventListener("message", handleMessage);
      iframe?.removeEventListener("load", handleLoad);
      observer?.disconnect();
    };
  }, [onSuccess]);

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <iframe
        ref={iframeRef}
        src={gcSrc}
        style={{ width: "100%", height: `${height}px`, border: "none", display: "block" }}
        allowFullScreen
        scrolling="no"
      />
    </div>
  );
};

// ─── КАСТОМНЫЙ КУРСОР ─────────────────────────────────────────────────────────
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!(t.closest("button") || t.closest("a") || t.closest("[data-hover]")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
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

// ─── AOS КОМПОНЕНТ ────────────────────────────────────────────────────────────
const AOS = ({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) => (
  <div className="aos-item" style={{
    opacity: 0, transform: "translateY(32px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    ...style,
  }}>{children}</div>
);

// ─── СЧЁТЧИК ЧИСЛА (анимация от 0) ───────────────────────────────────────────
const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}{suffix}</span>;
};

// ─── ХЕДЕР ────────────────────────────────────────────────────────────────────
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
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ ...ffH, color: WHITE, fontSize: "20px", letterSpacing: "0.05em", fontWeight: 500 }}>
            RAD <span style={{ color: LIME }}>ACADEMY</span>
          </span>
        </a>

        <nav style={{ display: "flex", gap: "32px", alignItems: "center" }} className="hide-mobile">
          {[
            { label: "27.05 · 15:00", id: "hero" },
            { label: "Регистрация", id: "register" },
            { label: "Программа", id: "program" },
            { label: "Спикер", id: "speaker" },
          ].map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.75)", fontSize: "14px", letterSpacing: "0.05em",
              ...ff, transition: "color 0.2s",
            }}>{n.label}</button>
          ))}
        </nav>

        <button onClick={() => { onRegister(); ym(YM_COUNTER, "reachGoal", "efir27may_header_cta"); }} style={{
          background: LIME, color: GRAPHITE, border: "none", cursor: "pointer",
          padding: "10px 22px", borderRadius: "100px", fontSize: "13px",
          fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", ...ff,
          transition: "all 0.3s ease",
        }} className="hide-mobile">
          Принять участие
        </button>

        <button onClick={() => setMenuOpen(v => !v)} className="show-mobile" style={{
          background: "none", border: "none", cursor: "pointer", color: WHITE, fontSize: "22px",
        }}>☰</button>
      </div>

      {menuOpen && (
        <div style={{ background: GRAPHITE, padding: "20px 40px 28px", borderTop: `1px solid rgba(212,245,66,0.1)` }}>
          {[
            { label: "27.05 · 15:00", id: "hero" },
            { label: "Регистрация", id: "register" },
            { label: "Программа", id: "program" },
            { label: "Спикер", id: "speaker" },
          ].map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.8)", fontSize: "16px", padding: "10px 0",
              ...ff, borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>{n.label}</button>
          ))}
          <button onClick={() => { onRegister(); setMenuOpen(false); }} style={{
            marginTop: "16px", background: LIME, color: GRAPHITE, border: "none",
            cursor: "pointer", padding: "14px 28px", borderRadius: "100px",
            fontSize: "14px", fontWeight: 600, textTransform: "uppercase", ...ff, width: "100%",
          }}>Принять участие</button>
        </div>
      )}
    </header>
  );
};

// ─── ДВОЙНАЯ КНОПКА ───────────────────────────────────────────────────────────
const DoubleCTA = ({ onRegister, light = false }: { onRegister: () => void; light?: boolean }) => (
  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
    <button onClick={() => { onRegister(); ym(YM_COUNTER, "reachGoal", "efir27may_cta_click"); }} style={{
      background: LIME, color: GRAPHITE, border: "none", cursor: "pointer",
      padding: "18px 36px", borderRadius: "100px", fontSize: "15px",
      fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", ...ff,
      transition: "all 0.3s ease",
    }}>Принять участие</button>
    <a href="https://t.me/+QgiLIa1gFRY4Y2Iy" target="_blank" rel="noopener noreferrer" style={{
      background: "transparent", color: light ? GRAPHITE : WHITE,
      border: `2px solid ${light ? GRAPHITE : "rgba(255,255,255,0.3)"}`,
      cursor: "pointer", padding: "18px 36px", borderRadius: "100px", fontSize: "15px",
      fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", ...ff,
      transition: "all 0.3s ease", textDecoration: "none", display: "inline-block",
    }}>Задать вопрос</a>
  </div>
);

// ─── АККОРДЕОН ────────────────────────────────────────────────────────────────
const AccordionItem = ({ title, children, light = false }: { title: string; children: React.ReactNode; light?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: light ? WHITE : GRAPHITE,
      border: `1px solid ${light ? "rgba(26,26,26,0.1)" : "rgba(212,245,66,0.15)"}`,
      borderRadius: "16px", marginBottom: "12px", overflow: "hidden",
      transition: "all 0.3s ease",
    }}>
      <button onClick={() => setOpen(v => !v)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "24px 28px", background: "none", border: "none", cursor: "pointer",
        color: light ? GRAPHITE : WHITE, textAlign: "left", ...ff,
        fontSize: "16px", fontWeight: 600, letterSpacing: "0.02em",
      }}>
        <span style={{ textTransform: "uppercase" }}>{title}</span>
        <span style={{
          color: LIME, fontSize: "22px", fontWeight: 300, lineHeight: 1,
          transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "none",
          flexShrink: 0, marginLeft: "16px",
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "0 28px 24px", color: light ? "rgba(26,26,26,0.7)" : "rgba(255,255,255,0.7)", ...ff, fontSize: "15px", lineHeight: 1.7 }}>
          {children}
        </div>
      )}
    </div>
  );
};

// ─── ГЛАВНЫЙ КОМПОНЕНТ ────────────────────────────────────────────────────────
const Efir27MayPage = () => {
  const [registerOpen, setRegisterOpen] = useState(false);

  const openRegister = useCallback(() => {
    setRegisterOpen(true);
    ym(YM_COUNTER, "reachGoal", "efir27may_open_register");
    vkGoal("view_registration");
  }, []);

  useEffect(() => {
    ym(YM_COUNTER, "reachGoal", "efir27may_page_view");
  }, []);

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

  const sectionLabel = (num: string, text: string, dark = false) => (
    <div style={{
      ...ff, color: dark ? "rgba(26,26,26,0.5)" : LIME,
      fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase",
      marginBottom: "24px", fontWeight: 500,
    }}>{num} / {text}</div>
  );

  return (
    <div style={{ background: GRAPHITE, overflowX: "hidden" }}>
      <CustomCursor />
      <Header onRegister={openRegister} />

      {/* ЭКРАН 1 · HERO */}
      <section id="hero" style={{
        minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 0 80px",
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(26,26,26,0.97) 0%, rgba(26,26,26,0.6) 50%, rgba(26,26,26,0.3) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "0 40px", width: "100%" }}>
          <AOS>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "rgba(26,26,26,0.7)", border: `1px solid ${LIME}30`,
              borderRadius: "100px", padding: "8px 18px", marginBottom: "32px",
              ...ff, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: LIME, flexShrink: 0, animation: "pulse-lime 2s infinite", display: "inline-block" }} />
              Бесплатный онлайн-эфир · 27 мая · 15:00 МСК
            </div>
          </AOS>

          <AOS delay={100}>
            <h1 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(52px, 9vw, 128px)",
              textTransform: "uppercase", lineHeight: 0.9,
              letterSpacing: "-0.03em", margin: "0 0 16px",
              fontWeight: 400,
            }}>
              Из жилого<br />
              <span style={{ fontStyle: "italic", fontSize: "0.8em" }}>в HoReCa</span>
            </h1>
          </AOS>

          <AOS delay={180}>
            <p style={{
              ...ff, color: "rgba(255,255,255,0.65)", fontSize: "clamp(16px, 2vw, 22px)",
              lineHeight: 1.5, margin: "0 0 16px", maxWidth: "580px",
            }}>как поднять чек в 2–3 раза</p>
          </AOS>

          <AOS delay={240}>
            <p style={{
              ...ff, color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px, 1.5vw, 18px)",
              lineHeight: 1.6, margin: "0 0 48px", maxWidth: "560px",
            }}>
              Один проект отеля = 3–4 жилых проекта по чеку.<br />
              Проект отеля за 4,5 млн ₽ мы делаем за 1,5 месяца.
            </p>
          </AOS>

          <AOS delay={300}>
            <DoubleCTA onRegister={openRegister} />
          </AOS>
        </div>
      </section>

      {/* ЭКРАН 2 · БОЛЬ РЫНКА */}
      <section id="register" style={{ background: GRAPHITE, padding: "120px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <AOS>{sectionLabel("01", "Реальность рынка")}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(32px, 5vw, 72px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 24px", maxWidth: "900px",
            }}>
              Отельеры готовы платить за дизайн-проект{" "}
              <span style={{ color: LIME }}>2–3 раза</span> больше
            </h2>
          </AOS>

          <AOS delay={140}>
            <p style={{ ...ff, color: "rgba(255,255,255,0.6)", fontSize: "20px", margin: "0 0 64px" }}>
              А вы продолжаете брать жилые за стандартный чек.
            </p>
          </AOS>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginBottom: "56px" }} className="grid-cols-1-md">
            <AOS delay={180}>
              <p style={{ ...ff, color: "rgba(255,255,255,0.65)", fontSize: "17px", lineHeight: 1.8 }}>
                Это не преувеличение. Это реальная ситуация на российском рынке HoReCa.<br /><br />
                Отельеры нанимают дизайнеров жилых интерьеров — и через 1–2 месяца понимают, что проект не работает.
              </p>
            </AOS>
            <AOS delay={220}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "не учтены отельные стандарты",
                  "не учтена специфика бизнеса и операционки",
                  "не продумано, как объект будет управляться после открытия",
                  "красиво на рендере, но не выживает в эксплуатации",
                ].map((item, i) => (
                  <li key={i} style={{
                    ...ff, color: "rgba(255,255,255,0.7)", fontSize: "16px", lineHeight: 1.7,
                    padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "flex-start", gap: "12px",
                  }}>
                    <span style={{ color: LIME, fontWeight: 700, flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </AOS>
          </div>

          <AOS delay={280}>
            <div style={{
              background: LIME, borderRadius: "20px", padding: "36px 40px",
              ...ff, color: GRAPHITE, fontSize: "18px", lineHeight: 1.7, fontWeight: 500,
            }}>
              Это не про деньги. Это про специфические знания HoReCa, без которых проект отеля не работает. Этим знаниям можно научиться — и навсегда выйти на другой уровень чека.
            </div>
          </AOS>

          <AOS delay={340} style={{ marginTop: "48px" }}>
            <DoubleCTA onRegister={openRegister} />
          </AOS>
        </div>
      </section>

      {/* ЭКРАН 3 · ДЛЯ КОГО */}
      <section style={{ background: LIME, padding: "120px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <AOS>{sectionLabel("02", "Для кого эфир", true)}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(32px, 5vw, 72px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 20px", maxWidth: "900px",
            }}>
              Этот эфир — для опытных дизайнеров жилых интерьеров
            </h2>
          </AOS>

          <AOS delay={140}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.65)", fontSize: "18px", margin: "0 0 56px", maxWidth: "680px" }}>
              Если хотя бы 3 из 6 пунктов про вас — приходите. Эфир окупит себя в первые 20 минут.
            </p>
          </AOS>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="grid-cols-1-md">
            {[
              { num: "01", title: "Вы дизайнер с опытом", text: "Делаете жилые интерьеры 3+ года, у вас портфолио и поток клиентов." },
              { num: "02", title: "Вы упёрлись в потолок чека", text: "Чек растёт медленно. Каждый шаг по цене даётся сложнее." },
              { num: "03", title: "Вам стало скучно", text: "Жилые проекты повторяются. Вы хотите концепцию, историю, масштаб." },
              { num: "04", title: "Хотите работать меньше — зарабатывать больше", text: "Вместо 4–5 квартир — один большой проект с другим чеком." },
              { num: "05", title: "Пробовали выйти на коммерческие объекты", text: "Получали отказы или давление по цене." },
              { num: "06", title: "Видите рост HoReCa", text: "Понимаете: заходить нужно сейчас." },
            ].map((card, i) => (
              <AOS key={i} delay={i * 60}>
                <div style={{
                  background: WHITE, borderRadius: "24px", padding: "32px",
                  height: "100%", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }} data-hover>
                  <div style={{ ...ff, color: LIME, fontSize: "12px", letterSpacing: "0.2em", marginBottom: "16px", fontWeight: 600 }}>{card.num}/</div>
                  <div style={{ ...ffH, color: GRAPHITE, fontSize: "22px", marginBottom: "12px", lineHeight: 1.2 }}>{card.title}</div>
                  <div style={{ ...ff, color: "rgba(26,26,26,0.65)", fontSize: "15px", lineHeight: 1.7 }}>{card.text}</div>
                </div>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* ЭКРАН 4 · ЧТО ПОЛУЧИТЕ */}
      <section style={{ background: CREAM, padding: "120px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <AOS>{sectionLabel("03", "Что заберёте с эфира", true)}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(28px, 4vw, 60px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 20px", maxWidth: "920px",
            }}>
              Давайте представим, что после эфира у вас появится ясная карта перехода в HoReCa
            </h2>
          </AOS>

          <AOS delay={140}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.6)", fontSize: "18px", margin: "0 0 56px" }}>
              Что конкретно вы заберёте за 75 минут эфира
            </p>
          </AOS>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }} className="grid-cols-1-md">
            {[
              { num: "01", title: "Понимание мышления отельера", text: "По каким критериям он выбирает дизайнера и почему отказывает.", dark: false },
              { num: "02", title: "Анатомия работающего КП", text: "Структура, язык, цифры, смыслы. Что должно быть в КП, чтобы его дочитали до конца.", dark: true },
              { num: "03", title: "Список «маркеров жилого дизайнера»", text: "Признаки, по которым отельер за 5 минут видит ваш бэкграунд и закрывает диалог.", dark: false },
              { num: "04", title: "Математика перехода", text: "Как один проект отеля заменяет 3–4 жилых по чеку.", dark: true },
              { num: "05", title: "Точка входа", text: "С чего начать переход уже на этой неделе.", dark: false },
              { num: "06", title: "Реальные кейсы", text: "Проект отеля 4,5 млн ₽ за 1,5 месяца — разбор от первого лица.", dark: true },
            ].map((card, i) => (
              <AOS key={i} delay={i * 60}>
                <div style={{
                  background: card.dark ? GRAPHITE : LIME,
                  borderRadius: "24px", padding: "40px",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }} data-hover>
                  <div style={{ ...ff, color: card.dark ? LIME : GRAPHITE, fontSize: "12px", letterSpacing: "0.2em", marginBottom: "16px", fontWeight: 600, opacity: 0.7 }}>{card.num}/</div>
                  <div style={{ ...ffH, color: card.dark ? WHITE : GRAPHITE, fontSize: "24px", marginBottom: "12px", lineHeight: 1.2, textTransform: "uppercase" }}>{card.title}</div>
                  <div style={{ ...ff, color: card.dark ? "rgba(255,255,255,0.65)" : "rgba(26,26,26,0.65)", fontSize: "15px", lineHeight: 1.7 }}>{card.text}</div>
                </div>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* ЭКРАН 5 · РЕАЛЬНЫЙ КЕЙС */}
      <section style={{ background: GRAPHITE, padding: "0 0 120px" }}>
        <div style={{
          height: "420px", backgroundImage: `url(${CASE_BG})`,
          backgroundSize: "cover", backgroundPosition: "center",
          position: "relative", marginBottom: "80px",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0.9) 100%)" }} />
        </div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px" }}>
          <AOS>{sectionLabel("04", "Реальный кейс")}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(32px, 5vw, 72px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 56px",
            }}>
              Другой уровень чека — на цифрах
            </h2>
          </AOS>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "48px" }} className="grid-cols-1-md">
            <AOS delay={120}>
              <div style={{ background: CREAM, borderRadius: "24px", padding: "40px" }}>
                <div style={{ ...ff, color: "rgba(26,26,26,0.5)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "24px" }}>Дизайнер жилых интерьеров</div>
                {[
                  ["Чек", "600 000 – 1 200 000 ₽"],
                  ["Срок", "2–4 месяца"],
                  ["Параллельных проектов", "3–5"],
                  ["Клиент", "Частный заказчик"],
                  ["Развитие", "Точечное"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(26,26,26,0.1)" }}>
                    <span style={{ ...ff, color: "rgba(26,26,26,0.55)", fontSize: "15px" }}>{k}</span>
                    <span style={{ ...ff, color: GRAPHITE, fontSize: "15px", fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </AOS>
            <AOS delay={180}>
              <div style={{ background: LIME, borderRadius: "24px", padding: "40px" }}>
                <div style={{ ...ff, color: "rgba(26,26,26,0.6)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "24px" }}>Дизайнер HoReCa</div>
                {[
                  ["Чек", "от 4 500 000 ₽"],
                  ["Срок", "1,5 месяца"],
                  ["Параллельных проектов", "1–2"],
                  ["Клиент", "Бизнесмен-отельер"],
                  ["Развитие", "Ниши, рост репутации"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid rgba(26,26,26,0.15)" }}>
                    <span style={{ ...ff, color: "rgba(26,26,26,0.6)", fontSize: "15px" }}>{k}</span>
                    <span style={{ ...ff, color: GRAPHITE, fontSize: "15px", fontWeight: 700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </AOS>
          </div>

          <AOS delay={240}>
            <p style={{ ...ff, color: "rgba(255,255,255,0.6)", fontSize: "17px", lineHeight: 1.7, textAlign: "center", marginBottom: "48px" }}>
              Это реальный текущий проект Анны Симоновой и команды RAD ACADEMY.<br />
              И это не редкий кейс — это система.
            </p>
          </AOS>

          <AOS delay={280}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DoubleCTA onRegister={openRegister} />
            </div>
          </AOS>
        </div>
      </section>

      {/* ЭКРАН 6 · ПРОГРАММА */}
      <section id="program" style={{ background: LIME, padding: "120px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <AOS>{sectionLabel("05", "Программа", true)}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(32px, 5vw, 64px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 16px",
            }}>Знакомьтесь с программой эфира</h2>
          </AOS>

          <AOS delay={120}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.65)", fontSize: "17px", margin: "0 0 48px" }}>
              75 минут основной программы + ответы на вопросы
            </p>
          </AOS>

          {[
            { title: "Вступление", text: "Почему отельеры платят за дизайн дважды и трижды. Что происходит с рынком отелей в России в 2026." },
            { title: "Блок 1 · Как мыслит отельер", text: "4 фильтра, через которые проходит каждое КП. Что отельер покупает на самом деле." },
            { title: "Блок 2 · Признаки «жилого» дизайнера", text: "Что выдаёт вас в КП с первой страницы. Какие фразы убивают доверие." },
            { title: "Блок 3 · Анатомия КП для отельера", text: "Структура работающего КП. Язык бизнеса вместо языка вкуса." },
            { title: "Блок 4 · Математика перехода и кейс", text: "Один отель = 3–4 квартиры. Кейс: 4,5 млн ₽ за 1,5 месяца." },
            { title: "Блок 5 · Точка входа", text: "Дорожная карта перехода. 3 сценария: быстрый, плановый, постепенный." },
            { title: "Ответы на вопросы", text: "Отвечаем на вопросы участников в прямом эфире." },
          ].map((item, i) => (
            <AOS key={i} delay={i * 50}>
              <AccordionItem title={item.title}>{item.text}</AccordionItem>
            </AOS>
          ))}
        </div>
      </section>

      {/* ЭКРАН 7 · О СПИКЕРЕ */}
      <section id="speaker" style={{ background: CREAM, padding: "120px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <AOS>{sectionLabel("06", "Ведущая эфира", true)}</AOS>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "80px", alignItems: "start" }} className="grid-cols-1-md">
            <AOS delay={80}>
              <div style={{
                borderRadius: "24px", overflow: "hidden",
                aspectRatio: "4/5", maxHeight: "700px",
              }}>
                <img src={SPEAKER_PHOTO} alt="Анна Симонова" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </AOS>

            <AOS delay={160}>
              <div>
                <h2 style={{
                  ...ffH, color: GRAPHITE,
                  fontSize: "clamp(28px, 3.5vw, 52px)",
                  textTransform: "uppercase", lineHeight: 1.0,
                  letterSpacing: "-0.02em", margin: "0 0 8px",
                }}>Анна Симонова</h2>
                <p style={{ ...ff, color: "rgba(26,26,26,0.55)", fontSize: "15px", marginBottom: "40px", textTransform: "uppercase", letterSpacing: "0.1em" }}>основатель RAD ACADEMY</p>

                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 48px" }}>
                  {[
                    "18 лет в коммерческом дизайне, более 100 реальных кейсов HoReCa по России и СНГ",
                    "Руководит и реализует проекты для флагманских ресторанов, кафе и отелей",
                    "RAD Academy: 1800 учеников, 1450 коммерческих проектов, сотни внедрённых методов",
                    "Автор ведущих программ по подготовке дизайнеров к работе с HoReCa",
                    "Жюри отраслевых конкурсов, лауреат Russian Hospitality Awards",
                  ].map((item, i) => (
                    <li key={i} style={{
                      ...ff, color: "rgba(26,26,26,0.7)", fontSize: "15px", lineHeight: 1.7,
                      padding: "12px 0", borderBottom: "1px solid rgba(26,26,26,0.08)",
                      display: "flex", alignItems: "flex-start", gap: "12px",
                    }}>
                      <span style={{ color: LIME, fontWeight: 700, flexShrink: 0, fontSize: "18px", lineHeight: "1.5" }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <blockquote style={{
                  ...ffH, color: GRAPHITE, fontStyle: "italic",
                  fontSize: "clamp(18px, 2vw, 26px)", lineHeight: 1.5,
                  borderLeft: `4px solid ${LIME}`, paddingLeft: "24px",
                  margin: 0,
                }}>
                  «Дизайн HoReCa — это не про красивые картинки. Это про то, как пространство работает на бизнес заказчика. Поэтому отельеры готовы платить совсем другие чеки тем, кто это понимает».
                  <footer style={{ ...ff, fontSize: "14px", color: "rgba(26,26,26,0.5)", fontStyle: "normal", marginTop: "16px", letterSpacing: "0.05em" }}>— Анна Симонова</footer>
                </blockquote>
              </div>
            </AOS>
          </div>
        </div>
      </section>

      {/* ЭКРАН 8 · РЫНОК */}
      <section style={{ background: GRAPHITE, padding: "120px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <AOS>{sectionLabel("07", "Рынок HoReCa")}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(32px, 5vw, 72px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 72px", maxWidth: "900px",
            }}>
              Почему сейчас — лучшее время для перехода в HoReCa
            </h2>
          </AOS>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "64px" }} className="grid-cols-2-md">
            {[
              { num: 5, suffix: "%", label: "рост рынка гостиничного бизнеса в России в год", prefix: "+" },
              { num: 1, suffix: " ТРЛН ₽", label: "прогнозируемый объём рынка HoReCa к 2027 году" },
              { num: 40000, suffix: "+", label: "объектов размещения в России — большинство ждут реновацию" },
              { num: 5, suffix: "%", label: "дизайнеров профессионально специализируются на HoReCa", prefix: "<" },
            ].map((stat, i) => (
              <AOS key={i} delay={i * 80}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ ...ffH, color: LIME, fontSize: "clamp(48px, 5vw, 80px)", lineHeight: 1, marginBottom: "16px" }}>
                    {stat.prefix || ""}<AnimatedNumber target={stat.num} suffix={stat.suffix} />
                  </div>
                  <p style={{ ...ff, color: "rgba(255,255,255,0.55)", fontSize: "14px", lineHeight: 1.6 }}>{stat.label}</p>
                </div>
              </AOS>
            ))}
          </div>

          <AOS delay={320}>
            <p style={{ ...ff, color: "rgba(255,255,255,0.55)", fontSize: "17px", lineHeight: 1.7, textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
              Через 1–2 года ниша заполнится. Те, кто заходит сейчас, будут работать с лучшими отельерами и проектами в ближайшие 5–10 лет.
            </p>
          </AOS>
        </div>
      </section>

      {/* ЭКРАН 9 · ОТЛИЧИЕ HORECA */}
      <section style={{ background: LIME, padding: "120px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <AOS>{sectionLabel("08", "Разница в мышлении", true)}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(28px, 4vw, 64px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 56px", maxWidth: "860px",
            }}>
              Что отличает дизайнера HoReCa от дизайнера жилых
            </h2>
          </AOS>

          <AOS delay={120}>
            <div style={{ borderRadius: "20px", overflow: "hidden", border: `2px solid ${GRAPHITE}20` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: GRAPHITE }}>
                {["Параметр", "Жилые", "HoReCa"].map((h, i) => (
                  <div key={i} style={{ padding: "20px 24px", ...ff, color: i === 2 ? LIME : "rgba(255,255,255,0.7)", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>{h}</div>
                ))}
              </div>
              {[
                ["Главная цель", "Сделать красиво", "Сделать так, чтобы работало на бизнес"],
                ["Язык", "Эстетика, вкус", "Концепция, ROI, операционка"],
                ["Стандарты", "Не критично", "Обязательно"],
                ["Эксплуатация", "Не учитывается", "На этапе концепции"],
                ["Клиент", "Частное лицо", "Бизнесмен, инвестор"],
                ["Чек", "Стандартный", "В 2–3 раза выше"],
                ["Срок", "2–4 месяца", "1,5–2 месяца"],
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: i % 2 === 0 ? "rgba(255,255,255,0.92)" : WHITE }}>
                  {row.map((cell, j) => (
                    <div key={j} style={{
                      padding: "18px 24px", ...ff,
                      color: j === 2 ? GRAPHITE : "rgba(26,26,26,0.6)",
                      fontSize: j === 0 ? "13px" : "15px",
                      fontWeight: j === 0 ? 600 : (j === 2 ? 600 : 400),
                      borderRight: j < 2 ? "1px solid rgba(26,26,26,0.08)" : "none",
                      letterSpacing: j === 0 ? "0.05em" : "normal",
                    }}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </AOS>

          <AOS delay={200}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.65)", fontSize: "18px", marginTop: "40px", fontWeight: 500 }}>
              Это разница не в опыте. Это разница в мышлении и системе.
            </p>
          </AOS>
        </div>
      </section>

      {/* ЭКРАН 10 · БОНУСЫ */}
      <section style={{ background: CREAM, padding: "120px 40px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <AOS>{sectionLabel("09", "Бонусы", true)}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(32px, 5vw, 72px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 20px",
            }}>Бонусы для участников эфира</h2>
          </AOS>

          <AOS delay={120}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.6)", fontSize: "17px", margin: "0 0 56px" }}>
              Что вы получите бесплатно за регистрацию и присутствие на эфире
            </p>
          </AOS>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "48px" }} className="grid-cols-1-md">
            {[
              { num: "01", title: "Именной сертификат участника эфира", text: "Официальный сертификат с вашим именем от RAD ACADEMY. Подтверждение участия — для портфолио, резюме и переговоров с заказчиками." },
              { num: "02", title: "Чек-лист «3 шага к дизайн-проекту коммерческого объекта»", text: "Пошаговая система входа в коммерческий проект для дизайнера, который раньше работал только с жилыми. От первого контакта до подписания договора." },
              { num: "03", title: "Чек-лист «Ошибки при работе над концепцией»", text: "Топ ошибок, которые делают дизайнеры жилых интерьеров на этапе концепции для HoReCa. Проверьте свой текущий подход и устраните слабые места." },
            ].map((card, i) => (
              <AOS key={i} delay={i * 80}>
                <div style={{
                  background: GRAPHITE, borderRadius: "24px", padding: "40px",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  height: "100%",
                }} data-hover>
                  <div style={{ ...ff, color: LIME, fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "20px", fontWeight: 600 }}>БОНУС {card.num}/</div>
                  <div style={{ ...ffH, color: WHITE, fontSize: "22px", textTransform: "uppercase", lineHeight: 1.2, marginBottom: "20px" }}>{card.title}</div>
                  <div style={{ ...ff, color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.7 }}>{card.text}</div>
                  <div style={{ marginTop: "28px", width: "40px", height: "40px", borderRadius: "50%", background: LIME, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: GRAPHITE, fontSize: "20px" }}>✓</span>
                  </div>
                </div>
              </AOS>
            ))}
          </div>

          <AOS delay={240}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.45)", fontSize: "14px", marginBottom: "48px", fontStyle: "italic" }}>
              Бонусы получают только участники, присутствовавшие на эфире вживую.
            </p>
          </AOS>

          <AOS delay={280}>
            <DoubleCTA onRegister={openRegister} light />
          </AOS>
        </div>
      </section>

      {/* ЭКРАН 11 · FAQ */}
      <section style={{ background: GRAPHITE, padding: "120px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <AOS>{sectionLabel("10", "Вопросы и ответы")}</AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: WHITE,
              fontSize: "clamp(32px, 5vw, 72px)",
              textTransform: "uppercase", lineHeight: 1.0,
              letterSpacing: "-0.02em", margin: "0 0 48px",
            }}>Частые вопросы</h2>
          </AOS>

          {[
            { q: "Эфир бесплатный?", a: "Да. Полностью. Без скрытых условий." },
            { q: "Будет ли запись?", a: "Запись будет доступна только зарегистрированным участникам и только в течение ограниченного времени." },
            { q: "Я работаю с жилыми интерьерами 5+ лет. Это для меня?", a: "Да, эфир для опытных дизайнеров. Для тех, кто уже состоялся в жилом сегменте." },
            { q: "У меня нет коммерческих проектов в портфолио. Я смогу зайти в HoReCa?", a: "Да. Анна объяснит, как использовать ваш текущий опыт жилых для входа в HoReCa." },
            { q: "Будут ли продажи на эфире?", a: "В конце эфира Анна расскажет про обучающую программу RAD ACADEMY — без давления, только для тех, кому это нужно." },
            { q: "Сколько длится эфир?", a: "75 минут основной программы + ответы на вопросы." },
            { q: "Как подключиться?", a: "После регистрации придёт письмо со ссылкой. За час до эфира — напоминание." },
          ].map((item, i) => (
            <AOS key={i} delay={i * 40}>
              <AccordionItem title={item.q}>{item.a}</AccordionItem>
            </AOS>
          ))}
        </div>
      </section>

      {/* ЭКРАН 12 · ФИНАЛЬНЫЙ CTA */}
      <section style={{ background: LIME, padding: "160px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <AOS>
            <div style={{ ...ff, color: "rgba(26,26,26,0.5)", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "48px" }}>
              27.05 · 15:00 МСК
            </div>
          </AOS>

          <AOS delay={80}>
            <h2 style={{
              ...ffH, color: GRAPHITE,
              fontSize: "clamp(48px, 9vw, 128px)",
              textTransform: "uppercase", lineHeight: 0.88,
              letterSpacing: "-0.03em", margin: "0 0 40px",
            }}>
              Один эфир<br />
              может изменить<br />
              вашу профессию<br />
              на 5 лет вперёд
            </h2>
          </AOS>

          <AOS delay={160}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.65)", fontSize: "18px", lineHeight: 1.6, marginBottom: "56px" }}>
              Через час после эфира вы будете смотреть на свою профессию иначе.<br />
              27 мая в 15:00 МСК. Бесплатно.
            </p>
          </AOS>

          <AOS delay={220}>
            <button onClick={() => { openRegister(); ym(YM_COUNTER, "reachGoal", "efir27may_final_cta"); }} style={{
              background: GRAPHITE, color: WHITE, border: "none", cursor: "pointer",
              padding: "24px 56px", borderRadius: "100px", fontSize: "18px",
              fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", ...ff,
              transition: "all 0.3s ease", marginBottom: "24px",
            }}>
              Зарегистрироваться на эфир →
            </button>
          </AOS>

          <AOS delay={280}>
            <p style={{ ...ff, color: "rgba(26,26,26,0.5)", fontSize: "14px", letterSpacing: "0.05em" }}>
              Бесплатно · Онлайн · Запись только зарегистрированным
            </p>
          </AOS>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer style={{ background: GRAPHITE, padding: "64px 40px", borderTop: `1px solid rgba(212,245,66,0.1)` }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px" }}>
          <div>
            <div style={{ ...ffH, color: WHITE, fontSize: "28px", letterSpacing: "0.05em", marginBottom: "12px" }}>
              RAD <span style={{ color: LIME }}>ACADEMY</span>
            </div>
            <p style={{ ...ff, color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              Школа архитектурного и интерьерного дизайна<br />
              Основатель: Анна Симонова
            </p>
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
            {[
              { label: "Контакты", href: "#" },
              { label: "Политика конфиденциальности", href: "#" },
              { label: "Договор оферты", href: "#" },
              { label: "Telegram", href: "https://t.me/+QgiLIa1gFRY4Y2Iy" },
            ].map(link => (
              <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
                ...ff, color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "none",
                transition: "color 0.2s", letterSpacing: "0.03em",
              }}>{link.label}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* МОДАЛЬНОЕ ОКНО РЕГИСТРАЦИИ */}
      {registerOpen && (
        <div onClick={() => setRegisterOpen(false)} style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          padding: "16px", overflowY: "auto",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: WHITE, borderRadius: "20px",
            width: "100%", maxWidth: "520px",
            padding: "48px 40px 40px",
            position: "relative", margin: "auto",
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
              const utms = getUtmParams();
              ym(YM_COUNTER, "reachGoal", "efir27may_form_submit", Object.keys(utms).length ? utms : undefined);
              vkGoal("efir27may_lead");
            }} />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .grid-cols-1-md { grid-template-columns: 1fr !important; }
          .grid-cols-2-md { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .grid-cols-2-md { grid-template-columns: 1fr !important; }
        }
        .show-mobile { display: none; }
        * { box-sizing: border-box; }
        body { cursor: none; }
        @media (hover: none) { body { cursor: auto; } }
        @keyframes pulse-lime {
          0% { box-shadow: 0 0 0 0 rgba(212,245,66,0.5); }
          70% { box-shadow: 0 0 0 18px rgba(212,245,66,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,245,66,0); }
        }
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        [data-hover]:hover { transform: translateY(-6px); }
        button:hover { opacity: 0.92; }
      `}</style>
    </div>
  );
};

export default Efir27MayPage;
