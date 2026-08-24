import { Link } from 'react-router-dom'
import facebookIcon from '../assets/Facebook.png'
import instagramIcon from '../assets/Instagram.png'
import twitterIcon from '../assets/Twitter.png'
import youtubeIcon from '../assets/Youtube.png'

const SOCIALS = [
  { label: 'Facebook', icon: facebookIcon, href: '#' },
  { label: 'Instagram', icon: instagramIcon, href: 'https://www.instagram.com/tribe.money.india?igsi=MWlha2F3YmI4NzA4bw==' },
  { label: 'Twitter', icon: twitterIcon, href: '#' },
  { label: 'YouTube', icon: youtubeIcon, href: '#' },
]

// Links without a `to` don't have a page yet, so they render as plain
// (non-navigating) text rather than pointing somewhere broken.
const COMPANY_LINKS = [{ label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }]
const SUPPORT_LINKS = [{ label: 'Privacy' }, { label: 'Terms' }]

function FooterColumn({ title, items }) {
  return (
    <div>
      <p className="font-gsans text-xs font-semibold uppercase tracking-[0.15em] text-white/40">{title}</p>
      <div className="mt-4 flex flex-col gap-3">
        {items.map((item) =>
          item.to ? (
            <Link key={item.label} to={item.to} className="font-gsans text-sm text-white/70 transition-colors hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span key={item.label} className="font-gsans text-sm text-white/40">
              {item.label}
            </span>
          )
        )}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-8 pt-16 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 border-b border-white/10 pb-16 md:flex-row md:justify-between">
        <div>
          <p className="text-2xl font-bold tracking-tight text-white">tr/be</p>
          <p className="mt-3 font-gsans text-sm text-white/60">World&apos;s Most Boring Payments App.</p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="block h-9 w-9 overflow-hidden rounded-full opacity-80 transition-opacity hover:opacity-100"
              >
                <img src={icon} alt="" className="h-full w-full" />
              </a>
            ))}
          </div>
          <button
            type="button"
            className="mt-8 rounded-full border border-white/15 px-5 py-3 font-gsans text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Get the app
          </button>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-20">
          <FooterColumn title="Company" items={COMPANY_LINKS} />
          <FooterColumn title="Support" items={SUPPORT_LINKS} />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-3 pt-8 text-center md:flex-row md:text-left">
        <p className="font-gsans text-xs text-white/40">
          © 2026 tr/be. All rights reserved. tr/be is a financial technology product, not a bank.
        </p>
        <p className="font-gsans text-xs text-white/40">tribemoney.ai</p>
      </div>
    </footer>
  )
}
