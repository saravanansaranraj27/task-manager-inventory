# Task Manager & Inventory

> A role-based React workspace for managing tasks and shared team inventory, with authentication, an admin panel, and light/dark theming — all running on browser-local storage.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](#license)

Task Manager & Inventory is a single-page React application for small teams that need to track personal tasks and a shared pool of equipment. Managers can plan and complete their own tasks, while admins can additionally manage inventory, categories, and manager accounts — all without a backend.

## Contents

- [Features](#features)
- [Roles](#roles)
- [Quick start](#quick-start)
- [Using the app](#using-the-app)
- [Routes](#routes)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Data & persistence](#data--persistence)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Features

| Area           | Capabilities                                                                                                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication | Sign up or log in as an Admin or Manager; per-account credentials stored locally                                                                                                                               |
| Tasks          | Add, edit, complete, and delete tasks with a description, due date, type, and priority level                                                                                                                   |
| Inventory      | Track shared items by name, quantity, and category; search and filter across the whole team's stock                                                                                                            |
| Categories     | Admins can create and remove inventory categories on the fly                                                                                                                                                   |
| Admin panel    | Admins can add, edit, and remove manager accounts, including password resets                                                                                                                                   |
| Profile        | View account details and update your own password                                                                                                                                                              |
| Experience     | Protected routes based on login state and role, responsive layout, light/dark theme switching (defaults to system preference), lazy-loaded pages with loading states, and a back-to-top button on longer pages |

## Roles

The app supports two account roles, chosen at sign-up:

- **Manager** — can create and manage their own tasks, and browse (but not edit) the shared inventory.
- **Admin** — has all manager capabilities, plus the ability to add/edit/delete inventory items and categories, and manage manager accounts from the Admin panel.

## Quick start

### Requirements

- Node.js 18 or newer
- npm

### Run locally

```sh
npm install
npm install react-router-dom
npm run dev
```

Open the local URL printed by Vite in your browser. Vite usually serves the app at [http://localhost:5173](http://localhost:5173).

On first run, sign up for a new account (choose Admin or Manager) — there are no seeded accounts by default.

## Using the app

1. Open the app and sign up, or log in if you already have an account.
2. Land on the Intro screen, which links to Tasks, Inventory, and Team access (Admin).
3. Use the navigation bar to move between Home, Tasks, Profile, and Inventory (and Admin, if you're an admin).
4. Add, edit, complete, or delete tasks from the Tasks page.
5. Browse or (as an admin) manage the shared Inventory, including categories.
6. Update your password or log out from the Profile page.
7. Use the theme button in the navigation bar to switch between dark and light mode.

## Routes

The app uses client-side routing via React Router. Most routes require an authenticated session; `/admin` additionally requires the admin role.

| Route        | Purpose                                            | Access        |
| ------------ | -------------------------------------------------- | ------------- |
| `/login`     | Sign up or log in                                  | Public        |
| `/intro`     | Introductory workspace overview                    | Authenticated |
| `/` `/home`  | Dashboard with task summary and shortcuts          | Authenticated |
| `/tasks`     | Task creation, editing, and list                   | Authenticated |
| `/inventory` | Shared inventory browsing (and editing for admins) | Authenticated |
| `/profile`   | Account details and password update                | Authenticated |
| `/admin`     | Manage manager accounts                            | Admin only    |

## Project structure

```text
src/
	main.jsx                     React application entry point
	app/
		App.jsx                     Providers (auth/tasks/theme), initial load state, app shell
		routes.jsx                  Lazy-loaded route definitions and guards
	layouts/
		AppLayout.jsx               Shared layout: navbar + routed page + back-to-top button
	assets/
		hero.png, react.svg, vite.svg  Static images used across the UI
	components/
		BackToTop.jsx               Scroll-to-top button shown past a scroll threshold
		LoadingSpinner.jsx          Reusable loading indicator (route transitions, initial load)
		ProtectedRoute.jsx          Redirects unauthenticated/unauthorized users
		admin/
			ManagerForm.jsx            Add-manager form
			ManagerList.jsx            Manager list with inline edit/delete/password reset
		inventory/
			CategoryManager.jsx        Add/remove inventory categories (admin)
			InventoryFilters.jsx       Search + category filter controls
			InventoryForm.jsx          Add-item form (admin)
			InventoryHeader.jsx        Item count / total quantity summary header
			InventoryItem.jsx          Single inventory row with inline edit
			InventoryList.jsx          Renders the filtered inventory list
		navigation/
			Navbar.jsx                 Navigation, theme toggle, user menu
		tasks/
			TaskForm.jsx               New task input form
			TaskItem.jsx               Single task row with inline edit
			TaskList.jsx               Renders the list of tasks
	constants/
		app.js                      App name, roles, task types/priorities, storage keys, routes, default categories
	context/
		AuthContext.jsx             Auth state, login/signup/logout, password updates
		TaskContext.jsx             Per-user task state and CRUD operations
		ThemeContext.jsx            Light/dark theme state
	hooks/
		useAuth.js                  Convenience hook for AuthContext
		useAdminUsers.js            Manager list state + add/edit/delete/reset logic for AdminPanel
		useInventory.js             Inventory/category state, filtering, and CRUD logic
		useScrollVisibility.js      Tracks scroll position past a threshold (used by BackToTop)
		useTasks.js                 Convenience hook for TaskContext
		useTheme.js                 Convenience hook for ThemeContext
	pages/
		Home.jsx                    Task summary dashboard
		Intro.jsx                   Landing/overview page
		Login.jsx                   Sign up / log in form
		Tasks.jsx                   Task management page
		Profile.jsx                 Account settings page
		InventoryPage.jsx           Shared inventory and category management
		AdminPanel.jsx              Manager account administration
	services/
		authService.js              localStorage-backed auth: load/authenticate/register/update users
		inventoryService.js         localStorage-backed load/save for inventory items and categories
		taskService.js              localStorage-backed load/save for a user's tasks
		storage.js                  Low-level JSON localStorage read/write helpers with error handling
	styles/
		global.css                  Global layout, component, and theme styles
		admin.css                   Admin panel styling
		inventory.css               Inventory page styling
	utils/
		inventoryUtils.js           Inventory filtering and quantity-total helpers
		taskUtils.js                Task summary and task-creation helpers
		userUtils.js                User initial and manager-list helpers
public/
	favicon.svg, icons.svg       Static icons served as-is
```

## Technology

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- [React Router 7](https://reactrouter.com/), with pages code-split via `React.lazy`/`Suspense`
- [uuid](https://www.npmjs.com/package/uuid) for task IDs
- React Context API for auth, tasks, and theme state
- A small `services/` + `utils/` layer separating `localStorage` access and pure helpers from components and hooks
- Browser `localStorage`

## Development commands

```sh
npm run dev       # Start the Vite development server
npm run build      # Create a production build
npm run lint       # Run ESLint
npm run preview    # Preview the production build
```

## Data & persistence

All data lives in the browser's `localStorage` — there is no server or database.

- `users` — all registered accounts (username, password, role)
- `user` — the currently logged-in session
- `tasks-<username>` — each user's own task list
- `inventoryData-shared` — the inventory shared across every user of the browser
- `inventoryCategories-shared` — the shared list of inventory categories

Because storage is per-browser, accounts, tasks, and inventory do not sync across devices and will reset if site data is cleared.

## Limitations

- Passwords are stored in plain text in `localStorage`; this is a demo-grade auth flow, not production-ready security.
- There is no backend, remote sync, or real authentication provider.
- Inventory is shared across all accounts in the same browser rather than scoped to a team or organization.
- Data is lost if browser storage is cleared, and is not available from other browsers or devices.

## Contributing

Bug reports, improvements, and pull requests are welcome. Keep changes focused and verify them with the available lint and build commands.

## License

This project is licensed under the MIT License.
