// Web apps often need multiple read shapes for the same source data:
//
// - product detail page: lookup one product by id
// - category page: list active product ids for one category
// - admin page: still keep inactive product records around
//
// Keep one canonical record store, then build derived indexes for queries.

type Product = {
  id: string;
  category: string;
  active: boolean;
};

type ProductCache = {
  byId: Map<string, Product>;
  activeIdsByCategory: Map<string, string[]>;
};

export function buildProductCache(products: Product[]): ProductCache {
  // TODO:
  // 1. Create `byId`, a Map from product id to the full Product record.
  // 2. Create `activeIdsByCategory`, a Map from category to product ids.
  // 3. Loop through all products.
  // 4. Every product goes into `byId`.
  // 5. Only active products add their id to their category bucket.
  // 6. Return both maps in a ProductCache object.
  //
  // Notice that category buckets store ids, not whole Product copies. This keeps
  // the product record canonical and avoids duplicated stale data.
  return {
    byId: new Map(),
    activeIdsByCategory: new Map()
  };
}

export function experiment(): void {
  // Example:
  // const cache = buildProductCache([
  //   { id: "book-ts", category: "book", active: true },
  //   { id: "book-old", category: "book", active: false }
  // ]);
  // console.log(cache.byId, cache.activeIdsByCategory);
}

// -----------------------------------------------------------------------------
// Tests below. Do not edit tests while solving the exercise.
// -----------------------------------------------------------------------------

describe("derived query cache", () => {
  it("keeps canonical records and active category ids", () => {
    const products = [
      { id: "book-ts", category: "book", active: true },
      { id: "book-old", category: "book", active: false },
      { id: "food-coffee", category: "food", active: true }
    ];

    const cache = buildProductCache(products);
    expect(cache.byId.get("book-ts")).toEqual(products[0]);
    expect(cache.activeIdsByCategory.get("book")).toEqual(["book-ts"]);
    expect(cache.activeIdsByCategory.get("food")).toEqual(["food-coffee"]);
  });
});
