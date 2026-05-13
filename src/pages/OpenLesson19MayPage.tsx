import { useEffect, useRef, useState } from "react";

// ─── КОНСТАНТЫ ────────────────────────────────────────────────────────────────
const LIME = "#D4F542";
const GRAPHITE = "#1A1A1A";
const CREAM = "#F5F5F0";
const WHITE = "#FFFFFF";

const HERO_IMG_1 = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/eba0970a-c81b-4ad3-be8e-bdb027d3e7d2.jpg";
const HERO_IMG_2 = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/e6813f0c-058e-42c8-ae5c-42fe9c920748.jpg";
const ANNA_IMG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/922efe3a-82a2-4b64-94bc-1a846a42c3f4.jpg";

const YM_COUNTER = 107087337;
const VK_PIXEL_ID = "3761153";

const ffH: React.CSSProperties = { fontFamily: "'SangBleu Kingdom', 'Cormorant', Georgia, serif" };
const ff: React.CSSProperties = { fontFamily: "'Basis Grotesque Pro', 'IBM Plex Sans', sans-serif" };

// ─── АНАЛИТИКА ────────────────────────────────────────────────────────────────
const ym = (...args: unknown[]) => {
  const w = window as unknown as Record<string, (...a: unknown[]) => void>;
  if (w["ym"]) w["ym"](...args);
};

const vkGoal = (goal: string) => {
  const w = window as unknown as { _tmr?: Array<Record<string, unknown>> };
  if (w._tmr) w._tmr.push({ type: "reachGoal", id: VK_PIXEL_ID, goal });
};

const fireOpenPopup = () => {
  ym(YM_COUNTER, "reachGoal", "openlesson19may");
  vkGoal("openlesson19may");
};

// ─── ДАННЫЕ ───────────────────────────────────────────────────────────────────
const REVIEWS = [
  { id: "iQpZB7LgYgEhvcSMJnEcDB", cover: "https://cdn.poehali.dev/files/69761a21-7c8e-42a5-bc91-0c9d3fc966a5.png", name: "Ученица 1" },
  { id: "39zsErsitVSgkai4HddiFW", cover: "https://cdn.poehali.dev/files/867dc6f4-24d8-41cc-b670-4470e7baf561.png", name: "Ученица 2" },
  { id: "vNjK1onGKjzKsRfFjou9Sd", cover: "https://cdn.poehali.dev/files/9287f5f1-8b2d-4862-a261-6c1fa9be0ddb.png", name: "Ученица 3" },
  { id: "5LVYSYxGcBou32VDfrZELD", cover: "https://cdn.poehali.dev/files/75036c32-7c92-4038-852b-19e59163ff6d.png", name: "Ученица 4" },
  { id: "qySjCSjbmaqHQbEp13kPxX", cover: "https://cdn.poehali.dev/files/90a8cb34-77d3-4a77-9336-90201349a322.png", name: "Ученица 5" },
];

const programItems = [
  { num: "01", title: "Структура программы", desc: "Из чего собраны 15 недель и почему именно так." },
  { num: "02", title: "Команда потока", desc: "Кто будет вести темы и почему я выбрала именно этих людей." },
  { num: "03", title: "Проектная работа", desc: "Что вы делаете руками каждую неделю и что защищаете в финале." },
  { num: "04", title: "Формат и ритм", desc: "Как идёт неделя, сколько часов реально нужно, что делать, если выпали." },
  { num: "05", title: "Кураторская поддержка", desc: "Кто и как будет помогать вам пройти путь обучения." },
  { num: "06", title: "Открытые вопросы", desc: "Всё, что важно лично вам — задаёте в чате, отвечаю в эфире." },
];

