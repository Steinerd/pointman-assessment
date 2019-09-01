import Repository from "./ApiRepository";
import Person from "../models/Person";

const resource = "/people";

export default {
  /**
   * Gets people from API service.
   * @param {number} id
   * @returns {Array<Person>}
   * @async
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

    return response.data.sort((a, b) => (a.id > b.id ? 1 : -1));
  },

  /**
   * Updates/inserts new person in the API service.
   * @param {Person} person
   * @returns {boolean}
   */
  async set(person) {
    let response;
    if (person.id && person.id > -1) {
      response = Repository.put(`${resource}/${person.id}`, person);
    } else {
      response = Repository.post(`${resource}`, person);
    }

    await this._checkStatus(response);
  },
  async _checkStatus(response) {
    // Check the status on the response...
    if (response.status >= 200 && response.status < 300) {
      console.table("API Data", response.data);
    } else {
      console.error("API Error", response);
      throw new Error(response.statusText);
    }
  }
};
