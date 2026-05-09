# GITHUB PUSH — Complete walkthrough for first-timers

You'll be done in **20 minutes.** This guide assumes zero git experience.

**What you're about to do:**
1. Create a free GitHub account (skip if you have one)
2. Configure your local git identity (one-time, takes 30 seconds)
3. Create a "personal access token" — GitHub's password replacement
4. Initialize the repo + push your site

When you're done, your `Calm & Oak` folder will exist as a code repository on github.com. Then Cloudflare can read from it and auto-deploy every time you push.

---

## STEP 1 — Open Git Bash (your terminal for these commands)

You already have Git installed (version 2.53.0 — confirmed). Now you need to open the terminal.

1. Press the **Windows key**
2. Type: **`Git Bash`**
3. Click the Git Bash app that appears

A black/dark window opens with a `$` prompt. **Keep this open the whole time** — every command in this guide goes here.

> **Why Git Bash and not PowerShell?** Git Bash uses forward-slash paths and Linux-style commands, which match every git tutorial on the internet. Less confusion later.

---

## STEP 2 — Create a GitHub account (skip if you have one)

1. In your browser, go to https://github.com/signup
2. Email: pick whichever you want associated with the project (`cameronhayes11@hotmail.com` or another)
3. Pick a password. Pick a username — **this becomes part of your code URL**, so pick something professional. Examples:
   - `cameronhayes` (good)
   - `calmandoak` (also good — reflects the brand)
   - `chayes11` (fine)
   - **NOT** `xX_calm_oak_2026_Xx` (you'll regret it)
4. Verify email when GitHub sends you a code
5. When asked about plan, pick **Free**
6. Skip the "personalize your experience" survey if you want

**Write your username down.** You'll type it several times.

---

## STEP 3 — Tell git who you are (30 seconds, one-time only)

In your Git Bash terminal, run these two commands. **Replace the email and name with yours.**

```bash
git config --global user.name "Cameron Hayes"
git config --global user.email "cameronhayes11@hotmail.com"
```

> Make sure the email **matches the one you used for GitHub**. This is what shows up next to every commit you make.

Verify they took:
```bash
git config --global user.name
git config --global user.email
```

You should see your name and email echoed back.

---

## STEP 4 — Create a Personal Access Token (GitHub's password replacement)

GitHub stopped accepting passwords for git pushes in 2021. You need a "personal access token" (PAT) instead. It's a long string that acts like a password — but only for git operations.

1. Make sure you're logged into github.com in your browser
2. Click your **profile picture** (top-right) → **Settings**
3. Scroll **all the way down** the left sidebar → click **Developer settings** (very last item)
4. Left sidebar: **Personal access tokens** → **Tokens (classic)**
5. Top of page: **Generate new token** → **Generate new token (classic)**
6. Fill in:
   - **Note:** `calmandoak deploy` (anything that helps you remember why you made it)
   - **Expiration:** **No expiration** (or 1 year — your call)
   - **Select scopes:** check the **`repo`** box (the entire box — it'll auto-check all the sub-boxes)
7. Bottom of page: **Generate token**
8. **CRITICAL:** the page now shows your token, a long string starting with `ghp_…`. You will **never see this again**. Copy it now to a notes app or password manager. **If you lose it, you'll have to make a new one.**

> **Treat the token like a password.** Don't share it. Don't paste it in chat. Don't put it on your desktop. Use a password manager (1Password / Bitwarden / Apple Passwords) if you have one.

---

## STEP 5 — Create the repo on GitHub (1 minute)

1. Go to https://github.com/new
2. **Repository name:** `calmandoak`
3. **Description:** `A Japandi home decor journal` (optional)
4. **Public** or **Private**: **either works**. Cloudflare Pages free tier supports both. Public means the world can read your code (not your business — most affiliate sites do this). Private means only you. Pick whichever feels right.
5. **DO NOT** check any of: "Add a README", "Add .gitignore", "Choose a license". You already have a README and .gitignore locally — checking these creates conflicts.
6. Click **Create repository**

GitHub now shows you a "quick setup" page. **Don't follow those commands** — yours are below, customized for your situation.

---

## STEP 6 — Push your site (the actual git commands)

Back in **Git Bash**. Run these commands one at a time, in order. **Don't paste them all at once** — read what each one does so you understand.

### 6a. Navigate to your site folder

```bash
cd "/c/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
```

> Notice the **forward slashes** and **`/c/`** instead of `C:\`. That's Git Bash style.

Verify you're in the right place:
```bash
ls
```

You should see `index.html`, `shop`, `journal`, `assets`, `DEPLOY-NOW.md`, etc.

### 6b. Initialize git in this folder

```bash
git init
```

Output: `Initialized empty Git repository in …`

### 6c. Stage all your files (tells git what to commit)

```bash
git add .
```

Nothing visible happens — that's normal.

Verify it staged correctly:
```bash
git status
```

You'll see a long list of `new file:` entries. **Scroll up and check** — none of them should be in `final pins/`, `01-brand-assets/`, `Lets Get Started.md`, etc. (`.gitignore` excludes those.)

If you see anything in `final pins/` listed, STOP and tell me.

### 6d. Make your first commit

```bash
git commit -m "Initial Calm & Oak site"
```

Output:
```
[main (root-commit) abc1234] Initial Calm & Oak site
 NNN files changed, NNNN insertions(+)
 ...
```

The number of files will be around **120-130**.

### 6e. Set the branch name to "main" (modern convention)

```bash
git branch -M main
```

(Silent.)

### 6f. Connect your local repo to your GitHub repo

**Replace `YOUR_USERNAME`** with the GitHub username you picked in Step 2:

```bash
git remote add origin https://github.com/YOUR_USERNAME/calmandoak.git
```

Example, if your username is `cameronhayes`:
```bash
git remote add origin https://github.com/cameronhayes/calmandoak.git
```

(Silent.)

Verify:
```bash
git remote -v
```

You should see two lines, both showing the same URL.

### 6g. Push your code (the moment of truth)

```bash
git push -u origin main
```

**A login prompt appears:**
```
Username for 'https://github.com': _
```

Type your **GitHub username** and press Enter.

```
Password for 'https://USERNAME@github.com': _
```

**This is where the Personal Access Token from Step 4 goes.** **Not your GitHub password.** Paste the entire `ghp_…` string. (In Git Bash you may need to **right-click → Paste** instead of Ctrl+V. Nothing visible appears as you paste — that's a security feature.) Press Enter.

Git uploads the files. You'll see something like:
```
Enumerating objects: 130, done.
Counting objects: 100% (130/130), done.
Compressing objects: 100% (115/115), done.
Writing objects: 100% (130/130), 75.04 MiB | 5.12 MiB/s, done.
Total 130 (delta 8), reused 0 (delta 0)
To https://github.com/USERNAME/calmandoak.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main' from 'origin'.
```

✅ **Done.** Open `https://github.com/YOUR_USERNAME/calmandoak` in your browser. You should see all your files.

---

## STEP 7 — Save your token so you don't get prompted forever

Right now git asks for username + token every push. To save credentials so it stops asking:

```bash
git config --global credential.helper manager
```

Next push, Windows pops a credential dialog — tick "Save this password" and you're set. From now on every `git push` is instant.

---

## STEP 8 — How to update the site later

Whenever you change something locally and want it live:

```bash
cd "/c/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
git add .
git commit -m "describe what you changed"
git push
```

Three commands. Cloudflare Pages auto-rebuilds within ~30 seconds and your changes are live.

Examples of good commit messages:
- `git commit -m "Add Pinterest verification meta tag"`
- `git commit -m "Wire Formspree email endpoint"`
- `git commit -m "Update bedroom shop page with new throw"`
- `git commit -m "Add Cloudflare analytics token"`

---

## TROUBLESHOOTING

### "git: command not found"
You're in PowerShell/CMD instead of Git Bash. Press Windows key → type "Git Bash" → open it.

### "Permission denied (publickey)"
You typed `git@github.com:...` instead of `https://github.com/...`. Run:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/calmandoak.git
```
Then try `git push -u origin main` again.

### "Authentication failed" or "remote: Invalid username or password"
You used your GitHub password instead of the personal access token. Try again with the `ghp_…` token in the password prompt.

### "Updates were rejected because the remote contains work that you do not have locally"
You accidentally checked "Add a README" when creating the GitHub repo. Run:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### The push is taking forever
That's normal for the first push — you're uploading 75 MB. On a typical connection it takes 1-3 minutes. The progress bar moves.

### "fatal: not a git repository"
You're not inside the `Calm & Oak` folder. Run:
```bash
cd "/c/Users/CameronHayes/OneDrive - GPWMAD01/Desktop/Calm & Oak"
```
Then try the failing command again.

### "warning: LF will be replaced by CRLF" (lots of these)
Harmless — it's git normalizing line endings. Ignore.

### Bash window closed and you forgot where you were
That's fine — git remembers everything. Just open Git Bash again, `cd` back to the folder, and pick up.

---

## WHAT'S NEXT — after the push works

You're now ready for **Step 2 of `DEPLOY-NOW.md`** (Cloudflare Pages deploy). The hard part is over — Cloudflare just connects to your now-existing GitHub repo and clicks "Deploy."

Estimated time from "first push complete" to "site live at calmandoak.com":
- Cloudflare Pages connect + deploy: **5 min**
- DNS change at GoDaddy: **5 min**
- DNS propagation wait: **1-4 hours, usually under 1**

You're closer than you think.
