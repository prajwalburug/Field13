# field13 Command Center — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a custom Obsidian plugin dashboard for the field13 vault with Ghibli-inspired design

**Architecture:** Preact + TypeScript + Tailwind CSS + esbuild Obsidian plugin at `.obsidian/plugins/field13-command-center/` inside the vault. Reads vault markdown files directly for data (no Claude/MCP). Three tabs: Command Center, News & Signals, Intelligence.

**Tech Stack:** Preact, TypeScript, Tailwind CSS, esbuild, framer-motion, lucide-react, Obsidian Plugin API (ItemView)

**Vault path:** `E:\Obsidian\Collab13 - New Venture\field13-Vault`
**Plugin path:** `E:\Obsidian\Collab13 - New Venture\field13-Vault\.obsidian\plugins\field13-command-center\`

---

### Task 1: Plugin Scaffolding + Build Setup

**Files:**
- Create: `manifest.json`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `esbuild.config.mjs`
- Create: `tailwind.config.js`
- Create: `src/main.ts`
- Create: `src/styles.css`

- [ ] **Step 1: Create plugin directory and manifest.json**

Create directory `.obsidian/plugins/field13-command-center/` inside the vault. Write `manifest.json`:

```json
{
  "id": "field13-command-center",
  "name": "field13 Command Center",
  "version": "1.0.0",
  "minAppVersion": "1.5.0",
  "description": "Ghibli-inspired command center dashboard for field13",
  "author": "field13",
  "isDesktopOnly": true
}
```

- [ ] **Step 2: Write package.json**

```json
{
  "name": "field13-command-center",
  "version": "1.0.0",
  "description": "field13 Obsidian command center plugin",
  "main": "main.js",
  "scripts": {
    "dev": "node esbuild.config.mjs",
    "build": "node esbuild.config.mjs production"
  },
  "devDependencies": {
    "obsidian": "latest",
    "typescript": "^5.4.0",
    "esbuild": "^0.20.0",
    "tailwindcss": "^3.4.0"
  },
  "dependencies": {
    "preact": "^10.20.0",
    "framer-motion": "^11.0.0",
    "lucide-preact": "^0.350.0",
    "gray-matter": "^4.0.3"
  }
}
```

- [ ] **Step 3: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": false,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

- [ ] **Step 4: Write esbuild.config.mjs**

```js
import esbuild from "esbuild";
import process from "process";

const prod = process.argv[2] === "production";

