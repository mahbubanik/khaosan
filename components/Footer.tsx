import Link from "next/link";
import Image from "next/image";
import React from "react";
import { OUTLETS, NAV_ITEMS, whatsappLink, CONTACT_MESSAGE } from "@/lib/site";

const LOGO = "/assets/Logos-20260709T183558Z-2-001/Logos/Khao San Logo.webp";

/**
 * The closing scene. Deep brand blue - it bookends the hero and gives the page
 * a definite floor, rather than fading out on white. No longer a client
 * component: with the reservation drawer gone there is nothing interactive
 * here beyond links.
 */
export default function Footer() {
    return (
        <footer className="site-footer lattice lattice--deep on-deep">
            <div className="container site-footer__inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Image className="footer-logo" src={LOGO} alt="Khao San" width={180} height={157} />
                        <p className="footer-tagline">
                            Re-inventing <span className="script-accent">The Thai Way</span>
                        </p>
                        <p className="footer-note">
                            Bangkok street craft, quietly elevated &mdash; three rooms across Dhaka.
                        </p>
                        <a
                            href={whatsappLink(CONTACT_MESSAGE)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn--sm"
                        >
                            Contact Us
                        </a>
                    </div>

                    <div className="footer-col">
                        <h4>Explore</h4>
                        <ul>
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="footer-link">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Visit</h4>
                        <ul>
                            {OUTLETS.map((o) => (
                                <li key={o.id}>
                                    <a
                                        className="footer-link"
                                        href={`https://maps.google.com/?q=${encodeURIComponent(o.mapQuery)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {o.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Connect</h4>
                        <ul>
                            <li>
                                <a
                                    href="https://www.instagram.com/explore/tags/khaosandhaka/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/KhaoSanDhaka"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href={`tel:+${OUTLETS[0].phone.replace(/\D/g, "")}`} className="footer-link">
                                    {OUTLETS[0].phone}
                                </a>
                            </li>
                        </ul>
                        <p className="footer-hours">
                            Sat&ndash;Thu &middot; 12&ndash;11 PM
                            <br />
                            Friday &middot; 2&ndash;11 PM
                        </p>
                    </div>
                </div>

                <div className="footer-divider" aria-hidden="true" />

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Khao San Dhaka. All rights reserved.</p>
                    <div className="footer-legal">
                        <Link href="/legal/privacy">Privacy Policy</Link>
                        <Link href="/legal/terms">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
