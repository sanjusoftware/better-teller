import type { PageServerLoad } from './$types';
import Accounts from "$lib/data/accounts.json";
import Cards from "$lib/data/cards.json";
import Loans from "$lib/data/loans.json";
import { setFlash } from 'sveltekit-flash-message/server';
import { fail } from '@sveltejs/kit';

export const load = (async ({ params, url }) => {
    return {
        open: url.searchParams.get('open'),
        accounts: Accounts.filter((account) => account.customerId === Number(params.cif)),
        cards: Cards.filter((card) => card.customerId === Number(params.cif)),
        loans: Loans.filter((loan) => loan.customerId === Number(params.cif))
    };
}) satisfies PageServerLoad;

export const actions = {
    sendOTP: async ({ request, cookies }) => {
        console.log('Sending OPT...');
        const data = await request.formData();
        const phone = data.get('phonenumber');
        console.log('Phone number:', phone);

        // Simulate sending OTP
        // In a real-world scenario, you would perform sendOTP operation here, like calling an OTP API
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for the scan operation
        let otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
        console.log('OTP sent successfully!', otp);
        setFlash({ type: 'success', message: 'OTP sent successfully!' }, cookies);

        return {
            success: true,
            otp: otp 
        };
    },
    validateOTP: async ({ request, cookies }) => {
        console.log('validating OPT...');
        const data = await request.formData();
        const otpSent = data.get('otpSent');
        const otpRecieved = data.get('otpRecieved');
        console.log('OTP sent:', otpSent);
        console.log('OTP received:', otpRecieved);

        if (otpSent !== otpRecieved) {
            console.log('OTP validation failed!');
            setFlash({ type: 'error', message: 'OTP Validation failed. Please try again!' }, cookies);
            return fail(400, { error: 'OTP Validation failed. Please try again!' });
        }
        // Simulate validating OTP
        // In a real-world scenario, you would perform verifyOTP operation here, like calling an validate OTP API
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for the scan operation
        
        setFlash({ type: 'success', message: 'Phone verification completed successfully!' }, cookies);
        return {
            success: true
        };
    }
};