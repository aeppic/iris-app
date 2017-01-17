import find from 'lodash-es/find'

export default class Store {
  
  get(documentIdOrReference) {
    // test simple lookup
    return Promise.resolve( find(Documents,(d)=>d.id === documentIdOrReference) )
  }

  /**
   * 
   * @param {string|Query} stringOrQuery
   * @param {any} options
   * 
   * @returns {QueryResult}
   * @memberOf State
   */
  search(stringOrQuery, options) {
    if(!stringOrQuery)
      throw new Error('Requires query string')

    console.log('searching', stringOrQuery, options)
  }

  // subscribe(stringOrQuery, options) {
  //   console.log('searching', stringOrQuery, options)
  // }
  // watch(documentIdOrReference, options) {
  //   // simple lookup and add filter to 
  //   return Promise.resolve({ a: documentIdOrReference, t: this })
  // }
}

/**
 * Example Data
 */
const Documents = [
  {
    id: '1',
    p: 'root',
    f: { id:'folder', v:1 },
    data: {
      name: 'Number 1'
    }
  },
  {
    id: '2',
    p: 'root',
    f: { id:'folder', v:1 },
    data: {
      name: 'Nummero 2'
    }
  },
  {
    id: '3',
    p: 'root',
    f: { id:'folder', v:1 },
    data: {
      name: 'Nummer 3'
    }
  },
  {
    id: '4',
    p: '1',
    f: { id:'folder', v:1 },
    data: {
      name: 'Child 1'
    }
  },
  {
    id: '5',
    p: '1',
    f: { id:'referencing-folder', v:1 },
    data: {
      name: 'Child 2',
      ref: { id:'7' }
    }
  },
  {
    id: '6',
    p: '1',
    f: { id:'folder', v:1 },
    data: {
      name: 'Related Child'
    }
  },
  {
    id: '7',
    p: '5',
    f: { id:'person', v:1 },
    data: {
      name: 'Related',
      age: 101
    }
  }
]

/**
 * 
 * 
 * 
 */
