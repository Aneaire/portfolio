"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Code2,
  Cpu,
  Download,
  Footprints,
  Layers3,
  Mail,
  MapPin,
  PawPrint,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import {
  homeText,
  personalInfo,
  projects,
  skillList,
} from "@/constant/fixedText";
import { pets, stations, type PetId } from "./room-data";
import { AngeloNpc } from "./angelo-npc";
import type { RoomController } from "./room-scene";
import styles from "./room.module.css";

const icons = [PawPrint, Cpu, Code2, Layers3, Mail];

export function DeveloperRoom() {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<RoomController | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [isReady, setReady] = useState(false);
  const [hasError, setError] = useState(false);
  const [near, setNear] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [labels, setLabels] = useState<{ x: number; y: number }[]>([]);
  const [npcPosition, setNpcPosition] = useState({ x: 0, y: 0 });
  const [pet, setPet] = useState<PetId>("cat");
  const [tutorial, setTutorial] = useState<number | null>(0);
  const [hasMoved, setMoved] = useState(false);
  const [isPetPicker, setPetPicker] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [isMenu, setMenu] = useState(false);
  const selectedPet = pets.find((p) => p.id === pet)!;
  const openStation = useCallback((id: string) => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setActive(id);
    setVisited((old) => (old.includes(id) ? old : [...old, id]));
    setDestination(null);
    setMenu(false);
  }, []);
  const finishTutorial = () => {
    setTutorial(null);
    try {
      localStorage.setItem("angelo-room-tutorial", "done");
    } catch {
      /* Private browsing can disable storage. */
    }
  };
  useEffect(() => {
    let cancelled = false;
    let instance: RoomController | undefined;
    try {
      if (localStorage.getItem("angelo-room-tutorial") === "done")
        setTutorial(null);
      const saved = localStorage.getItem("angelo-room-pet");
      if (pets.some((p) => p.id === saved)) setPet(saved as PetId);
    } catch {
      /* The room works without browser storage. */
    }
    import("./room-scene")
      .then(({ createRoom }) => {
        if (cancelled || !host.current) return;
        try {
          instance = createRoom(host.current, {
            onNear: setNear,
            onMove: () => setMoved(true),
            onLabels: setLabels,
            onNpcPosition: setNpcPosition,
            onError: () => setError(true),
          });
          controller.current = instance;
          setReady(true);
        } catch {
          setError(true);
        }
      })
      .catch(() => setError(true));
    return () => {
      cancelled = true;
      instance?.dispose();
      controller.current = null;
    };
  }, []);
  useEffect(() => {
    controller.current?.setPet(pet);
    try {
      localStorage.setItem("angelo-room-pet", pet);
    } catch {
      /* Optional preference. */
    }
  }, [pet, isReady]);
  useEffect(() => {
    controller.current?.setPaused(
      !!active || isPetPicker || isMenu || tutorial === 0 || hasError,
    );
  }, [active, isPetPicker, isMenu, tutorial, isReady, hasError]);
  useEffect(() => {
    if (active) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [active]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "e" &&
        near &&
        !active &&
        !isPetPicker &&
        !isMenu &&
        tutorial !== 0 &&
        !event.repeat &&
        !(
          event.target instanceof HTMLElement &&
          event.target.closest(
            "input, textarea, select, [contenteditable=true]",
          )
        )
      ) {
        event.preventDefault();
        openStation(near);
      }
      if (event.key === "Escape") {
        setPetPicker(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [near, active, isPetPicker, isMenu, tutorial, openStation]);
  useEffect(() => {
    if (near === destination) setDestination(null);
  }, [near, destination]);
  const walkTo = (id: string) => {
    if (hasError) {
      openStation(id);
      return;
    }
    if (tutorial === 0) setTutorial(1);
    controller.current?.setPaused(false);
    controller.current?.goToStation(id);
    setDestination(id);
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
  };
  const closeStation = () => {
    setActive(null);
    requestAnimationFrame(() => returnFocus.current?.focus());
  };
  const restart = () => {
    setMoved(false);
    controller.current?.resetMovement();
    setTutorial(0);
    setMenu(false);
    setPetPicker(false);
  };
  const activeStation = stations.find((s) => s.id === active);

  return (
    <div className={styles.room}>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Angelo Santiago home"
        >
          <span className={styles.brandMark}>
            a<span>.</span>
          </span>
          <span>
            ANGELO SANTIAGO<small>DEVELOPER / BUILDER / EXPLORER</small>
          </span>
        </Link>
        <div className={styles.headerRight}>
          <span className={styles.availability}>
            <i /> Available for opportunities
          </span>
          <button
            className={styles.outlineButton}
            onClick={() => {
              setMenu(!isMenu);
              setPetPicker(false);
            }}
          >
            Portfolio menu <Layers3 size={15} />
          </button>
        </div>
      </header>

      <section
        className={styles.world}
        aria-label="Explore Angelo's developer room"
      >
        <h1 className="sr-only">
          Explore Angelo Santiago&apos;s developer room
        </h1>
        <div className={styles.scene} ref={host} data-testid="room-scene" />
        {!isReady && !hasError && (
          <div className={styles.loading}>
            <span className={styles.spinner} /> Turning the lights on…
          </div>
        )}
        {hasError && (
          <div className={styles.fallback}>
            <Cpu size={30} />
            <h2>The room couldn&apos;t start.</h2>
            <p>You can still explore everything through the portfolio menu.</p>
            <button
              className={styles.primaryButton}
              onClick={() => setMenu(true)}
            >
              Browse portfolio <ArrowRight size={16} />
            </button>
            <button
              className={styles.textButton}
              onClick={() => window.location.reload()}
            >
              Try the room again
            </button>
          </div>
        )}
        {isReady && !hasError && (
          <div className={styles.labels}>
            {stations.map((station, i) => (
              <button
                key={station.id}
                className={`${styles.stationLabel} ${near === station.id ? styles.nearLabel : ""}`}
                style={{ left: labels[i]?.x ?? 0, top: labels[i]?.y ?? 0 }}
                onClick={() =>
                  near === station.id && tutorial !== 0
                    ? openStation(station.id)
                    : walkTo(station.id)
                }
                aria-label={
                  near === station.id
                    ? `Open ${station.name}`
                    : `Walk to ${station.name}`
                }
              >
                <span className={styles.labelDot}>
                  {visited.includes(station.id) ? (
                    <Check size={10} />
                  ) : (
                    <Plus size={10} />
                  )}
                </span>
                {station.name}
                <ChevronRight size={12} />
              </button>
            ))}
          </div>
        )}
        {isReady && !hasError && (
          <AngeloNpc
            position={npcPosition}
            isPaused={!!active || isMenu || isPetPicker}
          />
        )}
        <div className={styles.roomCoordinates}>
          <span>THE DEV ROOM</span>
          <span>ISOMETRIC / INTERACTIVE</span>
        </div>
        <div className={styles.exploration}>
          <span>
            {String(visited.length).padStart(2, "0")} <small>/ 05</small>
          </span>
          <div>
            <strong>Room discoveries</strong>
            <div className={styles.progress}>
              {stations.map((s) => (
                <i
                  key={s.id}
                  className={visited.includes(s.id) ? styles.discovered : ""}
                />
              ))}
            </div>
          </div>
        </div>

        {tutorial !== null && !hasError && (
          <aside className={styles.tutorial} aria-label="Room tutorial">
            <div className={styles.cardTop}>
              <span className={styles.eyebrow}>FIRST TIME HERE?</span>
              <button className={styles.textButton} onClick={finishTutorial}>
                Skip tutorial <X size={12} />
              </button>
            </div>
            <div className={styles.tutorialSteps}>
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  className={tutorial >= n ? styles.currentStep : ""}
                />
              ))}
            </div>
            {tutorial === 0 ? (
              <>
                <h2>Every explorer needs a sidekick.</h2>
                <p>
                  Choose a robot companion. They&apos;ll follow you around the
                  room.
                </p>
                <PetChoices selected={pet} onSelect={setPet} />
                <button
                  disabled={!isReady}
                  className={styles.primaryButton}
                  onClick={() => setTutorial(1)}
                >
                  Meet {selectedPet.name} & enter <ArrowRight size={16} />
                </button>
              </>
            ) : tutorial === 1 ? (
              <>
                <span className={styles.tutorialIcon}>
                  <Footprints size={21} />
                </span>
                <h2>Make yourself at home.</h2>
                <p>
                  Use <b>W A S D</b> or the <b>arrow keys</b> to move. On touch
                  screens, use the direction pad. You can also click the floor.
                </p>
                <div className={styles.movementStatus}>
                  {hasMoved ? (
                    <>
                      <Check size={14} /> Looking good. You&apos;re on the move.
                    </>
                  ) : (
                    "Try taking a few steps."
                  )}
                </div>
                <button
                  className={styles.primaryButton}
                  onClick={() => setTutorial(2)}
                >
                  Next: explore the room <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <>
                <span className={styles.tutorialIcon}>
                  <Code2 size={21} />
                </span>
                <h2>There&apos;s a story at every station.</h2>
                <p>
                  Click a room label to walk there. When you&apos;re close,
                  press <b>E</b> or tap <b>Open</b> to explore. Your first stop?
                  The workstation.
                </p>
                <button
                  className={styles.primaryButton}
                  onClick={() => {
                    finishTutorial();
                    walkTo("projects");
                  }}
                >
                  Let&apos;s see the projects <ArrowRight size={16} />
                </button>
              </>
            )}
            <div className={styles.tutorialBottom}>
              <span>QUICK START</span>
              <span>{tutorial + 1} OF 3</span>
            </div>
          </aside>
        )}

        {tutorial === null && !isPetPicker && !isMenu && (
          <div className={styles.sidekick}>
            <PetPortrait id={pet} />
            <div>
              <span className={styles.eyebrow}>YOUR SIDEKICK</span>
              <strong>
                {selectedPet.name} <span>/ {selectedPet.species}</span>
              </strong>
              <button
                className={styles.textButton}
                onClick={() => setPetPicker(true)}
              >
                Change companion <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
        {isPetPicker && (
          <aside
            className={`${styles.tutorial} ${styles.petPanel}`}
            aria-label="Choose your companion"
          >
            <div className={styles.cardTop}>
              <span className={styles.eyebrow}>COMPANION BAY</span>
              <button
                aria-label="Close companion picker"
                className={styles.iconButton}
                onClick={() => setPetPicker(false)}
              >
                <X size={16} />
              </button>
            </div>
            <h2>A friend for the journey.</h2>
            <PetChoices selected={pet} onSelect={setPet} />
            <p>{selectedPet.note}</p>
            <button
              className={styles.primaryButton}
              onClick={() => setPetPicker(false)}
            >
              Explore with {selectedPet.name} <Check size={16} />
            </button>
          </aside>
        )}
        {near &&
          !active &&
          tutorial !== 0 &&
          !isPetPicker &&
          !isMenu &&
          !hasError && (
            <button
              className={styles.interact}
              onClick={() => openStation(near)}
            >
              <kbd>E</kbd>
              <span>Open {stations.find((s) => s.id === near)?.name}</span>
              <ArrowUpRight size={15} />
            </button>
          )}
        {destination && !near && tutorial === null && (
          <div className={styles.walking} role="status">
            <Footprints size={15} /> Walking to{" "}
            {stations.find((s) => s.id === destination)?.name}…
          </div>
        )}
        <div
          className={styles.touchControls}
          aria-label="Touch movement controls"
        >
          {[
            ["w", ArrowUp, "Move up"],
            ["a", ArrowLeft, "Move left"],
            ["s", ArrowDown, "Move down"],
            ["d", ArrowRight, "Move right"],
          ].map(([key, Icon, label]) => {
            const DirectionIcon = Icon as typeof ArrowUp;
            return (
              <button
                key={key as string}
                aria-label={label as string}
                className={styles[`direction${key}`]}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.currentTarget.setPointerCapture(event.pointerId);
                  controller.current?.setDirection(key as string, true);
                }}
                onPointerUp={() =>
                  controller.current?.setDirection(key as string, false)
                }
                onPointerCancel={() =>
                  controller.current?.setDirection(key as string, false)
                }
                onLostPointerCapture={() =>
                  controller.current?.setDirection(key as string, false)
                }
              >
                <DirectionIcon size={20} />
              </button>
            );
          })}
        </div>
        {isMenu && (
          <aside className={styles.menu} aria-label="Portfolio menu">
            <div className={styles.cardTop}>
              <span className={styles.eyebrow}>TAKE A LOOK AROUND</span>
              <button
                className={styles.iconButton}
                aria-label="Close portfolio menu"
                onClick={() => setMenu(false)}
              >
                <X size={17} />
              </button>
            </div>
            <h2>The room directory.</h2>
            <p>Jump straight into what interests you.</p>
            {stations.map((s, i) => {
              const Icon = icons[i];
              return (
                <button
                  className={styles.menuItem}
                  key={s.id}
                  onClick={() => openStation(s.id)}
                >
                  <Icon size={19} />
                  <span>
                    {s.name}
                    <small>{s.object}</small>
                  </span>
                  {visited.includes(s.id) ? (
                    <Check size={15} />
                  ) : (
                    <ArrowUpRight size={16} />
                  )}
                </button>
              );
            })}
            <Link className={styles.classicLink} href="/projects">
              Prefer a regular website? Browse the classic portfolio{" "}
              <ArrowUpRight size={14} />
            </Link>
          </aside>
        )}
      </section>

      <footer className={styles.footer}>
        <div className={styles.controlHints}>
          <span>
            <kbd>W</kbd>
            <kbd>A</kbd>
            <kbd>S</kbd>
            <kbd>D</kbd> Move
          </span>
          <i />
          <span>
            <kbd>E</kbd> Interact
          </span>
          <i />
          <span className={styles.clickHint}>Click the floor to walk</span>
        </div>
        <button className={styles.help} onClick={restart}>
          <CircleHelp size={15} /> How to explore <RotateCcw size={12} />
        </button>
        <span className={styles.footerNote}>
          Built with curiosity. And a little caffeine.
        </span>
      </footer>

      <dialog
        ref={dialog}
        className={styles.dialog}
        onCancel={closeStation}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeStation();
        }}
        aria-labelledby="station-title"
      >
        {activeStation && (
          <div className={styles.dialogContent}>
            <div className={styles.dialogHeader}>
              <div>
                <p className={styles.eyebrow}>{activeStation.object}</p>
                <h2 id="station-title">{activeStation.name}</h2>
              </div>
              <button
                autoFocus
                className={styles.closeButton}
                aria-label="Close station"
                onClick={closeStation}
              >
                <X size={21} />
                <span>ESC</span>
              </button>
            </div>
            <StationContent id={activeStation.id} />
            {activeStation.href !== "/" && (
              <Link className={styles.classicLink} href={activeStation.href}>
                Open full {activeStation.name.toLowerCase()} page{" "}
                <ArrowUpRight size={16} />
              </Link>
            )}
            <div className={styles.dialogFooter}>
              <PawPrint size={14} /> {selectedPet.name} is waiting for you in
              the room.
              <button className={styles.textButton} onClick={closeStation}>
                Back to exploring <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

function PetChoices({
  selected,
  onSelect,
}: {
  selected: PetId;
  onSelect: (id: PetId) => void;
}) {
  return (
    <div className={styles.petChoices}>
      {pets.map((p) => (
        <button
          key={p.id}
          aria-pressed={selected === p.id}
          className={selected === p.id ? styles.selectedPet : ""}
          onClick={() => onSelect(p.id)}
        >
          <PetPortrait id={p.id} />
          <strong>{p.name}</strong>
          <small>{p.species}</small>
          {selected === p.id && (
            <span className={styles.petCheck}>
              <Check size={10} />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function PetPortrait({ id }: { id: PetId }) {
  const color = pets.find((p) => p.id === id)!.color;
  return (
    <svg viewBox="0 0 100 84" className={styles.petPortrait} aria-hidden="true">
      <ellipse cx="50" cy="74" rx="28" ry="5" fill={color} opacity=".1" />
      {id === "cat" ? (
        <>
          <path
            d="M25 31 26 9 43 24M58 24 74 9 76 33"
            fill="#a9c1d2"
            stroke="#d7e8ef"
            strokeWidth="2"
          />
          <path d="m30 24 1-7 7 9m26 0 7-9 1 8" fill={color} />
        </>
      ) : id === "dog" ? (
        <>
          <path
            d="M25 26Q9 24 14 53L25 57 32 29M73 26Q90 23 86 53L74 57 67 28"
            fill="#71849d"
            stroke="#a4b9cb"
            strokeWidth="2"
          />
        </>
      ) : (
        <>
          <circle cx="28" cy="27" r="9" fill="#a2b9d0" />
          <circle cx="73" cy="27" r="9" fill="#a2b9d0" />
          <circle cx="28" cy="27" r="4" fill={color} />
          <circle cx="73" cy="27" r="4" fill={color} />
        </>
      )}
      <rect x="33" y="53" width="34" height="18" rx="8" fill="#7489a3" />
      <rect x="31" y="65" width="12" height="8" rx="3" fill="#b9cddc" />
      <rect x="58" y="65" width="12" height="8" rx="3" fill="#b9cddc" />
      <rect
        x="23"
        y="23"
        width="54"
        height="38"
        rx={id === "otter" ? 18 : 12}
        fill="#bacee0"
      />
      <path
        d="M34 25h31"
        stroke="#e8f5fb"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="29" y="33" width="42" height="20" rx="8" fill="#122438" />
      <path
        d="M36 42h7m14 0h7"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {id === "otter" && (
        <ellipse cx="50" cy="53" rx="9" ry="5" fill="#d9e6ee" />
      )}
      <path d="M47 50h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <rect x="44" y="61" width="12" height="3" rx="1.5" fill={color} />
    </svg>
  );
}

function StationContent({ id }: { id: string }) {
  if (id === "about")
    return (
      <>
        <div className={styles.aboutProfile}>
          <Image
            src="/profile.png"
            alt="Angelo Santiago"
            width={100}
            height={100}
          />
          <div>
            <h3>{personalInfo.name}</h3>
            <p>{homeText.title}</p>
            <span>
              <MapPin size={13} /> {personalInfo.location}
            </span>
          </div>
        </div>
        <p className={styles.bodyCopy}>{homeText.description}</p>
        <h3 className={styles.sectionTitle}>What I build</h3>
        <div className={styles.expertise}>
          {homeText.others.map((item) => (
            <article key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <a
          className={styles.primaryButton}
          href="/Resume%20UPDATED.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View resume <Download size={16} />
        </a>
      </>
    );
  if (id === "skills")
    return (
      <>
        <p className={styles.bodyCopy}>
          The tools behind the room. My stack spans full-stack development, AI
          systems, automation, and CRM integrations.
        </p>
        <div className={styles.skillGrid}>
          {skillList.map((skill) => (
            <a
              key={skill.name}
              href={skill.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={skill.icon} alt="" width={26} height={26} />
              <span>{skill.name}</span>
              <ArrowUpRight size={12} />
            </a>
          ))}
        </div>
      </>
    );
  if (id === "projects")
    return (
      <>
        <p className={styles.bodyCopy}>
          A selection of the products, tools, and experiments I&apos;ve built.
        </p>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article key={project.name}>
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                width={560}
                height={310}
              />
              <div>
                <span className={styles.projectStatus}>
                  {project.status === "live"
                    ? "LIVE"
                    : project.status === "upcoming"
                      ? "IN PROGRESS"
                      : "ARCHIVED"}
                </span>
                <h3>{project.name}</h3>
                <p className={styles.projectSubtitle}>{project.nameDesc}</p>
                <details>
                  <summary>About this project</summary>
                  <p>{project.desc}</p>
                </details>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit project <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </>
    );
  if (id === "experience")
    return (
      <>
        <p className={styles.bodyCopy}>
          Building web applications, automation systems, and AI tools for real
          business needs.
        </p>
        <article className={styles.experienceCard}>
          <span className={styles.eyebrow}>2022 → 2026</span>
          <h3>Full Stack Developer</h3>
          <h4>Expert Solution Outsourcing</h4>
          <ul>
            <li>
              Developed web applications with React, Next.js, Node.js, and
              TypeScript.
            </li>
            <li>
              Built agent workflows and RAG applications for automation and
              internal tools.
            </li>
            <li>
              Connected business systems using Zapier, n8n, and Google Cloud
              Functions.
            </li>
            <li>
              Designed data pipelines and cloud architecture for performance and
              reliability.
            </li>
          </ul>
        </article>
        <a
          className={styles.primaryButton}
          href="/Resume%20UPDATED.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View resume <Download size={16} />
        </a>
      </>
    );
  return (
    <>
      <div className={styles.contactHero}>
        <Mail size={36} />
        <h3>Have something in mind?</h3>
        <p>
          A product, an integration, or a good technical challenge. I&apos;d
          love to hear about it.
        </p>
        <a href={`mailto:${personalInfo.email}`} className={styles.emailLink}>
          {personalInfo.email} <ArrowUpRight size={18} />
        </a>
        <span>
          <MapPin size={14} /> {personalInfo.location}
        </span>
      </div>
      <Link className={styles.primaryButton} href="/contact">
        Open contact form <ArrowRight size={16} />
      </Link>
    </>
  );
}
