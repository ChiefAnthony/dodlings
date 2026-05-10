// Events are facts that already happened. Instead of storing only "current
// stock", a backend might store a log:
//
// restock 5 books
// sale 2 books
//
// Folding means replaying those facts into a useful current-state structure.

type InventoryEvent =
  | { type: "restock"; productId: string; quantity: number }
  | { type: "sale"; productId: string; quantity: number };

export function foldInventoryEvents(events: InventoryEvent[]): Map<string, number> {
  // TODO:
  // 1. Create an empty `Map<string, number>` for current stock.
  // 2. Loop through events in order.
  // 3. Read current stock for the event's product id, defaulting to 0.
  // 4. `restock` adds quantity. `sale` subtracts quantity.
  // 5. Store the next quantity back into the map.
  // 6. Return the map.
  //
  // The event records are the source facts. The Map is derived state.
  return new Map();
}

export function experiment(): void {
  // Example:
  // const events: InventoryEvent[] = [
  //   { type: "restock", productId: "book-ts", quantity: 5 },
  //   { type: "sale", productId: "book-ts", quantity: 2 }
  // ];
  // console.log(foldInventoryEvents(events));
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
