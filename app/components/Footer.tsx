'use client';
import Image from 'next/image';
import PreFooter from './FooterCTA';

const links = {
  legal: [
    { href: '/user-agreement', label: 'Лицензионное соглашение' },
    { href: '/privacy-policy-agreement', label: 'Политика конфиденциальности' },
    { href: '/cookie-policy', label: 'Политика использования файлов Cookie' },
    { href: '/legal-entity-agreement', label: 'Оферта для юридических лиц' },
  ],
  support: [
    { href: 'mailto:world@h3llo.cloud', label: 'Центр помощи' },
    {
      href: 'https://status.h3llo.cloud',
      label: 'Статус системы',
      external: true,
    },
  ],
};

const linkClass = 'text-h3-white hover:text-h3-mint transition-colors';

export default function Footer() {
  return (
    <footer className="relative w-full bg-h3-black" data-header-theme="dark">
      {/* SCROLL-КОНТЕЙНЕР */}
      <div className="relative">
        {/* PreFooter */}
        <section className="sticky top-0 z-10 w-full flex items-center justify-center h-[100vh] px-5">
          <PreFooter />
        </section>

        {/* Основной Footer */}
        <div
          className="
          mt-20
          fixed bottom-0 left-1/2 transform -translate-x-1/2 z-20
          relative
          backdrop-blur-sm
          z-20
          p-6
          max-w-[1512px]
          bg-h3-black/10
          border-t border-x
          rounded-t-lg
          border-white/10
        "
        >
          <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
            <div className="space-y-8">
              {/* <Image src="/img/h3-logo-white.svg" alt="H3" width={120} height={16} priority />  */}
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
                        target: '_blank',
                        rel: 'noopener noreferrer',
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
            <p className="body-mono-sm text-white">h3llo.cloud © 2025 Все права защищены</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
