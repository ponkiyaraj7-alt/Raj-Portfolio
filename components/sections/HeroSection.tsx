"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type {
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

const BUILD_LANES = [
  {
    id: "ai",
    visualKind: "ai",
    label: "AI workflows",
    short: "Agents + RAG",
    line: "Systems that remove busywork and turn scattered data into useful action.",
    metric: "12+ AI integrations",
    accent: "#1f7a5c",
    secondaryAccent: "#2563eb",
  },
  {
    id: "web",
    visualKind: "web",
    label: "Web products",
    short: "SaaS + commerce",
    line: "Interfaces that load fast, feel polished, and help people move with confidence.",
    metric: "30+ shipped builds",
    accent: "#2563eb",
    secondaryAccent: "#1f7a5c",
  },
  {
    id: "mobile",
    visualKind: "mobile",
    label: "Android apps",
    short: "Flutter + AI",
    line: "Mobile products with native-feeling flows, subscriptions, and production habits.",
    metric: "4 yrs Flutter",
    accent: "#d97706",
    secondaryAccent: "#1f7a5c",
  },
] as const;

type BuildLane = (typeof BUILD_LANES)[number];

function CraftCoreScene({
  activeLane,
  reducedMotion,
}: {
  activeLane: BuildLane;
  reducedMotion: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeKindRef = useRef(activeLane.visualKind);
  const accentRef = useRef(activeLane.accent);
  const secondaryAccentRef = useRef(activeLane.secondaryAccent);

  useEffect(() => {
    activeKindRef.current = activeLane.visualKind;
    accentRef.current = activeLane.accent;
    secondaryAccentRef.current = activeLane.secondaryAccent;
  }, [activeLane.accent, activeLane.secondaryAccent, activeLane.visualKind]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    let sceneRoot: Group | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let frame = 0;
    let disposed = false;

    const pointer = { x: 0, y: 0 };
    const easedPointer = { x: 0, y: 0 };

    type AnimatableMaterial = MeshBasicMaterial | MeshPhysicalMaterial;

    type Spark = {
      mesh: Mesh;
      material: MeshBasicMaterial;
      phase: number;
      radius: number;
      speed: number;
      tilt: number;
    };

    type VisualGroup = {
      key: BuildLane["visualKind"];
      group: Group;
      materials: AnimatableMaterial[];
      baseScale: number;
    };

    const visualGroups: VisualGroup[] = [];
    const aiSparks: Spark[] = [];
    const aiRings: Mesh[] = [];
    const webPanels: Mesh[] = [];
    const webBars: Mesh[] = [];
    const mobileCards: Mesh[] = [];

    const init = async () => {
      const THREE = await import("three");
      if (disposed) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
      renderer.setClearColor(0xffffff, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(0, 0.2, 7.2);

      sceneRoot = new THREE.Group();
      sceneRoot.rotation.set(-0.14, 0.2, 0.04);
      scene.add(sceneRoot);

      const ambient = new THREE.AmbientLight(0xffffff, 2.2);
      scene.add(ambient);

      const key = new THREE.DirectionalLight(0xffffff, 2.8);
      key.position.set(4, 5, 6);
      scene.add(key);

      const rim = new THREE.PointLight(0x52b788, 24, 9);
      rim.position.set(-3, -2, 4);
      scene.add(rim);

      const registerMaterial = <T extends AnimatableMaterial>(material: T, baseOpacity: number) => {
        material.transparent = true;
        material.opacity = baseOpacity;
        material.depthWrite = false;
        material.userData.baseOpacity = baseOpacity;
        return material;
      };

      const registerVisual = (key: BuildLane["visualKind"], group: Group, materials: AnimatableMaterial[], baseScale = 1) => {
        group.userData.visibility = key === activeKindRef.current ? 1 : 0;
        group.scale.setScalar(key === activeKindRef.current ? baseScale : baseScale * 0.78);
        materials.forEach((material) => {
          const baseOpacity = material.userData.baseOpacity ?? material.opacity ?? 1;
          material.opacity = key === activeKindRef.current ? baseOpacity : 0;
        });
        visualGroups.push({ key, group, materials, baseScale });
        sceneRoot?.add(group);
      };

      const glass = (color: string, opacity: number, roughness = 0.28) =>
        registerMaterial(
          new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(color),
            roughness,
            metalness: 0.04,
            clearcoat: 0.8,
            clearcoatRoughness: 0.16,
            transmission: 0.18,
            thickness: 0.45,
            transparent: true,
            opacity,
          }),
          opacity
        );

      const basic = (color: string, opacity: number, wireframe = false) =>
        registerMaterial(
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity,
            wireframe,
          }),
          opacity
        );

      const roundedShape = (width: number, height: number, radius: number) => {
        const x = -width / 2;
        const y = -height / 2;
        const shape = new THREE.Shape();
        shape.moveTo(x + radius, y);
        shape.lineTo(x + width - radius, y);
        shape.quadraticCurveTo(x + width, y, x + width, y + radius);
        shape.lineTo(x + width, y + height - radius);
        shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        shape.lineTo(x + radius, y + height);
        shape.quadraticCurveTo(x, y + height, x, y + height - radius);
        shape.lineTo(x, y + radius);
        shape.quadraticCurveTo(x, y, x + radius, y);
        return shape;
      };

      const createRoundedPanel = (width: number, height: number, radius: number, material: AnimatableMaterial) =>
        new THREE.Mesh(new THREE.ShapeGeometry(roundedShape(width, height, radius)), material);

      const aiMaterials: AnimatableMaterial[] = [];
      const aiGroup = new THREE.Group();
      aiGroup.position.set(0, 0.06, 0);
      aiGroup.rotation.set(-0.16, 0.28, 0.06);

      const aiCoreMaterial = glass("#1f7a5c", 0.92, 0.22);
      aiMaterials.push(aiCoreMaterial);
      const aiCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.08, 5), aiCoreMaterial);
      aiCore.userData.isCore = true;
      aiGroup.add(aiCore);

      const aiWireMaterial = basic("#ffffff", 0.25, true);
      aiMaterials.push(aiWireMaterial);
      const aiWire = new THREE.Mesh(new THREE.SphereGeometry(1.72, 32, 18), aiWireMaterial);
      aiGroup.add(aiWire);

      const aiRingRotations = [
        [0.42, 0.06, -0.2],
        [1.32, 0.22, 0.82],
        [0.18, 1.18, 0.2],
      ];

      aiRingRotations.forEach((rotation, index) => {
        const ringMaterial = basic(index === 1 ? "#2563eb" : "#1f7a5c", index === 1 ? 0.28 : 0.22);
        aiMaterials.push(ringMaterial);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(2.05 + index * 0.28, 0.006, 12, 192), ringMaterial);
        ring.rotation.set(rotation[0], rotation[1], rotation[2]);
        ring.userData.speed = 0.12 + index * 0.035;
        aiRings.push(ring);
        aiGroup.add(ring);
      });

      const aiSparkGeometry = new THREE.SphereGeometry(0.048, 14, 14);
      const aiSparkColors = ["#1f7a5c", "#2563eb", "#52b788", "#10231c"];
      for (let i = 0; i < 16; i += 1) {
        const material = basic(aiSparkColors[i % aiSparkColors.length], i % 4 === 0 ? 0.46 : 0.76);
        aiMaterials.push(material);
        const mesh = new THREE.Mesh(aiSparkGeometry, material);
        aiSparks.push({
          mesh,
          material,
          phase: i * 0.68,
          radius: 1.78 + (i % 5) * 0.17,
          speed: 0.18 + (i % 4) * 0.035,
          tilt: -0.42 + (i % 6) * 0.17,
        });
        aiGroup.add(mesh);
      }

      registerVisual("ai", aiGroup, aiMaterials, 1);

      const webMaterials: AnimatableMaterial[] = [];
      const webGroup = new THREE.Group();
      webGroup.position.set(0.08, 0.03, 0);
      webGroup.rotation.set(-0.2, -0.2, 0.03);

      const webBackMaterial = glass("#e8fff4", 0.45, 0.34);
      const webMainMaterial = glass("#ffffff", 0.74, 0.2);
      const webAccentMaterial = basic("#2563eb", 0.62);
      const webSoftMaterial = basic("#dff7ea", 0.72);
      webMaterials.push(webBackMaterial, webMainMaterial, webAccentMaterial, webSoftMaterial);

      const backPanel = new THREE.Mesh(new THREE.BoxGeometry(3.75, 2.05, 0.045), webBackMaterial);
      backPanel.position.set(0.38, -0.12, -0.5);
      backPanel.rotation.set(0.04, -0.16, 0.02);
      webPanels.push(backPanel);
      webGroup.add(backPanel);

      const mainPanel = new THREE.Mesh(new THREE.BoxGeometry(3.55, 2.12, 0.07), webMainMaterial);
      mainPanel.position.set(0, 0, -0.05);
      webPanels.push(mainPanel);
      webGroup.add(mainPanel);

      const header = new THREE.Mesh(new THREE.BoxGeometry(3.24, 0.22, 0.08), webAccentMaterial);
      header.position.set(0, 0.82, 0.03);
      webPanels.push(header);
      webGroup.add(header);

      const sidebar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.28, 0.08), webSoftMaterial);
      sidebar.position.set(-1.3, -0.1, 0.04);
      webPanels.push(sidebar);
      webGroup.add(sidebar);

      const cardGeometry = new THREE.BoxGeometry(0.82, 0.38, 0.08);
      [
        [-0.48, 0.34, 0.07, "#1f7a5c", 0.5],
        [0.55, 0.34, 0.08, "#dff7ea", 0.82],
        [-0.48, -0.2, 0.08, "#edfdf3", 0.82],
        [0.55, -0.2, 0.09, "#2563eb", 0.22],
      ].forEach(([x, y, z, color, opacity], index) => {
        const material = basic(String(color), Number(opacity));
        webMaterials.push(material);
        const card = new THREE.Mesh(cardGeometry, material);
        card.position.set(Number(x), Number(y), Number(z));
        card.userData.float = index * 0.4;
        webPanels.push(card);
        webGroup.add(card);
      });

      const barGeometry = new THREE.BoxGeometry(0.18, 1, 0.1);
      [0.42, 0.72, 0.55, 0.92, 0.64].forEach((height, index) => {
        const material = basic(index % 2 === 0 ? "#1f7a5c" : "#2563eb", 0.62);
        webMaterials.push(material);
        const bar = new THREE.Mesh(barGeometry, material);
        bar.scale.y = height;
        bar.position.set(0.05 + index * 0.25, -0.76 + height / 2, 0.13);
        bar.userData.baseHeight = height;
        bar.userData.anchorY = -0.76;
        bar.userData.phase = index * 0.5;
        webBars.push(bar);
        webGroup.add(bar);
      });

      registerVisual("web", webGroup, webMaterials, 1);

      const mobileMaterials: AnimatableMaterial[] = [];
      const mobileGroup = new THREE.Group();
      mobileGroup.position.set(0.04, 0.02, 0);
      mobileGroup.rotation.set(-0.1, 0.28, -0.04);

      const phoneBodyMaterial = glass("#10231c", 0.9, 0.3);
      const phoneScreenMaterial = glass("#fafffc", 0.78, 0.2);
      const mobileAccentMaterial = basic("#d97706", 0.7);
      const mobileGreenMaterial = basic("#1f7a5c", 0.58);
      mobileMaterials.push(phoneBodyMaterial, phoneScreenMaterial, mobileAccentMaterial, mobileGreenMaterial);

      const phoneBody = new THREE.Mesh(
        new THREE.ExtrudeGeometry(roundedShape(1.68, 3.18, 0.22), {
          depth: 0.12,
          bevelEnabled: true,
          bevelSize: 0.014,
          bevelThickness: 0.012,
          bevelSegments: 2,
        }),
        phoneBodyMaterial
      );
      phoneBody.geometry.center();
      phoneBody.position.set(0, 0, -0.05);
      mobileGroup.add(phoneBody);

      const phoneScreen = createRoundedPanel(1.42, 2.72, 0.16, phoneScreenMaterial);
      phoneScreen.position.set(0, -0.02, 0.04);
      mobileGroup.add(phoneScreen);

      const notch = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.05, 0.04), mobileAccentMaterial);
      notch.position.set(0, 1.22, 0.08);
      mobileGroup.add(notch);

      [
        [0, 0.64, 0.78, 0.34, "#1f7a5c", 0.42],
        [-0.22, 0.08, 0.78, 0.44, "#e8fff4", 0.88],
        [0.22, -0.55, 0.78, 0.5, "#d97706", 0.36],
      ].forEach(([x, y, width, height, color, opacity], index) => {
        const material = basic(String(color), Number(opacity));
        mobileMaterials.push(material);
        const card = createRoundedPanel(Number(width), Number(height), 0.08, material);
        card.position.set(Number(x), Number(y), 0.1 + index * 0.016);
        card.userData.baseX = Number(x);
        card.userData.baseY = Number(y);
        card.userData.phase = index * 0.8;
        mobileCards.push(card);
        mobileGroup.add(card);
      });

      const sparkRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.01, 10, 96), mobileAccentMaterial);
      sparkRing.position.set(0.78, 0.66, 0.18);
      sparkRing.rotation.set(0.4, 0.8, 0.2);
      sparkRing.userData.isSparkRing = true;
      mobileGroup.add(sparkRing);

      const sparkNode = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), mobileGreenMaterial);
      sparkNode.position.set(0.78, 0.66, 0.18);
      mobileGroup.add(sparkNode);

      registerVisual("mobile", mobileGroup, mobileMaterials, 0.98);

      const resize = () => {
        if (!renderer || !camera) return;
        const rect = stage.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(stage);
      resize();

      const targetColor = new THREE.Color(accentRef.current);
      const secondaryColor = new THREE.Color(secondaryAccentRef.current);
      const aiRestColor = new THREE.Color("#1f7a5c");
      const startTime = window.performance.now();

      webPanels.forEach((panel, index) => {
        panel.userData.baseY = panel.position.y;
        panel.userData.baseRotZ = panel.rotation.z;
        panel.userData.float = panel.userData.float ?? index * 0.18;
      });

      const render = () => {
        if (!renderer || !scene || !camera || !sceneRoot) return;

        const elapsed = (window.performance.now() - startTime) / 1000;
        targetColor.set(accentRef.current);
        secondaryColor.set(secondaryAccentRef.current);
        rim.color.lerp(activeKindRef.current === "mobile" ? secondaryColor : targetColor, 0.05);

        easedPointer.x += (pointer.x - easedPointer.x) * 0.045;
        easedPointer.y += (pointer.y - easedPointer.y) * 0.045;

        sceneRoot.rotation.y = 0.2 + easedPointer.x * 0.12;
        sceneRoot.rotation.x = -0.14 - easedPointer.y * 0.08;

        visualGroups.forEach((visual, index) => {
          const isActive = visual.key === activeKindRef.current;
          const nextVisibility = reducedMotion
            ? isActive
              ? 1
              : 0
            : visual.group.userData.visibility + ((isActive ? 1 : 0) - visual.group.userData.visibility) * 0.085;
          const targetScale = visual.baseScale * (isActive ? 1 : 0.8);

          visual.group.userData.visibility = nextVisibility;
          visual.group.visible = nextVisibility > 0.025 || isActive;
          visual.group.scale.setScalar(
            reducedMotion ? targetScale : visual.group.scale.x + (targetScale - visual.group.scale.x) * 0.085
          );

          const inactiveShift = (index - 1) * 0.2;
          visual.group.position.x += ((isActive ? 0 : inactiveShift) - visual.group.position.x) * 0.06;
          visual.group.position.z += ((isActive ? 0 : -0.22) - visual.group.position.z) * 0.06;

          visual.materials.forEach((material) => {
            const baseOpacity = material.userData.baseOpacity ?? 1;
            material.opacity = baseOpacity * nextVisibility;
          });
        });

        if (!reducedMotion) {
          aiGroup.rotation.y = 0.28 + elapsed * 0.08;
          aiGroup.rotation.x = -0.16 + Math.sin(elapsed * 0.7) * 0.04;
          aiCore.rotation.y = elapsed * 0.18;
          aiCore.rotation.x = Math.sin(elapsed * 0.5) * 0.18;
          aiRings.forEach((ring, index) => {
            ring.rotation.z += 0.002 + index * 0.001;
            ring.rotation.y += Number(ring.userData.speed) * 0.005;
          });
        } else {
          aiGroup.rotation.set(-0.16, 0.28, 0.06);
          aiCore.rotation.set(-0.1, 0.22, 0);
        }

        aiCoreMaterial.color.lerp(activeKindRef.current === "ai" ? targetColor : aiRestColor, 0.08);
        aiSparks.forEach((spark) => {
          const orbit = elapsed * spark.speed + spark.phase;
          spark.mesh.position.set(
            Math.cos(orbit) * spark.radius,
            Math.sin(orbit + spark.tilt) * 0.58,
            Math.sin(orbit) * spark.radius * 0.32
          );
          const baseOpacity = spark.material.userData.baseOpacity ?? 0.7;
          spark.material.opacity = baseOpacity * aiGroup.userData.visibility * (0.78 + Math.sin(orbit * 1.8) * 0.18);
        });

        webPanels.forEach((panel, index) => {
          if (reducedMotion) return;
          const float = Number(panel.userData.float ?? index * 0.18);
          panel.position.y = Number(panel.userData.baseY) + Math.sin(elapsed * 0.9 + float) * 0.025;
          panel.rotation.z = Number(panel.userData.baseRotZ) + Math.sin(elapsed * 0.6 + float) * 0.006;
        });

        webBars.forEach((bar) => {
          const baseHeight = Number(bar.userData.baseHeight);
          const anchorY = Number(bar.userData.anchorY);
          const phase = Number(bar.userData.phase);
          const height = reducedMotion ? baseHeight : baseHeight * (0.9 + Math.sin(elapsed * 1.8 + phase) * 0.08);
          bar.scale.y = height;
          bar.position.y = anchorY + height / 2;
        });

        if (!reducedMotion) {
          webGroup.rotation.y = -0.2 + Math.sin(elapsed * 0.55) * 0.06;
          mobileGroup.rotation.y = 0.28 + Math.sin(elapsed * 0.65) * 0.07;
          mobileGroup.rotation.z = -0.04 + Math.sin(elapsed * 0.5) * 0.025;
          mobileCards.forEach((card) => {
            const phase = Number(card.userData.phase);
            card.position.x = Number(card.userData.baseX) + Math.sin(elapsed * 0.85 + phase) * 0.02;
            card.position.y = Number(card.userData.baseY) + Math.cos(elapsed * 0.75 + phase) * 0.025;
          });
          sparkRing.rotation.z = elapsed * 0.45;
        } else {
          webGroup.rotation.set(-0.2, -0.2, 0.03);
          mobileGroup.rotation.set(-0.1, 0.28, -0.04);
        }

        camera.position.x = easedPointer.x * 0.32;
        camera.position.y = 0.2 + easedPointer.y * 0.2;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);

        frame = window.requestAnimationFrame(render);
      };

      render();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };

    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);
    init();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      renderer?.dispose();
      if (scene) {
        scene.traverse((object) => {
          const maybeMesh = object as Mesh;
          maybeMesh.geometry?.dispose();
          const material = maybeMesh.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material?.dispose();
          }
        });
      }
    };
  }, [reducedMotion]);

  return (
    <div ref={stageRef} className="hero-core-stage" aria-hidden="true">
      <div className="hero-core-fallback" />
      <canvas ref={canvasRef} className="hero-core-canvas" data-hero-three="true" />
    </div>
  );
}

