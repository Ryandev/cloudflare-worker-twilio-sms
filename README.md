# cloudflare-worker-twilio-sms

Deploy your Twiml logic app on Cloudflare workers.

### Setup

Run `yarn setup`

### Making changes

Edit under `src/handler.ts` & run

### Deploy manually

Build with `yarn build` & then copy your `dist/worker.js` into your Cloudflare worker

### Deploy GitHub actions

• Fork project
• Create Cloudflare API token with worker access
• Add secret in github with key:CF_API_TOKEN value:$MY_CLOUDFLARETOKEN
• Create Cloudflare worker
• Update wrangler.toml route point to your worker
• Push to GitHub & wait for completion
