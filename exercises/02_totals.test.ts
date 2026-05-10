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
});
