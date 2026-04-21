import { useEffect, useState } from "react";

const LOGO_URL = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/91d703e7-36fb-4865-bdab-1bea39a75ee0.png";
const SPEAKER_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/16e069e5-8b20-4fce-b724-fe6623d4d1f3.jpg";

const ACCENT = "#E8563A";
const BG_DARK = "#111111";
const BG_RIGHT = "#161616";
const FF = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const CSS = `
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0px rgba(232,86,58,0.55), 0 0 0 0px rgba(232,86,58,0.25); }
  70%  { box-shadow: 0 0 0 10px rgba(232,86,58,0), 0 0 0 22px rgba(232,86,58,0); }
  100% { box-shadow: 0 0 0 0px rgba(232,86,58,0), 0 0 0 0px rgba(232,86,58,0); }
}
.cta-pulse { animation: pulse-ring 2s ease-out infinite; }
.cta-pulse:hover { animation: none; background: #d0462c !important; }
.pain-line { display: block; font-size: clamp(22px, 2.8vw, 42px); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; color: #fff; margin-bottom: 6px; }
.result-num { color: #E8563A; }
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

const LEGAL_LINKS = (
  <div style={{ fontSize: 11, color: "#444", lineHeight: 1.9, textAlign: "center" }}>
    <a href="https://onlinerad.ru/privacy_policy" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "underline" }}>Политика конфиденциальности</a>
    <br />
    <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "underline" }}>Согласие на обработку персональных данных</a>
  </div>
);

export default function TrendsB2026Page() {
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
      const w = window as Window & { ym?: (id: unknown, action: string, goal: string) => void; VK?: { Goal: (g: string) => void } };
      if (w.ym) w.ym(undefined, "reachGoal", "cta_click");
      if (w.VK) w.VK.Goal("conversion");
    }
    setShowModal(true);
  }

  function handleTg() { window.open(buildBotUrl(TG_BOT_BASE), "_blank"); }
  function handleVk() { window.open(buildBotUrl(VK_BOT_BASE), "_blank"); }

  const canSubmit = checkPrivacy && checkConsent;

  return (
    <div style={{ background: BG_DARK, minHeight: "100vh", fontFamily: FF, color: "#fff", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* ── TOP BAR ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "14px 20px" : "16px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0, position: "relative", zIndex: 20,
        background: BG_DARK,
      }}>
        <img src={LOGO_URL} alt="RAD ACADEMY" style={{ height: isMobile ? 20 : 26, filter: "invert(1)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(232,86,58,0.12)", border: "1px solid rgba(232,86,58,0.35)", borderRadius: 40, padding: isMobile ? "4px 10px" : "5px 14px" }}>
          <span style={{ fontSize: 8, color: ACCENT }}>●</span>
          <span style={{ fontSize: isMobile ? 10 : 11, fontWeight: 600, letterSpacing: "0.05em", color: ACCENT, textTransform: "uppercase" }}>
            {isMobile ? "Бесплатный эфир" : "Бесплатный онлайн-эфир"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: isMobile ? 11 : 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
          <span>📅</span>
          <span>{isMobile ? eventShort : eventDate}</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <span>⏰</span>
          <span>19:00 МСК</span>
        </div>
      </header>

      {isMobile ? (
        /* ══════════ MOBILE ══════════ */
        <main style={{ flex: 1, paddingBottom: 120 }}>

          {/* БЛОК БОЛИ */}
          <div style={{
            background: "#0e0e0e",
            padding: "28px 20px 32px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* тёмная текстура-сетка */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.04,
              backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", color: "#c0392b", fontWeight: 700, textTransform: "uppercase", marginBottom: 20 }}>
                ЗНАКОМО?
              </div>
              <div>
                <span className="pain-line">Квартира 80 м²</span>
                <span className="pain-line">Чек 150–200 тыс. ₽</span>
                <span className="pain-line">Очередь на 4 месяца</span>
                <span className="pain-line" style={{ color: "rgba(255,255,255,0.55)" }}>А доход не растёт третий год</span>
              </div>
              <div style={{ marginTop: 20, fontSize: 12, color: "#444", fontStyle: "italic" }}>
                Так живут 80% дизайнеров жилых интерьеров
              </div>
            </div>
          </div>

          {/* БЛОК РЕШЕНИЯ */}
          <div style={{
            background: BG_RIGHT,
            padding: "28px 20px 32px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Акцентное свечение */}
            <div style={{
              position: "absolute", top: -60, right: -60, width: 280, height: 280,
              background: "radial-gradient(circle, rgba(232,86,58,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 20 }}>
                А МОЖНО ТАК:
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>Один проект ресторана —</div>
                <div style={{ fontSize: 34, fontWeight: 900, color: ACCENT, letterSpacing: "-0.02em", lineHeight: 1 }}>500 000 ₽</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 16, marginBottom: 4 }}>Один проект отеля —</div>
                <div style={{ fontSize: 34, fontWeight: 900, color: ACCENT, letterSpacing: "-0.02em", lineHeight: 1 }}>до 1 500 000 ₽</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginTop: 20 }}>Те же навыки. Другой рынок.</div>
              </div>

              {/* Фото */}
              <div style={{ position: "relative", height: 280, marginBottom: 16, overflow: "hidden", borderRadius: 12 }}>
                <img src={SPEAKER_PHOTO} alt="Анна Симонова" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to top, ${BG_RIGHT}, transparent)` }} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Анна Симонова</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>
                Основатель RAD ACADEMY · Практикующий дизайнер интерьеров
              </div>
            </div>
          </div>

          {/* CTA БЛОК */}
          <div style={{ padding: "28px 20px 0", textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: ACCENT, marginBottom: 8 }}>
              Бесплатный эфир
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2, textTransform: "uppercase", marginBottom: 20 }}>
              Тренды в дизайне интерьера 2026
              <br /><span style={{ fontSize: 15, fontWeight: 500, textTransform: "none", color: "rgba(255,255,255,0.65)" }}>Как зарабатывать больше и выйти на новый уровень клиентов</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {["📍 Сочи: 480 000 ₽ первый проект", "📍 Казань: чек ×4,7", "📍 Екатеринбург: доход ×3,8"].map((t, i) => (
                <div key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{t}</div>
              ))}
            </div>

            <div style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10, padding: "14px 16px", marginBottom: 20, textAlign: "left",
            }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                🎁 <strong>2 бонуса при регистрации:</strong> Чек-лист «10 шагов к проектам мечты в HoReCa» + Чек-лист «10 каналов продаж»
              </div>
            </div>

            <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
              Места ограничены · Ссылка на эфир придёт в Telegram-бот
            </div>
            {LEGAL_LINKS}
          </div>

          {/* Sticky кнопка */}
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            padding: "12px 20px", background: "rgba(17,17,17,0.97)",
            borderTop: "1px solid rgba(255,255,255,0.07)", zIndex: 100,
          }}>
            <button className="cta-pulse" onClick={handleCTA} style={{
              background: ACCENT, color: "#fff", border: "none", borderRadius: 10,
              padding: "16px 20px", fontSize: 13, fontWeight: 800, letterSpacing: "0.06em",
              textTransform: "uppercase", cursor: "pointer", width: "100%", fontFamily: FF,
            }}>
              Участвовать в эфире бесплатно
            </button>
          </div>
        </main>
      ) : (
        /* ══════════ DESKTOP ══════════ */
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>

          {/* ДВУХЗОННЫЙ БЛОК */}
          <div style={{ display: "flex", flex: 1, minHeight: 0, position: "relative" }}>

            {/* ЛЕВАЯ ЗОНА — БОЛЬ */}
            <div style={{
              width: "42%", flexShrink: 0,
              background: "#0e0e0e",
              padding: "48px 48px 48px 56px",
              display: "flex", flexDirection: "column", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              {/* сетка-текстура */}
              <div style={{
                position: "absolute", inset: 0, opacity: 0.035,
                backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)",
              }} />
              {/* диагональный градиент перехода вправо */}
              <div style={{
                position: "absolute", top: 0, right: -1, bottom: 0, width: "30%",
                background: `linear-gradient(to right, transparent 0%, ${BG_RIGHT} 100%)`,
                zIndex: 2,
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#c0392b", fontWeight: 700, textTransform: "uppercase", marginBottom: 28 }}>
                  ЗНАКОМО?
                </div>
                <div style={{ marginBottom: 32 }}>
                  <span className="pain-line">Квартира 80 м²</span>
                  <span className="pain-line">Чек 150–200 тыс. ₽</span>
                  <span className="pain-line">Очередь на 4 месяца</span>
                  <span className="pain-line" style={{ color: "rgba(255,255,255,0.45)" }}>А доход не растёт третий год</span>
                </div>
                <div style={{ fontSize: 13, color: "#3d3d3d", fontStyle: "italic" }}>
                  Так живут 80% дизайнеров жилых интерьеров
                </div>
              </div>
            </div>

            {/* ПРАВАЯ ЗОНА — РЕШЕНИЕ */}
            <div style={{
              flex: 1,
              background: BG_RIGHT,
              padding: "48px 56px 48px 64px",
              display: "flex", alignItems: "center",
              position: "relative", overflow: "hidden",
            }}>
              {/* акцентное свечение */}
              <div style={{
                position: "absolute", top: -100, right: -100, width: 500, height: 500,
                background: "radial-gradient(circle, rgba(232,86,58,0.1) 0%, transparent 65%)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: -80, right: 200, width: 400, height: 400,
                background: "radial-gradient(circle, rgba(232,86,58,0.06) 0%, transparent 65%)",
                pointerEvents: "none",
              }} />

              {/* Текст результата */}
              <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 28 }}>
                  А МОЖНО ТАК:
                </div>
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Один проект ресторана —</div>
                  <div style={{ fontSize: "clamp(32px, 3.5vw, 54px)", fontWeight: 900, color: ACCENT, letterSpacing: "-0.03em", lineHeight: 1 }}>500 000 ₽</div>
                  <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 20, marginBottom: 6 }}>Один проект отеля —</div>
                  <div style={{ fontSize: "clamp(32px, 3.5vw, 54px)", fontWeight: 900, color: ACCENT, letterSpacing: "-0.03em", lineHeight: 1 }}>до 1 500 000 ₽</div>
                  <div style={{ fontSize: "clamp(18px, 1.6vw, 24px)", fontWeight: 700, color: "#fff", marginTop: 24 }}>
                    Те же навыки. Другой рынок.
                  </div>
                </div>
              </div>

              {/* Фото спикера */}
              <div style={{ width: "38%", flexShrink: 0, position: "relative", height: "100%", display: "flex", alignItems: "flex-end" }}>
                <div style={{ position: "relative", width: "100%", height: "90%" }}>
                  <img
                    src={SPEAKER_PHOTO}
                    alt="Анна Симонова"
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "top center",
                      display: "block",
                    }}
                  />
                  {/* Градиент по краям фото */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(to top, ${BG_RIGHT}, transparent)` }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: `linear-gradient(to bottom, ${BG_RIGHT}, transparent)` }} />
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "30%", background: `linear-gradient(to right, ${BG_RIGHT}, transparent)` }} />
                </div>
                <div style={{ position: "absolute", bottom: 24, left: 16, zIndex: 2 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Анна Симонова</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>
                    Основатель RAD ACADEMY<br />Практикующий дизайнер интерьеров
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* НИЖНЯЯ ПОЛОСА CTA */}
          <div style={{
            background: "#0f0f0f",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "36px 40px",
            textAlign: "center",
            flexShrink: 0,
          }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
              Бесплатный эфир
            </div>
            <div style={{ fontSize: "clamp(18px, 1.8vw, 26px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: 6 }}>
              Тренды в дизайне интерьера 2026
            </div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
              Как зарабатывать больше и выйти на новый уровень клиентов
            </div>

            {/* Кейсы */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {["📍 Сочи: 480 000 ₽ первый проект", "📍 Казань: чек ×4,7", "📍 Екатеринбург: доход ×3,8"].map((t, i, arr) => (
                <span key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                  {t}{i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>·</span>}
                </span>
              ))}
            </div>

            {/* Кнопка */}
            <button className="cta-pulse" onClick={handleCTA} style={{
              background: ACCENT, color: "#fff", border: "none", borderRadius: 10,
              padding: "18px 56px", fontSize: 15, fontWeight: 800, letterSpacing: "0.07em",
              textTransform: "uppercase", cursor: "pointer", marginBottom: 16, fontFamily: FF,
            }}>
              Участвовать в эфире бесплатно
            </button>

            {/* Бонус */}
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
              🎁 2 бонуса при регистрации: Чек-лист «10 шагов к проектам мечты в HoReCa» + Чек-лист «10 каналов продаж для дизайнера»
            </div>
            <div style={{ fontSize: 12, color: "#444", marginBottom: 6 }}>
              Места ограничены · Ссылка на эфир придёт в Telegram-бот
            </div>
            {LEGAL_LINKS}
          </div>
        </main>
      )}

      {/* ── ПОПАП ── */}
      {showModal && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
        >
          <div style={{
            background: "#1e1e1e", borderRadius: 16,
            padding: isMobile ? "32px 24px" : "40px 48px",
            maxWidth: 440, width: "100%", textAlign: "center",
            position: "relative", border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#666", fontSize: 22, cursor: "pointer" }}>×</button>

            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, marginBottom: 8, color: "#fff" }}>
              Выберите удобный способ<br />регистрации на эфир
            </div>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 24 }}>
              Ссылка на эфир придёт после регистрации
            </div>

            {/* Галочки */}
            <div style={{ textAlign: "left", marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={checkPrivacy}
                  onChange={(e) => setCheckPrivacy(e.target.checked)}
                  style={{ marginTop: 2, accentColor: ACCENT, width: 16, height: 16, flexShrink: 0 }}
                />
                <span style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>
                  Я ознакомился(-ась) с{" "}
                  <a href="https://onlinerad.ru/privacy_policy" target="_blank" rel="noopener noreferrer" style={{ color: "#999", textDecoration: "underline" }}>
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
                <span style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>
                  Я даю{" "}
                  <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer" style={{ color: "#999", textDecoration: "underline" }}>
                    Согласие на обработку персональных данных
                  </a>
                </span>
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={handleTg}
                disabled={!canSubmit}
                style={{
                  background: canSubmit ? "#229ED9" : "#2a2a2a",
                  color: canSubmit ? "#fff" : "#555",
                  border: "none", borderRadius: 10,
                  padding: "15px 20px", fontSize: 15, fontWeight: 700,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  fontFamily: FF, transition: "background 0.2s, color 0.2s",
                }}
              >
                <span style={{ fontSize: 20 }}>✈️</span> Зарегистрироваться через Telegram
              </button>
              <button
                onClick={handleVk}
                disabled={!canSubmit}
                style={{
                  background: canSubmit ? "#0077FF" : "#2a2a2a",
                  color: canSubmit ? "#fff" : "#555",
                  border: "none", borderRadius: 10,
                  padding: "15px 20px", fontSize: 15, fontWeight: 700,
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  fontFamily: FF, transition: "background 0.2s, color 0.2s",
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
