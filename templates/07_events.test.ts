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

type StockRecord = {
  productId: string;
  quantity: number;
};

export function inventorySnapshot(events: InventoryEvent[]): StockRecord[] {
  // Part 2:
  // Build on `foldInventoryEvents`.
  //
  // A Map is useful inside the program. APIs and rendered views usually need
  // serializable records with stable ordering.
  //
  // TODO:
  // 1. Fold events into a stock map.
  // 2. Convert the map into `{ productId, quantity }` records.
  // 3. Sort by productId ascending.
  return [];
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

  it("returns an empty stock map for no events", () => {
    expect(foldInventoryEvents([]).size).toBe(0);
  });

  it("allows sales to make stock negative", () => {
    const stock = foldInventoryEvents([{ type: "sale", productId: "book-ts", quantity: 2 }]);
    expect(stock.get("book-ts")).toBe(-2);
  });

  it("builds a sorted serializable inventory snapshot", () => {
    expect(inventorySnapshot([
      { type: "restock", productId: "food-coffee", quantity: 4 },
      { type: "restock", productId: "book-ts", quantity: 5 },
      { type: "sale", productId: "book-ts", quantity: 2 }
    ])).toEqual([
      { productId: "book-ts", quantity: 3 },
      { productId: "food-coffee", quantity: 4 }
    ]);
  });
});
