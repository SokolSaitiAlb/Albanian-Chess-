import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const FILES = "abcdefgh";

function createPiece(type: string, light: boolean) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: light ? 0xd8c9a8 : 0x292725,
    roughness: 0.58,
    metalness: light ? 0.12 : 0.35,
  });
  const accent = new THREE.MeshStandardMaterial({
    color: light ? 0xa98950 : 0x8c7042,
    metalness: 0.65,
    roughness: 0.34,
  });
  const addCylinder = (rTop: number, rBottom: number, height: number, y: number, mat = material) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, height, 20), mat);
    mesh.position.y = y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  };
  addCylinder(0.31, 0.37, 0.12, 0.08, accent);
  addCylinder(0.23, 0.3, 0.16, 0.21);
  addCylinder(0.18, 0.2, 0.28, 0.42);

  if (type === "p") {
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 16), accent);
    head.position.y = 0.67;
    head.castShadow = true;
    group.add(head);
  } else if (type === "r") {
    addCylinder(0.2, 0.18, 0.12, 0.62, accent);
    const crown = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.18, 0.34), material);
    crown.position.y = 0.76;
    crown.castShadow = true;
    group.add(crown);
  } else if (type === "n") {
    const neck = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 5), material);
    neck.position.set(0, 0.72, 0);
    neck.rotation.z = -0.22;
    neck.castShadow = true;
    group.add(neck);
  } else if (type === "b") {
    addCylinder(0.12, 0.18, 0.18, 0.65, accent);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), material);
    tip.position.y = 0.82;
    tip.castShadow = true;
    group.add(tip);
  } else if (type === "q" || type === "k") {
    addCylinder(0.14, 0.19, 0.16, 0.66, accent);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 16), material);
    orb.position.y = 0.83;
    orb.castShadow = true;
    group.add(orb);
    if (type === "k") {
      const cross = new THREE.Group();
      const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.3, 0.055), accent);
      const horizontal = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.055, 0.055), accent);
      vertical.position.y = 1.08;
      horizontal.position.y = 1.1;
      cross.add(vertical, horizontal);
      group.add(cross);
    }
  }
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.userData.pickable = true;
    }
  });
  return group;
}

