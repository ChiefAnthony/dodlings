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
  return products.find((product) => product.id === id);
}

type ProductDetail = {
  id: string;
  title: string;
  category: string;
  priceLabel: string;
};

export function productDetailForRoute(id: string): ProductDetail | undefined {
  const product = findProductById(id);
  if (!product) {
    return undefined;
  }

  return {
    id: product.id,
    title: product.name,
    category: product.category,
    priceLabel: `$${(product.priceCents / 100).toFixed(2)}`
  };
}

export function experiment(): void {
  // You can optionally experiment here.
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

  it("returns undefined for unknown ids", () => {
    expect(findProductById("tool")).toBeUndefined();
  });

  it("builds a route detail view from the product record", () => {
    expect(productDetailForRoute("tool-caliper")).toEqual({
      id: "tool-caliper",
      title: "Digital Caliper",
      category: "tool",
      priceLabel: "$24.00"
    });
  });

  it("returns undefined for missing route details", () => {
    expect(productDetailForRoute("missing")).toBeUndefined();
  });
});
