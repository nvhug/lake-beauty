/* eslint-disable react-hooks/immutability -- react-three-fiber drives uniforms imperatively inside the render loop */
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { heroPortrait } from "@/data/brand";

type Vec3 = [number, number, number];

// Proportions follow the classic head canon seen in the reference portrait:
// eye line at mid-height, nose base halfway to the chin, face width ~0.72 of height.
const HALF_H = 1.16;
const HALF_W = 0.88;
const EYE_Y = 0.02;
const EYE_X = 0.336;
const EYE_HALF_W = 0.168;
const BROW_Y = 0.21;
const NOSE_BASE_Y = -0.48;
const MOUTH_Y = -0.73;

function createRandom(seed: number) {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

/** Facial relief: cheeks recede, nose and brow ridge advance, eye sockets sink. */
function depthAt(x: number, y: number) {
  const cheeks = 0.42 * Math.cos(x * 1.5) * Math.cos(y * 0.8);
  const nose = 0.3 * Math.exp(-((x * 3.6) ** 2 + ((y + 0.22) * 1.9) ** 2));
  const brow = 0.06 * Math.exp(-(((y - BROW_Y) * 3.2) ** 2));
  const lips = 0.05 * Math.exp(-((x * 2.6) ** 2 + ((y - MOUTH_Y) * 5) ** 2));
  const socket = -0.06 * Math.exp(-(((Math.abs(x) - EYE_X) * 4.4) ** 2 + ((y - EYE_Y) * 4.8) ** 2));
  return cheeks + nose + brow + lips + socket;
}

/** Oval with a soft V-line jaw and a full forehead, matching the reference silhouette. */
function halfWidthAt(y: number) {
  const t = y / HALF_H;
  if (Math.abs(t) >= 1) return 0;
  if (t < 0) return HALF_W * Math.sqrt(1 - t * t) * (1 - 0.34 * Math.abs(t) ** 1.35);
  return HALF_W * Math.sqrt(1 - t ** 2.6);
}

function place(x: number, y: number): Vec3 {
  return [x, y, depthAt(x, y)];
}

function faceOval(steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const y = HALF_H * Math.cos(angle);
    points.push(place(Math.sign(Math.sin(angle)) * halfWidthAt(y), y));
  }
  return points;
}

function hairlineArc(steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    const x = (t - 0.5) * 1.18;
    points.push(place(x, 0.68 - (x / 0.59) ** 2 * 0.12));
  }
  return points;
}

function cheekArc(side: number, steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    const x = side * (0.63 - 0.32 * t);
    const y = 0.06 - 0.56 * t - 0.05 * Math.sin(t * Math.PI);
    points.push(place(x, y));
  }
  return points;
}

function eyeContour(side: number, steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const lid = Math.sin(angle);
    const x = side * EYE_X + EYE_HALF_W * Math.cos(angle);
    const y = EYE_Y + (lid > 0 ? 0.072 : 0.055) * lid;
    points.push(place(x, y));
  }
  return points;
}

function irisRing(side: number, steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    points.push(place(side * EYE_X + 0.052 * Math.cos(angle), EYE_Y + 0.052 * Math.sin(angle)));
  }
  return points;
}

function browContour(side: number, steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    const x = side * (0.14 + t * 0.42);
    const y = BROW_Y + Math.sin(t * Math.PI) * 0.045 - t * 0.03;
    points.push(place(x, y));
  }
  return points;
}

function noseBridge(steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    points.push(place(0, EYE_Y + 0.06 - t * 0.5));
  }
  return points;
}

function noseSide(side: number, steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    points.push(place(side * (0.05 + 0.12 * t ** 1.4), EYE_Y - 0.02 - t * 0.46));
  }
  return points;
}

function nostrilArc(steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    const x = (t - 0.5) * 2 * EYE_HALF_W;
    points.push(place(x, NOSE_BASE_Y - Math.cos((t - 0.5) * Math.PI) * 0.045));
  }
  return points;
}

function lipContour(steps: number, scale: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2;
    const vertical = Math.sin(angle);
    const x = 0.26 * scale * Math.cos(angle);
    // Cupid's bow: the upper lip dips at the centre.
    const bow = vertical > 0 ? 1 - 0.35 * Math.exp(-((x / 0.07) ** 2)) : 1;
    const y = MOUTH_Y + (vertical > 0 ? 0.075 : 0.105) * scale * vertical * bow;
    points.push(place(x, y));
  }
  return points;
}

