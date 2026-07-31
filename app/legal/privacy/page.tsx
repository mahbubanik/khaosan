import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Khao San',
  description: 'Khao San privacy policy and data protection information.',
};

export default function PrivacyPage() {
  return (
    <main className="legal">
      <div className="container legal__inner">
        <Link href="/" className="legal__back">← Back to Home</Link>

        <h1>Privacy Policy</h1>

        <div>
          <h2>Introduction</h2>
          <p>Khao San (&ldquo;we&rdquo; or &ldquo;us&rdquo; or &ldquo;our&rdquo;) operates the https://www.khaosandhaka.com website (the &ldquo;Site&rdquo;).</p>

          <h2>Information We Collect</h2>
          <p>We collect information you voluntarily provide, such as when you make a reservation or contact us. This may include your name, email, phone number, and dining preferences.</p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to process reservations, communicate with you about your bookings, and improve our service.</p>

          <h2>Data Protection</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access or disclosure.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at +88 01600-068193 or message us on <a href="https://www.facebook.com/KhaoSanDhaka" target="_blank" rel="noopener noreferrer" >Facebook</a>.</p>

          <p className="legal__updated">Last updated: July 12, 2026</p>
        </div>
      </div>
    </main>
  );
}
