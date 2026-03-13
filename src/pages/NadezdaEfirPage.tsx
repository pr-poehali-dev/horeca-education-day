import { useRef, useState } from "react";

const SPEAKER_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/19f9c594-1cd1-4895-be57-c6a3612c38a5.jpg";
const INTERIOR_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/9a67729f-c090-4bc8-b565-17d216d33fc3.jpg";
const LOGO_URL = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/c9557609-04c7-411a-a6d8-97ee87fa41f3.png";

const ACCENT = "#D4956A";
const ACCENT_HOVER = "#C4845A";
const PDF_GUIDE = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/bf310a28-abe9-47e7-8339-5d7badd09da0.png";

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



function reachGoal() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ym = (window as any).ym;
  if (typeof ym === "function") {
    ym(undefined, "reachGoal", "webinar_registration");
  }
}

export default function NadezdaEfirPage() {
  const [showModal, setShowModal] = useState(false);

  function handleCTAClick() {
    reachGoal();
    setShowModal(true);
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setShowModal(false);
  }



  return (
    <div style={{ background: "#0D0C0B", minHeight: "100vh", color: "#fff", fontFamily: "'Basis Grotesque Pro', 'Inter', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sangbleu { font-family: 'Cormorant', 'Georgia', serif; font-weight: 400; }

        .accent { color: ${ACCENT}; }

        .cta-btn {
          display: inline-block;
          background: ${ACCENT};
          color: #0D0C0B;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 18px 40px;
          border-radius: 2px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .cta-btn:hover { background: ${ACCENT_HOVER}; transform: translateY(-2px); }

        @media (max-width: 767px) {
          .cta-btn { width: 100%; text-align: center; padding: 18px 24px; }
          .hero-layout { flex-direction: column !important; }
          .hero-photo-wrap { display: none !important; }
          .hero-photo-mobile { display: block !important; }
          .speaker-layout { flex-direction: column !important; }
          .speaker-photo-col { width: 100% !important; max-width: 320px !important; margin: 0 auto 32px !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          .screen-pad { padding-top: 56px !important; padding-bottom: 56px !important; }
          .h1-large { font-size: clamp(34px, 8vw, 48px) !important; }
          .h1-small { font-size: clamp(20px, 5vw, 28px) !important; }
          .h2-screen { font-size: 26px !important; }
          .h5-final { font-size: 28px !important; }
          .header-label { display: none !important; }
          .program-num { font-size: 36px !important; }
          .hero-inner { min-height: auto !important; padding-top: 48px !important; padding-bottom: 48px !important; }
        }
      `}</style>

      {/* Modal */}
      {showModal && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{
            background: "#fff",
            borderRadius: 8,
            padding: 0,
            maxWidth: 520,
            width: "100%",
            boxShadow: "0 40px 100px rgba(0,0,0,0.9)",
            position: "relative",
            overflow: "hidden",
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                background: "transparent",
                border: "none",
                color: "rgba(0,0,0,0.4)",
                fontSize: 26,
                cursor: "pointer",
                lineHeight: 1,
                padding: 4,
                zIndex: 10,
              }}
              aria-label="Закрыть"
            >
              ×
            </button>
            <iframe
              src="https://cabinet.onlinerad.ru/pl/lite/widget?id=1575422"
              style={{
                width: "100%",
                height: 480,
                border: "none",
                borderRadius: 4,
                display: "block",
                background: "#fff",
              }}
              allow="payment"
              title="Регистрация на вебинар"
            />
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
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(13,12,11,0.96)",
        backdropFilter: "blur(16px)",
      }}>
        <img
          src={LOGO_URL}
          alt="RAD ACADEMY"
          style={{ height: 30, width: "auto", objectFit: "contain", filter: "invert(1) brightness(2)" }}
        />
        <span className="header-label" style={{ fontSize: 13, color: "rgba(255,255,255,0.40)", letterSpacing: 1 }}>
          radacademy.ru
        </span>
      </header>

      {/* SCREEN 1 — HERO */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* BG Interior Photo */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${INTERIOR_PHOTO})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          filter: "brightness(0.45) saturate(0.6)",
        }} />
        {/* Overlay gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(13,12,11,0.15) 0%, rgba(13,12,11,0.45) 60%, #0D0C0B 100%)",
        }} />

        <div className="hero-inner" style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "0 16px", minHeight: 620, display: "flex", alignItems: "center", paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ maxWidth: 680 }}>

            {/* Mobile speaker photo */}
            <div className="hero-photo-mobile" style={{ display: "none", marginBottom: 28 }}>
              <img
                src={SPEAKER_PHOTO}
                alt="Надежда Литовка"
                style={{ width: 120, height: 120, objectFit: "cover", objectPosition: "top", borderRadius: "50%", filter: "grayscale(80%) brightness(0.9)", border: `2px solid ${ACCENT}` }}
              />
            </div>

            <FadeIn>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3.5, color: ACCENT, marginBottom: 24, fontWeight: 500 }}>
                БЕСПЛАТНЫЙ ВЕБИНАР · 18 МАРТА · 19:00 МСК
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              {/* Large part */}
              <h1 className="sangbleu" style={{ lineHeight: 1.12, color: "#fff", marginBottom: 0 }}>
                <span className="h1-large" style={{ fontSize: "clamp(42px, 6vw, 68px)", display: "block" }}>
                  Что будет с{" "}
                  <span style={{ color: ACCENT }}>профессией<br />дизайнера</span>{" "}
                  через 2 года
                </span>
                <span className="h1-small" style={{ fontSize: "clamp(22px, 3.2vw, 32px)", display: "block", marginTop: 12, color: "rgba(255,255,255,0.82)", fontWeight: 300 }}>
                  и почему те, кто не меняется сейчас,{" "}
                  <span style={{ color: ACCENT }}>рискует остаться без заказов</span>
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 500, marginTop: 28, marginBottom: 36 }}>
                Честный разговор о рынке дизайна:<br />
                что меняется, кто выигрывает<br />
                и как оказаться на правильной стороне
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <button className="cta-btn" onClick={handleCTAClick}>
                ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →
              </button>
              <div style={{ marginTop: 14, fontSize: 12, color: "rgba(255,255,255,0.30)", letterSpacing: 0.5 }}>
                Онлайн. Бесплатно. 18 марта в 19:00 мск
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SCREEN 2 — ДЛЯ КОГО */}
      <section className="screen-pad" style={{ paddingTop: 80, paddingBottom: 80, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>
          <FadeIn>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: ACCENT, marginBottom: 16 }}>
              ВЫ НА ПРАВИЛЬНОЙ СТРАНИЦЕ, ЕСЛИ
            </div>
            <h2 className="sangbleu h2-screen" style={{ fontSize: 36, color: "#fff", marginBottom: 48 }}>
              Узнаёте себя?
            </h2>
          </FadeIn>

          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {CARDS.map((text, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 8,
                    padding: 24,
                    height: "100%",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(212,149,106,0.3)`;
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(212,149,106,0.04)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: ACCENT, fontSize: 18, lineHeight: 1.4, flexShrink: 0, marginTop: 1 }}>—</span>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>
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
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.01)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>
          <FadeIn>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: ACCENT, marginBottom: 16 }}>
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
                  borderBottom: i < PROGRAM.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}>
                  <div className="program-num sangbleu" style={{
                    fontSize: 48,
                    color: `rgba(212,149,106,0.22)`,
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
                      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.50)", lineHeight: 1.65 }}>
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
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>
          <FadeIn>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: ACCENT, marginBottom: 48 }}>
              СПИКЕР ВЕБИНАРА
            </div>
          </FadeIn>

          <div className="speaker-layout" style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>
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
                    borderRadius: 8,
                    filter: "grayscale(80%) contrast(1.05) brightness(0.88) sepia(20%)",
                    display: "block",
                  }}
                />
              </div>
            </FadeIn>

            <div style={{ flex: 1, minWidth: 0 }}>
              <FadeIn delay={0.1}>
                <h3 className="sangbleu h2-screen" style={{ fontSize: 36, color: "#fff", marginBottom: 8, lineHeight: 1.15 }}>
                  Надежда Литовка
                </h3>
                <div style={{ fontSize: 15, color: ACCENT, marginBottom: 20 }}>
                  Старший куратор RAD ACADEMY
                </div>
                <div style={{ width: 40, height: 1, background: ACCENT, marginBottom: 28, opacity: 0.7 }} />
              </FadeIn>

              <FadeIn delay={0.15}>
                <ul style={{ listStyle: "none", marginBottom: 32 }}>
                  {[
                    "Окончила МИФИ и Международную школу дизайна IDS",
                    "Повышение квалификации: Британская высшая школа дизайна, школа светодизайна Yarko School",
                    "С 2003 года проектирует интерьеры — реализовала более 160 коммерческих, офисных и жилых проектов",
                    "Работала над проектами ABN Amrobank, группы «Астерос», Жигулевского пивного завода, Минтранса, РЖД, Транспортной прокуратуры, РУТ МИИТ",
                    "Ведомственная награда Министра транспорта РФ за реконструкцию здания Минтранса",
                    "Работала над объектами культурного наследия федерального значения",
                    "Старший куратор Русской Академии Дизайна RAD с 2023 года",
                    "За 3 года выпустила 12 курсов и более 600 учеников",
                    "Спикер дизайн-конференций и выставок",
                  ].map((fact, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                      <span style={{ color: ACCENT, flexShrink: 0, marginTop: 4, fontSize: 10 }}>◆</span>
                      <span style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.6 }}>{fact}</span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={0.2}>
                <blockquote style={{
                  borderLeft: `2px solid ${ACCENT}`,
                  paddingLeft: 24,
                  margin: 0,
                  fontFamily: "'Cormorant', 'Georgia', serif",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.55,
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
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "#0D0C0B",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700, height: 700, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(212,149,106,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3.5, color: ACCENT, marginBottom: 24 }}>
              БЕСПЛАТНЫЙ ВЕБИНАР · 18 МАРТА · 19:00 МСК
            </div>
            <h2 className="sangbleu h5-final" style={{ fontSize: 40, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
              Узнайте как оказаться<br />на правильной стороне рынка
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 40 }}>
              Вебинар бесплатный. Онлайн.<br />
              Ссылка придёт на email после регистрации.
            </p>
          </FadeIn>

          {/* PDF Gift block */}
          <FadeIn delay={0.25}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              background: "rgba(244,78,38,0.07)",
              border: "1px solid rgba(244,78,38,0.25)",
              borderRadius: 12,
              padding: "24px 28px",
              marginTop: 40,
              textAlign: "left",
            }}>
              <img
                src={PDF_GUIDE}
                alt="PDF-гайд"
                style={{ width: 72, flexShrink: 0, borderRadius: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}
              />
              <div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2.5, color: ACCENT, marginBottom: 8, fontWeight: 600 }}>
                  🎁 Подарок за регистрацию
                </div>
                <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(17px, 2.5vw, 20px)", color: "#fff", lineHeight: 1.3, marginBottom: 6 }}>
                  PDF-гайд «Портрет успешного<br />дизайнера сегмента HoReCa»
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.5 }}>
                  Пришлём сразу после регистрации на вебинар
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ marginTop: 32 }}>
              <button
                className="cta-btn"
                onClick={handleCTAClick}
                style={{ padding: "20px 48px" }}
              >
                ЗАРЕГИСТРИРОВАТЬСЯ И ПОЛУЧИТЬ ГАЙД →
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0D0C0B", padding: "40px 48px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ width: 40, height: 1, background: ACCENT, margin: "0 auto 36px", opacity: 0.6 }} />
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <img src={LOGO_URL} alt="RAD ACADEMY" style={{ height: 28, width: "auto", objectFit: "contain", filter: "invert(1) brightness(2)" }} />
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", margin: 0, lineHeight: 1.6, fontFamily: "inherit" }}>
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
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", textDecoration: "none", fontFamily: "inherit", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
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
                style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", textDecoration: "none", lineHeight: 1.6, fontFamily: "inherit", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
              >{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}