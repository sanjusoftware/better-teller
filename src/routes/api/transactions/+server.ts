import { db } from "$lib/server/db";
import { transactions } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";

export async function GET() {
  const allTransactions = await db.select().from(transactions);
  return json(allTransactions);
}

export async function POST({ request }) {
  const body = await request.json();
  // TODO: Add validation for the request body
  // TODO: Consider how to handle balance updates or other side effects of transactions
  const newTransaction = await db.insert(transactions).values(body).returning();
  return json(newTransaction[0], { status: 201 });
}
