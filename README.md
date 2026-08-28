# Next Steps After Cloning the Project

Once the Maintainer has created the repo and everyone (Person A, B, C) has cloned it, here's exactly what happens next.

## 1. Verify Your Clone

```bash
cd Clg-project
git remote -v
```

You should see:
```
origin  git@github.com:Raihan-Shek/Clg-project.git (fetch)
origin  git@github.com:Raihan-Shek/Clg-project.git (push)
```

## 2. Confirm You're on `main` and Up to Date

```bash
git branch
```
You see where is the star that you are currently:
```
* main 
  mohuya
```
## Go To The `main` Branch
```
git checkout main
git pull origin main
```

## 3. Each Developer Creates Their Own Branch (Never Work on `main`)

```bash
# Person B
git checkout -b feature/signup-form

# Person C
git checkout -b feature/api-integration
```

> Rule: One branch = one task/feature. Don't mix unrelated changes in a single branch.

## 4. Start Working

```bash
# make changes to files
git status                     # see what changed
git add .                      # stage changes
git commit -m "feat: add signup form"
```

## 5. Push Your Branch to GitHub

```bash
git push -u origin feature/signup-form
```

`-u` sets the upstream so next time you can just run `git push`.

## 6. Open a Pull Request (PR) `Before doing that Ask Raihan`

Via CLI:
```bash
gh pr create --base main --title "Add signup form" --body "Implements signup form with validation"
```

Via GitHub website:
- Go to the repo → you'll see a banner "Compare & pull request" → click it → fill title/description → **Create pull request**

## 7. Tag the Maintainer for Review

- On the PR page, add **Person A** as a reviewer (Reviewers panel on the right).
- Wait for approval or comments.

## 8. If Changes Are Requested

```bash
# fix the code
git add .
git commit -m "fix: handle empty email validation"
git push origin feature/signup-form
```
This updates the same PR automatically — no need to open a new one.

## 9. Maintainer Merges

The Maintainer (Person A) merges once approved:

```bash
gh pr merge <PR-number> --squash --delete-branch
```

## 10. Everyone Syncs Again

After any merge, all developers should update their local `main`:

```bash
git checkout main
git pull origin main
```

Then start the next task from step 3 again (create a new branch off the fresh `main`).

---

## Quick Recap Flow

```
clone repo
   ↓
checkout main → pull
   ↓
create feature branch
   ↓
code → commit → push
   ↓
open PR → request review
   ↓
maintainer reviews → approves/requests changes
   ↓
maintainer merges → branch deleted
   ↓
everyone pulls latest main
   ↓
repeat for next task
```