type Product = {
  id: string;
  name: string;
};

export function indexProductsById(products: Product[]): Map<string, Product> {
  const index = new Map<string, Product>();
  for (const product of products) {
    index.set(product.id, product);
  }
  return index;
}

export function experiment(): void {
  // You can optionally experiment here.
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
});
