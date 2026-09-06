# web-camera — FilCam marketing site

Static site for the Android app **FilCam: Pro Manual RAW Camera** (`app.filmode.filcam`).
No build step: plain HTML, one stylesheet, one script.

Served from a GitHub Pages **project subpath**, so every asset reference is relative
(`css/style.css`, not `/css/style.css`). Canonical / Open Graph URLs point at
`https://trunghieuvn.github.io/filmode-camera/` — change those if the repo is renamed.

```
index.html    hero, screenshots, how it works, features, privacy band, P/S/I/M modes, FAQ, CTA
privacy.html  the Play Store data-safety privacy URL — keep it truthful, it mirrors filcam/src.
              From 1.0.1 it describes Firebase Analytics + Crashlytics; if a build ever ships
              WITHOUT filcam/google-services.json this page has to go back to saying so.
groundglass-privacy.html  a second app's policy, kept alive here only because the
              Groundglass build in Play review still declares this URL. Its home is now
              ../web-groundglass/privacy.html → trunghieuvn.github.io/groundglass/privacy.html;
              edit BOTH copies or they will disagree.
terms.html
support.html
css/style.css structure copied from videotoaudio/web-videocompressor, recoloured dark
js/main.js    scroll reveal + screenshot lightbox (no i18n: this site is English only)
assets/       icon.png, favicon.svg (from filmode/web-landingpage/assets/lab-icon.*)
screenshots/  01..07, copied from filmode/web-landingpage/assets/lab/
robots.txt, sitemap.xml
```

Structure and CSS were copied from `ai-studio/videotoaudio/web-videocompressor`.
Feature copy comes from `docs/FV5_ROADMAP.md` §1 (shipped) plus RAW/DNG, which is in
build now. Nothing else from §2 is advertised.

The app is live on Google Play, so both store badges are real links to
`https://play.google.com/store/apps/details?id=app.filmode.filcam` and `.badge` has a solid
border. (They used to be non-clickable `<span>`s reading "Coming soon", with a dashed border,
because linking to a listing that 404s is worse than not linking at all — that is still the rule
for an app in review; `../web-groundglass/index.html` is in exactly that state today.)
