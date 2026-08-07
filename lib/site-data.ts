export const registerStripItems = [
    "ISSUE № 001",
    "JULY 2026",
    "LAGOS · NIGERIA",
    { text: "JESSE", red: true },
    "2× AWESOME WAILS",
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
        { label: ">>> Awesome Wails", value: "2", stat: "FEATURED PROJECTS" },
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
        headline: "I fix what annoys me",
        body: "Clipcat exists because the Windows clipboard is Ass Cheeks (forgive my language). Ya-CLI exists because my aliases lived on three machines and kept getting lost. OpenSus exists because...because it can. None of it started as a portfolio piece. It started as friction I wanted gone.",
        footnote: ">>> CLIPCAT · YA-CLI · OPENSUS",
    },
    {
        num: "02.",
        headline: "A few thousand downloads later",
        body: "Avnac Studio is a design tool built with Go and Wails. Over a thousand people have it installed. Two of my projects sit on Awesome Wails, a curated list nobody bought their way onto.",
        footnote: ">>> AVNAC STUDIO · AWESOME WAILS",
    },
    {
        num: "03.",
        headline: "Hardware that reports back",
        body: "The Water Pump Regulator runs on an ESP32. It reads tank levels, drives relays, and publishes telemetry over MQTT, so a physical system reports its state without a cloud subscription. I could have just bought one but building stuff like this is fun.",
        footnote: ">>> ESP32 · MQTT · C++",
    },
] as const;

export const statsBar = [
    { value: "2", label: "Awesome Wails" },
    { value: "1K+", label: "Downloads" },
    { value: "100%", label: "Open Source" },
    { value: "3", label: "Languages" },
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
    tone?: "ok";
}[] = [
        { key: "Status", value: "Available for opportunities", tone: "ok" },
        { key: "Built With", value: "Next.js · GSAP · CSS" },
        { key: "Typefaces", value: "Archivo Black · JetBrains Mono · Inter" },
        { key: "Updated", value: "July 2026" },
        { key: "Engineer", value: "github.com/d3uceY", href: "https://github.com/d3uceY" },
        { key: "Contact", value: "x.com/d3uc3y", href: "https://x.com/d3uc3y" },
        { key: "Location", value: "Lagos, Nigeria · GMT+1" },
        { key: "License", value: "© 2026 Onyekwelu Jesse" },
    ];
