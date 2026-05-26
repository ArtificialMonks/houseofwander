"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

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

type AmigoMessage = {
  id: string;
  role: "guest" | "amigo";
  text: string;
  actionLabel?: string;
  actionHref?: string;
  meta?: string;
};

const isExternalHref = (href: string) => href.startsWith("http");

const normalise = (value: string) => value.trim().toLowerCase();

const findPromptForQuery = (query: string, prompts: AmigoPrompt[]) => {
  const text = normalise(query);

  const match = (...terms: string[]) => terms.some((term) => text.includes(term));

  if (match("book", "airbnb", "date", "price", "direct", "pay", "availability")) {
    return (
      prompts.find((prompt) => normalise(`${prompt.label} ${prompt.answer}`).includes("book")) ??
      prompts.find((prompt) => normalise(`${prompt.label} ${prompt.answer}`).includes("airbnb"))
    );
  }

  if (match("detail", "amenity", "amenities", "review", "reviews", "rule", "rules")) {
    return (
      prompts.find((prompt) => normalise(prompt.label).includes("guide")) ??
      prompts.find((prompt) => prompt.actionHref?.includes("#details")) ??
      prompts.find((prompt) => normalise(`${prompt.label} ${prompt.answer}`).includes("detail")) ??
      prompts.find((prompt) => normalise(`${prompt.label} ${prompt.answer}`).includes("review"))
    );
  }

  if (match("stay", "right", "guest", "sleep", "bed", "kids", "family", "first")) {
    return prompts[0];
  }

  if (match("later", "future", "host", "maaike", "laudi", "direct booking", "backend")) {
    return (
      prompts.find((prompt) => normalise(`${prompt.label} ${prompt.answer}`).includes("later")) ??
      prompts[prompts.length - 1]
    );
  }

  return undefined;
};

export function AmigoGuide({
  context,
  intro,
  prompts,
  variant = "dark"
}: AmigoGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<AmigoMessage[]>([
    {
      id: "amigo-intro",
      role: "amigo",
      text: intro,
      meta: context
    }
  ]);
  const messageCounterRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const activeQuickPrompts = prompts.slice(0, 4);
  const inputId = `amigo-input-${context.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;

  const nextId = (prefix: string) => {
    messageCounterRef.current += 1;
    return `${prefix}-${messageCounterRef.current}`;
  };

  const appendExchange = (question: string, prompt?: AmigoPrompt) => {
    const fallback = prompts[0];
    const response = prompt ?? {
      label: "Amigo can guide this step",
      answer:
        "I can help with stay fit, practical details, the Airbnb handoff, and what needs to become real before direct booking. This prototype only uses prepared House of Wander information, not live availability yet.",
      actionLabel: fallback?.actionLabel,
      actionHref: fallback?.actionHref
    };

    setMessages((current) => [
      ...current,
      {
        id: nextId("guest"),
        role: "guest",
        text: question
      },
      {
        id: nextId("amigo"),
        role: "amigo",
        text: response.answer,
        actionLabel: response.actionLabel,
        actionHref: response.actionHref,
        meta: response.label
      }
    ]);
  };

  const handlePrompt = (prompt: AmigoPrompt) => {
    setIsOpen(true);
    appendExchange(prompt.label, prompt);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = inputValue.trim();
    if (!question) return;

    appendExchange(question, findPromptForQuery(question, prompts));
    setInputValue("");
  };

  useEffect(() => {
    const openAmigo = () => setIsOpen(true);
    window.addEventListener("amigo:open", openAmigo);
    return () => window.removeEventListener("amigo:open", openAmigo);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [isOpen, messages]);

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

          <div className="amigoChatLog" aria-live="polite">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`amigoMessage ${message.role}`}
              >
                {message.meta ? <span>{message.meta}</span> : null}
                <p>{message.text}</p>
                {message.actionHref && message.actionLabel ? (
                  isExternalHref(message.actionHref) ? (
                    <a
                      href={message.actionHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {message.actionLabel}
                    </a>
                  ) : (
                    <Link href={message.actionHref}>{message.actionLabel}</Link>
                  )
                ) : null}
              </article>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="amigoPromptGrid" aria-label="Suggested Amigo questions">
            <span>Try asking</span>
            {activeQuickPrompts.map((prompt) => (
              <button
                key={prompt.label}
                type="button"
                onClick={() => handlePrompt(prompt)}
              >
                {prompt.label}
              </button>
            ))}
          </div>

          <form className="amigoInputRow" onSubmit={handleSubmit}>
            <label htmlFor={inputId}>Ask Amigo</label>
            <input
              id={inputId}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask about booking, details, or fit..."
              autoComplete="off"
            />
            <button type="submit">Send</button>
          </form>

          <small>
            This is a scripted UI prototype. Live AI, host inbox, direct booking,
            payments, and Airbnb sync are future phases.
          </small>
        </div>
      ) : null}
    </aside>
  );
}