export default function HeroSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeLaneIndex, setActiveLaneIndex] = useState(0);
  const activeLane = BUILD_LANES[activeLaneIndex];

  const scrollToWork = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById("work");
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#work");
  };

  return (
    <section className="hero-atelier" aria-label="Portfolio introduction">
      <div className="hero-grid-sheen" aria-hidden="true" />
      <div className="hero-light-ribbon" aria-hidden="true" />

      <div className="hero-shell">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-kicker">
            <span className="hero-live-dot" aria-hidden="true" />
            <span>Raj Ponkiya — Associate AI Developer</span>
          </div>

          <h1>I build intelligent AI systems & automation workflows.</h1>

          <p className="hero-lede">
            Specializing in AI development, LLM solutions, autonomous agents, and turning manual business processes into seamless automated systems.
          </p>

          <div className="hero-actions" aria-label="Primary actions">
            <a className="hero-primary" href="#work" onClick={scrollToWork}>
              See the work
              <span aria-hidden="true">+</span>
            </a>
            <Link className="hero-secondary" href="/quote">
              Start a project
            </Link>
          </div>

          <div className="hero-lane-tabs" role="tablist" aria-label="What I build">
            {BUILD_LANES.map((lane, index) => (
              <button
                key={lane.id}
                type="button"
                role="tab"
                aria-selected={activeLaneIndex === index}
                className={activeLaneIndex === index ? "is-active" : ""}
                onClick={() => setActiveLaneIndex(index)}
                style={{ "--lane": lane.accent } as CSSProperties}
              >
                <span>{lane.label}</span>
                <small>{lane.short}</small>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{ "--lane": activeLane.accent } as CSSProperties}
        >
          <CraftCoreScene activeLane={activeLane} reducedMotion={reducedMotion} />

          <div className={`hero-scene-labels is-${activeLane.visualKind}`} aria-live="polite">
            <span className="hero-scene-label hero-scene-label-metric">{activeLane.metric}</span>
            <span className="hero-scene-label hero-scene-label-title">{activeLane.label}</span>
            <span className="hero-scene-label hero-scene-label-proof">{activeLane.short}</span>
          </div>

          <div className="hero-identity-card">
            <Image src="/profile.webp" alt="Raj Ponkiya" width={52} height={52} priority />
            <div>
              <strong>Raj Ponkiya</strong>
              <span>Associate AI Developer</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-proof-line" aria-label="Portfolio proof points">
        <span>30+ shipped builds</span>
        <span>AI plus web plus mobile</span>
        <span>Production-first delivery</span>
      </div>

      <style jsx global>{`
        .hero-atelier {
          position: relative;
          box-sizing: border-box;
          min-height: calc(100svh - 32px);
          overflow: hidden;
          display: flex;
          align-items: center;
          background:
            linear-gradient(180deg, rgba(251, 255, 251, 0.98) 0%, #ffffff 54%, #f4faf6 100%),
            linear-gradient(120deg, rgba(31, 122, 92, 0.09), rgba(37, 99, 235, 0.045), rgba(217, 119, 6, 0.035));
          color: #10231c;
          padding: 104px 24px 60px;
          font-family: var(--font-inter), Inter, sans-serif;
        }

        .hero-grid-sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(31, 122, 92, 0.052) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 122, 92, 0.046) 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: linear-gradient(to bottom, transparent, black 18%, black 72%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 18%, black 72%, transparent);
          opacity: 0.76;
        }

        .hero-light-ribbon {
          position: absolute;
          inset: -22% -12% auto;
          height: 62%;
          pointer-events: none;
          background:
            linear-gradient(108deg, transparent 7%, rgba(255, 255, 255, 0.78) 34%, transparent 58%),
            linear-gradient(98deg, transparent 20%, rgba(82, 183, 136, 0.14) 48%, transparent 74%);
          transform: rotate(-5deg);
          filter: blur(2px);
          opacity: 0.84;
        }

        .hero-shell {
          position: relative;
          z-index: 2;
          width: min(1180px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(430px, 1.1fr);
          gap: 42px;
          align-items: center;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          min-height: 34px;
          padding: 8px 12px;
          border: 1px solid rgba(31, 122, 92, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.66);
          color: #1f5f49;
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          font-size: 12px;
          font-weight: 800;
        }

        .hero-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #1f7a5c;
          box-shadow: 0 0 0 6px rgba(31, 122, 92, 0.12);
          flex: 0 0 auto;
        }

        .hero-copy h1 {
          margin: 26px 0 0;
          max-width: 690px;
          font-family: var(--font-display), Plus Jakarta Sans, sans-serif;
          font-size: clamp(54px, 6.1vw, 78px);
          line-height: 0.94;
          letter-spacing: 0;
          color: #10231c;
          font-weight: 850;
          text-wrap: balance;
        }

        .hero-lede {
          margin: 18px 0 0;
          max-width: 560px;
          color: #50645b;
          font-size: 17px;
          line-height: 1.58;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .hero-primary,
        .hero-secondary {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 999px;
          padding: 13px 20px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 850;
          transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }

        .hero-primary {
          background: #163f32;
          color: #ffffff;
          box-shadow: 0 18px 42px rgba(22, 63, 50, 0.22);
        }

        .hero-primary span {
          display: inline-grid;
          place-items: center;
          width: 21px;
          height: 21px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
        }

        .hero-secondary {
          color: #163f32;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(31, 122, 92, 0.17);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
        }

        .hero-primary:hover,
        .hero-secondary:hover {
          transform: translateY(-2px);
        }

        .hero-lane-tabs {
          width: min(620px, 100%);
          margin-top: 26px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }

        .hero-lane-tabs button {
          position: relative;
          min-height: 74px;
          border: 1px solid rgba(16, 35, 28, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.62);
          color: #52645c;
          padding: 14px;
          text-align: left;
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-lane-tabs button:before {
          content: "";
          position: absolute;
          left: 14px;
          right: 14px;
          top: 0;
          height: 3px;
          border-radius: 0 0 999px 999px;
          background: var(--lane);
          opacity: 0.18;
          transition: opacity 0.2s ease;
        }

        .hero-lane-tabs button:hover,
        .hero-lane-tabs button.is-active {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--lane) 35%, rgba(16, 35, 28, 0.1));
          background: rgba(255, 255, 255, 0.82);
          box-shadow: 0 18px 38px rgba(16, 35, 28, 0.08);
        }

        .hero-lane-tabs button.is-active:before {
          opacity: 1;
        }

        .hero-lane-tabs span,
        .hero-lane-tabs small {
          position: relative;
          z-index: 1;
          display: block;
        }

        .hero-lane-tabs span {
          color: #10231c;
          font-size: 14px;
          line-height: 1.25;
          font-weight: 850;
        }

        .hero-lane-tabs small {
          margin-top: 6px;
          color: #64746d;
          font-size: 11px;
          line-height: 1.35;
          font-weight: 700;
        }

        .hero-visual {
          position: relative;
          min-height: 510px;
          display: grid;
          place-items: center;
          isolation: isolate;
        }

        .hero-core-stage {
          position: absolute;
          inset: 0;
          min-height: 460px;
          overflow: visible;
          cursor: grab;
        }

        .hero-core-stage:active {
          cursor: grabbing;
        }

        .hero-core-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 2;
        }

        .hero-core-fallback {
          position: absolute;
          inset: 9% 2% 3%;
          z-index: 1;
          border-radius: 999px;
          background:
            repeating-radial-gradient(circle at 50% 50%, rgba(31, 122, 92, 0.14) 0 1px, transparent 1px 38px),
            conic-gradient(from 120deg, rgba(31, 122, 92, 0.14), rgba(37, 99, 235, 0.11), rgba(217, 119, 6, 0.08), rgba(31, 122, 92, 0.14));
          filter: blur(0.2px);
          mask-image: radial-gradient(circle, black 0%, black 54%, transparent 72%);
          -webkit-mask-image: radial-gradient(circle, black 0%, black 54%, transparent 72%);
          opacity: 0.78;
        }

        .hero-identity-card,
        .hero-scene-label {
          position: absolute;
          z-index: 4;
          border: 1px solid rgba(16, 35, 28, 0.1);
          background: rgba(255, 255, 255, 0.74);
          box-shadow: 0 18px 42px rgba(16, 35, 28, 0.1);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
        }

        .hero-scene-labels {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
        }

        .hero-scene-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          max-width: min(260px, 58%);
          border-radius: 999px;
          padding: 9px 12px;
          color: #10231c;
          line-height: 1;
          white-space: nowrap;
          transform-origin: center;
          transition:
            left 0.36s ease,
            right 0.36s ease,
            top 0.36s ease,
            bottom 0.36s ease,
            transform 0.36s ease,
            border-color 0.24s ease,
            color 0.24s ease;
        }

        .hero-scene-label:before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 999px;
          flex: 0 0 auto;
          background: var(--lane);
          box-shadow: 0 0 0 6px color-mix(in srgb, var(--lane) 14%, transparent);
        }

        .hero-scene-label-metric {
          color: var(--lane);
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0;
          box-shadow: 0 16px 36px rgba(16, 35, 28, 0.1);
        }

        .hero-scene-label-title {
          border-radius: 8px;
          padding: 11px 14px;
          font-family: var(--font-display), Plus Jakarta Sans, sans-serif;
          font-size: 20px;
          font-weight: 850;
          box-shadow: 0 22px 48px rgba(16, 35, 28, 0.12);
        }

        .hero-scene-label-proof {
          padding: 8px 11px;
          color: #52645c;
          font-size: 11px;
          font-weight: 850;
          background: rgba(255, 255, 255, 0.6);
        }

        .hero-scene-labels.is-ai .hero-scene-label-metric {
          left: 15%;
          top: 25%;
          transform: rotate(-7deg);
        }

        .hero-scene-labels.is-ai .hero-scene-label-title {
          right: 18%;
          top: 48%;
          transform: rotate(3deg);
        }

        .hero-scene-labels.is-ai .hero-scene-label-proof {
          left: 37%;
          bottom: 18%;
          transform: rotate(-2deg);
        }

        .hero-scene-labels.is-web .hero-scene-label-metric {
          left: 20%;
          top: 28%;
          transform: rotate(-2deg);
        }

        .hero-scene-labels.is-web .hero-scene-label-title {
          right: 14%;
          top: 38%;
          transform: rotate(4deg);
        }

        .hero-scene-labels.is-web .hero-scene-label-proof {
          right: 24%;
          bottom: 24%;
          transform: rotate(-4deg);
        }

        .hero-scene-labels.is-mobile .hero-scene-label-metric {
          left: 24%;
          top: 18%;
          transform: rotate(-4deg);
        }

        .hero-scene-labels.is-mobile .hero-scene-label-title {
          right: 22%;
          top: 44%;
          transform: rotate(5deg);
        }

        .hero-scene-labels.is-mobile .hero-scene-label-proof {
          left: 24%;
          bottom: 22%;
          transform: rotate(-5deg);
        }

        .hero-identity-card {
          right: 16px;
          top: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 8px;
          padding: 10px 12px;
        }

        .hero-identity-card img {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid rgba(31, 122, 92, 0.18);
        }

        .hero-identity-card strong,
        .hero-identity-card span {
          display: block;
          white-space: nowrap;
        }

        .hero-identity-card strong {
          color: #10231c;
          font-size: 14px;
          line-height: 1;
        }

        .hero-identity-card span {
          margin-top: 5px;
          color: #63736b;
          font-size: 12px;
          font-weight: 700;
        }

        .hero-proof-line {
          position: absolute;
          z-index: 3;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%);
          width: min(860px, calc(100% - 48px));
          display: flex;
          justify-content: center;
          gap: 9px;
          flex-wrap: wrap;
          color: #66786f;
          font-size: 12px;
          font-weight: 850;
          pointer-events: none;
        }

        .hero-proof-line span {
          display: inline-flex;
          min-height: 34px;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          padding: 8px 14px;
          border: 1px solid rgba(31, 122, 92, 0.13);
          background: rgba(255, 255, 255, 0.68);
          box-shadow: 0 14px 32px rgba(16, 35, 28, 0.08);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
        }

        .hero-proof-line span:before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(31, 122, 92, 0.72);
        }

        @media (max-width: 1040px) {
          .hero-atelier {
            padding-top: 96px;
            align-items: flex-start;
          }

          .hero-shell {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .hero-copy h1,
          .hero-lede {
            max-width: 760px;
          }

          .hero-visual {
            min-height: 420px;
          }

          .hero-core-stage {
            min-height: 390px;
          }
        }

        @media (max-height: 760px) and (min-width: 900px) {
          .hero-atelier {
            padding: 84px 24px 42px;
          }

          .hero-copy h1 {
            margin-top: 20px;
            font-size: clamp(48px, 5.4vw, 68px);
          }

          .hero-lede {
            margin-top: 14px;
            max-width: 520px;
            font-size: 16px;
            line-height: 1.5;
          }

          .hero-actions {
            margin-top: 22px;
          }

          .hero-primary,
          .hero-secondary {
            min-height: 44px;
            padding: 11px 17px;
          }

          .hero-lane-tabs {
            margin-top: 18px;
          }

          .hero-lane-tabs button {
            min-height: 60px;
            padding: 12px;
          }

          .hero-visual {
            min-height: 440px;
          }

          .hero-core-stage {
            min-height: 405px;
          }

          .hero-scene-label-title {
            font-size: 17px;
            padding: 10px 12px;
          }

          .hero-scene-label-metric,
          .hero-scene-label-proof {
            font-size: 10px;
          }

          .hero-identity-card {
            top: 18px;
          }
        }

        @media (max-width: 640px) {
          .hero-atelier {
            min-height: calc(100svh - 28px);
            padding: 72px 16px 54px;
          }

          .hero-shell {
            gap: 12px;
          }

          .hero-kicker {
            min-height: 32px;
            font-size: 11px;
            padding: 7px 10px;
          }

          .hero-copy h1 {
            margin-top: 16px;
            font-size: 36px;
            line-height: 0.98;
          }

          .hero-lede {
            margin-top: 12px;
            font-size: 14px;
            line-height: 1.45;
          }

          .hero-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 18px;
          }

          .hero-primary,
          .hero-secondary {
            min-height: 44px;
            padding: 10px 12px;
            font-size: 13px;
          }

          .hero-lane-tabs {
            margin-top: 14px;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 6px;
          }

          .hero-lane-tabs button {
            min-height: 44px;
            padding: 10px 7px;
            text-align: center;
          }

          .hero-lane-tabs span {
            font-size: 10px;
          }

          .hero-lane-tabs small {
            display: none;
          }

          .hero-visual {
            min-height: 250px;
            margin-top: 0;
          }

          .hero-core-stage {
            min-height: 240px;
          }

          .hero-scene-label {
            max-width: 72%;
            padding: 7px 9px;
            gap: 6px;
          }

          .hero-scene-label:before {
            width: 5px;
            height: 5px;
            box-shadow: 0 0 0 4px color-mix(in srgb, var(--lane) 12%, transparent);
          }

          .hero-scene-label-title {
            font-size: 14px;
            padding: 8px 10px;
          }

          .hero-scene-label-metric,
          .hero-scene-label-proof {
            font-size: 9px;
          }

          .hero-scene-labels.is-ai .hero-scene-label-metric,
          .hero-scene-labels.is-web .hero-scene-label-metric {
            left: 3%;
            top: 20%;
          }

          .hero-scene-labels.is-ai .hero-scene-label-title,
          .hero-scene-labels.is-web .hero-scene-label-title,
          .hero-scene-labels.is-mobile .hero-scene-label-title {
            right: 3%;
            top: 42%;
          }

          .hero-scene-labels.is-ai .hero-scene-label-proof,
          .hero-scene-labels.is-web .hero-scene-label-proof,
          .hero-scene-labels.is-mobile .hero-scene-label-proof {
            left: 10%;
            bottom: 17%;
          }

          .hero-scene-labels.is-mobile .hero-scene-label-metric {
            left: 9%;
            top: 18%;
          }

          .hero-identity-card {
            display: none;
          }

          .hero-identity-card img {
            width: 42px;
            height: 42px;
          }

          .hero-identity-card strong {
            font-size: 12px;
          }

          .hero-identity-card span {
            font-size: 10px;
          }

          .hero-proof-line {
            bottom: 12px;
            width: calc(100% - 32px);
            flex-wrap: nowrap;
            gap: 0;
            font-size: 10px;
          }

          .hero-proof-line span {
            display: none;
          }

          .hero-proof-line span:first-child {
            display: inline-flex;
            width: 100%;
            min-height: 32px;
            justify-content: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 8px 11px;
          }

          .hero-proof-line span:first-child:after {
            content: " / AI + web + mobile";
            color: #72827a;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-primary,
          .hero-secondary,
          .hero-lane-tabs button {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
