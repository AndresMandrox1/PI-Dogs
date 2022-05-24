import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import Detail from './components/Detail/Detail'
import CreateBreed from "./components/CreateBreed/CreateBreed";
import Home from './components/Home/Home'
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/">
          <NavBar />
          <Route path='/home' component={Home}/>
          <Route path= '/breed/:id' component={Detail}/>
          <Route path='/create' component={CreateBreed}/>
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
