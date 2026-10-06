export const STORAGE_KEYS = {
  books: "books",
  users: "users",
  transactions: "transactions"
};

export const seedBooks = [
  {
    id: 1,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Fiction",
    isbn: "9780385474542",
    quantity: 3
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    isbn: "9780132350884",
    quantity: 1
  }
];

export const seedUsers = [
  {
    id: 1,
    name: "Admin",
    membershipId: "ADM001",
    role: "Admin"
  }
];

export function loadData(key, fallback = []) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function makeId(items) {
  return items.length ? Math.max(...items.map((item) => item.id || 0)) + 1 : 1;
}