import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

export default function Contact() {
  return (
    <>
      <section className="relative flex min-h-[70vh] flex-col justify-center bg-white px-6 pt-32 md:px-16">
        <Nav textColor="#1e1e1a" />
        <h1 className="text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.1] tracking-tight text-[#1e1e1a]">
          Get in touch.
        </h1>
        <a
          href="mailto:support@tribemoney.ai"
          className="mt-6 inline-block max-w-xl font-gsans text-base text-[#858679] transition-colors hover:text-[#1e1e1a] md:text-lg"
        >
          support@tribemoney.ai
        </a>
      </section>

      <Footer />
    </>
  )
}
