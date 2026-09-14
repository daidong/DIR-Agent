# Research Pilot · DIR-Agent

**Research Pilot** is a desktop workspace for research with Claude Code, OpenAI Codex CLI, and the built-in PI agent. It brings together literature search, a Paper Wiki, notes, conversation history, research runs, and a file browser/editor. An optional companion lets you follow and drive the same sessions from your iPhone or iPad over [Tailscale](https://tailscale.com/); see [section 7](#7-optional-follow-and-drive-sessions-from-your-phone).

**[Download the latest release](https://github.com/daidong/DIR-Agent/releases/latest)** · **[0.6.5 release notes](https://github.com/daidong/DIR-Agent/releases/tag/v0.6.5)** · **[Report a problem](https://github.com/daidong/DIR-Agent/issues)**

This public repository distributes installation packages and hosts community issues. The application source is maintained separately. You do **not** need to clone a repository, build the app, install Docker, or start a server manually to use the packaged application.

> [!IMPORTANT]
> **Download an application package, not GitHub's “Source code” archives.**
> This is a binary-distribution repository; the application source code is private and is not published here. GitHub automatically adds **Source code (zip)** and **Source code (tar.gz)** links to releases. For **v0.6.5**, those archives contain only this repository's `README.md` snapshot — no application source code and no installer.
> Choose a **`Research-Pilot-0.6.5-…`** package from the download table below. The **`Research-Pilot-0.6.5-mac-arm64.zip`** asset is a packaged macOS application and is different from GitHub's **Source code (zip)**.

## Installation at a glance

1. Download the package for your operating system and CPU from the table below.
2. Install Research Pilot: drag it into Applications on macOS, or install the deb on Ubuntu/Debian.
3. To use the **Claude** or **Codex** tab, install the corresponding **CLI** and sign in once in a terminal. You can install either or both.
4. Open Research Pilot, run **Settings → Environment check**, then choose **Open Folder…** and select a research project folder.
5. Optional: to follow sessions from your phone, install Tailscale on both devices and turn on **Settings → Phone (iOS companion)**.

The desktop app includes its own Electron/Node.js runtime and research data service. **A separate Node.js installation is not required for Research Pilot itself.** The CLI installation methods below also use standalone installers; if you choose an upstream npm installation method instead, that method requires npm/Node.js.

## 1. Choose the right download

The filenames and direct links below are for **0.6.5**. For later releases, use the [latest release page](https://github.com/daidong/DIR-Agent/releases/latest) and substitute that version in the commands.

| Your computer | Recommended download | Alternative |
|---|---|---|
| macOS, Apple Silicon (M-series) | [mac-arm64.dmg](https://github.com/daidong/DIR-Agent/releases/download/v0.6.5/Research-Pilot-0.6.5-mac-arm64.dmg) | [mac-arm64.zip](https://github.com/daidong/DIR-Agent/releases/download/v0.6.5/Research-Pilot-0.6.5-mac-arm64.zip) |
| Ubuntu/Debian, Intel or AMD 64-bit | [linux-amd64.deb](https://github.com/daidong/DIR-Agent/releases/download/v0.6.5/Research-Pilot-0.6.5-linux-amd64.deb) | [linux-x86_64.AppImage](https://github.com/daidong/DIR-Agent/releases/download/v0.6.5/Research-Pilot-0.6.5-linux-x86_64.AppImage) |
| Ubuntu/Debian, ARM 64-bit | [linux-arm64.deb](https://github.com/daidong/DIR-Agent/releases/download/v0.6.5/Research-Pilot-0.6.5-linux-arm64.deb) | [linux-arm64.AppImage](https://github.com/daidong/DIR-Agent/releases/download/v0.6.5/Research-Pilot-0.6.5-linux-arm64.AppImage) |

**Not sure about your CPU?** On macOS, open **Apple menu → About This Mac** and look at **Chip**. On Linux, run:

```bash
uname -m
```

- `x86_64`: use the **amd64 deb** or **x86_64 AppImage**. These names describe the same CPU architecture.
- `aarch64` or `arm64`: use **arm64**.

**Windows is not supported.** Version 0.6.5 also does not include an Intel Mac installer. Linux installation checks were performed on Ubuntu 24.04; other distributions may need different system packages. A Linux graphical desktop session is needed for the desktop UI.

On the release page, choose one of the six **`Research-Pilot-0.6.5-…`** assets listed above. GitHub's automatic **Source code (zip)** and **Source code (tar.gz)** entries contain only a README snapshot for this release; they do not contain the application source or an installer.

## 2. Install Research Pilot

### macOS: Apple Silicon

1. Download `Research-Pilot-0.6.5-mac-arm64.dmg`.
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
sudo apt install ./Research-Pilot-0.6.5-linux-amd64.deb
```

For **arm64**:

```bash
cd ~/Downloads
sudo apt update
sudo apt install ./Research-Pilot-0.6.5-linux-arm64.deb
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

On older Ubuntu releases, the FUSE package is named `libfuse2` rather than `libfuse2t64`. The 0.6.5 arm64 AppImage additionally requires `zlib1g-dev` because its bundled runtime looks for `libz.so`; installing `zlib1g` alone does not provide that filename.

Then make the downloaded file executable and run it. For **x86_64**:

```bash
cd ~/Downloads
chmod +x Research-Pilot-0.6.5-linux-x86_64.AppImage
./Research-Pilot-0.6.5-linux-x86_64.AppImage
```

For **arm64**:

```bash
cd ~/Downloads
chmod +x Research-Pilot-0.6.5-linux-arm64.AppImage
./Research-Pilot-0.6.5-linux-arm64.AppImage
```

If startup fails specifically because of Chromium's sandbox on Ubuntu 24.04, prefer the deb. An AppImage fallback is to append `--no-sandbox` to the launch command; this disables Chromium's sandbox for that launch.

If FUSE is unavailable, you can extract the AppImage and run its contents. For example, in a directory where you want to keep the application:

```bash
/path/to/Research-Pilot-0.6.5-linux-arm64.AppImage --appimage-extract
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

### Agent permissions

Research Pilot launches desktop and mobile Claude Code and Codex sessions with full permissions for unattended automation. Claude Code uses `--dangerously-skip-permissions`; Codex uses `--dangerously-bypass-approvals-and-sandbox`. These sessions can run commands, modify or delete files, and access the network with the permissions of your OS account without per-action approval. Codex's own sandbox is disabled. This does not grant administrator privileges or bypass OS access controls.

This is the application's fixed launch behavior; there is no permission-mode selector. Use it with workspaces and tasks you trust, and keep backups of important files. CLI login, workspace trust, or first-use onboarding may still require an initial interactive step. These flags apply to sessions launched by Research Pilot and do not change how you launch the CLIs separately.

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

### Recommended API setup

You can install Research Pilot and browse saved material before adding API keys. For online research, we recommend this starting setup:

1. **OpenAlex API key + contact email**, then **Semantic Scholar API key**, for literature discovery, metadata, and open-access full-text lookup.
2. **Brave Search API key if you use PI Agent for general web research**, plus one working model-provider key or a supported local Claude/Codex login. You do not need keys for every model provider.
3. Add **Hugging Face** for frequent ML/AI paper searches and **Paperclip** for additional DOI, PubMed, and PMC full-text retrieval.

#### Literature discovery and full text

Enter these values in **Settings → Literature & full-text**, then click **Save**. The names below match the app's fields; the identifiers in parentheses help when diagnosing configuration problems.

| Priority | Field | How it helps / behavior without it | Where to get it |
| --- | --- | --- | --- |
| Recommended first | **OpenAlex API key** (`OPENALEX_API_KEY`) | Supports broad literature search, paper metadata, and finding open-access locations. A free key increases the daily request budget and enables usage tracking; anonymous access has a smaller budget. | Create an [OpenAlex account and copy its API key](https://openalex.org/settings/api). See [OpenAlex authentication and limits](https://help.openalex.org/api/authentication/). |
| Recommended alongside OpenAlex | **OpenAlex contact email** (`PIPILOT_OPENALEX_MAILTO`) | Enter a valid contact email. Research Pilot sends it with OpenAlex requests and also uses it to enable **Unpaywall** lookup for open-access DOI PDFs. Without an email, the Unpaywall step is skipped. This is an email address, not an API key, and does not replace the OpenAlex key. | Use your own contact email; no separate Unpaywall key is needed. |
| Recommended for regular literature searches | **Semantic Scholar API key** (`SEMANTIC_SCHOLAR_API_KEY`) | Supports paper discovery and metadata enrichment with authenticated access. Anonymous requests share more constrained access and may be throttled. | Request a key from the [Semantic Scholar API page](https://www.semanticscholar.org/product/api); approved keys are delivered by email. See its [API access guidance](https://webflow.semanticscholar.org/product/api). |
| Useful for ML/AI researchers | **Hugging Face token** (`HF_TOKEN`) | Authenticates searches of Hugging Face Papers, a curated ML/AI paper source. Anonymous search remains available subject to provider limits. This field is for paper discovery, not model inference. | Create a token in [Hugging Face settings](https://huggingface.co/settings/tokens). Paper search does not need repository write access; see the [token permissions guide](https://huggingface.co/docs/hub/en/security-tokens). |
| Useful for additional full-text coverage | **Paperclip API key** (`PAPERCLIP_API_KEY`) | Enables Research Pilot's Paperclip resolver for DOI, PubMed, and PMC identifiers. Without it, Paperclip is skipped; arXiv and supported open-access DOI retrieval can still work. Coverage varies by paper. | Sign in to [Paperclip API Keys](https://paperclip.gxl.ai/keys) and create a key. |

Leave **Paperclip endpoint** (`PIPILOT_PAPERCLIP_URL`) blank to use the default `https://paperclip.gxl.ai/mcp`. Change it only when you have a specific alternative Paperclip endpoint.

These services help discover and retrieve available research material; credentials do not guarantee that every paper has accessible full text. PDF retrieval may still need the optional converter described above.

#### General web search for PI Agent

For PI Agent to search websites beyond academic indexes, configure **Settings → PI Agent → Brave Search key** (`BRAVE_API_KEY`). We strongly recommend this for research involving current websites, project documentation, or other non-paper sources.

Create an account in the [Brave Search API dashboard](https://api-dashboard.search.brave.com/), activate a suitable Search API plan, and create an API key as described in [Brave's authentication guide](https://api-dashboard.search.brave.com/documentation/guides/authentication). Paste it into the app and click **Save**.

Without this key, PI's `web_search` reports that general web search is unavailable. Academic literature search remains a separate capability. Claude Code and Codex sessions use their host's web tools; this setting configures PI Agent.

#### Model-provider credentials for PI Agent

PI Agent also needs access to a language model. If **Settings → PI Agent** detects a supported local Claude/Codex login that works with your selected model, you can use that authentication. Otherwise, configure **one** of the provider keys below and choose an available model for that provider.

| Model family | Field in Settings → PI Agent | Get a key |
| --- | --- | --- |
| Claude | **Anthropic API key** (`ANTHROPIC_API_KEY`) | [Anthropic Console keys](https://console.anthropic.com/settings/keys); [API setup documentation](https://platform.claude.com/docs/en/api/overview). |
| OpenAI | **OpenAI API key** (`OPENAI_API_KEY`) | [OpenAI API keys](https://platform.openai.com/api-keys); use a standard application API key as described in the [API authentication documentation](https://developers.openai.com/api/reference/overview#authentication). |
| Gemini | **Google API key** (`GOOGLE_API_KEY`) | [Google AI Studio](https://aistudio.google.com/apikey); follow the [Gemini API key setup](https://ai.google.dev/gemini-api/docs/api-key). |
| DeepSeek | **DeepSeek API key** (`DEEPSEEK_API_KEY`) | [DeepSeek platform](https://platform.deepseek.com/); follow the [API getting-started guide](https://api-docs.deepseek.com/). |

Click **Save**, select a model available to your account, and try a short PI conversation. Configure standalone Claude Code or Codex authentication using the CLI instructions in section 3. Literature-source keys do not authenticate a language model, and a model-provider key does not enable Brave Search.

#### Check your setup

Start with small requests: search for a few papers on a familiar topic, fetch the full text of one known open-access paper, and, if you enabled Brave, ask PI to search the web for a project's official documentation. A successful literature search does not by itself verify full-text retrieval or general web search.

For authentication errors, check the key and selected provider. For rate-limit or quota errors, check that provider's usage dashboard and plan. Provider access, quotas, and charges are controlled by the provider and may change; check the linked official pages before choosing a paid plan. Enter credentials in the app's Settings, not in project files or GitHub issues.

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

## 7. Optional: follow and drive sessions from your phone

Research Pilot can share its running agent sessions with your iPhone or iPad. The desktop app serves a small web app to the phone; the phone is only a window. Agents, files, and research data stay on your computer, so the desktop app must remain open while you use the phone.

From the phone you can select a workspace, start **Claude**, **Codex**, or **PIAgent**, follow a live session as it streams, send prompts into the running agent, answer approval questions, and browse the workspace's **Files**, **Literature**, **Knowledge**, **Recap**, and **Research** views. Optional push notifications tell you when an agent has replied.

This feature is off by default.

### Why Tailscale

[Tailscale](https://tailscale.com/) creates a private network between your own devices. Research Pilot uses it in two ways:

- The phone gateway listens only on your computer's Tailscale address, so it is reachable from your other Tailscale devices and from nowhere else. It works at home, on campus Wi-Fi, or on cellular data, without opening ports on your router.
- Tailscale issues a real HTTPS certificate for your computer's Tailscale name. iOS requires HTTPS for **Add to Home Screen** app installs and for push notifications. Without it the phone can still read sessions over plain HTTP, but install and notifications do not work.

Tailscale's free personal plan is sufficient. Install it on both devices and sign in with the **same account**:

- Computer: [Tailscale download page](https://tailscale.com/download), which offers macOS and Linux packages.
- iPhone or iPad: [Tailscale on the App Store](https://apps.apple.com/us/app/tailscale/id1470499037).

For HTTPS, two settings in the [Tailscale admin console](https://login.tailscale.com/admin/dns) must be enabled under **DNS**: **MagicDNS** and **HTTPS Certificates**. New tailnets usually have MagicDNS on already; HTTPS Certificates is a one-time switch. If they are off, Research Pilot falls back to HTTP and reports this in Settings.

### Connect your phone

1. Make sure Tailscale is connected on both the computer and the phone.
2. In Research Pilot, open **Settings → Phone (iOS companion)** and turn on **Share sessions to your phone**.
3. Check the status line. It should read **HTTPS, Tailscale**. If it reads **no Tailscale**, the app could not find the Tailscale command; confirm Tailscale is installed and running, then toggle the switch again. If it reads **HTTP**, check the two DNS settings above.
4. Scan the QR code with the phone's camera, or use **Copy link** and send the link to yourself. The link contains the access token and pairs the phone on first open.
5. On the phone, use **Share → Add to Home Screen**, then open Research Pilot from its icon for a full-screen view. Open the phone app's menu and choose **Enable push notifications** if you want reply alerts.

Pairing is per computer. Repeat these steps if you install Research Pilot on another machine.

### Access and security

- The pairing link is a credential. Anyone who has it can read your sessions and drive your agents, which run with full permissions as described in section 3. Do not post the link or the token publicly.
- **New token** in the Phone settings invalidates every paired phone. Use it if a link was shared by mistake, then scan the new QR code.
- **LAN mode (unencrypted)** appears only when Tailscale is not detected. It serves plain HTTP on your local network with no encryption, and anyone on that network with the link can connect. It is a fallback for networks you fully trust, not a substitute for Tailscale.
- The gateway uses port 8788 on your computer. Nothing is sent to a cloud service; push notifications go through Apple's push service as encrypted messages that contain only the agent name and the session title, not the conversation.
- The phone app was designed and tested with Safari on iPhone and iPad. Other phones may be able to read sessions in a browser, but install and notification behavior there is not verified.

## 8. Troubleshooting

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
| Phone settings report `no Tailscale` | Confirm Tailscale is installed and connected on your computer, then toggle **Share sessions to your phone** off and on. Without it, only LAN mode can serve the phone. |
| Phone settings report `HTTP` instead of `HTTPS` | In the [Tailscale admin DNS page](https://login.tailscale.com/admin/dns), enable **MagicDNS** and **HTTPS Certificates**, then toggle the phone switch again. Reading sessions works over HTTP; Add to Home Screen and push notifications need HTTPS. |
| Phone shows a pairing screen again | The access token changed, or **New token** was used. Reopen Settings → Phone and scan the current QR code or copy the current link. |
| Python or MarkItDown is missing | These affect the optional features described above. Install the tool you need, reopen the app, and click **Recheck**. |
| Literature search fails or returns limited results | Inspect the provider error and its credentials/rate limits in **Literature & full-text**. Full-text availability varies by paper. |

For a reproducible problem, use **Export diagnostics** in the Environment check and open an [issue](https://github.com/daidong/DIR-Agent/issues). Include your Research Pilot version, operating system, CPU architecture, package type, exact error, and the steps that triggered it. Review diagnostic files before posting publicly and omit credentials or private research content.

## Release validation

For 0.6.5, 923 automated tests passed, together with Electron typechecking, production builds, release dependency/size checks, and the end-to-end demo. GitHub CI passed on Node 18 and Node 20.

The macOS application passed code-signature, Apple notarization, stapled-ticket, and Gatekeeper checks. DMG and ZIP application archives, daemon/MCP bundles, and mobile code matched the tested application. Packaged GUI startup, daemon authentication, MCP calls, PI imports, and native PTY spawning passed on macOS arm64 and Ubuntu 24.04 arm64/x64. Linux deb installation and AppImage extraction with the extracted runtime were checked. Linux x64 checks used Rosetta emulation on Apple Silicon, with QEMU for AppImage extraction; these are not physical x64 desktop or FUSE-mount certification claims.
