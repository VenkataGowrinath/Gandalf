# Publish Gandalf app to GitHub and Vercel

Do these steps on your machine (in Terminal or PowerShell).

## 1. Create a new repo on GitHub

1. Go to [github.com/new](https://github.com/new).
2. Set **Repository name** (e.g. `gandalf` or `gandalf-mvp`).
3. Choose **Public**, leave "Add a README" **unchecked** (you already have one).
4. Click **Create repository**.

## 2. Push this app from your machine

Open Terminal/PowerShell and run (replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name):

```bash
cd "d:\Gowri Gadu\AI Product Design Course\Cursor\Gandalf\app"

git init
git add .
git commit -m "Initial commit: Gandalf MVP demo"

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If GitHub asks you to log in, use your credentials or a Personal Access Token (Settings → Developer settings → Personal access tokens).

## 3. Deploy on Vercel from GitHub

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. Click **Add New** → **Project**.
3. **Import** the repo you just pushed.
4. Leave **Root Directory** as **.** (this folder is already the app root).
5. (Optional) Under **Environment Variables**, add:
   - Name: `VITE_GOOGLE_MAPS_API_KEY`
   - Value: your Google Maps API key
6. Click **Deploy**.

Your app will be live at a `*.vercel.app` URL.
