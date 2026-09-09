import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Admissions() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF] px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#0F2557] mb-4">
            Admissions
          </h1>

          <span className="inline-block bg-[#27287e] text-white text-lg font-bold px-6 py-2 rounded-full mb-8">
            Admission Fee: FREE
          </span>

          <p className="text-gray-600 leading-relaxed mb-10">
            Madina Model Higher Secondary School offers free education to
            all deserving students. To learn about the admission process,
            eligibility, and required documents, please reach out to us
            directly on WhatsApp — our team will guide you through every
            step.
          </p>

          <a
            href="https://wa.me/923462569709?text=Assalam-o-Alaikum%2C%20mujhe%20admission%20ki%20information%20chahiye."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
          >
            Contact on WhatsApp
          </a>

          <div className="mt-16 text-left bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-[#0F2557] mb-4">
              What You&apos;ll Need
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#1E7A4C] font-bold">•</span>
                Passport size photo of the student
              </li>
              <li className="flex gap-2">
                <span className="text-[#1E7A4C] font-bold">•</span>
                Student&apos;s B-Form
              </li>
              <li className="flex gap-2">
                <span className="text-[#1E7A4C] font-bold">•</span>
                Parents&apos; CNIC (copy)
              </li>
              <li className="flex gap-2">
                <span className="text-[#1E7A4C] font-bold">•</span>
                Minimum age requirement: 5 years
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}