function philtrum(steps: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    points.push(place(0, NOSE_BASE_Y - 0.03 - t * 0.13));
  }
  return points;
}

/** Keep eyes and mouth legible by excluding them from the background mesh. */
function insideFeature(x: number, y: number) {
  const eye = ((Math.abs(x) - EYE_X) / 0.24) ** 2 + ((y - EYE_Y) / 0.12) ** 2 < 1;
  const mouth = (x / 0.3) ** 2 + ((y - MOUTH_Y) / 0.15) ** 2 < 1;
  return eye || mouth;
}

function scatterPoints(count: number, random: () => number): Vec3[] {
  const points: Vec3[] = [];
  let guard = 0;
  while (points.length < count && guard < count * 60) {
    guard += 1;
    const x = (random() * 2 - 1) * HALF_W;
    const y = (random() * 2 - 1) * HALF_H;
    if (Math.abs(x) > halfWidthAt(y) * 0.9) continue;
    if (insideFeature(x, y)) continue;
    points.push(place(x, y));
  }
  return points;
}

type FaceMesh = {
  points: Float32Array;
  scales: Float32Array;
  seeds: Float32Array;
  segments: Float32Array;
};

function buildFace(compact: boolean): FaceMesh {
  const random = createRandom(20260906);
  const closed: Vec3[][] = [
    faceOval(compact ? 46 : 68),
    eyeContour(-1, compact ? 14 : 18),
    eyeContour(1, compact ? 14 : 18),
    irisRing(-1, 10),
    irisRing(1, 10),
    lipContour(compact ? 16 : 22, 1),
    lipContour(compact ? 10 : 14, 0.6),
  ];
  const open: Vec3[][] = [
    hairlineArc(compact ? 10 : 15),
    cheekArc(-1, compact ? 7 : 10),
    cheekArc(1, compact ? 7 : 10),
    browContour(-1, compact ? 8 : 11),
    browContour(1, compact ? 8 : 11),
    noseBridge(compact ? 6 : 8),
    noseSide(-1, compact ? 5 : 7),
    noseSide(1, compact ? 5 : 7),
    nostrilArc(compact ? 7 : 9),
    philtrum(3),
  ];

  const vertices: Vec3[] = [];
  const links = new Set<string>();
  const addLink = (a: number, b: number) => {
    if (a === b) return;
    links.add(a < b ? `${a}:${b}` : `${b}:${a}`);
  };

  const addContour = (contour: Vec3[], loop: boolean) => {
    const start = vertices.length;
    for (const point of contour) vertices.push(point);
    for (let i = 0; i < contour.length - 1; i += 1) addLink(start + i, start + i + 1);
    if (loop) addLink(start + contour.length - 1, start);
  };

  for (const contour of closed) addContour(contour, true);
  for (const contour of open) addContour(contour, false);

  const contourCount = vertices.length;
  for (const point of scatterPoints(compact ? 120 : 230, random)) vertices.push(point);

  // Every vertex links to its closest neighbours, turning landmarks into one connected network.
  const maxDistance = compact ? 0.26 : 0.2;
  const neighbours = compact ? 4 : 6;
  for (let i = 0; i < vertices.length; i += 1) {
    const ranked: { index: number; distance: number }[] = [];
    for (let j = 0; j < vertices.length; j += 1) {
      if (i === j) continue;
      const dx = vertices[i][0] - vertices[j][0];
      const dy = vertices[i][1] - vertices[j][1];
      const dz = vertices[i][2] - vertices[j][2];
      const distance = Math.hypot(dx, dy, dz);
      if (distance < maxDistance) ranked.push({ index: j, distance });
    }
    ranked.sort((a, b) => a.distance - b.distance);
    const limit = i < contourCount ? Math.min(3, neighbours) : neighbours;
    for (const entry of ranked.slice(0, limit)) addLink(i, entry.index);
  }

  const points = new Float32Array(vertices.length * 3);
  const scales = new Float32Array(vertices.length);
  const seeds = new Float32Array(vertices.length);
  for (let i = 0; i < vertices.length; i += 1) {
    points[i * 3] = vertices[i][0];
    points[i * 3 + 1] = vertices[i][1];
    points[i * 3 + 2] = vertices[i][2];
    scales[i] = i < contourCount ? 0.9 + random() * 0.3 : 0.42 + random() * 0.22;
    seeds[i] = random();
  }

  const segments = new Float32Array(links.size * 6);
  let cursor = 0;
  for (const link of links) {
    const [a, b] = link.split(":").map(Number);
    segments.set(vertices[a], cursor);
    segments.set(vertices[b], cursor + 3);
    cursor += 6;
  }

  return { points, scales, seeds, segments };
}

