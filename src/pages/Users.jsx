import { useEffect, useState } from "react";
import UserForm from "../components/UserForm.jsx";
import {
  loadData,
  saveData,
  STORAGE_KEYS,
  seedUsers,
  makeId
} from "../utils/storage.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [membershipId, setMembershipId] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const savedUsers = loadData(STORAGE_KEYS.users, seedUsers);
    setUsers(savedUsers);
    saveData(STORAGE_KEYS.users, savedUsers);
  }, []);

  function handleLogin(event) {
    event.preventDefault();

    const user = users.find(
      (item) => item.membershipId.toLowerCase() === membershipId.toLowerCase()
    );

    if (!user) {
      alert("Membership ID not found.");
      return;
    }

    setLoggedInUser(user);
  }

  function handleUserSubmit(userData) {
    let updatedUsers;

    if (editingUser) {
      updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...userData, id: editingUser.id } : user
      );
    } else {
      updatedUsers = [...users, { ...userData, id: makeId(users) }];
    }

    setUsers(updatedUsers);
    saveData(STORAGE_KEYS.users, updatedUsers);
    setEditingUser(null);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;

    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    saveData(STORAGE_KEYS.users, updatedUsers);

    if (loggedInUser?.id === id) {
      setLoggedInUser(null);
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <h2>User Management</h2>
          <p>Login and manage library user accounts.</p>
        </div>
      </div>

      <form className="card login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>
          Membership ID
          <input
            value={membershipId}
            onChange={(e) => setMembershipId(e.target.value)}
            placeholder="Try ADM001"
            required
          />
        </label>
        <button type="submit">Login</button>

        {loggedInUser && (
          <p className="success">
            Logged in as {loggedInUser.name} ({loggedInUser.role})
          </p>
        )}
      </form>

      <UserForm
        editingUser={editingUser}
        onSubmit={handleUserSubmit}
        onCancel={() => setEditingUser(null)}
      />

      <div className="card">
        <h2>User Accounts</h2>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Membership ID</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.membershipId}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => setEditingUser(user)}>Edit</button>
                    <button
                      className="danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}