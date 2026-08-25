# Task Manager

> A focused workspace for organizing personal tasks, shared equipment, and team access.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](#license)

Task Manager is a responsive React application built for small teams that need a simple way to plan work and manage inventory. It uses role-based access control and browser storage, so it works without a backend or account setup.

## Contents

- [What is included](#what-is-included)
- [UI highlights](#ui-highlights)
- [Roles](#roles)
- [Quick start](#quick-start)
- [Using the app](#using-the-app)
- [Routes](#routes)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## What is included

| Area        | Capabilities                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------- |
| Tasks       | Create, edit, complete, and remove tasks with due dates, types, and priorities                 |
| Inventory   | Search by name or category, filter results, track quantities, and manage categories            |
| Accounts    | Sign up, log in, update passwords, and log out                                                 |
| Permissions | Admin, manager, and user roles with protected routes                                           |
| Experience  | Responsive layouts, persistent light/dark mode, keyboard-friendly controls, and task summaries |

## UI highlights

- Calm, responsive workspace layout for desktop and mobile
- Light and dark themes with persistent user preference
- Dashboard cards for total, open, and completed tasks
- Clear status badges for task priority and inventory categories
- Accessible focus states and descriptive account-menu controls

## Roles

| Role    | Access                                                     |
| ------- | ---------------------------------------------------------- |
| Admin   | Manage managers, inventory items, and inventory categories |
| Manager | Manage personal tasks and view inventory                   |
| User    | Manage personal tasks                                      |

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

1. Create an account or sign in from the login screen.
2. Use the home dashboard to see open and completed task totals.
3. Open **Tasks** to plan and update work.
4. Open **Inventory** to search shared resources. Admins can add items and categories.
5. Use the account menu to open **Profile**, update a password, or log out.
6. Use the theme control in the navigation bar to switch between light and dark mode.

All application data is stored in the browser using `localStorage`. Task data is separated by username, while inventory data is shared in the current browser.

## Routes

| Route        | Purpose                       |
| ------------ | ----------------------------- |
| `/login`     | Sign in or create an account  |
| `/home`      | Dashboard and task summary    |
| `/tasks`     | Personal task management      |
| `/inventory` | Shared inventory management   |
| `/profile`   | Account and password settings |
| `/admin`     | Admin-only manager management |

## Project structure

```text
src/
  components/   Reusable UI components and task controls
  context/      Auth, task, and theme state providers
  hooks/        Shared React hooks
  pages/        Route-level views
  styles/       Page-specific stylesheets
  assets/       Static application assets
```

## Technology

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
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

- This is a browser-only demo with no backend or remote synchronization.
- Data is tied to the current browser and can be cleared with browser storage.
- Demo passwords are stored in `localStorage`; do not use real credentials.
- The first account can select the admin role during sign-up for local testing.

## Contributing

Bug reports, improvements, and pull requests are welcome. Please keep changes focused and verify them with the available build and lint commands.

## License

This project is licensed under the MIT License.
