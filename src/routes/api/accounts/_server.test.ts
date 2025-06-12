import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from './+server'; // Adjust if your actual +server.ts is different
import { json } from '@sveltejs/kit';

// Mock the database
vi.mock('$lib/server/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn(),
  },
}));

// Mock the schema
vi.mock('$lib/server/db/schema', () => ({
  accounts: {}, // Simple mock, adjust if schema details are needed for tests
}));

describe('/api/accounts', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  describe('GET', () => {
    it('should return a list of accounts and a 200 status code', async () => {
      const mockAccounts = [{ id: '1', name: 'Test Account' }];
      const { db } = await import('$lib/server/db');
      // Corrected mock: select().from() resolves to the data
      (db.from as vi.Mock).mockResolvedValue(mockAccounts);

      const response = await GET();
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody).toEqual(mockAccounts);
      expect(db.select).toHaveBeenCalled();
      const { accounts } = await import('$lib/server/db/schema');
      expect(db.from).toHaveBeenCalledWith(accounts);
    });
  });

  describe('POST', () => {
    it('should create a new account and return 201 status code', async () => {
      const newAccountData = { accountNumber: '123', type: 'checking', balance: 100, currency: 'USD', clientId: 'client1' };
      const createdAccount = { id: 'newId', ...newAccountData };
      const { db } = await import('$lib/server/db');
      (db.returning as vi.Mock).mockResolvedValue([createdAccount]);

      const mockRequest = {
        json: async () => newAccountData,
      } as unknown as Request;

      const response = await POST({ request: mockRequest });
      const responseBody = await response.json();

      expect(response.status).toBe(201);
      expect(responseBody).toEqual(createdAccount);
      const { accounts } = await import('$lib/server/db/schema');
      expect(db.insert).toHaveBeenCalledWith(accounts);
      expect(db.values).toHaveBeenCalledWith(newAccountData);
      expect(db.returning).toHaveBeenCalled();
    });

    // TODO: Add test for POST with invalid data (e.g., missing required fields)
    // This will require more specific mocking of how Drizzle handles errors or adding validation in the endpoint.
  });
});
