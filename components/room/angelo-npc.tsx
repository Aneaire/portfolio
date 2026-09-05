"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { MessageCircle, X } from "lucide-react";
import styles from "./room.module.css";

interface AngeloNpcProps {
  position: { x: number; y: number };
  isPaused: boolean;
}

export function AngeloNpc({ position, isPaused }: AngeloNpcProps) {
  const [line, setLine] = useState(0);
  const [isVisible, setVisible] = useState(true);
  const [isQuiet, setQuiet] = useState(false);
  const [isPageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (isPaused || isQuiet || !isPageVisible) return;
    const timeout = window.setTimeout(
      () => {
        if (!isVisible) setLine((previous) => (previous + 1) % messages.length);
        setVisible(!isVisible);
      },
      isVisible ? 3000 : 1000,
    );
    return () => window.clearTimeout(timeout);
  }, [line, isVisible, isPaused, isQuiet, isPageVisible]);

  const isShowing = isVisible && !isQuiet && !isPaused;

  return (
    <div
      className={styles.npc}
      style={
        {
          "--npc-x": `${position.x}px`,
          "--npc-y": `${position.y}px`,
        } as CSSProperties
      }
    >
      <div
        className={styles.npcBubble}
        role="note"
        aria-label="Angelo says"
        aria-hidden={!isShowing}
        data-visible={isShowing}
      >
        <p>{messages[line]}</p>
        <button
          className={styles.npcDismiss}
          aria-label="Hide Angelo's automatic messages"
          tabIndex={isShowing ? 0 : -1}
          onClick={() => {
            setQuiet(true);
            setVisible(false);
          }}
        >
          <X size={12} />
        </button>
      </div>
      <button
        className={styles.npcName}
        aria-label="Talk to Angelo"
        onClick={() => {
          setLine((previous) => (previous + 1) % messages.length);
          setQuiet(false);
          setVisible(true);
        }}
      >
        <MessageCircle size={12} />
        <span>Angelo</span>
      </button>
    </div>
  );
}

const messages = [
  "Hey, welcome in! What are we going to do today?",
  "Ready to build something?",
  "The workstation has a few projects I'd love to show you.",
  "Make yourself at home. Your sidekick already has.",
  "Got an idea? Let's talk at the comms terminal.",
  "Just one more feature. Then coffee.",
];
