import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { runExperimentFile } from "../src/experiment-runner.js";

const tempDirs: string[] = [];

async function tempExercise(source: string): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "dodlings-experiment-"));
  tempDirs.push(dir);
  const file = path.join(dir, `${crypto.randomUUID()}.test.ts`);
  await writeFile(file, source);
  return file;
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("experiment runner", () => {
  it("runs an exported experiment without running tests", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const file = await tempExercise(`
      export function experiment(): void {
        console.log("scratch output");
      }

      describe("ignored tests", () => {
        it("does not run", () => {
          throw new Error("test body should not run");
        });
      });
    `);

    await expect(runExperimentFile(file)).resolves.toBe(true);
    expect(log).toHaveBeenCalledWith("scratch output");
  });

  it("skips files without experiments", async () => {
    const file = await tempExercise(`
      export function answer(): number {
        return 42;
      }

      describe("ignored tests", () => {});
    `);

    await expect(runExperimentFile(file)).resolves.toBe(false);
  });

  it("fails when experiment throws", async () => {
    const file = await tempExercise(`
      export function experiment(): void {
        throw new Error("broken scratch code");
      }
    `);

    await expect(runExperimentFile(file)).rejects.toThrow("broken scratch code");
  });
});
