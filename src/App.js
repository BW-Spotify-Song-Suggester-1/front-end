import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Link } from 'react-router-dom'
import { Tab, Tabs, AppBar, Paper, Container } from "@material-ui/core"
import headphones from './img/headphones.jpg'
import CssBaseline from '@material-ui/core/CssBaseline'

function App() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios.get('https://reqres.in/api/user')
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
  },[])
  
  return (
    <div className='container'>
      <CssBaseline />
      <div className='container-left' styles={{ backgroundImage:`url(${headphones})` }}>
      </div>
      <div className='container-right'>
        <Container maxWidth='sm'>
        <Paper square>
          <AppBar position='static'>
          <Tabs
              value={value}
              indicatorColor="secondary"
              variant='fullWidth'
              onChange={handleChange}
              aria-label="Sign In and Sign Up">
              <Tab label="Sign In" component={Link} to='/' />
              <Tab label="Sign Up" component={Link} to='/signup' />
          </Tabs>
        </AppBar>
        </Paper>
        </Container>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <SignUp />
        </Route>

      </div>
    </div>
  );
}

export default App;
