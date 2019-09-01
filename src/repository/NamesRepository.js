import Repository from "./ApiRepository";
import Person from "../models/Person";
import ResponseStruct from "../models/ResponseStruct";

const resource = "/people";

export default {
  /**
   * Gets people from API service.
   * @param {number} id
   * @returns {Array<Person>}
   * @async
   * @public
   */
  async get(id) {
    /** @type {AxiosResponse}*/
    let response;

    // If {@link id} isn't set, get all people...
    if (id === undefined) {
      response = await Repository.get(`${resource}`);
    } else {
      response = await Repository.get(`${resource}/${id}`);
    }

    await this._checkStatus(response);

    return Person.fromArray(response.data).sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
  },

  /**
   * Updates/inserts new person in the API service.
   * @param {Person} person
   * @returns {ResponseStruct}
   * @public
   */
  async set(person) {
    let response;
    if (person.id && person.id > -1) {
      response = await Repository.put(`${resource}/${person.id}`, person);
    } else {
      response = await Repository.post(`${resource}`, person);
    }

    await this._checkStatus(response);
    return ResponseStruct.fromObject(response.data);
  },

  /**
   * Removes person.
   * @param {Person} person
   * @returns {ResponseStruct}
   * @public
   */
  async remove(person) {
    let response;
    if (person.id && person.id > -1) {
      response = await Repository.delete(`${resource}/${person.id}`);
    } else {
      return;
    }
    await this._checkStatus(response);
    return ResponseStruct.fromObject(response.data);
  },

  /**
   * Checks the response for bad statuses.
   * @param {AxiosResponse} response
   * @private
   */
  async _checkStatus(response) {
    // Check the status on the response...
    if (response.status >= 200 && response.status < 300) {
      window.$log.debug("API Data", response.data);
    } else {
      window.$log.error("API Error", response);
      throw new Error(response.statusText);
    }
  }
};
