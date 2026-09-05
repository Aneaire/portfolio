"use client";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Eye,
  GripVertical,
  Heart,
  Image as ImageIcon,
  Instagram,
  LayoutGrid,
  Mail,
  MapPin,
  MoreHorizontal,
  PencilLine,
  Play,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import styles from "./client-demo.module.css";

interface MediaItem {
  id: number;
  url: string;
  caption: string;
  kind: "photo" | "video";
  position?: string;
}

interface ArchivePost {
  id: number;
  day: string;
  month: string;
  year: string;
  title: string;
  note: string;
  place: string;
  tags: string[];
  likes: number;
  accent: string;
  media: MediaItem[];
}

const posts: ArchivePost[] = [
  {
    id: 1,
    day: "18",
    month: "AUG",
    year: "2026",
    title: "The long way home",
    note: "A slow afternoon in the city. Coffee after the rain, an accidental bookstore, and the train just before dusk.",
    place: "Quezon City",
    tags: ["daily", "city"],
    likes: 128,
    accent: "#f4c95d",
    media: [
      {
        id: 11,
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=88",
        caption: "3:42 PM. Stayed for another cup.",
        kind: "photo",
      },
      {
        id: 12,
        url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=88",
        caption: "The city looked softer after the rain.",
        kind: "photo",
      },
      {
        id: 13,
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=88",
        caption: "A shop I had never noticed before.",
        kind: "photo",
      },
    ],
  },
  {
    id: 2,
    day: "09",
    month: "AUG",
    year: "2026",
    title: "Salt in everything",
    note: "No itinerary. We followed the coast until the road narrowed and stayed for the last light.",
    place: "La Union",
    tags: ["weekend", "sea"],
    likes: 204,
    accent: "#91a8d0",
    media: [
      {
        id: 21,
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=88",
        caption: "The first quiet morning in weeks.",
        kind: "photo",
      },
      {
        id: 22,
        url: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=88",
        caption: "Five minutes before sunset.",
        kind: "video",
      },
    ],
  },
  {
    id: 3,
    day: "27",
    month: "JUL",
    year: "2026",
    title: "Sunday, unplanned",
    note: "Lunch became a walk, the walk became dinner, and nobody checked the time.",
    place: "Makati",
    tags: ["friends", "food"],
    likes: 96,
    accent: "#f28c7b",
    media: [
      {
        id: 31,
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=88",
        caption: "The table we kept adding chairs to.",
        kind: "photo",
      },
      {
        id: 32,
        url: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=88",
        caption: "Ordered one of everything.",
        kind: "photo",
      },
    ],
  },
  {
    id: 4,
    day: "12",
    month: "JUL",
    year: "2026",
    title: "North window light",
    note: "Cleaning the apartment, moving every plant twice, and leaving the records on all afternoon.",
    place: "At home",
    tags: ["home", "slow day"],
    likes: 173,
    accent: "#b7c9a8",
    media: [
      {
        id: 41,
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=88",
        caption: "Everything leaned toward the window.",
        kind: "photo",
      },
    ],
  },
];

