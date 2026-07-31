"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, whatsappLink, CONTACT_MESSAGE } from "@/lib/site";

const LOGO = "/assets/Logos-20260709T183558Z-2-001/Logos/Khao San Logo.webp";

/**
 * One-page navigation. Everything but the menu is a section on the homepage,
 * so the header doubles as a progress indicator: the link for the section
 * you're reading stays marked. The centred-logo split grid is kept from the
 * previous build - it's the strongest thing about the original header, and
 * with five links it still balances either side of the mark.
 */
export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");
    const pathname = usePathname();
    const panelRef = useRef<HTMLElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    const isHome = pathname === "/";
    /*
     * Only these routes open with a deep-blue hero for the header to float
     * over. Anywhere else - the legal pages - the page starts white, and the
     * transparent treatment rendered the logo and every nav link invisible
     * (white on white). Those routes get the solid header from the start.
     */
    const hasHero = pathname === "/" || pathname === "/menu";
    const solid = scrolled || !hasHero;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /*
     * Scroll spy. A section counts as current once it crosses the upper third
     * of the viewport, which is roughly where the eye sits - marking on the
     * first pixel would flicker between neighbours on a fast scroll.
     */
    useEffect(() => {
        if (!isHome) return;
        const ids = NAV_ITEMS.filter((i) => i.section).map((i) => i.section as string);
        const seen = new Map<string, boolean>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
                const current = ids.filter((id) => seen.get(id));
                setActiveSection(current.length ? current[current.length - 1] : "");
            },
            { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [isHome]);

    // Lock the page behind the mobile panel; restore focus to the toggle.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
                toggleRef.current?.focus();
            }
        };
        panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    const close = () => setMenuOpen(false);
    /* Section marks only mean anything on the homepage, so that is gated here
       rather than by resetting state from an effect when the route changes. */
    const isActive = (item: (typeof NAV_ITEMS)[number]) =>
        item.section ? isHome && activeSection === item.section : pathname === item.href;

    const left = NAV_ITEMS.slice(0, 2);
    const right = NAV_ITEMS.slice(2);

    const renderLink = (item: (typeof NAV_ITEMS)[number]) => (
        <li key={item.href}>
            <Link href={item.href} className="nav-link" aria-current={isActive(item) ? "page" : undefined}>
                {item.label}
            </Link>
        </li>
    );

    return (
        <header className={`site-header ${solid ? "is-solid" : ""}`}>
            <nav className="site-header__nav" aria-label="Primary">
                <ul className="site-header__group site-header__group--left">{left.map(renderLink)}</ul>

                <Link href="/" className="site-header__mark" aria-label="Khao San - home">
                    <Image src={LOGO} alt="Khao San" fill sizes="72px" priority style={{ objectFit: "contain" }} />
                </Link>

                <ul className="site-header__group site-header__group--right">{right.map(renderLink)}</ul>
            </nav>

            <div className="site-header__cta">
                <a
                    href={whatsappLink(CONTACT_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn--sm"
                >
                    Contact Us
                </a>
            </div>

            <button
                ref={toggleRef}
                className="nav-toggle"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((v) => !v)}
            >
                <span className={`nav-toggle__bars ${menuOpen ? "is-open" : ""}`} aria-hidden="true">
                    <span />
                    <span />
                </span>
            </button>

            <nav
                id="mobile-nav"
                ref={panelRef}
                className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
                aria-label="Mobile"
                inert={!menuOpen}
            >
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} onClick={close} aria-current={isActive(item) ? "page" : undefined}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <a
                    href={whatsappLink(CONTACT_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    onClick={close}
                >
                    Contact Us
                </a>
            </nav>
        </header>
    );
}
