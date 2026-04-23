import { useState, useEffect, useRef } from "react";

const SPEAKER_PHOTO = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/871ac838-40c9-4f5f-ab5d-2f119d76a250.jpg";
const LOGO_URL = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/44a27379-1a68-407c-9292-41e3c0efbb68.png";

const TG_URL = "https://t.me/RADACADEMY_HELPER_bot?start=dl-1776858800f2d9791d16e1";
const VK_URL = "https://vk.com/app6379730_-209389887#l=8&auto=1";

const ACCENT = "#E8563A";
const ACCENT2 = "#FF8F5C";
const BG = "#111114";
const BG2 = "#1A1A1E";
const MUTED = "#8A8A8E";
const FF = "'Inter', 'Segoe UI', sans-serif";

const BULLETS = [
  "Почему рынок HoReCa растёт — и дизайнеров критически не хватает",
  "Один проект ресторана = 500 000 ₽. Как выйти на этот уровень",
  "Кейсы выпускников: рост дохода ×3–5 за 6–8 месяцев",
  "Пошаговый план перехода из жилого дизайна в коммерческий",
];

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  return { day: String(d.getDate()), month: months[d.getMonth()], short: `${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}` };
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((v, k) => { if (k.startsWith("utm_")) result[k] = v; });
  return result;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  .d-cta-btn { transition: transform 0.18s, box-shadow 0.18s, background 0.18s; }
  .d-cta-btn:hover { transform: scale(1.025); box-shadow: 0 0 60px rgba(232,86,58,0.5) !important; background: linear-gradient(135deg,#D04A2F,#F07840) !important; }
  .d-tg-btn { transition: background 0.18s, opacity 0.18s; }
  .d-tg-btn:hover:not(:disabled) { background: #1a8ac5 !important; }
  .d-vk-btn { transition: background 0.18s; }
  .d-vk-btn:hover:not(:disabled) { background: #0060cc !important; }
  @keyframes noise-anim {
    0% { transform: translate(0,0); }
    10% { transform: translate(-2%,-3%); }
    20% { transform: translate(3%,2%); }
    30% { transform: translate(-1%,4%); }
    40% { transform: translate(2%,-2%); }
    50% { transform: translate(-3%,1%); }
    60% { transform: translate(1%,3%); }
    70% { transform: translate(-2%,-1%); }
    80% { transform: translate(3%,-3%); }
    90% { transform: translate(-1%,2%); }
    100% { transform: translate(0,0); }
  }
  @keyframes float1 { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
  @keyframes float2 { 0%,100%{transform:translateY(0) rotate(8deg)} 50%{transform:translateY(-8px) rotate(-4deg)} }
  @keyframes float3 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(6deg)} }
  @keyframes float4 { 0%,100%{transform:translateY(0) rotate(-8deg)} 50%{transform:translateY(-6px) rotate(2deg)} }
  @keyframes timer-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .timer-sep { animation: timer-pulse 1s infinite; }
`;

function Timer({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  const pad = (n: number) => String(n).padStart(2, "0");
  const blocks = [
    { val: pad(time.d), label: "дней" },
    { val: pad(time.h), label: "часов" },
    { val: pad(time.m), label: "минут" },
    { val: pad(time.s), label: "секунд" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
      {blocks.map((b, i) => (
        <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ background: "rgba(232,86,58,0.12)", border: "1px solid rgba(232,86,58,0.25)", borderRadius: 8, padding: "8px 12px", textAlign: "center", minWidth: 52 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{b.val}</div>
            <div style={{ fontSize: 9, color: MUTED, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{b.label}</div>
          </div>
          {i < 3 && <span className="timer-sep" style={{ color: ACCENT, fontWeight: 700, fontSize: 18 }}>:</span>}
        </div>
      ))}
    </div>
  );
}

export default function TrendsD2026Page() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [checkConsent, setCheckConsent] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);
  const date = getTomorrowDate();

  const targetDate = useRef(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(19, 0, 0, 0);
    return d;
  }).current();

  const canSubmit = checkPrivacy && checkConsent;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = SPEAKER_PHOTO;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  function track(goal: string, vkGoal: string) {
    if (typeof window !== "undefined") {
      const w = window as Window & { ym?: (id: unknown, a: string, g: string) => void; VK?: { Goal: (g: string) => void } };
      if (w.ym) w.ym(undefined, "reachGoal", goal);
      if (w.VK) w.VK.Goal(vkGoal);
    }
  }

  function handleCTA() {
    track("cta_click", "conversion");
    setShowModal(true);
  }

  function handleTg() {
    track("tg_click", "lead");
    const utm = getUtmParams();
    const keys = Object.keys(utm);
    const base = TG_URL;
    if (keys.length === 0) { window.open(base, "_blank"); return; }
    const startParam = keys.map((k) => `${k}=${utm[k]}`).join("__");
    window.open(`${base}&start=${encodeURIComponent(startParam)}`, "_blank");
  }

  function handleVk() {
    track("vk_click", "purchase");
    window.open(VK_URL, "_blank");
  }

  return (
    <div style={{ background: `radial-gradient(ellipse at 50% 50%, ${BG2} 0%, ${BG} 70%)`, minHeight: "100vh", fontFamily: FF, color: "#fff", overflowX: "hidden", position: "relative" }}>
      <style>{CSS}</style>

      {/* Noise texture */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.03, pointerEvents: "none", zIndex: 0 }} />

      {/* Dashed arc SVG decoration */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path d="M 100 750 Q 400 300 800 200 Q 1100 100 1350 400" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="6 10" fill="none" opacity="0.12" />
        <path d="M 50 400 Q 300 600 600 650 Q 900 700 1200 500" stroke={ACCENT} strokeWidth="1" strokeDasharray="4 8" fill="none" opacity="0.08" />
      </svg>

      {/* ═══ TOP BAR ═══ */}
      <header style={{
        position: "relative", zIndex: 10,
        padding: isMobile ? "14px 20px" : "20px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <img src={LOGO_URL} alt="RAD ACADEMY" style={{ height: isMobile ? 20 : 28, filter: "invert(1)" }} loading="lazy" decoding="async" />

        {/* Date block */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
          <span style={{ fontSize: isMobile ? 22 : 32 }}>⏰</span>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: isMobile ? 22 : 36, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{date.day}</span>
              <span style={{ fontSize: isMobile ? 14 : 20, fontWeight: 600, color: "#fff" }}>{date.month}</span>
            </div>
            <div style={{ fontSize: isMobile ? 10 : 12, color: MUTED, marginTop: 1 }}>19:00 по Москве</div>
          </div>
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      {isMobile ? (
        /* ═══ MOBILE ═══ */
        <main style={{ paddingBottom: 100, position: "relative", zIndex: 2 }}>

          {/* Speaker photo */}
          <div style={{ position: "relative", width: "100%" }}>
            <img src={SPEAKER_PHOTO} alt="Анна Симонова" style={{ width: "100%", height: "auto", display: "block" }} fetchPriority="high" decoding="async" />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 40, background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to top, ${BG}, transparent)` }} />
          </div>

          {/* Name tags + Badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px 0" }}>
            <div>
              <div style={{ background: "#C62828", borderRadius: 6, padding: "4px 12px", marginBottom: 4, display: "inline-block" }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Анна</span>
              </div>
              <br />
              <div style={{ background: "#C62828", borderRadius: 6, padding: "4px 12px", display: "inline-block" }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Симонова</span>
              </div>
            </div>
            <div style={{ width: 90, height: 90, borderRadius: "50%", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", border: "1px solid rgba(232,86,58,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(232,86,58,0.15)" }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1 }}>2000+</span>
              <span style={{ fontSize: 7, color: MUTED, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", marginTop: 3, lineHeight: 1.3 }}>ВЫПУСКНИКОВ<br />АКАДЕМИИ</span>
            </div>
          </div>

          {/* Offer block */}
          <div style={{ padding: "24px 20px 0" }}>
            {/* Label */}
            <div style={{ display: "inline-block", background: `linear-gradient(135deg,${ACCENT},${ACCENT2})`, borderRadius: 6, padding: "5px 14px", marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.12em" }}>Бесплатный онлайн-эфир</span>
            </div>
            <div style={{ fontSize: 12, color: MUTED, fontWeight: 500, marginBottom: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>Анны Симоновой</div>

            {/* H1 */}
            <h1 style={{ fontSize: "clamp(24px,7vw,32px)", fontWeight: 900, textTransform: "uppercase", margin: "0 0 12px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Тренды в дизайне<br />интерьера{" "}
              <span style={{ color: ACCENT }}>2026</span>
            </h1>

            <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.6, margin: "0 0 20px" }}>
              Как выйти на чек ×3–5 и зарабатывать на проектах HoReCa — рестораны, отели, кафе
            </p>

            {/* Bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
              {BULLETS.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: ACCENT, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✦</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>

            {/* Mini cases */}
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 20, lineHeight: 1.7 }}>
              📍 <span style={{ color: "#fff" }}>Сочи:</span> 480 000 ₽ · 📍 <span style={{ color: "#fff" }}>Казань:</span> чек ×4,7 · 📍 <span style={{ color: "#fff" }}>Екб:</span> доход ×3,8
            </div>

            <Timer targetDate={targetDate} />

            {/* Bonus */}
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 18, lineHeight: 1.6 }}>
              <span style={{ color: "#fff" }}>Регистрируйтесь и получите <span style={{ color: ACCENT, fontWeight: 600 }}>2 бонуса:</span></span><br />
              Чек-лист «10 шагов к проектам мечты в HoReCa» + «10 каналов продаж»
            </div>

            <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>Ссылка на эфир придёт в Telegram-бот · Места ограничены</div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.7, marginTop: 4 }}>
              ИП Вылегжанина А.С. · ОГРНИП 309504516000011 · ИНН 504507471939 · mail@onlinerad.ru
            </div>
          </div>

          {/* Sticky CTA */}
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 20px 16px", background: `linear-gradient(to top, ${BG} 60%, transparent)`, zIndex: 50 }}>
            <button className="d-cta-btn" onClick={handleCTA} style={{ width: "100%", background: `linear-gradient(135deg,${ACCENT},${ACCENT2})`, color: "#fff", border: "none", borderRadius: 12, padding: "16px 20px", fontSize: 15, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", boxShadow: `0 0 40px rgba(232,86,58,0.3)` }}>
              Зарегистрироваться на эфир
            </button>
          </div>
        </main>
      ) : (
        /* ═══ DESKTOP ═══ */
        <main style={{ display: "grid", gridTemplateColumns: "45% 55%", minHeight: "calc(100vh - 80px)", position: "relative", zIndex: 2, maxWidth: 1440, margin: "0 auto" }}>

          {/* ══ LEFT — SPEAKER ══ */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden" }}>

            {/* Title role */}
            <div style={{ position: "absolute", top: 32, left: 48, zIndex: 5 }}>
              <span style={{ fontSize: 13, color: MUTED }}>— Основатель RAD ACADEMY</span>
            </div>

            {/* Photo */}
            <div style={{ position: "absolute", inset: 0, top: 40 }}>
              <img src={SPEAKER_PHOTO} alt="Анна Симонова" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} fetchPriority="high" decoding="async" />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: `linear-gradient(to top, ${BG}, transparent)` }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "15%", background: `linear-gradient(to bottom, ${BG}, transparent)` }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "25%", background: `linear-gradient(to left, ${BG}, transparent)` }} />
            </div>

            {/* Name tags */}
            <div style={{ position: "absolute", bottom: 180, left: 48, zIndex: 6 }}>
              <div style={{ background: "#C62828", borderRadius: 7, padding: "5px 16px", marginBottom: 5, display: "inline-block" }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Анна</span>
              </div>
              <br />
              <div style={{ background: "#C62828", borderRadius: 7, padding: "5px 16px", display: "inline-block" }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Симонова</span>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
                Практикующий дизайнер интерьеров<br />Специализация: HoReCa-объекты
              </div>
            </div>

            {/* Badge */}
            <div style={{ position: "absolute", bottom: 80, right: 60, width: 110, height: 110, borderRadius: "50%", background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(232,86,58,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 6, boxShadow: "0 0 30px rgba(232,86,58,0.12)" }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>2000+</span>
              <span style={{ fontSize: 8, color: MUTED, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center", marginTop: 4, lineHeight: 1.4 }}>ВЫПУСКНИКОВ<br />АКАДЕМИИ</span>
            </div>

            {/* 3D icon building */}
            <div style={{ position: "absolute", top: "35%", right: 20, fontSize: 40, zIndex: 6, animation: "float3 5s ease-in-out infinite" }}>🏨</div>
          </div>

          {/* ══ RIGHT — OFFER ══ */}
          <div style={{ padding: "40px 56px 48px 40px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>

            {/* Decorative 3D icons */}
            <div style={{ position: "absolute", top: 24, right: 80, fontSize: 36, animation: "float1 4s ease-in-out infinite" }}>📐</div>
            <div style={{ position: "absolute", top: "38%", right: 24, fontSize: 34, animation: "float2 6s ease-in-out infinite" }}>🍴</div>
            <div style={{ position: "absolute", bottom: 80, right: 56, fontSize: 30, animation: "float4 5.5s ease-in-out infinite" }}>💰</div>

            {/* Label */}
            <div style={{ marginBottom: 8 }}>
              <span style={{ display: "inline-block", background: `linear-gradient(135deg,${ACCENT},${ACCENT2})`, borderRadius: 6, padding: "6px 18px", fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                Бесплатный онлайн-эфир
              </span>
            </div>

            <div style={{ fontSize: 14, color: MUTED, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Анны Симоновой
            </div>

            {/* H1 */}
            <h1 style={{ fontSize: "clamp(32px,3.2vw,52px)", fontWeight: 900, textTransform: "uppercase", margin: "0 0 14px", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Тренды в дизайне<br />интерьера{" "}
              <span style={{ color: ACCENT }}>2026</span>
            </h1>

            <p style={{ fontSize: 16, color: "#ccc", lineHeight: 1.6, margin: "0 0 22px", maxWidth: 480 }}>
              Как выйти на чек ×3–5 и зарабатывать на проектах HoReCa — рестораны, отели, кафе
            </p>

            {/* Bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
              {BULLETS.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: ACCENT, fontSize: 13, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✦</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>

            {/* Mini cases */}
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span>📍 <span style={{ color: "#fff", fontWeight: 600 }}>Сочи:</span> 480 000 ₽ первый проект</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span>📍 <span style={{ color: "#fff", fontWeight: 600 }}>Казань:</span> чек ×4,7</span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
              <span>📍 <span style={{ color: "#fff", fontWeight: 600 }}>Екатеринбург:</span> доход ×3,8</span>
            </div>

            <Timer targetDate={targetDate} />

            {/* CTA button */}
            <button className="d-cta-btn" onClick={handleCTA} style={{ alignSelf: "flex-start", background: `linear-gradient(135deg,${ACCENT},${ACCENT2})`, color: "#fff", border: "none", borderRadius: 14, padding: "17px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em", boxShadow: `0 0 40px rgba(232,86,58,0.3)`, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
              Зарегистрироваться на эфир
              <span style={{ fontSize: 18 }}>→</span>
            </button>

            {/* Bonus */}
            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 6 }}>
              <span style={{ color: "#fff" }}>Регистрируйтесь и получите <span style={{ color: ACCENT, fontWeight: 600 }}>2 бонуса:</span></span><br />
              Чек-лист «10 шагов к проектам мечты в HoReCa» + «10 каналов продаж для дизайнера»
            </div>
            <div style={{ fontSize: 11, color: "#555" }}>Ссылка на эфир придёт в Telegram-бот · Места ограничены</div>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.7, marginTop: 8 }}>
              ИП Вылегжанина А.С. · ОГРНИП 309504516000011 · ИНН 504507471939 · mail@onlinerad.ru
            </div>
          </div>
        </main>
      )}

      {/* ═══ MODAL ═══ */}
      {showModal && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.87)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#1e1e1e", borderRadius: 16, padding: isMobile ? "32px 24px" : "40px 48px", maxWidth: 440, width: "100%", textAlign: "center", position: "relative", border: "1px solid rgba(255,255,255,0.08)" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#666", fontSize: 22, cursor: "pointer" }}>×</button>
            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, marginBottom: 8, color: "#fff" }}>
              Выберите удобный способ<br />регистрации на эфир
            </div>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 24 }}>Ссылка на эфир придёт после регистрации</div>

            {/* Checkboxes */}
            <div style={{ textAlign: "left", marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={checkPrivacy} onChange={(e) => { setCheckPrivacy(e.target.checked); setShowConsentError(false); }} style={{ marginTop: 2, accentColor: ACCENT, width: 16, height: 16, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>
                  Я ознакомился(-ась) с{" "}
                  <a href="https://onlinerad.ru/privacy_policy" target="_blank" rel="noopener noreferrer" style={{ color: "#999", textDecoration: "underline" }}>Политикой конфиденциальности</a>
                </span>
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={checkConsent} onChange={(e) => { setCheckConsent(e.target.checked); setShowConsentError(false); }} style={{ marginTop: 2, accentColor: ACCENT, width: 16, height: 16, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>
                  Я даю{" "}
                  <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer" style={{ color: "#999", textDecoration: "underline" }}>Согласие на обработку персональных данных</a>
                </span>
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button className="d-tg-btn" onClick={() => { if (!canSubmit) { setShowConsentError(true); return; } handleTg(); }} style={{ background: canSubmit ? "#229ED9" : "#2a2a2a", color: canSubmit ? "#fff" : "#555", border: "none", borderRadius: 10, padding: "15px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: FF, transition: "background 0.2s, color 0.2s" }}>
                <span style={{ fontSize: 20 }}>✈️</span> Зарегистрироваться через Telegram
              </button>
              <button className="d-vk-btn" onClick={() => { if (!canSubmit) { setShowConsentError(true); return; } handleVk(); }} style={{ background: canSubmit ? "#0077FF" : "#2a2a2a", color: canSubmit ? "#fff" : "#555", border: "none", borderRadius: 10, padding: "15px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: FF, transition: "background 0.2s, color 0.2s" }}>
                <span style={{ fontSize: 20 }}>🔵</span> Зарегистрироваться через ВКонтакте
              </button>
              {showConsentError && (
                <div style={{ fontSize: 13, color: "#E53935", fontWeight: 600, textAlign: "center", marginTop: 4 }}>
                  Пожалуйста, поставьте галочки Согласия
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}