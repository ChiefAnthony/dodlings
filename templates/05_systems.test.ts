// Data-oriented design separates state data from the systems that change it.
//
// Instead of putting methods on Product objects, write a function that accepts:
// current state data + command data -> next state data
//
// This is close to reducers in frontend apps and command handlers in backends.

type InventoryState = {
  stockByProductId: Map<string, number>;
};

type ReceiveStock = {
  productId: string;
  quantity: number;
};

export function receiveStock(state: InventoryState, command: ReceiveStock): InventoryState {
  // TODO:
  // 1. Copy `state.stockByProductId` into a new Map.
  // 2. Read the current quantity for `command.productId`, defaulting to 0.
  // 3. Store current + command.quantity in the copied Map.
  // 4. Return a new InventoryState object that uses the copied Map.
  //
  // Do not mutate the input state's Map. Tests check that `before` still has
  // its old value after the system returns `after`.
  return state;
}

export function experiment(): void {
  // Example:
  // const before = { stockByProductId: new Map([["book-ts", 2]]) };
  // const after = receiveStock(before, { productId: "book-ts", quantity: 3 });
  // console.log(before.stockByProductId.get("book-ts"), after.stockByProductId.get("book-ts"));
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
});
