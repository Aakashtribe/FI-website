import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

export default function Contact() {
  return (
    <>
      <section className="relative flex min-h-[70vh] flex-col justify-center bg-white px-6 pt-32 md:px-16">
        <Nav textColor="#1e1e1a" />
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] tracking-tight">
          <span className="text-[#1e1e1a]">Get in </span>
          <span className="text-[#a3a39c]">touch.</span>
        </h1>
        <a
          href="mailto:support@tribemoney.ai"
          className="mt-4 inline-block text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-tight text-[#1e1e1a] transition-colors hover:text-[#858679]"
        >
          support@tribemoney.ai
        </a>
      </section>

      <Footer />
    </>
  )
}
