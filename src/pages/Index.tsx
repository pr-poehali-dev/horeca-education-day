import { useEffect } from "react";

const SPEAKER_IMG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/b78c81d9-6408-4fa1-97d9-2a3133881431.jpg";
const HERO_IMG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/c8f4ce82-417f-410b-aa02-7119749abe8e.jpg";

const GoldDivider = () => (
  <div className="w-full py-2">
    <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} />
  </div>
);

const LogoRAD = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
      <span style={{ fontFamily: "'Cormorant', Georgia, serif", color: "#FFFFFF", fontWeight: 700, fontSize: "22px", letterSpacing: "0.18em" }}>
        RAD
      </span>
      <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", color: "#FFFFFF", fontWeight: 300, fontSize: "10px", letterSpacing: "0.28em" }}>
        ACADEMY
      </span>
    </div>
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    border: "1px solid rgba(255,255,255,0.55)",
    borderRadius: "9999px",
    padding: "6px 18px",
    fontSize: "14px",
    color: "#FFFFFF",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.07)",
    fontFamily: "'IBM Plex Sans', sans-serif",
  }}>
    {children}
  </span>
);

const BtnWhite = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <button
    style={{
      backgroundColor: "#FFFFFF",
      color: "#5B090A",
      borderRadius: "9999px",
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 600,
      fontSize: "15px",
      letterSpacing: "0.06em",
      padding: "14px 36px",
      border: "none",
      cursor: "pointer",
      display: "inline-block",
      transition: "all 0.3s ease",
      ...style,
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C9A96E";
      (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFFFFF";
      (e.currentTarget as HTMLButtonElement).style.color = "#5B090A";
    }}
  >
    {children}
  </button>
);

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{
    backgroundColor: "#7A1012",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid rgba(201,169,110,0.2)",
    ...style,
  }}>
    {children}
  </div>
);

