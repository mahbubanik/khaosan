import React from "react";
export const dynamic = 'force-static';
import Link from "next/link";
import Image from "next/image";
import BackgroundVideo from "@/components/ui/background-video";
import LocationCard from "@/components/ui/location-card";
import { OUTLETS, whatsappLink, CONTACT_MESSAGE } from "@/lib/site";

const GIFT_1500 = "/assets/Giftcards-20260709T183548Z-2-001/Giftcards/1500Tk Front.webp";
const GIFT_3000 = "/assets/Giftcards-20260709T183548Z-2-001/Giftcards/3000Tk Front.webp";

/** Five more at a glance, spread across the menu so the range is obvious.
    Names, prices and image paths all match MENU_DATA on the menu page. */
const PICKS = [
    { name: "Tom Yum Goong", price: "295", img: "/assets/Menu/KS Menu Webp/B. Soups/Tom Yum Goong.webp" },
    { name: "Khao Soi Gai", price: "455", img: "/assets/Menu/KS Menu Webp/E. Noodles/Khao Soi Gai.webp" },
    { name: "Som Tam", price: "365", img: "/assets/Menu/KS Menu Webp/D. Salads/Som Tam (Thai Papaya Salad).webp" },
    { name: "Chicken Red Curry", price: "395", img: "/assets/Menu/KS Menu Webp/G. Chicken/Chicken Red Curry.webp" },
    { name: "Mango Sticky Rice", price: "385", img: "/assets/Menu/KS Menu Webp/L. Desserts/Mango Sticky Rice.webp" },
];

/** The fastest route into a 75-item menu is by craving, not by scrolling. */
const CATEGORY_LINKS = [
    { label: "Appetizers", href: "/menu#a-appetizers" },
    { label: "Noodles", href: "/menu#e-noodles" },
    { label: "Curries", href: "/menu#g-chicken" },
    { label: "Rice", href: "/menu#f-rice" },
    { label: "Seafood", href: "/menu#i-seafood" },
    { label: "Desserts", href: "/menu#l-desserts" },
];


/**
 * The homepage is now the site. Every nav item except the menu is a section
 * here, so one scroll has to carry the whole story.
 *
 * Rhythm comes from the surfaces rather than from decoration, and it runs on
 * the two brand colours rather than on white:
 *
 *   hero      deep blue    footage, brand-blue duotone
 *   food      ORANGE       blue type on orange - the client's own lockup
 *   about     warm sand    + full-section lotus
 *   gallery   deep blue    the room's details; photographs carry it
 *   gift      warm sand    + full-section lotus
 *   locations deep blue    photographs carry it
 *   contact   footage      the closing invitation, over video
 *
 * Food sits directly under the hero. This is a street-food restaurant: the
 * reason anyone opens the page is to see what there is to eat and what it
 * costs, so the story waits its turn behind the menu.
 *
 * The lotus marks two sections only. Marking every band would make none of
 * them special; leaving the rest plain is what makes the marked ones land.
 *
 * This is a server component: with the reservation drawer gone, nothing on the
 * page needs client state.
 */
