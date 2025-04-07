# Better Teller

Better Teller is an FO application made for bank braches.

## Dependencies
1. Auth.JS: to authenticate with Microsoft EntraID
2. Superforms with Zod: for easy form creation and validation 

## Running the application

1. Clone the app
2. Install dependencies with `npm install` (or `pnpm install` or `yarn`)
3. Create .env file and add following (for Auth.js)
AUTH_SECRET="RANDOM_STRING_FOR_ENCRYPTION_OF_AUTH_TOKENS"
AUTH_MICROSOFT_ENTRA_ID_ID="YOUR_TENENT_ID"
AUTH_MICROSOFT_ENTRA_ID_SECRET="YOUR_CLIENT_SECRET_OBTAINED_FROM_ENTRAID"
AUTH_TRUST_HOST=true
4. Start development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building for Production

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.