import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PreHome from './components/WelcomePageContainer/PreHome'
import AboutPage from './components/AboutPageContainer/AboutPage'
import PitchProposalForm from "./components/PitchProposalContainer/PitchProposalForm";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
              <Route exact path="/" component={PreHome} />
              <Route path="/about" component={AboutPage} />
              <Route path="/suggest-site" component={PitchProposalForm} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App; 