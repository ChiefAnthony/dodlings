import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { exercises } from "./manifest.js";
import { fromRoot } from "./paths.js";
import type { ExerciseStatus, State } from "./types.js";

const statePath = fromRoot(".dodlings", "state.json");

export function freshState(): State {
  const first = exercises[0];
  if (!first) {
    throw new Error("No exercises are configured");
  }

  return {
    current: first.slug,
    completed: Object.fromEntries(exercises.map((exercise) => [exercise.slug, "pending" satisfies ExerciseStatus])),
    updatedAt: new Date().toISOString()
  };
}

export async function loadState(): Promise<State> {
  try {
    const parsed = JSON.parse(await readFile(statePath, "utf8")) as Partial<State>;
    const base = freshState();
    return {
      current: typeof parsed.current === "string" ? parsed.current : base.current,
      completed: { ...base.completed, ...(parsed.completed ?? {}) },
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : base.updatedAt
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
    const state = freshState();
    await saveState(state);
    return state;
  }
}

export async function saveState(state: State): Promise<void> {
  await mkdir(path.dirname(statePath), { recursive: true });
  await writeFile(statePath, `${JSON.stringify({ ...state, updatedAt: new Date().toISOString() }, null, 2)}\n`);
}

export function nextPending(state: State): string | undefined {
  return exercises.find((exercise) => state.completed[exercise.slug] !== "done")?.slug;
}

export function mark(state: State, slug: string, status: ExerciseStatus): State {
  return {
    ...state,
    current: slug,
    completed: { ...state.completed, [slug]: status }
  };
}
