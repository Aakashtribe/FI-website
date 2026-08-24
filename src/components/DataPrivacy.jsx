import shieldImage from '../assets/Shield.png'
import eyeOffIcon from '../assets/icons/eye-off.svg'
import safeBoxIcon from '../assets/icons/safe-box.svg'

const FEATURES = [
  {
    icon: eyeOffIcon,
    title: 'Privacy by design',
    description: 'Email access is read-only. Nothing you share with tr/be is sold. All financial data is encrypted and stored.',
  },
  {
    icon: safeBoxIcon,
    title: 'Access control',
    description: "Give access when you want, take it back the moment you don't.",
  },
]

export default function DataPrivacy() {
  return (
    <section className="flex flex-col items-center bg-white px-6 py-24">
      <div className="flex w-full max-w-5xl flex-col items-center gap-16 lg:flex-row lg:justify-between lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]">
            Your data, your rules
          </h2>
          <div className="mt-10 flex flex-col gap-8">
            {FEATURES.map(({ icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f7f6]">
                  <img src={icon} alt="" className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-gsans text-base font-semibold text-[#1e1e1a]">{title}</p>
                  <p className="mt-1 font-gsans text-sm text-[#858679]">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-10 rounded-full bg-[#1e1e1a] px-6 py-3 font-gsans text-sm font-medium text-white transition-colors duration-200 hover:bg-[#33322c]"
          >
            Learn more
          </button>
        </div>
        <div className="flex shrink-0 items-center justify-center">
          <img src={shieldImage} alt="" className="h-[400px] w-[400px]" />
        </div>
      </div>
    </section>
  )
}
