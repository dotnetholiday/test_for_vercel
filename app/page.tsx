'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string | null;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // React 18-safe effect — fetch function declared INSIDE effect
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []); // runs only once on mount

  const createUser = async () => {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    // Refresh the list
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);

    // Reset form
    setName('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Next.js + Prisma Demo
        </h1>

        {/* Input Form */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={createUser}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition-all"
          >
            Add User
          </button>
        </div>

        <hr className="my-6" />

        {/* User List */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>

        <ul className="space-y-3">
          {users.length === 0 && (
            <p className="text-gray-500 text-sm">No users found.</p>
          )}

          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-200"
            >
              <span className="font-medium text-gray-900">
                {user.name || 'Unnamed'}
              </span>
              <span className="text-gray-600 text-sm">{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
