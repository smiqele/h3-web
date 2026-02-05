export interface Card {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export const cardsData: Card[] = [
  {
    title: 'compute',
    description:
      'Гибкие виртуальные машины на базе Intel Xeon 5-го поколения и DDR5. От небольшого сервиса до высоконагруженного кластера',
    image: '/img/bug.gif',
    tags: ['от 2 до 1024 ГБ RAM', 'до 8 GPU (по требованию)', 'только диски с гибким IOPS'],
  },
  {
    title: 'virtual private cloud',
    description:
      'Изолированные виртуальные сети с гибкой маршрутизацией, высокой пропускной способностью и прямой связанностью зон',
    image: '/img/bug.gif',
    tags: [
      'подсети и виртуальные маршрутизаторы',
      'SNAT/DNAT, policy-based маршруты',
      'до 400G на каждый хост',
    ],
  },
  {
    title: 'object storage',
    description:
      'Универсальное решение для хранения данных любого объёма: от бэкапов и логов до мультимедиа и аналитических архивов',
    image: 'https://placehold.co/400x250/999999',
    tags: [
      'полная совместимость с S3 API',
      'до 1 Тбит/с суммарной пропускной способности',
      'множественная репликация',
    ],
  },
  {
    title: 'managed databases',
    description:
      'Управляемые базы данных с готовыми кластерами, резервным копированием и возможностью тонкой настройки',
    image: 'https://c.tenor.com/ff4goS5NBMkAAAAC/tenor.gif',
    tags: [
      'Postgres, MariaDB, Redis, ClickHouse, MongoDB, OpenSearch',
      'режимы: одиночный или кластерный',
      'автоматические бэкапы и восстановление',
    ],
  },
  {
    title: 'kubernetes',
    description:
      'Управляемый Kubernetes с  автомасштабированием, готовыми интеграциями и поддержкой enterprise-нагрузок',
    image: 'https://placehold.co/400x250/999999',
    tags: [
      'автоматическое управление кластерами',
      'интеграция с VPC, Disks, S3 и LoadBalancers',
      'SLA и поддержка 24/7',
    ],
  },
  {
    title: 'serverless',
    description: 'Функции как сервис — запускайте код без серверов, платите только за выполнение',
    image: 'https://placehold.co/400x250/999999',
    tags: [
      'автоматическое масштабирование',
      'поддержка событийных триггеров',
      'посекундная тарификация',
    ],
  },
];
