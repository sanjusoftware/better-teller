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

## Deploying to Azure Static Web Apps

This SvelteKit application is configured to be deployed as a Static Web App on Azure using `@sveltejs/adapter-static`.

### Build Instructions

1.  **Build the application:**
    Run the standard SvelteKit build command:
    ```bash
    npm run build
    ```
    This will generate a production-ready version of your application in the `build` directory (as configured in `svelte.config.js`).

### Azure Deployment Steps

1.  **Create Azure Static Web Apps Resource:**
    *   In the [Azure portal](https://portal.azure.com/), search for "Static Web Apps" and create a new resource.
    *   Follow the prompts to select your subscription, resource group, provide a name for your app, choose a region, and select your deployment source (e.g., GitHub, Azure DevOps, or other).

2.  **Configure Build Details:**
    *   During or after creation, you'll need to configure the build settings for your Static Web App.
    *   **App location:** Set to `/` (root of your repository).
    *   **Api location:** Leave blank if you are not deploying Azure Functions alongside your app, or set to `api` if you have them in an `api` folder.
    *   **Output location (App artifact location):** Set to `build`. This is where SvelteKit outputs the static files.

3.  **Environment Variables:**
    *   In the Azure Static Web Apps resource configuration, navigate to "Configuration" and then "Application settings".
    *   Add the necessary environment variables required by your application, such as:
        *   `AUTH_SECRET`
        *   `AUTH_MICROSOFT_ENTRA_ID_ID`
        *   `AUTH_MICROSOFT_ENTRA_ID_SECRET`
        *   `AUTH_TRUST_HOST` (set to `true` or your production URL)
    *   These will be available to your application at runtime (for any server-side logic if you were using hybrid rendering, but primarily for build-time if truly static, or for any API functions if deployed). For a fully static site, these might be less critical unless used during the build process.

4.  **SPA Fallback Configuration:**
    *   The SvelteKit application is configured with `fallback: 'index.html'` in `svelte.config.js` using `@sveltejs/adapter-static`. This helps ensure that client-side routing works correctly.
    *   Azure Static Web Apps typically supports SPA routing by serving the fallback file (e.g., `index.html`) for any routes that don't match static files. You can further customize routing and fallback rules by adding a `staticwebapp.config.json` file to the root of your repository if needed. For many SPAs, the default behavior combined with the adapter's fallback is sufficient.

5.  **Review and Deploy:**
    *   Once configured, Azure Static Web Apps will build and deploy your application. You can monitor the deployment process through GitHub Actions (if using GitHub for source control) or directly in the Azure portal.

For more detailed and up-to-date instructions, please refer to the [official Azure Static Web Apps documentation](https://docs.microsoft.com/azure/static-web-apps/).