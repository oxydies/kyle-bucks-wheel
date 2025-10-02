# 🎰 Kyle Bucks Wheel of Fortune

A fun spinning wheel app for awarding nonsense prizes with Kyle Bucks!

## Features
- 🎡 Spinning wheel with 25 customizable prizes
- 💰 Player balance tracking (20 Kyle Bucks per spin)
- 👑 Admin panel to manage prizes and player balances
- 🔒 Password-protected admin access
- ☁️ Cloud database with Vercel KV (Redis)

## Admin Password
`kylebucks2025`

## Deployment Instructions

### Prerequisites
1. Create a free account at [Vercel.com](https://vercel.com)
2. Install Vercel CLI (optional but recommended):
   ```bash
   npm install -g vercel
   ```

### Method 1: Deploy via GitHub (Recommended)

1. **Create a GitHub repository:**
   - Go to [GitHub.com](https://github.com) and create a new repository
   - Upload all the files from this project

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Add Vercel KV Storage:**
   - After deployment, go to your project dashboard on Vercel
   - Click on the "Storage" tab
   - Click "Create Database"
   - Select "KV" (Redis)
   - Give it a name like "kyle-bucks-db"
   - Click "Create"
   - Vercel will automatically connect it to your project

4. **Done!** Your app is now live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose "yes" to link to existing project or create new one

4. **Add Vercel KV:**
   - Go to your project on vercel.com
   - Follow step 3 from Method 1 above

5. **Redeploy with storage:**
   ```bash
   vercel --prod
   ```

### Method 3: Drag & Drop (Easiest but Limited)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag and drop the entire project folder
3. Add KV storage (see step 3 from Method 1)
4. Redeploy from the Vercel dashboard

## Important: Setting Up Vercel KV

**YOU MUST ADD VERCEL KV STORAGE** or the app won't work! Here's why:
- The app stores all prizes and player balances in Vercel KV (Redis)
- Without it, the API endpoints will fail

**To add KV after deployment:**
1. Go to your project on vercel.com
2. Click "Storage" tab
3. Click "Create Database"
4. Choose "KV"
5. Name it (e.g., "kyle-bucks-db")
6. Click "Create"
7. Vercel automatically redeploys with the database connected

## Usage

### For Players:
1. Go to the URL (e.g., `https://kyle-bucks.vercel.app`)
2. Enter your name
3. Check your balance
4. Spin if you have 20+ Kyle Bucks!

### For Admin (You):
1. Click the "👑 Admin" button
2. Enter password: `kylebucks2025`
3. Edit prizes (25 slots)
4. Add new players with Kyle Buck balances
5. Adjust existing player balances
6. Save changes

## Customization

### Change Admin Password
Edit `/api/admin/login.js`:
```javascript
const ADMIN_PASSWORD = 'your-new-password-here';
```

### Change Spin Cost
Currently set to 20 Kyle Bucks. To change:
1. Edit `index.html` - change the button text
2. Edit `api/spin.js` - change `if (players[name] < 20)` and `players[name] -= 20`

## File Structure
```
kyle-bucks-app/
├── index.html              # Main app interface
├── package.json            # Dependencies
├── api/
│   ├── data.js            # Get prizes
│   ├── player.js          # Check player balance
│   ├── spin.js            # Handle wheel spin
│   └── admin/
│       ├── login.js       # Admin authentication
│       ├── data.js        # Get all admin data
│       ├── prizes.js      # Update prizes
│       └── players.js     # Update players
└── README.md              # This file
```

## Tech Stack
- **Frontend:** Vanilla JavaScript, HTML5 Canvas
- **Backend:** Vercel Serverless Functions (Node.js)
- **Database:** Vercel KV (Redis)
- **Hosting:** Vercel

## Troubleshooting

### "Failed to fetch data" error
- Make sure Vercel KV is set up (see "Setting Up Vercel KV" above)
- Check that the KV database is linked to your project

### Players can't see their balance
- Make sure you've added them in the Admin panel
- Check the browser console for errors

### Wheel not spinning
- Make sure prizes are loaded (check browser console)
- Refresh the page

## Support
If you run into issues, check:
1. Vercel deployment logs (in your Vercel dashboard)
2. Browser console (F12 > Console tab)
3. Make sure KV storage is connected

## License
MIT - Have fun! 🎉
