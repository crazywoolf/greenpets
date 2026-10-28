# GreenPets — локальный landing + web MVP

Локальный прототип для C-сегмента: человек, который хочет иметь растения, но не умеет или не хочет разбираться с уходом.

## Что уже работает

- `index.html` — лендинг;
- `app.html` — демо одного сценария «настроить регулярный уход»;
- ручной выбор из пяти растений;
- ввод условий и симптомов;
- объяснимая демонстрационная рекомендация;
- план на 30 дней;
- сохранение последнего состояния в `localStorage`;
- адаптивная верстка для ноутбука и телефона.
- реальные фотографии растений из Wikimedia Commons; ссылки и лицензии перечислены ниже.

Фото, распознавание, аккаунт, несколько растений, серверное хранение и подключение эксперта оставлены в backlog.

## Фотографии и лицензии

Пока изображения подключаются по открытым ссылкам Wikimedia Commons, чтобы не раздувать локальный прототип. Перед публикацией их можно скачать локально в WebP.

- [Monstera deliciosa](https://commons.wikimedia.org/wiki/File:Monstera_deliciosa.jpg) — CC BY-SA 3.0, Peter A. Mansfeld.
- [Ficus elastica](https://commons.wikimedia.org/wiki/File:FicusElastica.jpg) — CC BY 2.5 / GFDL, Fanghong.
- [Zamioculcas zamiifolia](https://commons.wikimedia.org/wiki/File:Zamioculcas_zamiifolia.jpg) — CC BY-SA 4.0, Bereader.
- [Phalaenopsis Orchid](https://commons.wikimedia.org/wiki/File:Phalaenopsis_Orchid.jpg) — CC BY 3.0, Sanx.
- [Spathiphyllum wallisii](https://commons.wikimedia.org/wiki/File:SpathiphyllumWallisii.jpg) — public domain, Peter Fiskerstrand.
- [Plant at pot](https://commons.wikimedia.org/wiki/File:Plant_at_pot.jpg) — CC0, Iswaryadhamodharan2001; используется как hero-фото на лендинге.

## Запуск

Открой `index.html` в браузере или запусти из этой папки любой простой статический сервер, например:

```bash
python3 -m http.server 4173
```

Затем открой `http://localhost:4173/`.
