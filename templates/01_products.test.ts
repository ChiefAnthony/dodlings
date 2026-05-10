// Data-oriented programs start by deciding what facts exist.
// In a web shop, the product card, cart line, database row, and API response
// should all agree on one stable identity: the product id.
//
// The user-facing name can change. The id is what other records point at.

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
  // TODO:
  // 1. Walk through the `products` array.
  // 2. Compare each product's stable `id` with the input `id`.
  // 3. Return the matching product record, or undefined when no record matches.
  //
  // This mirrors a common web-development flow:
  // route `/products/tool-caliper` -> id `"tool-caliper"` -> product data.
  return undefined;
}

export function experiment(): void {
  // Use this like Rustlings' `main`: try quick calls while learning.
  // console.log(findProductById("tool-caliper"));
  // console.log(findProductById("Coffee Beans"));
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
