import Iris from '../src'

describe('Iris query interface', ()=>{

  var iris = null

  beforeEach( ()=>iris=new Iris() )

  it('exposes a search function', ()=>{
    iris.search()
  })

  it('fails', ()=>{
    expect(1).to.equal(2)
    throw new ApplicationError()
  })

})



/**
 * 
 * iris.query('p:system')
 * 
 * iris.get('system')
 * 
 * iris.resolve(doc, 'children.name')
 * 
 */
