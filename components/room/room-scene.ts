import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { stations, type PetId } from "./room-data";

interface SceneOptions {
  onNear: (id: string | null) => void;
  onMove: () => void;
  onLabels: (positions: { x: number; y: number }[]) => void;
  onError: () => void;
  onNpcPosition: (position: { x: number; y: number }) => void;
}

// A fixed camera keeps movement and station positions predictable on every screen.
export function createRoom(host: HTMLDivElement, options: SceneOptions) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute(
    "aria-label",
    "Interactive 3D developer room. Use WASD or arrow keys to move, and E to interact.",
  );
  renderer.domElement.setAttribute("role", "img");
  const camera = new THREE.OrthographicCamera(-10, 10, 8, -8, 0.1, 100);
  camera.position.set(13, 14, 18);
  camera.lookAt(0, 1.3, 0);
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];
  const metal = material("#293c55");
  const dark = material("#111d31");
  const shell = material("#b7ced7");
  const cyan = material("#62e9e0", 1.6);
  const amber = material("#ffc286", 1.5);
  const purple = material("#a893ec", 1.2);
  const navy = material("#3b516b");
  function material(color: string, glow = 0) {
    const result = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.65,
      metalness: 0.25,
      emissive: color,
      emissiveIntensity: glow,
    });
    materials.push(result);
    return result;
  }
  function box(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    mat: THREE.Material,
    round = 0.03,
  ) {
    const mesh = new THREE.Mesh(
      round
        ? new RoundedBoxGeometry(
            w,
            h,
            d,
            2,
            Math.min(round, w / 3, h / 3, d / 3),
          )
        : new THREE.BoxGeometry(w, h, d),
      mat,
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function cylinder(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    radius: number,
    height: number,
    mat: THREE.Material,
    top = radius,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(top, radius, height, 24),
      mat,
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function sphere(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    radius: number,
    mat: THREE.Material,
  ) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 12), mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function screen(
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    title: string,
    kind = "code",
  ) {
    box(parent, x, y, z, w + 0.12, h + 0.12, 0.12, dark);
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 448;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#091a2a";
    ctx.fillRect(0, 0, 768, 448);
    ctx.fillStyle = "#163447";
    ctx.fillRect(0, 0, 768, 55);
    ["#ffb786", "#82d6d8", "#bba5f0"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(25 + i * 25, 26, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#b9dbdd";
    ctx.font = "20px monospace";
    ctx.fillText(title, 124, 34);
    if (kind === "code") {
      const lines = [
        "const developer = {",
        '  name: "Angelo Santiago",',
        '  builds: ["web", "AI", "ideas"],',
        "  curiosity: Infinity,",
        "  coffee: true",
        "};",
        "",
        "> making things that work_",
      ];
      lines.forEach((line, i) => {
        ctx.fillStyle =
          i % 3 === 0 ? "#79e7df" : i % 3 === 1 ? "#d6b5ff" : "#b5cad5";
        ctx.font = "24px monospace";
        ctx.fillText(line, 35, 105 + i * 40);
      });
    } else if (kind === "projects") {
      ctx.fillStyle = "#74e9e0";
      ctx.font = "bold 58px monospace";
      ctx.fillText("HiGantic", 42, 145);
      ctx.fillStyle = "#d2e3ea";
      ctx.font = "23px monospace";
      ctx.fillText("Ideas. Agents. Things that work.", 42, 190);
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = ["#21485a", "#353857", "#435048"][i];
        ctx.fillRect(40 + i * 234, 235, 215, 145);
        ctx.fillStyle = "#a6c8d0";
        ctx.fillRect(60 + i * 234, 263, 100, 8);
        ctx.fillRect(60 + i * 234, 290, 165, 5);
      }
    } else {
      ctx.fillStyle = "#f2c58e";
      ctx.font = "bold 64px monospace";
      ctx.fillText("2022 — 2026", 38, 160);
      ctx.fillStyle = "#d4e4eb";
      ctx.font = "28px monospace";
      ctx.fillText("BUILD / LEARN / REPEAT", 38, 230);
      ctx.fillStyle = "#80d9d7";
      ctx.font = "22px monospace";
      ctx.fillText("Full Stack Developer", 38, 310);
      ctx.fillText("Expert Solution Outsourcing", 38, 352);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.push(texture);
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    materials.push(mat);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    plane.position.set(x, y, z + 0.067);
    parent.add(plane);
  }
  scene.add(new THREE.HemisphereLight("#d8e6ff", "#344763", 2.5));
  const key = new THREE.DirectionalLight("#c1deff", 3.5);
  key.position.set(2, 10, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9 });
  key.shadow.bias = -0.001;
  scene.add(key);
  const warm = new THREE.PointLight("#ffb275", 32, 9, 2);
  warm.position.set(-4, 3, 2);
  scene.add(warm);
  const blue = new THREE.PointLight("#42dfe2", 35, 9, 2);
  blue.position.set(0, 3, -3);
  scene.add(blue);
  // Open-front apartment shell, raised foundation, and inset floor panels.
  box(scene, 0, -0.35, 0, 11.8, 0.6, 10.3, dark, 0.15);
  box(scene, 0, -0.08, 0, 11.5, 0.18, 10, navy);
  for (let x = -5; x <= 5; x++)
    for (let z = -4; z <= 4; z++)
      box(scene, x, 0.025, z, 0.975, 0.025, 0.975, metal, 0.01);
  box(scene, 0, -0.28, 5.16, 10.8, 0.045, 0.02, cyan);
  box(scene, 5.86, -0.28, 0, 0.02, 0.045, 9.6, cyan);
  box(scene, 0, 1.95, -4.96, 11.6, 3.9, 0.19, metal);
  box(scene, -5.7, 1.95, 0, 0.19, 3.9, 10, metal);
  box(scene, 0, 3.94, -4.96, 11.7, 0.12, 0.24, navy);
  box(scene, -5.7, 3.94, 0, 0.24, 0.12, 10, navy);
  box(scene, 0, 0.2, -4.82, 11.3, 0.045, 0.03, cyan);
  box(scene, -5.56, 0.2, 0, 0.03, 0.045, 9.8, cyan);
  for (const x of [-5.3, -2.9, 2.8, 5.25])
    box(scene, x, 1.9, -4.82, 0.045, 3.7, 0.07, navy);
  // A window over the desk, looking out onto a miniature midnight skyline.
  box(scene, 0, 2.7, -4.78, 5.1, 2, 0.12, dark);
  const windowMat = material("#142c4a", 0.3);
  box(scene, 0, 2.7, -4.69, 4.88, 1.79, 0.03, windowMat);
  for (let i = 0; i < 18; i++) {
    const height = 0.25 + ((i * 7) % 11) * 0.09;
    const x = -2.3 + i * 0.27;
    box(scene, x, 1.82 + height / 2, -4.64, 0.21, height, 0.035, navy, 0);
    for (let j = 0; j < Math.floor(height / 0.13); j++)
      box(
        scene,
        x,
        1.91 + j * 0.13,
        -4.61,
        0.035,
        0.04,
        0.015,
        i % 4 === 0 ? amber : cyan,
        0,
      );
  }
  for (const x of [-2.45, 0, 2.45])
    box(scene, x, 2.7, -4.55, 0.045, 1.8, 0.03, navy);
  box(scene, 0, 3.63, -4.56, 5, 0.035, 0.025, cyan);
  // Workstation: two displays, backlit keyboard, tower, coffee, and swivel chair.
  box(scene, -0.25, 1.04, -3.58, 4.5, 0.18, 1.48, shell);
  for (const x of [-2.18, 1.66])
    box(scene, x, 0.49, -3.62, 0.14, 0.98, 1.18, dark);
  screen(scene, -1.17, 1.83, -3.98, 1.92, 1.1, "angelo@home ~");
  screen(scene, 0.95, 1.83, -3.98, 1.83, 1.1, "selected work", "projects");
  for (const x of [-1.17, 0.95]) {
    box(scene, x, 1.26, -3.97, 0.09, 0.25, 0.1, navy);
    box(scene, x, 1.16, -3.87, 0.58, 0.035, 0.3, dark);
  }
  box(scene, -0.45, 1.155, -3.14, 1.3, 0.045, 0.43, dark);
  for (let x = 0; x < 12; x++)
    for (let z = 0; z < 4; z++)
      box(
        scene,
        -1.02 + x * 0.102,
        1.182,
        -3.3 + z * 0.094,
        0.065,
        0.012,
        0.05,
        x % 3 === 0 ? purple : cyan,
        0,
      );
  cylinder(scene, 1.49, 1.29, -3.12, 0.115, 0.26, amber);
  box(scene, 2.15, 0.57, -3.57, 0.54, 1.05, 1.02, dark);
  for (const y of [0.38, 0.75]) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.018, 8, 24),
      cyan,
    );
    ring.position.set(2.15, y, -3.047);
    scene.add(ring);
  }
  cylinder(scene, -0.4, 0.28, -2.17, 0.09, 0.5, shell);
  cylinder(scene, -0.4, 0.08, -2.17, 0.43, 0.06, dark);
  box(scene, -0.4, 0.58, -2.17, 0.85, 0.17, 0.75, navy, 0.1);
  box(scene, -0.4, 1.02, -1.87, 0.83, 0.82, 0.17, dark, 0.1);
  box(scene, -0.4, 1.14, -1.76, 0.12, 0.46, 0.03, cyan);
  // Server rack with luminous status bars.
  box(scene, -4.55, 1.23, -3.63, 1.36, 2.46, 1.15, dark, 0.07);
  for (let i = 0; i < 7; i++) {
    box(scene, -4.55, 0.3 + i * 0.31, -3.02, 1.16, 0.24, 0.07, navy);
    box(
      scene,
      -4.95,
      0.3 + i * 0.31,
      -2.97,
      0.055,
      0.055,
      0.02,
      i === 5 ? amber : cyan,
    );
    for (let j = 0; j < 5; j++)
      box(
        scene,
        -4.6 + j * 0.1,
        0.3 + i * 0.31,
        -2.97,
        0.025,
        0.11,
        0.02,
        dark,
        0,
      );
  }
  // Archive cabinet and wall display.
  box(scene, 4.12, 0.61, -3.83, 2.05, 1.22, 1.05, navy);
  for (const x of [3.65, 4.6]) {
    box(scene, x, 0.65, -3.27, 0.89, 1, 0.055, dark);
    box(scene, x, 0.96, -3.23, 0.32, 0.028, 0.02, amber);
  }
  screen(scene, 4.07, 2.19, -4.68, 2.07, 1.32, "mission archive", "archive");
  for (let i = 0; i < 5; i++)
    box(
      scene,
      3.43 + i * 0.17,
      1.45,
      -3.78,
      0.12,
      0.39 + (i % 2) * 0.09,
      0.38,
      i % 2 ? amber : shell,
    );
  const trophy = new THREE.Mesh(new THREE.IcosahedronGeometry(0.24, 0), purple);
  trophy.position.set(4.68, 1.67, -3.76);
  scene.add(trophy);
  cylinder(scene, 4.68, 1.33, -3.76, 0.19, 0.13, shell);
  // A lived-in corner: couch, pillow, rug, books, plant and warm floor lamp.
  box(scene, -4.75, 0.35, 1.63, 1.4, 0.6, 3.12, dark, 0.14);
  box(scene, -5.2, 0.91, 1.63, 0.37, 1.1, 3.12, navy, 0.13);
  for (const z of [0.22, 3.04])
    box(scene, -4.67, 0.7, z, 1.49, 0.67, 0.33, navy, 0.13);
  for (const z of [0.95, 2.18])
    box(scene, -4.58, 0.72, z, 1.08, 0.23, 1.13, material("#53637b"), 0.1);
  const pillow = box(
    scene,
    -4.89,
    1,
    2.43,
    0.33,
    0.58,
    0.61,
    material("#c6a182"),
    0.12,
  );
  pillow.rotation.z = -0.2;
  box(scene, -2.93, 0.055, 1.65, 2.02, 0.02, 3.25, material("#4c5364"));
  for (let i = 0; i < 10; i++)
    box(scene, -2.93, 0.071, 0.22 + i * 0.31, 1.82, 0.006, 0.015, shell, 0);
  cylinder(scene, -3.3, 0.54, 1.3, 0.65, 0.09, material("#95755d"));
  cylinder(scene, -3.3, 0.28, 1.3, 0.1, 0.5, dark);
  box(scene, -3.4, 0.62, 1.25, 0.39, 0.08, 0.49, shell);
  cylinder(scene, -3.06, 0.69, 1.48, 0.085, 0.17, amber);
  cylinder(scene, -4.75, 0.08, 3.91, 0.33, 0.1, dark);
  cylinder(scene, -4.75, 1.23, 3.91, 0.035, 2.4, shell);
  cylinder(scene, -4.75, 2.49, 3.91, 0.43, 0.4, amber, 0.28);
  const leafMat = material("#659f8a");
  cylinder(scene, -5.04, 0.26, -1.38, 0.32, 0.5, shell, 0.4);
  for (let i = 0; i < 7; i++) {
    const leaf = sphere(
      scene,
      -5.04 + Math.sin(i * 2) * 0.24,
      0.85 + (i % 3) * 0.16,
      -1.38 + Math.cos(i * 2) * 0.24,
      0.18,
      leafMat,
    );
    leaf.scale.set(0.65, 2.8, 0.6);
    leaf.rotation.z = Math.sin(i) * 0.5;
  }
  // Communication pedestal and a robot charging dock.
  cylinder(scene, 4.52, 0.49, 2.7, 0.53, 0.96, navy);
  cylinder(scene, 4.52, 0.97, 2.7, 0.57, 0.07, cyan);
  const comms = new THREE.Group();
  comms.position.set(4.52, 1.37, 2.7);
  comms.rotation.x = -0.25;
  scene.add(comms);
  box(comms, 0, 0, 0, 0.9, 0.6, 0.1, dark);
  box(comms, 0, 0, 0.06, 0.75, 0.43, 0.01, cyan);
  const mailMat = material("#123645");
  box(comms, 0, 0, 0.08, 0.41, 0.24, 0.02, mailMat);
  for (const sign of [-1, 1]) {
    const stroke = box(comms, sign * 0.09, 0.045, 0.1, 0.23, 0.02, 0.01, shell);
    stroke.rotation.z = sign * 0.55;
  }
  cylinder(scene, 1.85, 0.07, 3.65, 0.7, 0.09, dark);
  const dock = new THREE.Mesh(
    new THREE.TorusGeometry(0.59, 0.018, 8, 40),
    purple,
  );
  dock.rotation.x = Math.PI / 2;
  dock.position.set(1.85, 0.13, 3.65);
  scene.add(dock);
  // Floor landing markers communicate where each station is reached.
  stations.forEach((s) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.38, 0.42, 36),
      new THREE.MeshBasicMaterial({
        color: "#6fcacb",
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      }),
    );
    materials.push(ring.material);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(s.x, 0.075, s.z);
    scene.add(ring);
  });
  // Batch the apartment by material so hundreds of small details cost only a few draw calls.
  scene.updateMatrixWorld(true);
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const staticMeshes: THREE.Mesh[] = [];
  scene.traverse((object) => {
    if (
      !(object instanceof THREE.Mesh) ||
      object === trophy ||
      Array.isArray(object.material)
    )
      return;
    const geometry = object.geometry.index
      ? object.geometry.toNonIndexed()
      : object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    const group = batches.get(object.material) ?? [];
    group.push(geometry);
    batches.set(object.material, group);
    staticMeshes.push(object);
  });
  staticMeshes.forEach((mesh) => {
    mesh.removeFromParent();
    mesh.geometry.dispose();
  });
  batches.forEach((geometries, mat) => {
    const merged = mergeGeometries(geometries);
    if (merged) {
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = !(mat instanceof THREE.MeshBasicMaterial);
      mesh.receiveShadow = true;
      scene.add(mesh);
    }
    geometries.forEach((geometry) => geometry.dispose());
  });
  // Angelo is a stationary room host, distinct from the visitor's robot avatar.
  const angelo = new THREE.Group();
  angelo.position.set(4.7, 0, 0.5);
  angelo.rotation.y = 0.35;
  scene.add(angelo);
  const skin = material("#c69a80");
  const hair = material("#171b23");
  const shirt = material("#202734");
  const denim = material("#435b78");
  for (const x of [-0.18, 0.18]) {
    box(angelo, x, 0.36, 0, 0.26, 0.57, 0.3, denim, 0.06);
    box(angelo, x, 0.1, 0.1, 0.3, 0.18, 0.45, hair, 0.05);
    box(angelo, x, 0.045, 0.12, 0.31, 0.04, 0.46, shell, 0.015);
  }
  box(angelo, 0, 0.94, 0, 0.71, 0.64, 0.42, shirt, 0.12);
  box(angelo, 0.19, 1.07, 0.221, 0.13, 0.035, 0.012, cyan, 0.005);
  cylinder(angelo, 0, 1.32, 0, 0.12, 0.23, skin);
  const npcHead = new THREE.Group();
  npcHead.position.y = 1.6;
  angelo.add(npcHead);
  box(npcHead, 0, 0, 0, 0.59, 0.59, 0.49, skin, 0.17);
  for (const x of [-0.31, 0.31]) sphere(npcHead, x, -0.02, 0, 0.085, skin);
  box(npcHead, 0, 0.19, -0.085, 0.65, 0.36, 0.5, hair, 0.14);
  for (const side of [-1, 1]) {
    const fringe = box(
      npcHead,
      side * 0.16,
      0.18,
      0.19,
      0.28,
      0.3,
      0.16,
      hair,
      0.07,
    );
    fringe.rotation.z = side * 0.22;
    box(npcHead, side * 0.115, 0.015, 0.25, 0.065, 0.06, 0.025, hair, 0.018);
    const brow = box(
      npcHead,
      side * 0.115,
      0.095,
      0.249,
      0.115,
      0.025,
      0.025,
      hair,
      0.009,
    );
    brow.rotation.z = side * -0.09;
  }
  sphere(npcHead, 0, -0.055, 0.258, 0.045, skin);
  box(
    npcHead,
    0,
    -0.165,
    0.238,
    0.105,
    0.02,
    0.016,
    material("#855949"),
    0.006,
  );
  const npcArms: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.43, 1.14, 0);
    angelo.add(arm);
    box(arm, 0, -0.09, 0, 0.22, 0.29, 0.31, shirt, 0.06);
    box(arm, 0, -0.31, 0, 0.16, 0.3, 0.19, skin, 0.06);
    sphere(arm, 0, -0.48, 0.015, 0.11, skin);
    arm.rotation.z = side * 0.09;
    npcArms.push(arm);
  }
  const player = new THREE.Group();
  player.position.set(0.45, 0, 1.55);
  scene.add(player);
  const legs: THREE.Object3D[] = [];
  for (const x of [-0.17, 0.17]) {
    const leg = box(player, x, 0.26, 0, 0.23, 0.42, 0.25, navy, 0.07);
    legs.push(leg);
    box(player, x, 0.09, 0.08, 0.27, 0.15, 0.37, dark, 0.04);
  }
  box(player, 0, 0.71, 0, 0.61, 0.53, 0.38, shell, 0.12);
  box(player, 0, 0.76, 0.2, 0.28, 0.17, 0.035, navy);
  box(player, 0, 0.77, 0.225, 0.16, 0.035, 0.02, cyan);
  for (const x of [-0.41, 0.41]) {
    sphere(player, x, 0.86, 0, 0.13, navy);
    box(player, x, 0.65, 0.02, 0.18, 0.33, 0.22, shell, 0.06);
  }
  box(player, 0, 1.2, 0, 0.68, 0.58, 0.54, shell, 0.15);
  box(player, 0, 1.21, 0.265, 0.56, 0.29, 0.08, dark, 0.1);
  for (const x of [-0.13, 0.13])
    box(player, x, 1.22, 0.312, 0.095, 0.065, 0.017, cyan);
  cylinder(player, 0.24, 1.59, 0, 0.022, 0.24, shell);
  sphere(player, 0.24, 1.72, 0, 0.05, amber);
  box(player, 0, 0.72, -0.25, 0.42, 0.41, 0.2, navy, 0.07);
  const halo = new THREE.Mesh(
    new THREE.RingGeometry(0.44, 0.48, 40),
    new THREE.MeshBasicMaterial({ color: "#8ff5eb", side: THREE.DoubleSide }),
  );
  materials.push(halo.material);
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = 0.08;
  player.add(halo);
  const companions = new Map<PetId, THREE.Group>();
  for (const id of ["cat", "dog", "otter"] as PetId[]) {
    const pet = new THREE.Group();
    const accent = id === "cat" ? cyan : id === "dog" ? amber : purple;
    const isOtter = id === "otter";
    box(
      pet,
      0,
      0.36,
      0,
      isOtter ? 0.36 : 0.43,
      isOtter ? 0.36 : 0.32,
      isOtter ? 0.7 : 0.52,
      shell,
      0.11,
    );
    box(pet, 0, 0.58, 0.29, isOtter ? 0.43 : 0.5, 0.37, 0.37, shell, 0.11);
    box(pet, 0, 0.58, 0.49, 0.36, 0.19, 0.045, dark, 0.07);
    for (const x of [-0.09, 0.09])
      box(pet, x, 0.6, 0.518, 0.045, 0.05, 0.018, accent);
    for (const x of [-0.19, 0.19]) {
      if (id === "cat") {
        const ear = new THREE.Mesh(
          new THREE.ConeGeometry(0.12, 0.23, 3),
          shell,
        );
        ear.position.set(x, 0.86, 0.26);
        pet.add(ear);
      } else if (id === "dog")
        box(pet, x * 1.4, 0.63, 0.22, 0.13, 0.36, 0.23, navy, 0.07);
      else sphere(pet, x, 0.76, 0.28, 0.08, navy);
      for (const z of [-0.2, 0.23]) {
        sphere(pet, x, 0.22, z, 0.085, dark);
        box(pet, x, 0.13, z + 0.03, 0.13, 0.15, 0.2, navy, 0.04);
      }
    }
    if (isOtter) {
      const tail = box(pet, 0, 0.18, -0.55, 0.21, 0.13, 0.53, navy, 0.06);
      tail.rotation.x = -0.12;
      sphere(pet, 0, 0.49, 0.52, 0.055, shell);
    } else {
      const tail = box(
        pet,
        0,
        0.57,
        -0.33,
        0.08,
        id === "cat" ? 0.59 : 0.34,
        0.08,
        accent,
      );
      tail.rotation.x = -0.45;
    }
    box(pet, 0, 0.54, 0.02, 0.27, 0.025, 0.13, accent);
    pet.position.set(1.4, 0, 2);
    pet.visible = id === "cat";
    scene.add(pet);
    companions.set(id, pet);
  }
  let petId: PetId = "cat";
  let paused = false;
  let reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onMotion = () => {
    reducedMotion = motionQuery.matches;
  };
  motionQuery.addEventListener("change", onMotion);
  const keys = new Set<string>();
  let path: THREE.Vector3[] = [];
  let lastNear: string | null = null;
  let hasMoved = false;
  // Expanded furniture bounds leave room for the character body. Axis-separated movement slides along obstacles.
  const obstacles = [
    [4.18, 5.24, -0.03, 1.03],
    [-5.5, -3.78, -4.35, -2.75],
    [-2.55, 2.5, -4.5, -2.72],
    [-0.99, 0.2, -2.65, -1.39],
    [2.85, 5.4, -4.5, -2.95],
    [-5.5, -3.8, -0.15, 3.48],
    [-3.96, -2.64, 0.63, 1.97],
    [3.75, 5.28, 1.93, 3.48],
    [-5.45, -4.24, 3.45, 4.4],
  ];
  function canWalk(x: number, z: number) {
    return (
      x > -5.32 &&
      x < 5.32 &&
      z > -4.45 &&
      z < 4.55 &&
      !obstacles.some(
        ([x1, x2, z1, z2]) => x > x1 && x < x2 && z > z1 && z < z2,
      )
    );
  }
  function goTo(x: number, z: number) {
    if (!canWalk(x, z) || paused) return;
    const step = 0.25;
    const coord = (n: number) => Math.round(n / step);
    const key = (x: number, z: number) => `${x},${z}`;
    const start = [coord(player.position.x), coord(player.position.z)];
    const end = [coord(x), coord(z)];
    const queue = [start];
    const seen = new Map<string, number[] | null>([
      [key(...(start as [number, number])), null],
    ]);
    let found = false;
    for (let i = 0; i < queue.length && i < 4000; i++) {
      const current = queue[i];
      if (current[0] === end[0] && current[1] === end[1]) {
        found = true;
        break;
      }
      for (const [dx, dz] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const next = [current[0] + dx, current[1] + dz];
        const id = key(next[0], next[1]);
        if (!seen.has(id) && canWalk(next[0] * step, next[1] * step)) {
          seen.set(id, current);
          queue.push(next);
        }
      }
    }
    if (!found) return;
    const route: THREE.Vector3[] = [];
    let current: number[] | null = end;
    while (current && (current[0] !== start[0] || current[1] !== start[1])) {
      route.unshift(new THREE.Vector3(current[0] * step, 0, current[1] * step));
      current = seen.get(key(current[0], current[1])) ?? null;
    }
    path = route;
  }
  const raycaster = new THREE.Raycaster();
  const floor = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  function click(event: PointerEvent) {
    const rect = renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(
      new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      ),
      camera,
    );
    const point = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(floor, point)) goTo(point.x, point.z);
  }
  renderer.domElement.addEventListener("pointerdown", click);
  function keydown(event: KeyboardEvent) {
    if (
      paused ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      (event.target instanceof HTMLElement &&
        event.target.closest(
          "input, textarea, select, dialog, [contenteditable=true]",
        ))
    )
      return;
    const key = event.key.toLowerCase();
    if (
      [
        "w",
        "a",
        "s",
        "d",
        "arrowup",
        "arrowleft",
        "arrowdown",
        "arrowright",
      ].includes(key)
    ) {
      event.preventDefault();
      keys.add(key);
      path = [];
    }
  }
  const keyup = (event: KeyboardEvent) => keys.delete(event.key.toLowerCase());
  const clear = () => {
    keys.clear();
    path = [];
  };
  window.addEventListener("keydown", keydown);
  window.addEventListener("keyup", keyup);
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", clear);
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const aspect = width / height;
    const size = Math.max(6.4, 8.1 / aspect);
    camera.left = -size * aspect;
    camera.right = size * aspect;
    camera.top = size;
    camera.bottom = -size;
    camera.setViewOffset(
      width,
      height,
      0,
      width <= 700 && height > width ? height * 0.12 : 0,
      width,
      height,
    );
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    renderer.setSize(width, height);
    const npcAnchor = new THREE.Vector3(4.7, 2.15, 0.5).project(camera);
    options.onNpcPosition({
      x: ((npcAnchor.x + 1) / 2) * width,
      y: ((-npcAnchor.y + 1) / 2) * height,
    });
    options.onLabels(
      stations.map((s) => {
        const v = new THREE.Vector3(...s.label).project(camera);
        return { x: ((v.x + 1) / 2) * width, y: ((-v.y + 1) / 2) * height };
      }),
    );
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  const direction = new THREE.Vector3();
  let last = performance.now();
  let frame = 0;
  let time = 0;
  function animate(now: number) {
    frame = requestAnimationFrame(animate);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (document.hidden) return;
    time += dt;
    let moving = false;
    if (!paused) {
      const right =
        Number(keys.has("d") || keys.has("arrowright")) -
        Number(keys.has("a") || keys.has("arrowleft"));
      const forward =
        Number(keys.has("s") || keys.has("arrowdown")) -
        Number(keys.has("w") || keys.has("arrowup"));
      direction.set(
        right * 0.81 + forward * 0.585,
        0,
        -right * 0.585 + forward * 0.81,
      );
      if (direction.lengthSq()) direction.normalize();
      else if (path.length) {
        direction.copy(path[0]).sub(player.position);
        direction.y = 0;
        if (direction.length() < 0.11) path.shift();
        direction.normalize();
      }
      if (direction.lengthSq()) {
        const stride = Math.min(
          3 * dt,
          path.length ? player.position.distanceTo(path[0]) : 3 * dt,
        );
        const nx = player.position.x + direction.x * stride;
        const nz = player.position.z + direction.z * stride;
        const oldX = player.position.x;
        const oldZ = player.position.z;
        if (canWalk(nx, player.position.z)) player.position.x = nx;
        if (canWalk(player.position.x, nz)) player.position.z = nz;
        moving =
          Math.hypot(player.position.x - oldX, player.position.z - oldZ) >
          0.0001;
        player.rotation.y = Math.atan2(direction.x, direction.z);
        if (moving && !hasMoved) {
          hasMoved = true;
          options.onMove();
        }
      }
    }
    legs.forEach(
      (leg, i) =>
        (leg.rotation.x =
          moving && !reducedMotion
            ? Math.sin(time * 15 + i * Math.PI) * 0.4
            : 0),
    );
    player.position.y =
      moving && !reducedMotion ? Math.abs(Math.sin(time * 15)) * 0.035 : 0;
    const pet = companions.get(petId)!;
    const distance = Math.hypot(
      player.position.x - pet.position.x,
      player.position.z - pet.position.z,
    );
    if (!paused && distance > 0.95) {
      const dx =
        ((player.position.x - pet.position.x) / distance) *
        Math.min(dt * 3.2, distance - 0.95);
      const dz =
        ((player.position.z - pet.position.z) / distance) *
        Math.min(dt * 3.2, distance - 0.95);
      if (canWalk(pet.position.x + dx, pet.position.z)) pet.position.x += dx;
      if (canWalk(pet.position.x, pet.position.z + dz)) pet.position.z += dz;
      // Return a stranded companion to the visitor after walking around furniture.
      if (distance > 3.5)
        pet.position.set(player.position.x, 0, player.position.z);
      pet.rotation.y = Math.atan2(
        player.position.x - pet.position.x,
        player.position.z - pet.position.z,
      );
    }
    pet.position.y =
      !paused && !reducedMotion && distance > 1
        ? Math.abs(Math.sin(time * 16)) * 0.06
        : 0;
    if (!reducedMotion && !paused) trophy.rotation.y += dt * 0.3;
    // Face the visitor using the shortest turn, even when crossing the -PI / PI boundary.
    const facing = Math.atan2(
      player.position.x - angelo.position.x,
      player.position.z - angelo.position.z,
    );
    const turn = Math.atan2(
      Math.sin(facing - angelo.rotation.y),
      Math.cos(facing - angelo.rotation.y),
    );
    angelo.rotation.y = reducedMotion
      ? facing
      : angelo.rotation.y + turn * (1 - Math.exp(-10 * dt));
    npcHead.rotation.z =
      !reducedMotion && !paused ? Math.sin(time * 0.9) * 0.025 : 0;
    npcArms[0].rotation.x =
      !reducedMotion && !paused ? Math.sin(time * 1.1) * 0.05 : 0;
    const near =
      stations.find(
        (s) =>
          Math.hypot(player.position.x - s.x, player.position.z - s.z) < 1.05,
      )?.id ?? null;
    if (near !== lastNear) {
      lastNear = near;
      options.onNear(near);
    }
    host.dataset.position = `${player.position.x.toFixed(2)},${player.position.z.toFixed(2)}`;
    renderer.render(scene, camera);
  }
  frame = requestAnimationFrame(animate);
  const contextLost = (event: Event) => {
    event.preventDefault();
    options.onError();
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  return {
    goToStation(id: string) {
      const station = stations.find((s) => s.id === id);
      if (station) goTo(station.x, station.z);
    },
    setPet(id: PetId) {
      const previous = companions.get(petId)!;
      const next = companions.get(id)!;
      next.position.copy(previous.position);
      next.rotation.copy(previous.rotation);
      petId = id;
      companions.forEach((pet, key) => (pet.visible = key === id));
    },
    setPaused(value: boolean) {
      if (paused !== value) {
        paused = value;
        if (value) clear();
      }
    },
    setDirection(key: string, pressed: boolean) {
      path = [];
      if (pressed && !paused) keys.add(key);
      else keys.delete(key);
    },
    resetMovement() {
      hasMoved = false;
    },
    dispose() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
      motionQuery.removeEventListener("change", onMotion);
      renderer.domElement.removeEventListener("pointerdown", click);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
export type RoomController = ReturnType<typeof createRoom>;
