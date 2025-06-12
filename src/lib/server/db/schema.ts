import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { generateId } from "../../utils/strings";


const timestamp = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
};

const clients = sqliteTable("clients", {
  cif: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateId(10)),
  name: text("name", { length: 255 }).notNull(),
  avatar: text("avatar", { length: 255 }),
  email: text("email", { length: 255 }),
  country: text("country", { length: 255 }),
  status: text("status", { length: 255 }).notNull(),
  type: text("type", { length: 255 }).notNull(),
  phone: text("phone", { length: 255 }).notNull(),
  egn: text("egn", { length: 255 }).notNull(),
  id_card_front_image: text("body").notNull(),
  id_card_back_image: text("body").notNull(),
  ...timestamp,
});

const accounts = sqliteTable("accounts", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateId(10)),
  accountNumber: text("account_number").notNull().unique(),
  type: text("type").notNull(),
  balance: real("balance").notNull(),
  currency: text("currency").notNull(),
  clientId: text("client_id").notNull().references(() => clients.cif),
  ...timestamp,
});

const transactions = sqliteTable("transactions", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateId(10)),
  type: text("type").notNull(),
  amount: real("amount").notNull(),
  currency: text("currency").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  sourceAccountId: text("source_account_id").references(() => accounts.id),
  destinationAccountId: text("destination_account_id").references(() => accounts.id),
  description: text("description"),
  status: text("status").notNull(),
  ...timestamp,
});

export { clients, accounts, transactions };