# 🚀 QUICK START GUIDE

## Fastest Way to Deploy (5 minutes)

### Step 1: Get the Code
You have all the files in the kyle-bucks-app folder on your Desktop!

### Step 2: Create GitHub Repository
1. Go to github.com
2. Click "New repository"
3. Name it "kyle-bucks-wheel"
4. Upload all the files from this folder

### Step 3: Deploy to Vercel
1. Go to vercel.com (create free account if needed)
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy" (no configuration needed!)
5. Wait ~30 seconds

### Step 4: Add Database (CRITICAL!)
1. In Vercel dashboard, go to your project
2. Click "Storage" tab
3. Click "Create Database"
4. Select "KV" 
5. Name it "kyle-bucks-db"
6. Click "Create"
7. Done! Vercel auto-connects it

### Step 5: Use It!
Your URL will be something like: `https://kyle-bucks-wheel.vercel.app`

Share this URL with your coworkers!

## First Time Setup (As Admin)

1. Open your deployed site
2. Click "👑 Admin" button
3. Password: `kylebucks2025`
4. Add your first player:
   - Name: "Test Player"
   - Kyle Bucks: 100
5. Click "💾 Save Players"
6. Test it by entering "Test Player" as a player

## That's It!

Total time: ~5 minutes
Cost: $0 (100% free on Vercel's hobby tier)

---

## What You Can Do Now

✅ Add unlimited players and balances
✅ Edit all 25 prizes to be as silly as you want
✅ Players can check balance and spin from anywhere
✅ All data is saved permanently in the cloud
✅ Share one URL with everyone

## Common Questions

**Q: Can I change the password?**
A: Yes! Edit `/api/admin/login.js`

**Q: Can I change the spin cost?**
A: Yes! Edit the cost in `api/spin.js` (line with `if (players[name] < 20)`)

**Q: How do I give someone more Kyle Bucks?**
A: Admin panel → Find their name → Change number → Save Players

**Q: Is this actually free?**
A: Yes! Vercel's free tier includes:
- Unlimited sites
- 100GB bandwidth/month
- KV storage (256MB free)
- This app will use basically nothing

**Q: Can I use a custom domain?**
A: Yes! Vercel lets you add custom domains for free

---

Need help? Check the full README.md!
