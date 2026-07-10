# DIR-Agent

DIR-Agent is the distribution home for **Research Pilot** — a desktop research
workspace that drives local coding agents (Claude Code, OpenAI Codex CLI) for
scholarly work: literature search and harvesting, a durable Paper Wiki, notes,
and provenance-audited research runs.

This repository hosts **binary releases and community issues only**; the source
code is maintained in a private repository.

## Download

Get the latest version from [Releases](../../releases):

| Platform | File |
|---|---|
| macOS (Apple Silicon) | `Research-Pilot-<version>-mac-arm64.dmg` |
| Ubuntu / Debian x86_64 | `Research-Pilot-<version>-linux-amd64.deb` |
| Ubuntu / Debian arm64 | `Research-Pilot-<version>-linux-arm64.deb` |
| Any Linux, no install | `Research-Pilot-<version>-linux-<arch>.AppImage` |

## Install

**macOS (Apple Silicon)** — open the `.dmg` and drag *Research Pilot* into
Applications. The app is signed and notarized by Apple, so there are no
security prompts on first launch.

**Ubuntu / Debian** — recommended:

```bash
sudo apt install ./Research-Pilot-<version>-linux-<arch>.deb
```

Installs to `/opt/Research Pilot`; the Chromium sandbox is configured
automatically (works on Ubuntu 24.04).

**AppImage** — `chmod +x` the file and run it. Requires `libfuse2`
(`sudo apt install libfuse2`). On Ubuntu 24.04, if it fails to start, launch
with `--no-sandbox` — or prefer the deb.

## Prerequisites

Research Pilot drives agent CLIs installed on your machine:

- [Claude Code](https://claude.com/claude-code) (`claude`) and/or OpenAI Codex
  CLI (`codex`) — install and log in once from a terminal.
- `python3` on PATH (used by the provenance checker).

No Node.js required — the app ships its own runtime.

## Your data

Research data (papers, wiki, notes, settings) lives in `~/.pipilot`. Project
folders you open are only touched to sync agent skill files
(`.claude/` / `.agents/`).

## Feedback

Bug reports and feature requests are welcome in this repository's
[Issues](../../issues).
