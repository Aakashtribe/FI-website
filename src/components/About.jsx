import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import userIcon from '../assets/icons/user.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import adityaPhoto from '../assets/Aditya.webp'
import himanshuPhoto from '../assets/Himanshu.webp'
import nikhilPhoto from '../assets/Nikhil.webp'
import teamPhoto from '../assets/Team.webp'
import peakXvLogo from '../assets/PeakXV.webp'
import zeroPearlLogo from '../assets/Zeropearl.webp'
import whiteVentureLogo from '../assets/White Venture.webp'
import coinswitchLogo from '../assets/Coinswitch.webp'

const FOUNDERS = [
  { name: 'Aditya Varma', role: 'Co-Founder', bio: ['Ex SVP Urban Company', 'IIT Bombay & INSEAD'], photo: adityaPhoto },
  { name: 'Himanshu Arora', role: 'Co-Founder', bio: ['Ex SVP Travel Plus', 'IIM Ahmedabad'], photo: himanshuPhoto },
  { name: 'Nikhil Shanker', role: 'Co-Founder', bio: ['Ex VP Urban Company', 'IIM Lucknow'], photo: nikhilPhoto },
]

const INVESTORS = [
  { name: 'Peak XV', logo: peakXvLogo },
  { name: 'Zero Pearl', logo: zeroPearlLogo },
  { name: 'White Venture Capital', logo: whiteVentureLogo },
  { name: 'CoinSwitch Ventures', logo: coinswitchLogo },
]

const ADVISORS = [
  { name: 'Abhiraj Singh Bhal', title: 'CEO & Co-Founder, Urban Company' },
  { name: 'Amrish Rau', title: 'CEO, Pine Labs' },
  { name: 'Jitendra Gupta', title: 'Founder, Jupiter' },
  { name: 'Kunal Shah', title: 'CEO & Founder, Cred' },
  { name: 'Pradeep Parameswaran', title: 'Head of Mobility, Uber' },
  { name: 'Raghav Chandra', title: 'CTO & Co-Founder, Urban Company' },
  { name: 'Rishabh Goel', title: 'CEO & Co-Founder, Credgenics' },
  { name: 'Varun Khaitan', title: 'COO & Co-Founder, Urban Company' },
]

function FounderCard({ name, role, bio, photo }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#e5e5e0]">
        <img src={photo} alt={name} className="h-full w-full object-cover" />
        <div className="absolute bottom-3 left-3 h-7 w-7 overflow-hidden rounded-md">
          <img src={linkedinIcon} alt="" className="h-full w-full" />
        </div>
      </div>
      <p className="mt-4 font-gsans text-base font-semibold text-[#1e1e1a]">{name}</p>
      <p className="font-gsans text-sm text-[#858679]">{role}</p>
      <div className="mt-1">
        {bio.map((line) => (
          <p key={line} className="font-gsans text-sm text-[#858679]">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <>
      <section className="relative flex flex-col items-center bg-white px-6 pb-24 pt-40 text-center">
        <Nav textColor="#1e1e1a" />
        <h1 className="max-w-3xl text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]">
          tr/be is for builders
        </h1>
        <p className="mt-6 max-w-xl font-gsans text-base text-[#858679] md:text-lg">
          People who work hard, and work with passion. People who are creating, growing, building a better tomorrow
          for themselves and everyone around them.
        </p>
        <p className="mt-4 max-w-xl font-gsans text-base font-medium text-[#1e1e1a] md:text-lg">
          You focus on building. tr/be takes care of your money. Intelligently. Relentlessly. Just for you.
        </p>
      </section>

      <section className="flex flex-col items-center bg-[#f7f7f6] px-6 py-24">
        <div className="max-w-2xl text-center">
          <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]">
            The builders behind tr/be
          </h2>
          <p className="mt-4 font-gsans text-base text-[#858679]">
            Engineers, finance folks, operators, builders, designers, compliance people, marketeers and
            customer-obsessed humans, all trying to make your money do more for you.
          </p>
        </div>

        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {FOUNDERS.map((f) => (
            <FounderCard key={f.name} {...f} />
          ))}
        </div>

        <div className="mt-8 w-full max-w-5xl overflow-hidden rounded-2xl bg-[#e5e5e0]">
          <img src={teamPhoto} alt="The tr/be team" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="flex flex-col items-center bg-white px-6 py-24">
        <p className="font-gsans text-sm font-semibold uppercase tracking-[0.2em] text-[#858679]">The ones behind us</p>
        <h2 className="mt-3 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]">
          In good company
        </h2>

        <div className="mt-16 grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          {INVESTORS.map(({ name, logo }) => (
            <div key={name} className="aspect-square overflow-hidden rounded-2xl">
              <img src={logo} alt={name} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 grid w-full max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {ADVISORS.map((a) => (
            <div key={a.name} className="flex flex-col items-center text-center">
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-[#f7f7f6]">
                <img src={userIcon} alt="" className="h-10 w-10 opacity-30" />
              </div>
              <p className="mt-3 font-gsans text-sm font-semibold text-[#1e1e1a]">{a.name}</p>
              <p className="font-gsans text-xs text-[#858679]">{a.title}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