const pointVertex = /* glsl */ `
uniform float uTime;
uniform float uScan;
uniform float uSize;
uniform float uPixelRatio;
attribute float aScale;
attribute float aSeed;
varying float vGlow;

void main() {
  vec3 p = position;
  p.z += sin(uTime * 0.9 + aSeed * 6.283) * 0.012;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float scan = 1.0 - smoothstep(0.0, 0.22, abs(p.y - uScan));
  float twinkle = 0.82 + 0.18 * sin(uTime * 1.7 + aSeed * 12.0);
  vGlow = scan;
  gl_PointSize = uSize * uPixelRatio * aScale * twinkle * (1.0 + scan * 0.5) * (6.0 / -mv.z);
}
`;

const pointFragment = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uHot;
varying float vGlow;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float disc = 1.0 - smoothstep(0.28, 0.42, d);
  float halo = (1.0 - smoothstep(0.1, 0.5, d)) * 0.2;
  float mask = clamp(disc + halo, 0.0, 1.0);
  if (mask < 0.01) discard;
  vec3 color = mix(uBase, uHot, vGlow);
  gl_FragColor = vec4(color, mask * (0.65 + vGlow * 0.35));
}
`;

const lineVertex = /* glsl */ `
uniform float uScan;
varying float vGlow;

