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

const TG_DEEPLINK = "https://t.me/RADACADEMY_HELPER_bot?start=dl-1772794237004";
const REDIRECT_URL = "https://radacademy.space/8march";

export default function March8ohPage() {
  const timer = useTimer();
  const [showModal, setShowModal] = useState(false);

  function handleVideoClick() {
    setShowModal(true);
  }

  function handleTelegramClick() {
    window.open(TG_DEEPLINK, "_blank");
    setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 300);
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) setShowModal(false);
  }

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#fff", fontFamily: "'Basis Grotesque Pro', 'Inter', sans-serif" }}>

      {/* Captcha Modal */}
      {showModal && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div style={{
            background: "#1A1A1A",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16,
            padding: "clamp(28px, 4vw, 40px) clamp(24px, 4vw, 40px)",
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
          }}>
            {/* Captcha icon */}
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "2px solid rgba(255,255,255,0.15)",
              margin: "0 auto 20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26,
            }}>
              🤖
            </div>

            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, color: "rgba(255,255,255,0.40)", marginBottom: 12 }}>
              Проверка доступа
            </div>

            <div style={{
              fontFamily: "'Cormorant', Georgia, serif",
              fontSize: "clamp(20px, 3vw, 24px)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.3,
              marginBottom: 10,
            }}>
              Пожалуйста, подтвердите,<br />что вы не робот
            </div>

            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 28, lineHeight: 1.5 }}>
              Для доступа к видео нажмите кнопку ниже
            </p>

            {/* Telegram button */}
            <button
              onClick={handleTelegramClick}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: "100%",
                padding: "16px 24px",
                background: "#2AABEE",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 600,
                color: "#fff",
                fontFamily: "inherit",
                transition: "background 0.2s, transform 0.1s",
                boxShadow: "0 4px 20px rgba(42,171,238,0.35)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#1E96D4";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#2AABEE";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {/* Telegram SVG logo */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#2AABEE"/>
                <path d="M5.491 11.74l11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.232 13.947l-2.862-.918c-.62-.195-.633-.62.13-.92z" fill="#fff"/>
              </svg>
              Подтвердить через Telegram
            </button>

            <div style={{ marginTop: 16, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
              Нажимая кнопку, вы перейдёте в Telegram и будете перенаправлены на страницу с видео
            </div>
          </div>
        </div>
      )}

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

        {/* Video thumbnail (instead of real video) */}
        <div
          onClick={handleVideoClick}
          style={{
            marginTop: 40,
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            cursor: "pointer",
          }}
        >
          {/* Thumbnail image */}
          <img
            src="https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/08ef0961-9748-4969-a650-1c190ef3fefa.png"
            alt="Видео"
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s",
            }}
          />
          {/* Dark overlay on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.30)",
            transition: "background 0.2s",
          }} />
          {/* Duration badge */}
          <div style={{
            position: "absolute", bottom: 12, right: 14,
            background: "rgba(0,0,0,0.75)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 4,
          }}>
            45:12
          </div>
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
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>
                  {pad(timer.days)}
                </div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.40)", marginTop: 6 }}>ДНЕЙ</div>
              </div>
              <div style={{ fontFamily: "inherit", fontSize: "clamp(28px, 4vw, 36px)", color: "#C0392B", paddingBottom: 20 }}>:</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>
                  {pad(timer.hours)}
                </div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.40)", marginTop: 6 }}>ЧАСОВ</div>
              </div>
              <div style={{ fontFamily: "inherit", fontSize: "clamp(28px, 4vw, 36px)", color: "#C0392B", paddingBottom: 20 }}>:</div>
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
            href="https://radacademy.ru/efir_hotels"
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
            Бесплатный онлайн-эфир Анны Симоновой<br />о создании уникальных отелей
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
              href="https://radacademy.ru/efir_hotels"
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