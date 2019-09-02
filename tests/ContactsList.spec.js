/* eslint-disable */
import Vue, { Component } from "vue";
import ContactList from "../src/components/ContactsList";
import Person from "../src/models/Person";

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe("ContactList", () => {
  const cloneContactList = Vue.extend(ContactList);
  const contactListWrapper = new cloneContactList().$mount();

  // Inspect the raw component options
  it("has a created mounted hook", () => {
    console.log("wrapper", contactListWrapper);
    expect(contactListWrapper.$options.name).toBe("ContactsList");
  });

  // Evaluate the results of functions in
  // the raw component options
  it("sets the correct default data", () => {
    expect(typeof ContactList.data).toBe("function");
    const defaultData = ContactList.data();
    expect(defaultData.isLoading).toBe(false);
    expect(defaultData.selected).toBeInstanceOf(Person);
    expect(defaultData.people).toHaveLength(0);
  });

  // Inspect the component instance on mount
  it("correctly populates repo-collection when falling fetch()", async () => {
    //const vm = new Vue(ContactList).$mount();
    //await vm.fetch();
    //expect(vm.people.length).toBeGreaterThan(0);
  });
});
