import { useEffect, useState } from 'react'

export const APP_STORE_URL = 'https://apps.apple.com/in/app/tribe-money-tr-be/id6779931103'
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=ai.tribemoney.app&hl=en'

// "Get the app" CTAs check the visitor's own device: any Apple device
// (iPhone/iPad, and Mac too — not just iOS) goes to the App Store, Android
// goes to the Play Store. Only genuinely unknown/other platforms (Windows,
// Linux) fall back to the Play Store listing.
export function getAppStoreLink() {
  if (typeof navigator === 'undefined') return PLAY_STORE_URL
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(ua)) return APP_STORE_URL
  if (/Android/i.test(ua)) return PLAY_STORE_URL
  return PLAY_STORE_URL
}

// Next.js pre-renders client components on the server too (no `navigator`
// there), so calling getAppStoreLink() straight in render gives a different
// value server-side vs. client-side and React flags a hydration mismatch.
// This hook renders the same server-safe default on first paint, then
// swaps in the real device-detected link right after mount.
export function useAppStoreLink() {
  const [link, setLink] = useState(PLAY_STORE_URL)
  useEffect(() => setLink(getAppStoreLink()), [])
  return link
}
