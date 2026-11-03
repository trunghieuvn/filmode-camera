# Privacy Policy — FilCam for Android

> FilCam privacy policy: what each permission is for, why photos and geotags stay on your device, and what the free version's ads and usage reports send.

Source: https://trunghieuvn.github.io/filmode-camera/privacy.html

# Privacy Policy

Effective date: November 3, 2026

FilCam — published on Google Play as *FilCam: Pro Manual RAW Camera*, package `app.filmode.filcam` — is a manual camera app for Android published by FightTech. This policy describes exactly what the app accesses on your device and what leaves it. In short: **your photos are captured, processed and stored on your phone, they are never uploaded, and there is no account.**The app uses the internet for four things only: downloading film looks from the Presets Store when you open it, sending anonymous usage and crash reports, so that a camera that fails on your phone can be fixed for your phone, sending anonymous daily counts of which film looks were used to our own server, and, in the free version, showing ads from Google AdMob — a banner on the Settings screen only, and a rewarded video you can choose to watch for 30 minutes of Pro — which use your device's advertising ID subject to the consent choices you make. FilCam Pro removes all ads. The sections below list exactly what each involves, and one switch in Settings turns the reports and the look counts off. We do not sell any data.

## What the app does

The app operates your phone's camera, applies the settings and film look you choose, and writes the resulting image file to your own storage. Everything — exposure, colour, LUTs, RAW conversion and the built-in photo editor — runs on your device's own CPU and GPU. There is no cloud processing of your images, no user account and no sign-in. Nothing the app sends over the internet contains your photos or anything taken from them: its only network traffic is the Presets Store downloads, the anonymous usage and crash reporting, the anonymous daily look counts and, in the free version, the ads and their settings, all described below. It also talks to Google Play on your own phone, to show FilCam Pro prices, run a purchase you start, and check which purchases you own.

## Permissions the app declares

These are the only permissions in the app's manifest, including the ones Google's ad library adds to it. Android asks you for the runtime ones (camera, microphone, location) at the moment each is first needed, and you can revoke any of those later in *Settings → Apps → FilCam → Permissions*; the network and billing permissions are granted at install time.

- **Camera**(`CAMERA`) — required. It is what runs the viewfinder and takes the photo. Without it the app cannot function. The camera feed is rendered on screen and written to the file you capture; it is never streamed anywhere.
- **Location, optional**(`ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`) — used for one purpose only: writing GPS coordinates into the EXIF metadata of the photos you take, on the device. It is requested only if you switch on *Save location in photos* in the app's settings, which is off by default. The coordinates are stored inside your own image files and are not transmitted to us or to any third party. Leave the setting off and the app never asks for the permission and never reads your location. GPS hardware is declared as optional, so the app installs on phones without it.
- **Microphone, optional**(`RECORD_AUDIO`) — used for one purpose only: recording sound into the videos you shoot with the Pro camera. It is requested the first time a clip records with *Record sound* on; turn that setting off, or deny the permission, and clips are recorded silent. The sound is written into your own video file on the device and is never transmitted to us or to anyone else. The microphone is declared as optional hardware.
- **Storage, on older Android only**(`WRITE_EXTERNAL_STORAGE`, declared with `maxSdkVersion="28"`) — needed on Android 9 and earlier to save your photos into the shared Pictures library. On Android 10 and newer the app writes through the system MediaStore and this permission is neither declared nor requested. The app does not ask for broad access to read your existing photo library.
- **Network**(`INTERNET`, `ACCESS_NETWORK_STATE`, `WAKE_LOCK`) — these are not permissions Android asks you about; they are granted at install time. They are used for four things: downloading the Presets Store's catalogue and looks when you open the store, delivering a usage or crash report (the wake lock lets a report that is already queued finish sending if the screen turns off), sending the anonymous daily look counts to our server, and, in the free version, loading ads and the ad settings described under Advertising. The reporting libraries add one Play Store permission, `com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE`, which lets Google Play tell the app which listing the install came from. Nothing else in the app uses the network, and nothing you shot is ever uploaded.
- **Advertising ID and Android ad services**(`com.google.android.gms.permission.AD_ID`, `ACCESS_ADSERVICES_AD_ID`, `ACCESS_ADSERVICES_ATTRIBUTION`, `ACCESS_ADSERVICES_TOPICS`) — added by Google's AdMob library for the ads in the free version. They let the ad SDKs read your device's resettable advertising identifier and use Android's own ad-measurement features, as described under Advertising. Firebase Analytics keeps advertising-ID collection switched off, so only the ad SDKs read it. None is a runtime permission. You can reset or delete this ID in Android's own settings (*Settings → Privacy → Ads*, or *Google → Ads* on some phones).
- **Google Play billing**(`com.android.vending.BILLING`) — added by Google's Play Billing library for the optional FilCam Pro purchase. It lets the app hand a purchase to the Google Play app on your phone.

