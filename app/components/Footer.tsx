"use client";
import Image from "next/image";
import PreFooter from "./FooterCTA";

const links = {
  legal: [
    { href: "/user-agreement", label: "Лицензионное соглашение" },
    { href: "/privacy-policy-agreement", label: "Политика конфиденциальности" },
    { href: "/cookie-policy", label: "Политика использования файлов Cookie" },
    { href: "/legal-entity-agreement", label: "Оферта для юридических лиц" },
  ],
  support: [
    { href: "mailto:world@h3llo.cloud", label: "Центр помощи" },
    {
      href: "https://status.h3llo.cloud",
      label: "Статус системы",
      external: true,
    },
  ],
};

const linkClass = "text-h3-white hover:text-h3-mint transition-colors";

export default function Footer() {
  return (
    <footer className="relative w-full bg-h3-black">
      {/* Видео-фон */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/anim/hand.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Полупрозрачный оверлей для контраста */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* PreFooter */}
      <section className="relative z-10 w-full flex items-center justify-center h-[80vh] px-5">
        <PreFooter />
      </section>

      {/* Основной Footer */}
      <div className="relative z-10 px-12 py-12 max-w-[1512px] mx-auto">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-8">
            <Image
              src="/img/h3-logo-white.svg"
              alt="H3"
              width={120}
              height={16}
              priority
            />
            <p className="headline-xs-text text-h3-white max-w-md">
              Строим облачный гиперскейлер на максималках
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="body-lg text-h3-steel">Юридическая информация</h4>
            <ul className="space-y-2 text-sm">
              {links.legal.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="body-lg text-h3-steel">Поддержка</h4>
            <ul className="space-y-2 text-sm">
              {links.support.map(({ href, label, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={linkClass}
                    {...(external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6">
          <p className="body-mono-sm text-white">
            h3llo.cloud © 2025 Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
}