esbuild.build({
  entryPoints: ["src/styles.css", "src/main.ts"],
  bundle: true,
  outdir: ".",
  minify: prod,
  sourcemap: prod ? false : "inline",
  target: "ES2020",
  format: "cjs",
  loader: { ".css": "css", ".svg": "dataurl", ".png": "dataurl" },
  external: ["obsidian"],
  define: {
    "process.env.NODE_ENV": prod ? '"production"' : '"development"',
  },
}).catch(() => process.exit(1));
```

- [ ] **Step 5: Write tailwind.config.js**

```js
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#F4F1EB",
        "parchment-2": "#EDE9E1",
        "off-white": "#FAF8F4",
        "near-black": "#0E0E0E",
        ink: "#0E0E0E",
        "ink-2": "#3A3A3A",
        "ink-3": "#7A7A7A",
        forest: "#1A4A3A",
        "forest-light": "#2A6A54",
        "green-light": "#E4EDE9",
        amber: "#B8935A",
        "amber-light": "#FDF3E3",
        border: "rgba(14,14,14,0.09)",
        "border-strong": "rgba(14,14,14,0.16)",
      },
      fontFamily: {
        serif: ['"Instrument Serif"', "serif"],
        mono: ['"DM Mono"', "monospace"],
      },
      borderRadius: {
        btn: "3px",
        card: "6px",
        pill: "20px",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 6: Write src/main.ts with empty ItemView**

```ts
import { Plugin, ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE = "field13-command-center";

class CommandCenterView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE;
  }

  getDisplayText(): string {
    return "field13 Command Center";
  }

  async onOpen() {
    this.containerEl.empty();
    this.containerEl.addClass("field13-dashboard");
    this.containerEl.innerHTML = `<div id="field13-root"></div>`;
  }
}

export default class Field13CommandCenter extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE, (leaf) => new CommandCenterView(leaf));
    this.addRibbonIcon("gauge", "field13 Command Center", () => {
      this.activateView();
    });
  }

  async activateView() {
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
    if (leaves.length > 0) {
      this.app.workspace.revealLeaf(leaves[0]);
      return;
    }
    await this.app.workspace.getRightLeaf(false).setViewState({
      type: VIEW_TYPE,
      active: true,
    });
  }
}
```

- [ ] **Step 7: Install dependencies and verify build**

Run in the plugin directory:
```powershell
npm install
npm run build
```

Expected: Creates `main.js` and `styles.css` in the plugin directory.

- [ ] **Step 8: Verify plugin appears in Obsidian**

Open Obsidian, go to Settings > Community Plugins > Installed plugins. "field13 Command Center" should appear. Enable it. Click the gauge icon in the ribbon to open the view. Check developer console (`Ctrl+Shift+I`) for no errors.

---

### Task 2: Styles + Global CSS

**Files:**
- Create: `src/styles.css` (Tailwind base + field13 design tokens + fonts)

- [ ] **Step 1: Write global styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital@0;1&family=Instrument+Serif:ital@0;1&display=swap');

:root {
  --parchment: #F4F1EB;
  --parchment-2: #EDE9E1;
  --ink: #0E0E0E;
  --ink-2: #3A3A3A;
  --ink-3: #7A7A7A;
  --forest: #1A4A3A;
  --amber: #B8935A;
  --border: rgba(14,14,14,0.09);
  --border-strong: rgba(14,14,14,0.16);
}
```

---

### Task 3: Types + Data Reader Utility

**Files:**
- Create: `src/types/index.ts`
- Create: `src/utils/dataReader.ts`

- [ ] **Step 1: Write TypeScript type definitions**

```ts
// src/types/index.ts
export interface ScorecardData {
  activeClients: number;
  operators: number;
  monthlyRevenue: number;
  activePrograms: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  date: string;
}

export interface ActionItem {
  id: string;
  suggestion: string;
  skill?: string;
  args?: Record<string, string>;
  priority: number;
}

export interface Engagement {
  clientName: string;
  stage: "discovery" | "active" | "proposal" | "negotiation";
  lastActivity: string;
  hasBlocker: boolean;
}

export interface Operator {
  name: string;
  category: string;
  platform: string;
  status: "active" | "pending" | "inactive";
}

export interface PipelineEntry {
  name: string;
  stage: string;
  value: string;
}

export interface DashboardData {
  scorecard: ScorecardData;
  calendar: CalendarEvent[];
  actionQueue: ActionItem[];
  engagements: Engagement[];
  operators: Operator[];
  pipeline: PipelineEntry[];
}
```

- [ ] **Step 2: Write dataReader utility**

```ts
// src/utils/dataReader.ts
import { App, TFile, normalizePath } from "obsidian";
import grayMatter from "gray-matter";
import type {
  ScorecardData,
  CalendarEvent,
  ActionItem,
  Engagement,
  Operator,
  PipelineEntry,
  DashboardData,
} from "../types";

export class DataReader {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  async readMarkdownTable(path: string): Promise<string[][]> {
    const file = this.app.vault.getAbstractFileByPath(normalizePath(path));
    if (!(file instanceof TFile)) return [];
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    const tables: string[][] = [];
    let inTable = false;
    for (const line of lines) {
      if (line.startsWith("|") && line.endsWith("|")) {
        const cells = line
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        if (cells.every((c) => /^[-:\s]+$/.test(c))) continue;
        tables.push(cells);
      }
    }
    return tables;
  }

  async readJson(path: string): Promise<unknown> {
    const file = this.app.vault.getAbstractFileByPath(normalizePath(path));
    if (!(file instanceof TFile)) return null;
    const content = await this.app.vault.read(file);
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  async parseScorecard(): Promise<ScorecardData> {
    const path = "00-Command-Center/?? Home.md";
    const rows = await this.readMarkdownTable(path);
    const data: Record<string, number> = {};
    for (const row of rows) {
      if (row.length >= 3) {
        const key = row[0].toLowerCase().replace(/\s+/g, "");
        const val = parseFloat(row[2].replace(/[$,]/g, "")) || 0;
        data[key] = val;
      }
    }
    return {
      activeClients: data["activeclients"] ?? 0,
      operators: data["operatorsinnetwork"] ?? 0,
      monthlyRevenue: data["monthlyrevenuetarget"] ?? 0,
      activePrograms: data["activeprograms"] ?? 0,
    };
  }

  async parseMarkdownList(path: string): Promise<Record<string, string>[]> {
    const items: Record<string, string>[] = [];
    const file = this.app.vault.getAbstractFileByPath(normalizePath(path));
    if (!(file instanceof TFile)) return items;
    const content = await this.app.vault.read(file);
    const lines = content.split("\n");
    let current: Record<string, string> = {};
    for (const line of lines) {
      const match = line.match(/^\|([^|]+)\|([^|]+)\|/);
      if (match) {
        current[match[1].trim()] = match[2].trim();
      } else if (line.trim() === "" && Object.keys(current).length > 0) {
        items.push(current);
        current = {};
      }
    }
    if (Object.keys(current).length > 0) items.push(current);
    return items;
  }

  async getAllData(): Promise<DashboardData> {
    const [scorecard, calendar, actionQueue] = await Promise.all([
      this.parseScorecard(),
      this.readJson("data/calendar.json") as Promise<CalendarEvent[]>,
      this.readJson("data/action-queue.json") as Promise<ActionItem[]>,
    ]);
    return {
      scorecard,
      calendar: Array.isArray(calendar) ? calendar : [],
      actionQueue: Array.isArray(actionQueue) ? actionQueue : [],
      engagements: [],
      operators: [],
      pipeline: [],
    };
  }
}
```

---

### Task 4: Tab Bar + View Switching

**Files:**
- Modify: `src/main.ts`
- Create: `src/views/CommandCenter.tsx`
- Create: `src/views/NewsSignals.tsx`
- Create: `src/views/Intelligence.tsx`

- [ ] **Step 1: Write CommandCenter view component**

```tsx
// src/views/CommandCenter.tsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { DataReader } from "../utils/dataReader";
import type { DashboardData } from "../types";
import HeroBanner from "../cards/HeroBanner";
import Scorecard from "../cards/Scorecard";
import Calendar from "../cards/Calendar";
import ActionQueue from "../cards/ActionQueue";
import SkillsTiles from "../cards/SkillsTiles";
import Engagements from "../cards/Engagements";
import OperatorNetwork from "../cards/OperatorNetwork";
import Pipeline from "../cards/Pipeline";

interface Props {
  dataReader: DataReader;
}

export default function CommandCenter({ dataReader }: Props) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataReader.getAllData().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [dataReader]);

  if (loading) {
    return <div class="p-4 text-ink-3 font-mono text-xs">Loading...</div>;
  }

  return (
    <div class="p-4 space-y-4">
      <HeroBanner />
      <div class="grid grid-cols-3 gap-4">
        <Scorecard data={data?.scorecard} />
        <Calendar events={data?.calendar ?? []} />
        <ActionQueue items={data?.actionQueue ?? []} />
      </div>
      <div class="grid grid-cols-1 gap-4">
        <SkillsTiles />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <Engagements engagements={data?.engagements ?? []} />
        <OperatorNetwork operators={data?.operators ?? []} />
        <Pipeline pipeline={data?.pipeline ?? []} />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write NewsSignals view**

```tsx
// src/views/NewsSignals.tsx
import { h } from "preact";
import { useState } from "preact/hooks";

export default function NewsSignals() {
  const [articles] = useState([
    { title: "Welcome to News & Signals", source: "field13", date: new Date().toISOString() },
  ]);

  return (
    <div class="p-4 space-y-4">
      <div class="bg-parchment-2 rounded-card border border-border p-3">
        <h2 class="font-serif italic text-lg text-ink">News & Signals</h2>
        <p class="font-mono text-xs text-ink-3 mt-1">
          RSS feeds will appear here once the refresh script is running.
        </p>
      </div>
      {articles.map((a) => (
        <div class="bg-parchment rounded-card border border-border p-3">
          <h3 class="font-serif text-base text-ink">{a.title}</h3>
          <p class="font-mono text-xs text-ink-3 mt-1">{a.source}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Write Intelligence view**

```tsx
// src/views/Intelligence.tsx
import { h } from "preact";
import { useState } from "preact/hooks";

export default function Intelligence() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div class="p-4 space-y-4">
      <h2 class="font-serif italic text-lg text-ink">Intelligence</h2>
      <p class="font-mono text-xs text-ink-3">
        Meeting transcripts, email highlights, and Slack activity.
      </p>
      <div class="bg-parchment-2 rounded-card border border-border p-4 text-center font-mono text-xs text-ink-3">
        📭 No meeting transcripts yet. Add notes to <code>Operations/Meetings/</code> to see them here.
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Update main.ts with tab navigation**

```ts
// src/main.ts
import { Plugin, ItemView, WorkspaceLeaf } from "obsidian";
import { h, render } from "preact";
import { DataReader } from "./utils/dataReader";
import CommandCenter from "./views/CommandCenter";
import NewsSignals from "./views/NewsSignals";
import Intelligence from "./views/Intelligence";

export const VIEW_TYPE = "field13-command-center";

type Tab = "command-center" | "news-signals" | "intelligence";

function TabBar({ activeTab, onTabChange }: {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
}) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "command-center", label: "✦ Command Center" },
    { id: "news-signals", label: "News & Signals" },
    { id: "intelligence", label: "Intelligence" },
  ];
  return (
    <div class="flex gap-2 p-4 pb-0 font-mono text-xs">
      {tabs.map((tab) => (
        <button
          onClick={() => onTabChange(tab.id)}
          class={`px-3 py-1.5 rounded-card transition-colors ${
            activeTab === tab.id
              ? "bg-parchment border border-border text-ink"
              : "text-ink-3 hover:text-ink"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

class CommandCenterView extends ItemView {
  private dataReader: DataReader;
  private activeTab: Tab = "command-center";

  constructor(leaf: WorkspaceLeaf, plugin: Field13CommandCenter) {
    super(leaf);
    this.dataReader = new DataReader(plugin.app);
  }

  getViewType(): string {
    return VIEW_TYPE;
  }

  getDisplayText(): string {
    return "field13 Command Center";
  }

  async onOpen() {
    this.renderContent();
  }

  private renderContent() {
    this.containerEl.empty();
    this.containerEl.addClass("field13-dashboard");
    this.containerEl.style.background = "#EDE9E1";
    this.containerEl.style.height = "100%";
    this.containerEl.style.overflow = "auto";

    const root = document.createElement("div");
    this.containerEl.appendChild(root);

    const app = (
      <div>
        <TabBar
          activeTab={this.activeTab}
          onTabChange={(tab: Tab) => {
            this.activeTab = tab;
            this.renderContent();
          }}
        />
        {this.activeTab === "command-center" && (
          <CommandCenter dataReader={this.dataReader} />
        )}
        {this.activeTab === "news-signals" && <NewsSignals />}
        {this.activeTab === "intelligence" && <Intelligence />}
      </div>
    );
    render(app, root);
  }

  async onClose() {
    this.containerEl.empty();
  }
}

export default class Field13CommandCenter extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE, (leaf) => new CommandCenterView(leaf, this));
    this.addRibbonIcon("gauge", "field13 Command Center", () => {
      this.activateView();
    });
  }

  async activateView() {
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
    if (leaves.length > 0) {
      this.app.workspace.revealLeaf(leaves[0]);
      return;
    }
    await this.app.workspace.getRightLeaf(false).setViewState({
      type: VIEW_TYPE,
      active: true,
    });
  }
}
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Verify no errors. Open Obsidian, reload plugin, check tab bar appears with three tabs.

