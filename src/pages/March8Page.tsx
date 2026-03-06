import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-03-13T00:00:00+03:00");

function useTimer() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, expired: false });

  useEffect(() => {
    function update() {
      const diff = DEADLINE.getTime() - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, expired: true });
        return;
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        expired: false,
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function March8Page() {
  const timer = useTimer();

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#fff", fontFamily: "'Basis Grotesque Pro', 'Inter', sans-serif" }}>
      {/* Header */}
      <header style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", borderBottom: "1px solid rgba(255,255,255,0.10)", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/c9557609-04c7-411a-a6d8-97ee87fa41f3.png"
            alt="RAD ACADEMY"
            style={{ height: 36, width: "auto", objectFit: "contain", filter: "invert(1) brightness(2)" }}
          />
        </div>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontFamily: "inherit" }} className="header-site-label">radacademy.ru</span>
        <style>{`@media (max-width: 640px) { .header-site-label { display: none; } }`}</style>
      </header>

      {/* Screen 1 */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>

        {/* Label */}
        <div style={{ textAlign: "center", paddingTop: "clamp(32px, 5vw, 48px)" }}>
          <span style={{ fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#C0392B", fontFamily: "inherit" }}>
            ПОДАРОК ОТ RAD ACADEMY · 8 МАРТА
          </span>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: "'Cormorant', Georgia, serif",
          fontWeight: 400,
          fontSize: "clamp(32px, 5.5vw, 52px)",
          lineHeight: 1.15,
          textAlign: "center",
          color: "#fff",
          marginTop: 16,
          marginBottom: 0,
        }}>
          Как создать бар,<br />
          который станет известным<br />
          на весь мир
        </h1>

        {/* Subtitle */}
        <p style={{
          textAlign: "center",
          fontSize: "clamp(15px, 2vw, 18px)",
          color: "rgba(255,255,255,0.70)",
          marginTop: 20,
          lineHeight: 1.6,
          maxWidth: 640,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          Выступление Николая Киселёва — совладельца<br />
          баров «El Capitas» и «Санкт-Фреска»,<br />
          участника команды Топ-8 лучших баров мира
        </p>

        {/* Video */}
        <div style={{ marginTop: 40, position: "relative", width: "100%", paddingTop: "56.25%", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>
          <iframe
            src="https://kinescope.io/embed/72gK1NCtT8vL6V7GtVs6pP"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Speaker caption */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontWeight: 400, fontSize: 20, color: "#fff" }}>
            Николай Киселёв
          </div>
          <div style={{ marginTop: 8, fontSize: 14, color: "rgba(255,255,255,0.60)", lineHeight: 1.8 }}>
            <span style={{ color: "#C0392B" }}>·</span> Совладелец «El Capitas», «Санкт-Фреска»<br />
            <span style={{ color: "#C0392B" }}>·</span> «Следуй за Кроликом» — Топ-8 баров мира (2021)<br />
            <span style={{ color: "#C0392B" }}>·</span> 25 лет в HoReCa-индустрии
          </div>
        </div>

        {/* Timer */}
        <div style={{
          marginTop: 48,
          maxWidth: 560,
          marginLeft: "auto",
          marginRight: "auto",
          background: "rgba(255,255,255,0.04)",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "clamp(24px, 3vw, 32px) clamp(20px, 4vw, 40px)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.50)", marginBottom: 20 }}>
            Видео доступно ещё
          </div>

          {timer.expired ? (
            <div style={{ fontSize: 22, color: "#C0392B", fontFamily: "'Cormorant', Georgia, serif" }}>Доступ закрыт</div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(8px, 2vw, 16px)" }}>
              {/* Days */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>
                  {pad(timer.days)}
                </div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.40)", marginTop: 6 }}>ДНЕЙ</div>
              </div>
              <div style={{ fontFamily: "inherit", fontSize: "clamp(28px, 4vw, 36px)", color: "#C0392B", paddingBottom: 20 }}>:</div>
              {/* Hours */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>
                  {pad(timer.hours)}
                </div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.40)", marginTop: 6 }}>ЧАСОВ</div>
              </div>
              <div style={{ fontFamily: "inherit", fontSize: "clamp(28px, 4vw, 36px)", color: "#C0392B", paddingBottom: 20 }}>:</div>
              {/* Minutes */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>
                  {pad(timer.minutes)}
                </div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.40)", marginTop: 6 }}>МИНУТ</div>
              </div>
            </div>
          )}

          <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            После этого видео будет недоступно
          </div>
        </div>

        {/* CTA 1 */}
        <div style={{ marginTop: 32, textAlign: "center", paddingBottom: "clamp(48px, 6vw, 80px)" }}>
          <a
            href="https://radacademy.ru/horeca_trends"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#C0392B",
              color: "#fff",
              padding: "18px 40px",
              borderRadius: 4,
              fontSize: 15,
              fontFamily: "inherit",
              fontWeight: 500,
              letterSpacing: 2,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s",
              width: "min(100%, 480px)",
              boxSizing: "border-box",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#D44235")}
            onMouseLeave={e => (e.currentTarget.style.background = "#C0392B")}
          >
            СМОТРЕТЬ СЛЕДУЮЩИЙ ШАГ →
          </a>
          <div style={{ marginTop: 12, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
            Бесплатный онлайн-эфир Анны Симоновой<br />о Трендах в коммерческом дизайне 2026
          </div>
        </div>
      </div>

      {/* Screen 2 */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>

          {/* About Speaker */}
          <div style={{ paddingTop: "clamp(48px, 7vw, 80px)" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: "#C0392B" }}>О СПИКЕРЕ</div>
            <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 400, color: "#fff", marginTop: 12 }}>
              Николай Киселёв
            </div>
            <div style={{ width: 40, height: 1, background: "#C0392B", margin: "16px 0" }} />
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
              {[
                "Совладелец «El Capitas», «Санкт-Фреска», «Следуй за Кроликом»",
                "25 лет в HoReCa-индустрии",
                "Топ-8 лучших баров мира — 2021 год",
                "6 попаданий в Топ-100 лучших баров мира",
                "Барная школа, обучение команд",
              ].map((fact, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#C0392B", flexShrink: 0 }}>·</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* About RAD ACADEMY */}
          <div style={{ marginTop: 64, paddingTop: 64, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: "#C0392B" }}>ОТ КОГО ЭТОТ ПОДАРОК</div>
            <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 400, color: "#fff", marginTop: 12 }}>
              RAD ACADEMY
            </div>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginTop: 16, maxWidth: 640 }}>
              Ведущая школа дизайна интерьера в России с фокусом на HoReCa — отели, рестораны, кафе.
              <br /><br />
              Топ-2 онлайн-школа дизайна по рейтингу РБК.
              <br /><br />
              Основатель — Анна Симонова: 18 лет практики, 100+ реализованных объектов, действующая студия RADDESIGN.
            </p>
          </div>

          {/* Final CTA */}
          <div style={{ marginTop: 48, textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "#fff", lineHeight: 1.3 }}>
              Хотите узнать как войти в HoReCa<br />
              и работать с такими объектами?
            </div>
            <a
              href="https://radacademy.ru/horeca_trends"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "#C0392B",
                color: "#fff",
                padding: "18px 40px",
                borderRadius: 4,
                fontSize: 15,
                fontFamily: "inherit",
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.2s",
                marginTop: 24,
                width: "min(100%, 560px)",
                boxSizing: "border-box",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#D44235")}
              onMouseLeave={e => (e.currentTarget.style.background = "#C0392B")}
            >
              ЗАРЕГИСТРИРОВАТЬСЯ НА БЕСПЛАТНЫЙ ЭФИР →
            </a>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)", paddingBottom: 48 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <img
                src="https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/c9557609-04c7-411a-a6d8-97ee87fa41f3.png"
                alt="RAD ACADEMY"
                style={{ height: 28, width: "auto", objectFit: "contain", filter: "invert(1) brightness(2)", opacity: 0.6 }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20 }}>
              <a href="https://t.me/rad_academy_design" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", textDecoration: "none" }}>Telegram</a>
              <a href="https://vk.com/radacademy" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", textDecoration: "none" }}>ВКонтакте</a>
            </div>

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px 20px", marginBottom: 20, textAlign: "center" }}>
              <a href="https://radacademy.ru/offer" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}>Публичная оферта</a>
              <a href="https://radacademy.ru/privacy_policy" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}>Политика обработки персональных данных</a>
              <a href="https://radacademy.ru/consent_user" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}>Согласие на обработку данных</a>
              <a href="https://radacademy.ru/contacts" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}>Контакты</a>
            </div>

            <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.8 }}>
              © 2026 ИП Вылегжанина А.С. · <a href="mailto:mail@onlinerad.ru" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>mail@onlinerad.ru</a> · <a href="https://radacademy.ru" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>radacademy.ru</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}