The app declares no contacts, phone, calendar, SMS or background-location permission, and no "all files access". Apart from GPS geotags you switch on yourself, the only location data is the **approximate location**(a coarse region estimated from your IP address) that the ad SDKs collect in the free version, described under Advertising.

## Your photos and where they go

Photos are written into a folder inside your device's public `Pictures` directory — `Pictures/Filmode` by default, or whichever folder name you set — and registered with your media library so Gallery and other apps can see them. You choose the file format (JPEG, HEIF or PNG, plus RAW DNG on devices that support it), the quality and the filename pattern. Photos you take belong to you and stay on your device until you move or delete them; uninstalling the app does not delete them.

The image files carry standard EXIF metadata written by the app — exposure time, ISO, aperture, focal length, white balance, orientation, the date and time from your device, and GPS coordinates if and only if you enabled geotagging. That metadata travels inside the file, so bear it in mind before sharing a photo publicly. It is written locally; we never see it.

## The Presets Store

When you open the Presets Store, the app downloads the store's catalogue (`filmode.app/store/manifest.json` and `filmode.app/store/trending.json`) and the before/after sample pictures, and, when you pick a look, that look's colour file. They come from our content server at `filmode.app`, which is delivered through Cloudflare's network. These are plain file downloads: like any web request they reveal your IP address and a standard app user-agent to that server, and they carry no account, no device identifier and nothing from your photos. Looks you download are kept on your phone. If you never open the store, the app never contacts it.

*Match my photos* picks looks that suit your own pictures — the last few stills FilCam took, or photos you choose in Android's photo picker. The matching and every preview are computed on your phone; no photo, thumbnail or colour data from a photo is uploaded.

## Advertising

The free version of FilCam shows ads from **Google AdMob**: a **banner on the Settings screen only**, never on the camera screen, and an optional **rewarded video ad**that you choose to watch from the FilCam Pro screen to unlock every Pro feature for 30 minutes (ads stay on during those 30 minutes). Full-screen interstitial and app-open ads are built into the app but are currently switched off from our server. The **Unity Ads**SDK is bundled as a fallback network for when AdMob has no ad to show, and is also switched off from our server. Which ad formats and networks are on can be changed remotely without an app update, but ads never appear over the viewfinder or during recording.

**FilCam Pro removes all ads.**Once you have Pro (a purchase or a subscription), no ad is shown and the ad SDKs are not started.

To know which ad formats are on, the free version asks our own server, `https://fighttech.vn/api/v1/flags` (FightTech), when it starts. The request carries only the app's package name (`app.filmode.filcam`) — no identifier and nothing from your photos — and the answer, a set of on/off switches, is kept on the phone for the next launch.

