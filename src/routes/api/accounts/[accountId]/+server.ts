import { db } from "$lib/server/db";
import { accounts } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function GET({ params }) {
  const accountId = params.accountId;
  const account = await db.select().from(accounts).where(eq(accounts.id, accountId));
  if (account.length === 0) {
    return json({ message: "Account not found" }, { status: 404 });
  }
  return json(account[0]);
}

export async function PUT({ params, request }) {
  const accountId = params.accountId;
  const body = await request.json();
  // TODO: Add validation for the request body
  const updatedAccount = await db.update(accounts).set(body).where(eq(accounts.id, accountId)).returning();
  if (updatedAccount.length === 0) {
    return json({ message: "Account not found" }, { status: 404 });
  }
  return json(updatedAccount[0]);
}

export async function DELETE({ params }) {
  const accountId = params.accountId;
  const deletedAccount = await db.delete(accounts).where(eq(accounts.id, accountId)).returning();
  if (deletedAccount.length === 0) {
    return json({ message: "Account not found" }, { status: 404 });
  }
  return json({ message: "Account deleted successfully" });
}
