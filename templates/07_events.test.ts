type InventoryEvent =
  | { type: "restock"; productId: string; quantity: number }
  | { type: "sale"; productId: string; quantity: number };

export function foldInventoryEvents(events: InventoryEvent[]): Map<string, number> {
  // TODO: Apply events in order and return final stock by product id.
  return new Map();
}

export function experiment(): void {
  // You can optionally experiment here.
}

// -----------------------------------------------------------------------------
// Tests below. Do not edit tests while solving the exercise.
// -----------------------------------------------------------------------------

describe("fold inventory events", () => {
  it("builds current stock from an event log", () => {
    const stock = foldInventoryEvents([
      { type: "restock", productId: "book-ts", quantity: 5 },
      { type: "sale", productId: "book-ts", quantity: 2 },
      { type: "restock", productId: "food-coffee", quantity: 4 }
    ]);

    expect(stock.get("book-ts")).toBe(3);
    expect(stock.get("food-coffee")).toBe(4);
  });
});
