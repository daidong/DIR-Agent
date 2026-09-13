# Research Pilot · DIR-Agent

**Research Pilot** is a desktop workspace for research with Claude Code, OpenAI Codex CLI, and the built-in PI agent. It brings together literature search, a Paper Wiki, notes, conversation history, research runs, and a file browser/editor.

**[Download the latest release](https://github.com/daidong/DIR-Agent/releases/latest)** · **[0.6.0 release notes](https://github.com/daidong/DIR-Agent/releases/tag/v0.6.0)** · **[Report a problem](https://github.com/daidong/DIR-Agent/issues)**

This public repository distributes installation packages and hosts community issues. The application source is maintained separately. You do **not** need to clone a repository, build the app, install Docker, or start a server manually to use the packaged application.

## Installation at a glance

1. Download the package for your operating system and CPU from the table below.
2. Install Research Pilot: drag it into Applications on macOS, or install the deb on Ubuntu/Debian.
3. To use the **Claude** or **Codex** tab, install the corresponding **CLI** and sign in once in a terminal. You can install either or both.
4. Open Research Pilot, run **Settings → Environment check**, then choose **Open Folder…** and select a research project folder.

The desktop app includes its own Electron/Node.js runtime and research data service. **A separate Node.js installation is not required for Research Pilot itself.** The CLI installation methods below also use standalone installers; if you choose an upstream npm installation method instead, that method requires npm/Node.js.

## 1. Choose the right download

The filenames and direct links below are for **0.6.0**. For later releases, use the [latest release page](https://github.com/daidong/DIR-Agent/releases/latest) and substitute that version in the commands.

| Your computer | Recommended download | Alternative |
|---|---|---|
| macOS, Apple Silicon (M-series) | [mac-arm64.dmg](https://github.com/daidong/DIR-Agent/releases/download/v0.6.0/Research-Pilot-0.6.0-mac-arm64.dmg) | [mac-arm64.zip](https://github.com/daidong/DIR-Agent/releases/download/v0.6.0/Research-Pilot-0.6.0-mac-arm64.zip) |
| Ubuntu/Debian, Intel or AMD 64-bit | [linux-amd64.deb](https://github.com/daidong/DIR-Agent/releases/download/v0.6.0/Research-Pilot-0.6.0-linux-amd64.deb) | [linux-x86_64.AppImage](https://github.com/daidong/DIR-Agent/releases/download/v0.6.0/Research-Pilot-0.6.0-linux-x86_64.AppImage) |
| Ubuntu/Debian, ARM 64-bit | [linux-arm64.deb](https://github.com/daidong/DIR-Agent/releases/download/v0.6.0/Research-Pilot-0.6.0-linux-arm64.deb) | [linux-arm64.AppImage](https://github.com/daidong/DIR-Agent/releases/download/v0.6.0/Research-Pilot-0.6.0-linux-arm64.AppImage) |

**Not sure about your CPU?** On macOS, open **Apple menu → About This Mac** and look at **Chip**. On Linux, run:

```bash
uname -m
```

- `x86_64`: use the **amd64 deb** or **x86_64 AppImage**. These names describe the same CPU architecture.
- `aarch64` or `arm64`: use **arm64**.

Version 0.6.0 does not include an Intel Mac or Windows installer. Linux installation checks were performed on Ubuntu 24.04; other distributions may need different system packages. A Linux graphical desktop session is needed for the desktop UI.

Download the named assets under **Assets** on the release page. GitHub's automatic **Source code (zip)** and **Source code (tar.gz)** links are not application installers.

## 2. Install Research Pilot

### macOS: Apple Silicon

1. Download `Research-Pilot-0.6.0-mac-arm64.dmg`.
2. Double-click the dmg to open it.
3. Drag **Research Pilot** into **Applications**.
4. Eject the mounted disk image.
5. Launch **Research Pilot** from Applications or Spotlight.

The macOS application is signed and notarized by Apple. A normal first-open confirmation for an internet download may still appear. If macOS reports that the app is damaged or cannot be verified, download a fresh copy from this repository and report the exact message; disabling Gatekeeper should not be part of installation.

For the zip alternative, extract the archive and move **Research Pilot.app** into Applications before launching it. Install one copy rather than running the app from both Downloads and Applications.

### Ubuntu/Debian: deb package (recommended)

Download the deb for your architecture. Open a terminal in the download directory, or use `cd ~/Downloads` if your browser saved it there.

For **x86_64 / amd64**:

```bash
cd ~/Downloads
sudo apt update
sudo apt install ./Research-Pilot-0.6.0-linux-amd64.deb
```

For **arm64**:

```bash
cd ~/Downloads
sudo apt update
sudo apt install ./Research-Pilot-0.6.0-linux-arm64.deb
```

Use **one** of these blocks. Keep the `./` before the filename: it tells apt to install the downloaded local file. Using apt also resolves the declared system dependencies.

After installation, launch **Research Pilot** from your desktop application menu, or run:

```bash
research-pilot
```

The package name is `research-pilot`, and the application is installed under `/opt/Research-Pilot`. Launch the application as your normal user; `sudo` is for package installation only.

### Linux: AppImage alternative

An AppImage runs from a file instead of being installed as a deb. It still needs a graphical desktop and compatible system libraries. On Ubuntu/Debian, prefer the deb if you want dependency installation and a desktop menu entry handled for you.

**Install the AppImage runtime dependencies first.** On Ubuntu 24.04:

For **x86_64**:

```bash
sudo apt update
sudo apt install libfuse2t64
```

For **arm64**:

```bash
sudo apt update
sudo apt install libfuse2t64 zlib1g-dev
```

On older Ubuntu releases, the FUSE package is named `libfuse2` rather than `libfuse2t64`. The 0.6.0 arm64 AppImage additionally requires `zlib1g-dev` because its bundled runtime looks for `libz.so`; installing `zlib1g` alone does not provide that filename.

Then make the downloaded file executable and run it. For **x86_64**:

```bash
cd ~/Downloads
chmod +x Research-Pilot-0.6.0-linux-x86_64.AppImage
./Research-Pilot-0.6.0-linux-x86_64.AppImage
```

For **arm64**:

```bash
cd ~/Downloads
chmod +x Research-Pilot-0.6.0-linux-arm64.AppImage
./Research-Pilot-0.6.0-linux-arm64.AppImage
```

If startup fails specifically because of Chromium's sandbox on Ubuntu 24.04, prefer the deb. An AppImage fallback is to append `--no-sandbox` to the launch command; this disables Chromium's sandbox for that launch.

If FUSE is unavailable, you can extract the AppImage and run its contents. For example, in a directory where you want to keep the application:

```bash
/path/to/Research-Pilot-0.6.0-linux-arm64.AppImage --appimage-extract
./squashfs-root/research-pilot
```

Replace the example path and architecture with your downloaded file. Extraction does not remove the arm64 runtime's `libz.so` requirement. Keep the entire extracted directory together.

## 3. Install an agent CLI and sign in

Research Pilot's **Claude** and **Codex** tabs launch the `claude` and `codex` commands installed on your computer. Installing a chat website, browser extension, or separate desktop app does not by itself verify that these commands are available.

Choose the agent you want to use. Run the following commands in your normal terminal, outside Research Pilot, using the same operating-system account that will run the app.

### Claude Code

The [official Claude Code quickstart](https://code.claude.com/docs/en/quickstart) provides this standalone installer for macOS and Linux:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Open a new terminal after installation, then verify the command and start the sign-in flow:

```bash
claude --version
claude
```

Follow the CLI's sign-in and setup prompts. Once it works in your terminal, quit and reopen Research Pilot and use the **Claude** tab. See the official quickstart for alternative installation methods.

### OpenAI Codex CLI

The [official Codex CLI guide](https://learn.chatgpt.com/docs/codex/cli) provides this standalone installer for macOS and Linux:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Open a new terminal after installation, then run:

```bash
codex --version
codex
```

Choose a sign-in method offered by the CLI and finish authentication. Once it works in your terminal, quit and reopen Research Pilot and use the **Codex** tab. The official guide also covers alternative installation and authentication methods.

### Built-in PI agent

The **PIAgent** tab uses a runtime bundled with Research Pilot, so it does not need a separate PI executable. Configure an available model and authentication under **Settings → PI Agent**. The app can detect supported local Claude/Codex logins or use provider API keys configured in this section. Available models depend on your configuration and account access.

If you only want to browse existing research data or workspace files, you can open the app before setting up an agent. Agent execution needs its corresponding authentication.

## 4. First launch and your first workspace

1. Open Research Pilot. On a fresh installation, an **Environment check** may appear automatically. You can reopen it from **Settings → Environment check**.
2. Check **Data daemon (pipilotd)** and **Terminal engine (node-pty)**. The packaged app includes these and starts its data service automatically.
3. Confirm that the agent you intend to use is available. A missing CLI for an agent you do not use does not require installing that agent.
4. Click **Open Folder…** and choose a project folder. You can create an empty folder for a new research project; it does not need to be this GitHub repository or an existing Git repository.
5. Open **Claude**, **Codex**, or **PIAgent** to start a session. Complete any setup or workspace-trust prompts shown by that agent.
6. Try a small request, such as: “Explain what research material is already saved for this workspace.” Use **Literature** to search for papers, **Knowledge** to browse saved material and prior work, and **Research** to inspect research runs.

The application prepares its bundled research skills and tool configuration for the selected workspace. Normal packaged use does not require running repository setup scripts or manually launching an MCP server.

Opening a workspace can create or update integration files such as `.claude/`, `.agents/`, `.pipilot/`, and managed sections of `AGENTS.md` or `CLAUDE.md`. The file editor and agents can also edit project files when you use those features.

## 5. Optional research tools and data sources

### Python for reliability checks

Python is not required to open Research Pilot. **Python 3.9 or newer** on `PATH` enables the provenance/reliability checker used by `/provcheck-claude:check` in Claude sessions.

Check your installation:

```bash
python3 --version
```

On Ubuntu/Debian:

```bash
sudo apt install python3
```

On macOS, install Python from [python.org](https://www.python.org/downloads/macos/), or use `brew install python3` if you already use Homebrew. Reopen the app and rerun Environment check afterward.

### MarkItDown for document conversion

PI's document conversion tool can use **MarkItDown** for formats such as PDF, Word, PowerPoint, and Excel. This is optional and separate from launching the desktop app. [MarkItDown requires Python 3.10 or newer](https://github.com/microsoft/markitdown#prerequisites).

With [uv installed](https://docs.astral.sh/uv/getting-started/installation/), install the converter in an isolated tool environment:

```bash
uv tool install "markitdown[all]"
uv tool update-shell
```

Open a new terminal and check:

```bash
markitdown --help
```

Then restart Research Pilot and rerun Environment check. The [uv tools guide](https://docs.astral.sh/uv/guides/tools/) explains tool isolation and executable paths; avoid modifying your system Python with `sudo pip install`.

### Literature and full-text services

Open **Settings → Literature & full-text** to configure the sources you use. The app exposes fields for Semantic Scholar, OpenAlex, Paperclip, and Hugging Face credentials, plus an OpenAlex contact email.

You do not need to configure every service before starting. Network searches and full-text retrieval depend on the selected provider, its access requirements, and the paper's availability. If a search reports an authentication or rate-limit error, check that source's settings and retry. Literature-source keys belong in this section; PI model-provider keys belong in **PI Agent**.

## 6. Upgrade, data location, and uninstall

### Upgrade an existing installation

Finish active tasks and quit Research Pilot before replacing the application. Download the new version for the **same operating system and CPU architecture** from [Releases](https://github.com/daidong/DIR-Agent/releases).

- **macOS:** drag the new application into Applications and replace the previous copy.
- **deb:** run `sudo apt install ./Research-Pilot-<new-version>-linux-<arch>.deb` with the actual downloaded filename. Apt upgrades the installed package.
- **AppImage:** make the new file executable and launch it instead of the old file. Update any shortcut you created.

Reopen the app and check its version in the About dialog. The research data directory is separate from the application; a normal application upgrade does not require deleting it. Do not assume that a newer data store can be opened by an older release.

### Where your data lives

By default, Research Pilot stores its research data under:

```text
~/.pipilot
```

This directory includes saved papers, the shared Paper Wiki, workspace research records, and settings. Project files remain in the workspace folders you selected. Claude Code and Codex also manage their own login and conversation files outside this directory.

For a backup, finish active tasks and close the app and agents using the data, then copy `~/.pipilot` and your project folders to your backup location. A custom `PIPILOT_DATA_DIR`, if configured, replaces the default research data path. Backing up only the application file does not back up your research.

### Uninstall the application

- **macOS:** quit Research Pilot and move the application from Applications to the Trash.
- **deb:** run `sudo apt remove research-pilot`.
- **AppImage:** remove the AppImage file, or its extracted directory, and any shortcut you created.

Removing the application is separate from deleting `~/.pipilot` or your workspace folders. Keep those directories if you want to retain your research for reinstallation.

## 7. Troubleshooting

| Symptom | What to check |
|---|---|
| `claude` or `codex` is not found | Verify `command -v claude` or `command -v codex` in a new terminal. Finish the upstream installer steps, then restart Research Pilot so it sees the updated environment. |
| CLI works, but the agent asks for login | Run `claude` or `codex` in your terminal under the same OS account and complete authentication. Then reopen the agent tab. |
| AppImage reports `Permission denied` | Run `chmod +x` on the downloaded AppImage and launch it as your normal user. |
| `Exec format error` or package architecture mismatch | Check `uname -m` and the download table. In virtualized/emulated environments, test on the intended architecture before assuming a damaged download. |
| AppImage reports `libfuse.so.2` missing | Install `libfuse2t64` on Ubuntu 24.04, or `libfuse2` on older Ubuntu releases; alternatively use the deb. |
| arm64 AppImage reports `libz.so` missing | Install `zlib1g-dev`, or use the arm64 deb. |
| Chromium sandbox prevents AppImage startup | Prefer the deb; the `--no-sandbox` launch fallback is described above. |
| Data daemon or terminal engine check fails | Restart the application and rerun **Settings → Environment check**. If it persists, reinstall the correct package and collect diagnostics. |
| Python or MarkItDown is missing | These affect the optional features described above. Install the tool you need, reopen the app, and click **Recheck**. |
| Literature search fails or returns limited results | Inspect the provider error and its credentials/rate limits in **Literature & full-text**. Full-text availability varies by paper. |

For a reproducible problem, use **Export diagnostics** in the Environment check and open an [issue](https://github.com/daidong/DIR-Agent/issues). Include your Research Pilot version, operating system, CPU architecture, package type, exact error, and the steps that triggered it. Review diagnostic files before posting publicly and omit credentials or private research content.

## Release validation

For 0.6.0, 897 automated tests and the Node 18/20 GitHub CI checks passed. The macOS package passed code-signature, notarization, stapling, and Gatekeeper checks. Ubuntu 24.04 deb installation, GUI startup, daemon/MCP calls, PI imports, and native terminal spawning were checked on both architectures, along with AppImage extraction and the extracted runtime. Linux x64 package checks used emulation on Apple Silicon; these are not physical x64 desktop or FUSE-mount certification claims. Uploaded asset sizes and SHA-256 digests were matched to the tested local files.
