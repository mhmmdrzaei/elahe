# Elahe — Next.js + Sanity

Next.js 16 (App Router, JavaScript, Sass) with an embedded Sanity 6 Studio at `/studio`.

## Setup

1. Create a Sanity project at https://www.sanity.io/manage (or `npx sanity login` then `npx sanity projects create`).
2. Put the project ID in `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`).
3. In the project's **API → CORS origins**, add `http://localhost:3000` (with credentials allowed), and your production URL later.
4. `npm run dev` → site at http://localhost:3000, Studio at http://localhost:3000/studio.
5. Contact form: add a `RESEND_API_KEY` (resend.com). Messages go to `CONTACT_TO_EMAIL`, or the Contact page email if that is blank.

## Structure

- `sanity/schemaTypes/` — Settings, Project, Category, About, Contact
- `app/(site)/` — public pages: home grid, `/projects/[slug]`, `/category/[slug]`, `/about`, `/contact`
- `app/studio/` — embedded Studio
- `components/` — Header, ProjectGrid, Slider, ContactForm (each with a `.module.scss`)
- `styles/` — globals and Sass variables

## Deploying (Vercel Hobby)

The site is fully static: every page is built once and served as HTML. Content changes
only go live when a publish in Sanity triggers a rebuild.

- `vercel.json` turns off automatic deploys from git pushes. After a code change,
  click **Redeploy** in Vercel (or publish anything in Sanity).
- Images load straight from Sanity's CDN (`sanity/lib/imageLoader.js`), so Vercel's
  image optimization quota is never used.
- The only server function is the contact form, which runs once per message sent.

### One-time setup

1. Import the repo into Vercel and add the env vars from `.env.example`.
2. Vercel → Project → Settings → Git → **Deploy Hooks**: create a hook (branch `main`) and copy its URL.
3. sanity.io/manage → your project → API → **Webhooks** → Create:
   - URL: the Vercel deploy hook
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: `_type in ["settings", "project", "category", "about", "contact", "links"]`
   - Drafts: off (so only **Publish** triggers a build)
   - HTTP method: POST
4. sanity.io/manage → API → **CORS origins**: add your Vercel URL (allow credentials) so `/studio` works.
