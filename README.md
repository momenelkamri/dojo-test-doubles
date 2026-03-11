# Test Doubles (TypeScript)

A kata exercise for practicing test doubles: fakes, stubs, dummies, spies, and mocks.

## Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run test`         | Run all tests once                       |
| `npm run test:watch`   | Run all tests in watch mode              |
| `npm run coverage`     | Run tests and generate a coverage report |
| `npm run typecheck`    | Type-check without emitting files        |
| `npm run lint`         | Lint with ESLint                         |
| `npm run lint:fix`     | Lint and auto-fix with ESLint            |
| `npm run format`       | Format all files with Prettier           |
| `npm run format:check` | Check formatting without writing         |
| `npm run check`        | Typecheck, lint, format check, and test  |
| `npm run build`        | Compile TypeScript to JavaScript         |
| `npm run start`        | Run the compiled output                  |

## Editor Setup

### VSCode

Install the following extensions:

- **Prettier**: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- **ESLint**: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

To enable format-on-save and auto-fix linting issues, add this to your workspace or user `settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### IntelliJ / WebStorm

#### Prettier

1. Go to **Settings** > **Languages & Frameworks** > **JavaScript** > **Prettier**
2. Set the Prettier package to the one in `node_modules` (e.g. `node_modules/prettier`)
3. Check **On save** to enable format-on-save

#### ESLint

1. Go to **Settings** > **Languages & Frameworks** > **JavaScript** > **Code Quality Tools** > **ESLint**
2. Select **Automatic ESLint configuration**
3. Check **Run eslint --fix on save** to auto-fix issues on save
