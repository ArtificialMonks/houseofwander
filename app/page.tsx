"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  AmigoGuide,
  type AmigoPrompt
} from "./components/amigo-guide";
import navSource from "../source/nav.json";
import staysSource from "../source/stays/index.json";

type Stay = {
  name: string;
  location: string;
  status: string;
  meta?: string;
  description: string;
  href?: string;
  image?: string;
};

type NavItem = {
  label: string;
  href: string;
};

type AmigoSystemItem = {
  title: string;
  text: string;
};

type CollectionSource = {
  stays: Stay[];
  productionLanes: string[];
  amigoSystem: AmigoSystemItem[];
  amigoPrompts: AmigoPrompt[];
};

const nav = navSource as { primary: NavItem[] };
const collection = staysSource as CollectionSource;
const { stays, productionLanes, amigoSystem, amigoPrompts } = collection;

function HouseOfWanderObject() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    });
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let frameId = 0;
    let isDisposed = false;
    let rootBaseY = 0.08;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.set(0, 2.18, 9.55);

    scene.add(new THREE.AmbientLight(0xf6ead5, 1.25));

    const keyLight = new THREE.DirectionalLight(0xffd2a1, 3.1);
    keyLight.position.set(4.8, 5.4, 4.2);
    scene.add(keyLight);

    const coolLight = new THREE.DirectionalLight(0x9fc6d8, 1.5);
    coolLight.position.set(-4.4, 2.4, 3.8);
    scene.add(coolLight);

    const root = new THREE.Group();
    root.rotation.set(-0.05, -0.34, 0.02);
    root.position.set(1.35, 0.08, 0);
    scene.add(root);

    const materials = {
      land: new THREE.MeshStandardMaterial({
        color: 0x36422b,
        roughness: 0.9,
        metalness: 0.08
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x7ea8a2,
        emissive: 0x173d3a,
        emissiveIntensity: 0.28,
        roughness: 0.42,
        metalness: 0.2
      }),
      cabin: new THREE.MeshStandardMaterial({
        color: 0xe8d5b8,
        roughness: 0.62,
        metalness: 0.12
      }),
      roof: new THREE.MeshStandardMaterial({
        color: 0xb4714a,
        roughness: 0.55,
        metalness: 0.18
      }),
      glass: new THREE.MeshStandardMaterial({
        color: 0xb8d6cf,
        emissive: 0x294f4a,
        emissiveIntensity: 0.35,
        roughness: 0.18,
        metalness: 0.08
      }),
      gold: new THREE.MeshStandardMaterial({
        color: 0xd3a85e,
        roughness: 0.36,
        metalness: 0.55
      }),
      dark: new THREE.MeshStandardMaterial({
        color: 0x11160f,
        roughness: 0.66,
        metalness: 0.22
      })
    };

    const island = new THREE.Mesh(
      new THREE.CylinderGeometry(2.58, 2.76, 0.26, 96),
      materials.land
    );
    island.position.y = -0.48;
    root.add(island);

    const lakeRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.32, 0.055, 18, 128),
      materials.water
    );
    lakeRing.rotation.x = Math.PI / 2;
    lakeRing.position.y = -0.3;
    root.add(lakeRing);

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.74, 1.05, 1.18),
      materials.cabin
    );
    body.position.set(0, 0.24, 0);
    root.add(body);

    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.42, 0.82, 4),
      materials.roof
    );
    roof.position.set(0, 1.17, 0);
    roof.rotation.y = Math.PI / 4;
    roof.scale.z = 0.92;
    root.add(roof);

    const chimney = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.58, 0.22),
      materials.dark
    );
    chimney.position.set(0.48, 1.34, -0.18);
    root.add(chimney);

    const door = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.62, 0.035),
      materials.dark
    );
    door.position.set(-0.34, 0.02, 0.606);
    root.add(door);

    const windowLeft = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.28, 0.04),
      materials.glass
    );
    windowLeft.position.set(0.24, 0.36, 0.61);
    root.add(windowLeft);

    const windowRight = windowLeft.clone();
    windowRight.position.set(0.64, 0.36, 0.61);
    root.add(windowRight);

    const path = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.035, 1.48),
      materials.gold
    );
    path.position.set(-0.34, -0.31, 1.28);
    root.add(path);

    const orbit = new THREE.Group();
    root.add(orbit);

    [0.4, 2.45, 4.55].forEach((angle, index) => {
      const marker = new THREE.Group();
      const radius = 2.25;
      marker.position.set(Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius);

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.48, 16),
        materials.gold
      );
      stem.position.y = 0.18;
      marker.add(stem);

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(index === 0 ? 0.13 : 0.1, 24, 18),
        index === 0 ? materials.gold : materials.glass
      );
      dot.position.y = 0.48;
      marker.add(dot);
      orbit.add(marker);
    });

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(3.05, 0.012, 12, 160),
      materials.gold
    );
    halo.rotation.x = Math.PI / 2;
    halo.position.y = 0.02;
    root.add(halo);

    const render = () => renderer.render(scene, camera);

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      const isNarrow = width < 720;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.y = isNarrow ? 2.32 : 2.18;
      camera.position.z = isNarrow ? 10.4 : 9.55;
      root.position.x = isNarrow ? 0.78 : 1.35;
      rootBaseY = isNarrow ? 0.58 : 0.08;
      root.position.y = rootBaseY;
      camera.updateProjectionMatrix();
      render();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.48;
      pointer.targetY = (0.5 - (event.clientY - rect.top) / rect.height) * 0.22;
    };

    const animate = (time: number) => {
      if (isDisposed) return;

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      const t = time * 0.001;
      root.rotation.y += 0.0022;
      root.rotation.x = -0.05 + pointer.y;
      root.rotation.z = 0.02 - pointer.x * 0.12;
      root.position.y = rootBaseY + Math.sin(t * 0.78) * 0.045;
      orbit.rotation.y -= 0.0014;
      halo.rotation.z += 0.0018;

      render();
      frameId = window.requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", onPointerMove);
    resize();

    if (motionQuery.matches) {
      render();
    } else {
      frameId = window.requestAnimationFrame(animate);
    }

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.Material | THREE.Material[]
        >;
        if (!mesh.isMesh) return;

        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="wanderObject" ref={hostRef} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="wanderObjectLabels">
        <span>Casa Cabane</span>
        <span>Next stay</span>
        <span>Collection map</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="brandPage">
      <section className="wanderHero" aria-label="House of Wander">
        <HouseOfWanderObject />
        <div className="wanderAtmosphere" aria-hidden="true" />

        <header className="wanderNav">
          <Link className="wanderBrand" href="/">
            House of Wander
          </Link>
          <nav aria-label="Primary navigation">
            {nav.primary.map((item) =>
              item.href.startsWith("/") ? (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              )
            )}
          </nav>
        </header>

        <div className="wanderHeroCopy">
          <p className="eyebrow">Collection gateway</p>
          <h1 className="wanderTitle">
            A house of stays, each one entered like its own world.
          </h1>
          <p className="wanderLead">
            House of Wander can become the calm entry point for every
            accommodation: a cinematic collection first, then a guided dive into
            each stay. Casa Cabane is the first working prototype, with Amigo as
            the guide layer guests can talk to before the final Airbnb handoff.
          </p>
          <div className="wanderActions">
            <Link className="primaryButton" href="/casa-cabane">
              Enter Casa Cabane
            </Link>
            <a className="ghostButton" href="#stays">
              View collection
            </a>
          </div>
        </div>

        <footer className="wanderHeroFoot">
          <span>Prototype collection layer</span>
          <span>Real stay pages · guided detail later</span>
        </footer>
      </section>

      <section id="stays" className="staysBand" aria-label="House of Wander stays">
        <div className="staysIntro">
          <p className="sectionKicker">Stays</p>
          <h2>Start with Casa Cabane, then let every place receive a doorway.</h2>
          <p>
            The collection page should make the full ecosystem easy to scan
            without becoming an Airbnb-style dashboard. Each stay can open into
            a richer world with atmosphere, facts, photos, practical details,
            and booking paths in one guided flow.
          </p>
        </div>

        <div className="stayGrid">
          {stays.map((stay) => {
            const content = (
              <>
                {stay.image ? (
                  <img src={stay.image} alt="" className="stayImage" />
                ) : (
                  <div className="stayPlaceholder" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
                <div className="stayCardBody">
                  <p className="stayStatus">{stay.status}</p>
                  <h3>{stay.name}</h3>
                  <p className="stayLocation">{stay.location}</p>
                  {stay.meta ? <p className="stayMeta">{stay.meta}</p> : null}
                  <p>{stay.description}</p>
                  <span className="stayAction">
                    {stay.href ? "Open stay" : "Awaiting content"}
                  </span>
                </div>
              </>
            );

            return stay.href ? (
              <Link key={stay.name} className="stayCard featuredStay" href={stay.href}>
                {content}
              </Link>
            ) : (
              <article key={stay.name} className="stayCard">
                {content}
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="amigo"
        className="amigoSystemBand"
        aria-label="Amigo guided booking system"
      >
        <div className="amigoSystemIntro">
          <p className="sectionKicker">Amigo guide layer</p>
          <h2>One guide between atmosphere, answers, Airbnb, and direct booking later.</h2>
          <p>
            Amigo starts as a visible prototype guide for guests. Later it can
            become the operating layer between Maaike & Laudi, guest questions,
            Airbnb messages, and direct booking on House of Wander.
          </p>
        </div>
        <div className="amigoSystemGrid">
          {amigoSystem.map((item) => (
            <article key={item.title}>
              <span>{item.title}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="systemBand" aria-label="Project brief">
        <div>
          <p className="sectionKicker">Project shape</p>
          <h2>Build the brand world first, then deepen the stay detail.</h2>
        </div>
        <ol className="laneList">
          {productionLanes.map((lane, index) => (
            <li key={lane}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{lane}</p>
            </li>
          ))}
        </ol>
      </section>

      <AmigoGuide
        context="House of Wander collection"
        intro="I can help guests choose where to start, understand the current Airbnb handoff, and see how direct booking can grow later."
        prompts={amigoPrompts}
      />
    </main>
  );
}
