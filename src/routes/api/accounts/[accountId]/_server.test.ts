import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, PUT, DELETE } from './+server';
import { json } from '@sveltejs/kit';

// Mock the database
vi.mock('$lib/server/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    returning: vi.fn(),
    delete: vi.fn().mockReturnThis(), // Add delete mock
  },
}));

// Mock the schema and eq operator
vi.mock('$lib/server/db/schema', () => ({
  accounts: { id: 'mockedAccountIdField' }, // Mocking a field for eq
}));
vi.mock('drizzle-orm', () => ({
  eq: vi.fn((field, value) => `mocked_eq(${field}, ${value})`), // Mock eq to return a string representation
}));


describe('/api/accounts/[accountId]', () => {
  const mockAccountId = 'test-id-123';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('GET', () => {
    it('should return an account and 200 status if found', async () => {
      const mockAccount = { id: mockAccountId, name: 'Specific Account' };
      const { db } = await import('$lib/server/db');
      (db.where as vi.Mock).mockResolvedValue([mockAccount]); // select().from().where() returns the array

      const params = { accountId: mockAccountId };
      const response = await GET({ params } as any); // Cast to any for simplicity with params
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual(mockAccount);
      const { accounts } = await import('$lib/server/db/schema');
      const { eq } = await import('drizzle-orm');
      expect(db.select).toHaveBeenCalled();
      expect(db.from).toHaveBeenCalledWith(accounts);
      expect(db.where).toHaveBeenCalledWith(`mocked_eq(${accounts.id}, ${mockAccountId})`);
    });

    it('should return 404 if account not found', async () => {
      const { db } = await import('$lib/server/db');
      (db.where as vi.Mock).mockResolvedValue([]); // Simulate not found

      const params = { accountId: 'non-existent-id' };
      const response = await GET({ params } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(404);
      expect(responseBody).toEqual({ message: 'Account not found' });
    });
  });

  describe('PUT', () => {
    it('should update an account and return 200 status', async () => {
      const updateData = { name: 'Updated Name' };
      const updatedAccount = { id: mockAccountId, ...updateData };
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([updatedAccount]);

      const mockRequest = { json: async () => updateData } as Request;
      const params = { accountId: mockAccountId };
      const response = await PUT({ params, request: mockRequest } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual(updatedAccount);
      const { accounts } = await import('$lib/server/db/schema');
      const { eq } = await import('drizzle-orm');
      expect(db.update).toHaveBeenCalledWith(accounts);
      expect(db.set).toHaveBeenCalledWith(updateData);
      expect(db.where).toHaveBeenCalledWith(`mocked_eq(${accounts.id}, ${mockAccountId})`);
      expect(db.returning).toHaveBeenCalled();
    });

    it('should return 404 if account to update is not found', async () => {
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([]); // Simulate not found for update

      const mockRequest = { json: async () => ({ name: 'test' }) } as Request;
      const params = { accountId: 'non-existent-id' };
      const response = await PUT({ params, request: mockRequest } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(404);
      expect(responseBody).toEqual({ message: 'Account not found' });
    });
  });

  describe('DELETE', () => {
    it('should delete an account and return 200 status', async () => {
      const deletedAccount = { id: mockAccountId, name: 'Deleted Account' };
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([deletedAccount]); // delete().where().returning()

      const params = { accountId: mockAccountId };
      const response = await DELETE({ params } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual({ message: 'Account deleted successfully' });
      const { accounts } = await import('$lib/server/db/schema');
      const { eq } = await import('drizzle-orm');
      expect(db.delete).toHaveBeenCalledWith(accounts);
      expect(db.where).toHaveBeenCalledWith(`mocked_eq(${accounts.id}, ${mockAccountId})`);
      expect(db.returning).toHaveBeenCalled();
    });

    it('should return 404 if account to delete is not found', async () => {
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([]); // Simulate not found for delete

      const params = { accountId: 'non-existent-id' };
      const response = await DELETE({ params } as any);
      const responseBody = await response.json();

      expect(response.status).toBe(404);
      expect(responseBody).toEqual({ message: 'Account not found' });
    });
  });
});
