# Community Library Management System

A React-based Community Library Management System for BIWA2110 Assignment 2.

## Features

- Dashboard showing current availability
- Low-stock highlighting when quantity is below 2
- Add, update and delete books
- Borrow and return transactions
- Transaction history
- User login using membership ID
- Add, update and delete users
- React `useState` and `useEffect`
- React Router
- Local storage persistence
- Separate React components and pages
- GitHub Pages deployment configuration

## Project structure

```text
src/
├── components/
│   ├── BookForm.jsx
│   ├── BookTable.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── TransactionForm.jsx
│   ├── TransactionTable.jsx
│   └── UserForm.jsx
├── pages/
│   ├── Books.jsx
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Users.jsx
├── utils/
│   └── storage.js
├── App.jsx
├── index.css
└── main.jsx
```

## Run locally

1. Open this project in VS Code or another code editor.
2. Open a terminal in the project folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local Vite address shown in the terminal.

## Important GitHub Pages note

The project is configured for the repository:

`Community-Library-System`

The Vite `base` and React Router `basename` already use:

`/Community-Library-System/`

If your GitHub repository has a different name, update both values.

## GitHub Actions

The included workflow uses `npm ci`, so after running `npm install` locally, upload the generated `package-lock.json` to the GitHub repository before using the deployment workflow.

## Test login

Use:

- Membership ID: `ADM001`

## Local storage

The application stores books, users and transactions in the browser's local storage.