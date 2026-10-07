# Rubber Duck Debugging Agency 🦆

A small **React** playground for our group.

This guide is written by me (Emil). The plan was originally to start with
Next.js, but Adrian is right: we should learn **React components first**.
Next.js is built *on top of* React, and it hides a lot of the mechanics —
you would be getting the easy version without understanding what it is
doing for you. So we start one step lower down, with plain React.

You already know HTML, CSS, JavaScript and a bit of Git. That is enough.

**When Adrian covers Next.js later, everything in this project still applies.**
Components, props and state work exactly the same there. Next.js just adds
routing, a server and a build setup on top.

---

## Table of contents

1. [What is React, and why Node?](#1-what-is-react-and-why-node)
2. [Install what you need](#2-install-what-you-need)
3. [Get the code](#3-get-the-code)
4. [Start the project](#4-start-the-project)
5. [How we work with branches](#5-how-we-work-with-branches)
6. [A tour of the files](#6-a-tour-of-the-files)
7. [The five things you actually need to learn](#7-the-five-things-you-actually-need-to-learn)
8. [Your first task](#8-your-first-task)
9. [When something breaks](#9-when-something-breaks)
10. [Emil's super cool terminal setup](#10-emils-super-cool-terminal-setup)

---

## 1. What is React, and why Node?

Until now you have probably opened your `index.html` straight in the browser,
or used Live Server in VS Code.

**React** is a JavaScript library for building user interfaces out of
reusable pieces called *components*. Instead of writing one long HTML file
and then hunting elements down with `document.querySelector`, you describe
what the page should look like for a given set of data, and React keeps the
real page in sync for you.

That is the mental shift, and it is worth saying clearly:

> You do not tell the page *how to change*. You describe *what it should look
> like*, and React works out which bits of the page to update.

**So why do we need Node?** Browsers cannot read the code we are about to
write. React code is written in a syntax called JSX (HTML-looking code inside
JavaScript), and files `import` each other. Something has to translate all of
that into plain JavaScript the browser understands.

That something is a build tool — we use **Vite** — and it runs on **Node.js**,
which is simply JavaScript running on a computer instead of inside a browser.

While you work, Vite runs a little server on your own machine. You open:

```
http://localhost:3000
```

`localhost` means "this computer". `3000` is the door Vite listens on. Nobody
on the internet can see it — it is only yours.

---

## 2. Install what you need

### 2.1 Node.js (this also gives you npm)

Get the **LTS** version from <https://nodejs.org>.

> **Do I need to install npm separately?**
> **No.** `npm` comes bundled inside the Node.js installer. Install Node, and
> you automatically get `node` *and* `npm` as commands in your terminal. There
> is no separate npm download, and you should not go looking for one.

**Windows**

1. Go to <https://nodejs.org> and download the **LTS** installer (`.msi`).
2. Run it, click Next through everything, keep the defaults.
3. Open a **new** terminal (PowerShell or Git Bash) and check **both**:

```bash
node -v
npm -v
```

**Mac**

Easiest is the installer from <https://nodejs.org> (LTS, `.pkg`), same as above.
If you already have [Homebrew](https://brew.sh): `brew install node`.

Then check both:

```bash
node -v
npm -v
```

You should get two version numbers, something like `v22.14.0` and `10.9.2`.

**If the command is not found:** close the terminal completely and open a new
one. The installer only adds Node to terminals you open *afterwards*. If it
still fails, restart the computer — on Windows that fixes it 90% of the time.

### 2.2 pnpm

This project uses **pnpm** to install packages. It does the same job as npm,
it is just faster and uses less disk space. The important part is that we all
use the *same* one — otherwise we end up with conflicting lock files in Git.

Because you just installed npm along with Node, you already have what you need
to install it:

```bash
npm install -g pnpm
```

`-g` means "global" — install it as a command I can use anywhere, not into one
specific project.

Check it:

```bash
pnpm -v
```

> **Permission error on Mac/Linux?** Try `sudo npm install -g pnpm` and type
> your computer password.
>
> **`pnpm: command not found` right after installing?** Open a new terminal.
>
> **Still stuck?** You can run this project with plain npm instead — use
> `npm install` and `npm run dev` everywhere this guide says `pnpm`. Just tell
> me, so we do not accidentally commit two different lock files.

### 2.3 VS Code extensions (optional, but do it)

- **ES7+ React/Redux/React-Native snippets** — type `rfc` + Tab and it writes a
  whole component skeleton for you.
- **Prettier** — formats your code on save, so our diffs stay clean.
- **ESLint** / **Oxlint** — underlines mistakes as you type.

---

## 3. Get the code

1. Ask me to add you to the repo on GitHub:
   <https://github.com/Soreng95/rubber-duck-debugging-agency>
2. Clone it and step into the folder:

```bash
git clone https://github.com/Soreng95/rubber-duck-debugging-agency.git
cd rubber-duck-debugging-agency
```

3. Install the packages the project depends on:

```bash
pnpm install
```

This reads `package.json` and downloads React, Vite and friends into a folder
called `node_modules`. That folder is **huge** and deliberately not in Git (see
`.gitignore`) — everyone generates their own.

> You run `pnpm install` once at the start, and again whenever someone adds a
> new package to `package.json`.

---

## 4. Start the project

```bash
pnpm dev
```

You will see:

```
  VITE v8.3.3  ready in 91 ms

  ➜  Local:   http://localhost:3000/
```

Open <http://localhost:3000> in your browser.

Now open `src/App.jsx`, change the heading text, and save. The browser updates
on its own — you never press refresh. That is **hot reload**, and it is the
nicest part of working this way.

**To stop the server:** click in the terminal and press `Ctrl + C`.
(Yes, `Ctrl` on Mac too — not `Cmd`.)

That terminal is now busy running the server. To run `git` commands at the same
time, open a second terminal tab with `Cmd/Ctrl + T`.

The commands in `package.json`:

| Command | What it does |
| --- | --- |
| `pnpm dev` | Runs the development server. This is the one you use all day. |
| `pnpm build` | Builds the optimised version for production into `dist/`. Run it before pushing to check everything still compiles. |
| `pnpm preview` | Serves the built `dist/` folder, so you can check the production build locally. |
| `pnpm lint` | Checks your code for mistakes and bad habits. |

---

## 5. How we work with branches

**We never code directly on `main`.** Everyone works on their own branch.

```bash
# 1. start from the newest main
git checkout main
git pull

# 2. create your own branch and switch to it
git checkout -b emil/duck-filter

# 3. ...write code...

# 4. save your work
git add .
git commit -m "Add filter for available ducks"

# 5. send it to GitHub
git push -u origin emil/duck-filter
```

Then open a **Pull Request** on GitHub so we can look at it together before it
goes into `main`.

Name your branch `yourname/what-you-did` so we can see whose it is.

**Do not be afraid of breaking something.** Git keeps a log of everything. The
worst case is that we go back one commit. That is the entire point of it.

Useful when you are lost:

```bash
git status          # what have I changed?
git branch          # which branch am I on?
git log --oneline   # the last commits
```

---

## 6. A tour of the files

```
rubber-duck-debugging-agency/
├── index.html              the ONE html file — mostly empty, read the comments
├── package.json            dependencies and commands
├── vite.config.js          build config — you will not need to touch this
├── public/                 images and files served as-is
└── src/
    ├── main.jsx            where React starts up
    ├── index.css           global CSS for the whole app
    ├── App.jsx             👈 the main component — start here
    ├── App.module.css      CSS that belongs to App.jsx
    └── components/
        ├── 1 SimpleButton.jsx   a component with no props
        ├── 2 Button.jsx         props, defaults, passing a function in
        ├── 3 Counter.jsx        state with useState
        ├── 4 DuckCard.jsx       conditional rendering + calling back up
        └── 5 DuckList.jsx       .map() over an array, and `key`
            (each has a matching .module.css next to it)
```

**Every single file above is full of comments**, written for exactly where you
are now. Read them in the numbered order — together they *are* the real guide.
This README only gets you to the point where you can open them.

### The empty HTML file

Open `index.html`. It is almost empty — there is no content in it, just:

```html
<div id="root"></div>
```

React fills that div with the entire app. This surprises everyone the first
time. `src/main.jsx` is the code that does it.

### Why `.jsx` and not `.js`?

`.jsx` tells the build tool "this file contains HTML-looking code". That
HTML-looking code is called **JSX**, and it is the thing that makes React
readable:

```jsx
const name = "Emil";

return <h1>Hello {name}</h1>;   // -> Hello Emil
```

It is 95% the same as HTML, with a handful of differences that will each catch
you out exactly once:

| HTML | JSX | Why |
| --- | --- | --- |
| `class="btn"` | `className="btn"` | `class` is a reserved word in JavaScript |
| `for="email"` | `htmlFor="email"` | same reason |
| `<br>` | `<br />` | every tag must be closed |
| `onclick="doIt()"` | `onClick={doIt}` | camelCase, and you pass the function itself |
| `<!-- comment -->` | `{/* comment */}` | |

And the big one: **curly braces `{ }` inside JSX mean "run JavaScript here and
print the result"**.

### Styling: two kinds of CSS

| Where | What it is | Use it for |
| --- | --- | --- |
| `src/index.css` | Plain global CSS, exactly as you know it | Colours, resets, `body`, anything shared |
| `*.module.css` | A **CSS Module** — scoped to one component | Styles belonging to one component |

A CSS Module is still just CSS. The only difference is that the class names
belong to one component, so two components can both use `.button` without
fighting. You use it from JavaScript:

```jsx
import styles from "./Button.module.css";

<button className={styles.button}>
```

That is why the components import a `styles` object instead of writing
`className="button"` directly.

---

## 7. The five things you actually need to learn

This is the whole of beginner React. Everything else is detail.

### 1. A component is a function that returns JSX

```jsx
export default function SimpleButton() {
  return <button>Click me</button>;
}
```

Capital letter on the name, `export default` so other files can import it.
Then use it like an HTML tag: `<SimpleButton />`.

### 2. Props are the arguments you pass in

```jsx
function Button({ text, variant = "primary" }) {   // receive
  return <button className={variant}>{text}</button>;
}

<Button text="Save" variant="primary" />           // pass
<Button text="Send" />                             // variant defaults
```

Props come **from outside** and the component can never change them.

### 3. State is what a component remembers

```jsx
const [count, setCount] = useState(0);
```

`count` is the value, `setCount` is the only way to change it.

> **The single most important rule in React:** never write `count = count + 1`.
> React would not notice and the screen would not update. Always call
> `setCount(...)` — that is what tells React to redraw.

### 4. Lists come from `.map()`, and need a `key`

```jsx
{ducks.map((duck) => (
  <DuckCard key={duck.id} name={duck.name} />
))}
```

The same `.map()` you already know, except you map data to JSX. Every item
needs a unique `key` so React can tell them apart.

### 5. Data flows down, events flow up

```
App  ---- data, via props ---->  DuckCard
App  <--- events, via functions ---  DuckCard
```

A child cannot change its own props. So when a child needs to change
something, the parent hands it a **function** to call:

```jsx
// in App.jsx — the state lives here
<DuckCard name={duck.name} onHire={handleHire} />

// in DuckCard.jsx — just calls what it was given
<Button text="Hire" onClick={() => onHire(name)} />
```

This is called **lifting state up**: state lives in the closest component
*above* everyone who needs it. It is the concept people find hardest, and it
is also the one that makes everything else click. `src/App.jsx` and
`src/components/DuckCard.jsx` are a worked example — read them together.

---

## 8. Your first task

You absolutly dont have to do this, it is just an example on what to do to play wround with it. 
Do these in order, on your own branch. Each one builds on the last, and they
get harder.

**Warm-up**

1. **Change something.** Open `src/App.jsx`, edit the `<h1>`, save, watch the
   browser.
2. **Reuse a component.** Add another `<Button />` with your own `text`.
3. **Add your own duck** to the `INITIAL_DUCKS` array in `App.jsx`. Notice you
   did not touch any component — the list just grows. That is the payoff.

**Props**

4. **Make your own component.** Create `src/components/DuckBadge.jsx` that
   takes a `label` prop and returns a styled `<span>`. Give it a
   `DuckBadge.module.css`. Use it inside `DuckCard.jsx`.
5. **Add a prop to an existing component.** Give `Button` a `size` prop
   (`"small"` or `"large"`) that picks a different CSS class.

**State**

6. **Count down.** Add a minus button to `Counter.jsx` that never goes below 0.
7. **Filter the list.** Add a "Show only available" checkbox in `App.jsx`.
   You will need a new piece of state (`useState(false)`) and `.filter()`.
   Think about *where* that state has to live before you write it.

**The real one**

8. **Add a duck from a form.** An input and an "Add duck" button that pushes a
   new duck into the list. You will need:
   - state for the input value (a "controlled input": `value` + `onChange`)
   - a new id for each duck
   - `setDucks([...ducks, newDuck])` — build a **new** array, never `.push()`
     into the old one



> Stuck on 7 or 8? That is the expected place to get stuck. Ask in the group.

---

## 9. When something breaks

This is normal, and it happens to everyone all day. Read the error message —
React's errors are genuinely good and usually name the file and line.

| What you see | What it usually is |
| --- | --- |
| `command not found: node` / `npm` | Node is not installed, or you need a brand new terminal. See 2.1. |
| `command not found: pnpm` | See 2.2. Open a new terminal after installing. |
| Blank white page | Open DevTools (`F12`) and look at the Console tab. There is an error waiting for you there. |
| `Each child in a list should have a unique "key" prop` | A `.map()` without `key={...}`. See section 7.4. |
| `Objects are not valid as a React child` | You put a whole object inside `{ }`. You probably meant `{duck.name}`, not `{duck}`. |
| `Cannot read properties of undefined` | You used a prop that was never passed in, or misspelled it. Check both sides. |
| `Too many re-renders` | You called a `setX` directly during render. It is almost always `onClick={handleClick()}` — remove the `()`. |
| `Adjacent JSX elements must be wrapped` | You returned two tags side by side. Wrap them in a `<div>` or in `<> ... </>`. |
| Nothing happens when I click | Did you pass the function (`onClick={fn}`) or call it (`onClick={fn()}`)? |
| I changed state but the screen is the same | You mutated instead of replacing. `duck.busy = true` does nothing — build a new object/array. See `handleHire` in `App.jsx`. |
| `Module not found` / `Failed to resolve import` | Typo in the path, or the capital letters do not match. `DuckCard.jsx` ≠ `duckcard.jsx`. |
| `Port 3000 is already in use` | The server is already running in another terminal tab. Use that one, or `Ctrl + C` it. |
| Everything is broken and makes no sense | `Ctrl + C`, delete `node_modules`, `pnpm install`, `pnpm dev`. |

**Install React DevTools** (browser extension, Chrome and Firefox). It adds a
"Components" tab to DevTools where you can see your component tree and inspect
the actual props and state of any component live. It turns "why is this
empty?" into a five-second question.

Still stuck? **Explain the problem out loud to a rubber duck.** You will often
solve it halfway through the sentence. That is literally what this repo is
named after. If the duck fails, ask in the group — and paste the full error
message as text, not a screenshot of half of it.

---

## 10. Emil's super cool terminal setup

Completely optional. But since we have started using the terminal for Git, it
is worth making it a nice place to be. Everyone in my companies runs roughly
this setup. It will make everything easier. This is a "big" setup, so dont prioritize this unless you want a good setup for the future. 

This is **macOS / Linux** (zsh). On Windows it works inside WSL or Git Bash
with some adjustments.

### 10.0 Homebrew (Mac package manager)

Everything below installs through Homebrew, so start here:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

At the end it prints two `echo ... >> ~/.zprofile` commands. **Run them**,
otherwise `brew` will not exist in your next terminal.

### 10.1 A terminal that actually looks good

Three pieces: Oh My Zsh (the plugin framework), Powerlevel10k (the prompt), and
autosuggestions (ghost-text completion from your history).

**Oh My Zsh:**

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

**Powerlevel10k** — the prompt that shows your Git branch, whether you have
uncommitted changes, which Node version you are on, and how long the last
command took:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```

**zsh-autosuggestions** — as you type, it greys out the rest of a command you
have run before. Press `→` to accept it. You will use this constantly:

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions \
  "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions"
```

Then open `~/.zshrc` (`code ~/.zshrc` or `nano ~/.zshrc`) and set these two
lines:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(git zsh-autosuggestions)
```

Restart the terminal. Powerlevel10k runs a setup wizard and asks you a pile of
questions about how it should look — just pick whatever you think is prettiest.
It will want to install a font (MesloLGS NF); say yes, then set that font in
your terminal's settings. Without it the icons show up as little boxes.

To run the wizard again later: `p10k configure`

### 10.2 `z` — jump to any folder

Instead of:

```bash
cd ~/Koding/Noroff/rubber-duck-debugging-agency
```

you type:

```bash
z rubber
```

`z` remembers every folder you visit and guesses which one you mean from a
fragment of the name. After a week you will almost never type a full path again.

```bash
brew install z
```

Then add this line to `~/.zshrc`:

```bash
. $HOMEBREW_PREFIX/etc/profile.d/z.sh
```

Restart the terminal. `z` has to learn your folders first, so `cd` around
normally for a day and it gets good fast.

### 10.3 `thefuck` — fix the command you just mistyped

You type a command, you typo it, it fails. Instead of writing the whole thing
again, type `fuck` and it suggests the corrected command. Press Enter.

```bash
$ git brnch
git: 'brnch' is not a git command.

$ fuck
git branch [enter/↑/↓/ctrl+c]
```

```bash
brew install thefuck
```

Then add this line to `~/.zshrc`:

```bash
eval "$(thefuck --alias)"
```

Restart the terminal. (You can rename it to something more work-appropriate:
`eval "$(thefuck --alias fix)"` — then the command is `fix`.)

### 10.4 Amazon Q — AI in your terminal

Amazon Q Developer CLI (recently rebranded **Kiro CLI**) does two genuinely
useful things:

- **Smart autocomplete.** As you type `git`, `pnpm`, `brew` etc. it shows a
  dropdown of the real subcommands and flags with descriptions. You stop
  guessing flags.
- **Plain-language commands.** You describe what you want, it writes the
  command:

```bash
q chat                      # ask it anything, in the terminal
q translate "undo my last commit but keep the changes"
```

Install it from <https://aws.amazon.com/q/developer/>. The free tier is fine —
it wants an AWS Builder ID, which you can make with just an email address. On
Mac the installer adds a block at the top and the bottom of your `~/.zshrc` —
leave those blocks exactly where they are, it says so in the comments.

Check it works:

```bash
q --version
```

> If you would rather stay vendor-neutral, GitHub Copilot CLI and Claude Code
> do similar things. The point is the same: you should not have to memorise
> flags.

### 10.5 The result

Your `~/.zshrc` ends up with roughly this in it:

```bash
# Amazon Q / Kiro CLI pre block — keep at the top
[[ -f "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.pre.zsh" ]] \
  && builtin source "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.pre.zsh"

# z — jump to folders
. $HOMEBREW_PREFIX/etc/profile.d/z.sh

export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"
plugins=(git zsh-autosuggestions)
source $ZSH/oh-my-zsh.sh

# thefuck — fix the last command
eval "$(thefuck --alias)"

# powerlevel10k settings, written by the wizard
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# Amazon Q / Kiro CLI post block — keep at the bottom
[[ -f "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.post.zsh" ]] \
  && builtin source "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.post.zsh"
```

Whenever you edit `~/.zshrc`, either restart the terminal or run:

```bash
source ~/.zshrc
```

---

## Where to go next

Once components, props and state feel comfortable:

- **React Router** — multiple pages/URLs in a React app. The natural next step.
- **`useEffect`** — running code when a component appears, e.g. fetching data
  from an API.
- **Then Next.js**, with Adrian. It adds routing, a server and a build setup on
  top of everything you learned here — and it will make far more sense once you
  know what it is doing for you.

Links:

- [React docs — Learn React](https://react.dev/learn) — excellent, start here
- [React docs — Thinking in React](https://react.dev/learn/thinking-in-react) —
  read this one when the exercises stop being obvious
- [Vite docs](https://vite.dev/guide/)

Ask questions in the group. There are no stupid ones in week one. 🦆
