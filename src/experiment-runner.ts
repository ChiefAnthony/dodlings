import path from "node:path";
import { pathToFileURL } from "node:url";
import { fromRoot } from "./paths.js";

type ExerciseModule = {
  experiment?: unknown;
};

export async function runExperimentFile(filePath: string): Promise<boolean> {
  const absolutePath = path.isAbsolute(filePath) ? filePath : fromRoot(filePath);

  Object.assign(globalThis, {
    describe: () => undefined,
    it: () => undefined,
    test: () => undefined,
    expect: () => undefined
  });

  const module = (await import(pathToFileURL(absolutePath).href)) as ExerciseModule;
  if (module.experiment === undefined) {
    return false;
  }
  if (typeof module.experiment !== "function") {
    throw new TypeError("Expected exported `experiment` to be a function");
  }

  await module.experiment();
  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: experiment-runner <exercise-file>");
    process.exitCode = 1;
  } else {
    runExperimentFile(filePath).catch((error: unknown) => {
      console.error(error instanceof Error ? error.message : String(error));
      process.exitCode = 1;
    });
  }
}
