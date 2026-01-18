Setting up **Vue 3** with **Tailwind CSS v4** and **Vite** is faster and simpler than previous versions because Tailwind v4 is now a high-performance CSS engine that doesn't require complex PostCSS configurations for basic setups.

Follow these steps to get a fresh project running locally.

---

## 1. Create your Vue Project with Vite

Open your terminal and run the standard Vite initialization command.

```bash
npm create vite@latest learn-vuejs -- --template vue
cd learn-vuejs
npm install

```

---

## 2. Install Tailwind CSS v4

In Tailwind v4, the main package is `@tailwindcss/vite`. This is a dedicated Vite plugin that handles the scanning of your files automatically.

```bash
npm install tailwindcss @tailwindcss/vite

```

---

## 3. Configure the Vite Plugin

You need to tell Vite to use the Tailwind engine. Open `vite.config.js` (or `vite.config.ts`) and add the Tailwind plugin.

**`vite.config.js`**

```javascript
import { defineConfig } from 'vite'
import vue from '@vue/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // 1. Import the plugin

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // 2. Add it to the plugins array
  ],
})

```

---

## 4. Import Tailwind in your CSS

Tailwind v4 uses a single CSS entry point. You no longer need a `tailwind.config.js` file for basic setups—everything is handled via CSS variables or the plugin.

Open `src/style.css` (or your main CSS file) and replace the content with:

```css
@import "tailwindcss";

```

---

## 5. Verify the Setup

Now, let's test if the utility classes are working. Open `src/App.vue` and update the template:

```vue
<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-900">
    <h1 class="text-4xl font-bold text-sky-400 underline underline-offset-8">
      Vue 3 + Tailwind v4!
    </h1>
  </div>
</template>

```

---

## 6. Run the Development Server

Start your local server to see the results:

```bash
npm run dev

```

Your browser should show a dark blue screen with a bright sky-blue heading.

---

## Important Changes in v4

* **No `tailwind.config.js`?** By default, you don't need one. v4 automatically scans all files in your project. If you want to customize your theme (like adding colors), you now do it directly in your **CSS** using the `@theme` block:
```css
@theme {
  --color-brand: #3b82f6;
}

```


* **Automatic Content Detection:** You no longer need to manually list paths to your `.vue` or `.html` files; the Vite plugin handles this by looking at your module graph.


----

Since we are aiming for a professional, scalable setup, we will organize the `src` folder so that each layer has a specific "responsibility." This prevents your components from becoming bloated with logic.

Here is the recommended directory structure for a modern Vue 3 project:

### 1. The Directory Structure

```text
src/
├── api/              # Infrastructure Layer (Axios/Client config)
│   └── client.js     # Global axios instance & interceptors
├── services/         # Domain Layer (Business logic & API calls)
│   ├── UserService.js
│   └── ProductService.js
├── stores/           # State Layer (Pinia stores for global data)
│   ├── auth.js
│   └── cart.js
├── composables/      # Logic Layer (Reusable UI logic/hooks)
│   └── useNotification.js
├── components/       # UI Layer (Reusable "dumb" components)
│   ├── ui/           # Buttons, Inputs, Modals
│   └── layout/       # Navbar, Sidebar, Footer
├── views/            # Page Layer (Router components)
│   ├── HomeView.vue
│   └── LoginView.vue
├── assets/           # Static files (Images, global CSS)
├── router/           # Navigation logic
└── App.vue           # Root component

```

---

### 2. How the Layers Interact

To keep things clean, data should generally flow in one direction:
**API Client**  **Service**  **Store** (Optional)  **Component**.

#### A. The API Client (`src/api/client.js`)

This is where you configure your base URL and headers.

```javascript
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.myapp.com',
});

// Example: Add a token to every request automatically
client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;

```

#### B. The Service (`src/services/UserService.js`)

Services handle the "Data Fetching." They don't care about the UI or reactive variables.

```javascript
import client from '@/api/client';

export const UserService = {
  async getProfile() {
    const { data } = await client.get('/profile');
    return data; // Return raw or transformed data
  }
};

```

#### C. The Store (`src/stores/auth.js`)

The Store holds the data and uses the Service to get it.

```javascript
import { defineStore } from 'pinia';
import { UserService } from '@/services/UserService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async loadUser() {
      this.user = await UserService.getProfile();
    }
  }
});

```

#### D. The View/Component (`src/views/ProfileView.vue`)

The UI just "asks" for data. It doesn't know about Axios or URLs.

```vue
<script setup>
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();

// Trigger the action
auth.loadUser();
</script>

<template>
  <div v-if="auth.user">
    Welcome, {{ auth.user.name }}
  </div>
</template>

```

---

### 3. Summary of Responsibilities

* **`api/`**: Technical configuration (Timeout, Auth headers, Error codes).
* **`services/`**: Communication logic (Which endpoint to hit).
* **`stores/`**: Data persistence (Keep data alive during navigation).
* **`components/`**: Presentation (How things look).
* **`views/`**: Orchestration (Assembling components into a page).

