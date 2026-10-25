export const attackTypes = [
  {
    type: "Port Scan",
    severity: "Medium",
    source: "192.0.2.45",
    target: "Web Server",
    description: "Multiple connection attempts detected.",
  },
  {
    type: "Brute Force",
    severity: "High",
    source: "198.51.100.23",
    target: "SSH Gateway",
    description: "Repeated authentication attempts detected.",
  },
  {
    type: "DDoS Attempt",
    severity: "Critical",
    source: "203.0.113.78",
    target: "Cloud Gateway",
    description: "Unusual traffic volume detected.",
  },
  {
    type: "Suspicious Login",
    severity: "Medium",
    source: "192.0.2.91",
    target: "Admin Portal",
    description: "Unusual authentication activity detected.",
  },
  {
    type: "Malware Signature",
    severity: "High",
    source: "198.51.100.64",
    target: "Endpoint",
    description: "Known suspicious file pattern detected.",
  },
];