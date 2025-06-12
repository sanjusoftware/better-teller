import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, PUT, DELETE } from './+server';
import { json } from '@sveltejs/kit';

// Mock the database
vi.mock('$lib/server/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(), // For GET single, PUT, DELETE
    update: vi.fn().mockReturnThis(), // For PUT
    set: vi.fn().mockReturnThis(),    // For PUT
    returning: vi.fn(),               // For PUT, DELETE
    delete: vi.fn().mockReturnThis(), // For DELETE
  },
}));

// Mock the schema and eq operator
vi.mock('$lib/server/db/schema', () => ({
  transactions: { id: 'mockedTransactionIdField' }, // Mocking a field for eq
}));
vi.mock('drizzle-orm', () => ({
  eq: vi.fn((field, value) => `mocked_eq_trans(${field}, ${value})`), // Mock eq for transactions
}));


describe('/api/transactions/[transactionId]', () => {
  const mockTransactionId = 'trans-id-456';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('GET', () => {
    it('should return a transaction and 200 status if found', async () => {
      const mockTransaction = { id: mockTransactionId, amount: 100, type: 'deposit' };
      const { db } = await import('$lib/server/db');
      (db.where as vi.Mock).mockResolvedValue([mockTransaction]); // select().from().where() returns array

      const params = { transactionId: mockTransactionId };
      const response = await GET({ params } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual(mockTransaction);
      const { transactions } = await import('$lib/server/db/schema');
      expect(db.select).toHaveBeenCalled();
      expect(db.from).toHaveBeenCalledWith(transactions);
      expect(db.where).toHaveBeenCalledWith(`mocked_eq_trans(${transactions.id}, ${mockTransactionId})`);
    });

    it('should return 404 if transaction not found', async () => {
      const { db } = await import('$lib/server/db');
      (db.where as vi.Mock).mockResolvedValue([]); // Simulate not found

      const params = { transactionId: 'non-existent-id' };
      const response = await GET({ params } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(404);
      expect(responseBody).toEqual({ message: 'Transaction not found' });
    });
  });

  describe('PUT', () => {
    it('should update a transaction and return 200 status', async () => {
      const updateData = { amount: 150, status: 'completed' };
      const updatedTransaction = { id: mockTransactionId, ...updateData };
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([updatedTransaction]);

      const mockRequest = { json: async () => updateData } as Request;
      const params = { transactionId: mockTransactionId };
      const response = await PUT({ params, request: mockRequest } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual(updatedTransaction);
      const { transactions } = await import('$lib/server/db/schema');
      expect(db.update).toHaveBeenCalledWith(transactions);
      expect(db.set).toHaveBeenCalledWith(updateData);
      expect(db.where).toHaveBeenCalledWith(`mocked_eq_trans(${transactions.id}, ${mockTransactionId})`);
      expect(db.returning).toHaveBeenCalled();
    });

    it('should return 404 if transaction to update is not found', async () => {
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([]); // Simulate not found

      const mockRequest = { json: async () => ({ amount: 100 }) } as Request;
      const params = { transactionId: 'non-existent-id' };
      const response = await PUT({ params, request: mockRequest } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(404);
      expect(responseBody).toEqual({ message: 'Transaction not found' });
    });
  });

  describe('DELETE', () => {
    it('should delete a transaction and return 200 status', async () => {
      const deletedTransaction = { id: mockTransactionId, amount: 100 };
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([deletedTransaction]);

      const params = { transactionId: mockTransactionId };
      const response = await DELETE({ params } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual({ message: 'Transaction deleted successfully' });
      const { transactions } = await import('$lib/server/db/schema');
      expect(db.delete).toHaveBeenCalledWith(transactions);
      expect(db.where).toHaveBeenCalledWith(`mocked_eq_trans(${transactions.id}, ${mockTransactionId})`);
      expect(db.returning).toHaveBeenCalled();
    });

    it('should return 404 if transaction to delete is not found', async () => {
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([]); // Simulate not found

      const params = { transactionId: 'non-existent-id' };
      const response = await DELETE({ params } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(404);
      expect(responseBody).toEqual({ message: 'Transaction not found' });
    });
  });
});
