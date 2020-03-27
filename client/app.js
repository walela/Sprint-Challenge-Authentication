import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'
import Jokes from './Jokes'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CSSReset />
        <Switch>
          <Route exact path='/'>
            <Signup />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/jokes'>
            <Jokes />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

render(<App />, document.getElementById('root'))
