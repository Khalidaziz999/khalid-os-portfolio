export const projectExplorer = {
  cyberguard: {
    subtitle:
      "Intelligent Intrusion Detection & Prevention",

    overview:
      "CyberGuard IDS/IPS is a cybersecurity project focused on network traffic analysis, machine learning-based threat detection, and security monitoring through a Flask-powered interface.",

    challenge:
      "Modern networks generate large volumes of traffic, making suspicious behavior difficult to identify through manual monitoring alone.",

    solution:
      "The project combines traffic analysis, machine learning techniques, and a web-based security dashboard to support threat identification and response workflows.",

    architecture: [
      "Network Traffic",
      "Traffic Analysis",
      "Feature Processing",
      "ML Detection Engine",
      "Flask Dashboard",
      "Security Response",
    ],

    highlights: [
      "Network traffic analysis",
      "Machine learning-based detection",
      "Flask dashboard integration",
      "Security event monitoring",
    ],

    learnings: [
      "Integrating Python security logic with web interfaces",
      "Understanding network intrusion detection workflows",
      "Working with machine learning in cybersecurity",
    ],
  },

  "wazuh-siem": {
    subtitle:
      "Centralized Security Monitoring & Incident Analysis",

    overview:
      "A hands-on SIEM environment built around Wazuh to explore centralized log monitoring, security event visibility, and incident analysis.",

    challenge:
      "Security events distributed across multiple systems can be difficult to investigate without centralized monitoring.",

    solution:
      "The lab uses Wazuh in a virtualized environment to centralize security information and support analysis of suspicious activity.",

    architecture: [
      "Monitored Systems",
      "Security Logs",
      "Wazuh Collection",
      "Detection & Analysis",
      "SIEM Dashboard",
    ],

    highlights: [
      "Centralized security visibility",
      "Log collection and monitoring",
      "Virtualized cybersecurity lab",
      "Incident investigation workflows",
    ],

    learnings: [
      "Understanding SIEM architecture",
      "Working with Linux security environments",
      "Analyzing security events",
    ],
  },

  "network-monitoring": {
    subtitle:
      "Infrastructure Visibility & Availability Monitoring",

    overview:
      "A network monitoring project using Zabbix and Nagios to explore infrastructure supervision, service availability, and alerting.",

    challenge:
      "Network and service failures can remain unnoticed without continuous monitoring and clear operational visibility.",

    solution:
      "Monitoring tools provide centralized views of infrastructure health and support the identification of availability issues.",

    architecture: [
      "Network Devices",
      "Monitoring Checks",
      "Zabbix / Nagios",
      "Metrics & Events",
      "Alerts & Dashboard",
    ],

    highlights: [
      "Infrastructure availability monitoring",
      "Monitoring dashboard configuration",
      "Service health supervision",
      "Alerting workflows",
    ],

    learnings: [
      "Comparing monitoring tools",
      "Understanding network availability",
      "Working with monitoring dashboards",
    ],
  },

  "complaints-platform": {
    subtitle:
      "Web-Based Complaints Tracking & Management",

    overview:
      "A database-driven web application developed to support complaints management, tracking, and administrative workflows.",

    challenge:
      "Manual handling of complaints can make tracking, organization, and follow-up difficult.",

    solution:
      "The platform organizes complaints through a web interface connected to a MySQL database, supporting management and follow-up.",

    architecture: [
      "User Interface",
      "PHP Application",
      "Business Logic",
      "MySQL Database",
      "Management Dashboard",
    ],

    highlights: [
      "Complaint tracking workflows",
      "PHP and MySQL integration",
      "Administrative dashboard",
      "Structured data management",
    ],

    learnings: [
      "Building database-driven applications",
      "Designing administrative interfaces",
      "Managing web application workflows",
    ],
  },

  "virtual-infrastructure": {
    subtitle:
      "Linux Systems & Virtualized Network Laboratory",

    overview:
      "A virtualized infrastructure lab focused on Linux administration, Apache web services, and network configuration.",

    challenge:
      "Practicing infrastructure deployment and administration requires a controlled environment where systems can be configured and tested safely.",

    solution:
      "VirtualBox provides an isolated environment for configuring Linux systems, networking, and web services.",

    architecture: [
      "VirtualBox Host",
      "Virtual Network",
      "Linux Servers",
      "Apache Services",
      "Testing & Administration",
    ],

    highlights: [
      "Virtual machine configuration",
      "Linux server administration",
      "Apache service deployment",
      "Virtual network setup",
    ],

    learnings: [
      "Managing virtual environments",
      "Configuring Linux services",
      "Understanding infrastructure deployment",
    ],
  },
};