export default function Home() {
    return (
        <>
            {/* ─── HERO ─────────────────────────────────────────────────── */}
            <section className="hero on-deep">
                <BackgroundVideo
                    priority
                    src="/assets/Brand_Asset/Khao_San_Thoughtful_interiors_fl_1602693357399955_720p_20260706.mp4"
                    poster="/assets/posters/hero.webp"
                    className="hero__video hero-ken-burns"
                />
                <div className="hero__scrim" aria-hidden="true" />

                <div className="container hero__inner">
                    <p className="hero__eyebrow ignition-reveal ignition-reveal-1">Gulshan &middot; Dhanmondi &middot; Uttara</p>
                    <h1 className="hero__title ignition-reveal ignition-reveal-2">
                        Re-inventing
                        <span className="hero__script script-accent">The Thai Way</span>
                    </h1>
                    <p className="hero__lede ignition-reveal ignition-reveal-3">
                        Bangkok street craft, quietly elevated &mdash; three dining rooms across Dhaka.
                    </p>
                    <div className="hero__actions ignition-reveal ignition-reveal-4">
                        <Link href="/menu" className="btn btn-primary">
                            Explore the Menu
                        </Link>
                        <a
                            href={whatsappLink(CONTACT_MESSAGE)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-secondary--on-deep"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>

                <div className="hero__cue" aria-hidden="true">
                    <span className="ember-drift-track">
                        <span className="ember-drift-dot" />
                    </span>
                </div>
            </section>

            {/* ─── THE FOOD ─────────────────────────────────────────────
                Directly after the hero, because this is a street-food
                restaurant and food is the reason anyone opens the page. One
                signature plate at editorial scale to set the standard, then
                five more at a glance with prices, then a category strip that
                drops straight into the relevant part of the menu. A visitor
                who wants to eat never has to read the story first. */}
            <section id="food" className="section surface-warm lattice lattice--warm on-warm">
                <div className="container">
                    <header className="section-head section-head--center reveal-hidden">
                        <span className="overline">Straight from the Wok</span>
                        <h2 className="display-2">The ones people come back for.</h2>
                        <p className="section-head__lede">
                            Seventy-five dishes on the full menu. Mains from 295 BDT, all prices inclusive of VAT.
                        </p>
                    </header>

                    <article className="spread reveal-hidden">
                        <div className="spread__media reveal-toss">
                            <div className="dish dish--angled">
                                <Image
                                    className="dish-img"
                                    src="/assets/Menu/KS Menu Webp/E. Noodles/Pad Thai.webp"
                                    alt="Pad Thai"
                                    fill
                                    sizes="(max-width: 820px) 90vw, 50vw"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="spread__copy">
                            <span className="spread__tag">Most ordered</span>
                            <h3>Pad Thai</h3>
                            <p className="spread__note">Tamarind &amp; charred wok</p>
                            <p>
                                Stir-fried flat rice noodles with prawn and chicken in Tom Yum chilli paste,
                                greens and peanut &mdash; the rhythm of the wok on a single plate.
                            </p>
                            <p className="spread__price">385 BDT</p>
                            <a
                                href={whatsappLink("Hello Khao San! I'd like to order the Pad Thai.")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn--sm"
                            >
                                Contact Us
                            </a>
                        </div>
                    </article>

                    <div className="picks">
                        {PICKS.map((d) => (
                            <article key={d.name} className="pick reveal-stagger">
                                <div className="pick__media">
                                    <div className="dish">
                                        <Image
                                            className="dish-img"
                                            src={d.img}
                                            alt={d.name}
                                            fill
                                            sizes="(max-width: 640px) 45vw, 200px"
                                        />
                                    </div>
                                </div>
                                <h4 className="pick__name">{d.name}</h4>
                                <p className="pick__price">{d.price} BDT</p>
                            </article>
                        ))}
                    </div>

                    <div className="food-actions reveal-hidden">
                        <nav className="food-cats" aria-label="Jump to a menu category">
                            {CATEGORY_LINKS.map((c) => (
                                <Link key={c.href} href={c.href} className="food-cat">
                                    {c.label}
                                </Link>
                            ))}
                        </nav>
                        <Link href="/menu" className="btn btn-primary">
                            See all 75 dishes
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── ABOUT ────────────────────────────────────────────────── */}
            <section id="about" className="section surface-sand lotus lotus--bloom lotus--sand">
                <div className="container">
                    <header className="section-head section-head--center reveal-hidden">
                        <span className="overline">Our Story</span>
                        <h2 className="display-2 section-head__title--wide">Bangkok street food, elevated.</h2>
                        <p className="section-head__lede">
                            Khao San is a bridge. We keep the raw technique and high heat of the legendary Thai
                            street stalls, then set them in a room built for sharing. No shortcuts &mdash; just
                            authentic craft.
                        </p>
                    </header>

                    <div className="editorial reveal-hidden">
                        <div className="editorial__media">
                            <BackgroundVideo
                                src="/assets/Brand_Asset/Khao_San_Rich_coconut_curry_broth_1321748130161536_1440p_20260706.mp4"
                                poster="/assets/posters/kitchen-dish.webp"
                                className="editorial__video media-feather"
                            />
                        </div>
                        <div className="editorial__copy">
                            <span className="overline">The Kitchen</span>
                            <h3>The theatre of fire.</h3>
                            <p>
                                Our woks run on raw heat and discipline. Tossing fresh ingredients at extreme
                                temperature gives the charred, complex caramelisation that defines real street
                                craft &mdash; the flavour you cannot fake at a lower flame.
                            </p>
                            <Link href="/menu" className="btn btn-secondary btn--sm">
                                See the craft
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* ─── GALLERY ──────────────────────────────────────────────── */}
            <section id="gallery" className="section surface-deep lattice lattice--deep on-deep">
                <div className="container">
                    <header className="section-head section-head--center reveal-hidden">
                        <span className="overline">The Gallery</span>
                        <h2 className="display-2">Inside the room.</h2>
                    </header>

                    <div className="gallery-mosaic">
                        <figure className="gm gm--feature reveal-hidden">
                            <Image
                                src="/assets/gallery/neon-thai-way.webp"
                                alt="The Thai Way neon sign and lotus above the bar"
                                fill
                                sizes="(max-width: 900px) 100vw, 50vw"
                                style={{ objectFit: "cover" }}
                            />
                            <figcaption>The Thai Way</figcaption>
                        </figure>

                        <figure className="gm gm--tall reveal-hidden">
                            <Image
                                src="/assets/gallery/elephant-mural.webp"
                                alt="Hand-painted elephant mural in the dining room"
                                fill
                                sizes="(max-width: 900px) 50vw, 25vw"
                                style={{ objectFit: "cover" }}
                            />
                            <figcaption>The Mark</figcaption>
                        </figure>

                        <figure className="gm gm--wide reveal-hidden">
                            <Image
                                src="/assets/gallery/street-mural.webp"
                                alt="Painted Bangkok street scene marking Thailand 0 km"
                                fill
                                sizes="(max-width: 900px) 50vw, 25vw"
                                style={{ objectFit: "cover" }}
                            />
                            <figcaption>Thailand, 0 km</figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ─── GIFT CARDS ───────────────────────────────────────────── */}
            <section id="gift-cards" className="section surface-sand lotus lotus--mandala lotus--sand">
                <div className="container gift">
                    <div className="gift__copy reveal-hidden">
                        <span className="overline">Gift Cards</span>
                        <h2 className="display-2">An evening, gifted.</h2>
                        <p>
                            A Khao San gift card opens the full menu across all three outlets. Delivered digitally,
                            redeemable instantly.
                        </p>
                        <ul className="gift__list">
                            <li>Redeemable at Gulshan, Dhanmondi &amp; Uttara</li>
                            <li>A personalised note with every digital card</li>
                            <li>No expiry, no hidden fees</li>
                        </ul>
                        <a
                            href={whatsappLink("Hello Khao San! I'd like to buy a gift card.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Contact Us
                        </a>
                    </div>

                    {/* The card art carries the denominations, which appear
                        nowhere else on the page - so these are described rather
                        than hidden from assistive tech. */}
                    <div className="gift__cards reveal-hidden">
                        {/* The saffron brush sweep the cards sit on - three
                            overlapping strokes rotated into one curve, so the
                            stack reads as placed on a painted mark rather than
                            floating on flat blue. */}
                        <div className="gift__brush" aria-hidden="true">
                            <Image src="/assets/brush-strokes/saffron.png" alt="" fill sizes="700px" style={{ objectFit: "contain" }} />
                        </div>
                        <div className="gift__brush gift__brush--b" aria-hidden="true">
                            <Image src="/assets/brush-strokes/saffron.png" alt="" fill sizes="700px" style={{ objectFit: "contain" }} />
                        </div>
                        <div className="gift__brush gift__brush--c" aria-hidden="true">
                            <Image src="/assets/brush-strokes/saffron.png" alt="" fill sizes="700px" style={{ objectFit: "contain" }} />
                        </div>
                        <div className="gift__card gift__card--back">
                            <Image
                                src={GIFT_3000}
                                alt="Khao San gift card, 3,000 BDT"
                                width={1500}
                                height={850}
                                sizes="(max-width: 900px) 70vw, 420px"
                            />
                        </div>
                        <div className="gift__card gift__card--front">
                            <Image
                                src={GIFT_1500}
                                alt="Khao San gift card, 1,500 BDT"
                                width={1500}
                                height={850}
                                sizes="(max-width: 900px) 70vw, 420px"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── LOCATIONS ────────────────────────────────────────────── */}
            <section id="locations" className="section surface-deep lattice lattice--deep on-deep">
                <div className="container">
                    <header className="section-head section-head--center reveal-hidden">
                        <span className="overline">Locations</span>
                        <h2 className="display-2">Find your nearest room.</h2>
                        <p className="section-head__lede">
                            Open Saturday to Thursday from noon, and from 2 PM on Fridays.
                        </p>
                    </header>

                    <div className="loc-grid">
                        {OUTLETS.map((outlet, i) => (
                            <LocationCard key={outlet.id} outlet={outlet} priority={i === 0} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CONTACT ──────────────────────────────────────────────── */}
            <section id="contact" className="section section--tight contact on-deep">
                <BackgroundVideo
                    src="/assets/Brand_Asset/Khao_San_The_wait_is_finally_over_2134770693761947_1080p_20260706.mp4"
                    className="hero__video hero-ken-burns"
                />
                <div className="hero__scrim" aria-hidden="true" />
                <div className="container contact__inner reveal-hidden">
                    <span className="overline" style={{ textShadow: "var(--shadow-text-heavy)" }}>Come and Eat</span>
                    <h2 className="display-2" style={{ textShadow: "var(--shadow-text-heavy)" }}>Taste the fire.</h2>
                    <p style={{ textShadow: "var(--shadow-text-heavy)" }}>
                        Contact us to book a table, ask about a large party, or order ahead. We answer
                        during opening hours.
                    </p>
                    <a
                        href={whatsappLink(CONTACT_MESSAGE)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </>
    );
}
