(function () {
  // Inject banner + modal into every page
  const bannerHTML = `
    <div id="cookie-banner" style="position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:3px solid #f97316;box-shadow:0 -2px 10px rgba(0,0,0,.15);padding:1rem;z-index:9999;display:none;font-family:Segoe UI,Roboto,sans-serif;">
      <p style="margin:0 0 0.6rem;font-size:0.9rem;color:#222;">Wij gebruiken cookies om onze site goed te laten werken en uw ervaring te verbeteren. Kies uw voorkeur:</p>
      <div class="buttons" style="display:flex;gap:0.5rem;flex-wrap:wrap;">
        <button id="accept-all" style="flex:1;background:#f97316;color:#fff;border:none;border-radius:6px;padding:0.6rem 1rem;cursor:pointer;">Alles accepteren</button>
        <button id="accept-essential" style="flex:1;background:#e5e7eb;color:#222;border:none;border-radius:6px;padding:0.6rem 1rem;cursor:pointer;">Alleen noodzakelijke</button>
        <button id="reject-all" style="flex:1;background:#ef4444;color:#fff;border:none;border-radius:6px;padding:0.6rem 1rem;cursor:pointer;">Alles weigeren</button>
        <button id="settings" style="flex:1;background:#0b2545;color:#fff;border:none;border-radius:6px;padding:0.6rem 1rem;cursor:pointer;">Instellingen</button>
      </div>
    </div>
    <div id="cookie-settings" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);z-index:10000;align-items:center;justify-content:center;font-family:Segoe UI,Roboto,sans-serif;">
      <div style="background:#fff;padding:1.5rem;border-radius:12px;width:90%;max-width:500px;">
        <h2 style="margin-top:0;font-size:1.2rem;color:#0b2545;">Cookie-instellingen</h2>
        <label style="display:flex;align-items:center;gap:0.5rem;margin:0.5rem 0;"><input type="checkbox" id="analytics"> Analytische cookies</label>
        <label style="display:flex;align-items:center;gap:0.5rem;margin:0.5rem 0;"><input type="checkbox" id="marketing"> Marketing cookies</label>
        <div style="margin-top:1rem;display:flex;gap:0.5rem;">
          <button id="save-settings" style="flex:1;background:#f97316;color:#fff;border:none;border-radius:6px;padding:0.6rem 1rem;cursor:pointer;">Opslaan</button>
          <button id="cancel-settings" style="flex:1;background:#e5e7eb;color:#222;border:none;border-radius:6px;padding:0.6rem 1rem;cursor:pointer;">Annuleren</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", bannerHTML);

  const banner = document.getElementById("cookie-banner");
  const settingsModal = document.getElementById("cookie-settings");
  const analyticsCb = document.getElementById("analytics");
  const marketingCb = document.getElementById("marketing");

  function saveConsent(consent) {
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
  }

  function getConsent() {
    return JSON.parse(localStorage.getItem("cookieConsent") || "null");
  }

  function applyConsent(consent) {
    if (!consent) return;
    if (consent.analytics) enableAnalytics();
    if (consent.marketing) enableMarketing();
  }

  // Dummy functions – replace with real integrations
  function enableAnalytics() {
    console.log("✅ Analytics enabled");
    // Example: load GA script dynamically
    // let s=document.createElement("script");
    // s.src="https://www.googletagmanager.com/gtag/js?id=UA-XXXX";
    // document.head.appendChild(s);
  }
  function enableMarketing() {
    console.log("✅ Marketing enabled");
    // Example: load FB pixel script dynamically
  }

  // Init
  const storedConsent = getConsent();
  if (!storedConsent) {
    banner.style.display = "block";
  } else {
    applyConsent(storedConsent);
  }

  // Buttons
  document.getElementById("accept-all").onclick = () => {
    const consent = { essential: true, analytics: true, marketing: true };
    saveConsent(consent); applyConsent(consent);
    banner.style.display = "none";
  };
  document.getElementById("accept-essential").onclick = () => {
    const consent = { essential: true, analytics: false, marketing: false };
    saveConsent(consent);
    banner.style.display = "none";
  };
  document.getElementById("reject-all").onclick = () => {
    const consent = { essential: false, analytics: false, marketing: false };
    saveConsent(consent);
    banner.style.display = "none";
  };
  document.getElementById("settings").onclick = () => {
    const c = getConsent() || { essential: true, analytics: false, marketing: false };
    analyticsCb.checked = c.analytics;
    marketingCb.checked = c.marketing;
    settingsModal.style.display = "flex";
  };
  document.getElementById("save-settings").onclick = () => {
    const consent = {
      essential: true,
      analytics: analyticsCb.checked,
      marketing: marketingCb.checked
    };
    saveConsent(consent); applyConsent(consent);
    settingsModal.style.display = "none";
    banner.style.display = "none";
  };
  document.getElementById("cancel-settings").onclick = () => {
    settingsModal.style.display = "none";
  };
})();
