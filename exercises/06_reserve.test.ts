// Many bugs come from changing state before checking whether the whole command
// is valid. Data-oriented code often makes the phases explicit:
//
// 1. Validate all input data against current state.
// 2. If validation passes, build the next state.
// 3. If validation fails, return the original state plus a reason.

type Stock = Map<string, number>;

type Reservation = {
  productId: string;
  quantity: number;
};

type ReservationResult =
  | { ok: true; stock: Stock }
  | { ok: false; stock: Stock; reason: string };

export function reserveStock(stock: Stock, reservations: Reservation[]): ReservationResult {
  // TODO:
  // 1. First loop: total requested quantity per product id.
  // 2. Check every requested total against the original stock.
  //    Missing products count as 0 available.
  // 3. If any reservation asks for more than available, return:
  //    { ok: false, stock, reason: `insufficient stock for ${productId}` }
  // 4. Second loop: copy the stock Map and subtract each reservation.
  // 5. Return { ok: true, stock: copiedAndUpdatedStock }.
  //
  // The failed result must return the same Map object it received. That lets a
  // caller keep using the current state without guessing how far the command got.
  return { ok: false, stock, reason: "not implemented" };
}

type ReservationReport =
  | { ok: true; stock: Stock; reservedProductIds: string[] }
  | { ok: false; stock: Stock; reservedProductIds: string[]; reason: string };

export function reserveStockWithReport(stock: Stock, reservations: Reservation[]): ReservationReport {
  // Part 2:
  // Build on `reserveStock`.
  //
  // Application commands often need a small read model for logs, analytics, or
  // UI feedback in addition to the next state.
  //
  // TODO:
  // 1. Call `reserveStock(stock, reservations)`.
  // 2. Build a sorted, unique list of requested product ids.
  // 3. If reservation failed, return the original failure reason and stock.
  // 4. If reservation passed, return the updated stock and product id list.
  return { ok: false, stock, reservedProductIds: [], reason: "not implemented" };
}

export function experiment(): void {
  // Example:
  // const stock = new Map([["book-ts", 3]]);
  // console.log(reserveStock(stock, [{ productId: "book-ts", quantity: 2 }]));
  // console.log(reserveStock(stock, [{ productId: "book-ts", quantity: 9 }]));
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
