import type { PageServerLoad } from './$types';
import Accounts from "$lib/data/accounts.json";
import Cards from "$lib/data/cards.json";
import Loans from "$lib/data/loans.json";

export const load = (async ({ params, url }) => {    
    return {
        open: url.searchParams.get('open'),
        accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        loans: Loans.filter((loan) => loan.customerId === Number(params.cif))
    };
}) satisfies PageServerLoad;

export const actions = {    
    sendOTP: async ({ request }) => {
        console.log('Sending OPT...');
        const data = await request.formData();
        const phone = data.get('phonenumber');

        // Simulate sending OTP
        // In a real-world scenario, you would perform sendOTP operation here, like calling an OTP API
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for the scan operation
        console.log('OTP sent successfully!');       

        return {
            success: true,
            otp: Math.floor(100000 + Math.random() * 900000) // Generate a random 6-digit number
        };
    }
};