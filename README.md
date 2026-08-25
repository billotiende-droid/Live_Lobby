# ChemShaa Live Lobby

ChemShaa Live Lobby is a focused, mobile-first waiting-room interface for a live broadcast. It presents a clear live state, an animated visual emitter, and a single **Tune In** action in a compact, high-contrast layout.

Chemshaa Live Lobby Preview Mobile & Desktop View Screenshot: (https://github.com/billotiende-droid/Live_Lobby/issues/2)

Live Demo Url : (https://live-lobby-chemshaa.vercel.app/)

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Live data and backend integration](#live-data-and-backend-integration)
- [Accessibility and responsive design](#accessibility-and-responsive-design)

## Features

- **Live-lobby experience** — a dedicated “LIVE NOW” state and a direct Tune In call to action.
- **Animated emitter** — layered, continuously pulsing rings and a centre beacon powered by Framer Motion.
- **Branded header** — ChemShaa identity and an accessible options control.
- **Responsive app shell** — a full-height mobile layout, centred within a maximum 430px canvas on larger screens.
- **Interaction feedback** — entry animation, hover/tap motion, and visible keyboard focus states.
- **Integration-ready state boundary** — all future live-session behaviour is isolated behind `useLobbyState`.

## Tech stack

| Area | Technology | Purpose |
| --- | --- | --- |
| UI | React 19 + TypeScript | Component-based, typed interface |
| Build | Vite 8 | Local development and production builds |
| Styling | Tailwind CSS v4 | Utility-first responsive styling and design tokens |
| Animation | Framer Motion | Entrance, pulse, hover, and tap animations |
| Formatting | oxfmt | Source formatting |

Google Fonts supplies Inter for UI text and Playfair Display for the brand wordmark. Brand colour and font tokens are defined in `src/index.css`.

## Architecture

The application uses a deliberately small presentation/state split:

```text
main.tsx
  └─ App.tsx
      ├─ useLobbyState()          live-session actions and future server state
      ├─ HeaderNav                static brand/navigation UI
      ├─ PulsingEmitter           presentational motion graphic
      └─ LobbyControls            live copy and Tune In button
            └─ handleTuneIn()     supplied by useLobbyState
```

`App.tsx` owns page composition only. Presentational components receive only the values or callbacks they need, keeping them reusable and preventing transport concerns from leaking into the UI.

## Project structure

```text
src/
├── App.tsx                       Lobby page composition
├── main.tsx                      React application entry point
├── index.css                     Tailwind import, global styles, and theme tokens
├── components/
│   ├── HeaderNav.tsx             Branded header and options button
│   ├── LobbyControls.tsx         Live copy and Tune In control
│   └── PulsingEmitter.tsx        Animated concentric emitter
└── hooks/
    └── useLobbyState.ts          Live-session state and integration seam
```

## Getting started

### Prerequisites

- Node.js compatible with the project toolchain
- pnpm or another package manager supported by the workspace

### Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm format
```

The development server runs through Vite. `pnpm build` creates a production build and is the recommended check before deployment.

## Live data and backend integration

### Current implementation

`src/hooks/useLobbyState.ts` is the single place reserved for lobby behaviour. At present it returns:

```ts
{
  isLive: true,
  handleTuneIn: () => void
}
```

`handleTuneIn` is intentionally a placeholder for navigation or stream-start behaviour. No backend, WebSocket, Server-Sent Events (SSE), authentication, or persistence layer is connected yet.

### Recommended WebSocket placement

Keep the WebSocket lifecycle and server-event translation in `useLobbyState.ts` (or a small client module it imports). Then expose a UI-friendly state shape from the hook and pass the required fields to components through `App.tsx`.

```text
WebSocket / API client
  → useLobbyState (connect, validate events, manage cleanup)
  → App (maps state to the interface)
  → HeaderNav / LobbyControls / PulsingEmitter (render only)
```

Suggested server events and client state:

| Server event | Example payload | Hook state / UI use |
| --- | --- | --- |
| `lobby.snapshot` | `{ isLive, viewerCount }` | Initial state after connection |
| `stream.status` | `{ isLive, streamUrl? }` | Live copy and entry availability |
| `viewer.count` | `{ viewerCount }` | Optional audience count in controls |
| `stream.started` | `{ streamUrl }` | Enable Tune In and retain destination |
| `stream.ended` | `{ reason? }` | Disable entry and show an offline state |

An eventual hook contract can expand without changing the visual components:

```ts
interface LobbyState {
  isLive: boolean
  viewerCount: number | null
  connectionStatus: "connecting" | "connected" | "disconnected" | "error"
  handleTuneIn: () => void
}
```

Implementation considerations:

- Create the connection inside a `useEffect`; close it in the cleanup function.
- Validate incoming messages before updating state, and safely ignore unknown event types.
- Reconnect with a bounded backoff strategy and surface `connectionStatus` when it affects the experience.
- Obtain the socket URL and any short-lived access token from environment configuration or an authenticated API endpoint; do not embed secrets in the client.
- Make `handleTuneIn` navigate to the trusted `streamUrl`, open the player, or invoke the host application's stream SDK.

For non-bidirectional updates, the same hook boundary can use SSE or periodic HTTP polling instead; the component API can remain unchanged.

## Accessibility and responsive design

- The primary heading is associated with its section via `aria-labelledby`.
- The visual emitter is correctly hidden from assistive technology because it is decorative.
- Interactive controls have descriptive labels and keyboard-visible focus treatment.
- The layout uses `min-h-dvh`/`h-dvh` to behave more reliably in mobile browser viewports.
- The central canvas is constrained to 430px on desktop while remaining full width on mobile.

## Development notes

- Use Tailwind utilities in JSX; global styles and theme tokens belong in `src/index.css`.
- Export presentational React components as named exports and App.tsx as default export
- Keep networking and domain logic out of display components. Add it to `useLobbyState` or a service imported by that hook.
