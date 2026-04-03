# 01Cloud Admin

01Cloud Admin is a React-based administrative console for managing the 01Cloud platform. It provides operational views and workflows for users, subscriptions, plugins, clusters, resources, DNS, registries, support tickets, organizations, billing, and related platform settings.

<!-- This repository contains the frontend application only. It connects to a separately deployed 01Cloud API gateway and loads runtime configuration from `public/config.js`. -->

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Runtime Configuration](#runtime-configuration)
- [Available Commands](#available-commands)
- [Docker](#docker)
- [Quality and Security Checks](#quality-and-security-checks)
- [Deployment Notes](#deployment-notes)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## Overview

<!-- The application is built with Create React App, React 16, Redux, Redux Saga, Material-UI v4, Auth0, and i18next.  -->
This is a frontend app written primarily in React, TypeScript, and JavaScript. It is designed as an authenticated admin interface for 01cloud platform operators and internal teams who need to manage infrastructure, tenants, billing, marketplace items, and support workflows from a single web console.

## Key Features

- Authentication with Auth0-based login flow and legacy mode support
- Dashboard and platform administration screens
- User, organization, invitation, and subscription management
- Cluster lifecycle workflows, DNS, registries, and load balancer views
- Plugin and version management
- Billing, invoices, gateways, deductions, and promo code administration
- Support ticket workflows
- Internationalization support with `i18next`
- Docker-based production build flow

## Tech Stack

- React 16
- React-Scripts
- Redux and Redux Saga
- Material-UI v4
- Auth0 React SDK
- Axios
- Jest and React Testing Library
- Docker
- Pre-commit, CodeSpell, Gitleaks, Stylelint, and Trivy

## Project Structure

```text
.
|-- public/          # Static assets and runtime configuration template
|-- src/
|   |-- components/  # Reusable UI components
|   |-- containers/  # App shell, routing, and route protection
|   |-- pages/       # Feature screens and page-level state
|   |-- redux/       # Store configuration
|   |-- services/    # Axios setup and API helpers
|   |-- constants/   # Routes, endpoints, and app-wide constants
|   |-- theme/       # Material-UI theme configuration
|   `-- locales/     # Translation files
|-- .github/         # GitHub Actions workflows
|-- Dockerfile
`-- .pre-commit-config.yaml
```

## Getting Started

### Prerequisites

- Node.js 12.x or a compatible version already validated with this codebase
- npm 6.x or later

The Dockerfile currently uses `node:12-slim`, which is the safest version to match for local development unless you have already validated a newer Node.js version with this app.

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the runtime config file from the sample:

   ```bash
   cp public/config.sample.js public/config.js
   ```

   On Windows PowerShell:

   ```powershell
   Copy-Item public\config.sample.js public\config.js
   ```

3. Update `public/config.js` with values for your environment.

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Runtime Configuration

The application reads runtime settings from `public/config.js`, which is loaded by [`public/index.html`](/public/index.html). This file is intentionally gitignored, so local and deployed environments can provide different values without rebuilding the app.

Start from [`public/config.sample.js`](/public/config.sample.js).

### Required Settings

| Key | Description |
| --- | --- |
| `REACT_APP_RESTAPI_ENDPOINT` | Base URL of the 01Cloud API gateway. Do not include a trailing slash. |
| `REACT_APP_AUTH0_DOMAIN` | Auth0 tenant domain. |
| `REACT_APP_AUTH0_CLIENT_ID` | Auth0 application client ID. |
| `REACT_APP_AUTH0_AUDIENCE` | Auth0 API audience / identifier. |
| `REACT_APP_01CLOUD_CONSOLE_URL` | Base URL of the primary 01Cloud console used for deep links. |
| `REACT_APP_SOCKET_IO_ENDPOINT` | WebSocket endpoint used for cluster workflow updates. |

## Available Commands

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server. |
| `npm run build` | Creates a production build. |
| `npm run generate-build-meta` | Generates build metadata used by the app. |
| `npm run lint` | Run ESLint against `src/**/*.js`. |
| `npm run lint:fix` | Runs ESLint with auto-fix for `src/**/*.js`. |
| `npm test` | Run the test suite.
| `npm run test:coverage` | Intended to run tests with coverage. Review current script behavior before depending on it in CI. |

## Docker

Build the image:

```bash
docker build -t 01cloud-admin .
```

The multi-stage Dockerfile:

- installs dependencies
- runs lint and test stages
- creates a production build
- serves the built assets from NGINX in the final image

If you deploy with Docker, make sure `public/config.js` is available in the served static assets for the target environment.

## Quality and Security Checks

This repository includes a pre-commit configuration in [`.pre-commit-config.yaml`](.pre-commit-config.yaml) and a GitHub Actions workflow in [`.github/workflows/pre-commit.yaml`](/.github/workflows/pre-commit.yaml).

Configured checks include:

- YAML validation and other standard pre-commit hooks
- CodeSpell
- Gitleaks secret scanning
- Stylelint for CSS and SCSS
- Trivy filesystem scanning for vulnerabilities, secrets, and misconfigurations

To install the local hooks:

```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files
```

## Deployment Notes

- `public/config.js` is ignored by Git and should be created per environment.
- The app registers a service worker in production, so browser cache invalidation should be considered during rollouts.
- The frontend expects a working backend API, Auth0 configuration, and WebSocket endpoint where applicable.
- Because the application depends on runtime configuration, promoting the same build artifact across environments is possible if `config.js` is injected or replaced at deploy time.

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request. By participating in this project, you agree to abide by its terms.

If you have an idea, found a bug, or want to improve the project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Security

If you discover a security vulnerability, please do **not** open a public issue. Instead, refer to our [Security Policy](SECURITY.md) for responsible disclosure instructions.

## License

This project is licensed under the [Apache 2.0 License](LICENSE).

Copyright © 2026 BerryBytes and 01cloud-admin contributors.
