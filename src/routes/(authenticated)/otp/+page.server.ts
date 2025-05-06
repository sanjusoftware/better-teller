import { setFlash } from 'sveltekit-flash-message/server';
import { fail } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { EmailClient, KnownEmailSendStatus } from "@azure/communication-email";
import { env } from "$env/dynamic/private"

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
    },

    sendEmail: async ({ request, cookies }) => {
        console.log('Sending email...');
        const data = await request.formData();
        const email = data.get('email');
        console.log('Email:', email);
        const connectionString = env.COMMUNICATION_SERVICES_CONNECTION_STRING;
        const emailClient = new EmailClient(connectionString as string);
        const POLLER_WAIT_TIME = 10;

        try {
            let otp = Math.floor(100000 + Math.random() * 900000)
            const message = {
                senderAddress: "DoNotReply@19a76b53-44c6-42b5-a90c-79cd95f9fc42.azurecomm.net",
                content: {
                    subject: "DSK Bank: Email verification request",
                    plainText: "Please tell the following OTP to the branch office to verify your email: " + otp,
                    html: "<html><body><h1>Please tell the following OTP to the branch office to verify your email: " + otp + "</h1></body></html>",
                },
                recipients: {
                    to: [
                        {
                            address: "sanjusoftware@gmail.com",
                            displayName: "Sanjeev Mishra",
                        },
                    ],
                },
            };

            const poller = await emailClient.beginSend(message);

            if (!poller.getOperationState().isStarted) {
                throw "Poller was not started."
            }

            let timeElapsed = 0;
            while (!poller.isDone()) {
                poller.poll();
                console.log("Email send polling in progress");

                await new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
                timeElapsed += 10;

                if (timeElapsed > 18 * POLLER_WAIT_TIME) {
                    throw "Polling timed out.";
                }
            }

            if (poller.getResult()?.status === KnownEmailSendStatus.Succeeded) {
                console.log(`Successfully sent the email (operation id: ${poller.getResult()?.id})`);                
                setFlash({ type: 'success', message: 'Email sent successfully!' }, cookies);

                return {
                    success: true,
                    otp: otp
                };
            }
            else {
                throw poller.getResult()?.error;
            }
        } catch (e) {
            console.log(e);
        }
    }
} satisfies Actions;