# Task Manager

> A focused workspace for organizing personal tasks, shared equipment, and team access.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](#license)

Task Manager is a responsive React application for small teams that need a simple way to plan work and manage shared equipment. It includes personal task boards, an inventory catalogue, account settings, and an admin area for managing manager access. The app uses React Context and browser storage, so it runs locally without a backend.

## Contents

- [Features](#features)
- [Roles and permissions](#roles-and-permissions)
- [Quick start](#quick-start)
- [Using the app](#using-the-app)
- [Routes](#routes)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Features

| Area           | Capabilities                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------- |
| Tasks          | Create, edit, complete, and delete personal tasks with due dates, task types, and priorities |
| Inventory      | Browse shared items, search by name, filter by category, and track total items and units     |
| Administration | Add, edit, and delete manager accounts; add and delete inventory categories and items        |
| Accounts       | Create an account, sign in, change a password, and log out                                   |
| Experience     | Responsive layouts, persistent light/dark mode, protected routes, and task summaries         |

## Roles and permissions

| Role    | Access                                                                           |
| ------- | -------------------------------------------------------------------------------- |
| Admin   | Manage personal tasks, view and manage inventory, manage categories and managers |
| Manager | Manage personal tasks and view inventory                                         |

## Quick start

### Requirements

- Node.js 18 or newer
- npm

### Run locally

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To create a production build:

```sh
npm run build
```

## Using the app

1. Create an account from the login screen and choose either the `admin` or `manager` role, or sign in to an existing account.
2. Use **Home** for a summary of all, open, and completed tasks.
3. Open **Tasks** to create and update your personal task list.
4. Open **Inventory** to browse shared resources. Admins can add, edit, and delete items and categories.
5. Admins can open **Admin** to add, edit, or delete manager accounts.
6. Use the account menu to open **Profile**, change a password, or log out.
7. Use the theme control in the navigation bar to switch between light and dark mode.

All application data is stored in the browser using `localStorage`. Tasks are separated by username. Users, inventory items, and inventory categories are shared within the current browser.

## Routes

| Route        | Purpose                                      |
| ------------ | -------------------------------------------- |
| `/login`     | Sign in or create an account                 |
| `/`          | Home dashboard for signed-in users           |
| `/intro`     | Signed-in workspace overview                 |
| `/home`      | Dashboard and task summary                   |
| `/tasks`     | Personal task management                     |
| `/inventory` | Shared inventory browsing and administration |
| `/profile`   | Account and password settings                |
| `/admin`     | Admin-only manager management                |

## Project structure

```text
src/
  components/   Reusable navigation, authentication, and task components
  context/      Auth, task, and theme state providers
  hooks/        Shared context hooks
  pages/        Route-level views
  styles/       Page-specific stylesheets
  assets/       Static application assets
```

## Technology

- [React 19](https://react.dev/)
- [Vite 7](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [UUID](https://www.npmjs.com/package/uuid)
- Browser `localStorage`
- React Context for shared state

## Development commands

```sh
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## Limitations

- This is a browser-only app with no backend or remote synchronization.
- Data is tied to the current browser and can be cleared with browser storage.
- Passwords are stored in `localStorage`; do not use real credentials.
- Role selection is available during sign-up for local testing; there is no server-side authorization.

## Contributing

Bug reports, improvements, and pull requests are welcome. Please keep changes focused and verify them with the available build and lint commands.

## License

This project is licensed under the MIT License.
