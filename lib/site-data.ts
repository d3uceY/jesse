export const registerStripItems = [
    "ISSUE № 001",
    "JULY 2026",
    "LAGOS · NIGERIA",
    { text: "ONYEKWELU JESSE", red: true },
    "117 REPOSITORIES",
    "GITHUB.COM/D3UCEY",
    "X.COM/D3UC3Y",
    { text: "D3UCEY", red: true },
] as const;

export const heroStats: {
    label: string;
    value: string;
    stat: string;
    small?: boolean;
}[] = [
        { label: ">>> Repositories", value: "117", stat: "PUBLIC · OPEN SOURCE" },
        {
            label: ">>> Location",
            value: "LAGOS",
            stat: "NIGERIA · GMT+1",
            small: true,
        },
        {
            label: ">>> Stack",
            value: "GO · TS · C++",
            stat: "WAILS · ESP32 · REACT",
            small: true,
        },
    ];

export const manifestTheses = [
    {
        num: "01.",
        headline: "Systems over spectacle",
        body: "Tools that work — clipboard managers, CLI alias systems, IoT regulators — each built from the constraint inward, not the chrome outward. Go for the skeleton, TypeScript for the skin, C++ where the metal matters.",
        footnote: ">>> Wails · React · ESP32 · MQTT",
    },
    {
        num: "02.",
        headline: "Ship the thing you need",
        body: "Clipcat exists because Windows clipboard failed. Ya-CLI exists because aliases get scattered. OpenSus exists because GitHub repo stats should be one paste away. Every project starts with a real friction point.",
        footnote: ">>> 6 FEATURED · 2 AWESOME-LISTED",
    },
    {
        num: "03.",
        headline: "Desktop is not dead",
        body: "Avnac Studio: a Canva alternative built with Wails and Go. 1,000+ downloads. Two projects featured on Awesome Wails. Native performance, no Electron bloat — the web wrapped in Go, not the other way around.",
        footnote: ">>> AVNAC · CLIPCAT · YA-GUI",
    },
    {
        num: "04.",
        headline: "From silicon to socket",
        body: "Water Pump Regulator: ESP32 microcontroller reading tank levels, driving relays, publishing telemetry over MQTT. Software engineering doesn't stop at the screen — it extends to the physical systems that run our infrastructure.",
        footnote: ">>> ESP32 · MQTT · EMBEDDED C++",
    },
] as const;

export const statsBar = [
    { value: "117", label: "Repositories" },
    { value: "44", label: "Followers" },
    { value: "2", label: "Awesome Listed" },
    { value: "1K+", label: "Downloads" },
] as const;

export const projects: {
    name: string;
    href: string;
    desc: string;
    tag: string;
    badge: string;
    featured?: boolean;
}[] = [
        {
            name: "Avnac Studio",
            href: "https://github.com/striker561/Avnac-Studio",
            desc: "Lightweight desktop design tool — a Canva alternative. Built with Go and Wails for native performance. 1,000+ downloads and counting.",
            tag: ">>> Go · Wails · TypeScript",
            badge: "1K+ DL",
            featured: true,
        },
        {
            name: "Clipcat",
            href: "https://github.com/d3uceY/Clipcat",
            desc: "Cross-platform clipboard manager with paper-like design. Windows clipboard, redeemed. Featured on Awesome Wails.",
            tag: ">>> Wails · React",
            badge: "AWESOME",
        },
        {
            name: "Ya-GUI",
            href: "https://github.com/d3uceY/Ya-GUI",
            desc: "GUI frontend for the Ya CLI command alias tool. Browse, edit, and manage aliases visually. Featured on Awesome Wails.",
            tag: ">>> Wails · React · Go",
            badge: "AWESOME",
        },
        {
            name: "Ya-CLI",
            href: "https://github.com/d3uceY/Ya-CLI",
            desc: "Command shortcut and alias manager. A private CLI productivity tool — speed dial for your terminal.",
            tag: ">>> Go · CLI",
            badge: "16 ★",
        },
        {
            name: "Cokpyt",
            href: "https://github.com/d3uceY/Cokpyt",
            desc: "The GUI you always wished pip shipped with. Browse, install, and manage Python packages without the terminal.",
            tag: ">>> Python · GUI",
            badge: "PIP WRAPPER",
        },
        {
            name: "OpenSus",
            href: "https://github.com/d3uceY/OpenSus",
            desc: "Paste any GitHub URL to view repository activity in one place. Stars, forks, issues — all the signals, no tab sprawl.",
            tag: ">>> Web · GitHub API",
            badge: "REPO RADAR",
        },
    ];

export const embeddedProjects = [
    {
        name: "Water Pump Regulator IoT",
        href: "https://github.com/d3uceY/WATER_PUMP_REGULATOR-IOT-",
        desc: "ESP32-based smart water pump controller with automatic tank level monitoring, relay control, and MQTT connectivity for remote monitoring and automation.",
        tags: [">>> ESP32 · C++", ">>> MQTT · IoT"],
        status: "ONGOING",
    },
] as const;

export const colophonItems: {
    key: string;
    value: string;
    href?: string;
}[] = [
        { key: "Status", value: "Available for opportunities" },
        { key: "Built With", value: "Next.js · GSAP · CSS" },
        { key: "Typefaces", value: "Archivo Black · JetBrains Mono · Inter" },
        { key: "Updated", value: "July 2026" },
        { key: "Engineer", value: "github.com/d3uceY", href: "https://github.com/d3uceY" },
        { key: "Contact", value: "x.com/d3uc3y", href: "https://x.com/d3uc3y" },
        { key: "Location", value: "Arvist, Nigeria · GMT+1" },
        { key: "License", value: "© 2026 Onyekwelu Jesse" },
    ];
