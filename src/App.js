import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PreHome from './components/WelcomePageContainer/PreHome'
import AboutPage from './components/AboutPageContainer/AboutPage'

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
              <Route exact path="/" component={PreHome} />
              <Route path="/about" component={AboutPage} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App; 