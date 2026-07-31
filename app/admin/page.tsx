import Link from "next/link";

/**
 * Admin overview.
 *
 * The previous version showed four hard-coded statistics (reservations today,
 * visitors, button clicks) that were never wired to anything, plus a HeroUI
 * tabs demo left over from a component paste. Invented numbers on an admin
 * dashboard are worse than no numbers - staff would have made decisions on
 * them - so this states what the panel actually does today.
 */
export default function AdminOverview() {
    return (
        <div>
            <header style={{ marginBottom: "40px" }}>
                <span className="overline">Dashboard</span>
                <h1 className="display-2">Welcome back.</h1>
            </header>

            <div className="admin__cards">
                <div className="admin__card">
                    <h3>Menu Control</h3>
                    <p style={{ marginBottom: 16 }}>
                        Add, edit and remove dishes, update prices, and toggle availability.
                    </p>
                    <Link href="/admin/menu" className="btn btn-primary btn--sm">
                        Manage menu
                    </Link>
                </div>

                <div className="admin__card">
                    <h3>Live site</h3>
                    <p style={{ marginBottom: 16 }}>
                        Open the public site to check how a change looks to guests.
                    </p>
                    <Link href="/" className="btn btn-secondary btn--sm">
                        View site
                    </Link>
                </div>
            </div>

            <div className="admin__card" style={{ marginTop: 24 }}>
                <h3>Before this goes live</h3>
                <p>
                    Menu changes made here are held in memory only &mdash; they reset when the server
                    restarts, and the public menu still reads from its own file. Connecting the panel to a
                    database (Supabase, per the proposal) is what makes edits stick. Sign-in also needs
                    moving off the credentials currently hard-coded in the source.
                </p>
            </div>
        </div>
    );
}
