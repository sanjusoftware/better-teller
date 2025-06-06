import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from './+server';
import { json } from '@sveltejs/kit';

// Mock the database
vi.mock('$lib/server/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockResolvedValue([]), // Default for GET all
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn(),
  },
}));

// Mock the schema
vi.mock('$lib/server/db/schema', () => ({
  transactions: { name: 'mockedTransactionsSchema' }, // Simple mock
}));

describe('/api/transactions', () => {
  beforeEach(() => {
    vi.resetAllMocks(); // Use resetAllMocks to also clear mock implementation details
  });

  describe('GET', () => {
    it('should return a list of transactions and a 200 status code', async () => {
      const mockTransactions = [{ id: 't1', amount: 100 }, { id: 't2', amount: 200 }];
      const { db } = await import('$lib/server/db');
      // GET all transactions: db.select().from(transactions)
      (db.from as vi.Mock).mockResolvedValue(mockTransactions);

      const response = await GET();
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual(mockTransactions);
      expect(db.select).toHaveBeenCalled();
      const { transactions } = await import('$lib/server/db/schema');
      expect(db.from).toHaveBeenCalledWith(transactions);
    });
  });

  describe('POST', () => {
    it('should create a new transaction and return 201 status code', async () => {
      const newTransactionData = { type: 'deposit', amount: 500, currency: 'USD', status: 'completed', accountId: 'acc1' };
      const createdTransaction = { id: 'newTransId', ...newTransactionData };
      const { db } = await import('$lib/server/db');
      // POST: db.insert(transactions).values(data).returning()
      (db.returning as vi.Mock).mockResolvedValue([createdTransaction]);

      const mockRequest = {
        json: async () => newTransactionData,
      } as unknown as Request;

      const response = await POST({ request: mockRequest });
      const responseBody = await response.json();

      expect(response.status).toBe(201);
      expect(responseBody).toEqual(createdTransaction);
      const { transactions } = await import('$lib/server/db/schema');
      expect(db.insert).toHaveBeenCalledWith(transactions);
      expect(db.values).toHaveBeenCalledWith(newTransactionData);
      expect(db.returning).toHaveBeenCalled();
    });

    // TODO: Add test for POST with invalid data
    // TODO: Add test for side effects (e.g. balance updates) if/when implemented
  });
});
