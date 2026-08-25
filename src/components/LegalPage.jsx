import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

export function LegalPage({ title, lastUpdated, children }) {
  return (
    <>
      <section className="relative bg-white px-6 pt-48 pb-24 md:px-16">
        <Nav textColor="#1e1e1a" />
        <div className="mx-auto max-w-3xl">
          <h1 className="text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]">
            {title}
          </h1>
          <p className="mt-3 font-gsans text-sm text-[#858679]">Last updated: {lastUpdated}</p>
          <div className="mt-12 flex flex-col gap-10">{children}</div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export function Section({ heading, children }) {
  return (
    <section className="border-t border-dashed border-[#dcdcd8] pt-8 first:border-t-0 first:pt-0">
      {heading && <h2 className="font-gsans text-xl font-semibold text-[#1e1e1a]">{heading}</h2>}
      <div className="mt-3 flex flex-col gap-4 font-gsans text-base leading-7 text-[#858679]">{children}</div>
    </section>
  )
}

export function List({ items }) {
  return (
    <ul className="flex flex-col gap-2 pl-5">
      {items.map((item, i) => (
        <li key={i} className="list-disc leading-7">
          {item}
        </li>
      ))}
    </ul>
  )
}
