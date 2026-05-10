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

type OrderSummary = {
  acceptedLineCount: number;
  ignoredLineCount: number;
  totalCents: number;
};

export function summarizeOrder(lines: OrderLine[]): OrderSummary {
  let acceptedLineCount = 0;
  let ignoredLineCount = 0;

  for (const line of lines) {
    if (products.some((product) => product.id === line.productId)) {
      acceptedLineCount += 1;
    } else {
      ignoredLineCount += 1;
    }
  }

  return {
    acceptedLineCount,
    ignoredLineCount,
    totalCents: orderTotalCents(lines)
  };
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
