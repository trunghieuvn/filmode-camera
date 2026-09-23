# web-camera — FilCam marketing site

Static site for the Android app **FilCam: Pro Manual RAW Camera** (`app.filmode.filcam`).
No build step: plain HTML, one stylesheet, two scripts.

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
js/i18n.js    language picker. English lives in the markup (data-i18n* attributes); the other
              eight are i18n/<code>.json with exactly the same keys and the same HTML tags.
              The choice is ?lang= → the last one picked (localStorage "filcam-lang", shared
              with filcam.web.app/ios) → English. Never the browser's language. Bump VERSION
              when a JSON changes, or browsers keep the old one.
js/main.js    scroll reveal + screenshot lightbox (labels come from i18n.js)
i18n/         vi ja ko zh ar hi fr id — ar sets dir="rtl", so layout CSS uses logical properties
assets/       icon.png, favicon.svg (from filmode/web-landingpage/assets/lab-icon.*)
screenshots/  <lang>/01..08.jpg, from fastlane/metadata-filcam/android/<locale>/images/phoneScreenshots
              (the Play listing's own set), re-encoded at 540x960
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

The App Store badge is not live yet: FilCam Duo for iPhone is still in App Review, so it reads
"Coming soon on the App Store", has the dashed `.badge-soon` border, and links to
`https://filcam.web.app/ios/` instead of a listing that 404s. Once the app is approved, point
both badges at `https://apps.apple.com/app/id6810742276`, drop `.badge-soon`, and change
`badge.ios.small` to "Download on the" in every i18n file.
