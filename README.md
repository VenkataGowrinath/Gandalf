# Gandalf MVP Demo

A mobile-first demo app for **independent urban Indian women** who want to see friends’ mobility and get contextual safety/assistance info via an AI proxy—without building onboarding, verification, or compliance.

## What’s in scope (MVP)

- **Main screen**: Map (or fallback “map”) with community members as avatars, one with a moving status (“Took a right turn towards Madhapur”), one with a green assistance radius. Current group selector and bottom CTAs (AI dice, Navigate).
- **AI chatbox**: Opens from the AI dice. User picks intent (Safety Status, Route Deviation, Timing Anomaly, Assistance Feasibility), selects a member, and can type more. Mock AI responds with contextual status for that member.
- **Group switching**: User can open the group dropdown and switch to another group (e.g. School Mates → Work Friends) to see that group’s activity.

## Run locally

```bash
cd app
npm install
npm run dev
```

Open the URL (e.g. `http://localhost:5173`) and use a narrow viewport or DevTools device mode for the mobile layout.

## Google Maps (optional)

- Without an API key, the app uses a **fallback map** (styled grid + avatars) so the demo works immediately.
- For real map tiles, create a `.env` file with:
  ```env
  VITE_GOOGLE_MAPS_API_KEY=your_google_maps_js_api_key
  ```
  Enable “Maps JavaScript API” (and optionally “Places”) for that key.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS** (v4)
- **@react-google-maps/api** (when API key is set)
- Mock data: groups and members in `src/data/mockGroups.ts`

## Deploy on GitHub and Vercel

1. **Create a new repo on GitHub:** [github.com/new](https://github.com/new) (e.g. name: `gandalf`).
2. **Push this folder** (from `Gandalf/app`):
   ```bash
   cd path/to/Gandalf/app
   git init
   git add .
   git commit -m "Initial commit: Gandalf MVP demo"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. **Deploy on Vercel:** [vercel.com](https://vercel.com) → Add New → Project → Import your GitHub repo. Root Directory: **.** (leave default). Deploy.
4. (Optional) In Vercel project **Settings → Environment Variables**, add `VITE_GOOGLE_MAPS_API_KEY` for real maps.

See **[GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)** for a step-by-step guide with your path and placeholders.

## Out of scope for this demo

Onboarding, verification, profiles, edge cases, legal compliance, and full error handling are not implemented.
