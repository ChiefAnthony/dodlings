# Dodlings

Dodlings is a Rustlings-style TypeScript CLI for learning programming through data-oriented design.

The exercises use concrete inventory and order examples. They focus on data shape, explicit IDs, batch transforms, indexes, systems, and state transitions.

## Setup

```sh
pnpm install
pnpm dev
```

## Commands

```sh
pnpm dev              # watch the next pending exercise
pnpm dev run orders1 # run one exercise
pnpm dev hint orders1
pnpm dev reset orders1
pnpm dev list
pnpm dev check-all
```

Reference solutions are stored in `solutions/` for validation and authoring. Normal commands do not reveal them.

## Experimenting

Each exercise includes an optional `experiment()` function above the tests:

```ts
export function experiment(): void {
  // You can optionally experiment here.
}
```

`dodlings run` and `dodlings watch` execute `experiment()` before running the exercise tests. Use it like Rustlings' `main` function for quick logs, sample inputs, and scratch checks.