To serve and measure ads, these SDKs may collect: your device's **advertising ID**, IP address (used to estimate an approximate location), device model, Android version, language, app version, your interactions with ads and the app (an ad was shown, clicked, watched to the end, or failed to load), and diagnostics about how the ad SDK runs. They use this to show ads, cap how often you see them, prevent fraud and measure performance, and share it with advertisers and ad partners for those purposes.

- **Personalised ads**use your advertising ID and interests inferred by the ad network across apps.
- **Non-personalised ads**are chosen from context only (the app, a coarse location, the time) and are not based on your past behaviour. Ad networks still use limited data for frequency capping, fraud prevention and aggregate reporting.

Which one you get depends on your consent choices and on the law where you are. How Google and Unity handle this data: [Google's use of data from partner apps](https://policies.google.com/technologies/partner-sites), [Unity's privacy policy](https://unity.com/legal/game-player-and-app-user-privacy-policy).

## Consent and privacy options

FilCam uses the **Google User Messaging Platform (UMP)**, a certified consent tool. Where the law requires it (for example in the European Economic Area, the United Kingdom, Switzerland and some US states), a consent form appears before any ad is requested. You can accept, refuse, or choose purposes and partners one by one. If you refuse, you still get non-personalised (or limited) ads, and the app works the same.

**To change your choice later:**open *Settings → Privacy options (ads)* in the app. The row appears whenever the consent form applies to you; it reopens the form so you can change or withdraw consent at any time. Your choice is stored on the phone by the UMP SDK and passed to the ad networks with each ad request.

You can also reset or delete your advertising ID in Android's settings, which cuts the link to previous ad data. The *Send usage and crash reports* switch controls our analytics, not the ads.

## Analytics and crash reporting

From version 1.0.1 FilCam includes two Google libraries: **Firebase Analytics**(Google Analytics for Firebase) and **Firebase Crashlytics**. They exist for one reason. Manual camera control on Android depends on what each manufacturer exposes through the Camera2 API, and it differs from phone to phone; without a crash report we cannot know that RAW capture fails on some particular model, and cannot fix it.

**What is sent.**

- **Which features you used**, as plain counters with no content — that a photo was captured, saved or shared, that a LUT or a preset was applied or imported, that a recipe was saved, that a long exposure was taken, and which of the two screens (camera, photo editor) you were on; in the Presets Store, that it was opened, which look or pack was viewed or used, and how many looks were matched to your photos; and on the FilCam Pro screen, that it was opened, which plan was selected, whether a purchase started, was pending, was cancelled or failed (with the plan's product ID), and whether Pro is active on the phone or was just gained or lost; in the free version, ad counters — that the ad SDKs started, an ad loaded, was shown, tapped, closed, went stale or failed to load (with its format, network, placement and error code), what AdMob reports a shown ad earned, that a rewarded ad was watched to the end and the 30-minute Pro pass opened, and that your personalised-ads answer changed. Never the photo, never the file, never the name of the LUT file you imported.
- **Crash and error reports**— the stack trace when the app crashes, or when an operation fails and the app recovers (opening the camera, taking a picture, writing a DNG, saving or exporting a photo, loading a LUT), the name of the operation that failed, and the recent in-app steps that led up to it. Reports are attributed to the app with an `app` key so we can tell FilCam's reports from our other apps'.
- **Device and app context**collected automatically by those libraries: your phone's model and manufacturer, the Android version, the app version, the language and country setting, the screen size, and a randomly generated installation identifier that Google's SDK creates. That identifier is not your advertising ID — advertising-ID collection is switched off in Firebase Analytics (`google_analytics_adid_collection_enabled` is `false`), and only the ad SDKs read it, as described under Advertising — and it is reset if you clear the app's data or reinstall.

**What is never sent:**your photographs or any part of one, thumbnails, file names, folder names, your GPS location or geotags, the location or contents of your imported LUT files, the contents of your media library, your advertising identifier, your name, your email or any account identifier. There is no account, so there is nothing to attach a report to a person by.

**The switch.**Open *Settings* in the app and turn off *Send usage and crash reports*. It is on when you install the app; switching it off stops collection in both libraries immediately, for as long as it stays off, and no further report leaves the device. The same switch also stops the look counts. Uninstalling the app has the same effect.

**Who processes it.**Google, as our processor, under the [Firebase privacy documentation](https://firebase.google.com/support/privacy) and [Google's Privacy Policy](https://policies.google.com/privacy). The data lands in our Firebase project and is visible only to us, in aggregate; we do not attempt to identify anyone from it, and we do not sell it, share it or use it for ad targeting. Retention follows Firebase's own settings: user-level analytics data is kept for 2 months, Google's default, which we have not extended, and Crashlytics reports are kept for 90 days.

**Advertising.**The usage and crash reports never carry your advertising ID and are not used for ad targeting. The ads in the free version are a separate matter, run by the ad SDKs and described under Advertising; this switch does not turn them off.

## Favourites and look popularity counts

You can pin looks to the front of the camera's look strip, star looks in the photo editor, and star looks in the Presets Store to keep them under *Favourites*. These lists are kept in the app's private storage on your phone and are never sent anywhere.

So that we can tell which film looks people actually use, the app also keeps an anonymous count for each day: which built-in looks and which Presets Store looks you applied that day, in the camera or the editor, and which you pinned, starred, unpinned or unstarred. Each look is noted at most once a day, however often you use it. LUTs you imported and looks you saved yourself are never recorded.

Once a day is over, the app sends it in one HTTPS POST to our own server, `https://fighttech.vn/api/v1/looks/usage` (FightTech). If the phone is offline it tries again later, and several finished days may then travel in the same request, each with its own token; a day still unsent after 7 days is deleted from the phone. The request holds only:

- the app's package name (`app.filmode.filcam`) and the date;
- a random token drawn fresh for that one day, used only to refuse the same day if it is sent twice. The server stores only a hash of it and deletes that after 9 days;
- for each look, its built-in ID (for example `vint-neg-1`) and whether you applied, starred (or pinned) or unstarred it that day.

It holds **no**installation identifier, advertising identifier, account, device model, photo, file name or location, so two days cannot be linked to each other or to your phone. The server keeps only totals: for each app, day and look, how many installs used it, starred it and unstarred it, and how many installs reported that day. The totals are kept for 400 days, then deleted. This endpoint stores nothing about the request itself: not your IP address, which, like any web request, the network and the server see while it is handled, and not the standard header Android adds to web requests, which names the Android version and phone model. The totals are visible only to us, in an internal report that hides any look used by fewer than 5 installs. They are never sold or shared.

The counts stop when you switch off *Settings → Send usage and crash reports*, the same switch as the reports above. Switching it off also deletes the days not yet sent.

## Data we collect

We — FightTech — hold no database of this app's users. What reaches us is only the anonymous usage and crash reporting described above, through Google's Firebase, and the anonymous daily look totals on our own server, and only while you leave that switch on. **We never see your photos, your files or your location.**The ad data described under Advertising goes to Google (and to Unity, if it is switched on), not to us; we see only aggregate ad reports. There is no account system and no newsletter.

**Purchases.**FilCam Pro (HDR bracketing, handheld night, long exposure, focus stacking, interval and light-trail modes, and the Presets Store's trending looks and Signature pack) is sold as a monthly or yearly subscription or a one-time lifetime unlock through Google Play Billing. Google processes the payment under the [Google Privacy Policy](https://policies.google.com/privacy); your card details and billing address are never given to us or to the app. As the seller, Google Play Console shows us the order record for each purchase — order ID, product, date, price and country — which we use only for refunds, tax and support, and not to identify or contact you. The app checks the purchase on your phone with Google's signature and remembers the result locally; it sends nothing about it to us. RAW, every manual control, the built-in looks and the free store packs need no purchase.

## Data shared with third parties

No data is sold. **Google AdMob and the User Messaging Platform**serve the free version's ads and ask for consent, and share the ad data described under Advertising with advertisers and ad partners. **Unity Technologies**' Unity Ads SDK is bundled as a fallback ad network but switched off by default. **Google's Firebase Analytics and Crashlytics**receive the usage counts and crash reports as our processor for the reporting described above. **Cloudflare**delivers the Presets Store's files and so sees the download requests described above. The daily look counts and the ad settings request go to our own server, not to a third party. **Google Play**runs any FilCam Pro purchase itself, as described above. None of them receives your photos.

## Data retention and deletion

All app data — your settings, imported LUTs, saved presets and recipes — lives on your device and is removed when you uninstall the app. Photos you have taken are yours and stay in `Pictures` until you delete them.

Usage reports are kept for 2 months and crash reports for 90 days, then deleted by Google automatically. Days of look counts not yet sent stay on the phone for at most 7 days; on our server, the anonymous per-day look totals are kept for 400 days, then deleted. AdMob and Unity keep ad data under their own retention policies, linked under Advertising; resetting your advertising ID breaks the link to past ad data. Nothing else about you is retained anywhere: we hold no account, profile or user database for FilCam.

### How to request deletion of your FilCam data

1. **Stop new reports.**Open FilCam, go to *Settings → Send usage and crash reports* and switch it off. From that moment the app sends no reports and no look counts, and the days of look counts not yet sent are deleted.
2. **Clear what is on your phone.**Uninstalling FilCam — or *Settings → Apps → FilCam → Storage → Clear data* — removes every setting, preset and LUT the app has stored, and resets its random installation identifier, so any later report cannot be linked to an earlier one. Your photographs are not touched: they stay in `Pictures` until you delete them yourself.
3. **Ask us to delete reports already sent.**Email [trunghieu4121993@gmail.com](mailto:trunghieu4121993@gmail.com?subject=FilCam%20data%20deletion%20request) with the subject *FilCam data deletion request*. Tell us your phone model and roughly when you used the app; we hold no name, email or account that could otherwise point us to you. We reply within 30 days and have the matching Firebase Analytics and Crashlytics records deleted.

**What gets deleted:**the anonymous usage counters, crash and error reports, the device and app context sent with them, and the app's random installation identifier. **What is kept:**nothing about you — and, on your own phone, your photographs, which are yours and which we never receive. Anything not deleted on request expires by itself on the schedule above: 2 months for usage data, 90 days for crash reports. **Look counts already sent**are anonymous totals that cannot be traced back to you, so they cannot be deleted for one person; they expire after 400 days.

## Children

The app is not directed at children under 13 and does not knowingly collect personal information from children.

## Your responsibility

You are responsible for the photographs you take and how you use them, including consent of the people you photograph and the law of the place you are shooting in.

## Changes to this policy

If the app's data practices change, this page will be updated and the date above revised before the new version is released. If a future version adds a permission or an SDK, it will be listed here first. *Revised on September 6, 2026 for version 1.0.1, which adds Firebase Analytics and Crashlytics, the network permissions they need, and the *Send usage and crash reports* switch that turns them off. Version 1.0.0 had none of these and no network access at all. Revised on September 28, 2026 for version 1.0.22, which adds the Presets Store and its downloads, and to list the optional microphone for Pro video and the FilCam Pro purchase through Google Play Billing. Revised on October 31, 2026 for the release that adds favourites and the anonymous daily look counts sent to our own server, which the same switch turns off. Updated on November 3, 2026 to add ads.*

## Contact

Questions about this policy, or a request about your data? Email [trunghieu4121993@gmail.com](mailto:trunghieu4121993@gmail.com).

[← Back to FilCam](https://trunghieuvn.github.io/filmode-camera/) · [Terms](https://trunghieuvn.github.io/filmode-camera/terms) · [Support](https://trunghieuvn.github.io/filmode-camera/support)
