import { db } from "$lib/server/db";
import { transactions } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function GET({ params }) {
  const transactionId = params.transactionId;
  const transaction = await db.select().from(transactions).where(eq(transactions.id, transactionId));
  if (transaction.length === 0) {
    return json({ message: "Transaction not found" }, { status: 404 });
  }
  return json(transaction[0]);
}

export async function PUT({ params, request }) {
  const transactionId = params.transactionId;
  const body = await request.json();
  // TODO: Add validation for the request body
  // TODO: Consider how to handle balance updates or other side effects of transactions
  const updatedTransaction = await db.update(transactions).set(body).where(eq(transactions.id, transactionId)).returning();
  if (updatedTransaction.length === 0) {
    return json({ message: "Transaction not found" }, { status: 404 });
  }
  return json(updatedTransaction[0]);
}

export async function DELETE({ params }) {
  const transactionId = params.transactionId;
  // TODO: Consider how to handle balance updates or other side effects of transactions
  const deletedTransaction = await db.delete(transactions).where(eq(transactions.id, transactionId)).returning();
  if (deletedTransaction.length === 0) {
    return json({ message: "Transaction not found" }, { status: 404 });
  }
  return json({ message: "Transaction deleted successfully" });
}
