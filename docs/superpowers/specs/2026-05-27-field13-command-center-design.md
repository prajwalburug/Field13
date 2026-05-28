# field13 Command Center — Obsidian Dashboard Spec

**Date:** 2026-05-27
**Status:** Approved
**Based on:** [Obsidian-Dashboard guide](https://github.com/handrovermeulen/Obsidian-Dashboard)

## Overview

A custom Obsidian community plugin that renders a full-screen command center dashboard for the field13 vault. Ghibli-inspired pixel-art aesthetic using field13's brand palette (Parchment, Forest Green, Amber).

## Architecture

### Pattern

```
Plugin reads vault .md files directly → Parse with gray-matter + regex → Render in dashboard cards
```

No Claude/MCP dependency. Free tier only.

### Plugin Location

```
.obsidian/plugins/field13-command-center/
```

### Tech Stack

- Preact (React-compatible, smaller bundle)
- TypeScript
- Tailwind CSS
- esbuild (bundler)
- framer-motion (animations)
- lucide-react (icons)

### Plugin Structure

```
src/
├── main.ts              # Plugin entry, registers views
├── views/
│   ├── CommandCenter.tsx  # Main operational dashboard
│   ├── NewsSignals.tsx    # RSS feeds + signals
│   └── Intelligence.tsx   # Meeting transcripts, email, Slack
├── cards/
│   ├── HeroBanner.tsx
│   ├── Scorecard.tsx
│   ├── Calendar.tsx
│   ├── ActionQueue.tsx
│   ├── SkillsTiles.tsx
│   ├── Engagements.tsx
│   ├── OperatorNetwork.tsx
│   └── Pipeline.tsx
├── utils/
│   ├── dataReader.ts      # Reads vault markdown files + data/*.json
│   ├── skillRunner.ts     # Fires claude -p for skill tiles
│   └── refresher.ts       # Refresh button logic
└── types/
    └── index.ts           # TypeScript interfaces
```

## Tabs

### 1. Command Center

The main operational view. Grid layout with the following cards:

| Card | Data Source | Refresh |
|------|------------|---------|
| Hero Banner | Static content + JS Date() | Live (clock) |
| Scorecard | `00-Command-Center/?? Home.md` (markdown table) | On vault change |
| Calendar | `data/calendar.json` | Refresh button + scheduled script |
| Action Queue | `data/action-queue.json` | Manual / script |
| Skills Tiles | Hardcoded or configurable list | N/A |
| Engagements | `02-Sales-Clients/*.md` + `06-CRM/*.md` | On vault change |
| Operator Network | `03-Operator-Network/*.md` | On vault change |
| Pipeline | `06-CRM/Pipeline Overview.md` | On vault change |

### 2. News & Signals

RSS feed reader. Options:
1. **Obsidian RSS Dashboard plugin** — embed via Web Viewer, styled to match
2. **Custom within plugin** — Node.js refresh script with `rss-parser` writes `data/news.json`

Features: search bar, source filter, grid/list toggle, bookmark, timeline sort.

Starting feeds: Hacker News best, GitHub Trending, B2B SaaS industry blogs.

### 3. Intelligence

Meeting transcripts from `Operations/Meetings/` folder, email highlights from `data/gmail-highlights.json`, Slack activity from `data/slack-activity.json`.

Each section: recent items list, click to expand full content inline.

## Visual Design

### Ghibli/Pixel-Art Theme with field13 Brand

- **Background:** Parchment `#F4F1EB` (warm off-white)
- **Card surfaces:** `#EDE9E1` (Parchment 2)
- **Accent:** Forest Green `#1A4A3A` (buttons, borders, headers)
- **Secondary accent:** Amber `#B8935A` (numbers, italic emphasis)
- **Text:** Ink `#0E0E0E` / Ink 2 `#3A3A3A` / Ink 3 `#7A7A7A`
- **Fonts:** Instrument Serif (headlines) + DM Mono (UI/body)
- **Hero banner:** Pixel-art Ghibli-inspired landscape illustration (ultra-wide ~20:9)

## State Handling

| State | Visual |
|-------|--------|
| Empty | "No data yet. Run the refresh script." + ↻ button |
| Not found | "Source file missing at `path/to/file`" |
| Loading | Skeleton cards (pulsing gray blocks) |
| Error | "Failed to load. Check console." + retry button |
| Refreshing | Spinner on refresh button, cards show stale data |

## Refresh Scripts

```
.claude/scripts/
├── cc-refresh-calendar.sh   # Google Calendar API → data/calendar.json
└── cc-refresh-rss.sh        # RSS feeds → data/news.json
```

Runnable from dashboard (refresh button) or via Task Scheduler (Windows) / cron (macOS/Linux). Google Calendar API free tier: 1,000,000 requests/day.

## Implementation Order

1. Plugin scaffolding (manifest.json, esbuild, hot reload)
2. Tab bar + view switching
3. Command Center layout + card grid
4. Data reader utility (markdown parsing + JSON reading)
5. Hero banner (live clock, greeting)
6. Scorecard (reads `?? Home.md` table)
7. Calendar card + refresh script
8. Engagements card
9. Operator Network card
10. Pipeline card
11. Action Queue card
12. Skills Tiles card
13. News & Signals tab
14. Intelligence tab
15. Error/empty/loading states
16. Moodboard creation + hero banner pixel-art
17. Polish (animations, hover states, responsive)
