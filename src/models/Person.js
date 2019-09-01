/**
 * Person object
 * @exports
 * @class
 * @constructor
 * @public
 */
export default class Person {
  constructor() {
    /**
     * The id of the person.
     * @type {number}
     * @public
     */
    this.id = -1;

    /**
     * The first name of the person.
     * @type {string}
     * @public
     */
    this.first_name = "";

    /**
     * The last name of the person.
     * @type {string}
     * @public
     */
    this.last_name = "";
  }
}
