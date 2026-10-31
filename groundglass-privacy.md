# Privacy Policy — Groundglass for Android

> Groundglass privacy policy: what each permission is for, why photos and geotags stay on device, and the anonymous reports you can switch off.

Source: https://trunghieuvn.github.io/groundglass/privacy.html

Groundglass has moved to [trunghieuvn.github.io/groundglass](https://trunghieuvn.github.io/groundglass/). This policy is also published there, at [/privacy.html](https://trunghieuvn.github.io/groundglass/privacy), and the two copies say the same thing.

# Privacy Policy

Effective date: October 31, 2026

Groundglass — published on Google Play as *Groundglass Manual Cam Pro RAW*, package `vn.fighttech.groundglass` — is a manual camera app for Android published by FightTech VN. In short: **your photos are captured, processed and stored on your phone, they are never uploaded, and there is no account.**The app uses the internet for three things only: downloading film looks from the Presets Store when you open it, sending anonymous usage counts and crash reports, and sending anonymous daily counts of which film looks were used to our own server; one switch in Settings turns off both the reports and the look counts. There are no ads and we do not sell any data.

## What the app does

The app operates your phone's camera and writes the resulting image file to your own storage. Everything — exposure, focus, white balance, RAW conversion and the film looks — runs on your device's own CPU and GPU. There is no cloud processing, no user account and no sign-in. Nothing the app sends over the internet contains your photos or anything taken from them. It also talks to Google Play on your own phone, to show Pro prices, run a purchase you start, and check which purchases you own.

## Permissions the app declares

These are the only permissions in the app's manifest. Android asks you for the runtime ones (camera, location) at the moment each is first needed, and you can revoke them later in *Settings → Apps → Groundglass → Permissions*.

- **Camera**(`CAMERA`) — required. It is what runs the viewfinder and takes the photo. Without it the app cannot function. The camera feed is rendered on screen and written to the file you capture; it is never streamed anywhere.
- **Location, optional**(`ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`) — used for one purpose only: writing GPS coordinates into the EXIF metadata of the photos you take, on the device. It is requested only if you switch on *Save location in photos* in the app's settings, which is off by default. The coordinates are stored inside your own image files and are not transmitted to us or to any third party. Leave the setting off and the app never asks for the permission and never reads your location. GPS hardware is declared as optional, so the app installs on phones without it.
- **Internet**(`INTERNET`, `ACCESS_NETWORK_STATE`) — used for the Presets Store, for anonymous usage and crash reports, and for the anonymous daily look counts, all described below. None of these is a runtime permission.
- **Google Play billing**(`com.android.vending.BILLING`) — added by Google's Play Billing library for the optional Groundglass Pro purchase. It lets the app hand a purchase to the Google Play app on your phone.
- **Background upload and install source**(`WAKE_LOCK`, `com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE`) — added by the Firebase SDKs. The first lets a usage or crash report that is already queued finish sending if the screen turns off; the second lets the analytics SDK read, once, which Google Play listing the app was installed from, used only for aggregate install counts and never for advertising. Neither is a runtime permission, and both stop being used when you switch the reports off.
- **Storage, on older Android only**(`WRITE_EXTERNAL_STORAGE`, declared with `maxSdkVersion="28"`) — needed on Android 9 and earlier to save your photos into the shared Pictures library. On Android 10 and newer the app writes through the system MediaStore and this permission is neither declared nor requested. The app does not ask for broad access to read your existing photo library.

The app declares no contacts, microphone, phone, calendar, SMS or background-location permission, and no "all files access". It also declares **no advertising permission**: `AD_ID` and the Android Ad Services permissions are explicitly removed from the build, and advertising-ID collection is switched off in the analytics SDK, so the app cannot read your advertising identifier.

## Your photos and where they go

Photos are written into a folder inside your device's public `Pictures` directory — `Pictures/Groundglass` by default, or whichever folder name you set — and registered with your media library so Gallery and other apps can see them. You choose the file format (JPEG, plus RAW DNG on devices whose sensor supports it), the quality and the filename pattern. Photos you take belong to you and stay on your device until you move or delete them; uninstalling the app does not delete them.

The image files carry standard EXIF metadata written by the app — exposure time, ISO, aperture, focal length, white balance, orientation, the date and time from your device, and GPS coordinates if and only if you enabled geotagging. That metadata travels inside the file, so bear it in mind before sharing a photo publicly. It is written locally; we never see it.

## The Presets Store

When you open the Presets Store, the app downloads the store's catalogue and the before/after sample pictures, and, when you pick a look, that look's colour file. They come from our content server, which is delivered through Cloudflare's network. These are plain file downloads: like any web request they reveal your IP address and a standard app user-agent to that server, and they carry no account, no device identifier and nothing from your photos. If you preview a look on your own photos, the preview is rendered on your phone; the photo is never uploaded. Looks you download are kept on your phone. If you never open the store, the app never contacts it.

## Analytics and crash reporting

The app uses **Google Analytics for Firebase**and **Firebase Crashlytics**, both provided by Google, to learn which features get used and to fix crashes. Both are on by default and both stop when you switch off *Settings → Storage & privacy → Send usage and crash reports*; the choice is remembered across launches. The same switch also stops the look counts.

- **Usage counts**— which screens and camera settings are used (for example that a drive mode was chosen, that a photo was saved or shared and whether it worked, or that the paywall was opened and a purchase started, was pending, finished, failed or was cancelled, with the product ID; and whether Pro is active), the app version, the phone model, Android version, language and country, and a random app-instance ID that Firebase creates on install. Country is derived by Google from the connection; Google Analytics does not log or store IP addresses.
- **Crash reports**— when the app fails, or hits an error it recovers from (the camera failing to open, a photo that could not be saved, a LUT that could not be loaded), the stack trace and the part of the app where it happened, the phone model, Android version, free memory and disk space, orientation, a random Crashlytics installation ID, and the list of app events that led up to it.

**What is never sent:**your photographs or any part of one, thumbnails, file names, folder names, your GPS location or geotags, the contents of your media library, your advertising identifier, your name, email or any account identifier.

This data is processed by Google on our behalf, under the [Firebase privacy and security terms](https://firebase.google.com/support/privacy). It is used only to improve the app, never for advertising, never combined with other data to identify you, and never sold.

**No advertising.**The app contains no ads and no ad SDK.

## Favourites and look popularity counts

You can pin looks to the front of the camera's look strip, and star looks in the Presets Store to keep them under *Favourites*. These lists are kept in the app's private storage on your phone and are never sent anywhere.

So that we can tell which film looks people actually use, the app also keeps an anonymous count for each day: which built-in looks and which Presets Store looks you applied that day, and which you pinned, starred, unpinned or unstarred. Each look is noted at most once a day, however often you use it. LUTs you imported yourself are never recorded.

Once a day is over, the app sends it in one HTTPS POST to our own server, `https://fighttech.vn/api/v1/looks/usage` (FightTech VN). If the phone is offline it tries again later, and several finished days may then travel in the same request, each with its own token; a day still unsent after 7 days is deleted from the phone. The request holds only:

- the app's package name (`vn.fighttech.groundglass`) and the date;
- a random token drawn fresh for that one day, used only to refuse the same day if it is sent twice. The server stores only a hash of it and deletes that after 9 days;
- for each look, its built-in ID (for example `vint-neg-1`) and whether you applied, starred (or pinned) or unstarred it that day.

It holds **no**installation ID, advertising ID, account, device model, photo, file name or location, so two days cannot be linked to each other or to your phone. The server keeps only totals: for each app, day and look, how many installs used it, starred it and unstarred it, and how many installs reported that day. The totals are kept for 400 days, then deleted. This endpoint stores nothing about the request itself: not your IP address, which, like any web request, the network and the server see while it is handled, and not the standard header Android adds to web requests, which names the Android version and phone model. The totals are visible only to FightTech VN, in an internal report that hides any look used by fewer than 5 installs. They are never sold or shared.

The counts stop when you switch off *Settings → Storage & privacy → Send usage and crash reports*, the same switch as the analytics. Switching it off also deletes the days not yet sent.

## Data we collect

**Only the anonymous usage counts and crash reports described above**, which we see as totals and individual crash reports in the Firebase console, **and the anonymous daily look totals**on our own server. We — FightTech VN — hold no database of users, and we never see your photos or your settings. There is no account system and no newsletter.

**Purchases.**Groundglass Pro (bracket, night, long exposure, focus stacking, interval and light-trail modes, and the Presets Store's Pro looks) is sold as a monthly or yearly subscription or a one-time lifetime unlock through Google Play Billing. Google processes the payment under the [Google Privacy Policy](https://policies.google.com/privacy); your card details and billing address are never given to us or to the app. As the seller, Google Play Console shows us the order record for each purchase — order ID, product, date, price and country — which we use only for refunds, tax and support, and not to identify or contact you. The app verifies the purchase on your phone with Google's signature and remembers the result locally; it sends nothing about it to us. The built-in film looks, RAW and every manual control are free and need no purchase.

## Data shared with third parties

**None is sold or shared for advertising.**Google receives the usage counts and crash reports as the service provider that runs Firebase for us, and Cloudflare delivers the Presets Store's files; neither receives your photos. The daily look counts go to our own server, not to a third party. Google Play runs any Groundglass Pro purchase itself, as described above.

## Data retention and deletion

Your settings, saved preferences and downloaded looks live on your device and are removed when you uninstall the app. Photos you have taken are yours and stay in `Pictures` until you delete them.

Firebase Crashlytics keeps crash reports for 90 days. Google Analytics keeps user-level event data for the retention period set in our project, at most 14 months, after which only aggregated totals remain. On our server, the anonymous per-day look totals are kept for 400 days, then deleted; days not yet sent stay on the phone for at most 7 days. Switching off *Send usage and crash reports* stops any new data, including the look counts, and deletes the days of look counts not yet sent; clearing the app's data or reinstalling it creates a new random app-instance ID, so earlier data can no longer be linked to your phone. Look counts already sent are anonymous totals that cannot be traced back to you, so they cannot be deleted for one person. You can also write to us at the address below. You can cancel a subscription or request a refund in the Google Play app under *Payments & subscriptions*.

## Children

The app is not directed at children under 13 and does not knowingly collect personal information from children.

## Your responsibility

You are responsible for the photographs you take and how you use them, including consent of the people you photograph and the law of the place you are shooting in.

## Changes to this policy

If the app's data practices change, this page will be updated and the date above revised before the new version is released. If a future version adds a permission or an SDK, it will be listed here first. *Written on September 5, 2026 for the first Groundglass release, which shipped with no analytics, no crash reporting and no internet permission. Revised on September 21, 2026 for the release that added the optional Groundglass Pro purchase through Google Play Billing. Revised on September 27, 2026 for the release that adds the internet permission, for the Presets Store and for anonymous usage and crash reports through Firebase, with the switch in Settings that turns the reports off. Revised on October 31, 2026 for the release that adds favourites and the anonymous daily look counts sent to our own server, which the same switch turns off.*

## Contact

Questions about this policy, or a request about your data? Email [trunghieu4121993@gmail.com](mailto:trunghieu4121993@gmail.com).
