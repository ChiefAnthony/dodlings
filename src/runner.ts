import { spawn } from "node:child_process";
import type { Exercise, RunResult } from "./types.js";

function runProcess(args: string[], silent: boolean): Promise<RunResult> {
  const child = spawn("pnpm", ["exec", ...args], {
    stdio: silent ? "pipe" : "inherit",
    shell: process.platform === "win32"
  });

  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("close", (code) => resolve({ ok: code === 0, code }));
  });
}

export async function runExperiment(exercise: Exercise, options: { silent?: boolean } = {}): Promise<RunResult> {
  return runProcess(["tsx", "src/experiment-runner.ts", exercise.path], options.silent ?? false);
}

export async function runExercise(exercise: Exercise, options: { solution?: boolean; silent?: boolean; experiment?: boolean } = {}): Promise<RunResult> {
  const file = options.solution ? exercise.solutionPath : exercise.path;
  const silent = options.silent ?? false;

  if (options.experiment && !options.solution) {
    const experiment = await runExperiment(exercise, { silent });
    if (!experiment.ok) {
      return experiment;
    }
  }

  return runProcess(["vitest", "run", file, "--config", "vitest.exercise.config.ts"], silent);
}
