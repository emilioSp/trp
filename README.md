# Team Racing Point

**Team Racing Point** is an iRacing esport team website built with React, TypeScript, and Vite.

🌐 **Live site:** https://www.teamracingpoint.com

---

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [Recharts](https://recharts.org/)
- [Biome](https://biomejs.dev/) (linting & formatting)

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for the required version)
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy the example env file and fill in the required values:

```bash
cp .env.example .env
```

| Variable            | Description                        |
|---------------------|------------------------------------|
| `CLIENT_ID`         | iRacing API client ID              |
| `CLIENT_SECRET`     | iRacing API client secret          |
| `USER_NAME`         | iRacing account username           |
| `PASSWORD`          | iRacing account password           |
| `ACCESS_TOKEN_FILE` | Path to store the access token     |

### Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start the development server         |
| `npm run build` | Type-check and build for production  |
| `npm run preview` | Preview the production build       |
| `npm run lint`  | Run Biome linter                     |
| `npm run login` | Perform iRacing API login            |
| `npm run data`  | Fetch and update race data           |

## License

[MIT](LICENSE)