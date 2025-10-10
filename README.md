# 🎰 Kyle Bucks Wheel of Fortune - READY TO DEPLOY

This folder contains the complete, ready-to-deploy Kyle Bucks application.

## ✅ What's Included

**Root Files:**
- index.html - Main wheel page
- madlib.html - Secret madlib game page
- package.json - Dependencies
- vercel.json - Vercel config
- .gitignore - Git ignore file

**API Files (8 total - under the 12 function limit):**
- api/admin.js - Combined admin endpoint (login, data, prizes, players, delete/clear spins)
- api/data.js - Get prizes
- api/player.js - Check player balance
- api/spin.js - Handle wheel spins
- api/recent-spins.js - Get recent spin history
- api/total-spins.js - Get total spin count (excludes Kyle & Devin)
- api/madlib.js - Madlib game with 30 story templates
- api/report.js - Email complaints to kyle.allen@ncino.com

## 🚀 Deployment Instructions

### Option 1: Replace Everything on GitHub

1. Go to your GitHub repo: https://github.com/oxydies/kyle-bucks-wheel
2. Delete ALL files (except maybe README.md if you want to keep it)
3. Upload ALL files from this kyle-bucks-DEPLOY folder
4. Vercel will auto-deploy

### Option 2: Fresh Start

1. Delete the old repo entirely
2. Create new repo: kyle-bucks-wheel
3. Upload all files from this folder
4. Connect to Vercel
5. Add Vercel KV database
6. Add environment variables

## 🔑 Required Environment Variables in Vercel

- `REDIS_URL` - From your Vercel KV database (should already exist)
- `RESEND_API_KEY` - From resend.com for email reports (optional)

## 🎮 Features

- Spinning wheel with unlimited prizes
- Player balance tracking
- Bouncing clown background (corner hits = confetti + money)
- Recent spins feed
- Total spins counter ("Dreams Made Reality")
- Prize certificates
- 25-question complaint form
- Admin panel (password: kylebucks2025)
- **SECRET: Type "MADLIB" as name to play madlib game (10 Kyle Bucks)**

## 📝 Notes

- Total spin counter excludes "Kyle" and "Devin"
- All admin functions combined into single API endpoint
- 8 serverless functions total (under free tier limit of 12)

## 🎉 You're Ready!

Just upload these files to GitHub and you're good to go!
