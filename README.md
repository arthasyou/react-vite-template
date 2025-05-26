# React + Vite Template

This is a minimal template for building React 19 apps with Vite, TypeScript, and SWC.

## 🚀 Usage

Create a new project with degit:

```bash
npx degit arthasyou/react-vite-template my-app
cd my-app
pnpm install
pnpm dev
```

## 📦 Includes

- React 19 + ReactDOM
- Vite 6
- TypeScript 5
- SWC (`@vitejs/plugin-react-swc`)
- ESLint with React plugins
- pnpm support

## 📁 Project Structure

```
my-app/
├── public/ # Static public assets
├── src/
│ ├── api/ # API modules (e.g., authApi, base)
│ ├── assets/ # Static assets (e.g., icons, images)
│ ├── components/ # Shared React components
│ ├── i18n/ # i18n setup for localization
│ ├── layouts/ # Layout components (AppLayout, AuthLayout)
│ ├── models/ # Data models (e.g., authModel)
│ ├── pages/
│ │ ├── protected/ # Protected (authenticated) pages
│ │ └── public/ # Public (unauthenticated) pages
│ ├── routes/ # Route definitions (index, protected/public routes)
│ ├── store/ # Global state management (e.g., Redux slices)
│ ├── utils/ # Utility functions (e.g., httpClient)
│ ├── index.css # Global styles
│ ├── main.tsx # Application entry point
│ └── vite-env.d.ts # Vite environment type declarations
├── index.html # HTML entry point
├── vite.config.ts # Vite configuration
├── tsconfig.json # TypeScript configuration
└── .eslintrc.cjs # ESLint configuration
```
