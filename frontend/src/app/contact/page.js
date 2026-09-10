import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageBackground from '../../components/PageBackground';

export default function Contact() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF] px-6 py-16">
        <PageBackground>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0F2557] mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-gray-600 text-center mb-12">
            We&apos;d love to hear from you
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-[#0F2557] mb-1">
                  Address
                </h2>
                <p className="text-gray-700">
                  Madina Colony, Ward No. 7, Faqirwali, Harunabad
                  <br />
                  District Bahawalnagar
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#0F2557] mb-1">
                  Phone
                </h2>
                <p className="text-gray-700">
                  0346 2569709 / 0315 2569709
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#0F2557] mb-1">
                  Email
                </h2>
                <p className="text-gray-700">themmps786@gmail.com</p>
              </div>

              <a
                href="https://wa.me/923462569709"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Contact on WhatsApp
              </a>
            </div>

            {/* Google Map */}
            <div className="rounded-lg overflow-hidden border border-gray-200 h-72 md:h-full">
              <iframe
                src="https://www.google.com/maps?q=Madina+Model+Higher+Secondary+School+Faqirwali&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              ></iframe>
            </div>
          </div>
        </div>
        </PageBackground>
      </main>

      <Footer />
    </>
  );
}