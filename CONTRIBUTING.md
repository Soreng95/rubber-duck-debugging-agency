# How we work together

The git commands live in [README section 5](README.md#5-how-we-work-with-branches).
This file is the other half: what happens **after** you push, and the few rules
we have agreed to follow.

> **Why rules at all?** GitHub can enforce this automatically, but only on paid
> or public repos. Ours is private and on the free plan, so for now these are
> kept by us, not by the machine. That makes them easier to break by accident —
> hence writing them down.

---

## The short version

1. Never commit to `main`. Branch, push, open a Pull Request.
2. Someone else approves it before it merges.
3. Don't merge your own PR unreviewed.
4. Answer the comments before you merge.

---

## Opening a pull request

Push your branch, and GitHub shows a "Compare & pull request" button. Click it,
and a template appears with four boxes. Fill them in — badly is fine, empty is not.
The one that matters most is **"Anything you are unsure about?"**. Writing
*"I don't understand why this re-renders"* is exactly what that box is for.

Then pick a reviewer on the right-hand side. If you don't know who, pick anyone.

## Reviewing someone else's pull request

You do not need to be the best coder in the group to review. Genuinely.
Reviewing is how you read other people's code, which is most of the job.

Open the **Files changed** tab and read it. You are looking for:

- Something you **don't understand**. Ask. A line nobody can explain is a bug
  waiting to happen, and the question is useful even when the code is correct.
- Something that looks **copied from elsewhere and not adapted** — a prop that
  isn't used, a leftover `console.log`.
- Does it **do what the description says**? Pull the branch and click it if you want.

Leave a comment with the blue "Approve" if it's good. Approving something that
later turns out broken is not a failure — that is what `git revert` is for.

**Be kind and be specific.** "This is wrong" helps nobody. "I think this breaks
when the list is empty — what happens on line 24?" helps immediately.

## Merging

Merge once you have **one approval** and the conversations are resolved.
Use the **Squash and merge** button — it keeps `main`'s history to one tidy
commit per feature instead of your eleven "fix typo" commits.

Delete the branch afterwards; GitHub offers a button for it. Then:

```bash
git checkout main
git pull
```

...before you start your next branch, so you are building on the newest code.

## When two people change the same file

Git will say **conflict**. This is normal and it is not a disaster — it means
git won't guess which version you meant. Don't delete your work and start over.
Bring it to the group, or open the file and look for the `<<<<<<<` markers:
everything between them is the two versions, side by side. Keep the right one,
delete the markers, commit.

---

## Who is on this repo

| GitHub | Access |
| --- | --- |
| @Soreng95 | Admin |
| @Monadyr | Write |
| @Siri-AnnNoroff | Write |
| @Hanaamedyan | Write |

Write access means you can push branches and merge pull requests. It does not
let you change repo settings or delete anything important, so you cannot break
the repo by clicking the wrong thing. Explore freely.
