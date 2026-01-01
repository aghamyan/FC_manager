import Link from "next/link";

const featureCards = [
  {
    title: "Secure authentication",
    description:
      "Credential-based login with bcrypt hashing and NextAuth for session security.",
  },
  {
    title: "Tournament ready",
    description:
      "Manage tournaments, participants, and matches with approval workflows for admins.",
  },
  {
    title: "Responsive UI",
    description:
      "Built with Tailwind CSS to look great on mobile and desktop.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="card text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">FC Manager</h1>
        <p className="mt-3 text-slate-300">
          A modern management dashboard for football tournaments with secure authentication
          and role-based approvals.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/register" className="button-primary w-full sm:w-auto">
            Get started
          </Link>
          <Link href="/login" className="button-secondary w-full sm:w-auto">
            Login
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featureCards.map((card) => (
          <div key={card.title} className="card text-left">
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{card.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