void main() {
  vGlow = 1.0 - smoothstep(0.0, 0.26, abs(position.y - uScan));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const lineFragment = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uHot;
varying float vGlow;

void main() {
  vec3 color = mix(uBase, uHot, vGlow);
  gl_FragColor = vec4(color, 0.16 + vGlow * 0.55);
}
`;

const portraitVertex = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// The mask repeats the jaw/forehead curve of the mesh so the photo is cropped to the face only.
const portraitFragment = /* glsl */ `
uniform sampler2D uMap;
uniform vec2 uFit;
uniform vec2 uOffset;
uniform float uZoom;
uniform float uOpacity;
uniform float uScan;
uniform vec3 uTint;
uniform vec3 uHot;
varying vec2 vUv;

float halfWidth(float t) {
  float a = abs(t);
  if (a >= 1.0) return 0.0;
  if (t < 0.0) return sqrt(1.0 - t * t) * (1.0 - 0.34 * pow(a, 1.35));
  return sqrt(1.0 - pow(a, 2.6));
}

void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float hw = halfWidth(p.y);
  if (hw <= 0.0) discard;

  float mask = 1.0 - smoothstep(hw * 0.82, hw, abs(p.x));
  mask *= 1.0 - smoothstep(0.86, 1.0, abs(p.y));
  if (mask < 0.01) discard;

  vec2 uv = (vUv - 0.5) * uFit / uZoom + 0.5 + uOffset;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;

  vec3 tex = texture2D(uMap, uv).rgb;
  float lum = dot(tex, vec3(0.299, 0.587, 0.114));
  vec3 graded = mix(vec3(lum) * uTint, tex, 0.58);

  float scan = 1.0 - smoothstep(0.0, 0.26, abs(p.y * ${HALF_H.toFixed(2)} - uScan));
  graded = mix(graded, uHot, scan * 0.22);

  gl_FragColor = vec4(graded, mask * uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

function useScrollProgress() {
  const value = useRef(0);
  useEffect(() => {
    const update = () => {
      const limit = window.innerHeight || 1;
      value.current = Math.min(window.scrollY / limit, 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return value;
}

type SceneProps = { reduced: boolean; compact: boolean };

function FacePortrait({ scan }: { scan: React.RefObject<number> }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const source = heroPortrait.src;
  useEffect(() => {
    if (!source) return;
    let active = true;
    new THREE.TextureLoader().load(
      source,
      (loaded) => {
        if (!active) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = THREE.SRGBColorSpace;
        setTexture(loaded);
      },
      undefined,
      () => undefined,
    );
    return () => {
      active = false;
    };
  }, [source]);

  useEffect(() => () => texture?.dispose(), [texture]);

  const uniforms = useMemo(() => {
    if (!texture) return null;
    const image = texture.image as { width: number; height: number };
    const planeAspect = HALF_W / HALF_H;
    const textureAspect = image.width / image.height;
    const fit =
      textureAspect > planeAspect
        ? new THREE.Vector2(planeAspect / textureAspect, 1)
        : new THREE.Vector2(1, textureAspect / planeAspect);

    return {
      uMap: { value: texture },
      uFit: { value: fit },
      uOffset: { value: new THREE.Vector2(...heroPortrait.offset) },
      uZoom: { value: heroPortrait.zoom },
      uOpacity: { value: heroPortrait.opacity },
      uScan: { value: 0 },
      uTint: { value: new THREE.Color("#f3e2d4") },
      uHot: { value: new THREE.Color("#e8836a") },
    };
  }, [texture]);

  useFrame(() => {
    if (uniforms) uniforms.uScan.value = scan.current;
  });

  if (!uniforms) return null;

  return (
    <mesh renderOrder={-1} position={[0, 0, -0.05]}>
      <planeGeometry args={[HALF_W * 2, HALF_H * 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={portraitVertex}
        fragmentShader={portraitFragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function FaceNetwork({ reduced, compact }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const scroll = useScrollProgress();
  const scanRef = useRef(0);
  const pixelRatio = useThree((state) => state.viewport.dpr);
  const face = useMemo(() => buildFace(compact), [compact]);

  const pointGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(face.points, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(face.scales, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(face.seeds, 1));
    return geo;
  }, [face]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(face.segments, 3));
    return geo;
  }, [face]);

  useEffect(() => {
    return () => {
      pointGeometry.dispose();
      lineGeometry.dispose();
    };
  }, [pointGeometry, lineGeometry]);

  const pointUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScan: { value: 0 },
      uSize: { value: compact ? 6.5 : 7.5 },
      uPixelRatio: { value: 1 },
      uBase: { value: new THREE.Color("#dcece3") },
      uHot: { value: new THREE.Color("#f5906f") },
    }),
    [compact],
  );

  const lineUniforms = useMemo(
    () => ({
      uScan: { value: 0 },
      uBase: { value: new THREE.Color("#79a897") },
      uHot: { value: new THREE.Color("#ec8064") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;

    pointUniforms.uTime.value += reduced ? step * 0.25 : step;
    pointUniforms.uPixelRatio.value = pixelRatio;

    const scan = reduced ? 0.2 : Math.sin(time * 0.4) * 1.25;
    scanRef.current = scan;
    pointUniforms.uScan.value = scan;
    lineUniforms.uScan.value = scan;
    if (!group.current) return;
    const target = reduced ? 0 : state.pointer.x * 0.34 + Math.sin(time * 0.22) * 0.05;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-state.pointer.y * 0.18 - group.current.rotation.x) * 0.05;
    group.current.position.y = (compact ? -0.42 : 0.1) - scroll.current * 0.45;
  });

  return (
    <group ref={group} scale={compact ? 0.86 : 1.02} position={[compact ? 0 : 1.32, compact ? -0.42 : 0.1, 0]}>
      <FacePortrait scan={scanRef} />
      <lineSegments geometry={lineGeometry}>
        <shaderMaterial
          uniforms={lineUniforms}
          vertexShader={lineVertex}
          fragmentShader={lineFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points geometry={pointGeometry}>
        <shaderMaterial
          uniforms={pointUniforms}
          vertexShader={pointVertex}
          fragmentShader={pointFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();
  useFrame((state) => {
    if (reduced) return;
    camera.position.x += (state.pointer.x * 0.28 - camera.position.x) * 0.03;
    camera.position.y += (state.pointer.y * 0.16 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 820px)");
    const sync = () => {
      setReduced(motion.matches);
      setCompact(small.matches);
    };
    sync();
    motion.addEventListener("change", sync);
    small.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 36 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Rig reduced={reduced} />
      <FaceNetwork reduced={reduced} compact={compact} />
    </Canvas>
  );
}
