export const site = {
  name: "Jesse",
  handle: "d3uceY",
  email: "onyekwelujesse@gmail.com",
  mailto: "mailto:onyekwelujesse@gmail.com",
  github: "https://github.com/d3uceY",
  x: "https://x.com/d3uc3y",
  xHandle: "@d3uc3y",
  tagline:
    "I create tools that solve my own problems. If it solves yours, that's nice too.",
} as const;

export type Product = {
  id: string;
  name: string;
  logo: string;
  shot: string;
  alt: string;
  lede: string;
  body: string;
  facts: string[];
  href: string;
  hrefLabel: string;
};

/** The five that carry the front of the page. Order is the page order. */
export const products: Product[] = [
  {
    id: "avnac",
    name: "Avnac Studio",
    logo: "/assets/media/logo-avnac.webp",
    shot: "/assets/media/app-avnac.webp",
    alt: "Avnac Studio's file grid: finished posters and social graphics, including a Summer Picnic flyer and a birthday card",
    lede: "A design canvas for posters, layouts and social graphics, running as a native desktop app.",
    body: "Avnac Studio is a cross-platform desktop design tool with over a thousand downloads and a focus on local file management and export.",
    facts: ["Go · Wails · TypeScript", "Windows, macOS, Linux", "1,000+ downloads"],
    href: "https://avnac.design/studio",
    hrefLabel: "avnac.design",
  },
  {
    id: "vectile",
    name: "Vectile",
    logo: "/assets/media/logo-vectile.webp",
    shot: "/assets/media/app-vectile.webp",
    alt: "Vectile's search screen, returning ranked passages from a library of design books and manuals",
    lede: "A private library for everything you've written, read or downloaded, searchable by meaning.",
    body: "A local RAG search engine for everything you write, read, and keep. Connect your Obsidian vault, projects, Calibre library, and code repos, then find anything with local hybrid search and expose through MCP.",
    facts: ["Go · SQLite · FTS5 + vectors", "Windows, macOS, Linux", "MCP server for local agents"],
    href: "https://github.com/d3uceY/vectile",
    hrefLabel: "github.com/d3uceY/vectile",
  },
  {
    id: "clipcat",
    name: "Clipcat",
    logo: "/assets/media/logo-clipcat.webp",
    shot: "/assets/media/app-clipcat.webp",
    alt: "Clipcat's clipboard laid out as pinned paper notes, grouped into Pinned and Recent",
    lede: "A clipboard manager that looks like a wall of notes pinned to paper.",
    body: "Everything you copy lands on a note you can pin, label and search. It has some cool features, you can also sync your clipboard accross devices (LAN).",
    facts: ["Go · Wails · TypeScript", "Windows, macOS, Linux", "Featured in Awesome Wails"],
    href: "https://getclipcat.com/",
    hrefLabel: "getclipcat.com",
  },
  {
    id: "spriteware",
    name: "SpriteWare",
    logo: "/assets/media/logo-spriteware.webp",
    shot: "/assets/media/app-spriteware.webp",
    alt: "SpriteWare's server screen, showing a local MCP endpoint and the config for connecting an assistant",
    lede: "An MCP server that lets an agent open a sprite, draw pixels, look at the result and export it.",
    body: "An MCP for Aseprite that lets an agent interact with sprite objects and the editing surface. You can export as PNG, GIF or a sprite sheet for your game engines and stuff.",
    facts: ["Go · Elm · MCP", "Windows, macOS, Linux", "Aseprite bridge"],
    href: "https://github.com/d3uceY/SpriteWare",
    hrefLabel: "github.com/d3uceY/SpriteWare",
  },
  {
    id: "nooboo",
    name: "NooBoo",
    logo: "/assets/media/logo-nooboo.webp",
    shot: "/assets/media/app-nooboo.webp",
    alt: "NooBoo's library, listing mods and custom content with toggles, sizes and clash warnings",
    lede: "A Sims 4 mod manager I built for my sister, with a backup before every install.",
    body: "Mods, custom content, Tray files and packs, with real thumbnails and a duplicate finder. It finds crashes and errors caused by addons or conflicting content.",
    facts: ["Go · Wails · TypeScript", "Windows, macOS, Linux", "Save and Tray snapshots"],
    href: "https://github.com/d3uceY/NooBoo",
    hrefLabel: "github.com/d3uceY/NooBoo",
  },
];

