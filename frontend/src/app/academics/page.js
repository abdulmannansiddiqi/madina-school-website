import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageBackground from '../../components/PageBackground';

export default function Academics() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF] px-6 py-16">
        <PageBackground>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[#0F2557] mb-4 text-center">
              Academics
            </h1>
            <p className="text-gray-600 text-center mb-12">
              Quality education from Primary to Higher Secondary level
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#0F2557] mb-2">
                  Classes Offered
                </h2>
                <p className="text-gray-700">1st to 12th (Primary to Higher Secondary)</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#0F2557] mb-2">
                  School Timings
                </h2>
                <p className="text-gray-700">8:00 AM – 1:30 PM</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#0F2557] mb-2">
                  Sections
                </h2>
                <p className="text-gray-700">
                  Separate campuses for Boys and Girls
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-[#0F2557] mb-2">
                  Examination System
                </h2>
                <p className="text-gray-700">Monthly Tests, Term Exams, Annual Exams</p>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2557] mb-4 text-center">
                Subjects Offered
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {['F.Sc (Pre-Medical / Pre-Engineering)', 'I.C.S', 'Fine Arts'].map(
                  (subject) => (
                    <span
                      key={subject}
                      className="bg-[#1E7A4C] text-white text-sm font-medium px-4 py-2 rounded-full"
                    >
                      {subject}
                    </span>
                  )
                )}
              </div>
            </section>
          </div>
        </PageBackground>
      </main>

      <Footer />
    </>
  );
}