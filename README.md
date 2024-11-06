# NASA Data

Приложение с данными [NASA](https://api.nasa.gov/).

## Deployment & Live Demo

[Deploy](https://datanasa.netlify.app/)

![Demo GIF](.public/preview.gif)

## Technologies Used

- Typescript
- React
- Next.js
- Redux Toolkit
- Firebase (Authentication, Firestore)
- Tailwind CSS
- SCSS (Sass)
- Formik, Yup
- Webpack
- ESLint, Prettier
- Nasa API

## Features

- Отображение фотографии/видео дня (ISR)
- Поиск фотографий
- Информация о фото в модальном окне (название, дата, центр/копирайт, описание)
- Отображение подборки фотографий "фото дня" перед выполнением поиска (SSR)
- Пагинация
- Регистрация (firebase) по почте
- Авторизация (firebase)
- Валидация форм регистрации и авторизации
- Добавление фотографий в коллекцию (firestore)
- Страница профиля
- Отображение коллекции фото в профиле
- Редактирование профиля
- Собственный UI и универсальные UI-компоненты (кнопки, инпуты, модальные окна, карточки фото)

## More details

### Routing

- App Router. Хуки usePathname, useRouter из next/navigation
- Защита маршрутов с помощью AuthContext
- Контент скрыт до завершения аутентификации
- Редирект на профиль после регистрации и авторизации
- Редирект с адреса профиля на страницу авторизации для неавторизованных пользователей
- Страницы:
  - Главная страница
  - Dashboard
  - Search (поиск фото)
  - Registration
  - Login
  - Profile

### State Management

- createAsyncThunk для запросов к API
- slices для состояний фото и избранного
- firestore для хранения данных о юзере и его коллекции фотографий
- Синхронизация между redux-стором и firestore

### Loading & Error Handling

- Спиннер при загрузке (поиск фото, загрузка профиля)
- Модальные окна с сообщениями:
  - Успешная и неуспешная регистрация/авторизация
  - Ошибка при загрузке данных профиля
- Общая страница ошибки error.tsx

### Form Validation

- Валидация форм регистрации и авторизации с Yup и Formik
- Регистрация: имя, почта (соответствие формату), пароль (не менее 6 символов)
- Все поля обязательны для заполнения
- Кнопка submit отключена при некорректном заполнении полей

### Profile

- Имя, почта
- Дата создания аккаунта и последнего входа (создана функция formatDate для преобразования Timestamp в Date)
- Редактирование профиля
- Коллекция фото

### Performance Optimizations

- next/image для изображений
- next/font для шрифтов
- next/cache для кэширования результата запроса
- ISR для загрузки страницы "фото дня"

### Styling and Responsiveness

- Адаптивная вёрстка до 360px ширины экрана (Tailwind CSS)
- Навигационная панель складывается в бургер-меню при ширине менее 912px
- Модальные окна подстраиваются под контент (фото/сообщение)

### Error Handling in API

- Недостающие данные заменяются заглушками
- API возвращает полный url следующей страницы. В createAsyncThunk передается либо значение поиска при первом запросе, либо url для пагинации
- http в url для пагинации заменяется на https (для исключения двойного запроса с редиректом)

### Safety

- Ключ API и ключи Firebase хранятся в .env
- Настроены правила безопасности в Firestore
- Защита маршрутов

## How to start project

in the project directory enter:

```js
npm install
```

and then run in dev mode:

```js
npm run dev
```

lint:

```js
npm run lint
```

build the project:

```js
npm run build
```

production mode:

```js
npm start
```
