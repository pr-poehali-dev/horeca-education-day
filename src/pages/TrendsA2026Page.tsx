import { useEffect, useState } from "react";

const LOGO_URL = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/91d703e7-36fb-4865-bdab-1bea39a75ee0.png";
const SPEAKER_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/16e069e5-8b20-4fce-b724-fe6623d4d1f3.jpg";

const ACCENT = "#E8563A";
const BG = "#1A1A1A";
const FF = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const PULSE_CSS = `
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0px rgba(232,86,58,0.55), 0 0 0 0px rgba(232,86,58,0.25); }
  70%  { box-shadow: 0 0 0 10px rgba(232,86,58,0), 0 0 0 22px rgba(232,86,58,0); }
  100% { box-shadow: 0 0 0 0px rgba(232,86,58,0), 0 0 0 0px rgba(232,86,58,0); }
}
.cta-pulse {
  animation: pulse-ring 2s ease-out infinite;
}
.cta-pulse:hover {
  animation: none;
  background: #d0462c !important;
}
`;

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
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
  { icon: "📊", text: "Почему рынок HoReCa растёт — и профессиональных дизайнеров критически не хватает" },
  { icon: "💰", text: "Реальные кейсы выпускников с цифрами: рост дохода ×3–5" },
  { icon: "🧠", text: "Чем мышление дизайнера HoReCa отличается от мышления дизайнера жилых интерьеров" },
  { icon: "🚀", text: "Как войти в нишу, даже если вы всю жизнь работали только с квартирами" },
];

