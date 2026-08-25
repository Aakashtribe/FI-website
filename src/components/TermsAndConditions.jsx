import { LegalPage, Section, List } from './LegalPage.jsx'

const EMAIL = 'support@tribemoney.ai'

export default function TermsAndConditions() {
  return (
    <LegalPage title="Terms and Conditions" lastUpdated="25 August 2026">
      <Section>
        <p>
          These Terms and Conditions ("Terms") govern your access to and use of the tr/be website at tribemoney.ai,
          our applications, and related services (collectively, the "Platform"), operated by Tribemoney Private
          Limited ("tr/be", "we", "us", or "our"), a company incorporated in India.
        </p>
        <p>
          By accessing or using the Platform, you agree to be bound by these Terms and by our Privacy Policy. If you
          do not agree, please do not use the Platform.
        </p>
        <p className="rounded-xl bg-[#f7f7f6] p-4 text-[#1e1e1a]">
          <strong>Beta notice.</strong> The Platform is offered as a beta product. It may contain errors, may change
          without notice, and may be interrupted or discontinued. You use it on an "as is" and "as available" basis.
        </p>
      </Section>

      <Section heading="1. Eligibility">
        <p>
          To use the Platform, you must be at least 18 years old, a resident of India, and capable of entering into a
          legally binding contract under Indian law. By using the Platform, you confirm that you meet these
          requirements.
        </p>
      </Section>

      <Section heading="2. What tr/be does">
        <p>
          tr/be is a personal finance platform. With your authorisation, it reads financial information from sources
          such as your email and SMS messages, organises and analyses your spending, and provides insights and
          recommendations, for example on avoidable charges, unused subscriptions, better payment methods, and
          financial goals.
        </p>
        <p>
          The Platform also lets you access certain financial products offered by our partners, such as fixed
          deposits (see Section 7).
        </p>
      </Section>

      <Section heading="3. Your account and authorisations">
        <List
          items={[
            'You are responsible for keeping your login credentials confidential and for all activity under your account.',
            <>
              To use core features, you authorise tr/be to access and read financial data from your email and SMS
              messages, as described in the Privacy Policy. You may withdraw this authorisation at any time, which
              will stop future access.
            </>,
            'You agree to provide accurate and current information and to keep it updated.',
            'Notify us promptly of any unauthorised use of your account.',
          ]}
        />
      </Section>

      <Section heading="4. tr/be does not provide investment or financial advice">
        <p className="font-semibold text-[#1e1e1a]">This is important. Please read it carefully.</p>
        <p>
          The Platform provides information, analysis, and general recommendations for your convenience and
          educational benefit. It is <strong className="text-[#1e1e1a]">not</strong> investment advice, financial
          planning, tax advice, legal advice, or a recommendation to buy, sell, or hold any security or financial
          product.
        </p>
        <p>
          tr/be is not a registered investment adviser and does not act as one. Any decision you make based on
          information from the Platform is your own decision, made at your own risk. Financial products carry risk,
          and past performance does not guarantee future results. You should consider seeking advice from a
          qualified, licensed professional before making financial decisions.
        </p>
      </Section>

      <Section heading="5. Beta service, no warranty">
        <p>
          The Platform is provided on an "as is" and "as available" basis. To the maximum extent permitted by law, we
          disclaim all warranties, express or implied, including warranties of merchantability, fitness for a
          particular purpose, accuracy, and non-infringement.
        </p>
        <p>We do not warrant that:</p>
        <List
          items={[
            'the Platform will be uninterrupted, timely, secure, or error-free,',
            'the insights, categorisations, or recommendations will be complete or accurate, or',
            'any defect will be corrected.',
          ]}
        />
        <p>
          Automated reading and categorisation of email and SMS data can produce errors. You are responsible for
          verifying important information before acting on it.
        </p>
      </Section>

      <Section heading="6. Acceptable use">
        <p>You agree not to:</p>
        <List
          items={[
            'use the Platform for any unlawful, fraudulent, or harmful purpose,',
            'access data or accounts that are not yours,',
            'attempt to reverse engineer, scrape, disrupt, overload, or gain unauthorised access to the Platform,',
            'upload malware or interfere with the security of the Platform,',
            'misrepresent your identity or provide false information, or',
            'infringe the rights of tr/be or any third party.',
          ]}
        />
        <p>We may suspend or terminate your access if you breach these Terms.</p>
      </Section>

      <Section heading="7. Third-party products and partners">
        <p>Some products available through the Platform are provided by third parties, not by tr/be.</p>
        <p>
          For fixed deposits, tr/be facilitates access through Blostem Fintech Private Limited and its partner banks
          and non-banking financial companies (NBFCs). The fixed deposit is a product of the issuing bank or NBFC,
          which is regulated by the Reserve Bank of India, and eligible deposits may be covered by deposit insurance
          up to the limit specified by the Deposit Insurance and Credit Guarantee Corporation.
        </p>
        <p>When you use a partner product:</p>
        <List
          items={[
            'you enter into a relationship directly with that partner and the issuing institution,',
            "that product is governed by the partner's and the institution's own terms and policies, which you should read, and",
            'tr/be acts as a facilitator and is not the issuer of, and does not guarantee, any such product, its returns, or its outcomes.',
          ]}
        />
      </Section>

      <Section heading="8. Fees">
        <p>
          During the beta period, the Platform is offered free of charge unless we tell you otherwise. We may
          introduce fees for some features in the future. If we do, we will give you notice and, where required,
          obtain your agreement before charging you. Partner products may carry their own charges disclosed at the
          point of use.
        </p>
      </Section>

      <Section heading="9. Intellectual property">
        <p>
          The Platform, including its software, design, text, graphics, logos, the tr/be name and wordmark, and all
          related intellectual property, is owned by or licensed to tr/be and is protected by law. We grant you a
          limited, non-exclusive, non-transferable, revocable licence to use the Platform for your personal,
          non-commercial use in line with these Terms. You may not copy, modify, distribute, or create derivative
          works without our prior written consent.
        </p>
      </Section>

      <Section heading="10. Privacy">
        <p>
          Your use of the Platform is subject to our Privacy Policy, which explains how we collect, use, and protect
          your personal data. By using the Platform, you consent to that processing as described in the Privacy
          Policy.
        </p>
      </Section>

      <Section heading="11. Limitation of liability">
        <p>
          To the maximum extent permitted by law, tr/be and its directors, employees, and partners will not be liable
          for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits,
          data, goodwill, or financial loss, arising out of or relating to your use of or inability to use the
          Platform, or any decision you make based on it.
        </p>
        <p>
          To the maximum extent permitted by law, our total aggregate liability arising out of or relating to the
          Platform will not exceed the greater of the amount you paid us for the Platform in the twelve months
          before the claim, or one thousand rupees (INR 1,000).
        </p>
        <p>Nothing in these Terms limits any liability that cannot be limited or excluded under applicable law.</p>
      </Section>

      <Section heading="12. Indemnity">
        <p>
          You agree to indemnify and hold harmless tr/be and its directors, employees, and partners from any claims,
          damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of your breach of
          these Terms, your misuse of the Platform, or your violation of any law or third-party right.
        </p>
      </Section>

      <Section heading="13. Suspension and termination">
        <p>
          We may suspend or terminate your access to the Platform at any time, with or without notice, if you breach
          these Terms, if we are required to do so by law, or if we discontinue the Platform. You may stop using the
          Platform and close your account at any time. Sections that by their nature should survive termination
          (including intellectual property, disclaimers, limitation of liability, indemnity, and governing law) will
          survive.
        </p>
      </Section>

      <Section heading="14. Governing law and dispute resolution">
        <p>
          These Terms are governed by the laws of India. Subject to the arbitration clause below, the courts at New
          Delhi, India, will have exclusive jurisdiction over any dispute.
        </p>
        <p>
          Any dispute arising out of or relating to these Terms will be referred to and finally resolved by
          arbitration under the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration will be New
          Delhi, India, the arbitration will be conducted by a sole arbitrator appointed by tr/be in accordance with
          that Act, and the proceedings will be in English.
        </p>
      </Section>

      <Section heading="15. Grievance redressal">
        <p>
          Please reach out to{' '}
          <a href={`mailto:${EMAIL}`} className="text-[#1e1e1a] underline">
            {EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section heading="16. Changes to these Terms">
        <p>
          We may update these Terms from time to time. When we make material changes, we will update the "Last
          updated" date and, where appropriate, notify you through the Platform or by email. Your continued use of
          the Platform after an update means you accept the revised Terms.
        </p>
      </Section>

      <Section heading="17. General">
        <List
          items={[
            <>
              <strong className="text-[#1e1e1a]">Entire agreement:</strong> these Terms and the Privacy Policy are
              the entire agreement between you and tr/be regarding the Platform.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Severability:</strong> if any provision is found unenforceable, the
              rest remains in effect.
            </>,
            <>
              <strong className="text-[#1e1e1a]">No waiver:</strong> our failure to enforce any provision is not a
              waiver of it.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Assignment:</strong> you may not assign these Terms without our
              consent. We may assign them in connection with a corporate transaction.
            </>,
          ]}
        />
      </Section>

      <Section heading="18. Contact us">
        <p>
          Tribemoney Private Limited — Email:{' '}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-[#1e1e1a] underline">
            {EMAIL}
          </a>
        </p>
      </Section>
    </LegalPage>
  )
}
