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
  // TODO: Build a canonical by-id map and derived category buckets.
  // Only active products should appear in activeIdsByCategory.
  return {
    byId: new Map(),
    activeIdsByCategory: new Map()
  };
}

export function experiment(): void {
  // You can optionally experiment here.
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
