type Product = {
  id: string;
  name: string;
  category: "book" | "tool" | "food";
  priceCents: number;
};

const products: Product[] = [
  { id: "book-ts", name: "TypeScript Handbook", category: "book", priceCents: 3200 },
  { id: "tool-caliper", name: "Digital Caliper", category: "tool", priceCents: 2400 },
  { id: "food-coffee", name: "Coffee Beans", category: "food", priceCents: 1800 }
];

export function findProductById(id: string): Product | undefined {
  // TODO: Find the product whose `id` equals the input id.
  return products.find((product) => product.id === id);
}

export function experiment(id: string): Product | undefined {
  for (const product of products) {
    if (product.id === id) {
      return product;
    }
  }
  return undefined
}

// -----------------------------------------------------------------------------
// Tests below. Do not edit tests while solving the exercise.
// -----------------------------------------------------------------------------

describe("flat product records", () => {
  it("finds products by stable id", () => {
    expect(findProductById("tool-caliper")?.name).toBe("Digital Caliper");
  });

  it("does not confuse ids with display names", () => {
    expect(findProductById("Coffee Beans")).toBeUndefined();
  });
});
