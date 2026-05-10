// A cart is not a list of Product objects. It is usually a list of references:
// "this product id, this quantity". That keeps the cart small and lets product
// data live in one canonical place.

type Product = {
  id: string;
  priceCents: number;
};

type OrderLine = {
  productId: string;
  quantity: number;
};

const products: Product[] = [
  { id: "book-ts", priceCents: 3200 },
  { id: "tool-caliper", priceCents: 2400 },
  { id: "food-coffee", priceCents: 1800 }
];

export function orderTotalCents(lines: OrderLine[]): number {
  // TODO:
  // 1. Start with a total of 0.
  // 2. For each order line, find the product whose `id` matches `productId`.
  // 3. If the product exists, add `priceCents * quantity` to the total.
  // 4. If the product is missing, ignore that line.
  //
  // The important shape is:
  // Product[] + OrderLine[] -> number
  //
  // This is the same kind of batch transform a checkout page performs before
  // rendering "subtotal: $68.00".
  return 0;
}

type OrderSummary = {
  acceptedLineCount: number;
  ignoredLineCount: number;
  totalCents: number;
};

export function summarizeOrder(lines: OrderLine[]): OrderSummary {
  // Part 2:
  // Build on `orderTotalCents`, but also report what happened to the input.
  //
  // Checkout UIs often need both the final total and enough metadata to explain
  // why some submitted lines were ignored.
  //
  // TODO:
  // 1. Count lines whose product id exists in `products`.
  // 2. Count lines whose product id does not exist.
  // 3. Use `orderTotalCents(lines)` for the total.
  return { acceptedLineCount: 0, ignoredLineCount: 0, totalCents: 0 };
}

export function experiment(): void {
  // Example:
  // const cart = [
  //   { productId: "book-ts", quantity: 1 },
  //   { productId: "food-coffee", quantity: 2 }
  // ];
  // console.log(orderTotalCents(cart));
}

// -----------------------------------------------------------------------------
// Tests below. Do not edit tests while solving the exercise.
// -----------------------------------------------------------------------------

describe("batch order totals", () => {
  it("totals repeated order lines", () => {
    expect(orderTotalCents([
      { productId: "book-ts", quantity: 1 },
      { productId: "food-coffee", quantity: 2 }
    ])).toBe(6800);
  });

  it("ignores unknown product ids", () => {
    expect(orderTotalCents([{ productId: "missing", quantity: 99 }])).toBe(0);
  });

  it("returns zero for an empty cart", () => {
    expect(orderTotalCents([])).toBe(0);
  });

  it("summarizes accepted and ignored order lines", () => {
    expect(summarizeOrder([
      { productId: "book-ts", quantity: 1 },
      { productId: "missing", quantity: 5 },
      { productId: "food-coffee", quantity: 2 }
    ])).toEqual({
      acceptedLineCount: 2,
      ignoredLineCount: 1,
      totalCents: 6800
    });
  });
});
