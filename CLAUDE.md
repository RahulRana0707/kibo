@AGENTS.md

# Git and GitHub

- This repo belongs to the GitHub account **RahulRana0707** (`github.com/RahulRana0707/kibo`). Use only that account for every push, pull request, issue and `gh` command here, never the other accounts logged in on this machine.
- Pushes: the repo's local git config makes `git push` authenticate as RahulRana0707 (a credential helper that runs `gh auth token --user RahulRana0707`; no token is stored). Don't change or bypass it. On a fresh clone, set it up again:

  ```sh
  git config --local credential.https://github.com.helper ""
  git config --local --add credential.https://github.com.helper '!f() { test "$1" = get || exit 0; echo username=RahulRana0707; echo "password=$(gh auth token --user RahulRana0707)"; }; f'
  ```
- `gh` commands: run them as RahulRana0707 without switching the active account, by prefixing `GH_TOKEN="$(gh auth token --user RahulRana0707)"`.
- Never add a Claude or Anthropic co-author or attribution line to commit messages or PR descriptions.
