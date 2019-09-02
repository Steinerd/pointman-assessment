/* eslint-disable */
import Vue from "vue";
import NamesRepository from "../src/repository/NamesRepository";

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe("NamesRepository", () => {
  // Inspect the raw component options
  it("Has more than one name...", async () => {
    expect((await NamesRepository.get()).length).toBeGreaterThan(0);
  });
});