function squareName(file: number, rank: number) {
  return `${FILES[file]}${rank + 1}`;
}

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [cameraMessage, setCameraMessage] = useState("Drag to orbit · Scroll to zoom · Right-drag to pan");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#11100e");
    scene.fog = new THREE.Fog("#11100e", 15, 28);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    const defaultPosition = new THREE.Vector3(8.8, 10.5, 11.5);
    camera.position.copy(defaultPosition);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 7;
    controls.maxDistance = 21;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.update();

    scene.add(new THREE.HemisphereLight("#d9c9aa", "#29221a", 2.1));
    const keyLight = new THREE.DirectionalLight("#ffe4b4", 3.2);
    keyLight.position.set(-5, 11, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight("#9b7946", 24, 20);
    rimLight.position.set(5, 5, -5);
    scene.add(rimLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: "#171512", roughness: 0.95 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.38;
    floor.receiveShadow = true;
    scene.add(floor);

    const board = new THREE.Group();
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(8.35, 0.34, 8.35),
      new THREE.MeshStandardMaterial({ color: "#4b3825", roughness: 0.62, metalness: 0.18 }),
    );
    base.position.y = -0.19;
    base.receiveShadow = true;
    base.castShadow = true;
    board.add(base);

    const squares: THREE.Mesh[] = [];
    const lightSquare = new THREE.MeshStandardMaterial({ color: "#c9b58f", roughness: 0.82 });
    const darkSquare = new THREE.MeshStandardMaterial({ color: "#51402e", roughness: 0.86 });
    const highlightMaterial = new THREE.MeshStandardMaterial({
      color: "#d5a84f", emissive: "#8d5f1d", emissiveIntensity: 0.55,
      transparent: true, opacity: 0.72,
    });
    const highlight = new THREE.Mesh(new THREE.PlaneGeometry(0.94, 0.94), highlightMaterial);
    highlight.rotation.x = -Math.PI / 2;
    highlight.position.y = 0.012;
    highlight.visible = false;
    board.add(highlight);

    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const square = new THREE.Mesh(
          new THREE.BoxGeometry(1, 0.055, 1),
          (file + rank) % 2 === 0 ? lightSquare : darkSquare,
        );
        square.position.set(file - 3.5, 0, rank - 3.5);
        square.receiveShadow = true;
        square.userData.square = squareName(file, rank);
        squares.push(square);
        board.add(square);
      }
    }

    const setup = [
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", "p", "p", "p", "p", "p", "p", "p"],
    ];
    for (let file = 0; file < 8; file++) {
      for (let rank = 0; rank < 2; rank++) {
        const darkPiece = createPiece(setup[rank][file], false);
        darkPiece.position.set(file - 3.5, 0.04, rank - 3.5);
        board.add(darkPiece);
        const lightPiece = createPiece(setup[rank][file], true);
        lightPiece.position.set(file - 3.5, 0.04, 7 - rank - 3.5);
        board.add(lightPiece);
      }
    }
    scene.add(board);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerDown = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(squares, false);
      if (hits.length) {
        const square = hits[0].object as THREE.Mesh;
        const name = square.userData.square as string;
        highlight.position.set(square.position.x, 0.012, square.position.z);
        highlight.visible = true;
        setSelectedSquare(name);
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resetCamera = () => {
      camera.position.copy(defaultPosition);
      controls.target.set(0, 0, 0);
      controls.update();
      setCameraMessage("Camera view reset");
    };
    window.addEventListener("shah-reset-camera", resetCamera);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("shah-reset-camera", resetCamera);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <main className="game-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Shah Shqip home">
          <span className="brand-mark">♜</span>
          <span><strong>SHAH SHQIP</strong><small>THE ART OF STRATEGY</small></span>
        </a>
        <div className="topbar-status"><span /> 3D PROTOTYPE</div>
      </header>

      <section className="game-layout" aria-label="3D chess prototype">
        <div className="board-panel">
          <div className="board-heading">
            <div><p className="eyebrow">THE ROYAL CHAMBER</p><h1>The First Board</h1></div>
            <span className="chapter-tag">PROTOTYPE 01</span>
          </div>
          <div className="scene-frame" ref={mountRef} aria-label="Interactive three-dimensional chessboard" />
          <div className="scene-footer">
            <span>{cameraMessage}</span>
            <button onClick={() => window.dispatchEvent(new Event("shah-reset-camera"))}>Reset view ↗</button>
          </div>
        </div>

        <aside className="info-panel">
          <p className="eyebrow">THE BATTLEFIELD</p>
          <h2>Ready your pieces.</h2>
          <p className="panel-copy">An atmospheric 3D foundation for a chess experience inspired by Albanian history.</p>
          <div className="info-divider" />
          <div className="info-row"><span>BOARD</span><strong>8 × 8</strong></div>
          <div className="info-row"><span>PIECES</span><strong>32 placeholders</strong></div>
          <div className="info-row"><span>CAMERA</span><strong>Free orbit</strong></div>
          <div className="info-row"><span>INPUT</span><strong>Touch + mouse</strong></div>
          <div className="selection-card">
            <span className="selection-label">SELECTED SQUARE</span>
            <strong>{selectedSquare ?? "— —"}</strong>
            <small>{selectedSquare ? "Square highlighted on the board" : "Tap or click any square"}</small>
          </div>
          <p className="prototype-note">Prototype stage · Chess rules are not connected yet.</p>
        </aside>
      </section>
      <footer className="page-footer"><span>SHAH SHQIP</span><span>INSPIRED BY HISTORY · BUILT FOR PLAY</span><span>EARLY DEVELOPMENT</span></footer>
    </main>
  );
}
