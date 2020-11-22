import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer, null)

//DEBUG
window['store'] = store

export default store