const stages = [
  { lime: true, label: "ЭТАП 1 · РЫНОК И НАВИГАЦИЯ", weeks: "недели 1–2", desc: "Куда движется HoReCa, как читать тренды, где ваше место." },
  { lime: false, label: "ЭТАП 2 · ВЫХОД НА ЗАКАЗЧИКА", weeks: "недели 3–4", desc: "КП, договор, презентация, тендеры. Всё, что отличает «попробовать» от «получить контракт»." },
  { lime: true, label: "ЭТАП 3 · КОНЦЕПЦИЯ И ВИЗУАЛИЗАЦИЯ", weeks: "недели 5–7", desc: "От первого мудборда до архитектурной концепции, которая продаёт." },
  { lime: false, label: "ЭТАП 4 · ИНЖЕНЕРИЯ И БЮДЖЕТ", weeks: "недели 8–10", desc: "Пожарка, вентиляция, освещение, комплектация. То, на чём сыпется большинство." },
  { lime: true, label: "ЭТАП 5 · РЕАЛИЗАЦИЯ И ЛИЧНЫЙ БРЕНД", weeks: "недели 11–15", desc: "Рабочка, авторский надзор, продвижение проекта и защита перед комиссией в Москве." },
];

const faqItems = [
  { q: "Я была на эфире 12 мая. Будет ли что-то новое?", a: "Да. 12 мая мы говорили о рынке. 19 мая — о самой программе. Темы не пересекаются." },
  { q: "Это запись или живой эфир?", a: "Только живой эфир. Запись остаётся внутри программы и доступна участникам потока. На внешние ресурсы и в открытый доступ урок не выкладывается." },
  { q: "Если не получится прийти в 19:00?", a: "Догнать никак — запись не передаётся тем, кто не вошёл в поток. Если планируете прийти, спланируйте этот вечер заранее." },
  { q: "Можно ли записаться в поток после урока?", a: "Да. Спецусловия для участников урока действуют до его окончания." },
];

// ─── СЧЁТЧИК ОБРАТНОГО ОТСЧЁТА ────────────────────────────────────────────────
// 19 мая 2026, 19:00 МСК (UTC+3)
const TARGET_DATE = new Date("2026-05-19T16:00:00Z");

function useCountdown() {
  const calc = () => {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      expired: false,
    };
  };
  const [timeLeft, setTimeLeft] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return timeLeft;
}

