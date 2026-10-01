# Task Manager Inventory

> A role-based React workspace for managing tasks and shared team inventory, with authentication, an admin panel, and light/dark theming — built with React 19, React Router 7, Vite 7, and browser-local storage.

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-ca4245?logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-f7df1e?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?logo=node.js&logoColor=white)
![ESLint](https://img.shields.io/badge/Lint-ESLint-4b32c3?logo=eslint&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-0f766e)

Task Manager Inventory is a single-page React application for small teams that need to track personal tasks and a shared pool of equipment. Managers plan and complete their own tasks and browse the shared inventory. Admins can also manage inventory, categories, and manager accounts.

The app is a static, client-side build with no backend. All accounts, tasks, and inventory are stored in the browser's `localStorage`.

## Contents

- [Workspace coverage](#workspace-coverage)
- [Features](#features)
- [Roles](#roles)
- [Quick start](#quick-start)
- [Using the app](#using-the-app)
- [Routes](#routes)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Data and persistence](#data-and-persistence)
- [Deployment](#deployment)
- [Linting](#linting)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Workspace coverage

The app contains **7 pages**, all lazy-loaded with `React.lazy` and `Suspense`.

| Page      | File                | Purpose                                                            |
| --------- | ------------------- | ------------------------------------------------------------------ |
| Login     | `Login.jsx`         | Sign up or log in, and choose a role at sign-up                    |
| Home      | `Home.jsx`          | Task summary dashboard with shortcuts                              |
| Intro     | `Intro.jsx`         | Workspace overview with links to Tasks, Inventory, and Team access |
| Tasks     | `Tasks.jsx`         | Create, edit, complete, and delete tasks                           |
| Profile   | `Profile.jsx`       | Account details, password update, and log out                      |
| Inventory | `InventoryPage.jsx` | Shared inventory and category management                           |
| Admin     | `AdminPanel.jsx`    | Manager account administration (admin only)                        |

### Tasks

| Field       | Options                                  |
| ----------- | ---------------------------------------- |
| Description | Free text                                |
| Due date    | Date picker                              |
| Type        | Develop, Support, or Testing             |
| Priority    | Low, Normal, or High                     |
| Status      | Open or completed, toggled from the list |

Each task gets a unique ID from `uuid`. Tasks are stored per user.

### Inventory

| Field    | Notes                                                                            |
| -------- | -------------------------------------------------------------------------------- |
| Name     | Item name                                                                        |
| Quantity | Whole number                                                                     |
| Category | Chosen from the category list. Defaults are laptop, mouse, keyboard, and monitor |

The inventory is shared by every account in the same browser. Everyone can search and filter it, and the header shows an item count and total quantity.

### Home dashboard

The Home page shows three task counts (All tasks, Still open, Completed) and shortcuts to Tasks, Inventory, and Profile.

## Features

| Area              | Capabilities                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| Authentication    | Signs up or logs in as an Admin or Manager, with credentials stored locally and the session kept across reloads |
| Tasks             | Adds, edits, completes, and deletes tasks with a description, due date, type, and priority                      |
| Inventory         | Tracks shared items by name, quantity, and category, with search and category filters                           |
| Categories        | Lets admins add and remove inventory categories                                                                 |
| Admin panel       | Lets admins add managers, reset manager passwords, and remove manager accounts                                  |
| Profile           | Shows account details and lets you update your own password                                                     |
| Route protection  | Redirects logged-out users to login, and non-admins away from the Admin page                                    |
| Theming           | Switches light and dark mode, defaulting to the system preference and remembering your choice                   |
| Loading states    | Shows an 800ms initial loading screen, plus a spinner while lazy-loaded pages load                              |
| Back to top       | Shows a floating button after scrolling past 320px                                                              |
| Responsive design | Uses a navbar with a mobile drawer and a user menu                                                              |
| Code organization | Separates `context`, `hooks`, `services`, and `utils` layers from components                                    |
| Client-side only  | Runs with no backend, using browser `localStorage`                                                              |
| ESLint            | Lints with a flat config, React Hooks rules, and React Refresh rules                                            |

## Roles

The app supports two account roles, chosen at sign-up:

| Capability                                     | Manager | Admin |
| ---------------------------------------------- | :-----: | :---: |
| Create and manage own tasks                    |    ✓    |   ✓   |
| Browse and filter the shared inventory         |    ✓    |   ✓   |
| Add, edit, and delete inventory items          |         |   ✓   |
| Add and remove inventory categories            |         |   ✓   |
| Add managers, reset passwords, remove managers |         |   ✓   |
| Update own password                            |    ✓    |   ✓   |

Managers see the notice "Only admins can modify inventory." on the Inventory page, without the edit controls. The role is selected by the person signing up, so it is not a real access control. See [Limitations](#limitations).

## Quick start

### Requirements

- Node.js 20.19 or newer (or 22.12 or newer), as required by Vite 7
- npm
- Visual Studio Code is recommended

### Get the project

```bash
git clone https://github.com/saravanansaranraj27/task-manager-inventory.git
cd task-manager-inventory
```

### Install dependencies

```bash
npm install
```

`react-router-dom` and `uuid` are already listed in `package.json`, so no separate install is needed.

### Verify Node.js

```bash
node --version
```

### Verify the installation

```bash
npm run lint
npm run build
```

## Using the app

### Start the development server

```powershell
npm run dev
```

The app runs at:

```text
http://localhost:5173/
```

On first run there are no seeded accounts. Sign up for a new account and choose Admin or Manager.

### Workflow

1. Open the app and sign up, or log in if you already have an account
2. After signing in, you land on the Home dashboard. The app logo opens the Intro screen, which links to Tasks, Inventory, and Team access
3. Use the navigation bar to move between Home, Tasks, Profile, and Inventory, plus Admin for admins
4. Add, edit, complete, or delete tasks from the Tasks page
5. Browse the shared Inventory, or manage items and categories as an admin
6. As an admin, add managers, reset their passwords, or remove them from the Admin page
7. Update your password or log out from the Profile page
8. Use the theme button in the navigation bar to switch between dark and light mode

### Preview the production build

```powershell
npm run build
npm run preview
```

## Routes

The app uses client-side routing with React Router's `BrowserRouter`. Every route except `/login` requires a logged-in user, and `/admin` also requires the admin role.

| Route           | Purpose                                           | Access        |
| --------------- | ------------------------------------------------- | ------------- |
| `/login`        | Sign up or log in                                 | Public        |
| `/` and `/home` | Dashboard with task summary and shortcuts         | Authenticated |
| `/intro`        | Workspace overview                                | Authenticated |
| `/tasks`        | Task creation, editing, and list                  | Authenticated |
| `/inventory`    | Shared inventory browsing, and editing for admins | Authenticated |
| `/profile`      | Account details and password update               | Authenticated |
| `/admin`        | Manage manager accounts                           | Admin only    |

Logged-out users are redirected to `/login`. Logged-in managers who open `/admin` are redirected to `/home`.

## Project structure

```text
task-manager-inventory/
├── src/
│   ├── app/
│   │   ├── App.jsx                          # Providers, initial load state, router
│   │   └── routes.jsx                       # Lazy-loaded route definitions and guards
│   ├── assets/
│   │   ├── hero.png                         # Image asset
│   │   ├── react.svg                        # Default Vite template asset
│   │   └── vite.svg                         # Default Vite template asset
│   ├── components/
│   │   ├── admin/
│   │   │   ├── ManagerForm.jsx              # Add-manager form
│   │   │   └── ManagerList.jsx              # Manager list with password reset and delete
│   │   ├── inventory/
│   │   │   ├── CategoryManager.jsx          # Add and remove categories (admin)
│   │   │   ├── InventoryFilters.jsx         # Search and category filter controls
│   │   │   ├── InventoryForm.jsx            # Add-item form (admin)
│   │   │   ├── InventoryHeader.jsx          # Item count and total quantity summary
│   │   │   ├── InventoryItem.jsx            # Single inventory row with inline edit
│   │   │   └── InventoryList.jsx            # Filtered inventory list
│   │   ├── navigation/
│   │   │   └── Navbar.jsx                   # Navigation, theme toggle, user menu
│   │   ├── tasks/
│   │   │   ├── TaskForm.jsx                 # New task form
│   │   │   ├── TaskItem.jsx                 # Single task row with inline edit
│   │   │   └── TaskList.jsx                 # Task list
│   │   ├── BackToTop.jsx                    # Scroll-to-top button
│   │   ├── LoadingSpinner.jsx               # Loading indicator
│   │   └── ProtectedRoute.jsx               # Redirects unauthenticated or unauthorized users
│   ├── constants/
│   │   └── app.js                           # Roles, task options, storage keys, routes, default categories
│   ├── context/
│   │   ├── AuthContext.jsx                  # Auth state, login, signup, logout, password updates
│   │   ├── TaskContext.jsx                  # Per-user task state and CRUD
│   │   └── ThemeContext.jsx                 # Light and dark theme state
│   ├── hooks/
│   │   ├── useAdminUsers.js                 # Manager list state and actions
│   │   ├── useAuth.js                       # Access to AuthContext
│   │   ├── useInventory.js                  # Inventory and category state, filtering, CRUD
│   │   ├── useScrollVisibility.js           # Scroll threshold tracking
│   │   ├── useTasks.js                      # Access to TaskContext
│   │   └── useTheme.js                      # Access to ThemeContext
│   ├── layouts/
│   │   └── AppLayout.jsx                    # Navbar, routed page, back-to-top button
│   ├── pages/
│   │   ├── AdminPanel.jsx                   # Manager account administration
│   │   ├── Home.jsx                         # Task summary dashboard
│   │   ├── Intro.jsx                        # Workspace overview
│   │   ├── InventoryPage.jsx                # Shared inventory and categories
│   │   ├── Login.jsx                        # Sign up and log in
│   │   ├── Profile.jsx                      # Account settings
│   │   └── Tasks.jsx                        # Task management
│   ├── services/
│   │   ├── authService.js                   # Load, authenticate, register, and update users
│   │   ├── inventoryService.js              # Load and save inventory and categories
│   │   ├── storage.js                       # localStorage read, write, and remove helpers
│   │   └── taskService.js                   # Load and save a user's tasks
│   ├── styles/
│   │   ├── admin.css                        # Admin panel styles
│   │   ├── global.css                       # Global layout, component, and theme styles
│   │   └── inventory.css                    # Inventory page styles
│   ├── utils/
│   │   ├── inventoryUtils.js                # Inventory filtering and quantity totals
│   │   ├── taskUtils.js                     # Task summary and task creation helpers
│   │   └── userUtils.js                     # User initial and manager list helpers
│   └── main.jsx                             # Entry point
│
├── public/
│   ├── favicon.svg                          # Site favicon
│   └── icons.svg                            # Static SVG icons
├── index.html                               # HTML shell
├── vite.config.js                           # Vite configuration
├── eslint.config.js                         # ESLint flat configuration
├── .gitignore                               # Git exclusions for generated files
├── package.json                             # Dependencies and npm scripts
├── package-lock.json                        # Locked npm dependency versions
└── README.md                                # Project documentation
```

## Technology

- [React 19](https://react.dev/) — UI components and hooks
- [React Router 7](https://reactrouter.com/) — client-side routing, with pages code-split through `React.lazy` and `Suspense`
- [Vite 7](https://vite.dev/) — dev server and production build
- [`@vitejs/plugin-react`](https://www.npmjs.com/package/@vitejs/plugin-react) — React support for Vite
- [uuid](https://www.npmjs.com/package/uuid) — task IDs
- React Context API — auth, task, and theme state
- Browser `localStorage` — persistence, wrapped by the `services/` layer
- CSS — global, admin, and inventory stylesheets, with no CSS framework
- [ESLint](https://eslint.org/) — flat config with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`

## Development commands

### Application

```powershell
npm run dev
npm run build
npm run preview
```

### Linting

```powershell
npm run lint
```

## Data and persistence

All data lives in the browser's `localStorage`. There is no server or database.

| Key                          | Contents                                                |
| ---------------------------- | ------------------------------------------------------- |
| `users`                      | All registered accounts (username, password, role)      |
| `user`                       | The current logged-in session                           |
| `theme`                      | Your chosen theme, once you use the theme button        |
| `tasks-<username>`           | One user's task list                                    |
| `inventoryData-shared`       | Inventory items shared by every account in this browser |
| `inventoryCategories-shared` | Shared list of inventory categories                     |

Because storage is per browser, accounts, tasks, and inventory do not sync across devices and are lost if site data is cleared.

When a user changes their own password, or an admin resets the password of the account that is currently logged in, the stored session object also receives the new password.

Deleting a category keeps its items and clears their category. Category names are saved in lowercase.

## Deployment

The project is a static build with no deployment script or base path configured.

### Create a production build

```powershell
npm run build
```

The built files are located in the `dist/` directory and can be deployed to any static hosting service.

### Hosting requirements

The app uses `BrowserRouter`, so the host must serve `index.html` for every path. Without that, refreshing a page such as `/tasks` returns a 404. The app is configured for the root path, so to serve it from a subfolder, set `base` in `vite.config.js` and a matching `basename` on `BrowserRouter`.

### Preview the production build

```powershell
npm run preview
```

## Linting

The project uses ESLint with a flat configuration covering `.js` and `.jsx` files, with the React Hooks and React Refresh plugins. The `dist` folder is ignored.

```powershell
npm run lint
```

## Troubleshooting

### Node.js version error or build failure

Vite 7 needs Node.js 20.19 or newer (or 22.12 or newer). Check your version:

```powershell
node --version
```

Install a supported version, then run `npm install` again.

### `Cannot find native binding` or other install errors after copying the project

This happens when `node_modules` was installed on a different operating system. Delete `node_modules` and reinstall:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Port 5173 is already in use

Stop the other process, or start the server on another port:

```powershell
npm run dev -- --port 5174
```

### `Invalid credentials` when logging in

Usernames and passwords are case-sensitive and stored per browser. Accounts created in another browser or on another device do not exist here.

### `User already exists` when signing up

That username is already registered in this browser. Log in instead, or pick another username.

### I forgot a password

There is no password recovery. An admin can reset a manager's password from the Admin page. Otherwise, open your browser's developer tools and clear the site's `localStorage`, which also removes all accounts, tasks, and inventory.

### Data disappeared

Data is stored in the browser and is removed when site data is cleared. It is also different in each browser and profile.

### A page returns 404 after refresh on a host

Configure the host to serve `index.html` for all paths. See [Deployment](#deployment).

### ESLint errors

Run:

```powershell
npm run lint
```

## Complete command reference

```powershell
git clone https://github.com/saravanansaranraj27/task-manager-inventory.git
npm install
node --version
npm run dev
npm run dev -- --port 5174
npm run build
npm run preview
npm run lint
```

## Limitations

- Passwords are stored in plain text in `localStorage`. This is a demo-grade auth flow, not production-ready security.
- The role is chosen by the person signing up, so anyone can create an Admin account. Route and button restrictions are enforced only in the browser.
- There is no backend, remote sync, or real authentication provider.
- Inventory is shared across all accounts in the same browser rather than scoped to a team or organization.
- Data is lost if browser storage is cleared, and it is not available from other browsers or devices.
- There is no password recovery, and admins can reset only manager passwords.
- There is no catch-all route, so an unknown URL does not redirect to a page and is likely to render blank.
- No automated tests are included in the project.

## Contributing

Bug reports, improvements, and pull requests are welcome.

Keep changes focused and verify them before opening a pull request:

```powershell
npm run lint
npm run build
```

## License

This project is licensed under the MIT License.
