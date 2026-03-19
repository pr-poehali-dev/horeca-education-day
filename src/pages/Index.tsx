import { useEffect, useRef, useState } from "react";

const SPEAKER_IMG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/de6895f0-5c32-4517-bdca-8a92e59d8d34.jpg";
const HERO_IMG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/81fb7ff7-0365-4d7f-88e1-8f9ee7503af6.jpg";
const LOGO_FIGURE = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/90299185-f0e1-4b53-9a1c-60b619e39683.jpg";

const BG = "#5B090A";
const CARD_BG = "#7A1012";
const GOLD = "#C9A96E";
const WHITE = "#FFFFFF";
const ff: React.CSSProperties = { fontFamily: "'Basis Grotesque Pro', 'IBM Plex Sans', sans-serif" };
const ffH: React.CSSProperties = { fontFamily: "'SangBleu Kingdom', 'Cormorant', Georgia, serif" };

const aosBase: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(28px)",
  transition: "opacity 0.75s ease, transform 0.75s ease",
};

// ──────────────────────────────────────
// ОБЩИЕ КОМПОНЕНТЫ
// ──────────────────────────────────────

const GoldDivider = () => (
  <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E 30%, #C9A96E 70%, transparent)", margin: "0" }} />
);

const LogoRAD = () => (
  <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
    <span style={{
      ...ffH,
      color: WHITE,
      fontWeight: 700,
      fontSize: "18px",
      letterSpacing: "0.22em",
      whiteSpace: "nowrap",
    }}>
      RAD ACADEMY
    </span>
  </a>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "9999px",
    padding: "6px 18px",
    fontSize: "14px",
    color: WHITE,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.07)",
    ...ff,
  }}>
    {children}
  </span>
);

