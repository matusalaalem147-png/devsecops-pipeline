# devsecops-pipeline

A small Node.js + Express API used to demonstrate a secure CI/CD pipeline with GitHub Actions.

## Endpoints

| Method | Path         | Description                  |
|--------|--------------|------------------------------|
| GET    | `/health`    | Health check                 |
| GET    | `/tasks`     | List tasks                   |
| GET    | `/tasks/:id` | Get one task (validated id)  |
| POST   | `/tasks`     | Create a task (validated)    |

## Commands

```bash
npm ci          # install exact versions from package-lock.json
npm test        # run the tests (node:test)
npm run lint    # run ESLint
npm run build   # syntax-check the app (the API has no compile step)
npm start       # start on http://127.0.0.1:3000
```
