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
  return lines.reduce((total, line) => {
    const product = products.find((item) => item.id === line.productId);
    return total + (product?.priceCents ?? 0) * line.quantity;
  }, 0);
}

export function experiment(): void {
  // You can optionally experiment here.
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
