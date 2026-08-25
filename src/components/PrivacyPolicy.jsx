import { LegalPage, Section, List } from './LegalPage.jsx'

const EMAIL = 'support@tribemoney.ai'

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="25 August 2026">
      <Section>
        <p>
          This Privacy Policy explains how Tribemoney Private Limited ("tr/be", "we", "us", or "our") collects, uses,
          stores, shares, and protects your personal data when you access or use the tr/be website at tribemoney.ai,
          our applications, and related services (collectively, the "Platform").
        </p>
        <p>
          tr/be is a company incorporated in India. For the purposes of the Digital Personal Data Protection Act,
          2023 and the Digital Personal Data Protection Rules, 2025 (together, the "DPDP Law"), tr/be is a Data
          Fiduciary, and you are a Data Principal.
        </p>
        <p>
          Please read this Policy carefully. By creating an account or using the Platform, you confirm that you have
          read and understood this Policy. Where the law requires your consent, we will ask for it separately and
          clearly before we process your data.
        </p>
        <p className="rounded-xl bg-[#f7f7f6] p-4 text-[#1e1e1a]">
          <strong>Beta notice.</strong> The Platform is currently offered as a beta product. Features, data flows,
          and this Policy may change as the product evolves. We will notify you of material changes as described in
          the "Changes to this Policy" section below.
        </p>
      </Section>

      <Section heading="1. Who we are and how to reach us">
        <p>tr/be is a technology platform to help you analyse and manage your finances.</p>
        <p>
          If you have any questions, requests, or complaints about your personal data, please contact us at{' '}
          <a href={`mailto:${EMAIL}`} className="text-[#1e1e1a] underline">
            {EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section heading="2. Scope">
        <p>This Policy applies to personal data we process about:</p>
        <List
          items={[
            'Visitors to tribemoney.ai',
            'Users who register for and use the Platform',
            'Individuals who contact us or take part in research, interviews, or the beta programme',
          ]}
        />
        <p>
          This Policy does not cover the privacy practices of third parties whose services you access through the
          Platform. Those third parties have their own privacy policies, which we encourage you to read.
        </p>
      </Section>

      <Section heading="3. Key terms">
        <List
          items={[
            <>
              <strong className="text-[#1e1e1a]">Personal data:</strong> any data about an individual who is
              identifiable by or in relation to such data.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Data Principal:</strong> the individual to whom the personal data
              relates (you).
            </>,
            <>
              <strong className="text-[#1e1e1a]">Data Fiduciary:</strong> the entity that decides the purpose and
              means of processing personal data (tr/be).
            </>,
            <>
              <strong className="text-[#1e1e1a]">Data Processor:</strong> a third party that processes personal data
              on our behalf and under our instructions.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Consent Manager:</strong> an entity registered with the Data
              Protection Board of India through which you may give, manage, review, and withdraw consent.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Processing:</strong> any operation performed on personal data,
              including collection, storage, use, sharing, and erasure.
            </>,
          ]}
        />
      </Section>

      <Section heading="4. The data we collect">
        <p className="font-semibold text-[#1e1e1a]">4.1 Data you give us directly</p>
        <List
          items={[
            <>
              <strong className="text-[#1e1e1a]">Account and identity data:</strong> name, email address, mobile
              number, and login credentials.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Profile and preferences:</strong> financial goals, risk preferences,
              and settings you configure.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Communications:</strong> messages, feedback, survey responses, and
              support requests.
            </>,
          ]}
        />

        <p className="mt-2 font-semibold text-[#1e1e1a]">4.2 Financial data we access with your authorisation</p>
        <p>
          To provide spend analysis and personalised financial insights, and only after you authorise it, we access
          and read financial information contained in:
        </p>
        <List
          items={[
            <>
              <strong className="text-[#1e1e1a]">Your email account:</strong> transaction alerts, statements,
              receipts, and similar financial messages.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Your SMS messages:</strong> bank, card, and wallet transaction
              alerts and similar financial messages.
            </>,
          ]}
        />
        <p>
          From these sources we extract and store details such as transaction amounts, dates, merchant or
          counterparty names, account and card references (in masked form where available), balances, fees and
          charges, and subscription or recurring payments. We access only the information reasonably needed to
          deliver the Platform's features. We do not read personal, non-financial correspondence for any purpose
          other than identifying and processing financial information, and we do not sell your email or SMS content.
        </p>
        <p>
          You can withdraw this authorisation at any time (see Section 9). Withdrawal stops future access, though it
          does not affect processing already carried out lawfully before withdrawal.
        </p>

        <p className="mt-2 font-semibold text-[#1e1e1a]">4.3 Data from third parties</p>
        <p>
          When you use a partner service through the Platform, we may receive transaction status and related account
          information from that partner so we can reflect it in your dashboard.
        </p>

        <p className="mt-2 font-semibold text-[#1e1e1a]">4.4 Technical and usage data</p>
        <List
          items={[
            <>
              <strong className="text-[#1e1e1a]">Device and connection data:</strong> IP address, device type,
              operating system, browser, and identifiers.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Usage data:</strong> pages viewed, features used, actions taken, and
              timestamps.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Cookies and similar technologies:</strong> as described in Section
              11.
            </>,
          ]}
        />
      </Section>

      <Section heading="5. How we use your data">
        <p>We use your personal data to:</p>
        <List
          items={[
            <>
              <strong className="text-[#1e1e1a]">Provide the spend management product:</strong> capture, categorise,
              and analyse your financial transactions and present insights and recommendations.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Personalise the Platform:</strong> tailor recommendations (such as
              reducing avoidable charges, unused subscriptions, or better payment methods) to your financial context
              and goals.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Enable partner products:</strong> facilitate services such as fixed
              deposits offered through our partner.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Operate and improve the Platform:</strong> run, maintain, secure,
              debug, and improve our features and models.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Communicate with you:</strong> send service messages, respond to
              requests, and share product updates you have opted into.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Protect the Platform:</strong> detect, prevent, and respond to
              fraud, abuse, and security incidents.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Comply with law:</strong> meet legal, regulatory, and audit
              obligations.
            </>,
          ]}
        />
        <p>
          We rely on your consent as the primary legal basis for processing your financial, email, and SMS data. For
          certain limited purposes, we may rely on other lawful bases permitted under the DPDP Law, such as
          compliance with a legal obligation.
        </p>
        <p>
          We do not use your personal data to make solely automated decisions that produce legal or similarly
          significant effects on you without a meaningful review path.
        </p>
      </Section>

      <Section heading="6. How we share your data">
        <p>We do not sell your personal data. We share it only as described here:</p>
        <List
          items={[
            <>
              <strong className="text-[#1e1e1a]">Service providers and processors:</strong> cloud hosting,
              infrastructure, analytics, and support providers that process data on our behalf under contract and
              under our instructions.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Partner financial services:</strong> where you choose a partner
              product, we share the data needed to complete that service. The partner processes your data under its
              own privacy policy.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Professional advisers and auditors:</strong> where reasonably needed
              and under confidentiality obligations.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Legal and regulatory disclosure:</strong> where required by law,
              court order, or a lawful request from a competent authority.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Corporate transactions:</strong> in connection with a merger,
              acquisition, financing, or reorganisation, subject to appropriate safeguards and continuity of this
              Policy's protections.
            </>,
          ]}
        />
      </Section>

      <Section heading="7. Data storage, security, and location">
        <p>
          We implement reasonable security safeguards to protect your personal data, including access controls,
          encryption in transit, and internal policies limiting access to authorised personnel. No system is
          perfectly secure, and we cannot guarantee absolute security.
        </p>
        <p>
          We store personal data on servers that may be located in India or in other jurisdictions through our cloud
          providers. Where personal data is transferred outside India, we do so in accordance with the DPDP Law and
          any conditions the Central Government may prescribe.
        </p>
        <p>
          In the event of a personal data breach, we will notify the Data Protection Board of India and affected
          Data Principals in the manner and within the timelines required under the DPDP Law.
        </p>
      </Section>

      <Section heading="8. Data retention">
        <p>
          We keep your personal data only for as long as needed to fulfil the purposes set out in this Policy, to
          provide the Platform to you, and to meet legal, accounting, or reporting obligations.
        </p>
        <p>
          When the purpose is no longer served, for example because you withdraw consent, delete your account, or
          remain inactive for the period specified under the DPDP Law, we will erase your personal data, unless
          retention is required or permitted by law. We may retain limited data in de-identified or aggregated form
          that can no longer be linked to you.
        </p>
      </Section>

      <Section heading="9. Your rights as a Data Principal">
        <p>Subject to the DPDP Law, you have the right to:</p>
        <List
          items={[
            <>
              <strong className="text-[#1e1e1a]">Access</strong> a summary of the personal data we process about you
              and the processing activities.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Correction and updating</strong> of inaccurate or incomplete
              personal data.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Erasure</strong> of your personal data where it is no longer needed
              and retention is not legally required.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Withdraw consent</strong> at any time, with the same ease as giving
              it. This includes revoking our access to your email and SMS data.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Nominate</strong> another individual to exercise your rights in the
              event of death or incapacity.
            </>,
            <>
              <strong className="text-[#1e1e1a]">Grievance redressal</strong> through our Grievance Officer, and
              escalation to the Data Protection Board of India if you are not satisfied with our response.
            </>,
          ]}
        />
      </Section>

      <Section heading="10. Your duties as a Data Principal">
        <p>
          Under the DPDP Law, you agree to provide accurate information, not to impersonate another person, and not
          to suppress material information when sharing personal data with us.
        </p>
      </Section>

      <Section heading="11. Cookies and similar technologies">
        <p>
          We use cookies and similar technologies to keep you signed in, remember preferences, measure usage, and
          improve the Platform. You can control cookies through your browser settings. Disabling some cookies may
          affect how the Platform works.
        </p>
      </Section>

      <Section heading="12. Children">
        <p>
          The Platform is intended for users who are 18 years or older. We do not knowingly collect personal data
          from children. If you believe a child has provided us personal data, please contact our Grievance Officer
          so we can take appropriate action.
        </p>
      </Section>

      <Section heading="13. Third-party links and services">
        <p>
          The Platform may link to or integrate with third-party websites and services. We are not responsible for
          their content or privacy practices. Please review their policies before using them.
        </p>
      </Section>

      <Section heading="14. Changes to this Policy">
        <p>
          We may update this Policy from time to time. When we make material changes, we will update the "Last
          updated" date and, where appropriate, notify you through the Platform or by email. Your continued use of
          the Platform after an update means you accept the revised Policy, subject to obtaining fresh consent where
          the law requires it.
        </p>
      </Section>

      <Section heading="15. Contact us">
        <p>For any privacy questions, requests, or complaints:</p>
        <a href={`mailto:${EMAIL}`} className="font-semibold text-[#1e1e1a] underline">
          {EMAIL}
        </a>
      </Section>
    </LegalPage>
  )
}
