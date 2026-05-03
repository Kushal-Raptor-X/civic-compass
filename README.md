# Civic Compass 🧭

An interactive Election Process Education assistant that guides users through every stage of the election process like a GPS navigation system — step by step, with AI-powered answers at each stop.

## Chosen Vertical

**Election Process Education**

## What It Does

Civic Compass walks users through the six essential stages of an election — from voter registration all the way to post-election results — using a GPS-style navigation metaphor. At each step, users see clear descriptions, practical tips, and common mistakes to avoid, giving them the confidence to participate fully. An integrated AI assistant powered by Google Gemini answers context-specific questions in real time, so users never feel lost on their civic journey.

## Approach & Logic

The application is built as a **step-by-step state machine**: a single `currentStepIndex` drives which content is displayed, and navigation buttons move the user forward or backward through six well-defined election stages. Each step is a self-contained data object with educational content, tips, and warnings.

**Gemini integration** is scoped per step — the system prompt tells the AI to answer only about the currently active election stage, keeping responses focused and relevant. User queries are **sanitized** (trimmed, HTML-stripped, and truncated to 500 characters) before being sent to the API to prevent injection and abuse.

If the Gemini API is unavailable (missing key, network error, quota exceeded), the app **degrades gracefully** by displaying a friendly fallback message instead of crashing. All error states are surfaced through accessible ARIA-live regions so screen readers announce changes.

## How To Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/civic-compass.git
   cd civic-compass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get a free Gemini API key**
   Visit [Google AI Studio](https://aistudio.google.com) → Create an API key.

4. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and replace `your_gemini_api_key_here` with your actual key.

5. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open the URL shown in the terminal (usually `http://localhost:5173`).

6. **Run tests**
   ```bash
   npm test
   ```

## Google Services Used

| Service | Purpose |
|---------|---------|
| **Google Gemini API** | AI-powered Q&A responses scoped to each election step |
| **Google Fonts** | Inter typeface (weights 400, 600, 700) for clean typography |
| **Firebase Hosting** | Production deployment with SPA rewrites and security headers |
| **Google Analytics 4** | Page view and user interaction tracking (`page_view`, `step_navigation`, `ai_question_asked`, `ai_response_received`) via `VITE_GA_MEASUREMENT_ID` |

## Architecture

```
src/
├── steps.js   → Data layer: array of 6 election step objects
├── gemini.js  → Service layer: sanitizeInput() + askGemini() API wrapper
├── ui.js      → View layer: pure DOM rendering functions (no side effects)
└── main.js    → Orchestration: state management, event listeners, init
```

- **`steps.js`** — Pure data module exporting the 6-step election journey. Each step contains structured content (title, description, tips, common mistakes).
- **`gemini.js`** — Handles all Gemini API communication. Exports `sanitizeInput()` as a pure, testable function and `askGemini()` which builds a scoped system prompt and returns AI text or a fallback.
- **`ui.js`** — Stateless rendering functions that accept data and update the DOM. Zero side effects at import time, making them easy to test and reason about.
- **`main.js`** — The entry point and orchestrator. Maintains a single `state` object, initializes the UI on `DOMContentLoaded`, and wires all event listeners programmatically (no inline handlers).

## Assumptions

- User has an internet connection for Gemini API calls and Google Fonts.
- Content is **general election education** — not specific to any single country or jurisdiction.
- The app **degrades gracefully** if the Gemini API is unavailable: core step content is always visible, only AI Q&A is affected.
- Modern browser support (ES modules, CSS custom properties, `<progress>` element).

## Security Considerations

- **API key isolation** — The Gemini API key is stored exclusively in `.env` (git-ignored) and accessed via `import.meta.env`. It is never logged, hardcoded, or exposed in client bundles beyond the build-time replacement.
- **Input sanitization** — All user input is trimmed, HTML-stripped, and truncated before reaching the API to prevent injection and abuse.
- **CSP-friendly** — No inline scripts, no inline styles, no `eval()`. Compatible with strict Content Security Policy headers.
- **Security headers** — Firebase Hosting is configured with `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Referrer-Policy: strict-origin-when-cross-origin`.
