import { useEffect, useRef, useState } from "react";

import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Lock,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";

import { attackTypes } from "../../data/cyberAttacks";

const MAX_ALERTS = 12;

const initialStats = {
  detected: 0,
  blocked: 0,
};

const severityColor = {
  Medium: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  High: "text-orange-400 border-orange-400/30 bg-orange-400/10",
  Critical: "text-red-400 border-red-400/30 bg-red-400/10",
};

const statColors = {
  cyan: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",
  green: "text-green-400 border-green-400/20 bg-green-400/5",
  red: "text-red-400 border-red-400/20 bg-red-400/5",
};

export default function CyberGuardSimulator() {
  const [running, setRunning] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [announcement, setAnnouncement] = useState("");

  const nextId = useRef(1);
  const startButtonRef = useRef(null);

  const reduceMotion = useReducedMotion();

  // Active threats are calculated from visible alerts
  const activeCount = alerts.filter(
    (alert) => alert.status === "Active"
  ).length;

  // =====================================
  // SIMULATION ENGINE
  // =====================================

  useEffect(() => {
    if (!running || attackTypes.length === 0) return;

    const interval = setInterval(() => {
      const template =
        attackTypes[Math.floor(Math.random() * attackTypes.length)];

      const alert = {
        ...template,
        id: nextId.current++,
        timestamp: new Date().toLocaleTimeString("en-US"),
        status: "Active",
      };

      setAlerts((previous) =>
        [alert, ...previous].slice(0, MAX_ALERTS)
      );

      setStats((previous) => ({
        ...previous,
        detected: previous.detected + 1,
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, [running]);

  // =====================================
  // CONTROLS
  // =====================================

  const toggleSimulation = () => {
    setRunning((previous) => {
      const next = !previous;

      setAnnouncement(
        next
          ? "CyberGuard simulation started. Monitoring active."
          : "CyberGuard simulation paused."
      );

      return next;
    });
  };

  const blockAttack = (id) => {
    const alert = alerts.find((item) => item.id === id);

    if (!alert || alert.status !== "Active") return;

    setAlerts((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, status: "Blocked" }
          : item
      )
    );

    setStats((previous) => ({
      ...previous,
      blocked: previous.blocked + 1,
    }));

    setAnnouncement(`${alert.type} threat blocked.`);
  };

  const blockAll = () => {
    if (activeCount === 0) return;

    setAlerts((previous) =>
      previous.map((item) =>
        item.status === "Active"
          ? { ...item, status: "Blocked" }
          : item
      )
    );

    setStats((previous) => ({
      ...previous,
      blocked: previous.blocked + activeCount,
    }));

    setAnnouncement(`${activeCount} simulated threats blocked.`);
  };

  const resetSimulation = () => {
    setRunning(false);
    setAlerts([]);
    setStats(initialStats);
    nextId.current = 1;

    setAnnouncement("CyberGuard simulation reset.");
    startButtonRef.current?.focus();
  };

  return (
    <div
      role="region"
      aria-label="CyberGuard security operations simulator"
      className="
        overflow-hidden rounded-3xl
        border border-cyan-500/20
        bg-[#030712]/95
        shadow-[0_0_70px_rgba(0,229,255,0.06)]
      "
    >
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3">
            <Shield
              className="text-cyan-400"
              size={24}
              aria-hidden="true"
            />
          </div>

          <div>
            <h3 className="font-bold text-white">
              CYBERGUARD SOC
            </h3>

            <p className="font-mono text-xs text-gray-300">
              IDS/IPS ATTACK SIMULATION
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${running
              ? "animate-pulse bg-green-400"
              : "bg-gray-500"
              }`}
          />

          <span className="font-mono text-xs text-gray-300">
            {running ? "MONITORING ACTIVE" : "SIMULATION PAUSED"}
          </span>
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-5 sm:p-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Activity}
            label="Detected Threats"
            value={stats.detected}
            color="cyan"
          />

          <StatCard
            icon={ShieldCheck}
            label="Blocked Threats"
            value={stats.blocked}
            color="green"
          />

          <StatCard
            icon={ShieldAlert}
            label="Active Threats"
            value={activeCount}
            color="red"
          />
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            ref={startButtonRef}
            type="button"
            onClick={toggleSimulation}
            aria-pressed={running}
            className="
              inline-flex items-center gap-2
              rounded-xl bg-cyan-400
              px-5 py-3 font-semibold
              text-[#050816]
              transition hover:bg-cyan-300
            "
          >
            {running ? (
              <Pause size={18} aria-hidden="true" />
            ) : (
              <Play size={18} aria-hidden="true" />
            )}

            {running ? "Pause Simulation" : "Start Simulation"}
          </button>

          <button
            type="button"
            onClick={blockAll}
            disabled={activeCount === 0}
            aria-label={`Block all ${activeCount} active simulated threats`}
            className="
              inline-flex items-center gap-2
              rounded-xl border border-green-400/30
              bg-green-400/10 px-5 py-3
              font-semibold text-green-400
              transition hover:bg-green-400/20
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Lock size={18} aria-hidden="true" />
            Block All
          </button>

          <button
            type="button"
            onClick={resetSimulation}
            className="
              inline-flex items-center gap-2
              rounded-xl border border-white/10
              bg-white/5 px-5 py-3
              text-gray-200
              transition hover:bg-white/10
            "
          >
            <RotateCcw size={18} aria-hidden="true" />
            Reset
          </button>
        </div>

        {/* Network status */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-semibold text-white">
              Network Security Status
            </h4>

            <span
              className={`rounded-full px-3 py-1 font-mono text-xs ${activeCount > 0
                ? "bg-red-400/10 text-red-400"
                : "bg-green-400/10 text-green-400"
                }`}
            >
              {activeCount > 0
                ? "THREATS DETECTED"
                : "SYSTEM SECURE"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["Firewall", "IDS Engine", "Network Monitor"].map(
              (module) => (
                <div
                  key={module}
                  className="rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-3 py-4 text-center"
                >
                  <div
                    aria-hidden="true"
                    className="mx-auto mb-3 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.6)]"
                  />

                  <span className="text-xs text-gray-300">
                    {module}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Alerts */}
        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-lg font-bold text-white">
              Live Security Alerts
            </h4>

            <span className="font-mono text-xs text-gray-300">
              {alerts.length} RECENT EVENTS
            </span>
          </div>

          <div
            aria-label="Recent simulated security alerts"
            className="max-h-[440px] space-y-3 overflow-y-auto pr-1"
          >
            {alerts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-14 text-center">
                <ShieldCheck
                  size={35}
                  aria-hidden="true"
                  className="mx-auto mb-4 text-cyan-400/60"
                />

                <p className="text-gray-300">
                  No simulated threats detected.
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Start the simulation to generate security events.
                </p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: -15 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0, height: 0 }
                        : { opacity: 0, height: 0 }
                    }
                    layout={!reduceMotion}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-white">
                            {alert.type}
                          </span>

                          <span
                            className={`rounded-md border px-2 py-1 text-[10px] ${severityColor[alert.severity] ||
                              severityColor.Medium
                              }`}
                          >
                            {alert.severity}
                          </span>
                        </div>

                        <p className="text-xs text-gray-300">
                          {alert.source} → {alert.target}
                        </p>

                        <p className="mt-2 text-sm text-gray-300">
                          {alert.description}
                        </p>

                        <p className="mt-2 font-mono text-[10px] text-gray-400">
                          {alert.timestamp}
                        </p>
                      </div>

                      {alert.status === "Active" ? (
                        <button
                          type="button"
                          onClick={() => blockAttack(alert.id)}
                          aria-label={`Block ${alert.severity} ${alert.type} threat from ${alert.source}`}
                          className="
                            rounded-lg border border-red-400/30
                            bg-red-400/10 px-4 py-2
                            text-xs font-semibold text-red-400
                            transition hover:bg-red-400/20
                          "
                        >
                          Block Threat
                        </button>
                      ) : (
                        <span className="rounded-lg border border-green-400/20 bg-green-400/10 px-3 py-2 text-xs font-semibold text-green-400">
                          BLOCKED
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className={`rounded-2xl border p-5 ${statColors[color]}`}>
      <Icon size={22} aria-hidden="true" />

      <p
        className="mt-4 text-3xl font-bold"
        aria-label={`${value} ${label.toLowerCase()}`}
      >
        {value}
      </p>

      <p className="mt-2 text-sm text-gray-300">
        {label}
      </p>
    </div>
  );
}