# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contact API and CORS setup

For local development and production, configure frontend and backend origins explicitly.

Backend env file (`backend/.env`):

```env
PORT=3000
RESEND_API_KEY=your_resend_key_here
FRONTEND_ORIGIN=http://localhost:5173,https://patricklmbn.online
```

Frontend env file (`.env` or `.env.local` at the project root):

```env
VITE_API_URL=http://localhost:3000
```

Notes:

- `FRONTEND_ORIGIN` supports a comma-separated allowlist.
- In production, set `VITE_API_URL` to your deployed backend URL.
- If `VITE_API_URL` is not set, the app uses `http://localhost:3000` in dev and `https://resend.patricklmbn.online` in production.
