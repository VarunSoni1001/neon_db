// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

const dbUrl = process.env.NEXT_PUBLIC_DB_URL as string;

export interface User {
  id?: number;
  name: string;
  email: string;
}

export async function addUserInDB(name: string, email: string) {
  const sql = neon(dbUrl);
  const data = await sql`
    INSERT INTO users (
      name,
      email
      )
    VALUES (
        ${name},
        ${email}
        )
  `;
  return data;
}

export async function getUsers() {
  const sql = neon(dbUrl);
  const data = await sql`
    SELECT * FROM users;
  `;
  return data as User[] || [];
}