const BtnWhite = ({
  children,
  style,
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick ?? (() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" }))}
    style={{
      backgroundColor: WHITE,
      color: BG,
      borderRadius: "9999px",
      ...ff,
      fontWeight: 700,
      fontSize: "15px",
      letterSpacing: "0.07em",
      padding: "15px 38px",
      border: "none",
      cursor: "pointer",
      display: "inline-block",
      transition: "all 0.3s ease",
      ...style,
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.backgroundColor = GOLD;
      (e.currentTarget as HTMLButtonElement).style.color = WHITE;
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.backgroundColor = WHITE;
      (e.currentTarget as HTMLButtonElement).style.color = BG;
    }}
  >
    {children}
  </button>
);

// ──────────────────────────────────────
// ГЛАВНЫЙ КОМПОНЕНТ
// ──────────────────────────────────────

// ──────────────────────────────────────
// ПОПАП С ГЕТКУРС (нативная форма)
// ──────────────────────────────────────

const THANK_YOU_URL = "https://cabinet.onlinerad.ru/giftthankyou_hedonline";

const GCModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open || scriptLoaded.current) return;
    scriptLoaded.current = true;

    const fillUtm = () => {
      const params = new URLSearchParams(window.location.search);
      const get = (key: string) => params.get(key) || "";
      const fieldMap: Record<string, string> = {
        "988427": get("utm_source"),
        "988428": get("utm_medium"),
        "988429": get("utm_campaign"),
        "988430": get("utm_content"),
        "988431": get("utm_term"),
      };
      Object.entries(fieldMap).forEach(([id, val]) => {
        document.querySelectorAll<HTMLInputElement>(
          `input[name="formParams[dealCustomFields][${id}]"]`
        ).forEach(el => { el.value = val; });
      });
    };

    // Загружаем оригинальный скрипт виджета GetCourse — он сам рендерит форму
    const s = document.createElement("script");
    s.id = "86103eb0664cfd810877d0b170fd16bdf8bdd17a";
    s.src = "https://cabinet.onlinerad.ru/pl/lite/widget/script?id=1568955";
    s.async = true;
    // После загрузки скрипта заполняем UTM (даём 500мс на рендер формы)
    s.onload = () => setTimeout(fillUtm, 500);
    document.body.appendChild(s);

    // Страховочный повтор через 2с
    setTimeout(fillUtm, 2000);

    // Перехватываем успешную отправку
    const observer = new MutationObserver(() => {
      const success = document.querySelector(".lt-success, .lt-form-success, [data-form-success]");
      if (success) {
        observer.disconnect();
        const ym = (window as unknown as Record<string, (...args: unknown[]) => void>)['ym'];
        if (ym) {
          ym(107087337, 'reachGoal', 'submit_registration_form', {}, () => {
            window.location.href = THANK_YOU_URL;
          });
          setTimeout(() => { window.location.href = THANK_YOU_URL; }, 500);
        } else {
          window.location.href = THANK_YOU_URL;
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "480px",
          maxHeight: "calc(100vh - 48px)",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "sticky", top: "12px", float: "right", marginRight: "12px",
            background: "rgba(0,0,0,0.12)", border: "none", cursor: "pointer",
            color: "#333", fontSize: "18px", lineHeight: 1,
            zIndex: 10, padding: "6px 10px", borderRadius: "50%",
          }}
        >✕</button>

        {/* Контейнер — скрипт GetCourse сам рендерит сюда форму */}
        <div id="gc-widget-1568955" />
      </div>
    </div>
  );
};

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    (window as unknown as Record<string, (...args: unknown[]) => void>)['ym']?.(107087337, 'reachGoal', 'open_registration_modal');
  };
  const closeModal = () => setModalOpen(false);

  // Intersection Observer для AOS-анимаций
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.07 }
    );
    document.querySelectorAll(".aos").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Countdown до 24 марта 2026 19:00 мск (UTC+3)
  const TARGET = new Date("2026-03-24T19:00:00+03:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ backgroundColor: BG, color: WHITE, minHeight: "100vh", ...ff }}>
      <GCModal open={modalOpen} onClose={closeModal} />

      {/* ══════════════════════════════════════
          БЛОК 1 — HERO
      ══════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ padding: "20px 48px", display: "flex", alignItems: "center" }}>
          <LogoRAD />
        </header>

        <div className="hero-grid" style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: "48px",
          padding: "0 48px 64px",
          alignItems: "center",
        }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div className="aos" style={{ ...aosBase, display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Badge>🗓 24 марта</Badge>
              <Badge>💻 Онлайн</Badge>
              <Badge>🎓 Бесплатно</Badge>
            </div>

            <h1 className="aos" style={{
              ...aosBase, ...ffH,
              fontSize: "clamp(52px, 9vw, 104px)",
              lineHeight: 0.92,
              fontWeight: 700,
              color: WHITE,
              margin: 0,
              transitionDelay: "0.1s",
            }}>
              HORECA<br />
              <span style={{ color: GOLD }}>EDUCATION</span><br />
              DAY
            </h1>

            <p className="aos" style={{
              ...aosBase, ...ff,
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.85)",
              maxWidth: "560px",
              margin: 0,
              transitionDelay: "0.2s",
            }}>
              Как дизайнеру интерьера войти в HoReCa и зарабатывать на другом уровне — онлайн-воркшоп в формате{" "}
              <em style={{ color: GOLD }}>Гарвардского метода обучения Case Study</em>
            </p>

            <div className="aos" style={{ ...aosBase, display: "flex", flexDirection: "column", gap: "14px", transitionDelay: "0.3s" }}>
              <BtnWhite style={{ alignSelf: "flex-start" }} onClick={openModal}>
                ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →
              </BtnWhite>
              <p style={{ ...ff, fontSize: "13px", color: "rgba(255,255,255,0.42)", maxWidth: "460px", margin: 0, lineHeight: 1.5 }}>
                RAD ACADEMY — Топ-2 онлайн школа дизайна интерьера в рейтинге РБК · Анна Симонова — 18 лет практики, 100+ реализованных объектов
              </p>
            </div>
          </div>

          {/* Right photo */}
          <div className="aos" style={{ ...aosBase, transitionDelay: "0.2s" }}>
            <div style={{
              borderRadius: "20px",
              overflow: "hidden",
              height: "clamp(300px, 58vh, 620px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
              border: "1px solid rgba(201,169,110,0.25)",
              position: "relative",
            }}>
              <img src={HERO_IMG} alt="HoReCa интерьер" fetchPriority="high" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        <div style={{ padding: "0 48px" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 2 — ДЛЯ КОГО
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <h2 className="aos" style={{ ...aosBase, ...ffH, fontSize: "clamp(32px, 4.5vw, 62px)", fontWeight: 600, lineHeight: 1.1, color: WHITE, marginBottom: "48px" }}>
            HoReCa Education Day —<br /><span style={{ color: GOLD }}>для вас, если:</span>
          </h2>

          <div className="aos" style={{ ...aosBase, display: "flex", flexDirection: "column", gap: "18px", transitionDelay: "0.1s" }}>
            {[
              "У вас 3+ лет опыта в дизайне интерьера",
              "Работаете с жилыми проектами и упёрлись в потолок по доходу",
              "Надоел бежевый минимализм — хочется масштабных объектов",
              "Хотите работать с отелями, ресторанами, кафе — но не знаете как войти и как считать услуги",
              "Нужна не теория, а живой кейс и работающая система",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>✓</span>
                <span style={{ ...ff, fontSize: "clamp(16px, 1.3vw, 18px)", lineHeight: 1.65, color: "rgba(255,255,255,0.9)" }}>{item}</span>
              </div>
            ))}
          </div>

          <p className="aos" style={{ ...aosBase, ...ff, fontSize: "clamp(16px, 1.2vw, 19px)", fontStyle: "italic", color: "rgba(255,255,255,0.72)", marginTop: "36px", transitionDelay: "0.2s" }}>
            Узнали себя? HoReCa Education Day создан именно для вас.
          </p>
          <div className="aos" style={{ ...aosBase, marginTop: "32px", transitionDelay: "0.3s" }}>
            <BtnWhite onClick={openModal}>ХОЧУ ПОПАСТЬ НА ВОРКШОП →</BtnWhite>
          </div>
        </div>
        <div style={{ maxWidth: "860px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 3 — ЧТО ПОЛУЧИТЕ
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="aos" style={{ ...aosBase, ...ffH, fontSize: "clamp(28px, 3.8vw, 56px)", fontWeight: 600, lineHeight: 1.15, color: WHITE, textAlign: "center", maxWidth: "780px", margin: "0 auto 56px" }}>
            За 1 вечер вы получите то, на что другие тратят <span style={{ color: GOLD }}>годы проб и ошибок</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {[
              {
                img: "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/81fb7ff7-0365-4d7f-88e1-8f9ee7503af6.jpg",
                title: "МЕТОДОЛОГИЯ РАСЧЁТА УСЛУГ",
                desc: "Как считать стоимость услуг в HoReCa — не квадратными метрами, а по профессиональной системе",
              },
              {
                img: "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/c9e96325-c32d-4897-a98c-c2f2aed36fd5.jpg",
                title: "РАЗБОР ЖИВОГО КЕЙСА ОТЕЛЯ",
                desc: "Реальный объект студии RADDESIGN, реальные цифры и решения в формате Case Study",
              },
              {
                img: "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/6dd936c2-1f85-4441-9bbb-c7b34833aec6.jpg",
                title: "ПРАКТИКА НА ВОРКШОПЕ",
                desc: "Получите задание, выполните, получите разбор от эксперта — это навык, а не просто знание",
              },
              {
                img: "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/46111da1-1708-41c4-9e9f-3a578492b392.jpg",
                title: "АЛГОРИТМ СОЗДАНИЯ ДИЗАЙН-КОНЦЕПЦИИ В HORECA",
                desc: "Реальные примеры концепций от студии RADDESIGN — структура, логика, этапы",
              },
            ].map((card, i) => (
              <div key={i} className="aos" style={{ ...aosBase, transitionDelay: `${i * 0.1}s`, backgroundColor: CARD_BG, borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(201,169,110,0.18)", display: "flex", flexDirection: "column" }}>
                <div style={{ height: "200px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                  <img src={card.img} alt={card.title} loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                  <h3 style={{ ...ffH, color: GOLD, fontSize: "clamp(15px, 1.1vw, 19px)", lineHeight: 1.2, fontWeight: 600, margin: 0 }}>{card.title}</h3>
                  <p style={{ ...ff, color: "rgba(255,255,255,0.8)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: "1200px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 4 — ПРОГРАММА
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 className="aos" style={{ ...aosBase, ...ffH, fontSize: "clamp(28px, 4vw, 58px)", fontWeight: 600, lineHeight: 1.1, color: WHITE, textAlign: "center" }}>
            Программа <span style={{ color: GOLD }}>HoReCa Education Day</span>
          </h2>
          <p className="aos" style={{ ...aosBase, ...ff, fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.6, color: "rgba(255,255,255,0.62)", textAlign: "center", maxWidth: "580px", margin: "16px auto 48px", transitionDelay: "0.1s" }}>
            Гарвардский метод обучения Case Study — это не лекция. Это живая работа с реальным кейсом.
          </p>

          <div className="prog-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* День 1 */}
            <div className="aos" style={{ ...aosBase, backgroundColor: CARD_BG, borderRadius: "16px", padding: "32px", border: "1px solid rgba(201,169,110,0.2)", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <span style={{ ...ff, fontSize: "11px", color: GOLD, letterSpacing: "0.22em", fontWeight: 600 }}>ДЕНЬ 1 — 24 МАРТА</span>
                <h3 style={{ ...ffH, color: WHITE, fontSize: "clamp(17px, 1.4vw, 22px)", lineHeight: 1.2, fontWeight: 600, margin: "8px 0 0" }}>РАЗБОР РЕАЛЬНОГО КЕЙСА РЕСТОРАНА</h3>
              </div>
              <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { num: "01", title: "Разбор реального кейса ресторана", desc: "Не учебный пример — реальный объект\nиз практики. Разбираем вживую:\nконцепция, ошибки, решения,\nкак это работает на практике." },
                  { num: "02", title: "Задание по кейсу — для тех кто хочет расти", desc: "После эфира участники получают\nзадание на основе разобранного кейса.\nВыполняете самостоятельно,\nв своём темпе — и присылаете на разбор." },
                ].map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <span style={{ color: GOLD, flexShrink: 0, ...ffH, fontWeight: 700, fontSize: "22px", lineHeight: 1.2 }}>{item.num}</span>
                    <div>
                      <p style={{ ...ff, color: WHITE, fontSize: "15px", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.3 }}>{item.title}</p>
                      <p style={{ ...ff, color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ ...ff, color: "rgba(255,255,255,0.4)", fontSize: "13px", borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "16px", marginTop: "auto", letterSpacing: "0.03em" }}>онлайн-вебинар · ~2 часа · 19:00 мск</div>
            </div>

            {/* День 2 */}
            <div className="aos" style={{ ...aosBase, transitionDelay: "0.15s", backgroundColor: CARD_BG, borderRadius: "16px", padding: "32px", border: "1px solid rgba(201,169,110,0.2)", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <span style={{ ...ff, fontSize: "11px", color: GOLD, letterSpacing: "0.22em", fontWeight: 600 }}>ДЕНЬ 2 — 31 МАРТА</span>
                <h3 style={{ ...ffH, color: WHITE, fontSize: "clamp(17px, 1.4vw, 22px)", lineHeight: 1.2, fontWeight: 600, margin: "8px 0 0" }}>ОТДЕЛЬНЫЙ ЭФИР С РАЗБОРОМ РАБОТ</h3>
              </div>
              <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ ...ff, color: "rgba(255,255,255,0.82)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                  Все присланные работы разбираем в прямом эфире. Живая обратная связь, разбор решений, ответы на вопросы. Бесплатно для всех участников.
                </p>
                <div style={{
                  background: "rgba(192,57,43,0.10)",
                  border: "1px solid rgba(192,57,43,0.30)",
                  borderRadius: "8px",
                  padding: "20px 24px",
                }}>
                  <p style={{ ...ff, color: "rgba(255,255,255,0.9)", fontSize: "15px", lineHeight: 1.65, margin: 0 }}>
                    Это не просто просмотр эфира.<br />
                    Это возможность получить разбор своей работы от Анны Симоновой — <strong style={{ color: WHITE }}>бесплатно.</strong>
                  </p>
                </div>
              </div>
              <div style={{ ...ff, color: "rgba(255,255,255,0.4)", fontSize: "13px", borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "16px", marginTop: "auto", letterSpacing: "0.03em" }}>онлайн-вебинар · 19:00 мск</div>
            </div>
          </div>

          <div className="aos" style={{ ...aosBase, display: "flex", justifyContent: "center", marginTop: "48px", transitionDelay: "0.2s" }}>
            <BtnWhite onClick={openModal}>ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →</BtnWhite>
          </div>
        </div>
        <div style={{ maxWidth: "1000px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 5 — СПИКЕР
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p className="aos" style={{ ...aosBase, ...ff, fontSize: "11px", color: GOLD, letterSpacing: "0.25em", textAlign: "center", marginBottom: "48px", fontWeight: 600 }}>
            ЭКСПЕРТ HORECA EDUCATION DAY
          </p>

          <div className="speaker-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <div className="aos" style={{ ...aosBase }}>
              <div style={{ borderRadius: "20px", overflow: "hidden", height: "clamp(380px, 60vh, 680px)", boxShadow: "0 24px 70px rgba(0,0,0,0.5)", border: "1px solid rgba(201,169,110,0.3)", position: "relative" }}>
                <img src={SPEAKER_IMG} alt="Анна Симонова" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px", background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)" }}>
                  <p style={{ ...ffH, color: WHITE, fontWeight: 600, fontSize: "30px", margin: 0 }}>Анна Симонова</p>
                  <p style={{ ...ff, color: "rgba(255,255,255,0.65)", fontSize: "14px", margin: "4px 0 0" }}>Основатель RAD ACADEMY и студии RADDESIGN</p>
                </div>
              </div>
            </div>

            <div className="aos" style={{ ...aosBase, display: "flex", flexDirection: "column", gap: "24px", transitionDelay: "0.15s" }}>
              <h2 style={{ ...ffH, color: WHITE, fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 600, lineHeight: 1.1, margin: 0 }}>
                Эксперт<br /><span style={{ color: GOLD }}>HoReCa Education Day</span>
              </h2>

              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  "18 лет практики в HoReCa-дизайне",
                  "100+ реализованных объектов — отели, рестораны, кафе, лобби, spa",
                  "Основатель RAD ACADEMY — ведущей школы HoReCa-дизайна в России",
                  "Руководитель студии RADDESIGN — ателье премиальных интерьеров",
                  "Спикер GSF, Московской недели дизайна, ARTDOM",
                  "Член Ассоциации CISSA",
                ].map((fact, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: GOLD, fontSize: "16px", flexShrink: 0, lineHeight: 1.6 }}>✦</span>
                    <span style={{ ...ff, color: "rgba(255,255,255,0.87)", fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.6 }}>{fact}</span>
                  </li>
                ))}
              </ul>

              <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: "24px", marginTop: "8px" }}>
                <p style={{ ...ffH, color: "rgba(255,255,255,0.9)", fontSize: "clamp(16px, 1.2vw, 19px)", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
                  «Большинство дизайнеров из жилых проектов совершают одну и ту же ошибку в расчётах — и либо теряют деньги, либо теряют клиента. На HoReCa Education Day я покажу как этого избежать — на живом кейсе, а не в теории»
                </p>
                <p style={{ ...ff, fontSize: "13px", color: GOLD, letterSpacing: "0.05em", marginTop: "12px" }}>— Анна Симонова</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1000px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 6 — ПОЧЕМУ СЕЙЧАС
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: CARD_BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 className="aos" style={{ ...aosBase, ...ffH, fontSize: "clamp(28px, 3.8vw, 54px)", fontWeight: 600, lineHeight: 1.15, color: WHITE, maxWidth: "760px", marginBottom: "32px" }}>
            HoReCa-дизайн — рынок, где профессионалов с правильной методологией{" "}
            <span style={{ color: GOLD }}>всё ещё не хватает</span>
          </h2>

          <p className="aos" style={{ ...aosBase, ...ff, fontSize: "clamp(16px, 1.3vw, 18px)", lineHeight: 1.7, color: "rgba(255,255,255,0.78)", maxWidth: "720px", marginBottom: "64px", transitionDelay: "0.1s" }}>
            Пока большинство дизайнеров конкурируют за типовые квартиры — рынок отелей, ресторанов и кафе остаётся недозаполненным. Те, кто войдёт в HoReCa сейчас — займут позицию до того, как туда придут все остальные.
          </p>

          {/* 3 факта */}
          <div className="facts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {[
              { num: "В 3–5 РАЗ", numSuffix: undefined, desc: "выше средний чек в HoReCa против жилых проектов" },
              { num: "БЕЗ ТОРГА", numSuffix: undefined, desc: "Коммерческий клиент платит за экспертизу, не торгуется за метры" },
              { num: "1", numSuffix: " КЕЙС", desc: "Один HoReCa-объект в портфолио — другой уровень входящих заявок" },
            ].map((fact, i) => (
              <div key={i} className="aos" style={{
                ...aosBase,
                transitionDelay: `${i * 0.12}s`,
                padding: "40px 32px",
                borderLeft: i > 0 ? "1px solid rgba(201,169,110,0.25)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}>
                <span style={{ ...ffH, color: GOLD, fontWeight: 700, lineHeight: 1 }}>
                  {fact.numSuffix ? (
                    <>
                      <span style={{ fontSize: "clamp(56px, 7vw, 88px)" }}>{fact.num}</span>
                      <span style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>{fact.numSuffix}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>{fact.num}</span>
                  )}
                </span>
                <span style={{ ...ff, color: "rgba(255,255,255,0.75)", fontSize: "clamp(14px, 1.1vw, 16px)", lineHeight: 1.5 }}>{fact.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: "1000px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 7 — ФОРМАТ / СРАВНЕНИЕ
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 className="aos" style={{ ...aosBase, ...ffH, fontSize: "clamp(28px, 3.8vw, 54px)", fontWeight: 600, lineHeight: 1.15, color: WHITE, marginBottom: "16px" }}>
            Почему Case Study — это не <span style={{ color: GOLD }}>«ещё один вебинар»</span>
          </h2>
          <p className="aos" style={{ ...aosBase, ...ff, fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", marginBottom: "48px", transitionDelay: "0.1s" }}>
            Гарвардский метод Case Study — не теория, а разбор реальных ситуаций и принятие решений.
          </p>

          {/* Таблица сравнения */}
          <div className="aos" style={{ ...aosBase, borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(201,169,110,0.2)", transitionDelay: "0.15s" }}>
            {/* Шапка */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ backgroundColor: "rgba(255,255,255,0.06)", padding: "18px 28px", borderRight: "1px solid rgba(201,169,110,0.2)" }}>
                <span style={{ ...ff, fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)" }}>✗ ОБЫЧНЫЙ ВЕБИНАР</span>
              </div>
              <div style={{ backgroundColor: `${CARD_BG}`, padding: "18px 28px" }}>
                <span style={{ ...ff, fontSize: "13px", fontWeight: 600, letterSpacing: "0.15em", color: GOLD }}>✓ HORECA EDUCATION DAY</span>
              </div>
            </div>
            {/* Строки */}
            {[
              ["Общая теория", "Живой кейс реального отеля"],
              ["Слушаете и забываете", "Делаете задание и запоминаете"],
              ["Спикер говорит — вы пишете", "Вы работаете — эксперт разбирает"],
              ["Знание без навыка", "Навык, который применяете сразу"],
              ["Непонятно как использовать", "Чёткий алгоритм для вашей практики"],
            ].map(([bad, good], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(201,169,110,0.12)" }}>
                <div style={{ padding: "20px 28px", borderRight: "1px solid rgba(201,169,110,0.12)", backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                  <span style={{ ...ff, fontSize: "clamp(14px, 1vw, 16px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{bad}</span>
                </div>
                <div style={{ padding: "20px 28px", backgroundColor: i % 2 === 0 ? `${CARD_BG}` : "rgba(122,16,18,0.6)" }}>
                  <span style={{ ...ff, fontSize: "clamp(14px, 1vw, 16px)", color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{good}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: "900px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 8 — ВОЗРАЖЕНИЕ
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: CARD_BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p className="aos" style={{
            ...aosBase, ...ffH,
            fontSize: "clamp(28px, 4vw, 58px)",
            fontStyle: "italic",
            fontWeight: 400,
            color: WHITE,
            lineHeight: 1.2,
            marginBottom: "40px",
          }}>
            «У меня нет времени — я завален проектами»
          </p>

          <div className="aos" style={{ ...aosBase, transitionDelay: "0.15s" }}>
            <div style={{ width: "48px", height: "2px", backgroundColor: GOLD, margin: "0 auto 40px" }} />
            <p style={{ ...ff, fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: 1.75, color: "rgba(255,255,255,0.85)", maxWidth: "640px", margin: "0 auto" }}>
              Мы слышим это каждый раз.{" "}
              <strong style={{ color: WHITE }}>1 вечер. 2 часа. Онлайн</strong> — из любой точки.
              Один живой кейс — и вы уже понимаете систему.
              <br /><br />
              Вопрос не в том, есть ли у вас 2 часа.
              Вопрос в том —{" "}
              <em style={{ color: GOLD }}>что изменится в карьере, если вы их найдёте.</em>
            </p>

            <div style={{ marginTop: "48px" }}>
              <BtnWhite onClick={openModal}>ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →</BtnWhite>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "800px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 9 — ФИНАЛЬНЫЙ CTA
      ══════════════════════════════════════ */}
      <section id="register" style={{ backgroundColor: BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>

          {/* Заголовок */}
          <h2 className="aos" style={{ ...aosBase, ...ffH, fontSize: "clamp(32px, 4vw, 60px)", fontWeight: 600, lineHeight: 1.1, color: WHITE, margin: "0 0 12px" }}>
            Зарегистрируйтесь на<br /><span style={{ color: GOLD }}>HoReCa Education Day</span>
          </h2>
          <p className="aos" style={{ ...aosBase, ...ff, fontSize: "clamp(16px, 1.2vw, 18px)", color: GOLD, letterSpacing: "0.05em", margin: "0 0 48px", transitionDelay: "0.05s" }}>
            24 марта | Онлайн | Бесплатно
          </p>

          {/* Countdown */}
          <div className="aos" style={{ ...aosBase, transitionDelay: "0.1s", marginBottom: "48px" }}>
            <p style={{ ...ff, fontSize: "12px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em", marginBottom: "16px", fontWeight: 600 }}>
              ДО НАЧАЛА ПЕРВОГО ДНЯ
            </p>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", justifyContent: "center" }}>
              {[
                { val: pad(timeLeft.d), label: "дней" },
                { val: pad(timeLeft.h), label: "часов" },
                { val: pad(timeLeft.m), label: "минут" },
                { val: pad(timeLeft.s), label: "секунд" },
              ].map((t, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    ...ffH,
                    fontSize: "clamp(36px, 4vw, 56px)",
                    fontWeight: 700,
                    color: WHITE,
                    lineHeight: 1,
                    minWidth: "60px",
                    background: CARD_BG,
                    borderRadius: "10px",
                    padding: "12px 8px",
                    border: "1px solid rgba(201,169,110,0.25)",
                  }}>
                    {t.val}
                  </div>
                  <div style={{ ...ff, fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "6px", letterSpacing: "0.1em" }}>{t.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Подарок за регистрацию */}
          <div className="aos" style={{ ...aosBase, transitionDelay: "0.15s", marginBottom: "48px" }}>
            <div style={{
              backgroundColor: CARD_BG,
              borderRadius: "20px",
              padding: "36px 40px",
              border: "1px solid rgba(201,169,110,0.35)",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              maxWidth: "600px",
              width: "100%",
              textAlign: "center",
            }}>
              <div style={{
                backgroundColor: "rgba(201,169,110,0.15)",
                borderRadius: "50%",
                width: "56px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                flexShrink: 0,
              }}>🎁</div>
              <div>
                <p style={{ ...ff, fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", color: GOLD, margin: "0 0 8px", textTransform: "uppercase" }}>
                  Подарок каждому участнику
                </p>
                <p style={{ ...ffH, fontSize: "clamp(18px, 2vw, 24px)", color: WHITE, margin: "0 0 10px", fontStyle: "italic", lineHeight: 1.3 }}>
                  Чек-лист «3 шага, как получить клиента<br />на дизайн коммерческого объекта»
                </p>
                <p style={{ ...ff, fontSize: "14px", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5 }}>
                  Пришлём сразу после регистрации
                </p>
              </div>
            </div>
          </div>

          {/* Усиления */}
          <div className="aos" style={{ ...aosBase, transitionDelay: "0.2s", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
            {[
              "Живой разбор кейса реального отеля",
              "Авторская методология расчёта стоимости",
              "Алгоритм создания дизайн-концепции",
              "Практическое задание с разбором эксперта",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "9999px", padding: "8px 18px" }}>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: "14px" }}>✓</span>
                <span style={{ ...ff, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Кнопка */}
          <div className="aos" style={{ ...aosBase, transitionDelay: "0.25s" }}>
            <BtnWhite
              onClick={() => {
                openModal();
                (window as unknown as Record<string, (...args: unknown[]) => void>)['ym']?.(107087337, 'reachGoal', 'submit_registration_form');
              }}
              style={{ fontSize: "17px", padding: "18px 52px" }}
            >
              ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →
            </BtnWhite>
            <p style={{ ...ff, fontSize: "12px", color: "rgba(255,255,255,0.28)", marginTop: "16px", lineHeight: 1.5 }}>
              Нажимая кнопку, вы соглашаетесь с{" "}
              <a href="https://radacademy.ru/privacy_policy" target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(201,169,110,0.5)", textDecoration: "underline" }}>
                политикой обработки персональных данных
              </a>
            </p>
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════
          ФУТЕР
      ══════════════════════════════════════ */}
      <footer style={{ backgroundColor: "#3D0607", padding: "40px 48px" }}>
        <GoldDivider />
        <div style={{ maxWidth: "1000px", margin: "36px auto 0", display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <LogoRAD />
            <p style={{ ...ff, fontSize: "13px", color: "rgba(255,255,255,0.32)", margin: 0, lineHeight: 1.6 }}>
              © 2025 ИП Вылегжанина А.С.<br />
              <a href="https://radacademy.ru" target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none" }}>radacademy.ru</a>
              {" · "}
              <a href="mailto:mail@onlinerad.ru" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none" }}>mail@onlinerad.ru</a>
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {[
                { label: "Telegram", href: "https://t.me/rad_academy_design" },
                { label: "ВКонтакте", href: "https://vk.com/radacademy" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ ...ff, fontSize: "13px", color: "rgba(255,255,255,0.32)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
                >{s.label}</a>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Публичная оферта", href: "https://radacademy.ru/offer" },
              { label: "Политика обработки персональных данных", href: "https://radacademy.ru/privacy_policy" },
              { label: "Согласие на обработку персональных данных", href: "https://radacademy.ru/consent_user" },
              { label: "Контактная информация", href: "https://radacademy.ru/contacts" },
            ].map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{ ...ff, fontSize: "13px", color: "rgba(255,255,255,0.32)", textDecoration: "none", lineHeight: 1.5 }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}
              >{link.label}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Мобильная фиксированная кнопка ── */}
      <div className="mobile-cta" style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 20px 20px", backgroundColor: BG, borderTop: "1px solid rgba(201,169,110,0.3)", zIndex: 100 }}>
        <BtnWhite style={{ width: "100%", textAlign: "center", display: "block", padding: "16px 24px", fontSize: "15px" }} onClick={openModal}>
          ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →
        </BtnWhite>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 0 20px 48px !important; }
          .prog-grid { grid-template-columns: 1fr !important; }
          .speaker-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cta-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .facts-grid { grid-template-columns: 1fr !important; }
          .facts-grid > div { border-left: none !important; border-top: 1px solid rgba(201,169,110,0.2); padding: 24px 0 !important; }
          .facts-grid > div:first-child { border-top: none; }
          section { padding-left: 20px !important; padding-right: 20px !important; padding-top: 64px !important; padding-bottom: 64px !important; }
          header { padding-left: 20px !important; padding-right: 20px !important; }
          footer { padding-left: 20px !important; padding-right: 20px !important; }
          .mobile-cta { display: block !important; }
          body { padding-bottom: 80px; }
        }
        input::placeholder { color: rgba(255,255,255,0.35); }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}