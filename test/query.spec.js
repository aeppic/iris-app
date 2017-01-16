import Iris from '../src'

describe('Iris query interface', ()=>{

  var iris = null

  beforeEach( ()=>iris=new Iris() )

  it('exposes a query function', ()=>{
    iris.query()
  })

})
