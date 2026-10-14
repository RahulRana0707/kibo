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

# Local servers

- Fixed ports: the web app on **3050** (`next dev --port 3050`) and the API on **8090** (`PORT` in `apps/api/.env`). The database is on 5435 (below).
- Start order: `pnpm db:up`, then `pnpm dev` in `apps/api`, then `pnpm dev` in `apps/web`.

# Local database

- Postgres 17 runs in Docker (`docker-compose.yml`, container `kibo-postgres`, host port 5435, user, password and database all `kibo`). Don't use Homebrew Postgres for Kibo.
- Start it with `pnpm db:up` and stop it with `pnpm db:down`. The data lives in the `kibo_pgdata` volume, so stopping it keeps the data.
- Schema changes are Prisma migrations in `apps/api/prisma/migrations`. Create one with `pnpm --filter api db:migrate` (`prisma migrate dev`). Never use `db push`. After creating the volume fresh, the same command applies every migration; then seed the development account below.
- API end-to-end tests (`pnpm --filter api test:e2e`) build the API, start it on port 8091 against a separate `kibo_test` database (created and migrated automatically), and never touch dev data. Postgres must be running.

# Development account

- Use this account for every local login and browser test. Don't create throwaway users.
  - Email: `mira@kibo.test`
  - Password: `kibo-dev-pass-1`
  - Name: Mira Okafor (the design's sample creator)
- It lives in the local Postgres only. After a database reset, recreate it with the API running: `pnpm --filter api seed:dev-user`. The script is safe to run again. It refuses to run when `NODE_ENV=production`.
