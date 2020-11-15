
import './scss/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

// document.addEventListener('selectstart', e => {
//   e.preventDefault()
// })
document.addEventListener('dragstart', e => {
  e.preventDefault()
})

/*ReactDOM.render(
  <App />,
  document.getElementById('app')
)*/
