/**
 * Response Struct
 * @exports
 * @class
 * @constructor
 * @public
 */
export default class ResponseStruct {
  /**
   * Default cstr for ResponseStruct object.
   * @param {string} message
   * @param {boolean} status
   * @param {string} change
   * @param {object} payload
   */
  constructor(message, status, change, payload) {
    /**
     * @type {string}
     */
    this.message = message || null;

    /**
     * @type {boolean}
     */
    this.status = status || false;

    /**
     * @type {string}
     */
    this.change = change || null;

    /**
     * @type {object}
     */
    this.payload = payload || {};
  }

  /**
   * Creates ResponseStruct from object.
   * @param {object} payload
   */
  static fromObject(payload) {
    let newStruct = new ResponseStruct();

    if (payload.hasOwnProperty("message")) newStruct.message = payload.message;
    if (payload.hasOwnProperty("status")) newStruct.status = payload.status;
    if (payload.hasOwnProperty("change")) newStruct.change = payload.change;
    if (payload.hasOwnProperty("payload")) newStruct.payload = payload.payload;

    return newStruct;
  }
}
