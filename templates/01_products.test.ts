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

type ProductDetail = {
  id: string;
  title: string;
  category: string;
  priceLabel: string;
};

export function productDetailForRoute(id: string): ProductDetail | undefined {
  // Part 2:
  // Build on `findProductById`.
  //
  // A route handler rarely returns the raw database record directly. It usually
  // reshapes canonical data into a view model for the page or API response.
  //
  // TODO:
  // 1. Find the product by route id.
  // 2. Return undefined if it does not exist.
  // 3. Return a ProductDetail with:
  //    - id copied from the product
  //    - title copied from product.name
  //    - category copied from product.category
  //    - priceLabel formatted as dollars, like "$24.00"
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
