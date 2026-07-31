/**
 * Single source of truth for the details that appear in more than one place -
 * the nav CTA, the locations grid, the contact section and the footer all read
 * from here, so a phone number or an opening hour is only ever changed once.
 */

/**
 * The restaurant's WhatsApp number in international format, digits only
 * (wa.me rejects spaces, dashes and a leading +).
 *
 * TODO(client): replace with the official WhatsApp business number. Until it
 * is supplied this falls back to the Gulshan flagship line, which is a real
 * reachable number - so no CTA on the site is ever dead.
 */
export const WHATSAPP_NUMBER = "8801600068193";

/** Prefills the chat so staff see what the enquiry is about. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CONTACT_MESSAGE = "Hello Khao San! I'd like to enquire about a table.";

export interface Outlet {
  id: string;
  /** Positioning label - each room has its own character. */
  type: string;
  name: string;
  address: string;
  phone: string;
  hours: string[];
  imageSrc: string;
  /** Free-text query handed to Google Maps. */
  mapQuery: string;
}

export const OUTLETS: Outlet[] = [
  {
    id: "gulshan",
    type: "Flagship",
    name: "Gulshan 1",
    address: "Level 1, Progress Tower, House 1, Road 23, Gulshan 1, Dhaka 1212",
    phone: "+88 01600-068193",
    hours: ["Sat–Thu · 12:00 PM – 11:00 PM", "Friday · 2:00 PM – 11:00 PM"],
    imageSrc: "/assets/Location_Image_1_1/Gulshan_Outlet_2.webp",
    mapQuery: "Level 1, Progress Tower, House 1, Road 23, Gulshan 1, Dhaka",
  },
  {
    id: "dhanmondi",
    type: "The Original",
    name: "Dhanmondi",
    address: "Ahmad & Kazi Tower, Level-5, House-35, Road-2, Dhanmondi, Dhaka",
    phone: "+88 01603-523731",
    hours: ["Sat–Thu · 12:00 PM – 11:00 PM", "Friday · 2:00 PM – 11:00 PM"],
    imageSrc: "/assets/Location_Image_1_1/Dhanmondi_Outlet_1.webp",
    mapQuery: "Ahmad & Kazi Tower, Level-5, House-35, Road-2, Dhanmondi, Dhaka",
  },
  {
    id: "uttara",
    type: "The Sanctuary",
    name: "Uttara",
    address: "House 30, Tropical Sormi Center, Sector 13, Garib-E-Newaz Ave, Uttara, Dhaka",
    phone: "+88 01627-167758",
    hours: ["Sat–Thu · 12:00 PM – 11:00 PM", "Friday · 2:00 PM – 11:00 PM"],
    imageSrc: "/assets/Location_Image_1_1/Uttara_Outlet_3.webp",
    mapQuery: "House 30, Tropical Sormi Center, Sector 13, Garib-E-Newaz Ave, Uttara, Dhaka",
  },
];

/**
 * One-page navigation. Everything except the menu scrolls to a section on the
 * homepage; the menu is the only separate route.
 */
export interface NavItem {
  label: string;
  href: string;
  /** Section id tracked by the scroll spy. Absent for real routes. */
  section?: string;
}

/**
 * The gallery is deliberately NOT in the nav. It is a visual interlude between
 * the story and the dishes, not a destination someone navigates to - listing it
 * padded the bar without giving anyone a reason to click it.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Locations", href: "/#locations", section: "locations" },
  { label: "Gift Cards", href: "/#gift-cards", section: "gift-cards" },
  { label: "Menu", href: "/menu" },
];
