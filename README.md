# Task Manager

Task Manager is a modern web application for managing tasks and inventory with role-based access control. Built with React and Vite, it supports multiple user roles (admin, manager, user), authentication, and persistent data storage in the browser.

## Features

- **User Authentication**: Sign up, log in, and log out with local storage persistence.
- **Role-Based Access**:
  - **Admin**: Manage all users, add/remove managers, and control inventory categories/items.
  - **Manager**: Manage their own tasks and view inventory.
  - **User**: Manage personal tasks.
- **Task Management**:
  - Add, edit, delete, and complete tasks.
  - Set due dates, priorities, and task types.
  - Tasks are saved per user in local storage.
- **Inventory Management** (Admin only):
  - Add, edit, delete inventory items and categories.
  - Filter and search inventory.
- **Theming**: Light and dark mode toggle.
- **Responsive UI**: Clean, modern interface for desktop and mobile.

## Technologies Used

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [UUID](https://www.npmjs.com/package/uuid) for unique IDs
- Local Storage for persistence
- Custom React Context for state management

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Sign up** as a new user. The first user can be an admin (edit in code or local storage for demo).
- **Admins** can add managers and manage inventory.
- **Managers/Users** can manage their own tasks.
- All data is stored in your browser (no backend required).

## Project Structure

- `src/components/` – Reusable UI components (Navbar, TaskForm, TaskList, etc.)
- `src/context/` – React Contexts for Auth, Tasks, and Theme
- `src/pages/` – Main app pages (Home, Tasks, AdminPanel, InventoryPage, Profile)
- `src/hooks/` – Custom hooks
- `src/styles/` – CSS files

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
