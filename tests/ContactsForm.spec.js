/* eslint-disable */
import Vue from "vue";
import ContactList from "../src/components/ContactsList";
import ContactsForm from "../src/components/ContactsForm";
import Person from "../src/models/Person";

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe("ContactsForm", () => {
  const cloneContactForm = Vue.extend(ContactList);
  const contactsFormWrapper = new cloneContactForm().$mount();

  // Inspect the raw component options
  it("has a created inherited mounted hook", () => {
    expect(typeof ContactsForm.mounted).toBe("function");
  });

  // Inspect the component instance on mount
  it("correctly populates repo-collection when falling fetch()", async () => {
    let vmContactsForm = contactsFormWrapper.$children[0] || null;
    console.log("vmContactsForm", vmContactsForm);
    expect(vmContactsForm.$options._componentTag).toBe("ContactsForm");
    await vmContactsForm.fetch();
    expect(vmContactsForm.people.length).toBeGreaterThan(0);
  });
});