export default function Index() {
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
      { threshold: 0.08 }
    );

    const elements = document.querySelectorAll(".aos");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const aosStyle: React.CSSProperties = {
    opacity: 0,
    transform: "translateY(28px)",
    transition: "opacity 0.75s ease, transform 0.75s ease",
  };

  const BG = "#5B090A";
  const GOLD = "#C9A96E";
  const WHITE = "#FFFFFF";
  const ff = { fontFamily: "'IBM Plex Sans', sans-serif" };
  const ffH = { fontFamily: "'Cormorant', Georgia, serif" };

  return (
    <div style={{ backgroundColor: BG, color: WHITE, minHeight: "100vh", ...ff }}>

      {/* ══════════════════════════════════════
          БЛОК 1 — HERO
      ══════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header style={{ padding: "24px 48px 16px", display: "flex", alignItems: "center" }}>
          <LogoRAD />
        </header>

        {/* Hero body */}
        <div style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: "48px",
          padding: "0 48px 64px",
          alignItems: "center",
        }} className="hero-grid">
          {/* Left: 60% */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Badges */}
            <div className="aos" style={{ ...aosStyle, display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Badge>🗓 11–12 марта</Badge>
              <Badge>💻 Онлайн</Badge>
              <Badge>🎓 Бесплатно</Badge>
            </div>

            {/* H1 */}
            <h1 className="aos" style={{
              ...aosStyle, ...ffH,
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

            {/* Subtitle */}
            <p className="aos" style={{
              ...aosStyle, ...ff,
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

            {/* CTA */}
            <div className="aos" style={{ ...aosStyle, display: "flex", flexDirection: "column", gap: "14px", transitionDelay: "0.3s" }}>
              <BtnWhite style={{ alignSelf: "flex-start" }}>
                ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →
              </BtnWhite>
              <p style={{ ...ff, fontSize: "13px", color: "rgba(255,255,255,0.42)", maxWidth: "460px", margin: 0, lineHeight: 1.5 }}>
                RAD ACADEMY — Топ-2 онлайн школа дизайна интерьера в рейтинге РБК · Анна Симонова — 18 лет практики, 100+ реализованных объектов
              </p>
            </div>
          </div>

          {/* Right: 40% photo */}
          <div className="aos" style={{ ...aosStyle, transitionDelay: "0.2s" }}>
            <div style={{
              borderRadius: "20px",
              overflow: "hidden",
              height: "clamp(300px, 58vh, 620px)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
              border: "1px solid rgba(201,169,110,0.25)",
              position: "relative",
            }}>
              <img
                src={HERO_IMG}
                alt="HoReCa интерьер"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8) saturate(0.85)" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 50%, rgba(91,9,10,0.6) 100%)",
              }} />
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
          <h2 className="aos" style={{
            ...aosStyle, ...ffH,
            fontSize: "clamp(32px, 4.5vw, 62px)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: WHITE,
            marginBottom: "48px",
          }}>
            HoReCa Education Day —<br />
            <span style={{ color: GOLD }}>для вас, если:</span>
          </h2>

          <div className="aos" style={{ ...aosStyle, display: "flex", flexDirection: "column", gap: "18px", transitionDelay: "0.1s" }}>
            {[
              "У вас 3+ лет опыта в дизайне интерьера",
              "Работаете с жилыми проектами и упёрлись в потолок по доходу",
              "Надоел бежевый минимализм — хочется масштабных объектов",
              "Хотите работать с отелями, ресторанами, кафе — но не знаете как войти и как считать услуги",
              "Нужна не теория, а живой кейс и работающая система",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: "20px", flexShrink: 0, marginTop: "2px" }}>✓</span>
                <span style={{ ...ff, fontSize: "clamp(16px, 1.3vw, 18px)", lineHeight: 1.65, color: "rgba(255,255,255,0.9)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="aos" style={{
            ...aosStyle, ...ff,
            fontSize: "clamp(16px, 1.2vw, 19px)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.72)",
            marginTop: "36px",
            transitionDelay: "0.2s",
          }}>
            Узнали себя? HoReCa Education Day создан именно для вас.
          </p>

          <div className="aos" style={{ ...aosStyle, marginTop: "32px", transitionDelay: "0.3s" }}>
            <BtnWhite>ХОЧУ ПОПАСТЬ НА ВОРКШОП →</BtnWhite>
          </div>
        </div>

        <div style={{ maxWidth: "860px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 3 — ЧТО ПОЛУЧИТЕ
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 className="aos" style={{
            ...aosStyle, ...ffH,
            fontSize: "clamp(28px, 3.8vw, 56px)",
            fontWeight: 600,
            lineHeight: 1.15,
            color: WHITE,
            textAlign: "center",
            maxWidth: "780px",
            margin: "0 auto 56px",
          }}>
            За 2 вечера вы получите то, на что другие тратят{" "}
            <span style={{ color: GOLD }}>годы проб и ошибок</span>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}>
            {[
              { icon: "🔢", title: "МЕТОДОЛОГИЯ РАСЧЁТА УСЛУГ", desc: "Как считать стоимость услуг в HoReCa — не квадратными метрами, а по профессиональной системе" },
              { icon: "🏨", title: "РАЗБОР ЖИВОГО КЕЙСА ОТЕЛЯ", desc: "Реальный объект студии RADDESIGN, реальные цифры и решения в формате Case Study" },
              { icon: "✏️", title: "ПРАКТИКА НА ВОРКШОПЕ", desc: "Получите задание, выполните, получите разбор от эксперта — это навык, а не просто знание" },
              { icon: "🗺", title: "АЛГОРИТМ СОЗДАНИЯ ДИЗАЙН-КОНЦЕПЦИИ В HORECA", desc: "Реальные примеры концепций от студии RADDESIGN — структура, логика, этапы" },
            ].map((card, i) => (
              <div key={i} className="aos" style={{
                ...aosStyle,
                transitionDelay: `${i * 0.1}s`,
                backgroundColor: "#7A1012",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid rgba(201,169,110,0.18)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}>
                <span style={{ fontSize: "40px" }}>{card.icon}</span>
                <h3 style={{ ...ffH, color: GOLD, fontSize: "clamp(15px, 1.1vw, 20px)", lineHeight: 1.2, fontWeight: 600, margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ ...ff, color: "rgba(255,255,255,0.8)", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                  {card.desc}
                </p>
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
          <h2 className="aos" style={{
            ...aosStyle, ...ffH,
            fontSize: "clamp(28px, 4vw, 58px)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: WHITE,
            textAlign: "center",
          }}>
            Программа <span style={{ color: GOLD }}>HoReCa Education Day</span>
          </h2>
          <p className="aos" style={{
            ...aosStyle, ...ff,
            fontSize: "clamp(16px, 1.2vw, 18px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.62)",
            textAlign: "center",
            maxWidth: "580px",
            margin: "16px auto 48px",
            transitionDelay: "0.1s",
          }}>
            Гарвардский метод обучения Case Study — это не лекция. Это живая работа с реальным кейсом.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="prog-grid">
            {[
              {
                day: "ДЕНЬ 1 — 11 МАРТА",
                title: "CASE STUDY: ЖИВОЙ РАЗБОР КЕЙСА ОТЕЛЯ",
                items: [
                  "Разбор реального кейса отеля студии RADDESIGN",
                  "Как устроена работа с HoReCa-клиентом изнутри",
                  "Авторская методология расчёта стоимости услуг в HoReCa",
                  "Практическое задание участникам",
                ],
                format: "онлайн-вебинар · ~2 часа · 19:00 мск",
              },
              {
                day: "ДЕНЬ 2 — 12 МАРТА",
                title: "АЛГОРИТМ СОЗДАНИЯ ДИЗАЙН-КОНЦЕПЦИИ В HORECA",
                items: [
                  "Структура, логика и этапы профессиональной концепции",
                  "Реальные примеры концепций RADDESIGN — отели, рестораны, кафе",
                  "Типичные ошибки дизайнеров при входе в HoReCa",
                  "Разбор заданий участников и ответы на вопросы",
                ],
                format: "онлайн-вебинар · ~2 часа · 19:00 мск",
              },
            ].map((prog, i) => (
              <Card key={i}>
                <div className="aos" style={{ ...aosStyle, transitionDelay: `${i * 0.15}s`, display: "flex", flexDirection: "column", gap: "20px", height: "100%" }}>
                  <div>
                    <span style={{ ...ff, fontSize: "11px", color: GOLD, letterSpacing: "0.22em", fontWeight: 600 }}>
                      {prog.day}
                    </span>
                    <h3 style={{ ...ffH, color: WHITE, fontSize: "clamp(17px, 1.4vw, 22px)", lineHeight: 1.2, fontWeight: 600, margin: "8px 0 0" }}>
                      {prog.title}
                    </h3>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {prog.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: GOLD, flexShrink: 0 }}>•</span>
                        <span style={{ ...ff, color: "rgba(255,255,255,0.82)", fontSize: "15px", lineHeight: 1.55 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ ...ff, color: "rgba(255,255,255,0.4)", fontSize: "13px", borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "16px", marginTop: "auto", letterSpacing: "0.03em" }}>
                    {prog.format}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="aos" style={{ ...aosStyle, display: "flex", justifyContent: "center", marginTop: "48px", transitionDelay: "0.2s" }}>
            <BtnWhite>ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →</BtnWhite>
          </div>
        </div>

        <div style={{ maxWidth: "1000px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          БЛОК 5 — СПИКЕР
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: BG, padding: "96px 48px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <p className="aos" style={{
            ...aosStyle, ...ff,
            fontSize: "11px",
            color: GOLD,
            letterSpacing: "0.25em",
            textAlign: "center",
            marginBottom: "48px",
            fontWeight: 600,
          }}>
            ЭКСПЕРТ HORECA EDUCATION DAY
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }} className="speaker-grid">
            {/* Photo */}
            <div className="aos" style={{ ...aosStyle }}>
              <div style={{
                borderRadius: "20px",
                overflow: "hidden",
                height: "clamp(380px, 60vh, 680px)",
                boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
                border: "1px solid rgba(201,169,110,0.3)",
                position: "relative",
              }}>
                <img
                  src={SPEAKER_IMG}
                  alt="Анна Симонова"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 55%, rgba(91,9,10,0.8) 100%)",
                }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px" }}>
                  <p style={{ ...ffH, color: WHITE, fontWeight: 600, fontSize: "30px", margin: 0 }}>Анна Симонова</p>
                  <p style={{ ...ff, color: "rgba(255,255,255,0.65)", fontSize: "14px", margin: "4px 0 0" }}>
                    Основатель RAD ACADEMY и студии RADDESIGN
                  </p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="aos" style={{ ...aosStyle, display: "flex", flexDirection: "column", gap: "24px", transitionDelay: "0.15s" }}>
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
                    <span style={{ ...ff, color: "rgba(255,255,255,0.87)", fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.6 }}>
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Quote */}
              <div style={{
                borderLeft: `3px solid ${GOLD}`,
                paddingLeft: "24px",
                marginTop: "8px",
              }}>
                <p style={{
                  ...ffH,
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(16px, 1.2vw, 19px)",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                  margin: 0,
                }}>
                  «Большинство дизайнеров из жилых проектов совершают одну и ту же ошибку в расчётах — и либо теряют деньги, либо теряют клиента. На HoReCa Education Day я покажу как этого избежать — на живом кейсе, а не в теории»
                </p>
                <p style={{ ...ff, fontSize: "13px", color: GOLD, letterSpacing: "0.05em", marginTop: "12px" }}>
                  — Анна Симонова
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "1000px", margin: "80px auto 0" }}><GoldDivider /></div>
      </section>


      {/* ══════════════════════════════════════
          ФУТЕР
      ══════════════════════════════════════ */}
      <footer style={{ backgroundColor: BG, padding: "64px 48px 48px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "48px", justifyContent: "space-between" }}>
          {/* Logo + contacts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <LogoRAD />
            <p style={{ ...ff, color: "rgba(255,255,255,0.35)", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
              © 2025 ИП Вылегжанина А.С.<br />
              <a href="mailto:mail@onlinerad.ru" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
                mail@onlinerad.ru
              </a>
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              {[
                { label: "Telegram", href: "https://t.me/rad_academy_design" },
                { label: "ВКонтакте", href: "https://vk.com/radacademy" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ ...ff, fontSize: "13px", color: "rgba(255,255,255,0.38)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Публичная оферта", href: "https://radacademy.ru/offer" },
              { label: "Политика обработки персональных данных", href: "https://radacademy.ru/privacy_policy" },
              { label: "Согласие на обработку персональных данных", href: "https://radacademy.ru/consent_user" },
              { label: "Контактная информация", href: "https://radacademy.ru/contacts" },
            ].map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{ ...ff, fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", lineHeight: 1.5 }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 0 24px 48px !important; }
          .prog-grid { grid-template-columns: 1fr !important; }
          .speaker-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
          header { padding-left: 24px !important; padding-right: 24px !important; }
          footer { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </div>
  );
}
