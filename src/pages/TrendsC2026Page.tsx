import { useEffect, useState } from "react";

const LOGO_URL = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/91d703e7-36fb-4865-bdab-1bea39a75ee0.png";
const SPEAKER_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/871ac838-40c9-4f5f-ab5d-2f119d76a250.jpg";

const NAVY = "#1B3A5C";
const GOLD = "#C4956A";
const BG = "#F5F3EF";
const TEXT = "#1A1A1A";
const MUTED = "#6B6B6B";
const FF_SERIF = "'Playfair Display', Georgia, serif";
const FF_SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }

@keyframes cta-hover-lift {
  from { transform: translateY(0); }
  to   { transform: translateY(-2px); }
}

.cta-btn {
  background: ${NAVY};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: ${FF_SANS};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.cta-btn:hover {
  background: #0F2844;
  box-shadow: 0 4px 20px rgba(27,58,92,0.28);
  transform: translateY(-1px);
}

.case-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(27,58,92,0.08);
  transition: all 0.28s ease;
  padding: 24px;
  flex: 1;
}
.case-card:hover {
  box-shadow: 0 8px 32px rgba(27,58,92,0.15);
  transform: translateY(-2px);
}

.bullet-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: ${FF_SANS};
  color: ${TEXT};
  line-height: 1.5;
}
`;

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return { full: `${day}.${month}.${year}`, short: `${day}.${month}` };
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  return utm;
}

function buildBotUrl(base: string) {
  const utm = getUtmParams();
  const keys = Object.keys(utm);
  if (keys.length === 0) return base;
  const startParam = keys.map((k) => `${k}=${utm[k]}`).join("__");
  return `${base}?start=${encodeURIComponent(startParam)}`;
}

const TG_BOT_BASE = "https://t.me/radacademy_bot";
const VK_BOT_BASE = "https://vk.me/radacademy";

const BULLETS = [
  "Почему рынок HoReCa растёт — и профессиональных дизайнеров критически не хватает",
  "Реальные кейсы выпускников с цифрами: рост дохода ×3–5",
  "Чем мышление дизайнера HoReCa отличается от мышления дизайнера жилых интерьеров",
  "Как войти в нишу, даже если вы всю жизнь работали только с квартирами",
];

const CASES = [
  { city: "Сочи", name: "Татьяна", num: "480 000 ₽", desc: "первый проект HoReCa" },
  { city: "Казань", name: "Наталья", num: "×4,7", desc: "рост чека за 6 месяцев" },
  { city: "Екатеринбург", name: "Марина", num: "×3,8", desc: "рост дохода за 8 месяцев" },
];

const LEGAL_LINKS = (isMobile: boolean) => (
  <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.9, textAlign: "center", fontFamily: FF_SANS }}>
    <a href="https://onlinerad.ru/privacy_policy" target="_blank" rel="noopener noreferrer"
      style={{ color: "#bbb", textDecoration: "underline" }}>Политика конфиденциальности</a>
    {isMobile ? <br /> : "  ·  "}
    <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer"
      style={{ color: "#bbb", textDecoration: "underline" }}>Согласие на обработку персональных данных</a>
  </div>
);

export default function TrendsC2026Page() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [checkConsent, setCheckConsent] = useState(false);
  const { full: eventDate, short: eventShort } = getTomorrowDate();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function handleCTA() {
    if (typeof window !== "undefined") {
      const w = window as Window & { ym?: (id: unknown, a: string, g: string) => void; VK?: { Goal: (g: string) => void } };
      if (w.ym) w.ym(undefined, "reachGoal", "cta_click");
      if (w.VK) w.VK.Goal("conversion");
    }
    setShowModal(true);
  }

  function handleTg() { window.open(buildBotUrl(TG_BOT_BASE), "_blank"); }
  function handleVk() { window.open(buildBotUrl(VK_BOT_BASE), "_blank"); }

  const canSubmit = checkPrivacy && checkConsent;

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: FF_SANS, color: TEXT, display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* ── ШАПКА ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "14px 20px" : "16px 48px",
        borderBottom: `1px solid rgba(196,149,106,0.2)`,
        background: BG,
        flexShrink: 0,
      }}>
        {/* Логотип — тёмно-синий */}
        <img src={LOGO_URL} alt="RAD ACADEMY"
          style={{ height: isMobile ? 20 : 26, filter: "invert(18%) sepia(60%) saturate(500%) hue-rotate(185deg) brightness(50%)" }} />

        {/* Лейбл */}
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          background: `rgba(196,149,106,0.13)`,
          border: `1px solid rgba(196,149,106,0.4)`,
          borderRadius: 40, padding: isMobile ? "4px 10px" : "5px 14px",
        }}>
          <span style={{ color: GOLD, fontSize: 10 }}>✦</span>
          <span style={{ fontSize: isMobile ? 10 : 11, fontWeight: 600, letterSpacing: "0.06em", color: GOLD, textTransform: "uppercase", fontFamily: FF_SANS }}>
            {isMobile ? "Бесплатный эфир" : "Бесплатный онлайн-эфир"}
          </span>
        </div>

        {/* Дата */}
        <div style={{ fontSize: isMobile ? 11 : 13, color: MUTED, fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
          <span>📅</span>
          <span>{isMobile ? eventShort : eventDate}</span>
          <span style={{ color: "rgba(0,0,0,0.2)" }}>·</span>
          <span>19:00 МСК</span>
        </div>
      </header>

      {isMobile ? (
        /* ══════════ MOBILE ══════════ */
        <main style={{ flex: 1, paddingBottom: 100 }}>

          {/* ЗАГОЛОВОЧНЫЙ БЛОК */}
          <div style={{ padding: "32px 20px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", color: GOLD, fontWeight: 600, textTransform: "uppercase", marginBottom: 18, fontFamily: FF_SANS }}>
              Бесплатный онлайн-эфир для дизайнеров интерьера
            </div>
            <h1 style={{ fontFamily: FF_SERIF, fontSize: "clamp(26px, 7vw, 36px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 16px", letterSpacing: "-0.01em" }}>
              Один проект ресторана<br />= 500 000 ₽<br />
              <span style={{ fontSize: "0.8em", fontWeight: 700 }}>При той же загрузке — доход ×3</span>
            </h1>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6, margin: 0 }}>
              Узнайте, как дизайнеры жилых интерьеров переходят в HoReCa и увеличивают доход в 3–5 раз. Реальные кейсы на эфире.
            </p>
          </div>

          {/* СПИКЕР */}
          <div style={{ margin: "0 20px 24px", background: `rgba(27,58,92,0.05)`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: "50%", border: `2px solid ${GOLD}`, overflow: "hidden" }}>
              <img src={SPEAKER_PHOTO} alt="Анна Симонова" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 2 }}>Анна Симонова</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.4 }}>Основатель RAD ACADEMY<br />Практикующий дизайнер интерьеров</div>
            </div>
          </div>

          {/* БУЛЛИТЫ */}
          <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {BULLETS.map((b, i) => (
              <div key={i} className="bullet-row" style={{ fontSize: 14 }}>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 2 }}>✦</span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* ЗОЛОТАЯ ЛИНИЯ */}
          <div style={{ width: "60%", height: 1, background: GOLD, opacity: 0.35, margin: "0 auto 24px" }} />

          {/* КЕЙСЫ — вертикально */}
          <div style={{ padding: "0 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {CASES.map((c, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px rgba(27,58,92,0.08)", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 10, color: MUTED, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>📍 {c.city} · {c.name}</div>
                  <div style={{ fontSize: 12, color: MUTED }}>{c.desc}</div>
                </div>
                <div style={{ fontFamily: FF_SERIF, fontSize: 26, fontWeight: 700, color: NAVY, letterSpacing: "-0.02em", flexShrink: 0, marginLeft: 12 }}>{c.num}</div>
              </div>
            ))}
          </div>

          {/* БОНУС */}
          <div style={{ padding: "0 20px", textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
              <span style={{ color: GOLD }}>✦</span>{" "}
              <strong style={{ color: TEXT }}>2 бонуса при регистрации:</strong> Чек-лист «10 шагов к проектам мечты в HoReCa» + Чек-лист «10 каналов продаж»
            </div>
            <div style={{ fontSize: 12, color: "#bbb", marginTop: 8 }}>
              Места ограничены · Ссылка на эфир придёт в Telegram-бот
            </div>
            <div style={{ marginTop: 8 }}>{LEGAL_LINKS(true)}</div>
          </div>

          {/* STICKY КНОПКА */}
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 20px", background: BG, borderTop: `1px solid rgba(196,149,106,0.2)`, zIndex: 100 }}>
            <button className="cta-btn" onClick={handleCTA}
              style={{ width: "100%", padding: "16px", fontSize: 13, letterSpacing: "1px" }}>
              Участвовать в эфире бесплатно
            </button>
          </div>
        </main>
      ) : (
        /* ══════════ DESKTOP ══════════ */
        <main style={{ flex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "52px 40px 64px" }}>

          {/* ЗАГОЛОВОЧНЫЙ БЛОК */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.2em", color: GOLD, fontWeight: 600, textTransform: "uppercase", marginBottom: 20, fontFamily: FF_SANS }}>
              Бесплатный онлайн-эфир для дизайнеров интерьера
            </div>
            <h1 style={{ fontFamily: FF_SERIF, fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 700, color: NAVY, lineHeight: 1.2, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
              Один проект ресторана = 500 000 ₽<br />
              При той же загрузке — доход ×3
            </h1>
            <p style={{ fontSize: 17, color: MUTED, lineHeight: 1.65, margin: "0 auto", maxWidth: 620 }}>
              Узнайте, как дизайнеры жилых интерьеров переходят в HoReCa и увеличивают доход в 3–5 раз. Реальные кейсы на эфире.
            </p>
          </div>

          {/* СПИКЕР */}
          <div style={{ background: `rgba(27,58,92,0.05)`, borderRadius: 12, padding: "20px 28px", display: "flex", alignItems: "center", gap: 20, marginBottom: 36, maxWidth: 600, margin: "0 auto 36px" }}>
            <div style={{ flexShrink: 0, width: 72, height: 72, borderRadius: "50%", border: `2px solid ${GOLD}`, overflow: "hidden" }}>
              <img src={SPEAKER_PHOTO} alt="Анна Симонова" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: TEXT, marginBottom: 4 }}>Анна Симонова</div>
              <div style={{ fontSize: 13, color: MUTED }}>Основатель RAD ACADEMY · Практикующий дизайнер интерьеров</div>
            </div>
          </div>

          {/* БУЛЛИТЫ 2×2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 40px", marginBottom: 40, maxWidth: 740, margin: "0 auto 40px" }}>
            {BULLETS.map((b, i) => (
              <div key={i} className="bullet-row" style={{ fontSize: 14 }}>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 2 }}>✦</span>
                <span style={{ color: TEXT }}>{b}</span>
              </div>
            ))}
          </div>

          {/* ЗОЛОТАЯ ЛИНИЯ */}
          <div style={{ width: "60%", height: 1, background: GOLD, opacity: 0.35, margin: "0 auto 36px" }} />

          {/* КЕЙСЫ */}
          <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
            {CASES.map((c, i) => (
              <div key={i} className="case-card">
                <div style={{ fontSize: 11, color: MUTED, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                  📍 {c.city} · {c.name}
                </div>
                <div style={{ fontFamily: FF_SERIF, fontSize: 32, fontWeight: 700, color: NAVY, lineHeight: 1, marginBottom: 8 }}>
                  {c.num}
                </div>
                <div style={{ fontSize: 13, color: MUTED }}>{c.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <button className="cta-btn" onClick={handleCTA}
              style={{ padding: "18px 56px", fontSize: 14, letterSpacing: "1.5px", marginBottom: 16 }}>
              Участвовать в эфире бесплатно
            </button>
            <div style={{ fontSize: 14, color: MUTED, marginBottom: 8 }}>
              <span style={{ color: GOLD }}>✦</span>{" "}
              <strong style={{ color: TEXT }}>2 бонуса при регистрации:</strong> Чек-лист «10 шагов к проектам мечты в HoReCa» + Чек-лист «10 каналов продаж»
            </div>
            <div style={{ fontSize: 12, color: "#bbb", marginBottom: 10 }}>
              Места ограничены · Ссылка на эфир придёт в Telegram-бот
            </div>
            {LEGAL_LINKS(false)}
          </div>
        </main>
      )}

      {/* ── ПОПАП ── */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(27,58,92,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div style={{ background: "#fff", borderRadius: 16, padding: isMobile ? "32px 24px" : "40px 48px", maxWidth: 440, width: "100%", textAlign: "center", position: "relative", boxShadow: "0 16px 64px rgba(27,58,92,0.18)" }}>
            <button onClick={() => setShowModal(false)}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#aaa", fontSize: 22, cursor: "pointer" }}>×</button>

            <div style={{ color: GOLD, fontSize: 22, marginBottom: 12 }}>✦</div>
            <div style={{ fontFamily: FF_SERIF, fontSize: isMobile ? 20 : 24, fontWeight: 700, color: NAVY, marginBottom: 8 }}>
              Выберите способ<br />регистрации
            </div>
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 24 }}>
              Ссылка на эфир придёт после регистрации
            </div>

            {/* Галочки */}
            <div style={{ textAlign: "left", marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={checkPrivacy} onChange={(e) => setCheckPrivacy(e.target.checked)}
                  style={{ marginTop: 2, accentColor: NAVY, width: 16, height: 16, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>
                  Я ознакомился(-ась) с{" "}
                  <a href="https://onlinerad.ru/privacy_policy" target="_blank" rel="noopener noreferrer"
                    style={{ color: NAVY, textDecoration: "underline" }}>Политикой конфиденциальности</a>
                </span>
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={checkConsent} onChange={(e) => setCheckConsent(e.target.checked)}
                  style={{ marginTop: 2, accentColor: NAVY, width: 16, height: 16, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>
                  Я даю{" "}
                  <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer"
                    style={{ color: NAVY, textDecoration: "underline" }}>Согласие на обработку персональных данных</a>
                </span>
              </label>
            </div>

            {/* Кнопки */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button onClick={handleTg} disabled={!canSubmit} style={{
                background: canSubmit ? "#229ED9" : "#e8e8e8",
                color: canSubmit ? "#fff" : "#aaa",
                border: "none", borderRadius: 10, padding: "15px 20px", fontSize: 15, fontWeight: 700,
                cursor: canSubmit ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                fontFamily: FF_SANS, transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 20 }}>✈️</span> Зарегистрироваться через Telegram
              </button>
              <button onClick={handleVk} disabled={!canSubmit} style={{
                background: canSubmit ? "#0077FF" : "#e8e8e8",
                color: canSubmit ? "#fff" : "#aaa",
                border: "none", borderRadius: 10, padding: "15px 20px", fontSize: 15, fontWeight: 700,
                cursor: canSubmit ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                fontFamily: FF_SANS, transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 20 }}>🔵</span> Зарегистрироваться через ВКонтакте
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
