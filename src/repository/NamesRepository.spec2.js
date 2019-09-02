import Vue from "vue";
import NamesRepository from "./NamesRepository";
import { describe, it, expect, test } from "jest";

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe("ContactList", () => {
  // Inspect the raw component options
  it("has a created hook", () => {
    expect(typeof NamesRepository.created).toBe("function");
  });

  // Evaluate the results of functions in
  // the raw component options
  it("sets the correct default data", () => {
    expect(typeof NamesRepository.data).toBe("function");
    const defaultData = NamesRepository.data();
    expect(NamesRepository.message).toBe("hello!");
  });

  // Inspect the component instance on mount
  it("correctly sets the message when created", () => {
    const vm = new Vue(ContactList).$mount();
    expect(vm.message).toBe("bye!");
  });

  // Mount an instance and inspect the render output
  it("renders the correct message", () => {
    const Constructor = Vue.extend(ContactList);
    const vm = new Constructor().$mount();
    expect(vm.$el.textContent).toBe("bye!");
  });
});
