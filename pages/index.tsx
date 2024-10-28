import Image from "next/image";
import localFont from "next/font/local";
import { addUserInDB, getUsers, User } from "@/utils/actions";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
  });

  const onInputChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getAllUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center gap-7`}
    >
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={onInputChange}
            className="border border-gray-300 rounded-md"
          />
        </label>
        <label className="block">
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onInputChange}
            className="border border-gray-300 rounded-md"
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            addUserInDB(user.name, user.email);
            setUser({ name: "", email: "" });
          }}
        >
          Add user
        </button>
      </form>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => getAllUsers()}
      >
        Get users
      </button>

      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            {user.name} - {user.email}
          </div>
        ))}
    </div>
  );
}
