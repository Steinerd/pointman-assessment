<template>
  <form>
    <div class="form-group row">
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <div class="input-group-text">First Name</div>
        </div>
        <input
          class="form-control form-control-sm"
          type="text"
          required
          id="first_name"
          name="first_name"
          v-model.trim="selected.first_name"
        >
      </div>
    </div>
    <div class="form-group row">
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <div class="input-group-text">Last Name</div>
        </div>
        <input
          class="form-control form-control-sm"
          type="text"
          required
          id="last_name"
          name="last_name"
          v-model.trim="selected.last_name"
        >
      </div>
    </div>
    <div class="form-group row">
      <div class="input-group input-group-sm">
        <div class="input-group-prepend">
          <div class="input-group-text">Date of Birth</div>
        </div>
        <input
          class="form-control form-control-sm"
          placeholder="Date of Birth"
          type="date"
          required
          id="dob"
          name="dob"
          min="1900-01-01"
          :max="_getFormattedDate(new Date())"
          v-model="selected.dob"
        >
      </div>
    </div>
    <div class="form-row">
      <div class="btn-group btn-group-sm">
        <button
          class="btn btn-danger"
          v-if="selected.id > -1"
          id="delete"
          name="delete"
          type="button"
          @click="remove"
        >Delete</button>
        <button class="btn btn-secondary" id="clear" name="clear" type="reset" @click="clear">Clear</button>
        <button
          class="btn btn-primary"
          id="add-update"
          name="add-update"
          type="submit"
          @click="upsert"
        >
          <span v-if="selected.id > -1">Update</span>
          <span v-else>Add</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import PeopleRepository from "../repository/NamesRepository";
import ResponseStruct from "../models/ResponseStruct";
import Person from "../models/Person";
import $ from "jquery";

export default {
  name: "ContactsForms",
  data() {
    return this.$parent.$data;
  },
  methods: {
    /**
     * Proxy fetch, gets the names.
     */
    async fetch() {
      return this.$parent.fetch();
    },

    /**
     * Updates or interts a new person.
     */
    async upsert($event) {
      if (!$("form")[0].checkValidity()) {
        return;
      }

      $event.preventDefault();

      this.isLoading = true;
      let responseMessage = await PeopleRepository.set(this.selected);
      this.isLoading = false;

      if (responseMessage.status) {
        await this.clear();
        await this.fetch();
      } else {
        console.error({ responseMessage });
      }
    },

    /**
     * Clears the context with an defaulted Person object.
     */
    async clear() {
      this.$parent.selected = new Person();
      await this.fetch();
    },

    /**
     * Removes the currently selected person.
     */
    async remove() {
      /** @type {ResponseStruct} */
      let response = null;

      if (this.selected.id > -1) {
        this.isLoading = true;
        response = ResponseStruct.fromObject(
          await PeopleRepository.remove(this.selected)
        );
        this.isLoading = false;
        if (response.status) {
          await this.clear();
          await this.fetch();
        }
      }
    },
    _getFormattedDate(date) {
      return this.$parent._getFormattedDate(date);
    }
  },
  /**
   * Vue::mounted Event
   */
  mounted() {}
};
</script>

<style scoped>
.input-group-text {
  width: 100px;
}
</style>