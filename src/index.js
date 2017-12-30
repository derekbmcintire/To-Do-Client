import React from 'react'
import ReactDOM from 'react-dom'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import Header from './components/Header'
import Home from './components/Home'
import Sign from './components/Sign'
import Lists from './components/Lists'
import registerServiceWorker from './registerServiceWorker'
const $ = require('jquery')

class App extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <Header />
          <hr/>
          <Route exact path="/todo-front/" component={Home} />
          <Route path="/todo-front/sign-in" component={Sign} />
          <Route path="todo-front/my-lists" component={Lists} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

$('.user').hide()
