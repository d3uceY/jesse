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
        body: "Clipboard managers. CLI alias systems. IoT regulators. Built from the constraint inward, not the chrome outward. Go for the skeleton, TypeScript for the skin, C++ where the metal matters.",
        footnote: ">>> Wails · React · ESP32 · MQTT",
    },
    {
        num: "02.",
        headline: "Ship the thing you need",
        body: "Clipcat exists because the Windows clipboard is garbage. Ya-CLI exists because aliases scatter across machines. OpenSus exists because checking GitHub repo stats shouldn't take five tabs. Every project started with something that annoyed me enough to fix it.",
        footnote: ">>> 6 FEATURED · 2 AWESOME-LISTED",
    },
    {
        num: "03.",
        headline: "Desktop is not dead",
        body: "Avnac Studio: a Canva alternative built with Wails and Go. Over a thousand downloads. Two projects on Awesome Wails. Native performance without the Electron bloat. The web wrapped in Go, not the other way around.",
        footnote: ">>> AVNAC · CLIPCAT · YA-GUI",
    },
    {
        num: "04.",
        headline: "From silicon to socket",
        body: "Water Pump Regulator: an ESP32 reading tank levels, driving relays, publishing telemetry over MQTT. Software engineering doesn't stop at the screen. It extends to the physical systems that keep our infrastructure running.",
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
            desc: "Lightweight desktop design tool. Think Canva but native. Built with Go and Wails. Over a thousand downloads.",
            tag: ">>> Go · Wails · TypeScript",
            badge: "1K+ DL",
            featured: true,
        },
        {
            name: "Clipcat",
            href: "https://github.com/d3uceY/Clipcat",
            desc: "Cross-platform clipboard manager with a paper-like design. Windows clipboard, finally not terrible. Featured on Awesome Wails.",
            tag: ">>> Wails · React",
            badge: "AWESOME",
        },
        {
            name: "Ya-GUI",
            href: "https://github.com/d3uceY/Ya-GUI",
            desc: "GUI frontend for the Ya CLI alias tool. Browse, edit, and manage aliases without touching a config file. Featured on Awesome Wails.",
            tag: ">>> Wails · React · Go",
            badge: "AWESOME",
        },
        {
            name: "Ya-CLI",
            href: "https://github.com/d3uceY/Ya-CLI",
            desc: "Command shortcut and alias manager. Speed dial for your terminal.",
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
            desc: "Paste a GitHub URL. See the repo activity. Stars, forks, issues. All the signals. No tab sprawl.",
            tag: ">>> Web · GitHub API",
            badge: "REPO RADAR",
        },
    ];

export const embeddedProjects = [
    {
        name: "Water Pump Regulator IoT",
        href: "https://github.com/d3uceY/WATER_PUMP_REGULATOR-IOT-",
        desc: "ESP32-based water pump controller. Monitors tank levels, drives relays, publishes telemetry over MQTT. Remote monitoring without the cloud subscription overhead.",
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
