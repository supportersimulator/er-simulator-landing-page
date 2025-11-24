import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const currentYear = new Date().getFullYear();

export default function AttributionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
            Attribution & Licensing
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            ER Simulator incorporates original educational content as well as Creative
            Commons Licensed resources from the FOAMed community. We honor every source
            and share adaptations under the required licenses.
          </p>

          <div className="mt-8 space-y-6 text-sm text-slate-300">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h2 className="text-lg font-semibold text-slate-50">
                Creative Commons Sources
              </h2>
              <p className="mt-2">
                Select scenario scaffolds originate from Creative Commons
                Attribution-ShareAlike 4.0 emergency medicine training resources. We follow
                the CC BY-SA 4.0 license by providing attribution, linking to the license,
                and sharing adaptations under the same terms. Details for each imported case
                are available on request.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h2 className="text-lg font-semibold text-slate-50">Original Content</h2>
              <p className="mt-2">
                All other text, prompts, vitals roadmaps, and UX copy are © {currentYear}{" "}
                Tjomsland LLC dba ER Simulator. We reserve all rights but welcome
                outreach for collaboration. Contact{" "}
                <a
                  href="mailto:support@ersimulator.com"
                  className="text-emerald-300 underline-offset-2 hover:underline"
                >
                  support@ersimulator.com
                </a>{" "}
                regarding licensing questions.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h2 className="text-lg font-semibold text-slate-50">How to credit us</h2>
              <p className="mt-2">
                If you adapt ER Simulator materials, please attribute “ER Simulator by
                Tjomsland LLC” with a link to{" "}
                <Link
                  href="https://ersimulator.com"
                  className="text-emerald-300 underline-offset-2 hover:underline"
                >
                  ersimulator.com
                </Link>
                . When re-sharing CC BY-SA materials, include the original author list and
                the license link above.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

