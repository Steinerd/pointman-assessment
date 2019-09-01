/**
 * Person object
 * @exports
 * @class
 * @constructor
 * @public
 */
export default class Person {
  /**
   * Gets age
   * @property {int|"UNK"}
   */
  get age() {
    if (!this.dob) return "UNK";
    var today = new Date();
    var birthDate = new Date(this.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getFormattedDate = date => {
    if (!date) return null;
    var local = new Date(date);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  constructor(id, first_name, last_name, dob) {
    /**
     * The id of the person.
     * @type {number}
     * @public
     */
    this.id = id || -1;

    /**
     * The first name of the person.
     * @type {string}
     * @public
     */
    this.first_name = first_name || "";

    /**
     * The last name of the person.
     * @type {string}
     * @public
     */
    this.last_name = last_name || "";

    /**
     * The date of birth of person
     * @type {Date}
     * @public
     */
    this.dob = new Date(dob ? this.getFormattedDate(dob.trim()) : null) || null;
  }

  /**
   * Creates a Person via values.
   * @param {number} id
   * @param {string} first_name
   * @param {string} last_name
   * @param {Date} dob
   */
  static create(id, first_name, last_name, dob) {
    return new Person(id, first_name, last_name, dob);
  }

  /**
   * Creates a collection of People from an object array.
   * @param {Array<object>} people
   * @returns {Array<Person>}
   */
  static fromArray(people) {
    /**@type {Array<Person>} */
    let collection = [];

    people.forEach(person => {
      collection.push(
        new Person(person.id, person.first_name, person.last_name, person.dob)
      );
    });

    return collection;
  }
}
