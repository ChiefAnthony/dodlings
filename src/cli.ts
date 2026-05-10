#!/usr/bin/env node
import { copyFile } from "node:fs/promises";
import process from "node:process";
import chalk from "chalk";
import chokidar from "chokidar";
import { Command } from "commander";
import { input } from "@inquirer/prompts";
import { exercises, findExercise } from "./manifest.js";
import { fromRoot } from "./paths.js";
import { freshState, loadState, mark, nextPending, saveState } from "./state.js";
import { runExercise } from "./runner.js";
import type { Exercise } from "./types.js";

const watchKeymap = "enter=rerun, h=hint, n=next, p=previous, r=reset, R=reset all, q=quit";

function requireExercise(slug: string | undefined, fallback?: string): Exercise {
  const name = slug ?? fallback;
  if (!name) {
    throw new Error("No pending exercise found");
  }
  const exercise = findExercise(name);
  if (!exercise) {
    throw new Error(`Unknown exercise: ${name}`);
  }
  return exercise;
}

function progressLine(done: number, total: number): string {
  return `${chalk.green(String(done))}/${total} complete`;
}

function keymapLine(): string {
  return chalk.dim(`Keys: ${watchKeymap}`);
}

async function resetExercise(exercise: Exercise): Promise<void> {
  await copyFile(fromRoot(exercise.templatePath), fromRoot(exercise.path));
  const state = await loadState();
  await saveState(mark(state, exercise.slug, "pending"));
}

async function resetAllExercises(): Promise<void> {
  await Promise.all(exercises.map((exercise) => copyFile(fromRoot(exercise.templatePath), fromRoot(exercise.path))));
  await saveState(freshState());
}

async function runAndRecord(exercise: Exercise, options: { silent?: boolean; experiment?: boolean } = {}): Promise<boolean> {
  const result = await runExercise(exercise, options);
  const state = await loadState();
  await saveState(mark(state, exercise.slug, result.ok ? "done" : "pending"));
  return result.ok;
}

async function runCommand(name?: string): Promise<void> {
  const state = await loadState();
  const exercise = requireExercise(name, nextPending(state));
  console.log(chalk.bold(`${exercise.slug}: ${exercise.title}`));
  const ok = await runAndRecord(exercise, { experiment: true });
  if (!ok) {
    process.exitCode = 1;
  }
}

async function listCommand(): Promise<void> {
  const state = await loadState();
  const done = exercises.filter((exercise) => state.completed[exercise.slug] === "done").length;
  console.log(progressLine(done, exercises.length));
  for (const exercise of exercises) {
    const icon = state.completed[exercise.slug] === "done" ? chalk.green("done") : chalk.yellow("todo");
    console.log(`${icon} ${exercise.slug.padEnd(10)} ${exercise.group.padEnd(15)} ${exercise.title}`);
  }
}

async function hintCommand(name?: string): Promise<void> {
  const state = await loadState();
  const exercise = requireExercise(name, nextPending(state));
  console.log(chalk.bold(`${exercise.slug}: ${exercise.title}`));
  console.log(exercise.hint);
}

async function resetCommand(name: string): Promise<void> {
  const exercise = requireExercise(name);
  await resetExercise(exercise);
  console.log(`Reset ${exercise.slug}`);
}

async function resetAllCommand(): Promise<void> {
  await resetAllExercises();
  console.log(`Reset ${exercises.length} exercises and cleared progress`);
}

async function checkAllCommand(): Promise<void> {
  let failures = 0;
  for (const exercise of exercises) {
    process.stdout.write(`${exercise.slug.padEnd(10)} `);
    const ok = await runAndRecord(exercise, { silent: true });
    console.log(ok ? chalk.green("done") : chalk.red("pending"));
    failures += ok ? 0 : 1;
  }
  const state = await loadState();
  const done = exercises.filter((exercise) => state.completed[exercise.slug] === "done").length;
  console.log(progressLine(done, exercises.length));
  if (failures > 0) {
    process.exitCode = 1;
  }
}

