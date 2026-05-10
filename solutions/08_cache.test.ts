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
  const byId = new Map<string, Product>();
  const activeIdsByCategory = new Map<string, string[]>();

  for (const product of products) {
    byId.set(product.id, product);
    if (product.active) {
      const ids = activeIdsByCategory.get(product.category) ?? [];
      ids.push(product.id);
      activeIdsByCategory.set(product.category, ids);
    }
  }

  return { byId, activeIdsByCategory };
}

export function activeProductsForCategory(cache: ProductCache, category: string): Product[] {
  const products: Product[] = [];
  for (const id of cache.activeIdsByCategory.get(category) ?? []) {
    const product = cache.byId.get(id);
    if (product) {
      products.push(product);
    }
  }
  return products;
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

  it("groups multiple active ids in insertion order", () => {
    const cache = buildProductCache([
      { id: "book-ts", category: "book", active: true },
      { id: "book-ddd", category: "book", active: true }
    ]);

    expect(cache.activeIdsByCategory.get("book")).toEqual(["book-ts", "book-ddd"]);
  });

  it("does not create active buckets for inactive products", () => {
    const cache = buildProductCache([{ id: "book-old", category: "book", active: false }]);
    expect(cache.byId.has("book-old")).toBe(true);
    expect(cache.activeIdsByCategory.has("book")).toBe(false);
  });

  it("hydrates active category ids from canonical records", () => {
    const products = [
      { id: "book-ts", category: "book", active: true },
      { id: "book-ddd", category: "book", active: true },
      { id: "food-coffee", category: "food", active: true }
    ];
    const cache = buildProductCache(products);

    expect(activeProductsForCategory(cache, "book")).toEqual([products[0], products[1]]);
  });

  it("returns an empty list for categories without active ids", () => {
    const cache = buildProductCache([{ id: "book-old", category: "book", active: false }]);
    expect(activeProductsForCategory(cache, "book")).toEqual([]);
  });
});
