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
