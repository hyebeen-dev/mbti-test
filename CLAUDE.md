# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MBTI 공부법 연구소 — an HTML content site made up of multiple pages exploring MBTI-based study methods.

## Design

Follows the IBM Carbon Design System (https://carbondesignsystem.com/) visual language, adapted for a Korean content site.

- Theme: light/dark mode, toggled via a sun/moon icon button in the GNB header. Preference is saved to `localStorage` and falls back to the OS `prefers-color-scheme` on first visit. A small inline script in `<head>` (before any stylesheet) sets `data-theme` on `<html>` synchronously to avoid a flash of the wrong theme.
- Color: Carbon's gray/blue token system, defined as CSS custom properties in `css/theme.css` (`--cds-*`). Light = Carbon "White" theme (background `#ffffff`, text `#161616`), dark = Carbon "Gray 100" theme (background `#161616`, text `#f4f4f4`). Accent/interactive color is Carbon Blue 60 (`#0f62fe`) in light mode, Blue 50 (`#4589ff`) in dark mode. Never hardcode a color — reference a `--cds-*` token so both themes stay correct.
- Font: IBM Plex Sans + IBM Plex Sans KR (Google Fonts), Carbon's typeface.
- Shape: square corners, no `border-radius`, matching Carbon's flat component style. The `.tag` component keeps a small pill radius, since Carbon's Tag component is the one deliberate exception to this rule.
- Layout: mobile-responsive, Carbon 8px spacing scale (`--cds-spacing-*` in `css/theme.css`), Carbon motion easing/duration tokens (`--cds-ease-standard`, `--cds-duration-*`).
- CSS is split by concern: `css/theme.css` (tokens/reset), `css/base.css` (header/GNB/buttons/hero/footer), `css/components.css` (cards, tags, content switcher), `css/test.css` (self-diagnosis test page only).

## Rules

- No servers, APIs, or API keys of any kind. This is a static-files-only project (plain HTML/CSS/JS, no backend, no fetch calls to external services requiring keys).
- If any file exceeds 300 lines, propose splitting it into smaller files before continuing to add to it — don't split unilaterally without proposing it first.
