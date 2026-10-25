export const terminalCommands = {
  help: {
    title: "AVAILABLE COMMANDS",
    lines: [
      "help        Show available commands",
      "whoami      Discover who I am",
      "skills      Explore technical skills",
      "projects    List my projects",
      "experience  View professional experience",
      "education   View academic background",
      "contact     Get contact information",
      "socials     Find my social profiles",
      "date        Display current date",
      "clear       Clear terminal output",
    ],
  },

  whoami: {
    title: "IDENTITY PROFILE",
    lines: [
      "Name       : Khalid Aziz",
      "Role       : Network, Cloud & Cybersecurity Engineering Student",
      "Location   : El Kelaâ des Sraghna, Morocco",
      "Focus      : Network Security | Cloud | Cybersecurity",
      "Status     : Building secure digital systems",
    ],
  },

  skills: {
    title: "TECHNICAL SKILLS",
    lines: [
      "[NETWORK]",
      "TCP/IP, Routing, Switching, VLAN, DNS, DHCP",
      "Cisco Packet Tracer, GNS3",
      "",
      "[CYBERSECURITY]",
      "Wazuh SIEM, IDS/IPS, Log Analysis",
      "Network Security, Cryptography, FIM",
      "",
      "[SYSTEMS & CLOUD]",
      "Linux Ubuntu/Kali, Windows Server",
      "VirtualBox, VMware, Apache, Cloud Computing",
      "",
      "[DEVELOPMENT]",
      "Python, PHP, SQL, JavaScript",
    ],
  },

  projects: {
    title: "PROJECT LABORATORY",
    lines: [
      "[01] CyberGuard IDS/IPS",
      "     Python | Machine Learning | Flask | Linux",
      "",
      "[02] Wazuh SIEM",
      "     Wazuh | Ubuntu Server | Kali Linux",
      "",
      "[03] Network Monitoring",
      "     Zabbix | Nagios",
      "",
      "[04] Complaints Management Platform",
      "     PHP | MySQL | JavaScript",
      "",
      "[05] Virtualized Network Infrastructure",
      "     Linux | Apache | VirtualBox",
      "",
      "Navigate to the Projects section for more details.",
    ],
  },

  experience: {
    title: "PROFESSIONAL EXPERIENCE",
    lines: [
      "[2026] Ménara Préfa",
      "Technical Internship — Network Security",
      "CyberGuard IDS/IPS development and monitoring.",
      "",
      "[2025] Conseil Provincial de Kelaâ des Sraghna",
      "Web Development & Data Analysis Internship",
      "Complaints management platform and dashboards.",
    ],
  },

  education: {
    title: "ACADEMIC BACKGROUND",
    lines: [
      "[2026–2027] Licence DBT",
      "Networks, Cloud & Cybersecurity",
      "EST Kelaâ des Sraghna — In progress",
      "",
      "[2024–2026] DUT",
      "Networks, Cybersecurity & Artificial Intelligence",
      "EST Kelaâ des Sraghna",
      "",
      "[2023–2024] Baccalauréat",
      "Physical Sciences",
      "Lycée Qualifiant Moulay Ismaïl",
    ],
  },

  contact: {
    title: "CONTACT INFORMATION",
    lines: [
      "Email    : khalidaziz070071@gmail.com",
      "Phone    : +212 700716931",
      "Location : Morocco",
      "",
      "Use the Contact section to send a message.",
    ],
  },

  socials: {
    title: "SOCIAL PROFILES",
    lines: [
      "GitHub   : github.com/Khalidaziz999",
      "LinkedIn : linkedin.com/in/khalid-aziz-a10762353",
    ],
  },
};

export const commandNames = [
  ...Object.keys(terminalCommands),
  "date",
  "clear",
];