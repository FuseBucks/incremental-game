/* 
Watch this for Jest basic syntax and more in-depth explanation on how jest works

https://www.youtube.com/watch?v=l6C-nRG83pQ

*/

//  Basic placeholder tests
describe("Sample Test Output", () => {
  it("Test 1 (placeholder)", () => {
    expect(true).toBe(true);
  });

  it("Test 2 (placeholder)", () => {
    expect(true).toBe(true);
  });
});

// Testing a simple function
function add(a: number, b: number) {
  return a + b;
}

describe("Math utilities", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});

// Testing strings
describe("String utilities", () => {
  it("should uppercase text", () => {
    expect("hello".toUpperCase()).toBe("HELLO");
  });

  it("should trim spaces", () => {
    expect(" hello ".trim()).toBe("hello");
  });
});

//  Arrays & objects
describe("Collections", () => {
  it("should contain items", () => {
    expect([1, 2, 3]).toContain(2);
  });

  it("should match object structure", () => {
    expect({ name: "Firefly", age: 21 }).toMatchObject({ name: "Firefly" });
  });
});

// Async / Promises
describe("Async tests", () => {
  it("should resolve a promise", async () => {
    const data = await Promise.resolve("banana");
    expect(data).toBe("banana");
  });
});

//  Mock functions
describe("Mock functions", () => {
  it("should call a mock function with correct args", () => {
    const mockFn = jest.fn();
    mockFn("hi");

    expect(mockFn).toHaveBeenCalledWith("hi");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
