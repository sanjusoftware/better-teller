import { db } from "$lib/server/db";
import { accounts } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";

export async function GET() {
  const allAccounts = await db.select().from(accounts);
  return json(allAccounts);
}

export async function POST({ request }) {
  const body = await request.json();
  // TODO: Add validation for the request body
  const newAccount = await db.insert(accounts).values(body).returning();
  return json(newAccount[0], { status: 201 });
}
