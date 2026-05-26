"use client";

import Link from "next/link";
import { useState } from "react";

export type AmigoPrompt = {
  label: string;
  answer: string;
  actionLabel?: string;
  actionHref?: string;
};

type AmigoGuideProps = {
  context: string;
  intro: string;
  prompts: AmigoPrompt[];
  variant?: "dark" | "light";
};

const isExternalHref = (href: string) => href.startsWith("http");

export function AmigoGuide({
  context,
  intro,
  prompts,
  variant = "dark"
}: AmigoGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePrompt = prompts[activeIndex] ?? prompts[0];

  return (
    <aside
      className={`amigoGuide ${variant} ${isOpen ? "open" : ""}`}
      aria-label={`Amigo guide for ${context}`}
    >
      <button
        className="amigoLauncher"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span className="amigoOrb" aria-hidden="true">
          A
        </span>
        <span>Ask Amigo</span>
      </button>

      {isOpen ? (
        <div className="amigoPanel" role="dialog" aria-label="Amigo prototype guide">
          <header className="amigoHeader">
            <div>
              <span>Prototype guide</span>
              <strong>Amigo</strong>
            </div>
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </header>

          <p className="amigoIntro">{intro}</p>

          <div className="amigoPromptGrid" aria-label="Suggested Amigo questions">
            {prompts.map((prompt, index) => (
              <button
                key={prompt.label}
                className={index === activeIndex ? "active" : ""}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {activePrompt ? (
            <div className="amigoResponse" aria-live="polite">
              <span>{activePrompt.label}</span>
              <p>{activePrompt.answer}</p>
              {activePrompt.actionHref && activePrompt.actionLabel ? (
                isExternalHref(activePrompt.actionHref) ? (
                  <a
                    href={activePrompt.actionHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {activePrompt.actionLabel}
                  </a>
                ) : (
                  <Link href={activePrompt.actionHref}>
                    {activePrompt.actionLabel}
                  </Link>
                )
              ) : null}
            </div>
          ) : null}

          <small>
            This is a scripted UI prototype. Live AI, host inbox, direct booking,
            payments, and Airbnb sync are future phases.
          </small>
        </div>
      ) : null}
    </aside>
  );
}