---

### Task 5: Hero Banner Card

**Files:**
- Create: `src/cards/HeroBanner.tsx`

- [ ] **Step 1: Write HeroBanner component**

```tsx
// src/cards/HeroBanner.tsx
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function HeroBanner() {
  const now = useClock();
  const greeting = getGreeting(now.getHours());
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      class="relative bg-forest rounded-card p-4 text-off-white overflow-hidden"
      style={{ minHeight: "140px" }}
    >
      {/* Pixel-art Ghibli background — placeholder for now */}
      <div class="absolute inset-0 opacity-10 text-4xl tracking-widest flex items-center justify-center font-serif select-none">
        🏔️ 🌿 🍃 🌲 🍄
      </div>

      <div class="relative z-10 flex justify-between items-center">
        <div>
          <h1 class="font-serif italic text-xl">
            {greeting}, Collab13
          </h1>
          <p class="font-mono text-xs mt-1 opacity-80">
            {dateStr} · {timeStr}
          </p>
        </div>
        <div class="text-right">
          <span class="inline-block bg-white/10 rounded-pill px-3 py-1 font-mono text-xs">
            ● All systems nominal
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Open Obsidian, verify HeroBanner shows greeting, live clock, status indicator.

---

### Task 6: Scorecard Card

**Files:**
- Create: `src/cards/Scorecard.tsx`

- [ ] **Step 1: Write Scorecard component**

```tsx
// src/cards/Scorecard.tsx
import { h } from "preact";
import type { ScorecardData } from "../types";

