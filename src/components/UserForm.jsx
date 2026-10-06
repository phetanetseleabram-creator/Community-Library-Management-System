import { useEffect, useState } from "react";

const emptyUser = {
  name: "",
  membershipId: "",
  role: "Member"
};

export default function UserForm({ editingUser, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyUser);

  useEffect(() => {
    setForm(editingUser || emptyUser);
  }, [editingUser]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.membershipId) {
      alert("Please enter the user's name and membership ID.");
      return;
    }

    onSubmit(form);
    setForm(emptyUser);
  }

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <h2>{editingUser ? "Update User" : "Add User"}</h2>

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>

      <label>
        Membership ID
        <input
          name="membershipId"
          value={form.membershipId}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Role
        <select name="role" value={form.role} onChange={handleChange}>
          <option>Member</option>
          <option>Librarian</option>
          <option>Admin</option>
        </select>
      </label>

      <div className="button-row">
        <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
        {editingUser && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}