<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1y1SJfU7ksNac4VdiIf1NxAUS6XrFKW_v

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

**Setup:**

1. Go to your repository Settings → Pages
2. Under "Build and deployment", set Source to "GitHub Actions"
3. Push to the `main` branch - the app will automatically build and deploy

**Manual deployment:**

```bash
npm run build
# The dist folder contains the production build
```
