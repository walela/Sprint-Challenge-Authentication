import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CSSReset />
        <h1>Haha!</h1>
        <Switch>
          <Route exact path='/'>
            <Signup />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

render(<App />, document.getElementById('root'))
