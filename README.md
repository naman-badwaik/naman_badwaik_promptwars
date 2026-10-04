# BlindSpot AI — The Epistemic Decision Mirror

> **"See what you're not seeing before you commit."**  
> *Built for PromptWars 2026 Hackathon | The Blind Spot Challenge*

---

## 🎯 Problem Statement — The Blind Spot

When facing consequential dilemmas, people habitually decide based on what is top of mind—anchoring on immediate preferences while overlooking unstated assumptions, second-order consequences, and asymmetric risks.

**BlindSpot AI** is an AI-powered thinking companion that challenges human reasoning rather than offloading it. It interrogates the mental models behind a dilemma, spots unexamined biases, presents outside perspectives, and poses catalytic Socratic questions.

> **Core Philosophy:**  
> AI reveals. User reflects. User decides.  
> *The AI never tells the user what to do.*

---

## 💡 What BlindSpot AI Does

1. **Frames the Dilemma**: The user articulates their fork in the road, their instinctive leaning, relevant context, and underlying constraints.
2. **Audits Cognitive Architecture**: Google Gemini serves as an *epistemic auditor*, stress-testing premises against cognitive biases (e.g. optimism bias, sunk-cost fallacy, availability heuristic).
3. **Classifies Reversibility**: Categorizes the decision using Jeff Bezos' Two-Way Door framework:
   - **Type 1 Door**: One-way door — irreversible or high stakes; requires deliberate pause.
   - **Type 2 Door**: Two-way door — reversible; safe for rapid experimentation.
4. **Delivers a 6-Pillar Blind Spot Matrix**:
   - **What You May Be Missing**: Overlooked variables and systemic friction.
   - **Unexamined Assumptions**: Stated premises contrasted with counter-evidence checks.
   - **Risks & Trade-offs**: Asymmetric downside and actionable mitigations.
   - **Alternative Perspectives**: Adversarial lenses (e.g., an objective skeptic, future self in 5 years).
   - **Catalytic Questions**: Socratic probes designed to unlock honest self-examination.
   - **Mind-Shift Triggers**: Concrete signals ("If this changes...") that justify a pivot.
