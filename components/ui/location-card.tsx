import React from "react";
import Image from "next/image";
import { Outlet, whatsappLink } from "@/lib/site";

/**
 * One outlet, as a contained card in a three-up grid.
 *
 * This replaces a full-viewport panel per branch (100vh, min-height 800px).
 * That layout made comparing the three rooms impossible - you could only ever
 * see one - and spent three screens on what is really a short answer: where
 * are you, and when are you open. A card holds all of it at once.
 *
 * Hover stays inside the frame: the photograph scales slightly under its own
 * overflow, the card lifts on its shadow. Nothing reflows, so a pointer
 * crossing the grid never shifts the layout under it.
 */
export default function LocationCard({ outlet, priority = false }: { outlet: Outlet; priority?: boolean }) {
    const telHref = `tel:+${outlet.phone.replace(/\D/g, "")}`;

    return (
        <article className="loc-card reveal-stagger">
            <div className="loc-card__media">
                <Image
                    src={outlet.imageSrc}
                    alt={`Khao San ${outlet.name} dining room`}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={priority}
                />
                <span className="loc-card__type">{outlet.type}</span>
            </div>

            <div className="loc-card__body">
                <h3 className="loc-card__name">{outlet.name}</h3>
                <address className="loc-card__address">{outlet.address}</address>

                <dl className="loc-card__meta">
                    <div>
                        <dt>Hours</dt>
                        <dd>
                            {outlet.hours.map((h) => (
                                <span key={h}>{h}</span>
                            ))}
                        </dd>
                    </div>
                    <div>
                        <dt>Phone</dt>
                        <dd>
                            <a href={telHref}>{outlet.phone}</a>
                        </dd>
                    </div>
                </dl>

                <div className="loc-card__actions">
                    <a
                        href={whatsappLink(`Hello Khao San! I'd like to enquire about a table at ${outlet.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn--sm"
                    >
                        Contact Us
                    </a>
                    <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(outlet.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn--sm"
                    >
                        Directions
                    </a>
                </div>
            </div>
        </article>
    );
}
