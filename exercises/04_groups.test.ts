type OrderLine = {
  productId: string;
  quantity: number;
};

type ProductQuantity = {
  productId: string;
  quantity: number;
};

export function quantityByProduct(lines: OrderLine[]): ProductQuantity[] {
  // TODO: Group quantities by product id.
  // Return records sorted by productId so output is stable.
  return [];
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
});
