import type { PageServerLoad } from './$types';
import Transactions from '$lib/data/transactions.json';

export const load: PageServerLoad = ({ url }) => {
    let accountNumber = url.searchParams.get('accountnumber')
    return {
        acountNumber: accountNumber, 
        transactions: Transactions.filter((t) => t.from_account === accountNumber || t.to_account === accountNumber)
    }
};