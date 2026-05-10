// A lot of application code reshapes streams of facts into summaries.
// Cart lines, analytics events, and database rows often arrive as many records.
// The UI usually needs grouped records.

type OrderLine = {
  productId: string;
  quantity: number;
};

type ProductQuantity = {
  productId: string;
  quantity: number;
};

export function quantityByProduct(lines: OrderLine[]): ProductQuantity[] {
  // TODO:
  // 1. Accumulate quantities in a `Map<string, number>` keyed by product id.
  // 2. Convert the map entries into `{ productId, quantity }` records.
  // 3. Sort by `productId` before returning so output is stable.
  //
  // Input shape:
  // [
  //   { productId: "food-coffee", quantity: 2 },
  //   { productId: "food-coffee", quantity: 3 }
  // ]
  //
  // Output shape:
  // [{ productId: "food-coffee", quantity: 5 }]
  return [];
}

export function experiment(): void {
  // Try changing this data and logging your result:
  // const lines = [
  //   { productId: "food-coffee", quantity: 2 },
  //   { productId: "book-ts", quantity: 1 },
  //   { productId: "food-coffee", quantity: 3 }
  // ];
  // console.log(quantityByProduct(lines));
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
