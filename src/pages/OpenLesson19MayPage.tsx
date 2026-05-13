import { useState } from "react";

const HERO_IMG_1 = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/eba0970a-c81b-4ad3-be8e-bdb027d3e7d2.jpg";
const HERO_IMG_2 = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/e6813f0c-058e-42c8-ae5c-42fe9c920748.jpg";
const HERO_IMG_3 = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/0859e14b-1a92-4539-b09d-bde9742d74e7.jpg";
const ANNA_IMG = "https://cdn.poehali.dev/projects/f16b0695-ed59-4bf0-98ea-73c419c6ec58/bucket/922efe3a-82a2-4b64-94bc-1a846a42c3f4.jpg";

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
  {
    q: "Я была на эфире 12 мая. Будет ли что-то новое?",
    a: "Да. 12 мая мы говорили о рынке. 19 мая — о самой программе. Темы не пересекаются.",
  },
  {
    q: "Это запись или живой эфир?",
    a: "Только живой эфир. Запись остаётся внутри программы и доступна участникам потока. На внешние ресурсы и в открытый доступ урок не выкладывается.",
  },
  {
    q: "Если не получится прийти в 19:00?",
    a: "Догнать никак — запись не передаётся тем, кто не вошёл в поток. Если планируете прийти, спланируйте этот вечер заранее.",
  },
  {
    q: "Можно ли записаться в поток после урока?",
    a: "Да. Спецусловия для участников урока действуют до его окончания.",
  },
];

function RegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,26,26,0.85)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{ background: "#1a1a1a", border: "1px solid #c8f04a" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          aria-label="Закрыть"
        >
          ×
        </button>
        <div
          className="inline-block px-3 py-1 rounded text-xs font-semibold mb-5"
          style={{ background: "#c8f04a", color: "#1a1a1a", fontFamily: "'Basis Grotesque Pro','IBM Plex Sans',sans-serif", letterSpacing: "0.08em" }}
        >
          ОТКРЫТЫЙ УРОК · 19 МАЯ · 19:00 МСК
        </div>
        <h3
          className="mb-2 text-white text-xl"
          style={{ fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif", textTransform: "uppercase" }}
        >
          Регистрация
        </h3>
        <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'Basis Grotesque Pro','IBM Plex Sans',sans-serif" }}>
          Здесь будет форма регистрации из Геткурс — вы пришлёте скрипт позднее.
        </p>
        <div
          className="rounded-xl p-6 text-center"
          style={{ border: "1px dashed #c8f04a", color: "#c8f04a", fontFamily: "'Basis Grotesque Pro','IBM Plex Sans',sans-serif", fontSize: 14 }}
        >
          Место для скрипта Геткурс
        </div>
        <p className="text-center text-gray-500 text-xs mt-4" style={{ fontFamily: "'Basis Grotesque Pro','IBM Plex Sans',sans-serif" }}>
          Бесплатно · Онлайн · Только прямой эфир
        </p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(26,26,26,0.2)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-4 gap-4">
        <span
          className="text-sm md:text-base font-medium"
          style={{ fontFamily: "'Basis Grotesque Pro','IBM Plex Sans',sans-serif", color: "#1a1a1a" }}
        >
          {q}
        </span>
        <span
          className="text-xl flex-shrink-0 transition-transform duration-200"
          style={{ color: "#1a1a1a", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </div>
      {open && (
        <div
          className="pb-4 text-sm"
          style={{ fontFamily: "'Basis Grotesque Pro','IBM Plex Sans',sans-serif", color: "#2a2a2a" }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function OpenLesson19MayPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Basis Grotesque Pro','IBM Plex Sans',sans-serif" }}>
      <RegistrationModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* SCREEN 1 · HERO */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "#1a1a1a" }}
      >
        {/* Background image collage */}
        <div className="absolute inset-0 flex">
          <div
            className="flex-1 bg-cover bg-center"
            style={{
              backgroundImage: `url(${HERO_IMG_1})`,
              opacity: 0.35,
            }}
          />
          <div
            className="flex-1 bg-cover bg-center hidden md:block"
            style={{
              backgroundImage: `url(${HERO_IMG_2})`,
              opacity: 0.28,
            }}
          />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0.75) 100%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24 flex flex-col items-center text-center">
          <div
            className="inline-block px-4 py-2 rounded text-xs font-bold mb-8 tracking-widest"
            style={{ background: "#c8f04a", color: "#1a1a1a", letterSpacing: "0.12em" }}
          >
            ОТКРЫТЫЙ УРОК · 19 МАЯ · 19:00 МСК
          </div>

          <h1
            className="text-white mb-6 leading-none tracking-tight"
            style={{
              fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif",
              fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
            }}
          >
            Профессия будущего:<br />
            <span style={{ color: "#c8f04a" }}>HoReCa</span>
          </h1>
          <p
            className="text-lg md:text-xl mb-3 max-w-xl"
            style={{ color: "#d4d0ca", fontWeight: 300, lineHeight: 1.5 }}
          >
            Дизайнер интерьеров отелей
          </p>
          <p
            className="mb-10 max-w-xl"
            style={{ color: "#9e9a94", fontSize: 16, lineHeight: 1.6 }}
          >
            Открытый урок перед стартом нового потока. 90 минут — и вы понимаете, ваше это направление или нет.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="px-10 py-4 rounded font-semibold text-base tracking-wide transition-all duration-300 hover:opacity-90 active:scale-95"
            style={{ background: "#c8f04a", color: "#1a1a1a", letterSpacing: "0.04em" }}
          >
            Зарегистрироваться
          </button>
          <p className="mt-4 text-xs" style={{ color: "#6b6762" }}>
            Только прямой эфир.
          </p>
        </div>
      </section>

      {/* SCREEN 2 · О ЧЁМ УРОК */}
      <section className="py-24 md:py-32" style={{ background: "#1a1a1a" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <p
            className="text-xs font-bold tracking-widest mb-8"
            style={{ color: "#c8f04a", letterSpacing: "0.16em" }}
          >
            01 / СУТЬ
          </p>
          <h2
            className="text-white mb-6 leading-tight"
            style={{
              fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            За 90 минут вы получите ответ на главный вопрос
          </h2>
          <p
            className="text-xl md:text-2xl mb-8 italic"
            style={{
              fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif",
              color: "#c8f04a",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            «Подходит ли мне эта профессия и эта программа?»
          </p>
          <div className="space-y-4" style={{ color: "#9e9a94", fontSize: 16, lineHeight: 1.7 }}>
            <p>
              Я не буду пересказывать то, что было на вебинаре 12 мая. Эфир был про рынок и про то, почему отели — это вход для дизайнера из жилого. Урок 19 мая — про другое.
            </p>
            <p>
              Это закрытое знакомство с самой программой. Я покажу, как устроены 15 недель обучения, представлю экспертов потока, расскажу про защиту проекта и отвечу на ваши вопросы.
            </p>
            <p>
              Урок идёт только в прямом эфире. Запись остаётся внутри программы — её получают участники потока. В открытый доступ урок не выкладывается, поэтому всё, что я расскажу, услышат только те, кто будет онлайн 19 мая.
            </p>
          </div>
        </div>
      </section>

      {/* SCREEN 3 · ПРОГРАММА УРОКА */}
      <section className="py-24 md:py-32" style={{ background: "#f5f0e8" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p
            className="text-xs font-bold tracking-widest mb-8"
            style={{ color: "#1a1a1a", letterSpacing: "0.16em" }}
          >
            02 / ПРОГРАММА УРОКА
          </p>
          <h2
            className="mb-12 leading-tight"
            style={{
              fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            6 блоков, которые закроют все вопросы
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {programItems.map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-xl"
                style={{ background: "#ffffff", border: "1px solid rgba(26,26,26,0.08)" }}
              >
                <p
                  className="text-xs font-bold mb-2 tracking-widest"
                  style={{ color: "#c8f04a", letterSpacing: "0.12em" }}
                >
                  {item.num}
                </p>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif", color: "#1a1a1a" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: "#6b6762", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="px-6 py-5 rounded-xl text-sm font-medium"
            style={{ background: "#c8f04a", color: "#1a1a1a", lineHeight: 1.6 }}
          >
            Я хочу, чтобы в поток приходили те, кто понимает, на что идёт. Поэтому покажу программу целиком, и вы сможете принять осознанное решение.
          </div>
        </div>
      </section>

      {/* SCREEN 4 · КУРС — ОБЩИЙ КОНТУР */}
      <section className="py-24 md:py-32" style={{ background: "#1a1a1a" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p
            className="text-xs font-bold tracking-widest mb-8"
            style={{ color: "#c8f04a", letterSpacing: "0.16em" }}
          >
            03 / КУРС В ЦЕЛОМ
          </p>
          <h2
            className="text-white mb-4 leading-tight"
            style={{
              fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            15 недель. Пять смысловых этапов.<br />Один реальный проект отеля.
          </h2>
          <p className="mb-12" style={{ color: "#9e9a94", fontSize: 16, lineHeight: 1.6 }}>
            Подробный разбор — на уроке. Здесь — карта маршрута, чтобы вы понимали логику.
          </p>

          <div className="space-y-4 mb-12">
            {stages.map((stage, i) => (
              <div
                key={i}
                className="px-6 py-5 rounded-xl"
                style={{
                  background: stage.lime ? "#c8f04a" : "#f5f0e8",
                  color: "#1a1a1a",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                  <div className="md:w-56 flex-shrink-0 mb-2 md:mb-0">
                    <span
                      className="text-sm font-bold"
                      style={{ fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif", letterSpacing: "0.04em" }}
                    >
                      {stage.label}
                    </span>
                    <span
                      className="ml-2 text-xs opacity-60"
                      style={{ fontFamily: "'Basis Grotesque Pro','IBM Plex Sans',sans-serif" }}
                    >
                      {stage.weeks}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: "#2a2a2a", lineHeight: 1.6 }}>
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p
            className="text-center text-white mb-8"
            style={{ fontSize: 15, lineHeight: 1.6, color: "#d4d0ca" }}
          >
            Что внутри каждого этапа, кто ведёт, какие задания и кейсы — на уроке 19 мая.
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="px-10 py-4 rounded font-semibold text-base tracking-wide transition-all duration-300 hover:opacity-90 active:scale-95"
              style={{ background: "#c8f04a", color: "#1a1a1a", letterSpacing: "0.04em" }}
            >
              Зарегистрироваться на урок
            </button>
          </div>
        </div>
      </section>

      {/* SCREEN 5 · ОБ АННЕ */}
      <section className="py-24 md:py-32" style={{ background: "#1a1a1a" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:gap-16 items-start">
            {/* Photo */}
            <div className="w-full md:w-80 flex-shrink-0 mb-10 md:mb-0">
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={ANNA_IMG}
                  alt="Анна Симонова"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <p
                className="text-xs font-bold tracking-widest mb-6"
                style={{ color: "#c8f04a", letterSpacing: "0.16em" }}
              >
                04 / АВТОР
              </p>
              <h2
                className="text-white mb-2 leading-none"
                style={{
                  fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                }}
              >
                Анна Симонова
              </h2>
              <p
                className="mb-6 text-base"
                style={{ color: "#c8f04a", fontStyle: "italic" }}
              >
                Архитектор, дизайнер отелей, автор программы
              </p>
              <div className="space-y-4 mb-8" style={{ color: "#9e9a94", fontSize: 15, lineHeight: 1.7 }}>
                <p>
                  15 лет в проектировании. Реализованные отели в России и за рубежом. Текущий проект — пятизвёздочный отель, КП на 4,5 млн ₽ закрыто за полтора месяца.
                </p>
                <p>
                  Программу собрала по принципу «как сама хотела бы учиться, когда заходила в эту нишу». Без перепевок открытых лекций, без приглашённых теоретиков. Каждый спикер ведёт собственные проекты в HoReCa прямо сейчас.
                </p>
              </div>

              <blockquote
                className="relative pl-6"
                style={{ borderLeft: "3px solid #c8f04a" }}
              >
                <p
                  className="italic mb-4"
                  style={{
                    fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif",
                    color: "#f5f0e8",
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  «Я не верю в курсы "обо всём и ни о чём". Я собрала программу так, как сама бы хотела учиться 15 лет назад: каждый эксперт — практик, каждое задание — шаг к реальному проекту, каждая неделя — закрытая тема без воды. На уроке 19 мая я покажу это изнутри».
                </p>
                <footer className="text-sm" style={{ color: "#6b6762" }}>
                  — Анна Симонова
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* SCREEN 6 · ФИНАЛЬНЫЙ CTA + FAQ */}
      <section className="py-24 md:py-32" style={{ background: "#c8f04a" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p
            className="text-xs font-bold tracking-widest mb-8"
            style={{ color: "#1a1a1a", letterSpacing: "0.16em", opacity: 0.6 }}
          >
            19.05 · 19:00 МСК
          </p>
          <h2
            className="mb-6 leading-tight"
            style={{
              fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              fontWeight: 400,
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            Это единственный открытый урок перед стартом потока
          </h2>
          <p
            className="mb-10 text-base"
            style={{ color: "#2a2a2a", lineHeight: 1.7 }}
          >
            Если думаете о входе в HoReCa — приходите. Если не уверены — тем более. Запись остаётся внутри потока, поэтому решение приходить или нет лучше принять сейчас.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="w-full md:w-auto px-10 py-5 rounded font-bold text-base tracking-widest transition-all duration-300 hover:opacity-90 active:scale-95 mb-4"
            style={{ background: "#1a1a1a", color: "#ffffff", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Зарегистрироваться →
          </button>
          <p className="text-xs mb-14" style={{ color: "#2a2a2a", opacity: 0.7 }}>
            Бесплатно · Онлайн · 19 мая, 19:00 МСК · Только прямой эфир
          </p>

          {/* FAQ */}
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ background: "rgba(255,255,255,0.45)" }}
          >
            <h3
              className="text-base font-bold mb-6"
              style={{ fontFamily: "'SangBleu Kingdom','Cormorant',Georgia,serif", color: "#1a1a1a", textTransform: "uppercase", letterSpacing: "0.06em" }}
            >
              Частые вопросы
            </h3>
            {faqItems.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center" style={{ background: "#111111" }}>
        <p className="text-xs" style={{ color: "#3a3a3a" }}>
          © 2026 · Открытый урок «Профессия будущего: HoReCa»
        </p>
      </footer>
    </div>
  );
}
