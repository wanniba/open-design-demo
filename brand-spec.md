# AgentWeave (reference) — extracted brand cues

Source: https://www.agentweave.ai/ (CSS + font preload)

## Core tokens (OKLch)

```css
:root {
  --bg:      oklch(97.59% 0.0029 264.5);
  --surface: oklch(100.00% 0.0000 89.9);
  --fg:      oklch(21.01% 0.0318 264.7);
  --muted:   oklch(55.10% 0.0234 264.4);
  --border:  oklch(92.76% 0.0058 264.5);
  --accent:  oklch(65.27% 0.1411 240.6);
}
```

Mapping notes (from observed CSS usage):
- Base surfaces: `#fff`, `#f6f7f9` / `#f9f9f9` family
- Text: `rgb(17 24 39 / …)` (≈ `#111827`), muted `rgb(107 114 128 / …)` (≈ `#6b7280`)
- Borders: `#e5e7eb` / `#eee` family
- Accent: `#29d` (expanded `#2299dd`) used as a vivid cyan-blue signal

## Typography

- Display: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Body: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Mono: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

## Layout posture rules (observed)

- Clean light canvas, minimal chroma; vivid accent appears sparingly.
- Mostly hairline borders (neutral greys) + soft elevation only when needed.
- Radius system lives around 10–12px (with occasional larger 20–25px for hero/media blocks).
- UI favors compact, legible density; Inter weights do most of the hierarchy work.
