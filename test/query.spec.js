import Iris from '../src'

/**
 * Unit under test
 */
let iris = null

function uut(){
  return new Iris()
}

test('get a single document', (t)=>{
  t.plan(1)

  iris = uut()

  iris.get('2').then( (document)=>{
    t.equal(document.id, '2')
  })
})

test('search requires arguments', (t)=>{
  t.plan(1)

  iris = uut()

  try {
    iris.search('name:Nummer')
  } catch(error) {
    t.pass('did raise exception')
    return
  }
  t.fail('failed to raise exception')
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
