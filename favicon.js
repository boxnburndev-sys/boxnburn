(function setCircularFavicon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <circle cx="32" cy="32" r="32" fill="white"/>
      <clipPath id="circleMask">
        <circle cx="32" cy="32" r="32"/>
      </clipPath>
      <image href="https://i.ibb.co/bj5mBF0t/Box-N-Burn-Algemeen.png" x="0" y="0" width="64" height="64" clip-path="url(#circleMask)" preserveAspectRatio="xMidYMid slice"/>
    </svg>
  `;
  const url = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach(el => el.remove());
  const link = document.createElement("link");
  link.rel = "icon";
  link.href = url;
  link.sizes = "any";
  document.head.appendChild(link);
})();
