# Vena

Live member-stock storefront and private admin dashboard using Next.js, TypeScript, Prisma, and PostgreSQL on Vercel.

## Local setup

1. Copy `.env.example` to `.env`. Set a unique `ADMIN_ID`, `ADMIN_PASSWORD`, and `SESSION_SECRET` (at least 32 characters).
2. Run `npm install && npx prisma migrate dev && npm run seed`.
3. Run `npm run dev`, then visit `http://localhost:3000` and `http://localhost:3000/admin`.

The local schema uses SQLite. The seed command creates the admin account, starter stock categories, and editable FAQ content.

## Deploy to Vercel

1. Extract `Vena-Website.zip`. In the extracted folder, open PowerShell and run:

   ```powershell
   git init
   git add .
   git commit -m "Add Vena storefront"
   ```

   Never add `.env` or paste its secrets into GitHub. The ZIP deliberately excludes the local `.env`.

2. Create an empty repository at `github.com/new`, copy its HTTPS URL, then run:

   ```powershell
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

   `.gitignore` excludes dependencies, build output, local environment files, SQLite databases, and uploads.
3. In Vercel, choose **Add New → Project**, import that GitHub repository, and keep the detected Next.js framework.
4. Create/connect a PostgreSQL database (for example, the Vercel Neon integration) and add these environment variables for Preview and Production:
   - `DATABASE_URL`: pooled PostgreSQL connection string.
   - `DIRECT_URL`: direct, non-pooled PostgreSQL connection string for Prisma migrations.
   - `ADMIN_ID`, `ADMIN_PASSWORD`, and `SESSION_SECRET` (use a unique password and a random secret of at least 32 characters).
   - `BLOB_READ_WRITE_TOKEN`: connect a Vercel Blob store for persistent admin logo uploads.
5. Deploy. `vercel.json` runs `npm run vercel-build`, which generates the PostgreSQL Prisma client, applies the PostgreSQL migrations, seeds starter FAQs without overwriting your admin password, and builds Next.js.
6. Open `/admin` and add your products. Each product can use a checkout/authorization URL, written purchase instructions, or both. No fake checkout destinations are seeded.

For Vercel, use the PostgreSQL schema at `prisma/postgres/schema.prisma`; local development continues using the SQLite schema at `prisma/schema.prisma`. Product additions and stock/FAQ edits are persisted in the database. The live feed checks the database periodically so changes propagate across serverless instances; reconnecting clients can recover with the polling fallback.

Vercel functions have ephemeral filesystems; logo uploads use Vercel Blob when `BLOB_READ_WRITE_TOKEN` is configured. Local uploads are stored under the ignored `public/uploads` folder.

## Validation and self-hosting

Run `npm run lint`, `npx playwright install chromium`, `npm test`, and `npm run build`. For Docker/VPS use, follow the included Dockerfile, configure persistent database/uploads, and use the local SQLite schema or the PostgreSQL schema as appropriate. Admin sessions are signed, HTTP-only, same-site cookies that expire after eight hours. Use HTTPS and unique secrets in production.
