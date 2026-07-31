"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * Shell for the private menu-management panel. The Reservations entry is gone
 * along with the reservation system itself - it pointed at a deleted route.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // The login page is its own full-screen surface, with no shell around it.
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    const navItems = [
        { label: "Overview", href: "/admin" },
        { label: "Menu Control", href: "/admin/menu" },
    ];

    return (
        <div className="admin">
            <aside className="admin__side">
                <div className="admin__brand">
                    <span className="overline">Admin Portal</span>
                    <h2>Khao San</h2>
                </div>

                <nav className="admin__nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={pathname === item.href ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="admin__foot">
                    <button onClick={handleLogout} className="btn btn-secondary btn--sm" style={{ width: "100%" }}>
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="admin__main">
                <div className="admin__inner">{children}</div>
            </main>
        </div>
    );
}
