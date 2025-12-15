'use client';

export default function Footer() {
  return (
    <footer className="text-white w-screen px-4">
      <div className="bg-black px-5 p-10 rounded-t-xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 ">
          {/* Логотип и описание */}
          <div className="space-y-10">
            <p className="headline-xs-text text-white px-2">
              Строим облачный гиперскейлер на максималках
            </p>
          </div>

          {/* Юридическая информация */}
          <div className="space-y-10">
            <h4 className="body-lg text-brand-steel">Юридическая информация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/user-agreement"
                  className="text-brand-white hover:text-brand-mint transition-colors"
                >
                  Лицензионное соглашение
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy-agreement"
                  className="text-brand-white hover:text-brand-mint transition-colors"
                >
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="text-brand-white hover:text-brand-mint transition-colors"
                >
                  Политика использования файлов Cookie
                </a>
              </li>
              <li>
                <a
                  href="/legal-entity-agreement"
                  className="text-brand-white hover:text-brand-mint transition-colors"
                >
                  Оферта для юридических лиц
                </a>
              </li>
            </ul>
          </div>

          {/* Поддержка */}
          <div className="space-y-10">
            <h4 className="body-lg text-brand-steel">Поддержка</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:world@h3llo.cloud"
                  className="text-brand-white hover:text-brand-mint transition-colors"
                >
                  Центр помощи
                </a>
              </li>
              <li>
                <a
                  href="https://status.h3llo.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-white hover:text-brand-mint transition-colors"
                >
                  Статус системы
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6">
          <p className="body-mono-sm text-white">h3llo.cloud © 2025 Все права защищены</p>
        </div>
      </div>
    </footer>
  );
}
