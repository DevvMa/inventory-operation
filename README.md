# Inventory Operations Console

React learning prototype for a single inventory workflow. Current implementation status and verification: [project documentation](docs/inventory-console/README.md).

## Local development

Use Node 22.12 or later within major 22 and npm. Install the locked dependencies with npm ci.

```text
npm run dev       # local Vite development server
npm test          # Vitest watch mode
npm run test:run  # tests once
npm run build    # production build into dist
```

React components use JSX; tests use Vitest, React Testing Library, and jsdom. Automated DOM tests do not prove browser layout or CORS behavior. See [TDD workflow](docs/inventory-console/08-TDD-WORKFLOW.md) for the adapted book principles and actual cycle evidence.

Changes go through a focused branch and pull request. See [Git workflow](docs/inventory-console/09-GIT-WORKFLOW.md). No deployment or persistent backend is configured.