const fade = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function ClientDemoPage() {
  const [mode, setMode] = useState<"archive" | "studio">("archive");
  const [currentPost, setCurrentPost] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [studioView, setStudioView] = useState<"dashboard" | "editor">(
    "dashboard",
  );
  const [isPublished, setIsPublished] = useState(false);

  const post = posts[currentPost];
  const media = post.media[currentMedia] ?? post.media[0];

  const visiblePosts = useMemo(
    () => [post, posts[(currentPost + 1) % posts.length]],
    [currentPost, post],
  );

  const movePost = (direction: number) => {
    setCurrentPost(
      (previous) => (previous + direction + posts.length) % posts.length,
    );
    setCurrentMedia(0);
    setHasLiked(false);
  };

  return (
    <div className={styles.demoShell}>
      <AnimatePresence mode="wait">
        {mode === "archive" ? (
          <motion.div
            key="archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.archiveApp}
          >
            <header className={styles.archiveHeader}>
              <button
                className={styles.wordmark}
                onClick={() => {
                  setCurrentPost(0);
                  setCurrentMedia(0);
                }}
              >
                <span>mara,</span>
                <span>lately</span>
              </button>

              <nav className={styles.archiveNav} aria-label="Archive navigation">
                <button className={styles.activeNav}>Latest</button>
                <button onClick={() => setIsGridOpen(true)}>Archive</button>
                <button onClick={() => setIsAboutOpen(true)}>About</button>
              </nav>

              <div className={styles.headerActions}>
                <button
                  aria-label="Search archive"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search size={17} />
                </button>
                <button
                  className={styles.studioLink}
                  onClick={() => setMode("studio")}
                >
                  Open studio
                  <ArrowRight size={15} />
                </button>
              </div>
            </header>

            <main className={styles.archiveMain}>
              <div className={styles.archiveIntro}>
                <span>Visual notes on places, people and ordinary days.</span>
                <span>{posts.length} entries · 2026</span>
              </div>

              <div className={styles.filmViewport}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.section
                    key={post.id}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -80 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={styles.entryCard}
                  >
                    <div className={styles.entryDate}>
                      <span className={styles.dateNumber}>{post.day}</span>
                      <span>{post.month}</span>
                      <span>{post.year}</span>
                    </div>

                    <div className={styles.mediaStage}>
                      <motion.div
                        key={media.id}
                        initial={{ opacity: 0.25, scale: 1.015 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.38 }}
                        className={styles.heroMedia}
                        style={{
                          backgroundImage: `url(${media.url})`,
                          backgroundPosition: media.position ?? "center",
                        }}
                        role="img"
                        aria-label={media.caption}
                      >
                        {media.kind === "video" && (
                          <span className={styles.playButton}>
                            <Play size={18} fill="currentColor" />
                          </span>
                        )}
                        <span className={styles.mediaCount}>
                          {String(currentMedia + 1).padStart(2, "0")} / {" "}
                          {String(post.media.length).padStart(2, "0")}
                        </span>
                      </motion.div>

                      {post.media.length > 1 && (
                        <div className={styles.mediaRail}>
                          {post.media.map((item, index) => (
                            <button
                              key={item.id}
                              className={
                                index === currentMedia
                                  ? styles.activeThumb
                                  : styles.mediaThumb
                              }
                              style={{ backgroundImage: `url(${item.url})` }}
                              onClick={() => setCurrentMedia(index)}
                              aria-label={`View media ${index + 1}`}
                            >
                              {item.kind === "video" && <Play size={10} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={styles.entryCopy}>
                      <div>
                        <div className={styles.entryMeta}>
                          <span>{post.place}</span>
                          <span className={styles.metaLine} />
                          <span>{post.tags.join(" · ")}</span>
                        </div>
                        <h1>{post.title}</h1>
                        <p className={styles.entryNote}>{post.note}</p>
                      </div>

                      <div className={styles.captionBlock}>
                        <span>Frame {String(currentMedia + 1).padStart(2, "0")}</span>
                        <p>{media.caption}</p>
                      </div>

                      <div className={styles.entryFooter}>
                        <button
                          className={hasLiked ? styles.likedButton : styles.likeButton}
                          onClick={() => setHasLiked((value) => !value)}
                        >
                          <Heart size={17} fill={hasLiked ? "currentColor" : "none"} />
                          {post.likes + (hasLiked ? 1 : 0)}
                        </button>
                        <span>Entry {String(currentPost + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                  </motion.section>
                </AnimatePresence>

                <button
                  className={styles.nextPeek}
                  onClick={() => movePost(1)}
                  style={{ backgroundColor: visiblePosts[1].accent }}
                >
                  <span className={styles.peekDate}>
                    {visiblePosts[1].day} {visiblePosts[1].month}
                  </span>
                  <span className={styles.peekImage}>
                    <span
                      style={{
                        backgroundImage: `url(${visiblePosts[1].media[0].url})`,
                      }}
                    />
                  </span>
                  <span className={styles.peekTitle}>
                    {visiblePosts[1].title}
                    <ArrowRight size={18} />
                  </span>
                </button>
              </div>

              <div className={styles.archiveControls}>
                <div>
                  <button onClick={() => movePost(-1)} aria-label="Previous entry">
                    <ArrowLeft size={18} />
                  </button>
                  <button onClick={() => movePost(1)} aria-label="Next entry">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <button onClick={() => setIsGridOpen(true)}>
                  <LayoutGrid size={16} />
                  View all entries
                </button>
              </div>
            </main>

            <AnimatePresence>
              {isGridOpen && (
                <ArchiveGrid
                  onClose={() => setIsGridOpen(false)}
                  onSelect={(index) => {
                    setCurrentPost(index);
                    setCurrentMedia(0);
                    setIsGridOpen(false);
                  }}
                />
              )}
              {isSearchOpen && (
                <SearchPanel
                  onClose={() => setIsSearchOpen(false)}
                  onSelect={(index) => {
                    setCurrentPost(index);
                    setCurrentMedia(0);
                    setIsSearchOpen(false);
                  }}
                />
              )}
              {isAboutOpen && (
                <AboutPanel onClose={() => setIsAboutOpen(false)} />
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <Studio
            key="studio"
            view={studioView}
            isPublished={isPublished}
            onViewChange={setStudioView}
            onPublish={() => setIsPublished(true)}
            onExit={() => setMode("archive")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className={styles.aboutOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className={styles.aboutPanel}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-label="About Mara"
      >
        <header className={styles.aboutHeader}>
          <button className={styles.wordmark} onClick={onClose}>
            <span>mara,</span>
            <span>lately</span>
          </button>
          <span>About this archive</span>
          <button onClick={onClose} aria-label="Close about page">
            <X size={20} />
          </button>
        </header>

        <div className={styles.aboutBody}>
          <div className={styles.aboutPortraitColumn}>
            <div
              className={styles.aboutPortrait}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=88)",
              }}
              role="img"
              aria-label="Portrait of Mara"
            >
              <span>Somewhere between plans.</span>
            </div>
            <div className={styles.portraitNote}>
              <span>Current chapter</span>
              <strong>Manila, 2026</strong>
              <MapPin size={15} />
            </div>
          </div>

          <div className={styles.aboutCopy}>
            <p className={styles.aboutKicker}>A small introduction</p>
            <h2>I keep the moments that usually disappear first.</h2>
            <div className={styles.aboutText}>
              <p>
                I&apos;m Mara. This is my visual record of ordinary days,
                unfamiliar streets, long meals and the people who make a place
                feel like home.
              </p>
              <p>
                I started this archive because camera rolls get crowded and
                captions get shortened. Here, every frame can keep its own note
                and every day has room to unfold at its own pace.
              </p>
            </div>

            <dl className={styles.aboutDetails}>
              <div>
                <dt>Based in</dt>
                <dd>Metro Manila, Philippines</dd>
              </div>
              <div>
                <dt>Archive started</dt>
                <dd>January 2026</dd>
              </div>
              <div>
                <dt>Usually collecting</dt>
                <dd>Food, streets, rooms and sea air</dd>
              </div>
            </dl>

            <div className={styles.aboutLinks}>
              <a href="#" onClick={(event) => event.preventDefault()}>
                <Instagram size={16} />Instagram
                <ArrowRight size={14} />
              </a>
              <a href="mailto:hello@example.com">
                <Mail size={16} />Say hello
                <ArrowRight size={14} />
              </a>
            </div>

            <p className={styles.aboutFootnote}>
              This archive is personal. Please ask before using or sharing any
              photographs.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

function ArchiveGrid({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.gridPanel}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.panelHeader}>
          <div>
            <span>Browse by memory</span>
            <h2>The archive</h2>
          </div>
          <button onClick={onClose} aria-label="Close archive">
            <X size={21} />
          </button>
        </div>
        <div className={styles.filterRow}>
          <button>2026 <ChevronDown size={14} /></button>
          <button>All places <ChevronDown size={14} /></button>
          <button>All tags <ChevronDown size={14} /></button>
          <span>{posts.length} entries</span>
        </div>
        <div className={styles.archiveGrid}>
          {posts.map((item, index) => (
            <button key={item.id} onClick={() => onSelect(index)}>
              <span
                className={styles.gridImage}
                style={{ backgroundImage: `url(${item.media[0].url})` }}
              >
                <span>{item.media.length} frames</span>
              </span>
              <span className={styles.gridInfo}>
                <span>{item.day} {item.month} {item.year}</span>
                <strong>{item.title}</strong>
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function SearchPanel({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (index: number) => void;
}) {
  const [query, setQuery] = useState("");
  const matches = posts.filter((post) =>
    `${post.title} ${post.place} ${post.tags.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <motion.div
      className={styles.searchOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.searchBox}>
        <Search size={23} />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a date, place or feeling..."
        />
        <button onClick={onClose}><X size={20} /></button>
      </div>
      <div className={styles.searchResults}>
        {matches.map((item) => {
          const index = posts.findIndex((post) => post.id === item.id);
          return (
            <button key={item.id} onClick={() => onSelect(index)}>
              <span
                style={{ backgroundImage: `url(${item.media[0].url})` }}
              />
              <div>
                <small>{item.day} {item.month} · {item.place}</small>
                <strong>{item.title}</strong>
              </div>
              <ArrowRight size={17} />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

function Studio({
  view,
  isPublished,
  onViewChange,
  onPublish,
  onExit,
}: {
  view: "dashboard" | "editor";
  isPublished: boolean;
  onViewChange: (view: "dashboard" | "editor") => void;
  onPublish: () => void;
  onExit: () => void;
}) {
  return (
    <motion.div
      className={styles.studioApp}
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <aside className={styles.studioSidebar}>
        <button className={styles.studioBrand} onClick={onExit}>
          <span>m,</span>
          <div><strong>Mara Studio</strong><small>Personal archive</small></div>
        </button>
        <nav>
          <button
            className={view === "dashboard" ? styles.sidebarActive : ""}
            onClick={() => onViewChange("dashboard")}
          >
            <LayoutGrid size={17} />Overview
          </button>
          <button
            className={view === "editor" ? styles.sidebarActive : ""}
            onClick={() => onViewChange("editor")}
          >
            <PencilLine size={17} />Posts
            <span>12</span>
          </button>
          <button><ImageIcon size={17} />Media library</button>
          <button><BarChart3 size={17} />Insights</button>
        </nav>
        <nav className={styles.bottomNav}>
          <button><Settings size={17} />Settings</button>
          <button onClick={onExit}><ArrowLeft size={17} />View website</button>
        </nav>
      </aside>

      <main className={styles.studioMain}>
        {view === "dashboard" ? (
          <Dashboard onCreate={() => onViewChange("editor")} />
        ) : (
          <Editor
            isPublished={isPublished}
            onBack={() => onViewChange("dashboard")}
            onPublish={onPublish}
            onPreview={onExit}
          />
        )}
      </main>
    </motion.div>
  );
}

function Dashboard({ onCreate }: { onCreate: () => void }) {
  const stats = [
    { label: "Views this month", value: "2,418", change: "+18%" },
    { label: "Returning visitors", value: "42%", change: "+6%" },
    { label: "Post likes", value: "684", change: "+24%" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={fade}>
      <div className={styles.studioTopbar}>
        <div><small>Friday, 21 August</small><h1>Good morning, Mara.</h1></div>
        <button className={styles.primaryButton} onClick={onCreate}>
          <Plus size={17} />New post
        </button>
      </div>

      <div className={styles.insightGrid}>
        {stats.map((stat) => (
          <article key={stat.label}>
            <div><span>{stat.label}</span><MoreHorizontal size={17} /></div>
            <strong>{stat.value}</strong>
            <small>{stat.change} from last month</small>
          </article>
        ))}
        <article className={styles.readerCard}>
          <div><span>Readers this week</span><Eye size={17} /></div>
          <div className={styles.miniChart}>
            {[38, 55, 46, 68, 57, 84, 73].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <small>Most active on Sunday evenings</small>
        </article>
      </div>

      <section className={styles.recentSection}>
        <div className={styles.sectionHeading}>
          <div><h2>Recent posts</h2><span>Drafts and published entries</span></div>
          <button>View all <ArrowRight size={15} /></button>
        </div>
        <div className={styles.postTable}>
          {posts.slice(0, 3).map((post, index) => (
            <button key={post.id} onClick={onCreate}>
              <span
                className={styles.tableThumb}
                style={{ backgroundImage: `url(${post.media[0].url})` }}
              />
              <span className={styles.tableTitle}>
                <strong>{post.title}</strong><small>{post.media.length} media items · {post.place}</small>
              </span>
              <span className={styles.statusPublished}>Published</span>
              <span className={styles.tableDate}>{post.day} {post.month} 2026</span>
              <span className={styles.tableViews}>{[834, 612, 441][index]} views</span>
              <MoreHorizontal size={17} />
            </button>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function Editor({
  isPublished,
  onBack,
  onPublish,
  onPreview,
}: {
  isPublished: boolean;
  onBack: () => void;
  onPublish: () => void;
  onPreview: () => void;
}) {
  const [title, setTitle] = useState("A morning with nowhere to be");
  const [caption, setCaption] = useState("The light reached the kitchen before I did.");
  const [activeEditorMedia, setActiveEditorMedia] = useState(0);

  const editorMedia = [posts[3].media[0], posts[0].media[0], posts[1].media[0]];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.editor}
    >
      <div className={styles.editorTopbar}>
        <div className={styles.editorIdentity}>
          <button onClick={onBack}><ArrowLeft size={18} /></button>
          <div><small>Posts / New entry</small><strong>{title || "Untitled post"}</strong></div>
        </div>
        <div className={styles.editorActions}>
          <span className={styles.savedState}><Check size={13} />All changes saved</span>
          <button className={styles.previewButton} onClick={onPreview}><Eye size={16} />Preview</button>
          <button className={styles.publishButton} onClick={onPublish}>
            {isPublished ? <><Check size={16} />Published</> : <>Publish <ChevronDown size={14} /></>}
          </button>
        </div>
      </div>

      <div className={styles.editorCanvas}>
        <section className={styles.editorForm}>
          <div className={styles.formEyebrow}>Entry details</div>
          <label className={styles.titleField}>
            <span>Title</span>
            <textarea value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <div className={styles.formRow}>
            <label><span><CalendarDays size={14} />Date</span><input value="21 August 2026" readOnly /></label>
            <label><span>Location</span><input value="At home, Quezon City" readOnly /></label>
          </div>
          <label className={styles.noteField}>
            <span>Opening note</span>
            <textarea defaultValue="Coffee, open windows, and the rare pleasure of having no plan for the day." />
          </label>
          <div className={styles.tagRow}><span>slow day</span><span>home</span><button><Plus size={12} />Add tag</button></div>

          <div className={styles.mediaHeading}>
            <div><strong>Post media</strong><span>Drag to arrange the story</span></div>
            <button><Upload size={15} />Upload media</button>
          </div>

          <div className={styles.mediaOrganizer}>
            {editorMedia.map((item, index) => (
              <button
                key={item.id}
                className={index === activeEditorMedia ? styles.organizerActive : ""}
                onClick={() => {
                  setActiveEditorMedia(index);
                  setCaption(item.caption);
                }}
              >
                <GripVertical size={15} />
                <span style={{ backgroundImage: `url(${item.url})` }} />
                <div><strong>Frame {index + 1}</strong><small>{index === 0 ? "Portrait" : "Landscape"} · JPG</small></div>
                <MoreHorizontal size={16} />
              </button>
            ))}
            <button className={styles.addMediaButton}><Plus size={18} /><span>Add photo or video</span></button>
          </div>
        </section>

        <aside className={styles.mediaInspector}>
          <div className={styles.inspectorHeading}>
            <div><span>Frame {activeEditorMedia + 1}</span><strong>Media settings</strong></div>
            <button><SlidersHorizontal size={16} /></button>
          </div>
          <div
            className={styles.inspectorImage}
            style={{ backgroundImage: `url(${editorMedia[activeEditorMedia].url})` }}
          >
            <span><Sparkles size={13} />Cover frame</span>
          </div>
          <label className={styles.captionEditor}>
            <span>Caption</span>
            <textarea value={caption} onChange={(event) => setCaption(event.target.value)} />
            <small>{caption.length} / 240</small>
          </label>
          <div className={styles.displayOptions}>
            <span>Display</span>
            <div><button className={styles.displayActive}>Natural</button><button>Fill frame</button></div>
          </div>
          <div className={styles.accessibilityNote}>
            <Check size={15} />
            <div><strong>Ready to publish</strong><span>Image quality and captions look good.</span></div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {isPublished && (
          <motion.div
            className={styles.publishToast}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <span><Check size={16} /></span>
            <div><strong>Post published</strong><small>It is now live in your archive.</small></div>
            <button onClick={onPreview}>View post <ArrowRight size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
