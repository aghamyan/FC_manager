import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const [upcomingMatches, tournaments] = await Promise.all([
    prisma.match.findMany({
      orderBy: { scheduledAt: "asc" },
      take: 5,
      include: {
        tournament: {
          select: { name: true },
        },
      },
    }),
    prisma.tournament.findMany({
      orderBy: { startDate: "asc" },
      take: 5,
      include: {
        participants: true,
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-300">Welcome back</p>
          <h1 className="text-2xl font-bold text-white">{session.user.name}</h1>
          <p className="text-sm text-slate-400">Role: {session.user.role}</p>
        </div>
        <div className="flex gap-2">
          <span className="button-secondary text-xs uppercase tracking-wide">
            Authenticated
          </span>
          <span className="button-secondary text-xs uppercase tracking-wide">
            Secure area
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Upcoming matches</h2>
            <span className="text-xs text-slate-400">Admin can approve</span>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingMatches.length === 0 && (
              <p className="text-sm text-slate-400">No matches scheduled yet.</p>
            )}
            {upcomingMatches.map((match) => (
              <div key={match.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">
                    {match.homeTeam} vs {match.awayTeam}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      match.approved ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/10 text-amber-300"
                    }`}
                  >
                    {match.approved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  {new Date(match.scheduledAt).toLocaleString()} • {match.location}
                </p>
                {match.tournament && (
                  <p className="text-xs text-indigo-200">{match.tournament.name}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Tournaments</h2>
            <span className="text-xs text-slate-400">Participants overview</span>
          </div>
          <div className="mt-4 space-y-3">
            {tournaments.length === 0 && (
              <p className="text-sm text-slate-400">No tournaments created yet.</p>
            )}
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{tournament.name}</p>
                  <span className="text-xs text-slate-400">
                    {tournament.participants.length} participants
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  {new Date(tournament.startDate).toLocaleDateString()} at {tournament.location}
                </p>
                {tournament.description && (
                  <p className="text-xs text-slate-300">{tournament.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
