import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation'
import RecommendationList from "./components/RecommendationList"

function App() {
  return (
    <div className="App">
      {/* <Navigation/> */}
      <Switch>  
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <Route path='/login' render={(props) => <Login {...props}/>}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUpForm} />
        <Route exact path='/recommendation' component={RecommendationList} />
      </Switch>
    </div>
    
  );
}

export default App;
