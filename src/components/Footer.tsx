import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-slate-200">
            Tjomsland LLC dba ER Simulator
          </p>
          <p className="max-w-md text-xs text-slate-500">
            ER Simulator is an educational simulation platform for licensed clinicians.
            It does not replace formal medical education, legal guidance, or local
            hospital protocols. Never use it for real patient care or to determine
            scope of practice.
          </p>
          <p className="text-[11px] text-slate-500">
            Always consult your governing associations (AMA, ACEP, NCCPA, ANCC, etc.),
            supervising physicians, and local regulations before applying anything you
            study here.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-xs md:text-sm">
          <Link href="/pricing" className="hover:text-slate-200">
            Pricing
          </Link>
          <Link href="/terms" className="hover:text-slate-200">
            Terms of service
          </Link>
          <Link href="/privacy" className="hover:text-slate-200">
            Privacy policy
          </Link>
          <Link href="/refund" className="hover:text-slate-200">
            Refund policy
          </Link>
          <Link href="/attribution" className="hover:text-slate-200">
            Attribution
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Tjomsland LLC. Select scenarios adapted from Creative
          Commons emergency medicine resources (CC BY-SA 4.0) with attribution provided.
        </div>
      </div>
    </footer>
  );
}