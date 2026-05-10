type Stock = Map<string, number>;

type Reservation = {
  productId: string;
  quantity: number;
};

type ReservationResult =
  | { ok: true; stock: Stock }
  | { ok: false; stock: Stock; reason: string };

export function reserveStock(stock: Stock, reservations: Reservation[]): ReservationResult {
  const requestedByProductId = new Map<string, number>();
  for (const reservation of reservations) {
    requestedByProductId.set(
      reservation.productId,
      (requestedByProductId.get(reservation.productId) ?? 0) + reservation.quantity
    );
  }

  for (const [productId, requested] of requestedByProductId) {
    const available = stock.get(productId) ?? 0;
    if (available < requested) {
      return { ok: false, stock, reason: `insufficient stock for ${productId}` };
    }
  }

  const next = new Map(stock);
  for (const reservation of reservations) {
    next.set(reservation.productId, (next.get(reservation.productId) ?? 0) - reservation.quantity);
  }

  return { ok: true, stock: next };
}

type ReservationReport =
  | { ok: true; stock: Stock; reservedProductIds: string[] }
  | { ok: false; stock: Stock; reservedProductIds: string[]; reason: string };

export function reserveStockWithReport(stock: Stock, reservations: Reservation[]): ReservationReport {
  const result = reserveStock(stock, reservations);
  const reservedProductIds = [...new Set(reservations.map((reservation) => reservation.productId))].sort();

  if (!result.ok) {
    return {
      ok: false,
      stock: result.stock,
      reservedProductIds,
      reason: result.reason
    };
  }

  return {
    ok: true,
    stock: result.stock,
    reservedProductIds
  };
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

  it("rejects repeated reservations that exceed total stock", () => {
    const stock = new Map([["book-ts", 3]]);
    const result = reserveStock(stock, [
      { productId: "book-ts", quantity: 2 },
      { productId: "book-ts", quantity: 2 }
    ]);

    expect(result.ok).toBe(false);
    expect(result.stock).toBe(stock);
    expect(result.stock.get("book-ts")).toBe(3);
  });

  it("reports unique reserved product ids on success", () => {
    const stock = new Map([
      ["book-ts", 5],
      ["food-coffee", 3]
    ]);

    const result = reserveStockWithReport(stock, [
      { productId: "food-coffee", quantity: 1 },
      { productId: "book-ts", quantity: 2 },
      { productId: "book-ts", quantity: 1 }
    ]);

    expect(result.ok).toBe(true);
    expect(result.reservedProductIds).toEqual(["book-ts", "food-coffee"]);
    expect(result.stock.get("book-ts")).toBe(2);
  });
});
