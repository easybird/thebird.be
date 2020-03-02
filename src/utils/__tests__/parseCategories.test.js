import { parseCategories } from "../parseCategories";

describe("Parse Categories separated by comma", () => {
  it("should return all categories", () => {
    expect(parseCategories("kids en bergen, wandelen")).toEqual(["kids en bergen", "wandelen"]);
  });
});

describe("Parse Category", () => {
  it("should return one category in an array", () => {
    expect(parseCategories("kids en bergen")).toEqual(["kids en bergen"]);
  });
});

describe("Parse null", () => {
  it("should return empty array", () => {
    expect(parseCategories()).toEqual([]);
  });
});
