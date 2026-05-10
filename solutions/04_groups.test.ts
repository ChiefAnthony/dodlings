type OrderLine = {
  productId: string;
  quantity: number;
};

type ProductQuantity = {
  productId: string;
  quantity: number;
};

export function quantityByProduct(lines: OrderLine[]): ProductQuantity[] {
  const totals = new Map<string, number>();
  for (const line of lines) {
    totals.set(line.productId, (totals.get(line.productId) ?? 0) + line.quantity);
  }

  return [...totals.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([productId, quantity]) => ({ productId, quantity }));
}

export function topProductsByQuantity(lines: OrderLine[], limit: number): ProductQuantity[] {
  return quantityByProduct(lines)
    .sort((left, right) => right.quantity - left.quantity || left.productId.localeCompare(right.productId))
    .slice(0, limit);
}

export function experiment(): void {
  // You can optionally experiment here.
}

// -----------------------------------------------------------------------------
// Tests below. Do not edit tests while solving the exercise.
// -----------------------------------------------------------------------------

describe("group lines by product", () => {
  it("combines quantities for repeated product ids", () => {
    expect(quantityByProduct([
      { productId: "food-coffee", quantity: 2 },
      { productId: "book-ts", quantity: 1 },
      { productId: "food-coffee", quantity: 3 }
    ])).toEqual([
      { productId: "book-ts", quantity: 1 },
      { productId: "food-coffee", quantity: 5 }
    ]);
  });

  it("returns an empty summary for no lines", () => {
    expect(quantityByProduct([])).toEqual([]);
  });

  it("returns top products by quantity with stable ties", () => {
    expect(topProductsByQuantity([
      { productId: "food-coffee", quantity: 2 },
      { productId: "book-ts", quantity: 5 },
      { productId: "tool-caliper", quantity: 5 },
      { productId: "food-coffee", quantity: 4 }
    ], 2)).toEqual([
      { productId: "food-coffee", quantity: 6 },
      { productId: "book-ts", quantity: 5 }
    ]);
  });
});
