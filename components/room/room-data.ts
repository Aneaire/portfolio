export interface Station {
  id: string;
  name: string;
  object: string;
  x: number;
  z: number;
  label: [number, number, number];
  href: string;
}

export const stations: Station[] = [
  {
    id: "about",
    name: "About me",
    object: "Living corner",
    x: -2.45,
    z: 2.45,
    label: [-4.1, 1.6, 2.6],
    href: "/",
  },
  {
    id: "skills",
    name: "Skills",
    object: "Server rack",
    x: -3.6,
    z: -1.8,
    label: [-4.5, 3.15, -3.2],
    href: "/skills",
  },
  {
    id: "projects",
    name: "Projects",
    object: "Workstation",
    x: 0.85,
    z: -2.2,
    label: [0, 2.9, -3.8],
    href: "/projects",
  },
  {
    id: "experience",
    name: "Experience",
    object: "Mission archive",
    x: 3.45,
    z: -1.6,
    label: [4.1, 2.6, -3.4],
    href: "/experience",
  },
  {
    id: "contact",
    name: "Contact",
    object: "Comms terminal",
    x: 3.5,
    z: 2.5,
    label: [4.6, 1.85, 2.8],
    href: "/contact",
  },
];

export const pets = [
  {
    id: "cat",
    name: "Byte",
    species: "Robot cat",
    note: "Curious. Quiet. Always nearby.",
    color: "#77e8e0",
  },
  {
    id: "dog",
    name: "Bolt",
    species: "Robot dog",
    note: "Your loyal co-pilot.",
    color: "#f4bc79",
  },
  {
    id: "otter",
    name: "Pip",
    species: "Robot otter",
    note: "Small paws. Big explorer.",
    color: "#b7a1fb",
  },
] as const;
export type PetId = (typeof pets)[number]["id"];
