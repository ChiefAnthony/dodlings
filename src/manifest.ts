import type { Exercise } from "./types.js";

export const exercises: Exercise[] = [
  {
    slug: "products1",
    title: "Flat product records",
    group: "representation",
    path: "exercises/01_products.test.ts",
    templatePath: "templates/01_products.test.ts",
    solutionPath: "solutions/01_products.test.ts",
    hint: "Keep products as plain records. The lookup should compare `id`, not object identity or display names."
  },
  {
    slug: "totals1",
    title: "Batch order totals",
    group: "transforms",
    path: "exercises/02_totals.test.ts",
    templatePath: "templates/02_totals.test.ts",
    solutionPath: "solutions/02_totals.test.ts",
    hint: "Treat order lines as data. For each line, find its product price and add `priceCents * quantity`."
  },
  {
    slug: "indexes1",
    title: "Build an index by id",
    group: "indexes",
    path: "exercises/03_indexes.test.ts",
    templatePath: "templates/03_indexes.test.ts",
    solutionPath: "solutions/03_indexes.test.ts",
    hint: "A `Map<string, Product>` makes repeated id lookups explicit and avoids scanning the whole array each time."
  },
  {
    slug: "groups1",
    title: "Group lines by product",
    group: "aggregation",
    path: "exercises/04_groups.test.ts",
    templatePath: "templates/04_groups.test.ts",
    solutionPath: "solutions/04_groups.test.ts",
    hint: "Accumulate quantities into a `Map` keyed by product id, then turn that map into sorted result records."
  },
  {
    slug: "systems1",
    title: "Separate data from systems",
    group: "architecture",
    path: "exercises/05_systems.test.ts",
    templatePath: "templates/05_systems.test.ts",
    solutionPath: "solutions/05_systems.test.ts",
    hint: "The system should accept state data and command data, then return new state data. Avoid hiding mutation in product objects."
  },
  {
    slug: "reserve1",
    title: "Reserve stock explicitly",
    group: "state",
    path: "exercises/06_reserve.test.ts",
    templatePath: "templates/06_reserve.test.ts",
    solutionPath: "solutions/06_reserve.test.ts",
    hint: "Validate all requested quantities before changing stock. A failed reservation should return the original stock."
  },
  {
    slug: "events1",
    title: "Fold inventory events",
    group: "events",
    path: "exercises/07_events.test.ts",
    templatePath: "templates/07_events.test.ts",
    solutionPath: "solutions/07_events.test.ts",
    hint: "Start from an empty stock map and apply each event in order. `restock` adds; `sale` subtracts."
  },
  {
    slug: "cache1",
    title: "Derived query cache",
    group: "derived-data",
    path: "exercises/08_cache.test.ts",
    templatePath: "templates/08_cache.test.ts",
    solutionPath: "solutions/08_cache.test.ts",
    hint: "Build derived data from the source arrays. Store ids in the category buckets so the source product records remain canonical."
  }
];

export function findExercise(slug: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.slug === slug);
}
