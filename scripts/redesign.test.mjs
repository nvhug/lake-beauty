import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const globalsCss = readFileSync(path.join(root, "app/globals.css"), "utf8");
const layoutTsx = readFileSync(path.join(root, "app/layout.tsx"), "utf8");
const heroTsx = readFileSync(path.join(root, "components/hero/Hero.tsx"), "utf8");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

test("globals.css has no leftover old accent colors", () => {
  assert.doesNotMatch(globalsCss, /#d9694f/i);
  assert.doesNotMatch(globalsCss, /#f0a894/i);
});

test("globals.css has no leftover serif font reference", () => {
  assert.doesNotMatch(globalsCss, /--serif/);
  assert.doesNotMatch(globalsCss, /font-serif/);
});

test("globals.css defines the new nature-modern tokens", () => {
  assert.match(globalsCss, /--canvas:\s*#f5f3ec/i);
  assert.match(globalsCss, /--moss:\s*#5e7350/i);
});

test("layout.tsx does not load the Bodoni Moda serif font", () => {
  assert.doesNotMatch(layoutTsx, /Bodoni_Moda/);
});

test("Hero.tsx no longer imports HeroScene or any three.js module", () => {
  assert.doesNotMatch(heroTsx, /HeroScene/);
  assert.doesNotMatch(heroTsx, /["']three["']/);
  assert.doesNotMatch(heroTsx, /@react-three/);
});

test("HeroScene.tsx has been deleted", () => {
  assert.equal(existsSync(path.join(root, "components/hero/HeroScene.tsx")), false);
});

test("three.js dependencies are removed from package.json", () => {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  assert.equal("three" in deps, false);
  assert.equal("@react-three/fiber" in deps, false);
  assert.equal("@react-three/drei" in deps, false);
});
