export default class Store {
  
  /**
   * 
   * @param {string|Query} stringOrQuery
   * @param {any} options
   * 
   * @returns {QueryResult}
   * @memberOf State
   */
  search(stringOrQuery, options) {
    console.log('searching', stringOrQuery, options)
  }

  subscribe(stringOrQuery, options) {
    console.log('searching', stringOrQuery, options)
  }

  get(documentIdOrReference) {
    return Promise.resolve({ a: documentIdOrReference, t: this })
  }

  watch(documentIdOrReference) {
    return Promise.resolve({ a: documentIdOrReference, t: this })
  }
}
