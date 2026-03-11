import { useEffect, useRef, useState } from "react";

const SPEAKER_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/19f9c594-1cd1-4895-be57-c6a3612c38a5.jpg";
const LOGO_URL = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/c9557609-04c7-411a-a6d8-97ee87fa41f3.png";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const CARDS = [
  "Работаете всё больше, а доход\nне растёт уже год или два",
  "Клиенты постоянно просят\nпеределки — и это выматывает",
  "Чувствуете что рынок меняется,\nно непонятно в какую сторону",
  "Хотите работать с дорогими\nклиентами, но не знаете как",
  "Боитесь что вас заменят\nИИ или пакетные решения",
  "Думаете о новых сегментах,\nно страшно начинать",
];

const PROGRAM = [
  {
    num: "01",
    title: "Как выглядит рынок дизайна в 2026–2027",
    desc: "Какие сегменты растут, какие сжимаются, где будут деньги и заказы через 2 года",
  },
  {
    num: "02",
    title: "Три типа дизайнеров — кто выживет",
    desc: "Исполнитель, эксперт, системный игрок — чем они отличаются и как перейти в нужную категорию",
  },
  {
    num: "03",
    title: "Что убивает доход прямо сейчас",
    desc: "Правки, низкий чек, нелояльные клиенты — системные причины и как их устранить",
  },
  {
    num: "04",
    title: "Новые сегменты: HoReCa, премиум, коммерция",
    desc: "Почему дизайнеры из жилья теряют деньги при входе в коммерцию — и как войти правильно",
  },
  {
    num: "05",
    title: "Конкретный план: что делать в ближайшие 3 месяца чтобы оказаться на правильной стороне рынка",
    desc: "",
  },
];