export type ShelfItem = {
  name: string;
  kind: string;
  note: string;
  href: string;
  logo: string;
};

/** Everything past the five. Four rows until you ask for the rest. */
export const shelf: ShelfItem[] = [
  {
    name: "Ya-GUI",
    kind: "desktop",
    note: "A window for the Ya alias manager. Also picked by Awesome Wails.",
    href: "https://github.com/d3uceY/Ya-GUI",
    logo: "/assets/media/shelf-ya-gui.webp",
  },
  {
    name: "Cokpyt",
    kind: "desktop",
    note: "pip with a window. Install, upgrade and read the output without the flag guide.",
    href: "https://d3ucey.github.io/Cokpyt/",
    logo: "/assets/media/shelf-cokpyt.webp",
  },
  {
    name: "StdScout",
    kind: "desktop",
    note: "Lists every executable on PATH and the folder it came from.",
    href: "https://github.com/d3uceY/stdscout",
    logo: "/assets/media/shelf-stdscout.webp",
  },
  {
    name: "Debris",
    kind: "desktop",
    note: "A Windows debloat tool in Rust. Removes the apps nobody asked for.",
    href: "https://github.com/d3uceY/debris",
    logo: "/assets/media/shelf-debris.webp",
  },
  {
    name: "Aka-nasu",
    kind: "desktop",
    note: "A 3D pomodoro timer you can poke at. Focus, with something to look at.",
    href: "https://github.com/d3uceY/aka-nasu",
    logo: "/assets/media/shelf-aka-nasu.webp",
  },
  {
    name: "Retna",
    kind: "cli",
    note: "Reads a colour in any notation, prints it in another, and checks contrast against WCAG.",
    href: "https://github.com/d3uceY/Retna",
    logo: "/assets/media/shelf-retna.webp",
  },
  {
    name: "Piper",
    kind: "cli",
    note: "Elevator music for the terminal while a command runs.",
    href: "https://github.com/d3uceY/Piper",
    logo: "/assets/media/shelf-piper.webp",
  },
  {
    name: "Ya-CLI",
    kind: "cli",
    note: "Command shortcuts and aliases. This is what Ya-GUI drives.",
    href: "https://github.com/d3uceY/Ya-CLI",
    logo: "/assets/media/shelf-ya-cli.webp",
  },
  {
    name: "OpenSus",
    kind: "web",
    note: "Paste a GitHub URL, get the repository's activity in one view.",
    href: "https://github.com/d3uceY/OpenSus",
    logo: "/assets/media/shelf-opensus.webp",
  },
  {
    name: "WPFind",
    kind: "web",
    note: "A search bar for the WordPress admin, because 2026 still doesn't have one.",
    href: "https://github.com/d3uceY/WPFind",
    logo: "/assets/media/shelf-wpfnd.webp",
  },
];

export const faqs = [
  {
    question: "What do you actually do?",
    answer:
      "I build web apps, desktop applications and CLI tools for fun, exploring everything from frontend experiences to full-stack development and end-to-end product engineering.",
  },
  {
    question: "What do you build with?",
    answer:
      "Go and TypeScript most days ( for backend and desktop applications ), with occasional use of Rust when i need things to be fast. I use React for frontend interfaces. ",
  },
  {
    question: "Why does each app only do one thing?",
    answer:
      "Because that's how I use software. The problems they solve in my life appered as \"one thing\"😂. Most applications here are built for my personal use.",
  },
  {
    question: "Are the tools free?",
    answer:
      "They are open source, bro.",
  },
  {
    question: "Can I send a bug or a patch?",
    answer:
      "Please. Issues and pull requests on the repo, or find me on GitHub. If you want a feature, describe what you're trying to do. Thank you!!! (●'◡'●).",
  },
];