5. **Challenge My Thinking (Second-Level Stress Test)**: A dedicated adversarial audit focusing on the strongest assumption under fire, critical unknown variables, cognitive inversion, and a pre-mortem probe before final commitment.
6. **Interactive Reflection Scratchpad**: Lets users actively challenge their own reasoning under each catalytic probe.
7. **Portable Decision Dossier**: One-click local Markdown export and clipboard copy without transmitting personal reflections to any server.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router (Vercel-native serverless architecture, zero persistent server).
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Midnight-slate aesthetic, custom glass surfaces, 60fps GPU-accelerated micro-interactions).
- **AI Engine**: [Google Gemini Flash](https://ai.google.dev/) (`gemini-flash-lite-latest`) via the official `@google/genai` SDK with strict JSON Schema output enforcement and client connection reuse.
- **Validation**: [Zod](https://zod.dev/) (Comprehensive server-side and client-side boundary defense).
- **Icons**: [Lucide React](https://lucide.dev/) (Tree-shaken via Next.js package optimization).
- **Testing**: [Vitest](https://vitest.dev/) (34 automated unit tests for validation, schemas, pipelines, and export generation).

---

## 📂 Project Structure

```
BlindSpotAI/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts        # Stateless Vercel serverless function (Gemini + Zod + 25s timeout)
│   ├── globals.css             # Dark theme tokens, keyframes & reduced-motion rules
│   ├── layout.tsx              # Root HTML shell & SEO metadata
│   └── page.tsx                # Main client orchestrator & state manager
├── components/
│   ├── Navbar.tsx              # Minimal brand header with live cognitive status indicator
│   ├── HeroSection.tsx         # Memoized problem framing, value proposition & smooth scroll CTA
│   ├── ThinkingField.tsx       # Memoized cognitive vector & ambient radiance field
│   ├── PresetScenarios.tsx      # Memoized 3 realistic starter dilemmas (Career, College, Purchase)
│   ├── DecisionForm.tsx        # 4-field structured dilemma intake canvas with counters
│   ├── LoadingState.tsx        # Rotating cognitive thinking state with accessible status
│   ├── ReversibilityBanner.tsx # Type 1 vs Type 2 Door visual badge & strategic rationale
│   ├── InsightCard.tsx         # Reusable card with focus states & .card-hover-lift
│   ├── ChallengeThinking.tsx   # Differentiating second-level stress-test & pre-mortem workbench
│   ├── ReflectionScratchpad.tsx# Interactive Socratic reflection canvas & completion tracker
│   ├── DecisionDossier.tsx     # Client-side Markdown export and clipboard copy module
│   ├── AnalysisDashboard.tsx   # 8-step guided journey & cognitive metrics summary
│   └── ErrorState.tsx          # Resilient error notification with 1-click retry
├── lib/
│   ├── gemini.ts               # Gemini client singleton, Socratic prompt & JSON schema
│   ├── schemas.ts              # Zod input/output validation contracts & shared types
│   ├── sampleData.ts           # Rich starter scenarios for instant judging demos
│   └── dossier.ts              # Pure deterministic Markdown dossier generator
├── tests/
│   ├── validation.test.ts      # Input boundary, character limit & required field tests
│   ├── analysis-schema.test.ts # AI response schema, enum safety & ChallengeMyThinking tests
│   ├── gemini-pipeline.test.ts # Prompt construction, code fence stripping & model fallback
│   ├── presets.test.ts         # Schema compliance tests for all starter scenarios
│   └── dossier.test.ts         # Markdown generation, pre-mortem reflection & resilience tests
├── .env.example                # Safe environment variable template
├── .gitignore                  # Strict exclusion of secrets, build artifacts & dependencies
├── package.json                # Lean dependency tree (< 0.25 MB total repository size)
├── tsconfig.json               # Strict TypeScript configuration
└── vitest.config.ts            # Fast headless unit test runner configuration
```

---

## 🔒 Security & Privacy

- **Server-Side API Key Confinement**: `GEMINI_API_KEY` is loaded exclusively inside the serverless API route (`app/api/analyze/route.ts`). Never exposed to client bundles or browser consoles.
- **Configurable Model**: `GEMINI_MODEL` defaults to `gemini-flash-lite-latest` and can be swapped dynamically via environment variables without code modification.
- **Zero Reflection Persistence**: User reflections and pre-mortem answers reside strictly in browser React state. They are never transmitted to Google, logged to the server, or written to a database.
- **Safe Rendering**: All AI outputs and user inputs are rendered through standard React JSX escaping, preventing XSS injection.
- **Defensive Boundary Limits**: Zod validates input lengths on both client and server (Decision: 600 chars, Current Thinking: 600 chars, Context: 1000 chars, Constraints: 600 chars).
- **Hardened Serverless Headers**: `Cache-Control: "no-store, max-age=0"` and `poweredByHeader: false` prevent information leakage.

---

## ⚡ Local Setup

### Prerequisites
- Node.js `v20.x` or later (tested on Node v24).
- npm `v10.x` or later.
- A valid Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### 1. Clone & Install Dependencies
```bash
cd BlindSpotAI
npm install
```

### 2. Configure Environment Variables
Create a local `.env.local` file (this file is excluded by `.gitignore` and will never be committed):
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-flash-lite-latest
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Running Automated Tests

Run the complete Vitest test suite (34 unit tests, 100% pass rate):
```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

---

## 📦 Production Build

Verify that the application compiles cleanly:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

---

## 🚀 Vercel Deployment Instructions

BlindSpot AI is built specifically for zero-configuration Vercel deployment:

### Option A: Deploy via GitHub (Recommended)
1. Push this repository to a **Public GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: BlindSpot AI Competition Release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/BlindSpotAI.git
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your `BlindSpotAI` GitHub repository.
4. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: `your_actual_gemini_api_key`
   - `GEMINI_MODEL`: `gemini-2.5-flash`
5. Click **"Deploy"**. Vercel will automatically build the Next.js App Router project and provision the serverless `/api/analyze` function.

### Option B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel
# When prompted, link the project and add GEMINI_API_KEY as a secret
vercel --prod
```

---

## ⚖️ Hackathon Compliance & Integrity
- **Repository Size**: Clean source code footprint is **~0.23 MB** (well under the 10 MB limit).
- **Zero Express / Zero Persistent Server**: 100% stateless Vercel Serverless Function architecture.
- **Product Principle**: Strict guardrails ensure the system acts as an epistemic mirror rather than an advisory decision-maker.

*Built with passion for PromptWars 2026.*