const metrics = [
  { key: "activeClients" as const, label: "Clients" },
  { key: "operators" as const, label: "Operators" },
  { key: "monthlyRevenue" as const, label: "Revenue", prefix: "$" },
  { key: "activePrograms" as const, label: "Programs" },
];

export default function Scorecard({ data }: { data?: ScorecardData }) {
  if (!data) {
    return (
      <div class="bg-parchment rounded-card border border-border p-3">
        <p class="font-mono text-xs text-ink-3">── SCORECARD</p>
        <p class="font-mono text-xs text-ink-3 mt-2">📭 No data yet</p>
      </div>
    );
  }

  return (
    <div class="bg-parchment rounded-card border border-border p-3">
      <p class="font-mono text-xs text-amber uppercase tracking-widest mb-2">
        —— SCORECARD
      </p>
      <div class="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <div key={m.key}>
            <p class="font-serif text-2xl text-forest">
              {m.prefix ?? ""}
              {m.key === "monthlyRevenue" && data[m.key] >= 1000
                ? `${(data[m.key] / 1000).toFixed(0)}K`
                : data[m.key]}
            </p>
            <p class="font-mono text-xs text-ink-2">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Verify Scorecard reads from `?? Home.md` table and renders 2x2 grid of KPIs.

---

### Task 7: Calendar Card

**Files:**
- Create: `src/cards/Calendar.tsx`

- [ ] **Step 1: Write Calendar component**

```tsx
// src/cards/Calendar.tsx
import { h } from "preact";
import type { CalendarEvent } from "../types";

export default function Calendar({ events }: { events: CalendarEvent[] }) {
  return (
    <div class="bg-parchment rounded-card border border-border p-3">
      <p class="font-mono text-xs text-amber uppercase tracking-widest mb-2">
        —— TODAY'S CALENDAR
      </p>
      {events.length === 0 ? (
        <p class="font-mono text-xs text-ink-3">
          📭 No events. Run the calendar refresh script.
        </p>
      ) : (
        <div class="space-y-1">
          {events.map((e) => (
            <div
              key={e.id}
              class="font-mono text-xs text-ink-2 py-1 border-b border-border last:border-0"
            >
              <span class="text-ink">{e.time}</span> · {e.title}
            </div>
          ))}
        </div>
      )}
      <button class="mt-2 font-mono text-xs text-forest hover:text-forest-light transition-colors">
        ↻ Refresh
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Build and verify**

---

### Task 8: Action Queue Card

**Files:**
- Create: `src/cards/ActionQueue.tsx`

- [ ] **Step 1: Write ActionQueue component**

```tsx
// src/cards/ActionQueue.tsx
import { h } from "preact";
import { useState } from "preact/hooks";
import type { ActionItem } from "../types";

export default function ActionQueue({ items }: { items: ActionItem[] }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const visible = items.filter((i) => !dismissed.has(i.id));

  return (
    <div class="bg-parchment rounded-card border border-border p-3">
      <p class="font-mono text-xs text-amber uppercase tracking-widest mb-2">
        —— ACTION QUEUE
      </p>
      {visible.length === 0 ? (
        <p class="font-mono text-xs text-ink-3">✅ All caught up!</p>
      ) : (
        <div class="space-y-1">
          {visible.map((item) => (
            <div
              key={item.id}
              class="flex justify-between items-center font-mono text-xs text-ink-2 py-1 border-b border-border last:border-0"
            >
              <span>{item.suggestion}</span>
              <div class="flex gap-2">
                <button
                  onClick={() => setDismissed((s) => new Set(s).add(item.id))}
                  class="text-forest hover:text-forest-light"
                >
                  ✓
                </button>
                <button
                  onClick={() => setDismissed((s) => new Set(s).add(item.id))}
                  class="text-ink-3 hover:text-ink"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Build and verify**

---

### Task 9: Skills Tiles Card

**Files:**
- Create: `src/cards/SkillsTiles.tsx`

- [ ] **Step 1: Write SkillsTiles component**

```tsx
// src/cards/SkillsTiles.tsx
import { h } from "preact";
import { useState } from "preact/hooks";

const defaultSkills = [
  { name: "/daily-brief", icon: "📋" },
  { name: "/client-brief", icon: "👤" },
  { name: "/status-update", icon: "📊" },
  { name: "/weekly-brief", icon: "📅" },
];

export default function SkillsTiles() {
  const [running, setRunning] = useState<string | null>(null);

  const runSkill = (skill: string) => {
    setRunning(skill);
    // Fires headless claude -p
    setTimeout(() => setRunning(null), 2000);
  };

  return (
    <div class="bg-parchment rounded-card border border-border p-3">
      <p class="font-mono text-xs text-amber uppercase tracking-widest mb-2">
        —— SKILLS
      </p>
      <div class="flex gap-2 flex-wrap">
        {defaultSkills.map((s) => (
          <button
            key={s.name}
            onClick={() => runSkill(s.name)}
            disabled={running === s.name}
            class={`px-3 py-1.5 rounded-btn font-mono text-xs transition-all ${
              running === s.name
                ? "bg-ink-3 text-off-white animate-pulse"
                : "bg-forest text-off-white hover:bg-forest-light"
            }`}
          >
            {running === s.name ? "⏳" : s.icon} {s.name}
          </button>
        ))}
        <button class="px-3 py-1.5 rounded-btn font-mono text-xs border border-border-strong text-ink-2 hover:bg-parchment-2 transition-colors">
          + Add
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build and verify**

---

### Task 10: Engagements + Operator Network + Pipeline Cards

**Files:**
- Create: `src/cards/Engagements.tsx`
- Create: `src/cards/OperatorNetwork.tsx`
- Create: `src/cards/Pipeline.tsx`

- [ ] **Step 1: Write Engagements card**

```tsx
// src/cards/Engagements.tsx
import { h } from "preact";
import type { Engagement } from "../types";

const stageColors: Record<string, string> = {
  discovery: "text-amber",
  active: "text-forest",
  proposal: "text-ink-2",
  negotiation: "text-ink",
};

export default function Engagements({ engagements }: { engagements: Engagement[] }) {
  return (
    <div class="bg-parchment rounded-card border border-border p-3">
      <p class="font-mono text-xs text-amber uppercase tracking-widest mb-2">—— ENGAGEMENTS</p>
      {engagements.length === 0 ? (
        <p class="font-mono text-xs text-ink-3">📭 No active engagements</p>
      ) : (
        <div class="space-y-1">
          {engagements.map((e, i) => (
            <div key={i} class="flex justify-between font-mono text-xs text-ink-2 py-1">
              <span>{e.clientName}</span>
              <span class={stageColors[e.stage]}>● {e.stage}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Write OperatorNetwork card**

```tsx
// src/cards/OperatorNetwork.tsx
import { h } from "preact";
import type { Operator } from "../types";

export default function OperatorNetwork({ operators }: { operators: Operator[] }) {
  return (
    <div class="bg-parchment rounded-card border border-border p-3">
      <p class="font-mono text-xs text-amber uppercase tracking-widest mb-2">—— OPERATORS</p>
      {operators.length === 0 ? (
        <p class="font-mono text-xs text-ink-3">📭 No operators in network yet</p>
      ) : (
        <div class="space-y-1">
          {operators.map((op, i) => (
            <div key={i} class="flex justify-between font-mono text-xs text-ink-2 py-1">
              <span>{op.name}</span>
              <span class="text-ink-3">{op.platform}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Write Pipeline card**

```tsx
// src/cards/Pipeline.tsx
import { h } from "preact";
import type { PipelineEntry } from "../types";

export default function Pipeline({ pipeline }: { pipeline: PipelineEntry[] }) {
  return (
    <div class="bg-parchment rounded-card border border-border p-3">
      <p class="font-mono text-xs text-amber uppercase tracking-widest mb-2">—— PIPELINE</p>
      {pipeline.length === 0 ? (
        <p class="font-mono text-xs text-ink-3">📭 No pipeline entries</p>
      ) : (
        <div class="flex justify-between font-mono text-xs text-ink-2">
          {pipeline.map((p, i) => (
            <span key={i}>
              {p.name} · {p.stage}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
All three cards should render with empty states.

---

### Task 11: Moodboard + Hero Pixel-Art Background

**Files:**
- Create: `Moodboard/` folder in vault with reference images + moodboard files

- [ ] **Step 1: Create Moodboard folder**

Create `Moodboard/` directory in the vault root (`field13-Vault/Moodboard/`).

- [ ] **Step 2: Generate moodboard files**

Using Claude (claude.ai or opencode), prompt:
> "I'm building a Ghibli-inspired pixel-art dashboard for my Obsidian vault. Create three files:
> 1. Moodboard.md — catalogue reference images and describe design elements
> 2. Design-Brief.md — concise visual spec for pixel-art Ghibli style
> 3. Fonts.md — font recommendations that work with Instrument Serif + DM Mono"

- [ ] **Step 3: Create SVG pixel-art hero banner**

Save as `src/assets/hero-bg.svg` — a simple pixel-art landscape with mountains, trees, and a warm sky.

- [ ] **Step 4: Update HeroBanner to use the SVG**

Replace the emoji placeholder in HeroBanner with:
```tsx
<div
  class="absolute inset-0 bg-cover bg-center opacity-15"
  style={{ backgroundImage: `url(data:image/svg+xml,...)` }}
/>
```

- [ ] **Step 5: Build and verify**

---

### Task 12: News & Signals Tab with RSS

**Files:**
- Modify: `src/views/NewsSignals.tsx`
- Create: `.claude/scripts/cc-refresh-rss.sh`

- [ ] **Step 1: Enhance NewsSignals with search, filter, grid/list toggle**

Add interactive features: search bar (filters articles by title), source filter panel, grid/list view toggle, bookmark button on each article.

- [ ] **Step 2: Write RSS refresh script**

```
# .claude/scripts/cc-refresh-rss.sh
# Fetches RSS feeds and writes to data/news.json
# Can be scheduled or run manually
```

Script fetches from configured RSS URLs (Hacker News, GitHub Trending, industry blogs) and writes JSON array to `data/news.json`.

- [ ] **Step 3: Install RSS Dashboard plugin in Obsidian**

Settings > Community Plugins > Browse > search "RSS Dashboard" > Install & Enable.

- [ ] **Step 4: Wire RSS Dashboard into the tab**

Embed the RSS Dashboard view inside the NewsSignals tab using Obsidian's Web Viewer iframe or by reading `data/news.json` directly.

- [ ] **Step 5: Build and verify**

---

### Task 13: Intelligence Tab

**Files:**
- Modify: `src/views/Intelligence.tsx`
- Create: `src/cards/MeetingList.tsx`

- [ ] **Step 1: Write MeetingList card**

```tsx
// src/cards/MeetingList.tsx
import { h } from "preact";
import { useState } from "preact/hooks";

interface Meeting {
  title: string;
  date: string;
  path: string;
  summary: string;
}

export default function MeetingList({ meetings }: { meetings: Meeting[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div class="space-y-2">
      {meetings.map((m) => (
        <div
          key={m.path}
          class="bg-parchment rounded-card border border-border p-3 cursor-pointer"
          onClick={() => setExpanded(expanded === m.path ? null : m.path)}
        >
          <div class="flex justify-between font-mono text-xs text-ink-2">
            <span>{m.title}</span>
            <span class="text-ink-3">{m.date}</span>
          </div>
          {expanded === m.path && (
            <p class="font-mono text-xs text-ink-3 mt-2 border-t border-border pt-2">
              {m.summary}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Update Intelligence to read from vault**

Modify Intelligence.tsx to scan `Operations/Meetings/` folder for meeting notes and display them.

- [ ] **Step 3: Build and verify**

---

### Task 14: Error, Loading, Empty States

**Files:**
- Modify: All card components
- Create: `src/utils/refreshScheduler.ts`

- [ ] **Step 1: Add skeleton loading to every card**

Create a shared `Skeleton` component:
```tsx
// Add to each card's loading state
export function Skeleton({ className }: { className?: string }) {
  return (
    <div class={`bg-parchment rounded-card border border-border p-3 animate-pulse ${className ?? ""}`}>
      <div class="h-3 bg-parchment-2 rounded w-24 mb-3" />
      <div class="space-y-2">
        <div class="h-8 bg-parchment-2 rounded w-16" />
        <div class="h-4 bg-parchment-2 rounded w-32" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add refresh buttons to all data cards**

Each card that reads external data gets a small ↻ button in its header that re-triggers data loading.

- [ ] **Step 3: Build and verify**

---

### Task 15: Refresh Scripts for Calendar + RSS

**Files:**
- Create: `.claude/scripts/cc-refresh-calendar.sh`
- Create: `.claude/scripts/cc-refresh-rss.sh`

- [ ] **Step 1: Write calendar refresh script**

Node.js script that:
1. Uses Google Calendar API (free tier) to fetch today's events
2. Writes to `data/calendar.json` in the vault
3. Handles auth via OAuth2 or API key

```powershell
# PowerShell version for Windows Task Scheduler
$vaultPath = "E:\Obsidian\Collab13 - New Venture\field13-Vault"
# Fetch from Google Calendar API
# Write to $vaultPath\data\calendar.json
```

- [ ] **Step 2: Write RSS refresh script**

Node.js script using `rss-parser` that:
1. Fetches from configured feed URLs
2. Writes to `data/news.json`
3. Can be scheduled or run manually

- [ ] **Step 3: Add Task Scheduler entries (Windows)**

Set up daily/hourly triggers for both scripts.

- [ ] **Step 4: Verify scripts run and produce valid JSON**

---

### Task 16: Polish — Animations, Hover States, Responsive

**Files:**
- Modify: All card components
- Modify: `styles.css`

- [ ] **Step 1: Add framer-motion entrance animations**

Wrap each card in `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>` for staggered entrance.

- [ ] **Step 2: Add hover effects on cards**

Subtle translateY(-2px) and border-color transition on card hover (matching the existing website pattern).

- [ ] **Step 3: Add responsive breakpoints**

Ensure the dashboard collapses gracefully on narrow Obsidian panes (stack cards vertically).

- [ ] **Step 4: Production build and final verification**

```powershell
npm run build
```

Verify in Obsidian: all tabs functional, all cards render data or show appropriate empty states, animations smooth, no console errors.
