// Scanning an array is fine for tiny examples. Real web apps quickly need
// "give me product X" in many places: product pages, cart rows, admin forms.
//
// A Map keyed by id is an index. It changes the data shape from:
// Product[] -> Map<productId, Product>

type Product = {
  id: string;
  name: string;
};

export function indexProductsById(products: Product[]): Map<string, Product> {
  // TODO:
  // 1. Create an empty `Map<string, Product>`.
  // 2. Loop over every product.
  // 3. Store each product with `map.set(product.id, product)`.
  // 4. Return the map.
  //
  // If an id appears twice, the later record should replace the earlier one.
  // That "last write wins" rule is explicit data behavior, not magic.
  return new Map();
}

export function productNamesForIds(products: Product[], ids: string[]): string[] {
  // Part 2:
  // Build an index once, then answer many lookups from it.
  //
  // This is the difference between repeatedly scanning data and preparing a
  // query shape that matches the screen you need to render.
  //
  // TODO:
  // 1. Build the id index with `indexProductsById(products)`.
  // 2. Walk the requested ids in order.
  // 3. Keep only ids that exist in the index.
  // 4. Return the matching product names in the same order as `ids`.
  return [];
}

export function experiment(): void {
  // Example:
  // const index = indexProductsById([{ id: "book-ts", name: "TypeScript Handbook" }]);
  // console.log(index.get("book-ts"));
}

// -----------------------------------------------------------------------------
// Tests below. Do not edit tests while solving the exercise.
// -----------------------------------------------------------------------------

describe("build an index by id", () => {
  it("keeps each product reachable by id", () => {
    const products = [
      { id: "book-ts", name: "TypeScript Handbook" },
      { id: "tool-caliper", name: "Digital Caliper" }
    ];

    const index = indexProductsById(products);
    expect(index.get("tool-caliper")).toEqual(products[1]);
  });

  it("uses the last record when ids repeat", () => {
    const index = indexProductsById([
      { id: "book-ts", name: "Old Name" },
      { id: "book-ts", name: "New Name" }
    ]);

    expect(index.get("book-ts")?.name).toBe("New Name");
  });

  it("returns an empty index for empty input", () => {
    expect(indexProductsById([]).size).toBe(0);
  });

  it("looks up names for requested ids in request order", () => {
    const products = [
      { id: "book-ts", name: "TypeScript Handbook" },
      { id: "tool-caliper", name: "Digital Caliper" },
      { id: "food-coffee", name: "Coffee Beans" }
    ];

    expect(productNamesForIds(products, ["food-coffee", "missing", "book-ts"])).toEqual([
      "Coffee Beans",
      "TypeScript Handbook"
    ]);
  });
});