async function checkSolutionsCommand(): Promise<void> {
  for (const exercise of exercises) {
    process.stdout.write(`${exercise.slug.padEnd(10)} `);
    const result = await runExercise(exercise, { solution: true, silent: true });
    console.log(result.ok ? chalk.green("ok") : chalk.red("failed"));
    if (!result.ok) {
      process.exitCode = 1;
    }
  }
}

async function watchCommand(initialSlug?: string): Promise<void> {
  let state = await loadState();
  let exercise = requireExercise(initialSlug ?? nextPending(state), state.current);

  const rerun = async () => {
    console.clear();
    state = await loadState();
    const done = exercises.filter((item) => state.completed[item.slug] === "done").length;
    console.log(chalk.bold(`${exercise.slug}: ${exercise.title}`));
    console.log(`${progressLine(done, exercises.length)} | ${exercise.path}`);
    console.log(keymapLine());
    const ok = await runAndRecord(exercise, { experiment: true });
    if (ok) {
      console.log(chalk.green("Exercise passed."));
    }
    console.log(keymapLine());
  };

  const watcher = chokidar.watch(fromRoot(exercise.path), { ignoreInitial: true });
  watcher.on("change", () => {
    void rerun();
  });

  await rerun();

  while (true) {
    const answer = await input({ message: `dodlings (${watchKeymap})` });
    if (answer === "q") {
      await watcher.close();
      return;
    }
    if (answer === "h") {
      console.log(exercise.hint);
      console.log(keymapLine());
      continue;
    }
    if (answer === "r") {
      await resetExercise(exercise);
      console.log(`Reset ${exercise.slug}`);
      await rerun();
      continue;
    }
    if (answer === "R") {
      const confirmation = await input({ message: 'Type "reset all" to reset every exercise and clear progress' });
      if (confirmation === "reset all") {
        await resetAllExercises();
        state = await loadState();
        exercise = requireExercise(nextPending(state), state.current);
        console.log(`Reset ${exercises.length} exercises and cleared progress`);
        await watcher.close();
        return watchCommand(exercise.slug);
      }
      console.log("Reset all cancelled.");
      console.log(keymapLine());
      continue;
    }
    if (answer === "n") {
      const index = exercises.findIndex((item) => item.slug === exercise.slug);
      exercise = exercises[Math.min(index + 1, exercises.length - 1)] ?? exercise;
      await watcher.close();
      return watchCommand(exercise.slug);
    }
    if (answer === "p") {
      const index = exercises.findIndex((item) => item.slug === exercise.slug);
      exercise = exercises[Math.max(index - 1, 0)] ?? exercise;
      await watcher.close();
      return watchCommand(exercise.slug);
    }
    await rerun();
  }
}

const program = new Command();

program
  .name("dodlings")
  .description("Rustlings-style TypeScript exercises for learning through data-oriented design")
  .version("0.1.0")
  .action(() => {
    return watchCommand();
  });

program.command("watch").description("Watch the next pending exercise").action(() => watchCommand());
program.command("run").argument("[name]", "Exercise name").description("Run one exercise").action((name?: string) => runCommand(name));
program.command("check-all").description("Run all learner exercises and update progress").action(() => checkAllCommand());
program.command("hint").argument("[name]", "Exercise name").description("Show a hint").action((name?: string) => hintCommand(name));
program.command("reset").argument("<name>", "Exercise name").description("Reset one exercise").action((name: string) => resetCommand(name));
program.command("reset-all").description("Reset all exercises and clear progress").action(() => resetAllCommand());
program.command("list").description("List exercises and progress").action(() => listCommand());
program.command("dev").command("check-solutions").description("Run reference solutions").action(() => checkSolutionsCommand());

program.parseAsync(process.argv).catch((error: unknown) => {
  console.error(chalk.red(error instanceof Error ? error.message : String(error)));
  process.exitCode = 1;
});
