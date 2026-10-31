# Support & Help — FilCam for Android

> FilCam help: the P/S/I/M modes, long exposures and RAW DNG, bracketing and the intervalometer, where photos are saved, and how to reach us.

Source: https://trunghieuvn.github.io/filmode-camera/support.html

# FilCam Support

Everything below applies to the Android app, package `app.filmode.filcam`.

## Contact us

Email [trunghieu4121993@gmail.com](mailto:trunghieu4121993@gmail.com). We usually answer within two business days. Please include your phone model, your Android version, and — for anything about a specific photo — the mode, ISO, shutter and format you were shooting with.

## Getting started

- Grant the camera permission when the app first asks. Nothing works without it.
- Tap **PRO**to open the manual panel. Pick a channel — ISO, SHUTTER, EV, WB or FOCUS — and drag its ruler, or tap a value to jump straight to it.
- A channel you have not touched stays on **AUTO**. Tap **RESET**on a channel to hand it back to the camera.
- Press the shutter, or a volume key if you have mapped it. The frame you just took is one tap away from the editor.

## How the P / S / I / M modes work

There is no mode dial to hunt for — the letter in the readout is derived from what you have set by hand. Everything automatic is **P**. Set the shutter yourself and you are in **S**. Set the ISO yourself and you are in **I**. Set both and you are in **M**. Reset a channel and the letter moves back on its own.

## Shooting a long exposure

Open the SHUTTER channel and drag it towards the long end — up to 30 seconds, or your sensor's own maximum if that is shorter. Put the phone on something solid, use the self-timer (3 or 10 seconds) or a volume key so your finger does not move the frame, and expect the capture to take at least as long as the exposure you set. In **M**mode nothing drifts between frames, which is what you want for light trails and night work.

## RAW DNG

Switch the format to DNG in Settings. DNG holds the raw sensor data with the real capture metadata and *no* film look baked in — that is the point of it — so if you also want a ready-to-share picture, save JPEG alongside. RAW depends on your camera hardware reporting support for it; on a phone that does not, the option is not offered rather than failing silently. Open the files in Lightroom, Darktable, RawTherapee or Apple Photos.

## Bracketing, burst and the intervalometer

- **Bracket**— choose 3, 5 or 7 frames, the EV step between them, and a shift if you want the series centred somewhere other than the metered exposure. Merge them later in your HDR tool of choice.
- **Burst**— set how many frames to take and hold the shutter.
- **Interval**— set the gap between shots and either a number of shots or a duration in minutes. It can bracket each interval too. Keep the phone plugged in and cool for a long run; a hot phone will throttle.
- **Self-timer**— off, 3 or 10 seconds, and it works with every drive mode.

## Focus and metering

Focus modes are AF-C (continuous), AF-S (single), Macro, Infinity and MF. In MF the ruler sets an actual focus distance, which is what you want for a locked-off timelapse or a night scene the autofocus cannot find. Metering is Matrix, Centre-weighted or Spot, and AE-L, AWB-L and AF-L lock exposure, white balance and focus independently so a series stays consistent.

## Framing aids

The viewfinder can show a live RGB histogram, an electronic level, a crop guide and a composition grid — thirds, golden ratio, golden spiral, golden triangles, diagonals, centre cross, 4×4, 6×6, horizon or dynamic symmetry. Turn each on in Settings, along with the DSLR-style readout and the full-screen viewfinder.

## Where are my photos?

In `Pictures/Filmode` on your internal storage by default; change the folder name in **Settings → Folder inside Pictures**. Files are registered with your media library, so Gallery, Google Photos and every other app see them right away. The filename pattern is yours to set, built from `{date}`, `{time}`, `{n}`, `{iso}`, `{shutter}` and `{app}`.

## File formats and quality

JPEG, HEIF and PNG, at Maximum, Fine or Normal quality — plus RAW DNG where the hardware allows. HEIF is offered only on devices whose encoder supports it. Every file gets full EXIF: exposure time, ISO, focal length, white balance, orientation and date.

## Geotagging

Off by default. Turn on **Settings → Save location in photos**and the app asks for the location permission, then writes GPS coordinates into each photo's EXIF on the device. Nothing is sent anywhere. If you see "Location permission not granted", grant it in *Settings → Apps → FilCam → Permissions* or switch geotagging back off.

## Film looks and the photo editor

The strip under the viewfinder previews each look on your live scene, and the look is baked in the moment you press the shutter. Import your own `.cube` LUT files to add to it. After the shot, the editor gives you exposure, contrast, clarity, highlights, shadows, temperature, saturation, fade, vignette, sharpen, blur, an 8-band HSL panel, a five-point tone curve and a white-balance eyedropper — with undo, hold-to-compare, and the option to save a grade as your own LUT or recipe.

## Something is missing or greyed out

- Camera capability differs by phone. The ISO and shutter ranges, the longest exposure, HEIF encoding and RAW support are all read from your hardware — if your device does not report a capability, the app hides the control rather than offering a dead button.
- The front camera usually offers a much narrower manual range than the rear one.
- If a capture fails, check free storage first: RAW and PNG files are large.
- Still stuck? Email us with the phone model, Android version and what you were trying to shoot.

## Requesting a feature or reporting a bug

Write to us with what you expected and what happened instead. Screenshots help, and so does the EXIF of a photo that came out wrong. Feature requests are genuinely welcome — this app is being built now, and what people ask for shapes what gets built next.

[← Back to FilCam](https://trunghieuvn.github.io/filmode-camera/) · [Privacy](https://trunghieuvn.github.io/filmode-camera/privacy) · [Terms](https://trunghieuvn.github.io/filmode-camera/terms)
