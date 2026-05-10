type Stock = Map<string, number>;

type Reservation = {
  productId: string;
  quantity: number;
};

type ReservationResult =
  | { ok: true; stock: Stock }
  | { ok: false; stock: Stock; reason: string };

export function reserveStock(stock: Stock, reservations: Reservation[]): ReservationResult {
  // TODO: If every reservation can be fulfilled, return ok with updated stock.
  // If any reservation cannot be fulfilled, return not ok and the original stock.
  return { ok: false, stock, reason: "not implemented" };
}

export function experiment(): void {
  // You can optionally experiment here.
}

// -----------------------------------------------------------------------------
// Tests below. Do not edit tests while solving the exercise.
// -----------------------------------------------------------------------------

describe("reserve stock explicitly", () => {
  it("reserves stock after validating all lines", () => {
    const stock = new Map([
      ["book-ts", 3],
      ["food-coffee", 5]
    ]);

    const result = reserveStock(stock, [
      { productId: "book-ts", quantity: 2 },
      { productId: "food-coffee", quantity: 1 }
    ]);

    expect(result.ok).toBe(true);
    expect(result.stock.get("book-ts")).toBe(1);
    expect(stock.get("book-ts")).toBe(3);
  });

  it("leaves stock unchanged when a line cannot be fulfilled", () => {
    const stock = new Map([["book-ts", 1]]);
    const result = reserveStock(stock, [{ productId: "book-ts", quantity: 2 }]);

    expect(result.ok).toBe(false);
    expect(result.stock).toBe(stock);
    expect(result.stock.get("book-ts")).toBe(1);
  });
});
