# NASA data

**App with [NASA](https://api.nasa.gov/) space photos, built with Next.js, Redux and TypeScript.** Includes SSR & ISR, Firebase authentication and Firestore for photo storage.

[README на русском](./README.ru.md)

## 🌐 Deployment

[**Deployment**](https://nasa-data-peach.vercel.app/)

[**VIDEO DEMO**](https://drive.google.com/file/d/1Rv00b0MYVZDymX5AeRn2HHXA3T_MT-i3/view)

<img src="./public/nasa_preview.gif" alt="preview" />

## 🛠️ Technologies

- **TypeScript**
- **React**
- **Next.js**
- **Redux Toolkit**
- **Firebase** (Authentication, Firestore)
- **Tailwind CSS**
- **SCSS** (Sass)
- **Formik, Yup**
- **Jest, React Testing Library**
- **ESLint, Prettier**
- **Nasa API**

## 💻 Features

- Photo/Video of the Day page with **Incremental Static Regeneration** (ISR)
- Photo search
- Detailed photo information in a modal window (title, full-size image, date, copyright/center, description)
- Initial display of a **“Photo of the Day” gallery** before searching with **Server-Side Rendering** (SSR)
- Pagination
- Registration with email and password **(Firebase Authentication)**
- Login **(Firebase Authentication)**
- Form validation for registration and login
- **Email verification** flow during registration
- Adding photos to a personal collection **(stored in Firestore)** — handled via a **custom useFavorites hook**
- Profile page with user data
- **Custom useUserData hook** for accessing user information
- Display of the **user's photo collection** on the profile page
- **Sorting of saved photos** by date
- **Profile editing** (available after email verification)
- **Reusable UI components** (buttons, inputs, modals, photo cards, dropdowns, toasts)
- Test coverage

## More details

### Routing

- **App Router**. Hooks usePathname, useRouter from next/navigation
- Route protection with **AuthContext**
- Content is hidden until authentication is complete
- **Automatic redirect to the profile page** after successful registration or login
- **Redirect to the login page** when accessing the profile route as an unauthenticated user
- **Pages**:
  - Home
  - Main (Photo of the day)
  - Search
  - Registration
  - Login
  - Profile
  - Edit profile

### State management

- **createAsyncThunk** for API requests
- **Redux slices** for managing photo and favorites state
- **Firestore** used to store user data and photo collections
- Synchronization between Redux store and Firestore

### Loading & error handling

- **Spinner** shown during loading (e.g., photo search, profile loading)
- **Toast notifications** for:
  - Successful or failed registration/login
  - Profile data load errors
- Global error page **(error.tsx)**

### Form validation

- Form validation with **Yup** and **Formik**
- Registration form requires:
  - Name
  - Email (must match valid format)
  - Password (minimum 6 characters)
- All fields are required
- Submit button is disabled until form is valid

### Profile page

- Displays user's name and email
- User's saved photo collection
- Ability to sort photos by date
- Access to **profile editing** (only after email verification)

### Performance optimizations

- Optimized images with **next/image**
- Fonts managed via **next/font**
- **revalidate** used for caching API responses

### Styling and responsiveness

- Fully responsive layout down to 360px screen width **(Tailwind CSS)**
- Navigation bar collapses into **a burger menu** on screens narrower than 912px
- Modal windows adapt to content
- Search and form submit buttons are disabled until all fields are valid

### Error handling in API

- **Fallback placeholders** used for missing data
- API returns a **full nextPage URL**
  - For createAsyncThunk, either the **initial search query** or the **pagination URL** is used
- **http in pagination URLs is replaced with https** to prevent double requests from redirects

### Safety

- API key and Firebase credentials are stored in .env files
- **Firestore security rules** are configured
- **Routes are protected** based on authentication state

## 📁 Architecture

```bash
__tests__
public/
src/app/
├── context/
├── hooks/
├── lib/
├── main/
├── redux/
├── shared/
├── ui/
```

## 🪄 How to start project

clone the repository:

```bash
git clone
```

in the project directory enter:

```bash
npm install
```

create **.env.local** file with _.env.example_ in the root directory and then run:

```bash
npm run dev
```

lint:

```bash
npm run lint
```

build the project:

```bash
npm run build
```

production mode:

```bash
npm start
```
