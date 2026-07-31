import React from "react";
import Image from "next/image";
import { Flame, BookOpen, Camera, Sparkles } from "lucide-react";

export type MenuBadge = "spicy" | "special" | "featured" | "new";

export interface MenuCardProps {
    /** The dish's number on the printed menu. Kept because guests and staff
        order by it ("number 24"), so dropping it would break a real habit. */
    number?: number;
    title: string;
    imageSrc: string;
    price: string;
    groupPrice?: string;
    portionNote?: string;
    description: string;
    badges?: MenuBadge[];
    addOnNote?: string;
    /** Gently rotates a face-on plate (e.g. a top-down soup) so it reads as
        placed on a table rather than staring at the viewer. */
    angled?: boolean;
}

/** Badge vocabulary lifted from the printed menu's own legend. */
const BADGE_META: Record<MenuBadge, { label: string; icon: React.ReactNode }> = {
    spicy: { label: "Spicy", icon: <Flame size={11} strokeWidth={2.75} /> },
    special: { label: "Special", icon: <BookOpen size={11} strokeWidth={2.75} /> },
    featured: { label: "Featured", icon: <Camera size={11} strokeWidth={2.75} /> },
    new: { label: "New", icon: <Sparkles size={11} strokeWidth={2.75} /> },
};

/**
 * One dish, as a bounded card.
 *
 * The previous version had no container: an image and some text dropped into a
 * grid with an 8vw column gap and a 120px stagger offset per column. Nothing
 * grouped a dish with its own price, and a 75-item menu ran for screens. The
 * card gives each dish a ground, a border and a hover, and puts the title and
 * price on one baseline row so a column can be scanned straight down.
 */
export default function MenuCard({
    number,
    title,
    imageSrc,
    price,
    groupPrice,
    portionNote,
    description,
    badges = [],
    addOnNote,
    angled = false,
}: MenuCardProps) {
    /* "MRP" is a value in the source data, not a number - don't append a unit. */
    const priceLabel = price === "MRP" ? "MRP" : `${price} BDT`;

    /*
     * Deliberately not scroll-revealed. Fading in 75 cards as the reader
     * scrolls a catalogue slows scanning rather than adding polish, and it
     * would make the site's most important content depend on JavaScript
     * merely to be visible. The cards are simply there.
     */
    return (
        <article className="menu-card">
            <div className="menu-card__media">
                <div className={`dish${angled ? " dish--angled" : ""}`}>
                    <Image
                        className="dish-img"
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1080px) 45vw, 280px"
                        loading="lazy"
                    />
                </div>

                {badges.length > 0 && (
                    <div className="menu-card__badges">
                        {badges.map((b) => (
                            <span key={b} className={`menu-badge menu-badge--${b}`}>
                                <span aria-hidden="true" style={{ display: "flex" }}>
                                    {BADGE_META[b].icon}
                                </span>
                                {BADGE_META[b].label}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="menu-card__body">
                <div className="menu-card__top">
                    <h3 className="menu-card__title">
                        {number != null && (
                            <span className="menu-card__num">{String(number).padStart(2, "0")}</span>
                        )}
                        {title}
                        {portionNote && <span className="menu-card__portion">{portionNote}</span>}
                    </h3>
                    <p className="menu-card__price">
                        {priceLabel}
                        {groupPrice && <small>{groupPrice} BDT</small>}
                    </p>
                </div>

                <p className="menu-card__desc">{description}</p>
                {addOnNote && <p className="menu-card__addon">{addOnNote}</p>}
            </div>
        </article>
    );
}
