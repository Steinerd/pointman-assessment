<template>
  <div class="container" id="names-wrapper">
    <div class="row">
      <h1 class="col-sm-12 text-center">Contact List</h1>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <ul class="list-group-item" id="names">
          <li
            class="list-group-item"
            :key="person.id"
            :class="selected.id === person.id ? 'active' : ''"
            @click="select(person)"
            v-for="person in people"
          >
            <span>{{person.first_name}} {{person.last_name}} [Age: {{person.age}}]</span>
          </li>
        </ul>
      </div>
      <div class="col-sm-6">
        <figure class="figure">
          <figcaption class="figure-caption">Add/Edit Person</figcaption>
          <ContactsForm/>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import PeopleRepository from "../repository/NamesRepository";
import Person from "../models/Person";
import ResponseStruct from "../models/ResponseStruct";
import ContactsForm from "./ContactsForm";
import $ from "jquery";

export default {
  name: "ContactsList",
  components: {
    ContactsForm: ContactsForm
  },
  data() {
    return {
      isLoading: false,
      /** @type {Array<Person>}*/ people: [],
      /** @type {Person}*/ selected: new Person()
    };
  },
  methods: {
    /**
     * Fetches the data from the names service.
     * @async
     */
    async fetch() {
      /** @type {Array<Person>} */
      let names = [];

      this.isLoading = true;
      names = await PeopleRepository.get();
      this.isLoading = false;

      this.people = names;
    },

    /**
     * Selects a person from the existing list to update.
     * @param {Person} person
     */
    async select(person) {
      if (person) {
        person.dob = this._getFormattedDate(person.dob) || person.dob;
        this.selected = person;
      }
    },
    /**
     * Format a Date object for the date inpute formatting
     * @private
     * @returns {string}
     */
    _getFormattedDate(date) {
      var local = new Date(date);
      local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
      return local.toJSON().slice(0, 10);
    }
  },
  /**
   * Vue::mounted event.
   */
  async mounted() {
    await this.fetch();
  }
};
</script>

<style scoped>
ul li:hover:not(.active) {
  background: #f2f2f2;
  cursor: pointer;
}
</style>