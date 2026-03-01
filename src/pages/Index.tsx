import { useEffect } from "react";

const HERO_IMG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/files/5a594e95-13d3-4cd2-b917-213510df4bd5.jpg";
const SPEAKER_IMG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/files/48efd3f3-b1e1-40da-9012-d7915fd18d36.jpg";

const GoldDivider = () => (
  <div className="w-full py-2">
    <div className="gold-line" />
  </div>
);

const LogoRAD = () => (
  <div className="flex items-center gap-2">
    <div className="flex flex-col leading-none">
      <span
        className="font-heading text-white font-bold"
        style={{ fontSize: "22px", letterSpacing: "0.18em" }}
      >
        RAD
      </span>
      <span
        className="font-body text-white font-light"
        style={{ fontSize: "10px", letterSpacing: "0.28em" }}
      >
        ACADEMY
      </span>
    </div>
  </div>
);

export default function Index() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen font-body"
      style={{ backgroundColor: "#5B090A", color: "#FFFFFF" }}
    >
      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#5B090A" }}>
        <header className="flex items-center px-6 md:px-12 pt-6 pb-4">
          <LogoRAD />
        </header>

        <div className="px-6 md:px-12 pb-16 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center min-h-[90vh] md:min-h-[85vh]">
          {/* Left text 60% */}
          <div className="md:col-span-3 flex flex-col gap-6 md:gap-7">
            {/* Badges */}
            <div className="flex flex-wrap gap-3 animate-on-scroll" style={{ opacity: 0 }}>
              <span className="badge-outline">🗓 11–12 марта</span>
              <span className="badge-outline">💻 Онлайн</span>
              <span className="badge-outline">🎓 Бесплатно</span>
            </div>

            {/* H1 */}
            <h1
              className="font-heading text-white animate-on-scroll"
              style={{
                fontSize: "clamp(48px, 9vw, 100px)",
                lineHeight: "0.93",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                opacity: 0,
              }}
            >
              HORECA
              <br />
              <span style={{ color: "#C9A96E" }}>EDUCATION</span>
              <br />
              DAY
            </h1>

            {/* Subtitle */}
            <p
              className="font-body text-white/85 animate-on-scroll"
              style={{
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: "1.65",
                maxWidth: "540px",
                opacity: 0,
              }}
            >
              Как дизайнеру интерьера войти в HoReCa и зарабатывать на другом уровне — онлайн-воркшоп в формате{" "}
              <em style={{ color: "#C9A96E" }}>
                Гарвардского метода обучения Case Study
              </em>
            </p>

            {/* CTA */}
            <div className="flex flex-col gap-4 animate-on-scroll" style={{ opacity: 0 }}>
              <button className="btn-white self-start">
                ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →
              </button>
              <p
                className="font-body text-white/45"
                style={{ fontSize: "13px", lineHeight: "1.5", maxWidth: "460px" }}
              >
                RAD ACADEMY — Топ-2 онлайн школа дизайна интерьера в рейтинге РБК · Анна Симонова — 18 лет практики, 100+ реализованных объектов
              </p>
            </div>
          </div>

          {/* Right photo 40% */}
          <div className="md:col-span-2 animate-on-scroll" style={{ opacity: 0 }}>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: "clamp(260px, 52vh, 580px)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
                border: "1px solid rgba(201,169,110,0.25)",
              }}
            >
              <img
                src={HERO_IMG}
                alt="HoReCa интерьер"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.82) saturate(0.9)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, transparent 50%, rgba(91,9,10,0.65) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="px-6 md:px-12">
          <GoldDivider />
        </div>
      </section>

      {/* ── БЛОК 2: ДЛЯ КОГО ── */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ backgroundColor: "#5B090A" }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-heading text-white animate-on-scroll"
            style={{
              fontSize: "clamp(30px, 4.5vw, 60px)",
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: "48px",
              opacity: 0,
            }}
          >
            HoReCa Education Day —<br />
            <span style={{ color: "#C9A96E" }}>для вас, если:</span>
          </h2>

          <div className="flex flex-col gap-1 animate-on-scroll" style={{ opacity: 0 }}>
            {[
              "У вас 3+ лет опыта в дизайне интерьера",
              "Работаете с жилыми проектами и упёрлись в потолок по доходу",
              "Надоел бежевый минимализм — хочется масштабных объектов",
              "Хотите работать с отелями, ресторанами, кафе — но не знаете как войти и как считать услуги",
              "Нужна не теория, а живой кейс и работающая система",
            ].map((item, i) => (
              <div key={i} className="checkmark-item">
                <span
                  style={{
                    color: "#C9A96E",
                    fontWeight: 700,
                    fontSize: "20px",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  ✓
                </span>
                <span style={{ fontSize: "clamp(16px, 1.3vw, 18px)", lineHeight: 1.65 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p
            className="font-body text-white/75 animate-on-scroll mt-10"
            style={{ fontSize: "clamp(16px, 1.2vw, 19px)", fontStyle: "italic", opacity: 0 }}
          >
            Узнали себя? HoReCa Education Day создан именно для вас.
          </p>

          <div className="mt-8 animate-on-scroll" style={{ opacity: 0 }}>
            <button className="btn-white">ХОЧУ ПОПАСТЬ НА ВОРКШОП →</button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20">
          <GoldDivider />
        </div>
      </section>

      {/* ── БЛОК 3: ЧТО ПОЛУЧИТЕ ── */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ backgroundColor: "#5B090A" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-heading text-white animate-on-scroll text-center"
            style={{
              fontSize: "clamp(26px, 3.8vw, 54px)",
              fontWeight: 600,
              lineHeight: 1.15,
              maxWidth: "780px",
              margin: "0 auto 56px",
              opacity: 0,
            }}
          >
            За 2 вечера вы получите то, на что другие тратят{" "}
            <span style={{ color: "#C9A96E" }}>годы проб и ошибок</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              {
                icon: "🔢",
                title: "МЕТОДОЛОГИЯ РАСЧЁТА УСЛУГ",
                desc: "Как считать стоимость услуг в HoReCa — не квадратными метрами, а по профессиональной системе",
              },
              {
                icon: "🏨",
                title: "РАЗБОР ЖИВОГО КЕЙСА ОТЕЛЯ",
                desc: "Реальный объект студии RADDESIGN, реальные цифры и решения в формате Case Study",
              },
              {
                icon: "✏️",
                title: "ПРАКТИКА НА ВОРКШОПЕ",
                desc: "Получите задание, выполните, получите разбор от эксперта — это навык, а не просто знание",
              },
              {
                icon: "🗺",
                title: "АЛГОРИТМ СОЗДАНИЯ ДИЗАЙН-КОНЦЕПЦИИ В HORECA",
                desc: "Реальные примеры концепций от студии RADDESIGN — структура, логика, этапы",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="card-horeca animate-on-scroll flex flex-col gap-4"
                style={{ opacity: 0, transitionDelay: `${i * 0.1}s` }}
              >
                <span style={{ fontSize: "38px" }}>{card.icon}</span>
                <h3
                  className="font-heading font-semibold"
                  style={{ fontSize: "clamp(15px, 1.1vw, 19px)", lineHeight: 1.2, color: "#C9A96E" }}
                >
                  {card.title}
                </h3>
                <p className="font-body text-white/80" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20">
          <GoldDivider />
        </div>
      </section>

      {/* ── БЛОК 4: ПРОГРАММА ── */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ backgroundColor: "#5B090A" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-heading text-white text-center animate-on-scroll"
            style={{
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: 600,
              lineHeight: 1.1,
              opacity: 0,
            }}
          >
            Программа{" "}
            <span style={{ color: "#C9A96E" }}>HoReCa Education Day</span>
          </h2>
          <p
            className="font-body text-white/65 text-center animate-on-scroll"
            style={{
              fontSize: "clamp(16px, 1.2vw, 18px)",
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: "16px auto 48px",
              opacity: 0,
            }}
          >
            Гарвардский метод обучения Case Study — это не лекция.
            Это живая работа с реальным кейсом.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div
                key={i}
                className="card-horeca animate-on-scroll flex flex-col gap-5"
                style={{ opacity: 0, transitionDelay: `${i * 0.15}s` }}
              >
                <div>
                  <span
                    className="font-body font-semibold tracking-widest"
                    style={{ fontSize: "11px", color: "#C9A96E", letterSpacing: "0.2em" }}
                  >
                    {prog.day}
                  </span>
                  <h3
                    className="font-heading text-white mt-2"
                    style={{ fontSize: "clamp(17px, 1.4vw, 22px)", lineHeight: 1.2, fontWeight: 600 }}
                  >
                    {prog.title}
                  </h3>
                </div>

                <div
                  className="flex flex-col gap-3"
                  style={{ borderTop: "1px solid rgba(201,169,110,0.2)", paddingTop: "20px" }}
                >
                  {prog.items.map((item, j) => (
                    <div key={j} className="flex gap-3 items-start">
                      <span style={{ color: "#C9A96E", flexShrink: 0, fontSize: "16px" }}>•</span>
                      <span className="font-body text-white/80" style={{ fontSize: "15px", lineHeight: 1.55 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="font-body text-white/45 mt-auto"
                  style={{
                    fontSize: "13px",
                    borderTop: "1px solid rgba(201,169,110,0.15)",
                    paddingTop: "16px",
                    letterSpacing: "0.03em",
                  }}
                >
                  {prog.format}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center animate-on-scroll" style={{ opacity: 0 }}>
            <button className="btn-white">ЗАРЕГИСТРИРОВАТЬСЯ БЕСПЛАТНО →</button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-20">
          <GoldDivider />
        </div>
      </section>

      {/* ── БЛОК 5: СПИКЕР ── */}
      <section className="px-6 md:px-12 py-20 md:py-28" style={{ backgroundColor: "#5B090A" }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="font-body text-center animate-on-scroll"
            style={{
              fontSize: "11px",
              color: "#C9A96E",
              letterSpacing: "0.25em",
              marginBottom: "48px",
              opacity: 0,
            }}
          >
            ЭКСПЕРТ HORECA EDUCATION DAY
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Photo */}
            <div className="animate-on-scroll" style={{ opacity: 0 }}>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  height: "clamp(340px, 55vh, 620px)",
                  boxShadow: "0 20px 70px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(201,169,110,0.3)",
                }}
              >
                <img
                  src={SPEAKER_IMG}
                  alt="Анна Симонова"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "saturate(0.85)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 55%, rgba(91,9,10,0.75) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-heading text-white font-semibold" style={{ fontSize: "28px" }}>
                    Анна Симонова
                  </p>
                  <p className="font-body text-white/65" style={{ fontSize: "14px", marginTop: "4px" }}>
                    Основатель RAD ACADEMY и студии RADDESIGN
                  </p>
                </div>
              </div>
            </div>

            {/* Facts + Quote */}
            <div className="flex flex-col gap-6 animate-on-scroll" style={{ opacity: 0 }}>
              <ul className="flex flex-col gap-4">
                {[
                  "18 лет практики в HoReCa-дизайне",
                  "100+ реализованных объектов — отели, рестораны, кафе, лобби, spa",
                  "Основатель RAD ACADEMY — ведущей школы HoReCa-дизайна в России",
                  "Руководитель студии RADDESIGN — ателье премиальных интерьеров",
                  "Спикер GSF, Московской недели дизайна, ARTDOM",
                  "Член Ассоциации CISSA",
                ].map((fact, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span style={{ color: "#C9A96E", fontSize: "18px", flexShrink: 0, lineHeight: 1.5 }}>
                      ✦
                    </span>
                    <span
                      className="font-body text-white/85"
                      style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.6 }}
                    >
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Quote */}
              <div style={{ borderLeft: "3px solid #C9A96E", paddingLeft: "24px", marginTop: "8px" }}>
                <p
                  className="font-heading text-white/90"
                  style={{
                    fontSize: "clamp(16px, 1.2vw, 19px)",
                    lineHeight: 1.65,
                    fontStyle: "italic",
                  }}
                >
                  «Большинство дизайнеров из жилых проектов совершают одну и ту же ошибку в расчётах — и либо теряют деньги, либо теряют клиента. На HoReCa Education Day я покажу как этого избежать — на живом кейсе, а не в теории»
                </p>
                <p
                  className="font-body mt-3"
                  style={{ fontSize: "13px", color: "#C9A96E", letterSpacing: "0.05em" }}
                >
                  — Анна Симонова
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-20">
          <GoldDivider />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-12 py-12" style={{ backgroundColor: "#5B090A" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 justify-between">
          {/* Logo + legal */}
          <div className="flex flex-col gap-4">
            <LogoRAD />
            <p className="font-body text-white/35" style={{ fontSize: "13px", lineHeight: 1.55 }}>
              © 2025 ИП Вылегжанина А.С.
              <br />
              <a
                href="mailto:mail@onlinerad.ru"
                className="hover:text-[#C9A96E] transition-colors"
              >
                mail@onlinerad.ru
              </a>
            </p>
            <div className="flex gap-5">
              <a
                href="https://t.me/rad_academy_design"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-white/40 hover:text-[#C9A96E] transition-colors"
                style={{ fontSize: "13px" }}
              >
                Telegram
              </a>
              <a
                href="https://vk.com/radacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-white/40 hover:text-[#C9A96E] transition-colors"
                style={{ fontSize: "13px" }}
              >
                ВКонтакте
              </a>
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3">
            {[
              { label: "Публичная оферта", href: "https://radacademy.ru/offer" },
              { label: "Политика обработки персональных данных", href: "https://radacademy.ru/privacy_policy" },
              { label: "Согласие на обработку персональных данных", href: "https://radacademy.ru/consent_user" },
              { label: "Контактная информация", href: "https://radacademy.ru/contacts" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-white/35 hover:text-[#C9A96E] transition-colors"
                style={{ fontSize: "13px", lineHeight: 1.5 }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
