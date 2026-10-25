import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Terminal, ChevronRight, RotateCcw } from "lucide-react";

import {
  terminalCommands,
  commandNames,
} from "../../data/terminalCommands";

const INITIAL_OUTPUT = [
  {
    id: "welcome",
    type: "system",
    title: "KHALID.OS TERMINAL v1.0",
    lines: [
      "Secure interactive portfolio interface initialized.",
      'Type "help" to explore available commands.',
    ],
  },
];

export default function CyberTerminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(INITIAL_OUTPUT);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [announcement, setAnnouncement] = useState("");

  const inputRef = useRef(null);
  const screenRef = useRef(null);
  const outputId = useRef(0);

  const reduceMotion = useReducedMotion();

  // Scroll only inside the terminal
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    screen.scrollTo({
      top: screen.scrollHeight,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }, [output, reduceMotion]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (rawCommand) => {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    setHistory((previous) => [...previous, rawCommand]);
    setHistoryIndex(-1);

    if (command === "clear") {
      setOutput([]);
      setAnnouncement("Terminal output cleared.");
      setInput("");
      return;
    }

    let response;

    if (command === "date") {
      response = {
        title: "SYSTEM DATE",
        lines: [new Date().toLocaleString("en-US")],
      };
    } else if (terminalCommands[command]) {
      response = terminalCommands[command];
    } else {
      response = {
        title: "COMMAND NOT FOUND",
        lines: [
          `"${command}" is not recognized.`,
          'Type "help" to see available commands.',
        ],
      };
    }

    const isError =
      !terminalCommands[command] && command !== "date";

    outputId.current += 1;

    setOutput((previous) => [
      ...previous,
      {
        id: `command-${outputId.current}`,
        type: "command",
        command: rawCommand,
      },
      {
        id: `response-${outputId.current}`,
        type: "response",
        title: response.title,
        lines: response.lines,
        error: isError,
      },
    ]);

    // Announce only the latest response to screen readers
    setAnnouncement(
      `${response.title}. ${response.lines.join(". ")}`
    );

    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executeCommand(input);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (history.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }

      return;
    }

    if (event.key === "Tab" && !event.shiftKey) {
      const typed = input.trim().toLowerCase();

      // Keep normal keyboard navigation for empty input
      if (!typed) return;

      const matches = commandNames.filter((command) =>
        command.startsWith(typed)
      );

      if (matches.length === 1 && matches[0] !== typed) {
        event.preventDefault();
        setInput(matches[0]);
      }
    }
  };

  const resetTerminal = () => {
    setOutput(INITIAL_OUTPUT);
    setInput("");
    setHistoryIndex(-1);
    setAnnouncement("Terminal reset.");
    focusInput();
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      aria-label="KHALID.OS interactive terminal"
      role="region"
      className="
        relative mx-auto w-full max-w-5xl
        overflow-hidden rounded-2xl
        border border-cyan-500/20
        bg-[#030712]/95
        shadow-[0_0_70px_rgba(0,229,255,0.07)]
        backdrop-blur-xl
      "
    >
      {/* Terminal header */}
      <div
        className="
          flex items-center justify-between
          border-b border-white/10
          bg-white/[0.03]
          px-4 py-4 sm:px-6
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-red-400" />
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-yellow-400" />
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-green-400" />

          <div className="ml-2 flex min-w-0 items-center gap-2">
            <Terminal
              size={15}
              aria-hidden="true"
              className="shrink-0 text-cyan-400"
            />

            <span className="truncate font-mono text-xs text-gray-300 sm:text-sm">
              khalid@khalid-os:~
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={resetTerminal}
          aria-label="Reset terminal"
          title="Reset terminal"
          className="
            rounded-lg p-2
            text-gray-300
            transition-colors
            hover:bg-white/10 hover:text-cyan-400
            focus-visible:outline-2
            focus-visible:outline-cyan-400
          "
        >
          <RotateCcw size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Terminal screen */}
      <div
        ref={screenRef}
        onClick={focusInput}
        aria-label="Terminal output and command input"
        className="
          h-[360px] cursor-text
          overflow-y-auto
          px-4 py-6
          font-mono text-xs
          leading-relaxed
          sm:h-[400px] sm:px-6 sm:text-sm
        "
      >
        <div aria-label="Terminal command history">
          {output.map((item) => (
            <div key={item.id} className="mb-5">
              {item.type === "command" ? (
                <div className="flex gap-2 text-gray-200">
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-green-400"
                  >
                    $
                  </span>

                  <span className="break-all">{item.command}</span>
                </div>
              ) : (
                <div>
                  {item.title && (
                    <p
                      className={`mb-2 font-semibold tracking-wider ${item.error ? "text-red-400" : "text-cyan-400"
                        }`}
                    >
                      {item.title}
                    </p>
                  )}

                  {item.lines?.map((line, index) => (
                    <div
                      key={`${item.id}-line-${index}`}
                      className="
                        min-h-[1.5em]
                        whitespace-pre-wrap
                        break-words
                        text-gray-300
                      "
                    >
                      {line || "\u00A0"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Active command line */}
        <div className="flex items-center gap-2">
          <ChevronRight
            size={16}
            aria-hidden="true"
            className="shrink-0 text-green-400"
          />

          <span
            aria-hidden="true"
            className="shrink-0 text-cyan-400"
          >
            $
          </span>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setHistoryIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command input"
            aria-describedby="terminal-help"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder='Type "help"...'
            className="
              min-w-0 flex-1
              rounded-sm border-none
              bg-transparent
              text-gray-100
              outline-none
              placeholder:text-gray-400
              focus-visible:outline-2
              focus-visible:outline-cyan-400
              focus-visible:outline-offset-4
            "
          />
        </div>
      </div>

      {/* Accessible instructions */}
      <p id="terminal-help" className="sr-only">
        Type help to see commands. Press Enter to execute.
        Use Up and Down arrows for command history.
        Tab completes a unique command match.
      </p>

      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Footer */}
      <div
        className="
          flex flex-wrap items-center justify-between
          gap-3 border-t border-white/10
          bg-white/[0.02]
          px-4 py-3 sm:px-6
        "
      >
        <span className="font-mono text-[10px] text-gray-300 sm:text-xs">
          KHALID.OS // INTERACTIVE SYSTEM
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-400" />

          <span className="font-mono text-[10px] text-green-400 sm:text-xs">
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </motion.div>
  );
}