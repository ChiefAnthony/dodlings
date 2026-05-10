import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceDir = path.dirname(fileURLToPath(import.meta.url));

export function projectRoot(): string {
  return path.resolve(sourceDir, "..");
}

export function fromRoot(...parts: string[]): string {
  return path.join(projectRoot(), ...parts);
}
