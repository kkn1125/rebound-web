import { describe, it, expect } from "vitest";
import { fakerKO as faker } from "@faker-js/faker";

describe("Main test", () => {
  it("Unit test - get random desc", () => {
    for (let i = 0; i < 3; i++) {
      const paragraph = faker.lorem.words(10);
      console.log(paragraph);
      console.log("======================");
    }
    expect(1).toBeDefined();
  });
});
