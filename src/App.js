import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PreHome from './components/WelcomePageContainer/PreHome'
import AboutPage from './components/AboutPageContainer/AboutPage'
import PitchProposalForm from "./components/PitchProposalContainer/PitchProposalForm";
import Homepage from "./components/HomePageContainer/Homepage";
import AdminDashboardContainer from "./components/AdminPageContainer/AdminDashboardContainer";
import Error from "./components/ErrorPageContainer/Error";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
              <Route exact path="/" component={PreHome} />
              <Route path="/find-pitch" component={Homepage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/suggest-site" component={PitchProposalForm} />
              <Route path="/admin" component={AdminDashboardContainer} />
              <Route path="*" component={Error} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App; 