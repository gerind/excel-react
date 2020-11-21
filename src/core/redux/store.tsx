import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer, null)

//DEBUG
declare var window: any
window.store = store

export default store
