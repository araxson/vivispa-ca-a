import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Vivi Aesthetics Spa.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. It is Vivi Aesthetics Spa's policy to
        respect your privacy regarding any information we may collect from you
        across our website,{" "}
        <a href="https://vivispa.ca" className="text-blue-500">
          https://vivispa.ca
        </a>
        , and other sites we own and operate.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-2">1. Information we collect</h2>
      <p className="mb-4">
        We only ask for personal information when we truly need it to provide a
        service to you. We collect it by fair and lawful means, with your
        knowledge and consent. We also let you know why we're collecting it and
        how it will be used.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-2">2. How we use your information</h2>
      <p className="mb-4">
        We only retain collected information for as long as necessary to provide
        you with your requested service. What data we store, we'll protect
        within commercially acceptable means to prevent loss and theft, as well
        as unauthorized access, disclosure, copying, use or modification.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-2">3. Sharing your information</h2>
      <p className="mb-4">
        We don't share any personally identifying information publicly or with
        third-parties, except when required to by law.
      </p>
      <p className="mb-4">
        Our website may link to external sites that are not operated by us.
        Please be aware that we have no control over the content and practices
        of these sites, and cannot accept responsibility or liability for their
        respective privacy policies.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-2">4. Your rights</h2>
      <p className="mb-4">
        You are free to refuse our request for your personal information, with
        the understanding that we may be unable to provide you with some of your
        desired services.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about how we handle user data and personal
        information, feel free to contact us.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        This policy is effective as of 1 August 2024.
      </p>
    </div>
  );
} 