export default function NadezdaEfirPage() {
  const [showModal, setShowModal] = useState(false);

  function handleCTAClick() {
    setShowModal(true);
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setShowModal(false);
  }

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#fff", fontFamily: "'Basis Grotesque Pro', 'Inter', sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sangbleu { font-family: 'Cormorant', 'Georgia', serif; font-weight: 400; }

        .cta-btn {
          display: inline-block;
          background: #C0392B;
          color: #fff;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 18px 40px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .cta-btn:hover { background: #D44235; transform: translateY(-2px); }

        @media (max-width: 767px) {
          .cta-btn { width: 100%; text-align: center; padding: 18px 24px; }
          .hero-layout { flex-direction: column !important; }
          .hero-photo-wrap { display: none !important; }
          .hero-photo-mobile { display: block !important; }
          .speaker-layout { flex-direction: column !important; }
          .speaker-photo-col { width: 100% !important; max-width: 320px !important; margin: 0 auto 32px !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          .screen-pad { padding-top: 48px !important; padding-bottom: 48px !important; }
          .h1-main { font-size: 30px !important; }
          .h2-screen { font-size: 26px !important; }
          .h5-final { font-size: 28px !important; }
          .header-label { display: none !important; }
          .program-num { font-size: 36px !important; }
        }
      `}</style>

      {/* Modal */}
      {showModal && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.80)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
            backdropFilter: "blur(6px)",
          }}
        >
          <div style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16,
            padding: "clamp(32px, 4vw, 48px) clamp(24px, 4vw, 48px)",
            maxWidth: 440,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
          }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: "#C0392B", marginBottom: 16 }}>
              Регистрация на вебинар
            </div>
            <div className="sangbleu" style={{ fontSize: "clamp(22px, 3vw, 28px)", color: "#fff", lineHeight: 1.25, marginBottom: 12 }}>
              18 марта · 19:00 мск
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 32, lineHeight: 1.6 }}>
              Форма регистрации появится здесь совсем скоро
            </p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.5)",
                borderRadius: 6,
                padding: "10px 24px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
      }}>
        <img
          src={LOGO_URL}
          alt="RAD ACADEMY"
          style={{ height: 32, width: "auto", objectFit: "contain", filter: "invert(1) brightness(2)" }}
        />
        <span className="header-label" style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontFamily: "inherit" }}>
          radacademy.ru
        </span>
      </header>

      {/* SCREEN 1 — HERO */}
      <section className="screen-pad" style={{ paddingTop: 80, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>
          <div className="hero-layout" style={{ display: "flex", alignItems: "flex-start", gap: 48 }}>

            {/* Left content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Mobile photo */}
              <div className="hero-photo-mobile" style={{ display: "none", marginBottom: 32, borderRadius: 12, overflow: "hidden", maxHeight: 320 }}>
                <img
                  src={SPEAKER_PHOTO}
                  alt="Надежда Литовка"
                  style={{ width: "100%", height: 320, objectFit: "cover", objectPosition: "top", filter: "grayscale(100%) contrast(1.05) brightness(0.9)" }}
                />
              </div>

              <FadeIn>
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 3, color: "#C0392B", marginBottom: 20 }}>
                  БЕСПЛАТНЫЙ ВЕБИНАР · 18 МАРТА · 19:00 МСК
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="sangbleu h1-main" style={{ fontSize: 48, lineHeight: 1.15, color: "#fff", marginBottom: 24 }}>
                  Что будет с профессией<br />
                  дизайнера через 2 года —<br />
                  и почему те, кто не меняется<br />
                  сейчас, рискуют остаться<br />
                  без заказов
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: 520, marginBottom: 36 }}>
                  Честный разговор о рынке дизайна:<br />
                  что меняется, кто выигрывает<br />
                  и как оказаться на правильной стороне
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <button className="cta-btn" onClick={handleCTAClick}>
                  ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →
                </button>
                <div style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.40)" }}>
                  Онлайн. Бесплатно. 18 марта в 19:00 мск
                </div>
              </FadeIn>
            </div>

            {/* Desktop photo */}
            <div className="hero-photo-wrap" style={{ width: 340, flexShrink: 0, position: "relative", borderRadius: 12, overflow: "hidden" }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, #0A0A0A 0%, transparent 40%)",
                zIndex: 1,
              }} />
              <img
                src={SPEAKER_PHOTO}
                alt="Надежда Литовка"
                style={{
                  width: "100%",
                  height: 520,
                  objectFit: "cover",
                  objectPosition: "top",
                  filter: "grayscale(100%) contrast(1.05) brightness(0.88)",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>

        {/* bg decoration */}
        <div style={{
          position: "absolute", top: "10%", right: "-10%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,57,43,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
      </section>

      {/* SCREEN 2 — ДЛЯ КОГО */}
      <section className="screen-pad" style={{
        paddingTop: 80, paddingBottom: 80,
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>
          <FadeIn>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: "#C0392B", marginBottom: 16 }}>
              ВЫ НА ПРАВИЛЬНОЙ СТРАНИЦЕ, ЕСЛИ
            </div>
            <h2 className="sangbleu h2-screen" style={{ fontSize: 36, color: "#fff", marginBottom: 48 }}>
              Узнаёте себя?
            </h2>
          </FadeIn>

          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {CARDS.map((text, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: 24,
                  height: "100%",
                  transition: "border-color 0.3s, background 0.3s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(192,57,43,0.35)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(192,57,43,0.05)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#C0392B", fontSize: 18, lineHeight: 1.4, flexShrink: 0, marginTop: 1 }}>—</span>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
                      {text.split("\n").map((line, j) => (
                        <span key={j}>{line}{j < text.split("\n").length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SCREEN 3 — ПРОГРАММА */}
      <section className="screen-pad" style={{
        paddingTop: 80, paddingBottom: 80,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.01)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>
          <FadeIn>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: "#C0392B", marginBottom: 16 }}>
              ПРОГРАММА
            </div>
            <h2 className="sangbleu h2-screen" style={{ fontSize: 36, color: "#fff", marginBottom: 56 }}>
              Что разберём<br />на вебинаре
            </h2>
          </FadeIn>

          <div>
            {PROGRAM.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  display: "flex",
                  gap: 32,
                  alignItems: "flex-start",
                  padding: "32px 0",
                  borderBottom: i < PROGRAM.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}>
                  <div className="program-num sangbleu" style={{
                    fontSize: 48,
                    color: "rgba(192,57,43,0.28)",
                    lineHeight: 1,
                    flexShrink: 0,
                    width: 64,
                    letterSpacing: -1,
                  }}>
                    {item.num}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: item.desc ? 8 : 0, lineHeight: 1.4 }}>
                      {item.title}
                    </div>
                    {item.desc && (
                      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
                        {item.desc}
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 56 }}>
              <button className="cta-btn" onClick={handleCTAClick}>
                ХОЧУ ПОПАСТЬ НА ВЕБИНАР →
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SCREEN 4 — СПИКЕР */}
      <section className="screen-pad" style={{
        paddingTop: 80, paddingBottom: 80,
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>
          <FadeIn>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: "#C0392B", marginBottom: 48 }}>
              СПИКЕР ВЕБИНАРА
            </div>
          </FadeIn>

          <div className="speaker-layout" style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
            {/* Photo */}
            <FadeIn style={{ flexShrink: 0 }}>
              <div className="speaker-photo-col" style={{ width: 280 }}>
                <img
                  src={SPEAKER_PHOTO}
                  alt="Надежда Литовка"
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: 12,
                    filter: "grayscale(100%) contrast(1.05) brightness(0.85)",
                    display: "block",
                  }}
                />
              </div>
            </FadeIn>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <FadeIn delay={0.1}>
                <h3 className="sangbleu h2-screen" style={{ fontSize: 36, color: "#fff", marginBottom: 8, lineHeight: 1.15 }}>
                  Надежда Литовка
                </h3>
                <div style={{ fontSize: 15, color: "#C0392B", marginBottom: 20 }}>
                  Старший куратор RAD ACADEMY
                </div>
                <div style={{ width: 40, height: 1, background: "#C0392B", marginBottom: 28 }} />
              </FadeIn>

              <FadeIn delay={0.15}>
                <ul style={{ listStyle: "none", marginBottom: 32 }}>
                  {[
                    "18 лет практики в дизайне интерьера",
                    "100+ реализованных объектов: жильё, HoReCa, коммерческие пространства",
                    "Основатель студии и образовательного направления RAD ACADEMY",
                    "Спикер отраслевых мероприятий: GSF, Московская неделя дизайна, ARTDOM",
                    "Член профессиональной ассоциации CISSA",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 15, color: "rgba(255,255,255,0.70)", lineHeight: 1.55 }}>
                      <span style={{ color: "#C0392B", flexShrink: 0 }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.2}>
                <blockquote style={{
                  borderLeft: "2px solid #C0392B",
                  paddingLeft: 24,
                  margin: 0,
                  fontFamily: "'Cormorant', 'Georgia', serif",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                }}>
                  «Рынок не предупреждает — он просто
                  перераспределяет заказы. Мой вебинар
                  для тех, кто хочет знать заранее»
                </blockquote>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 5 — ФИНАЛЬНЫЙ CTA */}
      <section className="screen-pad" style={{
        paddingTop: 80, paddingBottom: 80,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#0A0A0A",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,57,43,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 3, color: "#C0392B", marginBottom: 24 }}>
              БЕСПЛАТНЫЙ ВЕБИНАР · 18 МАРТА · 19:00 МСК
            </div>
            <h2 className="sangbleu h5-final" style={{ fontSize: 40, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
              Узнайте как оказаться<br />на правильной стороне рынка
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: 40 }}>
              Вебинар бесплатный. Онлайн.<br />
              Ссылка придёт на email после регистрации.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <button
              className="cta-btn"
              onClick={handleCTAClick}
              style={{ padding: "20px 48px" }}
            >
              ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →
            </button>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "24px 32px",
        textAlign: "center",
        fontSize: 12,
        color: "rgba(255,255,255,0.25)",
      }}>
        © 2026 RAD ACADEMY · radacademy.ru · mail@onlinerad.ru
      </footer>
    </div>
  );
}
