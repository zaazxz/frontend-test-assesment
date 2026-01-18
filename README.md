# Mini Flow Builder (Apache NiFi-inspired)

A simplified flow builder inspired by Apache NiFi, focusing on core UI interactions such as drag & drop processors, connecting nodes, and publishing flow designs.

This project is built as a technical test to demonstrate interactive UI development, state management, and UX-oriented flow design.

---

## Tech Stack

- **React + TypeScript**
- **React Flow** – canvas, nodes, and connections
- **Zustand** – state management
- **HeroUI** – UI components (buttons, modal, inputs)
- **Next.js** - Pages Router

---

## Features Overview

- Authentication (mock backend)
- Drag & drop processor nodes
- Connect processors with directional edges
- Validation before publish
- Publish flow design as JSON payload

---

## Architectural Notes & Trade-offs

Due to time constraints, some parts of the application logic, UI handling, 
and state management are intentionally kept in a single module.

The main focus of this implementation is:
- Feature completeness
- Correct UX flow
- Stable interactive behavior

Instead of prematurely optimizing the architecture, priority was given to 
ensuring the core user experience works end-to-end as expected.

---

## Current State

- Authentication flow implemented with mocked backend
- Token-based protected routes (with session expiration handling)
- Zustand is used for:
  - Authentication state
  - Core flow data (nodes & edges)
- Flow canvas supports:
  - Adding processors via drag & drop
  - Moving processors with persisted position
  - Creating and deleting connections
  - Deleting nodes along with their connections
- Publish flow includes validation and simulated backend request
- TypeScript is applied where it directly impacts correctness and stability

---

## Planned Improvements

If this project were to be continued, the following improvements would be applied:

- Refactor large modules into domain-based Zustand slices:
  - nodes
  - edges
  - UI state
  - publish & validation
- Use Zustand as the single source of truth for all application data state
- Increase TypeScript strictness and remove remaining implicit `any` usage
- Separate business logic from UI components
- Gradually refactor UI components using **Atomic Design** principles
- Improve test coverage for flow validation logic

---

## Why Not Refactor Now?

This project is time-boxed.

The goal of this submission is to demonstrate:
- Understanding of state management concepts
- Interactive canvas behavior using React Flow
- UX-driven flow building experience
- Awareness of architectural trade-offs

Refactoring into smaller stores, slices, and atomic components is a mechanical
and low-risk task that can be safely executed once the feature set stabilizes.
For this reason, feature completeness and UX correctness were prioritized.

---

## Minimum Specifications Implemented

### Processor (Node)
- Can be added via drag & drop
- Displays label
- Selectable
- Draggable with persisted position
- Deletable (removes related connections)

### Connection (Edge)
- Directional connection (A → B)
- Selectable
- Deletable
- Invalid connections are blocked:
  - Self-connection
  - Invalid drop target

### Publish Validation
- ❌ Canvas empty → publish blocked
- ❌ Unconnected processor → publish blocked
- ✅ At least 1 processor & 1 connection → publish allowed

---

## How to Install & Run

### Prerequisites
- Node.js >= 18 | I use Node.js lts (24.12.0)
- npm / pnpm / yarn

### Installation

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Run Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

### Run Development Server
http://localhost:3000

## Notes :
- Backend API is mocked / simulated
- No real authentication service is used
- This project is intended for demonstration and evaluation purposes

---

## Author :
### Built by Zaazxz (Mirza Qamaruzzaman)


