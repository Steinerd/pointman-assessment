<template>
  <div id="names-wrapper">
    <h1>Contact List</h1>
    <ul id="names">
      <li
        v-for="person in people"
        :key="person.id"
        :class="selected.id === person.id ? 'selected' : ''"
        @click="select(person)"
      >
        <span>{{person.first_name}} {{person.last_name}}</span>
      </li>
    </ul>
    <hr>
    <form>
      <fieldset id="add-new">
        <legend>Add New Person</legend>
        <span>
          <label for="first_name">First Name:</label>
          <input type="text" id="first_name" name="first_name" v-model.trim="selected.first_name">
        </span>
        &nbsp;&nbsp;
        <span>
          <label for="last_name">Last Name:</label>
          <input type="text" id="last_name" name="last_name" v-model.trim="selected.last_name">
        </span>
        <div id="button-wrapper">
          <button id="clear" name="clear" type="reset" @click="clear">Clear</button>
          <button id="add-update" name="add-update" type="button" @click="upsert">
            <span v-if="selected.id > -1">Update</span>
            <span v-else>Add</span>
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import PeopleRepository from "../repository/NamesRepository";
import Person from "../models/Person";

export default {
  name: "ContactsList",
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
     * Updates or interts a new person.
     */
    async upsert() {
      console.log(this.selected);
      await PeopleRepository.set(this.selected);
    },
    /**
     * Selects a person from the existing list to update.
     * @param {Person} person
     */
    async select(person) {
      if (person) {
        this.selected = person;
      }
      console.log({ person });
    },
    async clear() {
      this.selected = new Person();
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

ul {
  list-style: disc;
}

ul li {
  padding: 5px;
}

ul li:hover {
  text-decoration: underline;
  cursor: pointer;
}

ul li.selected {
  color: blue;
}

form {
  width: 575px;
}
fieldset#add-new label {
  margin-right: 5px;
  width: 100%;
}

#button-wrapper {
  float: right;
}
#button-wrapper button {
  margin: 10px 5px;
  width: 50px;
}
</style>