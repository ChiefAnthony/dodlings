export type Exercise = {
  slug: string;
  title: string;
  group: string;
  path: string;
  templatePath: string;
  solutionPath: string;
  hint: string;
};

export type ExerciseStatus = "pending" | "done";

export type State = {
  current: string;
  completed: Record<string, ExerciseStatus>;
  updatedAt: string;
};

export type RunResult = {
  ok: boolean;
  code: number | null;
};