export default function TrendsA2026Page() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [checkConsent, setCheckConsent] = useState(false);
  const eventDate = getTomorrowDate();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function handleCTA() {
    if (typeof window !== "undefined") {
      const w = window as Window & { ym?: (id: unknown, action: string, goal: string) => void; VK?: { Goal: (g: string) => void } };
      if (w.ym) w.ym(undefined, "reachGoal", "cta_click");
      if (w.VK) w.VK.Goal("conversion");
    }
    setShowModal(true);
  }

  function handleTg() { window.open(buildBotUrl(TG_BOT_BASE), "_blank"); }
  function handleVk() { window.open(buildBotUrl(VK_BOT_BASE), "_blank"); }

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: FF, color: "#fff", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <style>{PULSE_CSS}</style>

      {/* TOP BAR */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "16px 20px" : "18px 48px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0, position: "relative", zIndex: 10,
      }}>
        <img src={LOGO_URL} alt="RAD ACADEMY" style={{ height: isMobile ? 22 : 28, filter: "invert(1)" }} />
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(232,86,58,0.12)", border: "1px solid rgba(232,86,58,0.35)",
          borderRadius: 40, padding: isMobile ? "5px 12px" : "6px 16px",
        }}>
          <span style={{ fontSize: 9, color: ACCENT }}>●</span>
          <span style={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, letterSpacing: "0.05em", color: ACCENT, textTransform: "uppercase" }}>
            {isMobile ? "Бесплатный эфир" : "Бесплатный онлайн-эфир"}
          </span>
        </div>
      </header>

      {/* MAIN */}
      {isMobile ? (
        /* ========== MOBILE ========== */
        <main style={{ flex: 1, paddingBottom: 100 }}>
          <div style={{ padding: "24px 20px 0" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.12em", color: ACCENT, fontWeight: 600, textTransform: "uppercase", marginBottom: 14 }}>
              Бесплатный онлайн-эфир Анны Симоновой
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", textTransform: "uppercase", margin: "0 0 18px", color: "#fff" }}>
              Тренды в дизайне интерьера. Как в 2026 году зарабатывать больше и выйти на новый уровень клиентов
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <span>📅</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{eventDate}</span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span>⏰</span>
              <span style={{ fontSize: 15, fontWeight: 700 }}>19:00 МСК</span>
            </div>
          </div>

          {/* Фото — вписано в блок с градиентом */}
          <div style={{ position: "relative", width: "100%", height: 340, overflow: "hidden" }}>
            <img
              src={SPEAKER_PHOTO}
              alt="Анна Симонова"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
            />
            {/* Градиент сверху — вливается в фон */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
            {/* Градиент снизу */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(to top, ${BG}, transparent)` }} />
          </div>

          <div style={{ padding: "0 20px" }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Анна Симонова</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 2, marginBottom: 24 }}>
              Основатель RAD ACADEMY · Практикующий дизайнер интерьеров
            </div>

            {BULLETS.map((b, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{b.icon}</span>
                <span style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.88)" }}>{b.text}</span>
              </div>
            ))}

            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12, padding: "16px", margin: "20px 0",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>🎁 При регистрации вы получите 2 бонуса:</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                • Чек-лист «Как дизайнеру начать работу с ресторанами. 10 шагов к проектам мечты»<br />
                • Чек-лист «10 каналов продаж для дизайнера»
              </div>
            </div>

            <div style={{ fontSize: 12, color: "#555", textAlign: "center", paddingBottom: 4 }}>
              Количество мест ограничено · Ссылка на эфир придёт в Telegram-бот
            </div>
            <div style={{ fontSize: 11, color: "#444", textAlign: "center", lineHeight: 1.8, paddingBottom: 8 }}>
              <a href="https://onlinerad.ru/privacy_policy" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "underline" }}>Политика конфиденциальности</a>
              <br />
              <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "underline" }}>Согласие на обработку персональных данных</a>
            </div>
          </div>

          {/* Sticky кнопка */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            padding: "12px 20px", background: "rgba(26,26,26,0.97)",
            borderTop: "1px solid rgba(255,255,255,0.07)", zIndex: 100,
          }}>
            <button
              className="cta-pulse"
              onClick={handleCTA}
              style={{
                background: ACCENT, color: "#fff", border: "none", borderRadius: 10,
                padding: "16px 20px", fontSize: 14, fontWeight: 800, letterSpacing: "0.06em",
                textTransform: "uppercase", cursor: "pointer", width: "100%", fontFamily: FF,
              }}
            >
              Участвовать в эфире бесплатно
            </button>
          </div>
        </main>
      ) : (
        /* ========== DESKTOP ========== */
        <main style={{
          flex: 1, display: "flex", flexDirection: "row",
          maxWidth: 1400, margin: "0 auto", width: "100%",
          overflow: "hidden",
        }}>
          {/* LEFT — фото вписано в колонку */}
          <div style={{ width: "45%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
            {/* Фото на всю высоту колонки */}
            <img
              src={SPEAKER_PHOTO}
              alt="Анна Симонова"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top center",
                display: "block",
              }}
            />
            {/* Градиент сверху — вливается в шапку */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 80,
              background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
            }} />
            {/* Градиент справа — вливается в правую колонку */}
            <div style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: "45%",
              background: `linear-gradient(to right, transparent 0%, ${BG} 100%)`,
            }} />
            {/* Градиент снизу */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
              background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
            }} />

            {/* Подпись спикера */}
            <div style={{ position: "absolute", bottom: 40, left: 32 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Анна Симонова</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>
                Основатель RAD ACADEMY<br />Практикующий дизайнер интерьеров
              </div>
            </div>
          </div>

          {/* RIGHT — контент */}
          <div style={{
            width: "55%", display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "40px 48px 40px 24px",
          }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", color: ACCENT, fontWeight: 600, textTransform: "uppercase", marginBottom: 18 }}>
              Бесплатный онлайн-эфир Анны Симоновой
            </div>

            <h1 style={{
              fontSize: "clamp(24px, 2.5vw, 40px)", fontWeight: 800,
              lineHeight: 1.13, letterSpacing: "-0.02em", textTransform: "uppercase",
              margin: "0 0 24px", color: "#fff",
            }}>
              Тренды в дизайне интерьера. Как в 2026 году зарабатывать больше и выйти на новый уровень клиентов
            </h1>

            {/* Дата */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 28,
              padding: "12px 20px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, width: "fit-content",
            }}>
              <span style={{ fontSize: 16 }}>📅</span>
              <span style={{ fontSize: 17, fontWeight: 700 }}>{eventDate}</span>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 18 }}>·</span>
              <span style={{ fontSize: 16 }}>⏰</span>
              <span style={{ fontSize: 17, fontWeight: 700 }}>19:00 МСК</span>
            </div>

            {/* Буллиты */}
            <div style={{ marginBottom: 28 }}>
              {BULLETS.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{b.icon}</span>
                  <span style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.88)" }}>{b.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className="cta-pulse"
              onClick={handleCTA}
              style={{
                background: ACCENT, color: "#fff", border: "none", borderRadius: 10,
                padding: "18px 32px", fontSize: 16, fontWeight: 800,
                letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: "pointer", width: "100%", maxWidth: 480, marginBottom: 20,
                fontFamily: FF,
              }}
            >
              Участвовать в эфире бесплатно
            </button>

            {/* Бонусы */}
            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "16px 20px", marginBottom: 14, maxWidth: 480,
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>🎁 При регистрации вы получите 2 бонуса:</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                • Чек-лист «Как дизайнеру начать работу с ресторанами. 10 шагов к проектам мечты»<br />
                • Чек-лист «10 каналов продаж для дизайнера»
              </div>
            </div>

            <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>
              Количество мест ограничено · Ссылка на эфир придёт в Telegram-бот
            </div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.9, maxWidth: 480 }}>
              <a href="https://onlinerad.ru/privacy_policy" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "underline" }}>Политика конфиденциальности</a>
              <br />
              <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "underline" }}>Согласие на обработку персональных данных</a>
            </div>
          </div>
        </main>
      )}

      {/* ПОПАП */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
        >
          <div style={{
            background: "#232323", borderRadius: 16,
            padding: isMobile ? "32px 24px" : "40px 48px",
            maxWidth: 440, width: "100%", textAlign: "center",
            position: "relative", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#888", fontSize: 22, cursor: "pointer" }}
            >×</button>

            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, marginBottom: 8, color: "#fff" }}>
              Выберите удобный способ<br />регистрации на эфир
            </div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 28 }}>
              Ссылка на эфир придёт после регистрации
            </div>

            {/* Галочки согласий */}
            <div style={{ textAlign: "left", marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={checkPrivacy}
                  onChange={(e) => setCheckPrivacy(e.target.checked)}
                  style={{ marginTop: 2, accentColor: ACCENT, width: 16, height: 16, flexShrink: 0 }}
                />
                <span style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>
                  Я ознакомился(-ась) с{" "}
                  <a href="https://onlinerad.ru/privacy_policy" target="_blank" rel="noopener noreferrer" style={{ color: "#aaa", textDecoration: "underline" }}>
                    Политикой конфиденциальности
                  </a>
                </span>
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={checkConsent}
                  onChange={(e) => setCheckConsent(e.target.checked)}
                  style={{ marginTop: 2, accentColor: ACCENT, width: 16, height: 16, flexShrink: 0 }}
                />
                <span style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>
                  Я даю{" "}
                  <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer" style={{ color: "#aaa", textDecoration: "underline" }}>
                    Согласие на обработку персональных данных
                  </a>
                </span>
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={handleTg}
                disabled={!checkPrivacy || !checkConsent}
                style={{
                  background: checkPrivacy && checkConsent ? "#229ED9" : "#333", color: checkPrivacy && checkConsent ? "#fff" : "#666",
                  border: "none", borderRadius: 10,
                  padding: "15px 20px", fontSize: 15, fontWeight: 700,
                  cursor: checkPrivacy && checkConsent ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: FF,
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <span style={{ fontSize: 20 }}>✈️</span> Зарегистрироваться через Telegram
              </button>
              <button
                onClick={handleVk}
                disabled={!checkPrivacy || !checkConsent}
                style={{
                  background: checkPrivacy && checkConsent ? "#0077FF" : "#333", color: checkPrivacy && checkConsent ? "#fff" : "#666",
                  border: "none", borderRadius: 10,
                  padding: "15px 20px", fontSize: 15, fontWeight: 700,
                  cursor: checkPrivacy && checkConsent ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: FF,
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                <span style={{ fontSize: 20 }}>🔵</span> Зарегистрироваться через ВКонтакте
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}