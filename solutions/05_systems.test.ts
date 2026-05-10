type InventoryState = {
  stockByProductId: Map<string, number>;
};

type ReceiveStock = {
  productId: string;
  quantity: number;
};

export function receiveStock(state: InventoryState, command: ReceiveStock): InventoryState {
  const stockByProductId = new Map(state.stockByProductId);
  stockByProductId.set(command.productId, (stockByProductId.get(command.productId) ?? 0) + command.quantity);
  return { stockByProductId };
}

export function receiveStockBatch(state: InventoryState, commands: ReceiveStock[]): InventoryState {
  let next = state;
  for (const command of commands) {
    next = receiveStock(next, command);
  }
  return next;
}

export function experiment(): void {
  // You can optionally experiment here.
}

// -----------------------------------------------------------------------------
// Tests below. Do not edit tests while solving the exercise.
// -----------------------------------------------------------------------------

describe("separate data from systems", () => {
  it("returns new state data", () => {
    const before = { stockByProductId: new Map([["book-ts", 2]]) };
    const after = receiveStock(before, { productId: "book-ts", quantity: 3 });

    expect(after.stockByProductId.get("book-ts")).toBe(5);
    expect(before.stockByProductId.get("book-ts")).toBe(2);
  });

  it("handles first stock for a product", () => {
    const after = receiveStock({ stockByProductId: new Map() }, { productId: "food-coffee", quantity: 4 });
    expect(after.stockByProductId.get("food-coffee")).toBe(4);
  });

  it("preserves unrelated stock entries", () => {
    const before = {
      stockByProductId: new Map([
        ["book-ts", 2],
        ["food-coffee", 7]
      ])
    };

    const after = receiveStock(before, { productId: "book-ts", quantity: 3 });
    expect(after.stockByProductId.get("food-coffee")).toBe(7);
  });

  it("applies a batch of receive commands in order", () => {
    const before = { stockByProductId: new Map([["book-ts", 1]]) };
    const after = receiveStockBatch(before, [
      { productId: "book-ts", quantity: 2 },
      { productId: "food-coffee", quantity: 4 },
      { productId: "book-ts", quantity: 3 }
    ]);

    expect(after.stockByProductId.get("book-ts")).toBe(6);
    expect(after.stockByProductId.get("food-coffee")).toBe(4);
    expect(before.stockByProductId.get("book-ts")).toBe(1);
  });
});