function Countdown() {
  const { days, hours, minutes, seconds, expired } = useCountdown();

  if (expired) {
    return (
      <section style={{ background: LIME, padding: "52px 24px", textAlign: "center" }}>
        <p style={{ ...ffH, color: GRAPHITE, fontSize: "clamp(1.5rem,4vw,2.5rem)", textTransform: "uppercase", margin: 0 }}>
          Эфир идёт прямо сейчас
        </p>
      </section>
    );
  }

  const units = [
    { value: days, label: "дней" },
    { value: hours, label: "часов" },
    { value: minutes, label: "минут" },
    { value: seconds, label: "секунд" },
  ];

  return (
    <section style={{ background: "#111111", borderTop: `1px solid rgba(212,245,66,0.1)`, padding: "clamp(48px,8vh,80px) 24px" }}>
      <style>{`
        @keyframes ol-tick { 0%{transform:scaleY(1)} 50%{transform:scaleY(0.88)} 100%{transform:scaleY(1)} }
        @keyframes ol-pulse-lime {
          0%{box-shadow:0 0 0 0 rgba(212,245,66,0.45)}
          70%{box-shadow:0 0 0 18px rgba(212,245,66,0)}
          100%{box-shadow:0 0 0 0 rgba(212,245,66,0)}
        }
        @keyframes ol-arrow-left { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-5px)} }
        @keyframes ol-arrow-right { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }
      `}</style>
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <p style={{ ...ff, color: "rgba(255,255,255,0.35)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 36 }}>
          До начала открытого урока
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "clamp(10px,2.5vw,36px)" }}>
          {units.map((u, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{
                background: "rgba(212,245,66,0.06)",
                border: `1px solid rgba(212,245,66,0.18)`,
                borderRadius: 10,
                padding: "clamp(14px,2.5vw,26px) clamp(16px,3.5vw,36px)",
                minWidth: "clamp(60px,14vw,110px)",
              }}>
                <span style={{
                  ...ffH, color: LIME,
                  fontSize: "clamp(2rem,6.5vw,4.5rem)",
                  lineHeight: 1,
                  display: "block",
                  fontWeight: 400,
                  animation: i === 3 ? "ol-tick 1s ease" : undefined,
                }}>
                  {String(u.value).padStart(2, "0")}
                </span>
              </div>
              <span style={{ ...ff, color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {u.label}
              </span>
            </div>
          ))}
        </div>
        <p style={{ ...ff, color: "rgba(255,255,255,0.22)", fontSize: 11, marginTop: 36, letterSpacing: "0.08em" }}>
          19 МАЯ · 19:00 МСК · ТОЛЬКО ПРЯМОЙ ЭФИР
        </p>
      </div>
    </section>
  );
}

// ─── ВИДЕО-КАРТОЧКА ───────────────────────────────────────────────────────────
function VideoCard({ review }: { review: typeof REVIEWS[0] }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "9/16", background: "#000", cursor: "pointer", flexShrink: 0 }}
      onClick={() => setPlaying(true)}
    >
      {!playing ? (
        <>
          <img
            src={review.cover} alt={review.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 64, height: 64,
            background: LIME, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "ol-pulse-lime 2s infinite",
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
}

// ─── БЛОК ОТЗЫВОВ ─────────────────────────────────────────────────────────────
function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, REVIEWS.length - visibleCount);
  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(maxIndex, i + 1));

  return (
    <section style={{ background: "#111111", padding: "clamp(60px,10vh,120px) 0" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(20px,5vw,80px)", marginBottom: 40 }}>
        <p style={{ ...ff, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 20, fontWeight: 600 }}>
          Отзывы учениц
        </p>
        <h2 style={{ ...ffH, color: WHITE, fontSize: "clamp(2rem,5vw,4.5rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0 }}>
          Они уже<br /><span style={{ color: LIME }}>прошли путь</span>
        </h2>
      </div>

      <div style={{ overflow: "hidden", padding: "0 clamp(20px,5vw,80px)" }}>
        <div style={{
          display: "flex", gap: 20,
          transform: `translateX(calc(-${index} * (100% / ${visibleCount} + ${(20 * (visibleCount - 1)) / visibleCount}px)))`,
          transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
        }}>
          {REVIEWS.map(r => (
            <div key={r.id} style={{ flex: `0 0 calc(${100 / visibleCount}% - ${(20 * (visibleCount - 1)) / visibleCount}px)`, minWidth: 0 }}>
              <VideoCard review={r} />
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 40 }}>
            <button onClick={prev} disabled={index === 0} style={{
              width: 56, height: 56, borderRadius: "50%",
              border: `2px solid ${index > 0 ? LIME : "rgba(255,255,255,0.2)"}`,
              background: "transparent", cursor: index > 0 ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: index > 0 ? 1 : 0.35,
              animation: index > 0 ? "ol-arrow-left 1.5s ease-in-out infinite" : "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => { if (index > 0) (e.currentTarget as HTMLButtonElement).style.background = LIME; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke={index > 0 ? LIME : "rgba(255,255,255,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <div key={i} onClick={() => setIndex(i)} style={{
                  width: i === index ? 24 : 8, height: 8, borderRadius: 4,
                  background: i === index ? LIME : "rgba(255,255,255,0.3)", cursor: "pointer", transition: "all 0.3s ease",
                }} />
              ))}
            </div>
            <button onClick={next} disabled={index >= maxIndex} style={{
              width: 56, height: 56, borderRadius: "50%",
              border: `2px solid ${index < maxIndex ? LIME : "rgba(255,255,255,0.2)"}`,
              background: "transparent", cursor: index < maxIndex ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: index < maxIndex ? 1 : 0.35,
              animation: index < maxIndex ? "ol-arrow-right 1.5s ease-in-out infinite" : "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => { if (index < maxIndex) (e.currentTarget as HTMLButtonElement).style.background = LIME; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke={index < maxIndex ? LIME : "rgba(255,255,255,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── FAQ ЭЛЕМЕНТ ──────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(26,26,26,0.15)", cursor: "pointer" }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0", gap: 16 }}>
        <span style={{ ...ff, fontSize: "clamp(14px,1.8vw,15px)", fontWeight: 500, color: GRAPHITE, lineHeight: 1.45 }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%", background: GRAPHITE, color: LIME,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0, transition: "transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>+</span>
      </div>
      {open && (
        <div style={{ ...ff, paddingBottom: 18, fontSize: 14, color: "#2a2a2a", lineHeight: 1.65 }}>{a}</div>
      )}
    </div>
  );
}

// ─── ПОПАП РЕГИСТРАЦИИ ────────────────────────────────────────────────────────
function RegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(26,26,26,0.88)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        style={{ position: "relative", width: "100%", maxWidth: 480, borderRadius: 20, padding: "clamp(24px,4vw,36px)", background: GRAPHITE, border: `1px solid ${LIME}` }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 24, cursor: "pointer", lineHeight: 1 }}>×</button>
        <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: 6, background: LIME, color: GRAPHITE, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", marginBottom: 20, ...ff }}>
          ОТКРЫТЫЙ УРОК · 19 МАЯ · 19:00 МСК
        </div>
        <h3 style={{ ...ffH, color: WHITE, fontSize: "1.6rem", textTransform: "uppercase", marginBottom: 8, fontWeight: 400 }}>Регистрация</h3>
        <p style={{ ...ff, color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
          Место для скрипта регистрации из Геткурс — вы пришлёте его позднее.
        </p>
        <div style={{ border: `1px dashed ${LIME}`, borderRadius: 12, padding: "32px 20px", textAlign: "center", color: LIME, ...ff, fontSize: 14 }}>
          Место для скрипта Геткурс
        </div>
        <p style={{ ...ff, color: "rgba(255,255,255,0.22)", fontSize: 11, textAlign: "center", marginTop: 16, letterSpacing: "0.04em" }}>
          Бесплатно · Онлайн · Только прямой эфир
        </p>
      </div>
    </div>
  );
}

// ─── КНОПКА РЕГИСТРАЦИИ ───────────────────────────────────────────────────────
function RegBtn({ children, dark = false, wide = false, onOpen }: { children: React.ReactNode; dark?: boolean; wide?: boolean; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      style={{
        ...ff,
        background: dark ? GRAPHITE : LIME,
        color: dark ? WHITE : GRAPHITE,
        border: "none",
        borderRadius: 4,
        padding: "16px 40px",
        width: wide ? "100%" : "auto",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "opacity 0.2s, transform 0.15s",
        display: "block",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
      onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
      onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
    >
      {children}
    </button>
  );
}

// ─── ФУТЕР ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0D0C0B", padding: "40px 48px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ width: 40, height: 1, background: LIME, margin: "0 auto 36px", opacity: 0.6 }} />
      <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <img
            src="https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/c9557609-04c7-411a-a6d8-97ee87fa41f3.png"
            alt="RAD ACADEMY"
            style={{ height: 28, width: "auto", objectFit: "contain", filter: "invert(1) brightness(2)" }}
          />
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
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = LIME; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.28)"; }}
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
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = LIME; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.28)"; }}
            >{link.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── ГЛАВНАЯ СТРАНИЦА ─────────────────────────────────────────────────────────
export default function OpenLesson19MayPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const scroll75Fired = useRef(false);

  const openModal = () => {
    setModalOpen(true);
    fireOpenPopup();
  };

  // Отслеживание скролла 75%
  useEffect(() => {
    const handleScroll = () => {
      if (scroll75Fired.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.75) {
        scroll75Fired.current = true;
        ym(YM_COUNTER, "reachGoal", "scroll75");
        vkGoal("scroll75");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ ...ff }}>
      <RegistrationModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── ЭКРАН 1 · HERO ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", background: GRAPHITE, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ flex: 1, backgroundImage: `url(${HERO_IMG_1})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.3 }} />
          <div style={{ flex: 1, backgroundImage: `url(${HERO_IMG_2})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.22 }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg, rgba(26,26,26,0.65) 0%, rgba(26,26,26,0.85) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: "clamp(80px,12vh,140px) clamp(20px,6vw,80px) clamp(60px,8vh,100px)", textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "8px 18px", background: LIME, color: GRAPHITE, borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", marginBottom: 32, ...ff }}>
            ОТКРЫТЫЙ УРОК · 19 МАЯ · 19:00 МСК
          </div>
          <h1 style={{ ...ffH, color: WHITE, fontSize: "clamp(2.4rem,7vw,6rem)", lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.02em", margin: "0 0 14px" }}>
            Профессия будущего:<br />
            <span style={{ color: LIME }}>HoReCa</span>
          </h1>
          <p style={{ ...ffH, color: "rgba(255,255,255,0.65)", fontSize: "clamp(1.1rem,2.8vw,1.8rem)", fontWeight: 400, margin: "0 0 28px", fontStyle: "italic" }}>
            Дизайнер интерьеров отелей
          </p>
          <p style={{ ...ff, color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px,1.8vw,16px)", lineHeight: 1.65, maxWidth: 500, margin: "0 auto 44px" }}>
            Открытый урок перед стартом нового потока. 90 минут — и вы понимаете, ваше это направление или нет.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RegBtn onOpen={openModal}>Зарегистрироваться</RegBtn>
          </div>
          <p style={{ ...ff, color: "rgba(255,255,255,0.22)", fontSize: 11, marginTop: 14, letterSpacing: "0.06em" }}>Только прямой эфир.</p>
        </div>
      </section>

      {/* ── СЧЁТЧИК ОБРАТНОГО ОТСЧЁТА ──────────────────────────────────────── */}
      <Countdown />

      {/* ── ЭКРАН 2 · О ЧЁМ УРОК ───────────────────────────────────────────── */}
      <section style={{ background: GRAPHITE, padding: "clamp(60px,10vh,120px) clamp(20px,6vw,80px)", borderTop: "1px solid rgba(212,245,66,0.07)" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <p style={{ ...ff, color: LIME, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28, fontWeight: 600 }}>01 / СУТЬ</p>
          <h2 style={{ ...ffH, color: WHITE, fontSize: "clamp(1.8rem,4.5vw,3.5rem)", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.01em", margin: "0 0 28px" }}>
            За 90 минут вы получите ответ на главный вопрос
          </h2>
          <p style={{ ...ffH, color: LIME, fontSize: "clamp(1.1rem,2.2vw,1.4rem)", fontStyle: "italic", fontWeight: 400, marginBottom: 36, lineHeight: 1.45 }}>
            «Подходит ли мне эта профессия и эта программа?»
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, color: "rgba(255,255,255,0.5)", fontSize: "clamp(15px,1.8vw,17px)", lineHeight: 1.75 }}>
            <p style={{ margin: 0 }}>Я не буду пересказывать то, что было на вебинаре 12 мая. Эфир был про рынок и про то, почему отели — это вход для дизайнера из жилого. Урок 19 мая — про другое.</p>
            <p style={{ margin: 0 }}>Это закрытое знакомство с самой программой. Я покажу, как устроены 15 недель обучения, представлю экспертов потока, расскажу про защиту проекта и отвечу на ваши вопросы.</p>
            <p style={{ margin: 0 }}>Урок идёт только в прямом эфире. Запись остаётся внутри программы — её получают участники потока. В открытый доступ урок не выкладывается, поэтому всё, что я расскажу, услышат только те, кто будет онлайн 19 мая.</p>
          </div>
        </div>
      </section>

      {/* ── ЭКРАН 3 · ПРОГРАММА УРОКА ───────────────────────────────────────── */}
      <section style={{ background: CREAM, padding: "clamp(60px,10vh,120px) clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ ...ff, color: "rgba(26,26,26,0.4)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28, fontWeight: 600 }}>02 / ПРОГРАММА УРОКА</p>
          <h2 style={{ ...ffH, color: GRAPHITE, fontSize: "clamp(1.8rem,4.5vw,3.5rem)", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.01em", margin: "0 0 48px" }}>
            6 блоков, которые закроют все вопросы
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,320px),1fr))", gap: 18, marginBottom: 40 }}>
            {programItems.map(item => (
              <div key={item.num} style={{ background: WHITE, borderRadius: 16, padding: "26px 26px 22px", border: "1px solid rgba(26,26,26,0.07)" }}>
                <div style={{ display: "inline-block", background: GRAPHITE, padding: "3px 9px", borderRadius: 4, marginBottom: 12 }}>
                  <span style={{ ...ff, color: LIME, fontSize: 10, fontWeight: 700, letterSpacing: "0.14em" }}>{item.num}</span>
                </div>
                <h3 style={{ ...ffH, color: GRAPHITE, fontSize: "clamp(0.95rem,1.8vw,1.1rem)", fontWeight: 400, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ ...ff, color: "rgba(26,26,26,0.5)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: LIME, borderRadius: 14, padding: "20px 28px", ...ff, color: GRAPHITE, fontSize: "clamp(14px,1.6vw,15px)", lineHeight: 1.65, fontWeight: 500 }}>
            Я хочу, чтобы в поток приходили те, кто понимает, на что идёт. Поэтому покажу программу целиком, и вы сможете принять осознанное решение.
          </div>
        </div>
      </section>

      {/* ── ЭКРАН 4 · КУРС — ОБЩИЙ КОНТУР ──────────────────────────────────── */}
      <section style={{ background: GRAPHITE, padding: "clamp(60px,10vh,120px) clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ ...ff, color: LIME, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 28, fontWeight: 600 }}>03 / КУРС В ЦЕЛОМ</p>
          <h2 style={{ ...ffH, color: WHITE, fontSize: "clamp(1.8rem,4.5vw,3.5rem)", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.01em", margin: "0 0 16px" }}>
            15 недель. Пять смысловых этапов.<br />Один реальный проект отеля.
          </h2>
          <p style={{ ...ff, color: "rgba(255,255,255,0.4)", fontSize: "clamp(14px,1.8vw,16px)", lineHeight: 1.65, marginBottom: 48, maxWidth: 600 }}>
            Подробный разбор — на уроке. Здесь — карта маршрута, чтобы вы понимали логику.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 52 }}>
            {stages.map((stage, i) => (
              <div key={i} style={{ background: stage.lime ? LIME : CREAM, borderRadius: 10, padding: "18px 24px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "baseline" }}>
                <span style={{ ...ffH, color: GRAPHITE, fontSize: "clamp(0.9rem,1.6vw,1rem)", fontWeight: 400, flexShrink: 0 }}>{stage.label}</span>
                <span style={{ ...ff, color: "rgba(26,26,26,0.45)", fontSize: 11, flexShrink: 0 }}>{stage.weeks}</span>
                <p style={{ ...ff, color: "#2a2a2a", fontSize: 14, lineHeight: 1.6, margin: 0, flex: 1, minWidth: 200 }}>{stage.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ ...ff, color: "rgba(255,255,255,0.4)", fontSize: 15, textAlign: "center", marginBottom: 32, lineHeight: 1.6 }}>
            Что внутри каждого этапа, кто ведёт, какие задания и кейсы — на уроке 19 мая.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RegBtn onOpen={openModal}>Зарегистрироваться на урок</RegBtn>
          </div>
        </div>
      </section>

      {/* ── ЭКРАН 5 · ОБ АННЕ ───────────────────────────────────────────────── */}
      <section style={{ background: GRAPHITE, padding: "clamp(60px,10vh,120px) clamp(20px,6vw,80px)", borderTop: "1px solid rgba(212,245,66,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(32px,6vw,80px)", alignItems: "flex-start" }}>
          <div style={{ width: "clamp(220px,28vw,340px)", flexShrink: 0 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "3/4" }}>
              <img src={ANNA_IMG} alt="Анна Симонова" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} loading="lazy" />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ ...ff, color: LIME, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>04 / АВТОР</p>
            <h2 style={{ ...ffH, color: WHITE, fontSize: "clamp(2rem,5vw,3.5rem)", textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
              Анна Симонова
            </h2>
            <p style={{ ...ff, color: LIME, fontSize: "clamp(14px,1.6vw,15px)", fontStyle: "italic", marginBottom: 28 }}>
              Архитектор, дизайнер отелей, автор программы
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px,1.7vw,16px)", lineHeight: 1.75, marginBottom: 36 }}>
              <p style={{ margin: 0 }}>15 лет в проектировании. Реализованные отели в России и за рубежом. Текущий проект — пятизвёздочный отель, КП на 4,5 млн ₽ закрыто за полтора месяца.</p>
              <p style={{ margin: 0 }}>Программу собрала по принципу «как сама хотела бы учиться, когда заходила в эту нишу». Без перепевок открытых лекций, без приглашённых теоретиков. Каждый спикер ведёт собственные проекты в HoReCa прямо сейчас.</p>
            </div>
            <blockquote style={{ margin: 0, paddingLeft: 22, borderLeft: `3px solid ${LIME}` }}>
              <p style={{ ...ffH, color: CREAM, fontSize: "clamp(1rem,2vw,1.2rem)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.6, margin: "0 0 12px" }}>
                «Я не верю в курсы "обо всём и ни о чём". Я собрала программу так, как сама бы хотела учиться 15 лет назад: каждый эксперт — практик, каждое задание — шаг к реальному проекту, каждая неделя — закрытая тема без воды. На уроке 19 мая я покажу это изнутри».
              </p>
              <footer style={{ ...ff, color: "rgba(255,255,255,0.28)", fontSize: 12 }}>— Анна Симонова</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── ОТЗЫВЫ УЧЕНИЦ (перед финальным блоком) ─────────────────────────── */}
      <ReviewsSection />

      {/* ── ЭКРАН 6 · ФИНАЛЬНЫЙ CTA + FAQ ───────────────────────────────────── */}
      <section style={{ background: LIME, padding: "clamp(60px,10vh,120px) clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ ...ff, color: "rgba(26,26,26,0.45)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
            19.05 · 19:00 МСК
          </p>
          <h2 style={{ ...ffH, color: GRAPHITE, fontSize: "clamp(1.8rem,4.5vw,3.5rem)", textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.01em", margin: "0 0 20px" }}>
            Это единственный открытый урок перед стартом потока
          </h2>
          <p style={{ ...ff, color: "#2a2a2a", fontSize: "clamp(15px,1.8vw,16px)", lineHeight: 1.7, marginBottom: 40 }}>
            Если думаете о входе в HoReCa — приходите. Если не уверены — тем более. Запись остаётся внутри потока, поэтому решение приходить или нет лучше принять сейчас.
          </p>
          <RegBtn dark wide onOpen={openModal}>Зарегистрироваться →</RegBtn>
          <p style={{ ...ff, color: "rgba(26,26,26,0.42)", fontSize: 11, marginTop: 14, letterSpacing: "0.04em" }}>
            Бесплатно · Онлайн · 19 мая, 19:00 МСК · Только прямой эфир
          </p>

          <div style={{ marginTop: 56, background: "rgba(255,255,255,0.48)", borderRadius: 20, padding: "clamp(20px,4vw,40px)" }}>
            <h3 style={{ ...ffH, color: GRAPHITE, fontSize: "clamp(1.1rem,2vw,1.4rem)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 24, fontWeight: 400 }}>
              Частые вопросы
            </h3>
            {faqItems.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ФУТЕР ───────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
