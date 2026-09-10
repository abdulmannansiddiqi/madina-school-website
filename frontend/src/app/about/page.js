import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageBackground from '../../components/PageBackground';

export default function About() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF] px-6 py-16">
        <PageBackground>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-[#0F2557] mb-4 text-center">
              About Us
            </h1>
            <p className="text-gray-600 text-center mb-12">
              Providing free education to all since 1993
            </p>

            {/* History */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#0F2557] mb-3">
                Our History
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Established in 1993, Madina Model Higher Secondary School has
                been serving the Faqirwali community for over three decades,
                providing accessible, quality education to students of all
                backgrounds.
              </p>
            </section>

            {/* Mission */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#0F2557] mb-3">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Since 1993, Madina Model Higher Secondary School has been
                dedicated to providing quality education in a supportive and
                inspiring environment. We aim to nurture critical thinking,
                promote strong character building, and equip students with
                modern skills to navigate a changing world successfully.
              </p>
            </section>

            {/* Vision */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-[#0F2557] mb-3">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To be a leading educational institution that empowers students
                to achieve academic excellence, embrace moral values, and
                become confident, compassionate leaders of tomorrow.
              </p>
            </section>

            {/* Objectives */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0F2557] mb-3">
                Our Objectives
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-[#1E7A4C] font-bold">•</span>
                  Provide quality higher secondary education accessible to all
                  students.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1E7A4C] font-bold">•</span>
                  Foster a culture of curiosity, innovation, and academic
                  discipline.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1E7A4C] font-bold">•</span>
                  Bridge traditional values with modern learning techniques.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1E7A4C] font-bold">•</span>
                  Prepare students for university admissions and professional
                  careers.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1E7A4C] font-bold">•</span>
                  Build strong partnerships between teachers, parents, and the
                  community.
                </li>
              </ul>
            </section>
          </div>
        </PageBackground>
      </main>

      <Footer />
    </>
  );
}