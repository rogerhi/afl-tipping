# Deploy to GitHub & Vercel

## Step 1: Create GitHub Repo

1. Go to: https://github.com/new
2. **Repository name:** `afl-tipping`
3. **Description:** AFL Footy Tipping Dashboard - Games, odds, injuries, ladder
4. **Public or Private:** Your choice
5. **DO NOT** check "Add a README file"
6. Click **Create repository**

## Step 2: Push Code (Choose Method)

### Method A: HTTPS (Browser Login)

```bash
cd /home/rogerhi/.openclaw/workspace/projects/afl-tipping
git push -u origin main
```
When prompted, use your GitHub username and a Personal Access Token (not your password).

**Get a token:** https://github.com/settings/tokens → Generate new token → check "repo" scope

### Method B: SSH Key (Recommended)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your@email.com" -f ~/.ssh/id_ed25519 -N ""

# Copy public key to clipboard (or display and copy manually)
cat ~/.ssh/id_ed25519.pub
```

1. Go to: https://github.com/settings/keys
2. Click **New SSH key**
3. Paste the key from above
4. Click **Add SSH key**

Then update the remote and push:
```bash
cd /home/rogerhi/.openclaw/workspace/projects/afl-tipping
git remote set-url origin git@github.com:rogerhi/afl-tipping.git
git push -u origin main
```

## Step 3: Deploy to Vercel

Option 1 - Vercel CLI (if installed):
```bash
cd /home/rogerhi/.openclaw/workspace/projects/afl-tipping
vercel --prod
```

Option 2 - Web Interface (Easiest):
1. Go to: https://vercel.com/new
2. Click **Continue with GitHub**
3. Find and select `afl-tipping` repo
4. Vercel auto-detects Next.js
5. Click **Deploy**

Your site will be live at: `afl-tipping.vercel.app`

## Step 4: Future Updates

When you update data and want to redeploy:

```bash
cd /home/rogerhi/.openclaw/workspace/projects/afl-tipping
git add -A
git commit -m "Updated Round 2 data"
git push origin main
```

Vercel automatically rebuilds and redeploys!
