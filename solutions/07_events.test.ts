type InventoryEvent =
  | { type: "restock"; productId: string; quantity: number }
  | { type: "sale"; productId: string; quantity: number };

export function foldInventoryEvents(events: InventoryEvent[]): Map<string, number> {
  const stock = new Map<string, number>();
  for (const event of events) {
    const current = stock.get(event.productId) ?? 0;
    const next = event.type === "restock" ? current + event.quantity : current - event.quantity;
    stock.set(event.productId, next);
  }
  return stock;
}

type StockRecord = {
  productId: string;
  quantity: number;
};

export function inventorySnapshot(events: InventoryEvent[]): StockRecord[] {
  return [...foldInventoryEvents(events).entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([productId, quantity]) => ({ productId, quantity }));
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
