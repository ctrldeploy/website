/* Ctrl Deploy — site interactions
   1. Animated SOC 2 evidence card in the hero
   2. FAQ accordion
   3. Lucide icon hydration
   Ported from the Claude Design prototype's DCLogic. */
(function () {
  "use strict";

  var REDUCE =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Lucide icons ---------- */
  function initIcons() {
    var tries = 0;
    (function run() {
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
      } else if (tries++ < 40) {
        setTimeout(run, 100);
      }
    })();
  }

  /* ---------- Evidence card ---------- */
  var EVIDENCE = [
    "Customer data protected",
    "Only the right people get in",
    "Every action traceable",
    "Recoverable from any outage",
    "Vendor risk closed out",
  ];
  var TOTAL = 5;
  var HOLD = 3;

  var CHECK_SVG =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

  function renderEvidence(step) {
    var badge = document.getElementById("cred-badge");
    var rowsEl = document.getElementById("cred-rows");
    var cleanEl = document.getElementById("cred-clean");
    if (!badge || !rowsEl || !cleanEl) return;

    var passedCount = Math.min(step, TOTAL);
    var complete = step >= TOTAL;

    badge.innerHTML = complete
      ? '<span style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-success);background:var(--color-success-light);padding:5px 10px;border-radius:9999px;">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Audit-ready</span>'
      : '<span style="font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-primary);background:var(--color-primary-light);padding:5px 10px;border-radius:9999px;">' +
        passedCount + "/" + TOTAL + " passing</span>";

    var html = "";
    for (var i = 0; i < EVIDENCE.length; i++) {
      var met = i < passedCount;
      var icon = met
        ? CHECK_SVG
        : '<span style="width:13px;height:13px;border:2px solid var(--color-warning);border-radius:9999px;display:block;"></span>';
      var rowBg = met ? "var(--color-success-light)" : "var(--color-warning-light)";
      var tag = met ? "Met" : "Gap";
      var tagColor = met ? "var(--color-success)" : "var(--color-warning)";
      html +=
        '<div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--color-border);border-radius:6px;background:' +
        rowBg +
        ';transition:background 400ms var(--ease-out);">' +
        '<span style="width:20px;height:20px;flex:none;display:flex;align-items:center;justify-content:center;">' +
        icon +
        "</span>" +
        '<span style="flex:1;font-size:13.5px;line-height:1.3;color:var(--color-foreground);">' +
        EVIDENCE[i] +
        "</span>" +
        '<span style="font-family:var(--font-mono);font-size:10px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:' +
        tagColor +
        ';transition:color 400ms var(--ease-out);">' +
        tag +
        "</span>" +
        "</div>";
    }
    rowsEl.innerHTML = html;

    cleanEl.style.color = complete
      ? "var(--color-success)"
      : "var(--color-muted-foreground)";
  }

  function startEvidence() {
    if (!document.getElementById("cred-rows")) return;
    if (REDUCE) {
      renderEvidence(TOTAL + 1);
      return;
    }
    var step = 0;
    renderEvidence(step);
    (function advance() {
      step = step + 1;
      if (step > TOTAL + HOLD) step = 0;
      renderEvidence(step);
      setTimeout(advance, 750);
    })();
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var buttons = document.querySelectorAll("[data-faq-toggle]");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest("[data-faq-item]");
        var panel = item.querySelector("[data-faq-panel]");
        var plus = item.querySelector("[data-faq-plus]");
        var minus = item.querySelector("[data-faq-minus]");
        var open = item.getAttribute("data-open") === "true";
        // close all
        Array.prototype.forEach.call(
          document.querySelectorAll("[data-faq-item]"),
          function (other) {
            other.setAttribute("data-open", "false");
            var b = other.querySelector("[data-faq-toggle]");
            if (b) b.setAttribute("aria-expanded", "false");
            var p = other.querySelector("[data-faq-panel]");
            if (p) p.style.display = "none";
            var pl = other.querySelector("[data-faq-plus]");
            var mi = other.querySelector("[data-faq-minus]");
            if (pl) pl.style.display = "";
            if (mi) mi.style.display = "none";
          }
        );
        if (!open) {
          item.setAttribute("data-open", "true");
          btn.setAttribute("aria-expanded", "true");
          if (panel) panel.style.display = "";
          if (plus) plus.style.display = "none";
          if (minus) minus.style.display = "";
        }
      });
    });
  }

  function boot() {
    initIcons();
    startEvidence();
    initFaq();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
