// Research Pilot site: latest-release download links, OS detection, video facade.
(function () {
  "use strict";
  var REPO = "daidong/DIR-Agent";
  var LATEST = "https://github.com/" + REPO + "/releases/latest";

  // Sticky nav border once the page scrolls.
  var nav = document.querySelector(".nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ---- which download fits this visitor -------------------------------------
  function detect() {
    var ua = navigator.userAgent || "";
    var plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
    if (/iPhone|iPad|iPod|Android/i.test(ua)) return Promise.resolve({ os: "mobile" });
    if (/Mac/i.test(plat) || /Macintosh/.test(ua)) return Promise.resolve({ os: "mac" });
    if (/Win/i.test(plat)) return Promise.resolve({ os: "windows" });
    if (/Linux|X11/i.test(plat + ua)) {
      var arm = /aarch64|arm64|armv8/i.test(ua + " " + plat);
      if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
        return navigator.userAgentData.getHighEntropyValues(["architecture"]).then(function (v) {
          return { os: v.architecture === "arm" || arm ? "linux-arm64" : "linux-x64" };
        }).catch(function () { return { os: arm ? "linux-arm64" : "linux-x64" }; });
      }
      return Promise.resolve({ os: arm ? "linux-arm64" : "linux-x64" });
    }
    return Promise.resolve({ os: "other" });
  }

  var LABEL = { mac: "Download for macOS", "linux-x64": "Download for Linux", "linux-arm64": "Download for Linux (ARM64)" };
  var PRIMARY_ASSET = { mac: "mac-arm64.dmg", "linux-x64": "linux-amd64.deb", "linux-arm64": "linux-arm64.deb" };
  var NOTE = {
    mac: "For Macs with Apple Silicon (M1 or later). Also for Ubuntu / Debian.",
    "linux-x64": "Ubuntu / Debian on Intel or AMD. Also for macOS (Apple Silicon) and Linux ARM64.",
    "linux-arm64": "Ubuntu / Debian on ARM64. Also for macOS (Apple Silicon) and Linux x86-64.",
    windows: "Windows is not supported yet. Packages are available for macOS (Apple Silicon) and Ubuntu / Debian.",
    mobile: "Research Pilot is a desktop app for macOS and Linux. Open this page on your computer to download it.",
  };

  // ---- the latest release from GitHub ------------------------------------------
  function fmtSize(bytes) { return bytes > 0 ? (bytes / 1048576).toFixed(0) + " MB" : ""; }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }); } catch (e) { return ""; }
  }
  function release() {
    var cached = null;
    try { cached = JSON.parse(sessionStorage.getItem("rp-release") || "null"); } catch (e) { /* ignore */ }
    if (cached && Date.now() - cached.at < 10 * 60 * 1000) return Promise.resolve(cached.data);
    return fetch("https://api.github.com/repos/" + REPO + "/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { if (!r.ok) throw new Error("GitHub " + r.status); return r.json(); })
      .then(function (data) {
        var slim = { tag: data.tag_name, name: data.name, url: data.html_url, published: data.published_at,
          assets: (data.assets || []).map(function (a) { return { name: a.name, url: a.browser_download_url, size: a.size }; }) };
        try { sessionStorage.setItem("rp-release", JSON.stringify({ at: Date.now(), data: slim })); } catch (e) { /* ignore */ }
        return slim;
      });
  }
  function assetFor(rel, suffix) {
    for (var i = 0; i < rel.assets.length; i++) if (rel.assets[i].name.slice(-suffix.length) === suffix) return rel.assets[i];
    return null;
  }

  function applyRelease(rel) {
    var version = (rel.tag || "").replace(/^v/, "");
    var when = fmtDate(rel.published);
    document.querySelectorAll("[data-release-label]").forEach(function (el) { el.textContent = "Version " + version + " is out" + (when ? " · " + when : ""); });
    document.querySelectorAll("[data-release-pill], [data-notes-link]").forEach(function (el) { el.href = rel.url; });
    document.querySelectorAll("[data-release-detail]").forEach(function (el) {
      el.innerHTML = "";
      el.appendChild(document.createTextNode("Version " + version + (when ? ", released " + when : "") + ". "));
      var a = document.createElement("a"); a.href = rel.url; a.textContent = "What’s new"; el.appendChild(a);
    });
    document.querySelectorAll("[data-asset]").forEach(function (el) {
      var asset = assetFor(rel, el.getAttribute("data-asset"));
      if (!asset) return;
      el.href = asset.url;
      el.setAttribute("download", "");
      el.title = asset.name + (asset.size ? " · " + fmtSize(asset.size) : "");
      if (el.classList.contains("btn-primary") && asset.size) {
        var s = document.createElement("span"); s.className = "size"; s.textContent = fmtSize(asset.size); el.appendChild(s);
      }
    });
    document.querySelectorAll("[data-file]").forEach(function (el) {
      var asset = assetFor(rel, el.getAttribute("data-file"));
      if (asset) el.textContent = asset.name;
    });
  }

  var releaseP = release().then(function (rel) { applyRelease(rel); return rel; }).catch(function () { return null; });

  detect().then(function (d) {
    var card = document.querySelector('.platform[data-platform="' + d.os + '"]');
    if (card) { card.classList.add("is-you"); var tag = card.querySelector(".recommended"); if (tag) tag.hidden = false; }
    var label = document.querySelector("[data-primary-label]");
    var note = document.querySelector("[data-primary-note]");
    if (LABEL[d.os] && label) label.textContent = LABEL[d.os];
    if (NOTE[d.os] && note) note.textContent = NOTE[d.os];
    var primary = document.querySelector("[data-primary-download]");
    if (primary && PRIMARY_ASSET[d.os]) {
      releaseP.then(function (rel) {
        var asset = rel && assetFor(rel, PRIMARY_ASSET[d.os]);
        if (asset) { primary.href = asset.url; primary.setAttribute("download", ""); primary.title = asset.name + " · " + fmtSize(asset.size); }
      });
    }
  });

  // ---- YouTube: load the player only when asked (privacy and page weight) ------
  document.querySelectorAll(".video[data-youtube]").forEach(function (box) {
    var btn = box.querySelector(".video-play");
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + box.getAttribute("data-youtube") + "?autoplay=1&rel=0&modestbranding=1";
      f.title = "Research Pilot launch film";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.allowFullscreen = true;
      f.referrerPolicy = "strict-origin-when-cross-origin";
      box.replaceChildren(f);
    });
  });
})();
